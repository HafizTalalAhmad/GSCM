import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { clientSidebar } from "@/lib/site-data";

export default function ClientReportsPage() {
  return (
    <DashboardPlaceholderPage
      title="Client Reports"
      subtitle="Centralize exported reports, executive summaries, and monthly performance reviews."
      sidebarItems={clientSidebar}
      accent="brand"
    />
  );
}
