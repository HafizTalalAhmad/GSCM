import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionFade } from "@/components/ui/motion-fade";

export function HeroSection() {
  return (
    <section className="section-space overflow-hidden">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <MotionFade className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.26em] text-brand">
            <Sparkles className="h-4 w-4" />
            Agency + SaaS Platform
          </div>
          <div className="space-y-5">
            <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Global growth operations for brands that expect more than vanity metrics.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              GSCM merges premium creative strategy, paid social execution, and a purpose-built client platform into one elegant growth engine.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/book-a-call">Book a Call</Button>
            <Button href="/case-studies" variant="secondary">
              Explore Case Studies
            </Button>
            <div className="inline-flex items-center gap-2 text-sm text-muted">
              <Play className="h-4 w-4 text-brand" />
              Platform walkthrough available on request
            </div>
          </div>
        </MotionFade>

        <MotionFade delay={0.15}>
          <GlassCard className="relative overflow-hidden rounded-[32px] border-white/12 p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(105,226,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,143,112,0.18),transparent_30%)]" />
            <div className="relative space-y-5 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                  <div className="text-sm text-muted">Monthly pipeline attributed</div>
                  <div className="mt-3 text-4xl font-semibold">$482k</div>
                  <div className="mt-2 text-sm text-emerald-300">+18.4% vs last month</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                  <div className="text-sm text-muted">Content approval rate</div>
                  <div className="mt-3 text-4xl font-semibold">94%</div>
                  <div className="mt-2 text-sm text-brand">Across 8 active brands</div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[#0b1020]/85 p-5">
                <div className="flex items-center justify-between text-sm text-muted">
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
                        <div className="text-xs uppercase tracking-[0.28em] text-muted">Campaign velocity</div>
                        <div className="mt-1 text-xl font-semibold">Quarterly performance</div>
                      </div>
                      <div className="rounded-full bg-emerald-400/12 px-3 py-1 text-xs text-emerald-300">
                        +32%
                      </div>
                    </div>
                    <div className="h-40 rounded-3xl bg-[linear-gradient(180deg,rgba(105,226,255,0.18),transparent),linear-gradient(90deg,rgba(105,226,255,0.5),rgba(139,92,246,0.5),rgba(255,143,112,0.6))] opacity-90 [clip-path:polygon(0%_88%,18%_70%,35%_78%,54%_40%,71%_52%,86%_20%,100%_0%,100%_100%,0%_100%)]" />
                  </div>
                  <div className="space-y-4">
                    {[
                      ["New leads", "128"],
                      ["Creative in review", "24"],
                      ["Assets approved", "86"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-sm text-muted">{label}</div>
                        <div className="mt-2 text-3xl font-semibold">{value}</div>
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
