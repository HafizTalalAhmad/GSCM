import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { clientSidebar } from "@/lib/site-data";

export default function ClientContentCalendarPage() {
  return (
    <DashboardPlaceholderPage
      title="Client Content Calendar"
      subtitle="Manage publishing cadence, review upcoming posts, and coordinate stakeholder approvals."
      sidebarItems={clientSidebar}
      accent="brand"
    />
  );
}
