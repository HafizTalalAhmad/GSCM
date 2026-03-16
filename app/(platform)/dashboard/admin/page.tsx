import { DashboardShell } from "@/components/layout/dashboard-shell";
import { AdminOverview } from "@/components/dashboard/admin-overview";
import { adminSidebar } from "@/lib/site-data";

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      title="Admin Command Center"
      subtitle="Run service delivery, monitor lead flow, manage content publishing, and coordinate campaign operations from one premium control layer."
      sidebarItems={adminSidebar}
      accent="coral"
    >
      <AdminOverview />
    </DashboardShell>
  );
}
