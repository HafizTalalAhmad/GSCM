import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import type {
  CampaignRecord,
  CampaignStatus,
  ClientRecord,
  ExternalAccountRecord,
  SocialPlatform,
} from "@/lib/platform-types";

function mapClient(row: {
  id: string;
  name: string;
  company: string;
  email: string;
  timezone: string;
  notes: string;
  created_at: string;
}): ClientRecord {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    timezone: row.timezone,
    notes: row.notes,
    createdAt: row.created_at,
  };
}

function mapCampaign(row: {
  id: string;
  client_email: string;
  name: string;
  platform: string;
  objective: string;
  budget: number;
  start_date: string | null;
  status: CampaignStatus;
  notes: string;
  created_at: string;
}): CampaignRecord {
  return {
    id: row.id,
    clientEmail: row.client_email,
    name: row.name,
    platform: row.platform,
    objective: row.objective,
    budget: Number(row.budget),
    startDate: row.start_date ?? "",
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at,
  };
}

function mapExternalAccount(row: {
  id: string;
  client_id: string;
  platform: SocialPlatform;
  external_account_id: string;
  account_name: string;
  status: "connected" | "expired" | "revoked";
  last_synced_at: string | null;
  created_at: string;
}): ExternalAccountRecord {
  return {
    id: row.id,
    clientId: row.client_id,
    platform: row.platform,
    externalAccountId: row.external_account_id,
    accountName: row.account_name,
    status: row.status,
    lastSyncedAt: row.last_synced_at ?? "",
    createdAt: row.created_at,
  };
}

export async function getAllClients(): Promise<ClientRecord[]> {
  noStore();

  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapClient);
}

export async function getClientById(clientId: string): Promise<ClientRecord | null> {
  noStore();

  if (!isSupabaseConfigured() || !clientId) {
    return null;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("clients").select("*").eq("id", clientId).single();

  if (error || !data) {
    return null;
  }

  return mapClient(data);
}

export async function getAllCampaigns(): Promise<CampaignRecord[]> {
  noStore();

  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapCampaign);
}

export async function getCampaignsByClientEmail(clientEmail: string): Promise<CampaignRecord[]> {
  noStore();

  if (!isSupabaseConfigured() || !clientEmail) {
    return [];
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("client_email", clientEmail)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapCampaign);
}

export async function getCampaignById(campaignId: string): Promise<CampaignRecord | null> {
  noStore();

  if (!isSupabaseConfigured() || !campaignId) {
    return null;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("campaigns").select("*").eq("id", campaignId).single();

  if (error || !data) {
    return null;
  }

  return mapCampaign(data);
}

export async function getExternalAccountsByClientId(clientId: string): Promise<ExternalAccountRecord[]> {
  noStore();

  if (!isSupabaseConfigured() || !clientId) {
    return [];
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("external_accounts")
    .select("id, client_id, platform, external_account_id, account_name, status, last_synced_at, created_at")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapExternalAccount);
}

export async function getAllExternalAccounts(): Promise<ExternalAccountRecord[]> {
  noStore();

  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("external_accounts")
    .select("id, client_id, platform, external_account_id, account_name, status, last_synced_at, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapExternalAccount);
}

export async function upsertExternalAccounts(args: {
  clientId: string;
  platform: SocialPlatform;
  accessToken: string;
  refreshToken?: string;
  tokenExpiresAt?: string;
  accounts: Array<{
    externalAccountId: string;
    accountName: string;
    status: "connected" | "expired" | "revoked";
  }>;
}) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  if (!args.accounts.length) {
    return [];
  }

  const { data, error } = await supabase
    .from("external_accounts")
    .upsert(
      args.accounts.map((account) => ({
        client_id: args.clientId,
        platform: args.platform,
        external_account_id: account.externalAccountId,
        account_name: account.accountName,
        access_token: args.accessToken,
        refresh_token: args.refreshToken ?? "",
        token_expires_at: args.tokenExpiresAt ?? null,
        status: account.status,
        last_synced_at: new Date().toISOString(),
      })),
      { onConflict: "platform,external_account_id" },
    )
    .select("id, client_id, platform, external_account_id, account_name, status, last_synced_at, created_at");

  if (error || !data) {
    throw new Error(error?.message || "Could not save external accounts.");
  }

  return data.map(mapExternalAccount);
}

export async function insertClient(input: Omit<ClientRecord, "id" | "createdAt">) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("clients")
    .insert({
      name: input.name,
      company: input.company,
      email: input.email,
      timezone: input.timezone,
      notes: input.notes,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Could not create client.");
  }

  return mapClient(data);
}

export async function insertCampaign(input: Omit<CampaignRecord, "id" | "createdAt">) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("campaigns")
    .insert({
      client_email: input.clientEmail,
      name: input.name,
      platform: input.platform,
      objective: input.objective,
      budget: input.budget,
      start_date: input.startDate || null,
      status: input.status,
      notes: input.notes,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Could not create campaign.");
  }

  return mapCampaign(data);
}

export async function setCampaignStatus(campaignId: string, status: CampaignStatus) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("campaigns")
    .update({ status })
    .eq("id", campaignId)
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Could not update campaign status.");
  }

  return mapCampaign(data);
}
