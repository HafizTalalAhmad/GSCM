import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

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
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-muted">Name</div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-muted">Email</div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-muted">Project brief</div>
            <Button>Send inquiry</Button>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
