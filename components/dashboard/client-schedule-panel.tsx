"use client";

import { useEffect, useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { loadPlatformState } from "@/components/dashboard/platform-store";
import type { CampaignRecord } from "@/lib/platform-types";

export function ClientSchedulePanel({ clientEmail }: { clientEmail: string }) {
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);

  useEffect(() => {
    const state = loadPlatformState();
    setCampaigns(state.campaigns.filter((campaign) => campaign.clientEmail.toLowerCase() === clientEmail.toLowerCase()));
  }, [clientEmail]);

  const ordered = useMemo(
    () =>
      [...campaigns].sort((a, b) => {
        if (!a.startDate) return 1;
        if (!b.startDate) return -1;
        return a.startDate.localeCompare(b.startDate);
      }),
    [campaigns],
  );

  return (
    <GlassCard className="rounded-[30px] p-6">
      <div className="text-2xl font-semibold text-white">Content and launch calendar</div>
      <div className="mt-6 space-y-4">
        {ordered.length === 0 ? (
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted">
            No scheduled campaign dates yet.
          </div>
        ) : (
          ordered.map((campaign) => (
            <div key={campaign.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <div className="font-medium text-white">{campaign.name}</div>
              <div className="mt-2 text-sm text-brand">{campaign.platform}</div>
              <div className="mt-2 text-sm text-muted">
                Launch date: {campaign.startDate || "Not scheduled"} | Status: {campaign.status}
              </div>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}
