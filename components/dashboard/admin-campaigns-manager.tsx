"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  createCampaignAction,
  updateCampaignStatusAction,
} from "@/lib/actions/platform";
import {
  createCampaignRecord,
  loadPlatformState,
  savePlatformState,
  updateCampaignStatus,
} from "@/components/dashboard/platform-store";
import type { CampaignRecord, CampaignStatus, ClientRecord } from "@/lib/platform-types";
import { DatabaseNotice } from "@/components/dashboard/database-notice";

const platforms = [
  "Meta Ads",
  "Google Ads",
  "TikTok Ads",
  "LinkedIn Ads",
  "YouTube",
  "Organic Social",
];

const emptyForm = {
  clientEmail: "",
  name: "",
  platform: "Meta Ads",
  objective: "",
  budget: "",
  startDate: "",
  status: "draft" as CampaignStatus,
  notes: "",
};

export function AdminCampaignsManager({
  initialClients,
  initialCampaigns,
  mode,
}: {
  initialClients: ClientRecord[];
  initialCampaigns: CampaignRecord[];
  mode: "supabase" | "local";
}) {
  const router = useRouter();
  const [clients, setClients] = useState<ClientRecord[]>(initialClients);
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>(initialCampaigns);
  const [formValues, setFormValues] = useState(emptyForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (mode === "local") {
      const state = loadPlatformState();
      setClients(state.clients);
      setCampaigns(state.campaigns);
    } else {
      setClients(initialClients);
      setCampaigns(initialCampaigns);
    }
  }, [initialCampaigns, initialClients, mode]);

  const clientOptions = useMemo(() => clients.map((client) => client.email), [clients]);

  function updateField(name: keyof typeof formValues, value: string) {
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formValues.clientEmail || !formValues.name || !formValues.objective || !formValues.budget) {
      setMessage("Client email, campaign name, objective, and budget are required.");
      return;
    }

    const payload = {
      clientEmail: formValues.clientEmail,
      name: formValues.name,
      platform: formValues.platform,
      objective: formValues.objective,
      budget: Number(formValues.budget),
      startDate: formValues.startDate,
      status: formValues.status,
      notes: formValues.notes,
    };

    if (mode === "local") {
      const state = loadPlatformState();
      const nextCampaign = createCampaignRecord(payload);
      const nextState = {
        ...state,
        campaigns: [nextCampaign, ...state.campaigns],
      };

      savePlatformState(nextState);
      setCampaigns(nextState.campaigns);
      setFormValues(emptyForm);
      setMessage("Campaign saved locally in this browser.");
      return;
    }

    void createCampaignAction(payload).then((result) => {
      setMessage(result.message);
      if (result.success) {
        setFormValues(emptyForm);
        router.refresh();
      }
    });
  }

  function changeStatus(campaignId: string, status: CampaignStatus) {
    if (mode === "local") {
      const nextState = updateCampaignStatus(loadPlatformState(), campaignId, status);
      savePlatformState(nextState);
      setCampaigns(nextState.campaigns);
      return;
    }

    void updateCampaignStatusAction(campaignId, status).then((result) => {
      setMessage(result.message);
      if (result.success) {
        router.refresh();
      }
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <GlassCard className="rounded-[30px] p-6">
        <div className="text-sm uppercase tracking-[0.28em] text-brand">Campaign Builder</div>
        <h2 className="mt-3 text-3xl font-semibold text-white">Create a campaign</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          This is where you decide which platform the campaign will run on and when it should start.
        </p>
        {mode === "local" ? (
          <div className="mt-4">
            <DatabaseNotice message="Supabase is not connected yet, so campaigns are still being saved in this browser only." />
          </div>
        ) : null}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <select className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" value={formValues.clientEmail} onChange={(event) => updateField("clientEmail", event.target.value)}>
            <option value="">Select client email</option>
            {clientOptions.map((email) => (
              <option key={email} value={email}>
                {email}
              </option>
            ))}
          </select>
          <input className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" placeholder="Campaign name" value={formValues.name} onChange={(event) => updateField("name", event.target.value)} />
          <select className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" value={formValues.platform} onChange={(event) => updateField("platform", event.target.value)}>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          <input className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" placeholder="Objective" value={formValues.objective} onChange={(event) => updateField("objective", event.target.value)} />
          <input className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" placeholder="Budget in USD" type="number" min="0" value={formValues.budget} onChange={(event) => updateField("budget", event.target.value)} />
          <input className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" type="date" value={formValues.startDate} onChange={(event) => updateField("startDate", event.target.value)} />
          <select className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" value={formValues.status} onChange={(event) => updateField("status", event.target.value as CampaignStatus)}>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
          <textarea className="min-h-[120px] w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm" placeholder="Internal notes" value={formValues.notes} onChange={(event) => updateField("notes", event.target.value)} />
          {message ? <p className="text-sm text-brand">{message}</p> : null}
          <Button>Create campaign</Button>
        </form>
      </GlassCard>

      <GlassCard className="rounded-[30px] p-6">
        <div className="text-sm uppercase tracking-[0.28em] text-brand">Campaign List</div>
        <h2 className="mt-3 text-3xl font-semibold text-white">Saved campaigns</h2>
        <div className="mt-6 space-y-4">
          {campaigns.length === 0 ? (
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 text-sm text-muted">
              No campaigns created yet.
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <div className="text-xl font-semibold text-white">{campaign.name}</div>
                    <div className="mt-2 text-sm text-brand">{campaign.platform}</div>
                    <div className="mt-1 text-sm text-muted">{campaign.clientEmail}</div>
                    <div className="mt-1 text-sm text-muted">
                      Objective: {campaign.objective} | Budget: ${campaign.budget}
                    </div>
                    <div className="mt-1 text-sm text-muted">
                      Start date: {campaign.startDate || "Not scheduled"}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-full border border-white/10 px-3 py-2 text-xs text-white" onClick={() => changeStatus(campaign.id, "active")} type="button">
                      Start
                    </button>
                    <button className="rounded-full border border-white/10 px-3 py-2 text-xs text-white" onClick={() => changeStatus(campaign.id, "paused")} type="button">
                      Pause
                    </button>
                    <button className="rounded-full border border-white/10 px-3 py-2 text-xs text-white" onClick={() => changeStatus(campaign.id, "completed")} type="button">
                      Complete
                    </button>
                  </div>
                </div>
                {campaign.notes ? <p className="mt-4 text-sm leading-7 text-muted">{campaign.notes}</p> : null}
                <div className="mt-4 text-xs uppercase tracking-[0.22em] text-muted">
                  Status: {campaign.status}
                </div>
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
}
