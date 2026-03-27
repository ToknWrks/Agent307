import { Suspense } from "react";
import { getReservationCount } from "@/app/lib/db";
import { SITE_URL } from "@/app/lib/constants";
import HeroSection from "@/components/HeroSection";
import SocialProofMarquee from "@/components/SocialProofMarquee";
import ProblemSection from "@/components/ProblemSection";
import Feature from "@/components/Feature";
import StatesSection from "@/components/StatesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import UseCasesSection from "@/components/UseCasesSection";
import { RoleToggleProvider } from "@/components/RoleToggle";
import { Preloader } from "@/components/Preloader";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Agent307",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description:
    "Wyoming LLCs for AI Agents. LLC formation filed in 48 hours with registered agent service, formation documents, and annual report reminders.",
  sameAs: [
    "https://github.com/ToknWrks/Agent307",
  ],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "99",
    highPrice: "499",
    offerCount: "3",
  },
};

export default async function Home() {
  const reservationCount = await getReservationCount();

  return (
    <RoleToggleProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Preloader />
      <Suspense>
        <HeroSection />
      </Suspense>
      <SocialProofMarquee />
      <ProblemSection />
      <Feature />
      <StatesSection />
      <PricingSection />
      <FAQSection />
      <UseCasesSection reservationCount={reservationCount} />
    </RoleToggleProvider>
  );
}
