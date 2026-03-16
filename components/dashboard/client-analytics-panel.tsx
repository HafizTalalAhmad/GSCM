"use client";

import { useMemo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import type { CampaignRecord } from "@/lib/platform-types";

export function ClientAnalyticsPanel({ campaigns }: { campaigns: CampaignRecord[] }) {
  const platformBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    campaigns.forEach((campaign) => {
      counts.set(campaign.platform, (counts.get(campaign.platform) ?? 0) + 1);
    });
    return Array.from(counts.entries());
  }, [campaigns]);

  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const activeCampaigns = campaigns.filter((campaign) => campaign.status === "active").length;
  const completedCampaigns = campaigns.filter((campaign) => campaign.status === "completed").length;
  const averageBudget = campaigns.length ? Math.round(totalBudget / campaigns.length) : 0;

  const trendPoints = useMemo(() => {
    const values = (campaigns.length
      ? campaigns.slice(0, 6).map((campaign, index) => {
          const modifier =
            campaign.status === "active" ? 1.25 : campaign.status === "completed" ? 1.45 : 0.9;
          return Math.max(18, Math.round(campaign.budget * modifier + index * 5));
        })
      : [18, 24, 33, 41, 57, 71]
    ).slice(0, 6);

    const max = Math.max(...values, 1);

    return values
      .map((value, index) => {
        const x = index * (280 / Math.max(values.length - 1, 1));
        const y = 150 - (value / max) * 120;
        return `${x},${y}`;
      })
      .join(" ");
  }, [campaigns]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total budget", `$${totalBudget}`, "Across all assigned campaigns"],
          ["Average budget", `$${averageBudget}`, "Per campaign"],
          ["Active campaigns", String(activeCampaigns), "Currently live"],
          ["Completed", String(completedCampaigns), "Finished successfully"],
        ].map(([label, value, detail]) => (
          <GlassCard key={label} className="rounded-[28px]">
            <div className="text-sm text-muted">{label}</div>
            <div className="mt-3 text-4xl font-semibold text-white">{value}</div>
            <div className="mt-3 text-sm text-brand">{detail}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <GlassCard className="rounded-[30px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted">Analytics graph</div>
              <div className="mt-1 text-2xl font-semibold text-white">Performance momentum</div>
            </div>
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
              +18% efficiency
            </div>
          </div>
          <div className="mt-8 rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div className="text-sm text-muted">Weighted campaign trend</div>
              <div className="text-sm text-white">Last 6 checkpoints</div>
            </div>
            <svg viewBox="0 0 280 160" className="h-56 w-full overflow-visible">
              <defs>
                <linearGradient id="analytics-line" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(105, 226, 255, 1)" />
                  <stop offset="50%" stopColor="rgba(139, 92, 246, 0.9)" />
                  <stop offset="100%" stopColor="rgba(255, 143, 112, 1)" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                points={trendPoints}
                stroke="url(#analytics-line)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="8"
              />
            </svg>
          </div>
        </GlassCard>

        <GlassCard className="rounded-[30px] p-6">
          <div className="text-2xl font-semibold text-white">Platform breakdown</div>
          <div className="mt-6 space-y-4">
            {platformBreakdown.length === 0 ? (
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted">
                No platform data yet.
              </div>
            ) : (
              platformBreakdown.map(([platform, count]) => {
                const width = `${Math.max((count / Math.max(campaigns.length, 1)) * 100, 18)}%`;

                return (
                  <div key={platform} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-medium text-white">{platform}</div>
                      <div className="text-sm text-muted">{count} campaign(s)</div>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,rgba(105,226,255,0.95),rgba(139,92,246,0.85),rgba(255,143,112,0.95))]"
                        style={{ width }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {[
          ["Budget utilization", `${campaigns.length ? Math.min(94, 38 + activeCampaigns * 14) : 0}%`, "Spend pacing across current work"],
          ["Launch readiness", `${campaigns.length ? Math.min(96, 42 + completedCampaigns * 12 + activeCampaigns * 8) : 0}%`, "Creative and delivery readiness"],
          ["Portfolio health", `${campaigns.length ? Math.min(97, 48 + campaigns.length * 9) : 0}%`, "Weighted status mix across campaigns"],
        ].map(([label, value, detail]) => (
          <GlassCard key={label} className="rounded-[30px] p-6">
            <div className="text-sm text-muted">{label}</div>
            <div className="mt-3 text-4xl font-semibold text-white">{value}</div>
            <div className="mt-3 text-sm leading-7 text-muted">{detail}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
