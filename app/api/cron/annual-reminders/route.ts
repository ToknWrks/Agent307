import { NextRequest, NextResponse } from "next/server";

import { getUpcomingAnniversaries } from "@/app/lib/db";
import { sendAnnualReportReminder } from "@/app/lib/resend";

// Vercel cron calls this with a secret to prevent unauthorized invocations
function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Send reminders to clients whose anniversary is 60 days away
  const upcoming = await getUpcomingAnniversaries(60);

  const results = await Promise.allSettled(
    upcoming.map((record) => {
      const anniversary = new Date(record.formation_date!);
      anniversary.setFullYear(new Date().getFullYear());
      const formatted = anniversary.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return sendAnnualReportReminder({
        email: record.email,
        llcName: record.llc_name,
        state: record.state,
        anniversaryDate: formatted,
      });
    })
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  console.log(`Annual reminder cron: ${sent} sent, ${failed} failed`);
  return NextResponse.json({ sent, failed, total: upcoming.length });
}
