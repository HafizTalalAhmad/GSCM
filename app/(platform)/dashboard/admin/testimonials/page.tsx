import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { adminSidebar } from "@/lib/site-data";

export default function AdminTestimonialsPage() {
  return (
    <DashboardPlaceholderPage
      title="Manage Testimonials"
      subtitle="Approve proof, assign categories, and curate social proof blocks across the platform."
      sidebarItems={adminSidebar}
      accent="coral"
    />
  );
}
