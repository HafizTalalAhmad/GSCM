import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { clientSidebar } from "@/lib/site-data";

export default function ClientMessagesPage() {
  return (
    <DashboardPlaceholderPage
      title="Client Messages"
      subtitle="Keep campaign communication, update threads, and delivery notes organized by account."
      sidebarItems={clientSidebar}
      accent="brand"
    />
  );
}
