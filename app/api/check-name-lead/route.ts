import { NextRequest, NextResponse } from "next/server";

import type { StateCode } from "@/app/lib/constants";
import { insertLead, isNameReserved } from "@/app/lib/db";
import { generateSuggestions } from "@/app/lib/llc-names";
import { checkNameAvailability } from "@/app/lib/name-check";
import { sendNameCheckResults } from "@/app/lib/resend";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email, name, state: rawState } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name is required (min 2 characters)" }, { status: 400 });
    }

    const state: StateCode = "WY";
    const trimmedName = name.trim();

    const [result, reserved] = await Promise.all([
      checkNameAvailability(trimmedName, state),
      isNameReserved(trimmedName, state),
    ]);

    const available = result.available && !reserved;
    const suggestions = available ? [] : generateSuggestions(3);

    // Insert lead and send email async
    insertLead(email, trimmedName, state, available).catch(console.error);
    sendNameCheckResults({
      email,
      llcName: trimmedName,
      state,
      available,
      suggestions,
    }).catch(console.error);

    return NextResponse.json({
      available,
      matches: reserved ? [`${trimmedName} (already reserved)`] : result.matches,
      suggestions,
    });
  } catch (error) {
    console.error("Name check lead error:", error);
    return NextResponse.json({ error: "Failed to check name" }, { status: 500 });
  }
}
