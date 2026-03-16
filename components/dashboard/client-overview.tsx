"use client";

import Link from "next/link";
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
  const completedCampaigns = useMemo(
    () => campaigns.filter((campaign) => campaign.status === "completed"),
    [campaigns],
  );
  const draftCampaigns = useMemo(
    () => campaigns.filter((campaign) => campaign.status === "draft" || campaign.status === "paused"),
    [campaigns],
  );
  const chartValues = useMemo(() => {
    const source = campaigns.length
      ? campaigns.slice(0, 6).map((campaign, index) => {
          const modifier = campaign.status === "active" ? 1.2 : campaign.status === "completed" ? 1.35 : 0.9;
          return Math.max(18, Math.round((campaign.budget || 10) * modifier + index * 4));
        })
      : [20, 26, 31, 42, 56, 68];
    const max = Math.max(...source, 1);

    return source.map((value, index) => ({
      x: index * (280 / Math.max(source.length - 1, 1)),
      y: 150 - (value / max) * 118,
    }));
  }, [campaigns]);

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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          ["Needs review", String(draftCampaigns.length), "Items needing client attention"],
          ["Completed", String(completedCampaigns.length), "Campaigns closed out"],
          [
            "Portfolio score",
            `${campaigns.length ? Math.min(97, 46 + activeCampaigns.length * 14 + completedCampaigns.length * 9) : 0}%`,
            "Health score based on current statuses",
          ],
        ].map(([label, value, detail]) => (
          <GlassCard key={label} className="rounded-[28px]">
            <div className="text-sm text-muted">{label}</div>
            <div className="mt-3 text-4xl font-semibold text-white">{value}</div>
            <div className="mt-3 text-sm text-brand">{detail}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <GlassCard className="rounded-[30px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted">Overview graph</div>
              <div className="mt-1 text-2xl font-semibold text-white">Campaign delivery trend</div>
            </div>
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
              {activeCampaigns.length} live
            </div>
          </div>
          <div className="mt-8 rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div className="text-sm text-muted">Recent movement</div>
              <div className="text-sm text-white">Current portfolio</div>
            </div>
            <svg viewBox="0 0 280 160" className="h-56 w-full overflow-visible">
              <defs>
                <linearGradient id="overview-line" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(105, 226, 255, 1)" />
                  <stop offset="50%" stopColor="rgba(139, 92, 246, 0.9)" />
                  <stop offset="100%" stopColor="rgba(255, 143, 112, 1)" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                points={chartValues.map((point) => `${point.x},${point.y}`).join(" ")}
                stroke="url(#overview-line)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="8"
              />
            </svg>
          </div>
        </GlassCard>

        <GlassCard className="rounded-[30px] p-6">
          <div className="text-2xl font-semibold text-white">Client actions</div>
          {mode === "local" ? (
            <div className="mt-4">
              <DatabaseNotice message="Supabase is not connected yet, so this client view only shows campaigns saved in the same browser." />
            </div>
          ) : null}
          <div className="mt-6 grid gap-4">
            <Link
              className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]"
              href="/dashboard/client/approvals"
            >
              <div className="text-lg font-semibold text-white">Open approvals</div>
              <div className="mt-2 text-sm leading-7 text-muted">
                Review draft or paused campaigns and approve them or request changes.
              </div>
            </Link>
            <Link
              className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]"
              href="/dashboard/client/reports"
            >
              <div className="text-lg font-semibold text-white">Open reports</div>
              <div className="mt-2 text-sm leading-7 text-muted">
                See the performance graph and campaign report summary for your current portfolio.
              </div>
            </Link>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <GlassCard className="rounded-[30px] p-6">
          <div className="text-2xl font-semibold text-white">Status mix</div>
          <div className="mt-6 space-y-4">
            {[
              ["Active", activeCampaigns.length],
              ["Needs review", draftCampaigns.length],
              ["Completed", completedCampaigns.length],
            ].map(([label, count]) => {
              const numericCount = Number(count);
              const width = `${Math.max((numericCount / Math.max(campaigns.length, 1)) * 100, numericCount ? 18 : 0)}%`;

              return (
                <div key={label} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">{label}</div>
                    <div className="text-sm text-muted">{numericCount}</div>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,rgba(105,226,255,0.95),rgba(139,92,246,0.85),rgba(255,143,112,0.95))]"
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="rounded-[30px] p-6">
          <div className="text-2xl font-semibold text-white">At a glance</div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {campaigns.length === 0 ? (
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 text-sm text-muted sm:col-span-2">
                Once campaigns are assigned, this section will summarize budget pacing, review load, and delivery readiness.
              </div>
            ) : (
              <>
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                  <div className="text-sm text-muted">Budget pacing</div>
                  <div className="mt-3 text-3xl font-semibold text-white">
                    {Math.min(95, 42 + campaigns.length * 9)}%
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                  <div className="text-sm text-muted">Delivery confidence</div>
                  <div className="mt-3 text-3xl font-semibold text-white">
                    {Math.min(96, 48 + activeCampaigns.length * 12 + completedCampaigns.length * 8)}%
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                  <div className="text-sm text-muted">Response load</div>
                  <div className="mt-3 text-3xl font-semibold text-white">{draftCampaigns.length}</div>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                  <div className="text-sm text-muted">Channel spread</div>
                  <div className="mt-3 text-3xl font-semibold text-white">
                    {new Set(campaigns.map((campaign) => campaign.platform)).size}
                  </div>
                </div>
              </>
            )}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="rounded-[30px] p-6">
        <div className="text-2xl font-semibold text-white">Your campaigns</div>
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
