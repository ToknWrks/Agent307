"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "motion/react";

const pricingPlans = [
  {
    name: "$99 Name Reservation",
    price: 99,
    period: "",
    tagline: "Lock it down",
    description: "Your agent's Wyoming LLC name, reserved for 120 days. Credited toward formation.",
    features: [
      "Real-time Wyoming name availability check",
      "120-day name hold",
      "$99 credited toward full formation",
      "Confirmation email with next steps",
    ],
    highlighted: false,
    cta: "Reserve Name",
    product: "reservation" as const,
  },
  {
    name: "$299 Wyoming LLC",
    price: 299,
    period: "",
    tagline: "Most popular",
    description: "Full Wyoming LLC. Filed in 48 hours. Anonymous ownership.",
    features: [
      "Articles of Organization filed",
      "Operating Agreement included",
      "Anonymous ownership — no public records",
      "No state income tax, no franchise tax",
      "Registered agent service (first year free)",
      "EIN assistance",
    ],
    highlighted: true,
    cta: "Form Wyoming LLC",
    product: "formation" as const,
  },
  {
    name: "$99 Annual Service",
    price: 99,
    period: "/yr",
    tagline: "Stay compliant",
    description: "Registered agent service + annual report reminders. We keep your LLC in good standing.",
    features: [
      "Wyoming registered agent address",
      "Legal document receipt & forwarding",
      "60-day annual report reminder",
      "State notice forwarding",
      "Renewal billing handled automatically",
    ],
    highlighted: false,
    cta: "Subscribe",
    product: "annual_service" as const,
  },
];

export default function PricingSection() {
  return (
    <section className="w-full overflow-hidden py-16 md:py-24 lg:py-32 dark:bg-white/[0.02]" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center md:mb-16">
          <h2 className="text-4xl font-bold tracking-tighter text-neutral-900 md:text-5xl dark:text-neutral-50">
            Wyoming LLC for your agent. Filed in 48 hours.
          </h2>
          <p className="mx-auto max-w-[500px] text-lg text-neutral-400">
            We handle the paperwork. You get the protection.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, planIndex) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={`group rounded-2xl border border-dashed p-2 transition-all hover:border-neutral-300 ${
                plan.highlighted
                  ? "border-[#A8F1F7]/50 bg-[#A8F1F7]/5 dark:border-[#A8F1F7]/30 dark:bg-[#A8F1F7]/5"
                  : "bg-black/1 dark:bg-white/3 border-black/5 dark:border-white/10"
              }`}
              initial={{ opacity: 0, y: 20 }}
              key={plan.name}
              transition={{
                delay: 0.1 + planIndex * 0.05,
                duration: 0.4,
              }}>
              {/* Inner Card */}
              <div className="bg-black/3 flex h-full flex-col rounded-xl border border-black/5 p-6 dark:border-white/10 dark:bg-white/10">
                {/* Plan Header */}
                <div className="mb-4">
                  {plan.highlighted && (
                    <span className="mb-2 inline-block rounded-full border border-dashed border-[#A8F1F7] bg-[#A8F1F7]/10 px-2.5 py-0.5 text-sm font-medium text-neutral-900 dark:text-neutral-50">
                      Most Popular
                    </span>
                  )}
                  <h3 className="mb-1 text-2xl font-semibold tracking-tighter text-black/80 dark:text-white/80">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[#0e7490] dark:text-[#A8F1F7]">{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-end gap-1">
                    <span className="text-6xl font-bold tracking-tighter text-black/80 dark:text-white/80">
                      ${plan.price}
                    </span>
                    {plan.period && (
                      <span className="mb-2 text-lg text-black/40 dark:text-white/40">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="mb-4 text-base text-black/60 dark:text-white/60">{plan.description}</p>

                {/* CTA Button */}
                <Button
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("set-product", {
                        detail: { product: plan.product, state: "WY" },
                      })
                    );
                    document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`mb-4 h-12 w-full rounded-lg text-base font-medium transition-all ${
                    plan.highlighted
                      ? "border border-dashed border-[#A8F1F7] bg-[#A8F1F7]/20 text-neutral-900 hover:bg-[#A8F1F7]/30 dark:bg-[#A8F1F7]/20 dark:text-neutral-50 dark:hover:bg-[#A8F1F7]/30"
                      : "border border-dashed border-black/5 bg-black/5 text-black/80 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                  }`}>
                  {plan.cta}
                </Button>

                {/* Features List */}
                <div className="flex-1 space-y-2.5">
                  <p className="mb-3 text-sm font-medium text-black/80 dark:text-white/80">
                    What&apos;s included:
                  </p>
                  {plan.features.map((feature) => (
                    <div className="flex items-start gap-2" key={feature}>
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                        <Check className="h-2.5 w-2.5 text-black/70 dark:text-white/70" />
                      </div>
                      <span className="text-sm leading-tight text-black/60 dark:text-white/60">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-base text-black/60 dark:text-white/60">
            All formation orders include registered agent service free for year one. Wyoming only.
          </p>
        </div>
      </div>
    </section>
  );
}
