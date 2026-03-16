import { GlassCard } from "@/components/ui/glass-card";
import type { CampaignRecord } from "@/lib/platform-types";

function getBillingStatus(status: CampaignRecord["status"]) {
  if (status === "completed") return "Settled";
  if (status === "paused") return "On hold";
  return "Open";
}

export function ClientBillingPanel({ campaigns }: { campaigns: CampaignRecord[] }) {
  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const openInvoices = campaigns.filter((campaign) => campaign.status !== "completed").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <GlassCard className="rounded-[28px]">
          <div className="text-sm text-muted">Active billing items</div>
          <div className="mt-3 text-4xl font-semibold text-white">{openInvoices}</div>
        </GlassCard>
        <GlassCard className="rounded-[28px]">
          <div className="text-sm text-muted">Campaign value tracked</div>
          <div className="mt-3 text-4xl font-semibold text-white">${totalBudget}</div>
        </GlassCard>
        <GlassCard className="rounded-[28px]">
          <div className="text-sm text-muted">Billing model</div>
          <div className="mt-3 text-2xl font-semibold text-white">Retainer + project</div>
        </GlassCard>
      </div>

      <GlassCard className="rounded-[30px] p-6">
        <div className="text-2xl font-semibold text-white">Invoice status</div>
        <div className="mt-6 space-y-4">
          {campaigns.length === 0 ? (
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted">
              No billing items yet because no campaigns are assigned to this client.
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-white">{campaign.name}</div>
                    <div className="mt-2 text-sm text-muted">Budget reference: ${campaign.budget}</div>
                    <div className="mt-2 text-sm text-brand">Platform: {campaign.platform}</div>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white">
                    {getBillingStatus(campaign.status)}
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
