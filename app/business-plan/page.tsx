"use client";

import { ArrowRight, CheckCircle, Circle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface BusinessPlan {
  summary: string;
  problem: string;
  solution: string;
  market: { size: string; targets: string[] };
  revenue: { model: string; streams: string[] };
  risks: string[];
  steps: { title: string; detail: string; done: boolean }[];
}

export default function BusinessPlanPage() {
  const [llcName, setLlcName] = useState("");
  const [agentPurpose, setAgentPurpose] = useState("");
  const [targetCustomers, setTargetCustomers] = useState("");
  const [revenueModel, setRevenueModel] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<BusinessPlan | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPlan(null);

    try {
      const res = await fetch("/api/business-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ llcName, agentPurpose, targetCustomers, revenueModel, industry }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate plan");
      setPlan(data.plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">

        {/* Header */}
        <div className="mb-12 space-y-3">
          <span className="inline-block rounded-full border border-dashed border-[#A8F1F7]/40 bg-[#A8F1F7]/10 px-3 py-1 text-sm font-medium text-[#0e7490] dark:text-[#A8F1F7]">
            AI Business Plan
          </span>
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
            Your Wyoming LLC,<br />
            <span className="text-[#0e7490] dark:text-[#A8F1F7]">with a plan to match.</span>
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Tell us what your agent does. We'll generate a full business plan with implementation steps — your LLC formation already checked off.
          </p>
        </div>

        {!plan ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-black/70 dark:text-white/70">
                LLC name <span className="text-black/30 dark:text-white/30">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Nexus Dynamics LLC"
                value={llcName}
                onChange={(e) => setLlcName(e.target.value)}
                className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 font-mono text-base placeholder:text-neutral-400 focus:border-[#A8F1F7] focus:outline-none focus:ring-1 focus:ring-[#A8F1F7]/50 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-neutral-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-black/70 dark:text-white/70">
                What does your agent do? <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. My agent monitors competitor pricing, automatically adjusts our Shopify store prices, and generates weekly reports. It has access to our store API and can send emails."
                value={agentPurpose}
                onChange={(e) => setAgentPurpose(e.target.value)}
                className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-base placeholder:text-neutral-400 focus:border-[#A8F1F7] focus:outline-none focus:ring-1 focus:ring-[#A8F1F7]/50 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-neutral-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black/70 dark:text-white/70">
                  Industry <span className="text-black/30 dark:text-white/30">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. E-commerce, Healthcare, Finance"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-base placeholder:text-neutral-400 focus:border-[#A8F1F7] focus:outline-none focus:ring-1 focus:ring-[#A8F1F7]/50 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-neutral-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-black/70 dark:text-white/70">
                  Target customers <span className="text-black/30 dark:text-white/30">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Small Shopify merchants"
                  value={targetCustomers}
                  onChange={(e) => setTargetCustomers(e.target.value)}
                  className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-base placeholder:text-neutral-400 focus:border-[#A8F1F7] focus:outline-none focus:ring-1 focus:ring-[#A8F1F7]/50 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-black/70 dark:text-white/70">
                Revenue model <span className="text-black/30 dark:text-white/30">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Monthly SaaS subscription, per-transaction fee, consulting"
                value={revenueModel}
                onChange={(e) => setRevenueModel(e.target.value)}
                className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-base placeholder:text-neutral-400 focus:border-[#A8F1F7] focus:outline-none focus:ring-1 focus:ring-[#A8F1F7]/50 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-neutral-500"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading || !agentPurpose.trim()}
              className="group h-13 w-full rounded-lg bg-[#A8F1F7] text-base font-semibold text-neutral-900 transition-all hover:scale-[1.01] hover:bg-[#A8F1F7]/80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#A8F1F7] dark:text-neutral-900">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating your plan...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Generate Business Plan
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-8">
            {/* Summary */}
            <div className="rounded-2xl border border-dashed border-[#A8F1F7]/40 p-2">
              <div className="rounded-xl border border-[#A8F1F7]/20 bg-[#A8F1F7]/5 p-6 dark:border-[#A8F1F7]/10">
                {llcName && (
                  <p className="mb-2 font-mono text-lg font-semibold text-[#0e7490] dark:text-[#A8F1F7]">{llcName}</p>
                )}
                <p className="text-base leading-relaxed text-black/80 dark:text-white/80">{plan.summary}</p>
              </div>
            </div>

            {/* Problem / Solution */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Section title="The Problem">
                <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">{plan.problem}</p>
              </Section>
              <Section title="The Solution">
                <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">{plan.solution}</p>
              </Section>
            </div>

            {/* Market */}
            <Section title="Market Opportunity">
              <p className="mb-3 text-sm font-medium text-black/80 dark:text-white/80">{plan.market.size}</p>
              <ul className="space-y-1.5">
                {plan.market.targets.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A8F1F7]" />
                    {t}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Revenue */}
            <Section title="Revenue Model">
              <p className="mb-3 text-sm font-medium text-black/80 dark:text-white/80">{plan.revenue.model}</p>
              <ul className="space-y-1.5">
                {plan.revenue.streams.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A8F1F7]" />
                    {s}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Risks */}
            <Section title="Key Risks">
              <ul className="space-y-1.5">
                {plan.risks.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60" />
                    {r}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Implementation Steps */}
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Implementation Steps
              </h2>
              <div className="space-y-3">
                {plan.steps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 rounded-xl border p-4 ${
                      step.done
                        ? "border-[#A8F1F7]/20 bg-[#A8F1F7]/5 dark:border-[#A8F1F7]/10"
                        : "border-black/5 bg-black/2 dark:border-white/10 dark:bg-white/5"
                    }`}>
                    {step.done ? (
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0e7490] dark:text-[#A8F1F7]" />
                    ) : (
                      <Circle className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400" />
                    )}
                    <div>
                      <p className={`text-sm font-medium ${step.done ? "text-[#0e7490] dark:text-[#A8F1F7]" : "text-black/80 dark:text-white/80"}`}>
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-sm text-black/50 dark:text-white/50">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("set-product", { detail: { product: "formation", state: "WY" } }));
                  window.location.href = "/#reserve";
                }}
                className="flex-1 rounded-lg bg-[#A8F1F7] font-semibold text-neutral-900 hover:bg-[#A8F1F7]/80 dark:bg-[#A8F1F7] dark:text-neutral-900">
                Form {llcName || "Your Wyoming LLC"} — $299
              </Button>
              <button
                type="button"
                onClick={() => { setPlan(null); setError(""); }}
                className="flex-1 rounded-lg border border-black/10 bg-black/5 px-4 py-2.5 text-sm font-medium text-black/70 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10">
                Generate another plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-black/5 bg-black/2 p-5 dark:border-white/10 dark:bg-white/5">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">{title}</h2>
      {children}
    </div>
  );
}
