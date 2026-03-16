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

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <GlassCard className="rounded-[30px] p-6">
        <div className="text-2xl font-semibold text-white">Platform breakdown</div>
        <div className="mt-6 space-y-4">
          {platformBreakdown.length === 0 ? (
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted">
              No platform data yet.
            </div>
          ) : (
            platformBreakdown.map(([platform, count]) => (
              <div key={platform} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                <div className="font-medium text-white">{platform}</div>
                <div className="mt-2 text-sm text-muted">{count} campaign(s)</div>
              </div>
            ))
          )}
        </div>
      </GlassCard>

      <GlassCard className="rounded-[30px] p-6">
        <div className="text-2xl font-semibold text-white">Budget summary</div>
        <div className="mt-6 rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
          <div className="text-sm text-muted">Assigned budget</div>
          <div className="mt-3 text-4xl font-semibold text-white">
            ${campaigns.reduce((sum, campaign) => sum + campaign.budget, 0)}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
