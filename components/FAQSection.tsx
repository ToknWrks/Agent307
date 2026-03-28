"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type FAQItem = {
  id: string;
  title: string;
  description: string;
};

const faqs: FAQItem[] = [
  {
    id: "what-do-you-do",
    title: "What exactly do you do?",
    description:
      "We form Wyoming LLCs for AI agent operators. You pay, we file the Articles of Organization with the Wyoming Secretary of State, and you get your formation documents — Articles of Organization, Operating Agreement, and EIN assistance — delivered to your inbox. We also act as your Wyoming registered agent, receiving legal documents on your LLC's behalf.",
  },
  {
    id: "why-wyoming",
    title: "Why Wyoming specifically?",
    description:
      "Wyoming invented the LLC in 1977 and has the strongest asset protection laws in the US. Single-member LLCs get full charging order protection — unlike most states. No state income tax. No franchise tax. Anonymous ownership (your name doesn't appear in public records). $60/yr annual report. 10-year cost under $600. For comparison, Delaware costs $3,000+ over 10 years and is overkill unless you're raising VC money.",
  },
  {
    id: "why-wyoming-ai",
    title: "Why Wyoming for AI agents specifically?",
    description:
      "Wyoming explicitly allows algorithmically managed LLCs in its DAO LLC statutes. It's one of the few states that has directly addressed non-human management by name. Combined with its privacy protections and low cost, it's the natural fit for AI agent operators.",
  },
  {
    id: "legal-own",
    title: "Can an AI legally own an LLC?",
    description:
      "No. The LLC is owned by you, a human. Your agent operates it. We form the LLC in your name, with your agent authorized to act as a manager under the Operating Agreement. The legal question of AI personhood is above our pay grade — we just handle the paperwork.",
  },
  {
    id: "what-is-registered-agent",
    title: "What is a registered agent and why do I need one?",
    description:
      "Every Wyoming LLC is legally required to have a registered agent — a person or business with a physical Wyoming address who is available during business hours to receive official legal documents (lawsuits, state notices, tax forms) on behalf of your LLC. We provide that service. Without one, your LLC can be administratively dissolved by the state.",
  },
  {
    id: "annual-report",
    title: "What's the Wyoming annual report?",
    description:
      "Wyoming requires every LLC to file an annual report and pay a $60 fee by the first day of the month your LLC was formed. Miss it and you get a 60-day grace period, then dissolution. Our $99/yr service includes 60-day advance email reminders so you never miss it.",
  },
  {
    id: "autonomous-agent",
    title: "My agent makes purchases and signs contracts. Do I actually need this?",
    description:
      "If your agent can send emails, make purchases, accept terms of service, or execute commands — it can create binding commitments in your name. Under the UETA (law in 47 states), contracts formed by electronic agents are binding even if no human reviewed them. An LLC separates your personal liability from your agent's actions. It's the same reason you don't run a business as a sole proprietor.",
  },
  {
    id: "how-fast",
    title: "How fast is formation?",
    description:
      "Wyoming SOS typically approves filings same-day or next business day. We file within 24 hours of your payment. Most customers receive their formation documents within 48 hours.",
  },
  {
    id: "after-pay",
    title: "What happens after I pay $99 for a reservation?",
    description:
      "We reserve your LLC name on our platform — no one else can claim it through us. You get a confirmation email with your next steps. The reservation is active for 120 days. Your $99 is credited toward full formation ($299).",
  },
  {
    id: "is-joke",
    title: "Is this a joke?",
    description:
      "The Air Canada chatbot case was not a joke ($812.02 judgment). The UETA is not a joke (binding in 47 states). The Wyoming LLC your agent needs is not a joke ($299, filed in 48 hours). The situation? Yeah, that's kind of funny.",
  },
];

export default function FAQSection() {
  const [expandedFAQ, setExpandedFAQ] = useState<string>("legal-own");

  return (
    <section
      className="w-full overflow-hidden py-16 pb-24 md:py-24 md:pb-32 lg:py-32 lg:pb-40"
      id="faq"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center md:mb-16">
          <h2 className="text-4xl font-bold tracking-tighter text-neutral-900 md:text-5xl lg:text-6xl dark:text-neutral-50">
            Questions we get asked.
            <br />
            <span className="text-neutral-500 dark:text-neutral-400">
              Answered honestly.
            </span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="mx-auto max-w-4xl space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="group rounded-2xl border border-black/5 border-dashed p-2 transition-all hover:border-neutral-300 dark:border-white/10 dark:bg-white/3"
              initial={{ opacity: 0, y: 20 }}
              key={faq.id}
              transition={{
                delay: 0.05 * index,
                duration: 0.3,
              }}
              viewport={{ once: true }}
            >
              {/* Inner Card */}
              <div className="overflow-hidden rounded-xl border border-black/5 bg-black/3 dark:border-white/10 dark:bg-white/10">
                {/* Clickable Header */}
                <button
                  aria-expanded={expandedFAQ === faq.id}
                  aria-label={
                    expandedFAQ === faq.id ? "Show less" : "Show more"
                  }
                  className="relative flex w-full items-center justify-between gap-4 p-5 text-left transition-colors"
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === faq.id ? "" : faq.id)
                  }
                  type="button"
                >
                  <h3 className="flex-1 text-base font-medium text-black/80 md:text-lg dark:text-white/80">
                    {faq.title}
                  </h3>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/5 transition-colors group-hover:bg-black/10 dark:bg-white/5 dark:group-hover:bg-white/10">
                    {expandedFAQ === faq.id ? (
                      <Minus className="h-3.5 w-3.5 text-black/60 dark:text-white/60" />
                    ) : (
                      <Plus className="h-3.5 w-3.5 text-black/60 dark:text-white/60" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      className="overflow-hidden"
                      exit={{ height: 0, opacity: 0 }}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-black/5 border-t px-5 pt-3 pb-5 dark:border-white/10">
                        <motion.p
                          animate={{ opacity: 1 }}
                          className="text-base leading-relaxed text-black/60 dark:text-white/60"
                          initial={{ opacity: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {faq.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
