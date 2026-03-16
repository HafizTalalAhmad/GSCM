import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { adminSidebar } from "@/lib/site-data";

export default function AdminCaseStudiesPage() {
  return (
    <DashboardPlaceholderPage
      title="Manage Case Studies"
      subtitle="Organize proof points, pull metrics, and prepare polished growth stories for publication."
      sidebarItems={adminSidebar}
      accent="coral"
    />
  );
}
