import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import type { CampaignRecord, CampaignStatus, ClientRecord } from "@/lib/platform-types";

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
