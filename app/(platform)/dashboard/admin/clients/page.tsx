import { AdminClientsManager } from "@/components/dashboard/admin-clients-manager";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { adminSidebar } from "@/lib/site-data";

export default function AdminClientsPage() {
  return (
    <DashboardShell
      title="Manage Clients"
      subtitle="View account health, assignments, onboarding stages, and workspace permissions."
      sidebarItems={adminSidebar}
      accent="coral"
    >
      <AdminClientsManager />
    </DashboardShell>
  );
}
