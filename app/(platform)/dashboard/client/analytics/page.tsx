import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { clientSidebar } from "@/lib/site-data";

export default function ClientAnalyticsPage() {
  return (
    <DashboardPlaceholderPage
      title="Client Analytics"
      subtitle="Drill into channel performance, campaign efficiency, attribution, and reporting snapshots."
      sidebarItems={clientSidebar}
      accent="brand"
    />
  );
}
