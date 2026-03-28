import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { saveBusinessPlanSubmission } from "@/app/lib/db";

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { llcName, agentPurpose, targetCustomers, revenueModel, industry } = body;

    if (!agentPurpose || typeof agentPurpose !== "string" || agentPurpose.trim().length < 10) {
      return NextResponse.json({ error: "Please describe what your agent does (min 10 characters)" }, { status: 400 });
    }

    const prompt = `You are a business analyst writing a concise, specific business plan for an AI-native company. Be specific — use real numbers, name real competitors, give concrete tactics. No filler.

LLC Name: ${llcName || "AI Agent LLC"}
Industry: ${industry || "infer from description"}
Agent: ${agentPurpose}
Customers: ${targetCustomers || "infer"}
Revenue: ${revenueModel || "infer best model"}

Return ONLY valid JSON (no markdown):
{
  "summary": "2-3 sentences: problem, mechanism, market size estimate, revenue model.",
  "problem": "1-2 sentences: specific pain, current workaround, cost in time/money.",
  "solution": "1-2 sentences: how the agent solves it differently.",
  "market": {
    "tam": "TAM with dollar figure and brief reasoning.",
    "sam": "SAM — realistic reachable slice.",
    "targets": ["segment with pain + willingness to pay", "segment 2", "segment 3"]
  },
  "competitive": {
    "landscape": "1-2 sentences naming real tools/companies and why this is differentiated.",
    "advantages": ["advantage 1", "advantage 2", "advantage 3"]
  },
  "revenue": {
    "model": "Pricing logic with specific dollar amount (e.g. $49/mo per seat).",
    "streams": ["primary stream", "secondary stream", "future stream"],
    "projections": "Year 1 estimate with stated assumptions (e.g. 50 customers × $49/mo = $29k ARR)."
  },
  "gtm": {
    "strategy": "1-2 sentences on reaching first 100 customers — specific channels/communities.",
    "channels": ["channel + tactic", "channel + tactic", "channel + tactic"]
  },
  "risks": [
    { "risk": "specific risk", "mitigation": "concrete response" },
    { "risk": "specific risk", "mitigation": "concrete response" },
    { "risk": "specific risk", "mitigation": "concrete response" }
  ],
  "steps": [
    { "title": "Wyoming LLC Formation", "detail": "File Articles of Organization via Agent307. Get EIN and operating agreement.", "done": true },
    { "title": "step", "detail": "specific actionable detail", "done": false },
    { "title": "step", "detail": "specific actionable detail", "done": false },
    { "title": "step", "detail": "specific actionable detail", "done": false },
    { "title": "step", "detail": "specific actionable detail", "done": false },
    { "title": "step", "detail": "specific actionable detail", "done": false },
    { "title": "step", "detail": "specific actionable detail", "done": false }
  ]
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    const raw = content.text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
    const plan = JSON.parse(raw);

    const planId = await saveBusinessPlanSubmission({ llcName, agentPurpose, industry, targetCustomers, revenueModel, plan });

    return NextResponse.json({
      planId,
      teaser: { summary: plan.summary },
    });
  } catch (error) {
    console.error("Business plan generation error:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Failed to parse generated plan" }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to generate business plan" }, { status: 500 });
  }
}
