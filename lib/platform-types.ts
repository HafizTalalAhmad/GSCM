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
