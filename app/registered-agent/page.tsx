import type { Metadata } from "next";
import { SITE_URL } from "@/app/lib/constants";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Wyoming Registered Agent Service | Agent307 — $99/yr",
  description:
    "Wyoming registered agent service for AI agent operators and LLCs. $99/year. We receive legal documents and state notices on your behalf, forward everything to you, and send 60-day annual report reminders.",
  keywords: [
    "Wyoming registered agent",
    "registered agent service Wyoming",
    "Wyoming LLC registered agent",
    "AI agent LLC registered agent",
    "Wyoming registered agent $99",
  ],
  openGraph: {
    title: "Wyoming Registered Agent Service — $99/yr | Agent307",
    description:
      "Wyoming registered agent for AI-operated LLCs. $99/year. We receive your legal mail, forward it to you, and remind you before your annual report is due.",
    url: `${SITE_URL}/registered-agent`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wyoming Registered Agent Service",
  provider: { "@type": "Organization", name: "Agent307", url: SITE_URL },
  description: "Wyoming registered agent service for LLCs. $99/year.",
  offers: {
    "@type": "Offer",
    price: "99",
    priceCurrency: "USD",
    description: "Annual Wyoming registered agent service including document receipt, forwarding, and annual report reminders.",
  },
};

const included = [
  "Physical Wyoming address for your LLC's public filings",
  "Receipt of legal documents — lawsuits, subpoenas, state notices",
  "Same-day forwarding to your email",
  "Annual report reminder — 60 days before your due date",
  "State correspondence forwarding",
  "Automatic annual renewal — no lapse in coverage",
];

const faqs = [
  {
    q: "What is a registered agent?",
    a: "A registered agent is a person or business with a physical address in the state of formation that is legally designated to receive official documents on behalf of your LLC. This includes lawsuits, legal notices from the Secretary of State, tax documents, and other official correspondence. Every Wyoming LLC is required by law to have one.",
  },
  {
    q: "What happens if I don't have a registered agent?",
    a: "Without a registered agent, the Wyoming Secretary of State can administratively dissolve your LLC — even if you're otherwise in good standing. You also risk missing lawsuits or official notices, which can result in default judgments against your LLC.",
  },
  {
    q: "Do I need a Wyoming address to form a Wyoming LLC?",
    a: "You don't need to live in Wyoming or have a Wyoming address yourself. You just need a registered agent with a Wyoming address — which is exactly what we provide. You can be based anywhere in the world.",
  },
  {
    q: "What is the Wyoming annual report?",
    a: "Wyoming requires every LLC to file an annual report and pay a $60 filing fee. It's due on the first day of the month your LLC was originally formed. The report itself is simple — mainly a confirmation of your registered agent info. We send you a 60-day reminder so you never miss it.",
  },
  {
    q: "Is the first year included with LLC formation?",
    a: "Yes. When you form a Wyoming LLC through Agent307, registered agent service is included free for the first year. After that, it's $99/year, billed automatically.",
  },
  {
    q: "Can I use my own Wyoming address instead?",
    a: "If you have a physical Wyoming address that is available during business hours to receive legal documents, you can serve as your own registered agent. However, using a professional service keeps your personal address out of public records and ensures documents are never missed.",
  },
];

export default function RegisteredAgentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <section className="border-b border-black/5 py-16 md:py-24 dark:border-white/10">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="space-y-6">
              <span className="inline-block rounded-full border border-dashed border-[#A8F1F7]/40 bg-[#A8F1F7]/10 px-3 py-1 text-sm font-medium text-[#0e7490] dark:text-[#A8F1F7]">
                Registered Agent Service
              </span>
              <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
                Wyoming registered agent.
                <span className="block text-[#0e7490] dark:text-[#A8F1F7]">$99 per year.</span>
              </h1>
              <p className="max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
                Every Wyoming LLC needs a registered agent with a physical Wyoming address — available during business hours to receive legal documents. We handle it. You get notified when anything arrives.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#pricing"
                  className="group inline-flex items-center gap-2 rounded-lg bg-[#A8F1F7] px-6 py-3 text-base font-semibold text-neutral-900 transition-all hover:scale-[1.02] hover:bg-[#A8F1F7]/80 hover:shadow-md">
                  Subscribe — $99/yr
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/form-wyoming-llc"
                  className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-black/5 px-6 py-3 text-base font-medium text-black/70 transition-all hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10">
                  Form an LLC first — $299
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What we do */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 md:items-start">
              <div>
                <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
                  What&apos;s included
                </h2>
                <p className="text-lg text-neutral-500 dark:text-neutral-400">
                  Everything required to keep your Wyoming LLC in legal good standing — and to make sure you never miss a deadline.
                </p>
              </div>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A8F1F7]/20">
                      <Check className="h-3 w-3 text-[#0e7490] dark:text-[#A8F1F7]" />
                    </div>
                    <span className="text-base text-black/70 dark:text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="border-t border-black/5 bg-[#09090b] py-16 md:py-24 dark:border-white/10">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="mb-4 text-3xl font-bold tracking-tighter text-neutral-50 md:text-4xl">
              Why a registered agent matters for AI operators.
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Legal requirement",
                  body: "Wyoming law requires every LLC to maintain a registered agent with a physical in-state address at all times. Lapse in coverage can lead to administrative dissolution.",
                },
                {
                  title: "Privacy protection",
                  body: "Using a professional registered agent keeps your personal address out of the public record. Wyoming already offers anonymous ownership — we complete the picture.",
                },
                {
                  title: "Never miss a deadline",
                  body: "We send your annual report reminder 60 days before it's due. Missing the $60 filing can cost you the LLC. We make sure that doesn't happen.",
                },
              ].map((card) => (
                <div key={card.title} className="rounded-xl border border-white/5 bg-white/[0.03] p-6">
                  <h3 className="mb-2 text-base font-semibold text-neutral-100">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <h2 className="mb-10 text-3xl font-bold tracking-tighter md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b border-black/5 pb-6 dark:border-white/10">
                  <h3 className="mb-2 text-base font-semibold text-black/90 dark:text-white/90">{faq.q}</h3>
                  <p className="text-base leading-relaxed text-black/60 dark:text-white/60">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-black/5 bg-[#A8F1F7]/5 py-16 dark:border-white/10">
          <div className="container mx-auto max-w-3xl px-4 text-center md:px-6">
            <h2 className="mb-3 text-3xl font-bold tracking-tighter md:text-4xl">
              Keep your LLC in good standing.
            </h2>
            <p className="mb-8 text-lg text-neutral-500 dark:text-neutral-400">
              Wyoming registered agent service. $99/year. Includes your first year free with LLC formation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/#pricing"
                className="group inline-flex items-center gap-2 rounded-lg bg-[#A8F1F7] px-8 py-4 text-lg font-semibold text-neutral-900 transition-all hover:scale-[1.02] hover:bg-[#A8F1F7]/80 hover:shadow-md">
                Subscribe — $99/yr
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-neutral-400">
              Don&apos;t have a Wyoming LLC yet?{" "}
              <Link href="/form-wyoming-llc" className="text-[#0e7490] underline underline-offset-2 dark:text-[#A8F1F7]">
                Form one for $299 — registered agent included free for year one.
              </Link>
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
