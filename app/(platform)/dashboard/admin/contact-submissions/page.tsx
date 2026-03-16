import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { adminSidebar } from "@/lib/site-data";

export default function AdminContactSubmissionsPage() {
  return (
    <DashboardPlaceholderPage
      title="Manage Contact Submissions"
      subtitle="Review inquiries, assign owners, and route submissions into the lead pipeline."
      sidebarItems={adminSidebar}
      accent="coral"
    />
  );
}
