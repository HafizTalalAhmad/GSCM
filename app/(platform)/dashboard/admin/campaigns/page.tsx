import { AdminCampaignsManager } from "@/components/dashboard/admin-campaigns-manager";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getAllCampaigns, getAllClients } from "@/lib/platform-data";
import { adminSidebar } from "@/lib/site-data";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminCampaignsPage() {
  const mode = isSupabaseConfigured() ? "supabase" : "local";
  const [initialClients, initialCampaigns] =
    mode === "supabase"
      ? await Promise.all([getAllClients(), getAllCampaigns()])
      : [[], []];

  return (
    <DashboardShell
      title="Manage Campaigns"
      subtitle="Coordinate campaign stages, workload, owners, statuses, and upcoming launch dependencies."
      sidebarItems={adminSidebar}
      accent="coral"
    >
      <AdminCampaignsManager
        initialClients={initialClients}
        initialCampaigns={initialCampaigns}
        mode={mode}
      />
    </DashboardShell>
  );
}
