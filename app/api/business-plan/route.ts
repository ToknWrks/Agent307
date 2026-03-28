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

    const prompt = `You are a business plan consultant specializing in AI-native businesses and autonomous agents.

Generate a focused, practical business plan for the following Wyoming LLC:

LLC Name: ${llcName || "AI Agent LLC"}
Industry: ${industry || "Not specified"}
What the agent does: ${agentPurpose}
Target customers: ${targetCustomers || "Not specified"}
Revenue model: ${revenueModel || "Not specified"}

Return a JSON object with this exact structure:
{
  "summary": "2-3 sentence executive summary",
  "problem": "The problem this agent solves (2-3 sentences)",
  "solution": "How this agent solves it (2-3 sentences)",
  "market": {
    "size": "Estimated market size or opportunity",
    "targets": ["target customer segment 1", "target customer segment 2", "target customer segment 3"]
  },
  "revenue": {
    "model": "Primary revenue model description",
    "streams": ["revenue stream 1", "revenue stream 2", "revenue stream 3"]
  },
  "risks": ["key risk 1", "key risk 2", "key risk 3"],
  "steps": [
    { "title": "Wyoming LLC Formation", "detail": "File Articles of Organization with Wyoming SOS. Establish legal entity, registered agent, and EIN.", "done": true },
    { "title": "step title", "detail": "actionable detail", "done": false },
    { "title": "step title", "detail": "actionable detail", "done": false },
    { "title": "step title", "detail": "actionable detail", "done": false },
    { "title": "step title", "detail": "actionable detail", "done": false },
    { "title": "step title", "detail": "actionable detail", "done": false },
    { "title": "step title", "detail": "actionable detail", "done": false }
  ]
}

The steps array must have exactly 7 items. The first item is always Wyoming LLC Formation with done: true. The remaining 6 are the most important next actions specific to this business, ordered by priority. Keep all text concise and actionable. Return only valid JSON, no markdown.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const raw = content.text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
    const plan = JSON.parse(raw);

    // Save to DB and get planId — needed for gated unlock after payment
    const planId = await saveBusinessPlanSubmission({ llcName, agentPurpose, industry, targetCustomers, revenueModel, plan });

    // Return teaser only — full plan is gated behind payment
    return NextResponse.json({
      planId,
      teaser: {
        summary: plan.summary,
        problem: plan.problem,
        solution: plan.solution,
      },
    });
  } catch (error) {
    console.error("Business plan generation error:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Failed to parse generated plan" }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to generate business plan" }, { status: 500 });
  }
}
