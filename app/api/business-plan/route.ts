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

    const prompt = `You are a senior business analyst writing a paid business plan for an AI-native company. Your job is to produce a specific, data-rich, actionable plan — not generic filler. Every section must contain concrete details, real market data estimates, named competitors or analogous businesses, and specific numbers wherever possible.

Company details:
- LLC Name: ${llcName || "AI Agent LLC"}
- Industry: ${industry || "Not specified — infer from the agent description"}
- What the agent does: ${agentPurpose}
- Target customers: ${targetCustomers || "Infer from the agent description"}
- Revenue model: ${revenueModel || "Infer the most logical model from the agent description"}

Return a JSON object with this exact structure. Every field must be specific to THIS business — never generic. If you don't know a specific number, make a well-reasoned estimate and say so.

{
  "summary": "3-4 sentence executive summary that names the specific problem, the agent's unique mechanism for solving it, the target market with a size estimate, and the primary revenue model. Be specific.",

  "problem": "2-3 sentences describing the exact pain point with specificity. Include how businesses currently handle this problem and why that's inadequate. Name the cost or inefficiency in concrete terms (time, money, error rate).",

  "solution": "2-3 sentences on how this specific agent solves it. Focus on the mechanism — what the agent actually does, how it's different from existing tools, and what outcome it produces.",

  "market": {
    "tam": "Total addressable market with a dollar figure and source reasoning (e.g. 'The global X market is estimated at $Y billion based on Z')",
    "sam": "Serviceable addressable market — the realistic slice this agent can reach, with reasoning",
    "targets": [
      "Specific customer segment with a pain point and willingness to pay",
      "Second segment",
      "Third segment"
    ]
  },

  "competitive": {
    "landscape": "2-3 sentences on who currently occupies this space — name real companies or categories of tools. Explain why this agent is differentiated.",
    "advantages": [
      "Specific competitive advantage 1",
      "Specific competitive advantage 2",
      "Specific competitive advantage 3"
    ]
  },

  "revenue": {
    "model": "Primary revenue model with specific pricing logic (e.g. '$X/month per seat because Y', or '$X per transaction at Z% margin')",
    "streams": [
      "Primary revenue stream with estimated price point",
      "Secondary stream",
      "Tertiary or future stream"
    ],
    "projections": "Conservative Year 1 revenue estimate with assumptions stated (e.g. 'At $X/mo with Y customers by month 12 = $Z ARR')"
  },

  "gtm": {
    "strategy": "2-3 sentences on how to reach the first 100 customers. Be specific — name channels, tactics, or communities.",
    "channels": [
      "Specific channel 1 with tactic",
      "Specific channel 2 with tactic",
      "Specific channel 3 with tactic"
    ]
  },

  "risks": [
    { "risk": "Specific risk", "mitigation": "Concrete mitigation strategy" },
    { "risk": "Specific risk", "mitigation": "Concrete mitigation strategy" },
    { "risk": "Specific risk", "mitigation": "Concrete mitigation strategy" }
  ],

  "steps": [
    { "title": "Wyoming LLC Formation", "detail": "File Articles of Organization with Wyoming SOS via Agent307. Establish EIN, registered agent, and operating agreement.", "done": true },
    { "title": "Step 2 title", "detail": "Specific, actionable detail with a concrete deliverable or milestone", "done": false },
    { "title": "Step 3 title", "detail": "Specific, actionable detail", "done": false },
    { "title": "Step 4 title", "detail": "Specific, actionable detail", "done": false },
    { "title": "Step 5 title", "detail": "Specific, actionable detail", "done": false },
    { "title": "Step 6 title", "detail": "Specific, actionable detail", "done": false },
    { "title": "Step 7 title", "detail": "Specific, actionable detail", "done": false }
  ]
}

Rules:
- Every section must be specific to this exact business. No filler phrases like "leverage synergies" or "build a strong team."
- Steps 2-7 must be ordered by priority and specific to this business — not generic startup advice.
- The competitive section must name real companies or tool categories, not say "there are many competitors."
- Revenue projections must include real numbers and stated assumptions.
- Return only valid JSON. No markdown, no code fences.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
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
