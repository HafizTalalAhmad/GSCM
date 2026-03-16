"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { loadPlatformState } from "@/components/dashboard/platform-store";
import type { CampaignRecord } from "@/lib/platform-types";

export function ClientReportsPanel({ clientEmail }: { clientEmail: string }) {
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);

  useEffect(() => {
    const state = loadPlatformState();
    setCampaigns(state.campaigns.filter((campaign) => campaign.clientEmail.toLowerCase() === clientEmail.toLowerCase()));
  }, [clientEmail]);

  return (
    <GlassCard className="rounded-[30px] p-6">
      <div className="text-2xl font-semibold text-white">Campaign reports</div>
      <div className="mt-6 space-y-4">
        {campaigns.length === 0 ? (
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted">
            No reports available yet because no campaigns are assigned to this client.
          </div>
        ) : (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <div className="font-medium text-white">{campaign.name}</div>
              <div className="mt-2 text-sm text-muted">Platform: {campaign.platform}</div>
              <div className="mt-1 text-sm text-muted">Status: {campaign.status}</div>
              <div className="mt-1 text-sm text-muted">Budget: ${campaign.budget}</div>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}
