"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { submitClientApprovalAction } from "@/lib/actions/platform";
import type { CampaignRecord } from "@/lib/platform-types";

function getApprovalLabel(status: CampaignRecord["status"]) {
  if (status === "draft") return "Awaiting initial client approval";
  if (status === "paused") return "Pending feedback to resume";
  if (status === "completed") return "Final sign-off complete";
  return "Live creative check-in";
}

export function ClientApprovalsPanel({ campaigns }: { campaigns: CampaignRecord[] }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleDecision(campaignId: string, decision: "approve" | "changes") {
    setBusyId(campaignId);
    const result = await submitClientApprovalAction(campaignId, decision);
    setMessage(result.message);
    setBusyId(null);

    if (result.success) {
      router.refresh();
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <GlassCard className="rounded-[30px] p-6">
        <div className="text-2xl font-semibold text-white">Approval queue</div>
        {message ? <p className="mt-4 text-sm text-brand">{message}</p> : null}
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
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#24131f] transition hover:bg-white/90 disabled:opacity-50"
                    onClick={() => handleDecision(campaign.id, "approve")}
                    type="button"
                    disabled={busyId === campaign.id || campaign.status === "active" || campaign.status === "completed"}
                  >
                    {campaign.status === "active" ? "Approved" : "Approve campaign"}
                  </button>
                  <button
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/5 disabled:opacity-50"
                    onClick={() => handleDecision(campaign.id, "changes")}
                    type="button"
                    disabled={busyId === campaign.id || campaign.status === "completed"}
                  >
                    Request changes
                  </button>
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
          <p>Use <span className="text-white">Approve campaign</span> to mark a campaign active for launch.</p>
          <p>Use <span className="text-white">Request changes</span> to move it into paused status for revision.</p>
        </div>
      </GlassCard>
    </div>
  );
}
