import { AdminCampaignsManager } from "@/components/dashboard/admin-campaigns-manager";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { adminSidebar } from "@/lib/site-data";

export default function AdminCampaignsPage() {
  return (
    <DashboardShell
      title="Manage Campaigns"
      subtitle="Coordinate campaign stages, workload, owners, statuses, and upcoming launch dependencies."
      sidebarItems={adminSidebar}
      accent="coral"
    >
      <AdminCampaignsManager />
    </DashboardShell>
  );
}
