import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { adminSidebar } from "@/lib/site-data";

export default function AdminSettingsPage() {
  return (
    <DashboardPlaceholderPage
      title="Platform Settings"
      subtitle="Control workspace roles, integrations, branding variables, and global platform preferences."
      sidebarItems={adminSidebar}
      accent="coral"
    />
  );
}
