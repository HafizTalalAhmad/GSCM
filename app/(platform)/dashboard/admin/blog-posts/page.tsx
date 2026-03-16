import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { adminSidebar } from "@/lib/site-data";

export default function AdminBlogPostsPage() {
  return (
    <DashboardPlaceholderPage
      title="Manage Blog Posts"
      subtitle="Draft, review, schedule, and publish editorial content for the public marketing site."
      sidebarItems={adminSidebar}
      accent="coral"
    />
  );
}
