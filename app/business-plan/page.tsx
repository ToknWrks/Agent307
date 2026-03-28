import type { Metadata } from "next";
import { SITE_URL } from "@/app/lib/constants";
import BusinessPlanClient from "./BusinessPlanClient";

export const metadata: Metadata = {
  title: "AI Generated Business Plan for Your Wyoming LLC | Agent307",
  description:
    "Generate a free AI business plan for your AI agent or startup. Get a full plan with market analysis, revenue model, and implementation steps — your Wyoming LLC formation already checked off.",
  keywords: [
    "AI generated business plan",
    "AI business plan generator",
    "business plan for AI agent",
    "Wyoming LLC business plan",
    "AI startup business plan",
    "free business plan generator",
    "business plan for LLC",
    "AI agent business plan",
  ],
  alternates: { canonical: `${SITE_URL}/business-plan` },
  openGraph: {
    title: "AI Generated Business Plan | Agent307",
    description:
      "Free AI business plan generator. Describe your agent, get a full business plan with implementation checklist — Wyoming LLC formation included.",
    url: `${SITE_URL}/business-plan`,
    siteName: "Agent307",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Generated Business Plan | Agent307",
    description:
      "Free AI business plan generator for AI agents and startups. Wyoming LLC included.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Business Plan Generator",
  url: `${SITE_URL}/business-plan`,
  description:
    "Generate an AI business plan for your Wyoming LLC. Includes market analysis, revenue model, risks, and implementation steps.",
  applicationCategory: "BusinessApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function BusinessPlanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BusinessPlanClient />
    </>
  );
}
