"use client";

import { useMemo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import type { CampaignRecord } from "@/lib/platform-types";

export function ClientSchedulePanel({ campaigns }: { campaigns: CampaignRecord[] }) {
  const ordered = useMemo(
    () =>
      [...campaigns].sort((a, b) => {
        if (!a.startDate) return 1;
        if (!b.startDate) return -1;
        return a.startDate.localeCompare(b.startDate);
      }),
    [campaigns],
  );
  const scheduled = ordered.filter((campaign) => campaign.startDate);
  const upcoming = scheduled.slice(0, 3);
  const activeCount = campaigns.filter((campaign) => campaign.status === "active").length;
  const reviewCount = campaigns.filter(
    (campaign) => campaign.status === "draft" || campaign.status === "paused",
  ).length;

  const monthDays = useMemo(() => {
    const base = scheduled[0]?.startDate ? new Date(scheduled[0].startDate) : new Date();
    const year = base.getFullYear();
    const month = base.getMonth();
    const total = new Date(year, month + 1, 0).getDate();
    const marked = new Map<string, CampaignRecord[]>();

    scheduled.forEach((campaign) => {
      if (!campaign.startDate) return;
      const day = String(new Date(campaign.startDate).getDate());
      const current = marked.get(day) ?? [];
      current.push(campaign);
      marked.set(day, current);
    });

    return Array.from({ length: total }, (_, index) => {
      const day = String(index + 1);
      return {
        day,
        campaigns: marked.get(day) ?? [],
      };
    });
  }, [scheduled]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Scheduled launches", String(scheduled.length), "Campaigns with a set date"],
          ["Needs review", String(reviewCount), "Draft or paused items"],
          ["Live now", String(activeCount), "Campaigns in progress"],
          ["Upcoming this cycle", String(upcoming.length), "Nearest launch milestones"],
        ].map(([label, value, detail]) => (
          <GlassCard key={label} className="rounded-[28px]">
            <div className="text-sm text-muted">{label}</div>
            <div className="mt-3 text-4xl font-semibold text-white">{value}</div>
            <div className="mt-3 text-sm text-brand">{detail}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <GlassCard className="rounded-[30px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted">Publishing map</div>
              <div className="mt-1 text-2xl font-semibold text-white">Content and launch calendar</div>
            </div>
            <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/80">
              {scheduled.length ? "Launches plotted" : "Awaiting dates"}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-7 gap-3 text-center text-xs uppercase tracking-[0.24em] text-muted">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-7 gap-3">
            {monthDays.map((item) => (
              <div
                key={item.day}
                className={`min-h-[76px] rounded-[22px] border p-3 ${
                  item.campaigns.length
                    ? "border-brand/30 bg-brand/10"
                    : "border-white/8 bg-white/[0.03]"
                }`}
              >
                <div className="text-sm font-medium text-white">{item.day}</div>
                {item.campaigns.slice(0, 2).map((campaign) => (
                  <div key={campaign.id} className="mt-2 truncate text-[11px] text-brand">
                    {campaign.name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="rounded-[30px] p-6">
            <div className="text-2xl font-semibold text-white">Next milestones</div>
            <div className="mt-6 space-y-4">
              {upcoming.length === 0 ? (
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted">
                  No launch dates are scheduled yet.
                </div>
              ) : (
                upcoming.map((campaign) => (
                  <div key={campaign.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                    <div className="font-medium text-white">{campaign.name}</div>
                    <div className="mt-2 text-sm text-brand">{campaign.platform}</div>
                    <div className="mt-2 text-sm text-muted">Launch date: {campaign.startDate}</div>
                    <div className="mt-1 text-sm text-muted">Status: {campaign.status}</div>
                  </div>
                ))
              )}
            </div>
          </GlassCard>

          <GlassCard className="rounded-[30px] p-6">
            <div className="text-2xl font-semibold text-white">Planning notes</div>
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
              <p>Use this tab to see which campaigns are already scheduled and which still need launch dates.</p>
              <p>Draft and paused campaigns usually need copy, creative, or approval work before their launch windows are locked.</p>
              <p>For active campaigns, treat the listed launch dates as the main publishing milestones for the current cycle.</p>
            </div>
          </GlassCard>
        </div>
      </div>

      <GlassCard className="rounded-[30px] p-6">
        <div className="text-2xl font-semibold text-white">Launch queue</div>
        <div className="mt-6 space-y-4">
          {ordered.length === 0 ? (
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted">
              No scheduled campaign dates yet.
            </div>
          ) : (
            ordered.map((campaign) => (
              <div key={campaign.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <div className="font-medium text-white">{campaign.name}</div>
                    <div className="mt-2 text-sm text-brand">{campaign.platform}</div>
                    <div className="mt-2 text-sm text-muted">
                      Launch date: {campaign.startDate || "Not scheduled"}
                    </div>
                    <div className="mt-1 text-sm text-muted">Objective: {campaign.objective}</div>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white">
                    {campaign.status}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
}
