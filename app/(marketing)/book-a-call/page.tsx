import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookCallForm } from "@/components/forms/book-call-form";

export default function BookCallPage() {
  return (
    <main className="section-space">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Book a Call"
          title="Schedule a premium growth strategy session."
          description="Use this page as the conversion destination for paid traffic, founder outreach, and inbound lead qualification."
        />
        <GlassCard className="rounded-[32px]">
          <BookCallForm />
        </GlassCard>
      </div>
    </main>
  );
}
