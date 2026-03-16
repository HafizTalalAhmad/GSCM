import { GlassCard } from "@/components/ui/glass-card";
import type { CampaignRecord } from "@/lib/platform-types";

function buildAssetType(platform: string) {
  if (platform.includes("Meta")) return "Ad creative pack";
  if (platform.includes("TikTok")) return "Short-form video set";
  if (platform.includes("LinkedIn")) return "Thought-leadership kit";
  if (platform.includes("Google")) return "Search and landing page assets";
  if (platform.includes("YouTube")) return "Video launch assets";
  return "Content asset bundle";
}

export function ClientAssetsPanel({ campaigns }: { campaigns: CampaignRecord[] }) {
  return (
    <GlassCard className="rounded-[30px] p-6">
      <div className="text-2xl font-semibold text-white">Asset library</div>
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {campaigns.length === 0 ? (
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-muted xl:col-span-2">
            No assets are available yet because no campaigns are assigned to this client.
          </div>
        ) : (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <div className="text-lg font-semibold text-white">{campaign.name}</div>
              <div className="mt-2 text-sm text-brand">{buildAssetType(campaign.platform)}</div>
              <div className="mt-2 text-sm text-muted">Platform: {campaign.platform}</div>
              <div className="mt-2 text-sm text-muted">
                Delivery status: {campaign.status === "completed" ? "Final files archived" : "Current working files available"}
              </div>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}
