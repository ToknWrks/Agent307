import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { EVIDENCE, SITE_URL } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: "Form a Wyoming LLC Online | Agent307 — Filed in 48 Hours",
  description:
    "Form a Wyoming LLC for your AI agent online. $299 all-in — Articles of Organization, Operating Agreement, registered agent included. Anonymous ownership. No state income tax. Filed in 48 hours.",
  keywords: [
    "form Wyoming LLC",
    "Wyoming LLC formation",
    "Wyoming LLC for AI agents",
    "form LLC online Wyoming",
    "Wyoming registered agent",
    "anonymous LLC Wyoming",
  ],
  openGraph: {
    title: "Form a Wyoming LLC Online — Filed in 48 Hours | Agent307",
    description:
      "Wyoming LLC formation for AI agent operators. $299 all-in. Anonymous ownership. No state income tax. Filed with the Wyoming Secretary of State in 48 hours.",
    url: `${SITE_URL}/form-wyoming-llc`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wyoming LLC Formation",
  provider: { "@type": "Organization", name: "Agent307", url: SITE_URL },
  description: "Wyoming LLC formation for AI agent operators. Filed in 48 hours.",
  offers: {
    "@type": "Offer",
    price: "299",
    priceCurrency: "USD",
    description: "Wyoming LLC formation including Articles of Organization, Operating Agreement, and registered agent service (first year free).",
  },
};

const wyomingStats = [
  { stat: "1977", label: "Wyoming invented the LLC" },
  { stat: "#1", label: "Asset protection in the US" },
  { stat: "$0", label: "State income tax" },
  { stat: "Anonymous", label: "Ownership — not in public records" },
  { stat: "48 hrs", label: "Formation turnaround" },
  { stat: "$60/yr", label: "Annual report fee" },
];

const included = [
  "Articles of Organization filed with Wyoming Secretary of State",
  "Operating Agreement — single-member, fully customizable",
  "Anonymous ownership — member names not in public filings",
  "No state income tax, no franchise tax",
  "Registered agent service included free for year one",
  "EIN assistance (federal tax ID)",
  "Formation documents delivered to your inbox",
];

const legalPoints = [
  "Wyoming explicitly allows algorithmically managed LLCs through its DAO LLC framework",
  "Single-member LLCs receive the same full charging order protection as multi-member LLCs",
  "No requirement to list member names in Articles of Organization",
  "Flexible operating agreement — authorize AI agents as managers in writing",
];

const faqs = [
  {
    q: "How long does Wyoming LLC formation take?",
    a: "Wyoming Secretary of State typically approves filings same-day or next business day. We file within 24 hours of your payment. Most customers receive their formation documents within 48 hours.",
  },
  {
    q: "Why Wyoming instead of Delaware?",
    a: "Wyoming costs $299 all-in with a $60/yr annual report. Delaware costs $399 to form and $300+/yr in franchise taxes — over $3,000 in 10 years. Wyoming has stronger single-member LLC protection, anonymous ownership, and no state income tax. Choose Delaware if you're raising institutional venture capital. Choose Wyoming for everything else.",
  },
  {
    q: "Is my name kept private with a Wyoming LLC?",
    a: "Yes. Wyoming does not require member or manager names to appear in the Articles of Organization filed with the Secretary of State. Your ownership stays out of public records.",
  },
  {
    q: "What does 'registered agent' mean and why is it included?",
    a: "Every Wyoming LLC must have a registered agent — a person or company with a physical Wyoming address available during business hours to receive legal documents. We serve as your registered agent. Without one, your LLC can be administratively dissolved. Your first year is included free with formation; $100/yr after that.",
  },
  {
    q: "Can my AI agent be listed as a manager of the LLC?",
    a: "Your Wyoming Operating Agreement can authorize an AI system, software, or agent to act as a manager with defined powers. Wyoming's flexible LLC statutes allow for algorithmic management — it's one of the few states that explicitly contemplates this in its DAO LLC framework.",
  },
  {
    q: "What is a Wyoming annual report?",
    a: "Wyoming requires a simple annual report with a $60 filing fee, due on the first day of the month your LLC was formed each year. It's minimal — just a confirmation of your registered agent and a fee. We send a 60-day reminder if you subscribe to our registered agent service.",
  },
];

export default function FormWyomingLLCPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <section className="border-b border-black/5 py-16 md:py-24 dark:border-white/10">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="space-y-6">
              <span className="inline-block rounded-full border border-dashed border-[#A8F1F7]/40 bg-[#A8F1F7]/10 px-3 py-1 text-sm font-medium text-[#0e7490] dark:text-[#A8F1F7]">
                Wyoming LLC Formation
              </span>
              <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
                Form a Wyoming LLC online.
                <span className="block text-[#0e7490] dark:text-[#A8F1F7]">Filed in 48 hours.</span>
              </h1>
              <p className="max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
                Wyoming has the strongest asset protection laws in the US, zero state income tax, and anonymous ownership. $299 all-in — Articles of Organization, Operating Agreement, and registered agent included.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#reserve"
                  className="group inline-flex items-center gap-2 rounded-lg bg-[#A8F1F7] px-6 py-3 text-base font-semibold text-neutral-900 transition-all hover:scale-[1.02] hover:bg-[#A8F1F7]/80 hover:shadow-md">
                  Form Wyoming LLC — $299
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/#reserve"
                  className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-black/5 px-6 py-3 text-base font-medium text-black/70 transition-all hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10">
                  Reserve name first — $99
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Wyoming Stats */}
        <section className="py-16 md:py-24" id="why-wyoming">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
              Why Wyoming?
            </h2>
            <p className="mb-10 max-w-2xl text-lg text-neutral-500 dark:text-neutral-400">
              Wyoming invented the LLC in 1977 and has spent 45+ years refining the strongest liability protection laws in the country.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {wyomingStats.map((item) => (
                <div key={item.stat} className="rounded-xl border border-dashed border-[#A8F1F7]/30 bg-[#A8F1F7]/5 p-5 dark:border-[#A8F1F7]/10">
                  <p className="text-3xl font-bold tracking-tighter text-[#0e7490] dark:text-[#A8F1F7]">{item.stat}</p>
                  <p className="mt-1 text-sm text-black/70 dark:text-white/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Wyoming for AI */}
        <section className="border-t border-black/5 py-16 md:py-24 dark:border-white/10">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
              Why Wyoming for AI agents specifically?
            </h2>
            <p className="mb-8 max-w-2xl text-lg text-neutral-500 dark:text-neutral-400">
              Wyoming is one of the only states that has directly addressed non-human management of LLCs in its statutes.
            </p>
            <ul className="mb-8 space-y-3">
              {legalPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A8F1F7]/20">
                    <Check className="h-3 w-3 text-[#0e7490] dark:text-[#A8F1F7]" />
                  </div>
                  <span className="text-base text-black/70 dark:text-white/70">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What's Included */}
        <section className="border-t border-black/5 py-16 md:py-24 dark:border-white/10">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 md:items-start">
              <div>
                <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
                  What&apos;s included for $299
                </h2>
                <p className="text-lg text-neutral-500 dark:text-neutral-400">
                  Everything you need to have a legally formed, operational Wyoming LLC — delivered to your inbox in 48 hours.
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

        {/* Liability / Evidence */}
        <section className="bg-[#09090b] py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="mb-4 text-3xl font-bold tracking-tighter text-neutral-50 md:text-4xl">
              Why AI operators need an LLC.
            </h2>
            <p className="mb-10 text-lg text-neutral-400">
              If your agent makes purchases, signs contracts, or executes code — you are personally liable for what it does. These are real cases.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {EVIDENCE.map((card) => (
                <div key={card.id} className="flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-6">
                  <p className="mb-4 text-sm font-medium uppercase tracking-wider text-neutral-500">{card.title}</p>
                  <blockquote className="mb-6 flex-1 text-base leading-relaxed text-neutral-300 italic">
                    &ldquo;{card.quote}&rdquo;
                  </blockquote>
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 inline-flex items-center gap-1.5 rounded-md border border-[#A8F1F7]/20 bg-[#A8F1F7]/5 px-3 py-1.5 text-sm font-medium text-[#A8F1F7] transition-colors hover:border-[#A8F1F7]/40">
                    {card.source}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="text-sm text-neutral-500">{card.footnote}</p>
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
              Ready to form your Wyoming LLC?
            </h2>
            <p className="mb-8 text-lg text-neutral-500 dark:text-neutral-400">
              Filed with the Wyoming Secretary of State in 48 hours. $299 all-in.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/#reserve"
                className="group inline-flex items-center gap-2 rounded-lg bg-[#A8F1F7] px-8 py-4 text-lg font-semibold text-neutral-900 transition-all hover:scale-[1.02] hover:bg-[#A8F1F7]/80 hover:shadow-md">
                Form Wyoming LLC — $299
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-neutral-400">
              Need to check your name first?{" "}
              <Link href="/#reserve" className="text-[#0e7490] underline underline-offset-2 dark:text-[#A8F1F7]">
                Reserve for $99 — credited toward formation.
              </Link>
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
