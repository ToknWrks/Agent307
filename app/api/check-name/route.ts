import { NextRequest, NextResponse } from "next/server";

import type { StateCode } from "@/app/lib/constants";
import { isNameReserved } from "@/app/lib/db";
import { generateSuggestions } from "@/app/lib/llc-names";
import { checkNameAvailability } from "@/app/lib/name-check";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per minute
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

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const state = "WY";

  if (!name || name.trim().length < 2) {
    return NextResponse.json({ error: "Name is required (min 2 characters)" }, { status: 400 });
  }

  if (state !== "WY" && state !== "DE") {
    return NextResponse.json({ error: "State must be WY or DE" }, { status: 400 });
  }

  const [result, reserved] = await Promise.all([
    checkNameAvailability(name.trim(), state),
    isNameReserved(name.trim(), state),
  ]);

  const available = result.available && !reserved;

  return NextResponse.json({
    available,
    matches: reserved ? [`${name.trim()} (already reserved)`] : result.matches,
    suggestions: available ? [] : generateSuggestions(3),
  });
}
