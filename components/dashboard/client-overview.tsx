"use client";

import { useMemo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import type { CampaignRecord } from "@/lib/platform-types";
import { DatabaseNotice } from "@/components/dashboard/database-notice";

export function ClientOverview({
  campaigns,
  mode,
}: {
  campaigns: CampaignRecord[];
  mode: "supabase" | "local";
}) {
  const activeCampaigns = useMemo(
    () => campaigns.filter((campaign) => campaign.status === "active"),
    [campaigns],
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Campaigns", String(campaigns.length)],
          ["Active", String(activeCampaigns.length)],
          ["Platforms", String(new Set(campaigns.map((campaign) => campaign.platform)).size)],
          ["Total budget", `$${campaigns.reduce((sum, campaign) => sum + campaign.budget, 0)}`],
        ].map(([label, value]) => (
          <GlassCard key={label} className="rounded-[28px]">
            <div className="text-sm text-muted">{label}</div>
            <div className="mt-3 text-4xl font-semibold text-white">{value}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="rounded-[30px] p-6">
        <div className="text-2xl font-semibold text-white">Your campaigns</div>
        {mode === "local" ? (
          <div className="mt-4">
            <DatabaseNotice message="Supabase is not connected yet, so this client view only shows campaigns saved in the same browser." />
          </div>
        ) : null}
        <div className="mt-6 space-y-4">
          {campaigns.length === 0 ? (
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 text-sm text-muted">
              No campaigns are assigned to this client email yet. Ask the admin to create one in Manage Campaigns.
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <div className="text-xl font-semibold text-white">{campaign.name}</div>
                    <div className="mt-2 text-sm text-brand">{campaign.platform}</div>
                    <div className="mt-1 text-sm text-muted">Objective: {campaign.objective}</div>
                    <div className="mt-1 text-sm text-muted">Budget: ${campaign.budget}</div>
                    <div className="mt-1 text-sm text-muted">
                      Start date: {campaign.startDate || "Not scheduled"}
                    </div>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white">
                    {campaign.status}
                  </div>
                </div>
                {campaign.notes ? <p className="mt-4 text-sm leading-7 text-muted">{campaign.notes}</p> : null}
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
}
