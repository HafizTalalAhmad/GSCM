import { ClientSchedulePanel } from "@/components/dashboard/client-schedule-panel";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { clientSidebar } from "@/lib/site-data";
import { getCurrentSession } from "@/lib/session";

export default async function ClientContentCalendarPage() {
  const session = await getCurrentSession();
  return (
    <DashboardShell
      title="Client Content Calendar"
      subtitle="Manage publishing cadence, review upcoming posts, and coordinate stakeholder approvals."
      sidebarItems={clientSidebar}
      accent="brand"
    >
      <ClientSchedulePanel clientEmail={session?.email ?? ""} />
    </DashboardShell>
  );
}
