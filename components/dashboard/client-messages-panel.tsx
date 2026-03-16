import { GlassCard } from "@/components/ui/glass-card";
import type { CampaignRecord } from "@/lib/platform-types";

function buildMessagePreview(campaign: CampaignRecord) {
  if (campaign.status === "draft") return "Strategy draft is ready for your review.";
  if (campaign.status === "paused") return "Team is waiting on your feedback before continuing.";
  if (campaign.status === "completed") return "Campaign wrap-up and summary are ready.";
  return "Campaign is running and the team has posted the latest progress note.";
}

export function ClientMessagesPanel({ campaigns }: { campaigns: CampaignRecord[] }) {
  return (
    <GlassCard className="rounded-[30px] p-6">
      <div className="text-2xl font-semibold text-white">Message threads</div>
      <div className="mt-6 space-y-4">
        {campaigns.length === 0 ? (
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted">
            No message threads yet. Client campaign communication will appear here as campaigns are assigned.
          </div>
        ) : (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-white">{campaign.name}</div>
                  <div className="mt-2 text-sm text-brand">{campaign.platform}</div>
                  <div className="mt-3 text-sm leading-7 text-muted">
                    {buildMessagePreview(campaign)}
                  </div>
                </div>
                <div className="text-xs uppercase tracking-[0.22em] text-muted">{campaign.status}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}
