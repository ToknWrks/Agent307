import { NextRequest, NextResponse } from "next/server";

import { SITE_URL } from "@/app/lib/constants";
import { generateLLCName } from "@/app/lib/llc-names";
import { getStripe } from "@/app/lib/stripe";

type ProductType = "reservation" | "formation" | "annual_service";

function getPriceId(product: ProductType, state: "WY" | "DE"): string {
  if (product === "formation") {
    const id =
      state === "WY"
        ? process.env.STRIPE_PRICE_WY_FORMATION
        : process.env.STRIPE_PRICE_DE_FORMATION;
    if (!id) throw new Error(`STRIPE_PRICE_${state}_FORMATION is not set`);
    return id;
  }
  if (product === "annual_service") {
    const id = process.env.STRIPE_PRICE_ANNUAL_SERVICE;
    if (!id) throw new Error("STRIPE_PRICE_ANNUAL_SERVICE is not set");
    return id;
  }
  const id = process.env.STRIPE_PRICE_RESERVATION;
  if (!id) throw new Error("STRIPE_PRICE_RESERVATION is not set");
  return id;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, state, llcName: rawName, product: rawProduct, ref, request_id } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const validState = state === "DE" ? "DE" : "WY";
    const llcName = rawName?.trim() || generateLLCName();
    const product: ProductType =
      rawProduct === "formation" ? "formation" :
      rawProduct === "annual_service" ? "annual_service" :
      "reservation";
    const priceId = getPriceId(product, validState);
    const isSubscription = product === "annual_service";

    const session = await getStripe().checkout.sessions.create({
      mode: isSubscription ? "subscription" : "payment",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        llcName,
        state: validState,
        email,
        product,
        ...(ref && typeof ref === "string" ? { ref } : {}),
        ...(request_id && typeof request_id === "string" ? { request_id } : {}),
      },
      ...(isSubscription && {
        subscription_data: { metadata: { llcName, state: validState, email } },
      }),
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: SITE_URL,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
