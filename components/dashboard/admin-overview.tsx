"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { loadPlatformState } from "@/components/dashboard/platform-store";
import type { CampaignRecord, ClientRecord } from "@/lib/platform-types";

export function AdminOverview() {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);

  useEffect(() => {
    const state = loadPlatformState();
    setClients(state.clients);
    setCampaigns(state.campaigns);
  }, []);

  const activeCampaigns = campaigns.filter((campaign) => campaign.status === "active").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Saved clients", String(clients.length)],
          ["Saved campaigns", String(campaigns.length)],
          ["Active campaigns", String(activeCampaigns)],
          ["Platforms in use", String(new Set(campaigns.map((campaign) => campaign.platform)).size)],
        ].map(([label, value]) => (
          <GlassCard key={label} className="rounded-[28px]">
            <div className="text-sm text-muted">{label}</div>
            <div className="mt-3 text-4xl font-semibold text-white">{value}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <GlassCard className="rounded-[30px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-semibold text-white">Where to enter data</div>
              <p className="mt-3 text-sm leading-7 text-muted">
                Use Manage Clients to add the client first, then use Manage Campaigns to assign the campaign, platform, budget, and status.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/dashboard/admin/clients">Manage Clients</Button>
            <Button href="/dashboard/admin/campaigns" variant="secondary">
              Manage Campaigns
            </Button>
          </div>
        </GlassCard>

        <GlassCard className="rounded-[30px] p-6">
          <div className="text-2xl font-semibold text-white">Recent campaigns</div>
          <div className="mt-6 space-y-4">
            {campaigns.slice(0, 4).map((campaign) => (
              <div key={campaign.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                <div className="font-medium text-white">{campaign.name}</div>
                <div className="mt-2 text-sm text-brand">{campaign.platform}</div>
                <div className="mt-1 text-sm text-muted">
                  {campaign.clientEmail} | {campaign.status}
                </div>
              </div>
            ))}
            {campaigns.length === 0 ? (
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted">
                No campaigns yet. Start in Manage Campaigns.
              </div>
            ) : null}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
