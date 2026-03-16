import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

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
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-muted">Preferred date</div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-muted">Timezone</div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-muted">Goals</div>
            <Button>Request booking</Button>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
