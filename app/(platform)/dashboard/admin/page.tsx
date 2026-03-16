import { DashboardShell } from "@/components/layout/dashboard-shell";
import { AdminOverview } from "@/components/dashboard/admin-overview";
import { getAllCampaigns, getAllClients } from "@/lib/platform-data";
import { adminSidebar } from "@/lib/site-data";
import { isSupabaseConfigured } from "@/lib/supabase";

export default async function AdminDashboardPage() {
  const mode = isSupabaseConfigured() ? "supabase" : "local";
  const [clients, campaigns] =
    mode === "supabase"
      ? await Promise.all([getAllClients(), getAllCampaigns()])
      : [[], []];

  return (
    <DashboardShell
      title="Admin Command Center"
      subtitle="Run service delivery, monitor lead flow, manage content publishing, and coordinate campaign operations from one premium control layer."
      sidebarItems={adminSidebar}
      accent="coral"
    >
      <AdminOverview clients={clients} campaigns={campaigns} mode={mode} />
    </DashboardShell>
  );
}
