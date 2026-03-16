import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { adminSidebar } from "@/lib/site-data";

export default function AdminLeadsPage() {
  return (
    <DashboardPlaceholderPage
      title="Manage Leads"
      subtitle="Track inbound demand, qualification status, outreach flow, and proposal progression."
      sidebarItems={adminSidebar}
      accent="coral"
    />
  );
}
