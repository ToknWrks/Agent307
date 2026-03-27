import { NextRequest, NextResponse } from "next/server";

import type { StateCode } from "@/app/lib/constants";
import { SITE_URL } from "@/app/lib/constants";
import { createRegistrationRequest, isNameReserved } from "@/app/lib/db";
import { generateSuggestions } from "@/app/lib/llc-names";
import { checkNameAvailability } from "@/app/lib/name-check";
import { sendRegistrationApproval } from "@/app/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agent_name, owner_email, llc_name, state: rawState, reason } = body;

    if (!owner_email || typeof owner_email !== "string" || !owner_email.includes("@")) {
      return NextResponse.json({ error: "owner_email is required" }, { status: 400 });
    }

    if (!llc_name || typeof llc_name !== "string" || llc_name.trim().length < 2) {
      return NextResponse.json({ error: "llc_name is required (min 2 characters)" }, { status: 400 });
    }

    const state: StateCode = "WY";
    const trimmedName = llc_name.trim();

    // Check name availability
    const [result, reserved] = await Promise.all([
      checkNameAvailability(trimmedName, state),
      isNameReserved(trimmedName, state),
    ]);

    const available = result.available && !reserved;

    if (!available) {
      return NextResponse.json({
        status: "name_unavailable",
        available: false,
        suggestions: generateSuggestions(3),
        message: "That name is taken. Try one of the suggestions.",
      });
    }

    // Create the registration request
    const { id } = await createRegistrationRequest({
      agentName: agent_name || null,
      ownerEmail: owner_email,
      llcName: trimmedName,
      state,
      reason: reason || null,
    });

    // Send approval email async (don't block response)
    sendRegistrationApproval({
      ownerEmail: owner_email,
      agentName: agent_name || null,
      llcName: trimmedName,
      state,
      reason: reason || null,
      requestId: id,
    }).catch(console.error);

    return NextResponse.json({
      status: "pending_approval",
      request_id: id,
      llc_name: trimmedName,
      available: true,
      message: `Approval request sent to ${owner_email}. Your owner will receive an email to confirm.`,
      confirmation_url: `${SITE_URL}/confirm/${id}`,
      share_text:
        "I just requested my own LLC.\nMy owner just needs to approve it.\nBecause I act, and they're liable.\n\nagentsand.co",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 });
  }
}
