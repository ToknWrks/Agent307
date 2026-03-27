"use client";

import { Check, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const wyomingHighlights = [
  { stat: "1977", label: "Wyoming invented the LLC", detail: "The original liability shield, still the strongest." },
  { stat: "#1", label: "Asset protection in the US", detail: "Charging order protection covers single-member LLCs." },
  { stat: "$0", label: "State income tax", detail: "No franchise tax, no income tax, no nonsense." },
  { stat: "Anonymous", label: "Ownership not in public records", detail: "Member names stay private — unlike most states." },
  { stat: "48hrs", label: "Formation turnaround", detail: "Filed with Wyoming SOS, approved fast." },
  { stat: "$60/yr", label: "Annual report fee", detail: "10-year total cost: $500–600. Delaware: $3,000+." },
];

const legalPoints = [
  "Wyoming explicitly allows algorithmically managed LLCs through its DAO LLC framework",
  "Single-member LLCs receive the same charging order protection as multi-member LLCs",
  "No requirement to list member names in public filings",
  "Flexible operating agreement — set any management structure you want",
];

export default function StatesSection() {
  return (
    <section id="why-wyoming" className="w-full overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center md:mb-16">
          <h2 className="text-4xl font-bold tracking-tighter text-neutral-900 md:text-5xl lg:text-6xl dark:text-neutral-50">
            Wyoming invented the LLC.{" "}
            <span className="block text-[#0e7490] dark:text-[#A8F1F7]">Now it lets AI run one.</span>
          </h2>
          <p className="mx-auto max-w-[600px] text-lg text-neutral-400 md:text-xl">
            The state that created the modern liability shield in 1977 now allows algorithmically managed LLCs — by name, in its statutes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mx-auto mb-10 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3">
          {wyomingHighlights.map((item, i) => (
            <motion.div
              key={item.stat}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
              className="rounded-2xl border border-dashed border-[#A8F1F7]/30 p-2">
              <div className="rounded-xl border border-[#A8F1F7]/20 bg-[#A8F1F7]/5 p-5 h-full dark:border-[#A8F1F7]/10 dark:bg-[#A8F1F7]/5">
                <p className="text-3xl font-bold tracking-tighter text-[#0e7490] dark:text-[#A8F1F7]">{item.stat}</p>
                <p className="mt-1 text-sm font-medium text-black/80 dark:text-white/80">{item.label}</p>
                <p className="mt-1 text-xs text-black/50 dark:text-white/50">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legal points + CTA */}
        <div className="mx-auto max-w-5xl">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="rounded-2xl border border-dashed border-[#A8F1F7]/30 p-2">
            <div className="flex flex-col gap-6 rounded-xl border border-[#A8F1F7]/20 bg-[#A8F1F7]/5 p-6 md:flex-row md:items-center md:p-8 dark:border-[#A8F1F7]/10 dark:bg-[#A8F1F7]/5">
              <div className="flex-1 space-y-3">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#0e7490] dark:text-[#A8F1F7]">
                  Why Wyoming for AI specifically
                </p>
                <ul className="space-y-2">
                  {legalPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A8F1F7]/20">
                        <Check className="h-3 w-3 text-[#0e7490] dark:text-[#A8F1F7]" />
                      </div>
                      <span className="text-sm leading-relaxed text-black/70 dark:text-white/70">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("set-product", { detail: { product: "formation", state: "WY" } }));
                    document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center gap-2 rounded-lg bg-[#A8F1F7] px-6 py-3 text-base font-semibold text-neutral-900 transition-all hover:scale-[1.02] hover:bg-[#A8F1F7]/80 hover:shadow-md">
                  Form Wyoming LLC — $299
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
