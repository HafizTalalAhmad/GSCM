import { GlassCard } from "@/components/ui/glass-card";
import type { CampaignRecord } from "@/lib/platform-types";

function buildTrendPoints(campaigns: CampaignRecord[]) {
  const values = campaigns.map((campaign, index) => {
    const multiplier = campaign.status === "active" ? 1.25 : campaign.status === "completed" ? 1.4 : 0.85;
    return Math.max(18, Math.round((campaign.budget || 10) * multiplier + index * 6));
  });

  const normalized = (values.length ? values : [20, 28, 36, 48, 58, 72]).slice(0, 6);
  const max = Math.max(...normalized, 1);

  return normalized
    .map((value, index) => {
      const x = index * (280 / Math.max(normalized.length - 1, 1));
      const y = 150 - (value / max) * 120;
      return `${x},${y}`;
    })
    .join(" ");
}

export function ClientReportsPanel({ campaigns }: { campaigns: CampaignRecord[] }) {
  const trendPoints = buildTrendPoints(campaigns);
  const activeCount = campaigns.filter((campaign) => campaign.status === "active").length;
  const completedCount = campaigns.filter((campaign) => campaign.status === "completed").length;
  const averageBudget = campaigns.length
    ? Math.round(campaigns.reduce((sum, campaign) => sum + campaign.budget, 0) / campaigns.length)
    : 0;
  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const topPlatform = campaigns.length
    ? [...campaigns]
        .sort((a, b) => b.budget - a.budget)[0]
        ?.platform ?? "None"
    : "None";
  const platformBreakdown = Array.from(
    campaigns.reduce((map, campaign) => {
      map.set(campaign.platform, (map.get(campaign.platform) ?? 0) + campaign.budget);
      return map;
    }, new Map<string, number>()),
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Active campaigns", String(activeCount), "Currently driving delivery"],
          ["Completed", String(completedCount), "Finished campaign cycles"],
          ["Average budget", `$${averageBudget}`, "Per campaign average"],
          ["Top platform", topPlatform, "Highest budget allocation"],
        ].map(([label, value, detail]) => (
          <GlassCard key={label} className="rounded-[28px]">
            <div className="text-sm text-muted">{label}</div>
            <div className="mt-3 text-4xl font-semibold text-white">{value}</div>
            <div className="mt-3 text-sm text-brand">{detail}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="rounded-[30px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-semibold text-white">Campaign reports</div>
              <div className="mt-2 text-sm text-muted">Performance trend across your assigned campaigns</div>
            </div>
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
              {activeCount} active
            </div>
          </div>
          <div className="mt-8 rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div className="text-sm text-muted">Delivery trend</div>
              <div className="text-sm text-white">Latest campaign cycle</div>
            </div>
            <svg viewBox="0 0 280 160" className="h-56 w-full overflow-visible">
              <defs>
                <linearGradient id="report-line" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(105, 226, 255, 1)" />
                  <stop offset="50%" stopColor="rgba(139, 92, 246, 0.9)" />
                  <stop offset="100%" stopColor="rgba(255, 143, 112, 1)" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                points={trendPoints}
                stroke="url(#report-line)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="8"
              />
            </svg>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="rounded-[30px] p-6">
            <div className="text-sm text-muted">Managed budget</div>
            <div className="mt-3 text-4xl font-semibold text-white">${totalBudget}</div>
          </GlassCard>

          <GlassCard className="rounded-[30px] p-6">
            <div className="text-2xl font-semibold text-white">Budget by platform</div>
            <div className="mt-6 space-y-4">
              {platformBreakdown.length === 0 ? (
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted">
                  No platform allocation data yet.
                </div>
              ) : (
                platformBreakdown.map(([platform, budget]) => {
                  const width = `${Math.max((budget / Math.max(totalBudget, 1)) * 100, 18)}%`;

                  return (
                    <div key={platform} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="font-medium text-white">{platform}</div>
                        <div className="text-sm text-muted">${Math.round(budget)}</div>
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
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <GlassCard className="rounded-[30px] p-6">
          <div className="text-2xl font-semibold text-white">Executive summary</div>
          <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
            <p>
              Your current portfolio includes <span className="text-white">{campaigns.length}</span> campaign(s), with{" "}
              <span className="text-white">{activeCount}</span> active and{" "}
              <span className="text-white">{completedCount}</span> completed.
            </p>
            <p>
              The highest budget concentration is currently on <span className="text-white">{topPlatform}</span>, while
              the average campaign budget is <span className="text-white">${averageBudget}</span>.
            </p>
            <p>
              Use this report view to track trend direction, platform allocation, and the overall status mix of current work.
            </p>
          </div>
        </GlassCard>

        <GlassCard className="rounded-[30px] p-6">
          <div className="text-sm text-muted">Campaign list</div>
          <div className="mt-6 space-y-4">
            {campaigns.length === 0 ? (
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted">
                No reports available yet because no campaigns are assigned to this client.
              </div>
            ) : (
              campaigns.map((campaign) => (
                <div key={campaign.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium text-white">{campaign.name}</div>
                      <div className="mt-2 text-sm text-muted">Platform: {campaign.platform}</div>
                      <div className="mt-1 text-sm text-muted">Status: {campaign.status}</div>
                      <div className="mt-1 text-sm text-muted">Budget: ${campaign.budget}</div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.22em] text-brand">
                      {campaign.startDate || "unscheduled"}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
