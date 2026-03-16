import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { adminSidebar } from "@/lib/site-data";

export default function AdminClientsPage() {
  return (
    <DashboardPlaceholderPage
      title="Manage Clients"
      subtitle="View account health, assignments, onboarding stages, and workspace permissions."
      sidebarItems={adminSidebar}
      accent="coral"
    />
  );
}
