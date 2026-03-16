import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { adminSidebar } from "@/lib/site-data";

export default function AdminCampaignsPage() {
  return (
    <DashboardPlaceholderPage
      title="Manage Campaigns"
      subtitle="Coordinate campaign stages, workload, owners, statuses, and upcoming launch dependencies."
      sidebarItems={adminSidebar}
      accent="coral"
    />
  );
}
