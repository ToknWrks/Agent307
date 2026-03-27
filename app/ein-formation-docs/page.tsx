import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Wyoming LLC EIN & Formation Documents | Agent307",
  description:
    "Every Wyoming LLC formed through Agent307 includes Articles of Organization, a single-member Operating Agreement, and EIN assistance — delivered to your inbox within 48 hours of formation.",
  keywords: [
    "Wyoming LLC EIN",
    "Wyoming LLC formation documents",
    "Articles of Organization Wyoming",
    "Wyoming LLC operating agreement",
    "EIN for LLC",
    "Wyoming LLC documents",
  ],
  openGraph: {
    title: "Wyoming LLC EIN & Formation Documents | Agent307",
    description:
      "Articles of Organization, Operating Agreement, and EIN assistance — included with every Wyoming LLC formation. Delivered in 48 hours.",
    url: "https://agent307.com/ein-formation-docs",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wyoming LLC EIN & Formation Documents",
  provider: { "@type": "Organization", name: "Agent307", url: "https://agent307.com" },
  description: "Articles of Organization, Operating Agreement, and EIN assistance included with Wyoming LLC formation.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Included free with Wyoming LLC formation ($299).",
  },
};

const documents = [
  {
    title: "Articles of Organization",
    description:
      "The legal document filed with the Wyoming Secretary of State to officially create your LLC. Includes your LLC name, registered agent, and management structure. Filed on your behalf — you receive a stamped copy.",
    detail: "Filed with Wyoming SOS. Turnaround: 24–48 hours.",
  },
  {
    title: "Operating Agreement",
    description:
      "An internal document that defines how your LLC is managed, who owns it, how profits are distributed, and what happens if the LLC is dissolved. Wyoming doesn't require you to file it — it's yours to keep. Ours is pre-drafted for single-member, member-managed LLCs.",
    detail: "Single-member template. Includes AI agent manager authorization clause.",
  },
  {
    title: "EIN Assistance",
    description:
      "An Employer Identification Number (EIN) is your LLC's federal tax ID — required to open a business bank account, hire employees, and file taxes. We walk you through the IRS online application, which takes about 10 minutes and is free.",
    detail: "IRS Form SS-4. Applied directly with the IRS — no additional fee.",
  },
];

const faqs = [
  {
    q: "What is an EIN and do I need one?",
    a: "An EIN (Employer Identification Number) is your LLC's federal tax identification number, issued by the IRS. You need it to open a business bank account, file taxes, and sign contracts on behalf of your LLC. Even if your LLC has no employees, you'll almost certainly need one. The IRS issues EINs for free online.",
  },
  {
    q: "What is an Operating Agreement and do I need to file it?",
    a: "An Operating Agreement is an internal document that governs your LLC — who owns it, how it's managed, how profits are divided, and what happens in a dissolution. Wyoming does not require you to file it with the state; it's kept privately. Despite that, it's important: banks often require it to open a business account, and it protects your liability shield if your LLC is ever challenged in court.",
  },
  {
    q: "Can the Operating Agreement authorize an AI agent as a manager?",
    a: "Yes. Your Wyoming Operating Agreement can include a clause authorizing a named AI system or software agent to act as a manager with defined, limited powers — such as making purchases up to a certain amount or executing specific types of contracts. Wyoming's flexible LLC statutes are uniquely suited to this kind of structure.",
  },
  {
    q: "How are documents delivered?",
    a: "Your Articles of Organization (state-stamped), Operating Agreement, and EIN guidance are emailed to you as PDF attachments within 48 hours of your LLC being approved by the Wyoming Secretary of State.",
  },
  {
    q: "Is the Operating Agreement editable?",
    a: "Yes. The template we provide is a standard single-member Wyoming LLC operating agreement. You can edit it to add members, change management structure, or add custom provisions — we recommend having an attorney review any significant modifications.",
  },
];

export default function EINFormationDocsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-background text-foreground">

        {/* Hero */}
        <section className="border-b border-black/5 py-16 md:py-24 dark:border-white/10">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="space-y-6">
              <span className="inline-block rounded-full border border-dashed border-[#A8F1F7]/40 bg-[#A8F1F7]/10 px-3 py-1 text-sm font-medium text-[#0e7490] dark:text-[#A8F1F7]">
                Formation Documents
              </span>
              <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
                Everything your LLC needs
                <span className="block text-[#0e7490] dark:text-[#A8F1F7]">to be real on paper.</span>
              </h1>
              <p className="max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
                Articles of Organization, Operating Agreement, and EIN assistance — included with every Wyoming LLC formation. Delivered to your inbox in 48 hours.
              </p>
              <Link
                href="/form-wyoming-llc"
                className="group inline-flex items-center gap-2 rounded-lg bg-[#A8F1F7] px-6 py-3 text-base font-semibold text-neutral-900 transition-all hover:scale-[1.02] hover:bg-[#A8F1F7]/80 hover:shadow-md">
                Form Wyoming LLC — $299
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="mb-10 text-3xl font-bold tracking-tighter md:text-4xl">
              What you receive
            </h2>
            <div className="space-y-6">
              {documents.map((doc) => (
                <div key={doc.title} className="rounded-2xl border border-dashed border-[#A8F1F7]/30 p-2">
                  <div className="rounded-xl border border-[#A8F1F7]/20 bg-[#A8F1F7]/5 p-6 dark:border-[#A8F1F7]/10">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold tracking-tighter text-black/90 dark:text-white/90">{doc.title}</h3>
                      <span className="shrink-0 rounded-full border border-[#A8F1F7]/30 bg-[#A8F1F7]/10 px-2.5 py-0.5 text-xs font-medium text-[#0e7490] dark:text-[#A8F1F7]">
                        Included
                      </span>
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-black/70 dark:text-white/70">{doc.description}</p>
                    <p className="mt-3 text-sm text-black/40 dark:text-white/40">{doc.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="border-t border-black/5 py-16 md:py-24 dark:border-white/10">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
              Why these documents matter
            </h2>
            <p className="mb-8 text-lg text-neutral-500 dark:text-neutral-400">
              An LLC exists in two places: the state's records, and your own documents. Both matter.
            </p>
            <ul className="space-y-3">
              {[
                "Banks require Articles of Organization and EIN to open a business checking account",
                "Operating Agreement protects your liability shield if your LLC is challenged in court",
                "EIN is required for all federal tax filings and hiring",
                "Operating Agreement can authorize AI agents as managers with defined, limited powers",
                "Wyoming's anonymous ownership is only as private as your documents — ours keep your name off public records",
              ].map((point) => (
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

        {/* FAQ */}
        <section className="border-t border-black/5 py-16 md:py-24 dark:border-white/10">
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
              Formation documents included at $299.
            </h2>
            <p className="mb-8 text-lg text-neutral-500 dark:text-neutral-400">
              Articles of Organization, Operating Agreement, and EIN assistance — all delivered within 48 hours.
            </p>
            <Link
              href="/form-wyoming-llc"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#A8F1F7] px-8 py-4 text-lg font-semibold text-neutral-900 transition-all hover:scale-[1.02] hover:bg-[#A8F1F7]/80 hover:shadow-md">
              Form Wyoming LLC — $299
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
