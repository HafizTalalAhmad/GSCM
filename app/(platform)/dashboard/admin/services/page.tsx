import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { adminSidebar } from "@/lib/site-data";

export default function AdminServicesPage() {
  return (
    <DashboardPlaceholderPage
      title="Manage Services"
      subtitle="Maintain offer details, package logic, pricing previews, and public-facing service content."
      sidebarItems={adminSidebar}
      accent="coral"
    />
  );
}
