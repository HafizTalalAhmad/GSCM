import { AdminClientsManager } from "@/components/dashboard/admin-clients-manager";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getAllClients } from "@/lib/platform-data";
import { adminSidebar } from "@/lib/site-data";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const mode = isSupabaseConfigured() ? "supabase" : "local";
  const initialClients = mode === "supabase" ? await getAllClients() : [];

  return (
    <DashboardShell
      title="Manage Clients"
      subtitle="View account health, assignments, onboarding stages, and workspace permissions."
      sidebarItems={adminSidebar}
      accent="coral"
    >
      <AdminClientsManager initialClients={initialClients} mode={mode} />
    </DashboardShell>
  );
}
