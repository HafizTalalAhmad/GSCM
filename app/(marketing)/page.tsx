import { HeroSection } from "@/components/marketing/hero-section";
import {
  BlogPreviewSection,
  CaseStudiesSection,
  ExpertiseSection,
  FaqPreviewSection,
  FinalCtaSection,
  MetricsSection,
  PricingPreviewSection,
  ServicesSection,
  TestimonialsSection,
  TrustedBySection,
  WhyChooseUsSection,
} from "@/components/marketing/home-sections";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <ExpertiseSection />
      <WhyChooseUsSection />
      <CaseStudiesSection />
      <MetricsSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <BlogPreviewSection />
      <FaqPreviewSection />
      <FinalCtaSection />
    </main>
  );
}
