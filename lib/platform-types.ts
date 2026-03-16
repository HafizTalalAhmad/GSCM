export type ClientRecord = {
  id: string;
  name: string;
  company: string;
  email: string;
  timezone: string;
  notes: string;
  createdAt: string;
};

export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export type SocialPlatform = "Meta Ads" | "TikTok Ads" | "LinkedIn Ads";

export type CampaignRecord = {
  id: string;
  clientEmail: string;
  name: string;
  platform: string;
  objective: string;
  budget: number;
  startDate: string;
  status: CampaignStatus;
  notes: string;
  createdAt: string;
};

export type PlatformState = {
  clients: ClientRecord[];
  campaigns: CampaignRecord[];
};

export type ExternalAccountRecord = {
  id: string;
  clientId: string;
  platform: SocialPlatform;
  externalAccountId: string;
  accountName: string;
  status: "connected" | "expired" | "revoked";
  lastSyncedAt: string;
  createdAt: string;
};

export type CampaignMetricRecord = {
  id: string;
  campaignId: string;
  platform: SocialPlatform;
  metricDate: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpm: number;
  roas: number;
  createdAt: string;
};

export type ProviderCampaignSnapshot = {
  externalCampaignId: string;
  campaignName: string;
  status: string;
  platform: SocialPlatform;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpm: number;
  roas: number;
  date: string;
};
