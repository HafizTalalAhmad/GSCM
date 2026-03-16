import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";

export default function AboutPage() {
  return (
    <main className="section-space">
      <div className="container-shell space-y-10">
        <SectionHeading
          eyebrow="About"
          title="A global social media growth partner designed for modern brands."
          description="GSCM blends agency strategy, studio-level creative thinking, and platform-grade client delivery into one operating model."
        />
        <GlassCard className="rounded-[32px]">
          <p className="max-w-4xl text-base leading-8 text-muted">
            We help founders, teams, and ambitious brands move from fragmented marketing into a more elegant, measurable, and scalable growth system.
          </p>
        </GlassCard>
      </div>
    </main>
  );
}
