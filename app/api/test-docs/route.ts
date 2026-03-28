import { NextResponse } from "next/server";
import { generateArticlesOfOrganization, generateOperatingAgreement } from "@/app/lib/docs";

// TEST ONLY — remove before go-live
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const now = new Date();

  const [articlesBytes, operatingBytes] = await Promise.all([
    generateArticlesOfOrganization({
      llcName: "Neural Holdings LLC",
      registeredAgentName: process.env.REGISTERED_AGENT_NAME || "Agent307, LLC",
      registeredAgentAddress: process.env.REGISTERED_AGENT_ADDRESS || "123 Main St, Cheyenne, WY 82001",
      organizerName: process.env.ORGANIZER_NAME || "Lance Pitman",
      filingDate: now,
    }),
    generateOperatingAgreement({
      llcName: "Neural Holdings LLC",
      memberName: "Lance Pitman",
      memberAddress: "123 Test St, City, State 00000",
      registeredAgentName: process.env.REGISTERED_AGENT_NAME || "Agent307, LLC",
      registeredAgentAddress: process.env.REGISTERED_AGENT_ADDRESS || "123 Main St, Cheyenne, WY 82001",
      effectiveDate: now,
    }),
  ]);

  // Return as a simple JSON with base64 so you can inspect sizes
  return NextResponse.json({
    articles: {
      filename: "Neural Holdings LLC - Articles of Organization.pdf",
      sizeKb: Math.round(articlesBytes.length / 1024),
      base64: Buffer.from(articlesBytes).toString("base64"),
    },
    operating: {
      filename: "Neural Holdings LLC - Operating Agreement.pdf",
      sizeKb: Math.round(operatingBytes.length / 1024),
      base64: Buffer.from(operatingBytes).toString("base64"),
    },
  });
}
