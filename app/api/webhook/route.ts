import { NextRequest, NextResponse } from "next/server";

import { sql, assignPosition, processReferral, updateRegistrationRequestStatus, upsertAnnualService, cancelAnnualService } from "@/app/lib/db";
import { generateArticlesOfOrganization, generateOperatingAgreement } from "@/app/lib/docs";
import { sendReservationConfirmation, sendReservationNotification } from "@/app/lib/resend";
import { getStripe } from "@/app/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata;

    if (metadata?.llcName && metadata?.state && metadata?.email) {
      const details = {
        email: metadata.email,
        llcName: metadata.llcName,
        state: metadata.state as "WY" | "DE",
        sessionId: session.id,
        product: metadata.product || "reservation",
      };

      // Generate formation documents for Wyoming formation/business-in-a-box products
      let attachments: { filename: string; content: Buffer }[] = [];
      if (details.state === "WY" && details.product !== "reservation") {
        try {
          const now = new Date();
          const memberName = details.email.split("@")[0]; // best we have without a separate form field
          const [articlesBytes, operatingBytes] = await Promise.all([
            generateArticlesOfOrganization({
              llcName: details.llcName,
              registeredAgentName: process.env.REGISTERED_AGENT_NAME || "Your Registered Agent",
              registeredAgentAddress: process.env.REGISTERED_AGENT_ADDRESS || "123 Main St, Cheyenne, WY 82001",
              organizerName: process.env.ORGANIZER_NAME || "Agent307",
              filingDate: now,
            }),
            generateOperatingAgreement({
              llcName: details.llcName,
              memberName,
              memberAddress: "Address on file",
              registeredAgentName: process.env.REGISTERED_AGENT_NAME || "Your Registered Agent",
              registeredAgentAddress: process.env.REGISTERED_AGENT_ADDRESS || "123 Main St, Cheyenne, WY 82001",
              effectiveDate: now,
            }),
          ]);
          attachments = [
            { filename: `${details.llcName} - Articles of Organization.pdf`, content: Buffer.from(articlesBytes) },
            { filename: `${details.llcName} - Operating Agreement.pdf`, content: Buffer.from(operatingBytes) },
          ];
        } catch (err) {
          console.error("Doc generation failed:", err);
        }
      }

      // Fire emails and DB insert in parallel
      await Promise.allSettled([
        sendReservationNotification(details),
        sendReservationConfirmation({ ...details, attachments }),
        sql`
          INSERT INTO reservations (llc_name, state, email, product, stripe_session_id)
          VALUES (${details.llcName}, ${details.state}, ${details.email}, ${details.product}, ${details.sessionId})
          ON CONFLICT (stripe_session_id) DO NOTHING
        `,
      ]);

      // Assign queue position after insert
      await assignPosition(details.sessionId).catch(console.error);

      // Mark registration request as approved if this came from agent path
      const requestId = metadata.request_id;
      if (requestId) {
        await updateRegistrationRequestStatus(requestId, "approved").catch(console.error);
      }

      // Credit referrer if this came via a referral link
      const referrerEmail = metadata.ref;
      if (referrerEmail) {
        await processReferral(referrerEmail).catch(console.error);
      }
    }
  }

  if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
    const sub = event.data.object;
    const meta = sub.metadata;
    if (meta?.llcName && meta?.email) {
      await upsertAnnualService({
        email: meta.email,
        llcName: meta.llcName,
        state: meta.state || "WY",
        stripeCustomerId: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
        stripeSubscriptionId: sub.id,
      }).catch(console.error);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object;
    await cancelAnnualService(sub.id).catch(console.error);
  }

  return NextResponse.json({ received: true });
}
