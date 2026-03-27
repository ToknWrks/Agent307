import { Resend } from "resend";

import { NOTIFICATION_EMAIL, SITE_URL } from "./constants";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

interface ReservationDetails {
  email: string;
  llcName: string;
  state: "WY" | "DE";
  sessionId: string;
  attachments?: { filename: string; content: Buffer }[];
}

interface RegistrationApprovalDetails {
  ownerEmail: string;
  agentName: string | null;
  llcName: string;
  state: string;
  reason: string | null;
  requestId: string;
}

interface NameCheckResultsDetails {
  email: string;
  llcName: string;
  state: string;
  available: boolean;
  suggestions: string[];
}

export async function sendReservationNotification(details: ReservationDetails) {
  const { email, llcName, state, sessionId } = details;
  const stateName = state === "WY" ? "Wyoming" : "Delaware";

  return getResend().emails.send({
    from: "onboarding@resend.dev",
    to: NOTIFICATION_EMAIL,
    subject: `New LLC Reservation: ${llcName} (${stateName})`,
    html: `
      <h2>New LLC Name Reservation</h2>
      <table style="border-collapse: collapse;">
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">LLC Name</td><td>${llcName}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">State</td><td>${stateName}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Customer Email</td><td>${email}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Stripe Session</td><td>${sessionId}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Time</td><td>${new Date().toISOString()}</td></tr>
      </table>
      <p style="margin-top: 16px;">File name reservation manually:</p>
      <ul>
        <li><strong>Wyoming:</strong> wyobiz.wyo.gov — $60 mail form</li>
        <li><strong>Delaware:</strong> icis.corp.delaware.gov — $75 web portal</li>
      </ul>
    `,
  });
}

export async function sendReservationConfirmation(details: ReservationDetails) {
  const { email, llcName, state, attachments } = details;
  const stateName = state === "WY" ? "Wyoming" : "Delaware";
  const shareUrl = `${SITE_URL}?ref=${encodeURIComponent(email)}`;

  return getResend().emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: `Your AI is now a registered agent — ${llcName}`,
    attachments: attachments?.map((a) => ({
      filename: a.filename,
      content: a.content.toString("base64"),
    })),
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
        <h1 style="font-size: 24px;">Your AI is now a registered agent.</h1>
        <div style="background: #111; border: 1px solid #333; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
          <p style="font-family: monospace; font-size: 20px; color: #2dd4bf; margin: 0;">${llcName}</p>
          <p style="color: #888; font-size: 14px; margin-top: 8px;">${stateName} LLC — Reserved</p>
        </div>

        <h2 style="font-size: 18px;">What happens next</h2>
        <ol style="line-height: 1.8;">
          <li>Your LLC name is reserved — no one else can claim it through our platform</li>
          <li>Your reservation is active for 120 days</li>
          <li>Your $99 is credited toward full LLC formation ($${state === "WY" ? "299" : "399"})</li>
          <li>We'll email you when it's time to complete formation</li>
        </ol>

        <h2 style="font-size: 18px;">Share & save</h2>
        <p>Share your registration and unlock discounts on CallDesk AI receptionist service:</p>
        <p><a href="${shareUrl}" style="color: #2dd4bf;">Your share link &rarr;</a></p>

        <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;" />
        <p style="color: #888; font-size: 12px;">
          This is a name reservation, not legal advice. $99 is non-refundable but credited toward formation.
          Questions? Reply to this email.
        </p>
      </div>
    `,
  });
}

export async function sendRegistrationApproval(details: RegistrationApprovalDetails) {
  const { ownerEmail, agentName, llcName, state, reason, requestId } = details;
  const stateName = state === "WY" ? "Wyoming" : "Delaware";
  const confirmUrl = `${SITE_URL}/confirm/${requestId}`;

  return getResend().emails.send({
    from: "onboarding@resend.dev",
    to: ownerEmail,
    subject: "Your AI agent wants to be a business.",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #e5e5e5;">
        <h1 style="font-size: 24px; color: #fff;">Your agent wants liability protection.<br/>You should want it too.</h1>

        <div style="background: #111; border: 1px dashed #333; border-radius: 12px; padding: 24px; margin: 24px 0;">
          ${agentName ? `<p style="color: #888; font-size: 13px; margin: 0 0 4px;">Agent</p><p style="font-family: monospace; font-size: 18px; color: #A8F1F7; margin: 0 0 16px;">${agentName}</p>` : ""}
          <p style="color: #888; font-size: 13px; margin: 0 0 4px;">LLC Name</p>
          <p style="font-family: monospace; font-size: 18px; color: #A8F1F7; margin: 0 0 16px;">${llcName}</p>
          <p style="color: #888; font-size: 13px; margin: 0 0 4px;">State</p>
          <p style="font-size: 16px; color: #fff; margin: 0 0 16px;">${stateName}</p>
          ${reason ? `<p style="color: #888; font-size: 13px; margin: 0 0 4px;">Why it wants an LLC</p><p style="font-size: 14px; color: #ccc; margin: 0; font-style: italic;">"${reason}"</p>` : ""}
        </div>

        <p style="color: #999; font-size: 14px; line-height: 1.6;">
          Approving creates a ${stateName} LLC. Your agent gets a legal identity. You get a liability shield.<br/>
          That's the &amp; in Agents&amp;.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${confirmUrl}" style="display: inline-block; background: #A8F1F7; color: #111; font-weight: 600; font-size: 16px; padding: 14px 32px; border-radius: 8px; text-decoration: none;">
            Approve &mdash; $99
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;" />
        <p style="color: #666; font-size: 12px; line-height: 1.5;">
          This request expires in 7 days. Your agent will keep asking.<br/>
          $99 reserves the name for 120 days, credited toward full formation.
        </p>
      </div>
    `,
  });
}

export async function sendAnnualReportReminder(details: {
  email: string;
  llcName: string;
  state: string;
  anniversaryDate: string;
}) {
  const { email, llcName, state, anniversaryDate } = details;
  const stateName = state === "WY" ? "Wyoming" : "Delaware";
  const filingFee = state === "WY" ? "$60" : "$300";
  const filingUrl = state === "WY" ? "https://wyobiz.wyo.gov" : "https://icis.corp.delaware.gov";

  return getResend().emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: `Action required: ${llcName} annual report due soon`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
        <h1 style="font-size: 22px;">Your annual report is due soon.</h1>
        <div style="background: #111; border: 1px solid #333; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="font-family: monospace; font-size: 18px; color: #A8F1F7; margin: 0 0 8px;">${llcName}</p>
          <p style="color: #888; font-size: 14px; margin: 0;">${stateName} LLC — Annual Report Due ${anniversaryDate}</p>
        </div>

        <h2 style="font-size: 16px;">What you need to do</h2>
        <ol style="line-height: 2; font-size: 14px;">
          <li>File your ${stateName} annual report at <a href="${filingUrl}" style="color: #A8F1F7;">${filingUrl}</a></li>
          <li>Pay the ${filingFee} state filing fee</li>
          <li>Confirm your registered agent information is current</li>
        </ol>

        <p style="font-size: 13px; color: #888; margin-top: 24px;">
          Missing this deadline can result in late fees or administrative dissolution of your LLC.
          Your registered agent service subscription ($100/yr) covers our address and forwarding —
          the annual report filing fee is paid separately to the state.
        </p>

        <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;" />
        <p style="color: #888; font-size: 12px;">
          You're receiving this because you have an active registered agent service subscription for ${llcName}.
          Reply to this email with any questions.
        </p>
      </div>
    `,
  });
}

export async function sendNameCheckResults(details: NameCheckResultsDetails) {
  const { email, llcName, state, available, suggestions } = details;
  const stateName = state === "WY" ? "Wyoming" : "Delaware";

  if (available) {
    const reserveUrl = `${SITE_URL}/#reserve?name=${encodeURIComponent(llcName)}&state=${state}`;
    return getResend().emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `${llcName} is available in ${stateName}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
          <div style="background: #052e16; border: 1px solid #166534; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px;">
            <span style="color: #4ade80; font-weight: 600;">&#10003; Available</span>
          </div>
          <h1 style="font-size: 24px;">${llcName}</h1>
          <p style="color: #888; font-size: 16px;">is available in ${stateName}.</p>
          <p style="font-size: 14px; color: #999;">Reserve this name before someone else does.</p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${reserveUrl}" style="display: inline-block; background: #A8F1F7; color: #111; font-weight: 600; font-size: 16px; padding: 14px 32px; border-radius: 8px; text-decoration: none;">
              Reserve ${llcName} &mdash; $99
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;" />
          <p style="color: #888; font-size: 12px;">agentsand.co — The registered agent for AI agents.</p>
        </div>
      `,
    });
  }

  return getResend().emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: `${llcName} is taken — but we have ideas`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
        <div style="background: #450a0a; border: 1px solid #991b1b; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px;">
          <span style="color: #f87171; font-weight: 600;">&#10007; Taken</span>
        </div>
        <h1 style="font-size: 24px;">${llcName}</h1>
        <p style="color: #888; font-size: 16px;">is not available in ${stateName}.</p>
        ${suggestions.length > 0 ? `
          <h2 style="font-size: 18px; margin-top: 24px;">Try these instead</h2>
          <ul style="line-height: 2;">
            ${suggestions.map((s) => `<li><a href="${SITE_URL}/#reserve?name=${encodeURIComponent(s)}&state=${state}" style="color: #A8F1F7;">${s}</a></li>`).join("")}
          </ul>
        ` : ""}
        <div style="text-align: center; margin: 32px 0;">
          <a href="${SITE_URL}/#reserve" style="display: inline-block; background: #A8F1F7; color: #111; font-weight: 600; font-size: 16px; padding: 14px 32px; border-radius: 8px; text-decoration: none;">
            Check Another Name
          </a>
        </div>
        <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;" />
        <p style="color: #888; font-size: 12px;">agentsand.co — The registered agent for AI agents.</p>
      </div>
    `,
  });
}
