"use server";

import { revalidatePath } from "next/cache";
import { getCurrentSession } from "@/lib/session";
import { insertCampaign, insertClient, setCampaignStatus } from "@/lib/platform-data";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { CampaignStatus } from "@/lib/platform-types";

export type PlatformActionState = {
  success: boolean;
  message: string;
};

function ensureAdmin(session: Awaited<ReturnType<typeof getCurrentSession>>) {
  if (!session || session.role !== "admin") {
    throw new Error("Admin access required.");
  }
}

function revalidatePlatformPages() {
  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/admin/clients");
  revalidatePath("/dashboard/admin/campaigns");
  revalidatePath("/dashboard/client");
  revalidatePath("/dashboard/client/analytics");
  revalidatePath("/dashboard/client/content-calendar");
  revalidatePath("/dashboard/client/reports");
}

export async function createClientAction(payload: {
  name: string;
  company: string;
  email: string;
  timezone: string;
  notes: string;
}): Promise<PlatformActionState> {
  const session = await getCurrentSession();
  ensureAdmin(session);

  if (!isSupabaseConfigured()) {
    return { success: false, message: "Supabase is not configured yet." };
  }

  try {
    await insertClient(payload);
    revalidatePlatformPages();
    return { success: true, message: "Client added to the shared database." };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Could not create client.",
    };
  }
}

export async function createCampaignAction(payload: {
  clientEmail: string;
  name: string;
  platform: string;
  objective: string;
  budget: number;
  startDate: string;
  status: CampaignStatus;
  notes: string;
}): Promise<PlatformActionState> {
  const session = await getCurrentSession();
  ensureAdmin(session);

  if (!isSupabaseConfigured()) {
    return { success: false, message: "Supabase is not configured yet." };
  }

  try {
    await insertCampaign(payload);
    revalidatePlatformPages();
    return { success: true, message: "Campaign added to the shared database." };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Could not create campaign.",
    };
  }
}

export async function updateCampaignStatusAction(
  campaignId: string,
  status: CampaignStatus,
): Promise<PlatformActionState> {
  const session = await getCurrentSession();
  ensureAdmin(session);

  if (!isSupabaseConfigured()) {
    return { success: false, message: "Supabase is not configured yet." };
  }

  try {
    await setCampaignStatus(campaignId, status);
    revalidatePlatformPages();
    return { success: true, message: "Campaign status updated." };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Could not update campaign status.",
    };
  }
}
