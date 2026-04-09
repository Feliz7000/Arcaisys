import { HeroSection } from "@/components/sections/HeroSection";
import { SocialProof } from "@/components/sections/SocialProof";
import { BentoFeatures } from "@/components/sections/BentoFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StatsSection } from "@/components/sections/StatsSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { IntelligenceGrid } from "@/components/sections/IntelligenceGrid";
import { CTABanner } from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SocialProof />
      <BentoFeatures />
      <HowItWorks />
      <IntelligenceGrid />
      <StatsSection />
      <Testimonials />
      <CTABanner />
    </>
  );
}
