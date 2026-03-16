"use client";

import type { CampaignRecord, CampaignStatus, ClientRecord, PlatformState } from "@/lib/platform-types";

const STORAGE_KEY = "gscm-platform-state";

const defaultState: PlatformState = {
  clients: [],
  campaigns: [],
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadPlatformState(): PlatformState {
  if (!canUseStorage()) {
    return defaultState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(raw) as PlatformState;
    return {
      clients: parsed.clients ?? [],
      campaigns: parsed.campaigns ?? [],
    };
  } catch {
    return defaultState;
  }
}

export function savePlatformState(state: PlatformState) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function createClientRecord(input: Omit<ClientRecord, "id" | "createdAt">): ClientRecord {
  return {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
}

export function createCampaignRecord(
  input: Omit<CampaignRecord, "id" | "createdAt">,
): CampaignRecord {
  return {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
}

export function updateCampaignStatus(
  state: PlatformState,
  campaignId: string,
  status: CampaignStatus,
): PlatformState {
  return {
    ...state,
    campaigns: state.campaigns.map((campaign) =>
      campaign.id === campaignId ? { ...campaign, status } : campaign,
    ),
  };
}
