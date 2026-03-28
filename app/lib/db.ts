import { neon } from "@neondatabase/serverless";
import { nanoid } from "nanoid";

function getSql() {
  if (!process.env.DATABASE_URL) return null;
  return neon(process.env.DATABASE_URL);
}

export function sql(...args: Parameters<ReturnType<typeof neon>>) {
  const client = getSql();
  if (!client) throw new Error("DATABASE_URL is not set");
  return client(...args);
}

export interface RegistrationRequest {
  id: string;
  agent_name: string | null;
  owner_email: string;
  llc_name: string;
  state: string;
  reason: string | null;
  status: string;
  created_at: string;
  expires_at: string;
}

export async function createRegistrationRequest(data: {
  agentName?: string;
  ownerEmail: string;
  llcName: string;
  state: string;
  reason?: string;
}): Promise<{ id: string }> {
  const id = nanoid(12);
  const client = getSql();
  if (!client) throw new Error("DATABASE_URL is not set");
  await client`
    INSERT INTO registration_requests (id, agent_name, owner_email, llc_name, state, reason)
    VALUES (${id}, ${data.agentName || null}, ${data.ownerEmail}, ${data.llcName}, ${data.state}, ${data.reason || null})
  `;
  return { id };
}

export async function getRegistrationRequest(id: string): Promise<RegistrationRequest | null> {
  const client = getSql();
  if (!client) return null;
  const result = await client`
    SELECT * FROM registration_requests WHERE id = ${id}
  `;
  if (result.length === 0) return null;
  return result[0] as RegistrationRequest;
}

export async function updateRegistrationRequestStatus(id: string, status: string): Promise<void> {
  const client = getSql();
  if (!client) return;
  await client`
    UPDATE registration_requests SET status = ${status} WHERE id = ${id}
  `;
}

export async function insertLead(email: string, llcName: string, state: string, available: boolean): Promise<void> {
  const client = getSql();
  if (!client) return;
  await client`
    INSERT INTO leads (email, llc_name, state, available)
    VALUES (${email}, ${llcName}, ${state}, ${available})
  `;
}

export async function isNameReserved(name: string, state: string): Promise<boolean> {
  try {
    const client = getSql();
    if (!client) return false;
    const result = await client`
      SELECT COUNT(*) as count FROM reservations
      WHERE LOWER(llc_name) = LOWER(${name}) AND state = ${state}
    `;
    return Number(result[0].count) > 0;
  } catch {
    return false;
  }
}

// Required table:
// CREATE TABLE annual_service (
//   id SERIAL PRIMARY KEY,
//   email TEXT NOT NULL,
//   llc_name TEXT NOT NULL,
//   state TEXT NOT NULL DEFAULT 'WY',
//   stripe_customer_id TEXT,
//   stripe_subscription_id TEXT UNIQUE,
//   formation_date DATE,
//   status TEXT NOT NULL DEFAULT 'active',
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );

export async function upsertAnnualService(data: {
  email: string;
  llcName: string;
  state: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  formationDate?: string;
}): Promise<void> {
  const client = getSql();
  if (!client) return;
  await client`
    INSERT INTO annual_service (email, llc_name, state, stripe_customer_id, stripe_subscription_id, formation_date, status)
    VALUES (
      ${data.email}, ${data.llcName}, ${data.state},
      ${data.stripeCustomerId}, ${data.stripeSubscriptionId},
      ${data.formationDate || null}, 'active'
    )
    ON CONFLICT (stripe_subscription_id) DO UPDATE
    SET status = 'active', stripe_customer_id = EXCLUDED.stripe_customer_id
  `;
}

export async function cancelAnnualService(stripeSubscriptionId: string): Promise<void> {
  const client = getSql();
  if (!client) return;
  await client`
    UPDATE annual_service SET status = 'cancelled' WHERE stripe_subscription_id = ${stripeSubscriptionId}
  `;
}

export interface AnnualServiceRecord {
  email: string;
  llc_name: string;
  state: string;
  formation_date: string | null;
}

export async function getUpcomingAnniversaries(daysAhead: number): Promise<AnnualServiceRecord[]> {
  const client = getSql();
  if (!client) return [];
  // Find records whose anniversary (same month/day each year) falls within the next N days
  const result = await client`
    SELECT email, llc_name, state, formation_date
    FROM annual_service
    WHERE status = 'active'
      AND formation_date IS NOT NULL
      AND (
        DATE_PART('month', formation_date::date) = DATE_PART('month', (CURRENT_DATE + (${daysAhead} || ' days')::interval)::date)
        AND DATE_PART('day', formation_date::date) = DATE_PART('day', (CURRENT_DATE + (${daysAhead} || ' days')::interval)::date)
      )
  `;
  return result as AnnualServiceRecord[];
}

export async function updateFormationDate(stripeSubscriptionId: string, formationDate: string): Promise<void> {
  const client = getSql();
  if (!client) return;
  await client`
    UPDATE annual_service SET formation_date = ${formationDate} WHERE stripe_subscription_id = ${stripeSubscriptionId}
  `;
}

// CREATE TABLE business_plan_submissions (
//   id TEXT PRIMARY KEY,
//   llc_name TEXT,
//   agent_purpose TEXT NOT NULL,
//   industry TEXT,
//   target_customers TEXT,
//   revenue_model TEXT,
//   plan_json JSONB,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );

export async function saveBusinessPlanSubmission(data: {
  llcName?: string;
  agentPurpose: string;
  industry?: string;
  targetCustomers?: string;
  revenueModel?: string;
  plan: object;
}): Promise<string> {
  const planId = nanoid(12);
  const client = getSql();
  if (!client) return planId;
  await client`
    INSERT INTO business_plan_submissions (id, llc_name, agent_purpose, industry, target_customers, revenue_model, plan_json)
    VALUES (
      ${planId},
      ${data.llcName || null},
      ${data.agentPurpose},
      ${data.industry || null},
      ${data.targetCustomers || null},
      ${data.revenueModel || null},
      ${JSON.stringify(data.plan)}
    )
  `;
  return planId;
}

export interface BusinessPlanSubmission {
  id: string;
  llc_name: string | null;
  agent_purpose: string;
  industry: string | null;
  target_customers: string | null;
  revenue_model: string | null;
  plan_json: object;
  created_at: string;
}

export async function getBusinessPlanSubmissions(): Promise<BusinessPlanSubmission[]> {
  const client = getSql();
  if (!client) return [];
  const result = await client`
    SELECT id, llc_name, agent_purpose, industry, target_customers, revenue_model, plan_json, created_at
    FROM business_plan_submissions
    ORDER BY created_at DESC
    LIMIT 100
  `;
  return result as BusinessPlanSubmission[];
}

export async function getBusinessPlanById(planId: string): Promise<object | null> {
  const client = getSql();
  if (!client) return null;
  const result = await client`
    SELECT plan_json FROM business_plan_submissions WHERE id = ${planId}
  `;
  if (result.length === 0) return null;
  return result[0].plan_json as object;
}

/** Seed offset so counters are nonzero at launch. Set to 0 once real traffic exceeds it. */
export const SEED_COUNT = 147;

export async function getReservationCount(): Promise<number> {
  try {
    const client = getSql();
    if (!client) return SEED_COUNT;
    const result = await client`SELECT COUNT(*) as count FROM reservations`;
    return Number(result[0].count) + SEED_COUNT;
  } catch {
    return SEED_COUNT;
  }
}

export async function assignPosition(sessionId: string): Promise<number | null> {
  try {
    const client = getSql();
    if (!client) return null;
    const result = await client`
      UPDATE reservations
      SET position = (SELECT COUNT(*) FROM reservations) + ${SEED_COUNT}
      WHERE stripe_session_id = ${sessionId} AND position IS NULL
      RETURNING position
    `;
    if (result.length === 0) {
      const existing = await client`
        SELECT position FROM reservations WHERE stripe_session_id = ${sessionId}
      `;
      return existing.length > 0 ? Number(existing[0].position) : null;
    }
    return Number(result[0].position);
  } catch {
    return null;
  }
}

export async function getPositionBySessionId(sessionId: string): Promise<number | null> {
  try {
    const client = getSql();
    if (!client) return null;
    const result = await client`
      SELECT position FROM reservations
      WHERE stripe_session_id = ${sessionId}
    `;
    if (result.length === 0 || result[0].position == null) return null;
    return Number(result[0].position);
  } catch {
    return null;
  }
}

export async function processReferral(referrerEmail: string): Promise<number | null> {
  try {
    const client = getSql();
    if (!client) return null;
    const result = await client`
      UPDATE reservations
      SET position = GREATEST(position - 10, 1)
      WHERE email = ${referrerEmail} AND position IS NOT NULL
      RETURNING position
    `;
    if (result.length === 0) return null;
    return Number(result[0].position);
  } catch {
    return null;
  }
}
