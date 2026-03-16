import { ClientReportsPanel } from "@/components/dashboard/client-reports-panel";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { clientSidebar } from "@/lib/site-data";
import { getCurrentSession } from "@/lib/session";

export default async function ClientReportsPage() {
  const session = await getCurrentSession();
  return (
    <DashboardShell
      title="Client Reports"
      subtitle="Centralize exported reports, executive summaries, and monthly performance reviews."
      sidebarItems={clientSidebar}
      accent="brand"
    >
      <ClientReportsPanel clientEmail={session?.email ?? ""} />
    </DashboardShell>
  );
}
