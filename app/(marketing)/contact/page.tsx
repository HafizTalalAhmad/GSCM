import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/forms/contact-form";

export default function ContactPage() {
  return (
    <main className="section-space">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Contact"
          title="Tell us where your marketing is stuck."
          description="We will help you map the highest-leverage next move across strategy, creative, paid growth, and reporting."
        />
        <GlassCard className="rounded-[32px]">
          <ContactForm />
        </GlassCard>
      </div>
    </main>
  );
}
