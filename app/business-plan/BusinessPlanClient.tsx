"use client";

import { ArrowRight, Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Teaser {
  summary: string;
  problem: string;
  solution: string;
}

export default function BusinessPlanClient() {
  const [llcName, setLlcName] = useState("");
  const [agentPurpose, setAgentPurpose] = useState("");
  const [targetCustomers, setTargetCustomers] = useState("");
  const [revenueModel, setRevenueModel] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [teaser, setTeaser] = useState<Teaser | null>(null);
  const [planId, setPlanId] = useState<string>("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTeaser(null);

    try {
      const res = await fetch("/api/business-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ llcName, agentPurpose, targetCustomers, revenueModel, industry }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate plan");
      setTeaser(data.teaser);
      setPlanId(data.planId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async (product: "business_plan" | "reservation") => {
    if (!email || !email.includes("@")) {
      setError("Enter your email to continue.");
      return;
    }
    setUnlocking(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          state: "WY",
          llcName: llcName || undefined,
          product,
          plan_id: planId,
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setUnlocking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">

        {/* Header */}
        <div className="mb-12 space-y-3">
          <span className="inline-block rounded-full border border-dashed border-[#A8F1F7]/40 bg-[#A8F1F7]/10 px-3 py-1 text-sm font-medium text-[#0e7490] dark:text-[#A8F1F7]">
            AI Generated Business Plan
          </span>
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
            Your Wyoming LLC,<br />
            <span className="text-[#0e7490] dark:text-[#A8F1F7]">with a plan to match.</span>
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Tell us what your agent does. We'll generate a full AI business plan with implementation steps — your LLC formation already checked off.
          </p>
        </div>

        {!teaser ? (
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
                placeholder="e.g. My agent monitors competitor pricing, automatically adjusts our Shopify store prices, and generates weekly reports."
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
                  placeholder="e.g. E-commerce, Healthcare"
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
                placeholder="e.g. Monthly SaaS subscription, per-transaction fee"
                value={revenueModel}
                onChange={(e) => setRevenueModel(e.target.value)}
                className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-base placeholder:text-neutral-400 focus:border-[#A8F1F7] focus:outline-none focus:ring-1 focus:ring-[#A8F1F7]/50 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-neutral-500"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

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
          <div className="space-y-6">
            {/* Teaser — summary visible */}
            <div className="rounded-2xl border border-dashed border-[#A8F1F7]/40 p-2">
              <div className="rounded-xl border border-[#A8F1F7]/20 bg-[#A8F1F7]/5 p-6">
                {llcName && (
                  <p className="mb-2 font-mono text-lg font-semibold text-[#0e7490] dark:text-[#A8F1F7]">{llcName}</p>
                )}
                <p className="text-base leading-relaxed text-black/80 dark:text-white/80">{teaser.summary}</p>
              </div>
            </div>

            {/* Problem / Solution visible */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Section title="The Problem">
                <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">{teaser.problem}</p>
              </Section>
              <Section title="The Solution">
                <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">{teaser.solution}</p>
              </Section>
            </div>

            {/* Locked sections */}
            <div className="relative">
              <div className="pointer-events-none select-none space-y-4 blur-sm">
                <Section title="Market Opportunity">
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 rounded bg-black/10 dark:bg-white/10" />
                    <div className="h-3 w-1/2 rounded bg-black/10 dark:bg-white/10" />
                    <div className="h-3 w-2/3 rounded bg-black/10 dark:bg-white/10" />
                  </div>
                </Section>
                <Section title="Revenue Model">
                  <div className="space-y-2">
                    <div className="h-4 w-2/3 rounded bg-black/10 dark:bg-white/10" />
                    <div className="h-3 w-1/2 rounded bg-black/10 dark:bg-white/10" />
                  </div>
                </Section>
                <Section title="Key Risks">
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 rounded bg-black/10 dark:bg-white/10" />
                    <div className="h-3 w-1/2 rounded bg-black/10 dark:bg-white/10" />
                  </div>
                </Section>
                <div className="rounded-xl border border-black/5 p-5 dark:border-white/10">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">Implementation Steps</p>
                  <div className="space-y-3">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-5 w-5 shrink-0 rounded-full bg-black/10 dark:bg-white/10" />
                        <div className="h-3 rounded bg-black/10 dark:bg-white/10" style={{ width: `${55 + (i % 3) * 15}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Lock overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl">
                <div className="flex flex-col items-center gap-2 rounded-xl border border-black/10 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-black/80">
                  <Lock className="h-5 w-5 text-[#0e7490] dark:text-[#A8F1F7]" />
                  <p className="text-sm font-medium text-black/70 dark:text-white/70">
                    Market analysis, revenue model, risks & 7 implementation steps
                  </p>
                </div>
              </div>
            </div>

            {/* Unlock CTA */}
            <div className="rounded-2xl border border-dashed border-[#A8F1F7]/40 p-5 space-y-4">
              <p className="text-sm font-medium text-center text-black/70 dark:text-white/70">
                Unlock your full plan
              </p>

              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-base placeholder:text-neutral-400 focus:border-[#A8F1F7] focus:outline-none focus:ring-1 focus:ring-[#A8F1F7]/50 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-neutral-500"
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  disabled={unlocking}
                  onClick={() => handleUnlock("business_plan")}
                  className="flex-1 rounded-lg bg-[#A8F1F7] font-semibold text-neutral-900 hover:bg-[#A8F1F7]/80 dark:bg-[#A8F1F7] dark:text-neutral-900">
                  {unlocking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get full plan — $19"}
                </Button>
                <Button
                  type="button"
                  disabled={unlocking}
                  onClick={() => handleUnlock("reservation")}
                  className="flex-1 rounded-lg border border-[#A8F1F7]/40 bg-transparent font-semibold text-[#0e7490] hover:bg-[#A8F1F7]/10 dark:text-[#A8F1F7] dark:hover:bg-[#A8F1F7]/10">
                  {unlocking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Unlock with Wyoming LLC — $99+"}
                </Button>
              </div>
              <p className="text-center text-xs text-neutral-400">
                Full plan included with any LLC reservation or formation.
              </p>
            </div>

            <button
              type="button"
              onClick={() => { setTeaser(null); setError(""); setPlanId(""); }}
              className="w-full text-sm text-neutral-500 underline underline-offset-2 hover:text-neutral-300">
              Generate a different plan
            </button>
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
