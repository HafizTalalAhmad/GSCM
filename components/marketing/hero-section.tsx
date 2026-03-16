import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionFade } from "@/components/ui/motion-fade";

export function HeroSection() {
  return (
    <section className="section-space overflow-hidden">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <MotionFade className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4a342e]/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.26em] marketing-kicker">
            <Sparkles className="h-4 w-4" />
            Agency + SaaS Platform
          </div>
          <div className="space-y-5">
            <h1 className="marketing-title max-w-5xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Global growth operations for brands that expect more than vanity metrics.
            </h1>
            <p className="marketing-copy max-w-2xl text-lg leading-8">
              GSCM merges premium creative strategy, paid social execution, and a purpose-built client platform into one elegant growth engine.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/book-a-call">Book a Call</Button>
            <Button href="/case-studies" variant="secondary">
              Explore Case Studies
            </Button>
            <div className="inline-flex items-center gap-2 text-sm text-[#746770]">
              <Play className="h-4 w-4 text-[#9c6b46]" />
              Platform walkthrough available on request
            </div>
          </div>
        </MotionFade>

        <MotionFade delay={0.15}>
          <GlassCard className="relative overflow-hidden rounded-[32px] p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,132,98,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(90,65,93,0.16),transparent_30%)]" />
            <div className="relative space-y-5 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="marketing-card rounded-3xl border p-5">
                  <div className="text-sm text-[#746770]">Monthly pipeline attributed</div>
                  <div className="mt-3 text-4xl font-semibold text-[#24131f]">$482k</div>
                  <div className="mt-2 text-sm text-[#9c6b46]">+18.4% vs last month</div>
                </div>
                <div className="marketing-card rounded-3xl border p-5">
                  <div className="text-sm text-[#746770]">Content approval rate</div>
                  <div className="mt-3 text-4xl font-semibold text-[#24131f]">94%</div>
                  <div className="mt-2 text-sm text-[#9c6b46]">Across 8 active brands</div>
                </div>
              </div>

              <div className="marketing-dark-card rounded-[28px] p-5">
                <div className="flex items-center justify-between text-sm text-[#cfc5d9]">
                  <span>Growth cockpit</span>
                  <span className="inline-flex items-center gap-2 text-white">
                    View dashboard
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.28em] text-[#d6c6b9]">Campaign velocity</div>
                        <div className="mt-1 text-xl font-semibold text-white">Quarterly performance</div>
                      </div>
                      <div className="rounded-full bg-[#b88462]/15 px-3 py-1 text-xs text-[#f0c8aa]">
                        +32%
                      </div>
                    </div>
                    <div className="h-40 rounded-3xl bg-[linear-gradient(180deg,rgba(184,132,98,0.14),transparent),linear-gradient(90deg,rgba(96,74,98,0.55),rgba(184,132,98,0.65),rgba(233,202,174,0.7))] opacity-90 [clip-path:polygon(0%_88%,18%_70%,35%_78%,54%_40%,71%_52%,86%_20%,100%_0%,100%_100%,0%_100%)]" />
                  </div>
                  <div className="space-y-4">
                    {[
                      ["New leads", "128"],
                      ["Creative in review", "24"],
                      ["Assets approved", "86"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-sm text-[#d6c6b9]">{label}</div>
                        <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </MotionFade>
      </div>
    </section>
  );
}
