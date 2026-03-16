import { GlassCard } from "@/components/ui/glass-card";
import type { CampaignRecord } from "@/lib/platform-types";

function getApprovalLabel(status: CampaignRecord["status"]) {
  if (status === "draft") return "Awaiting initial client approval";
  if (status === "paused") return "Pending feedback to resume";
  if (status === "completed") return "Final sign-off complete";
  return "Live creative check-in";
}

export function ClientApprovalsPanel({ campaigns }: { campaigns: CampaignRecord[] }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <GlassCard className="rounded-[30px] p-6">
        <div className="text-2xl font-semibold text-white">Approval queue</div>
        <div className="mt-6 space-y-4">
          {campaigns.length === 0 ? (
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted">
              No approval items yet. Once a campaign is created, its review stage will appear here.
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-white">{campaign.name}</div>
                    <div className="mt-2 text-sm text-brand">{campaign.platform}</div>
                    <div className="mt-2 text-sm text-muted">{getApprovalLabel(campaign.status)}</div>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white">
                    {campaign.status}
                  </div>
                </div>
                <div className="mt-4 text-sm leading-7 text-muted">
                  Review focus: {campaign.objective}
                </div>
              </div>
            ))
          )}
        </div>
      </GlassCard>

      <GlassCard className="rounded-[30px] p-6">
        <div className="text-2xl font-semibold text-white">Approval guide</div>
        <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
          <p>Use this section to track what needs your sign-off before launch, restart, or closeout.</p>
          <p>Draft campaigns usually need approval on messaging, budget, and launch timing.</p>
          <p>Paused campaigns normally indicate feedback or revised creative is required before reactivation.</p>
        </div>
      </GlassCard>
    </div>
  );
}
