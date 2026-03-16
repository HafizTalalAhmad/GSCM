import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { clientSidebar } from "@/lib/site-data";

export default function ClientBillingPage() {
  return (
    <DashboardPlaceholderPage
      title="Client Billing"
      subtitle="Track invoices, payment status, retainers, and upcoming billing milestones."
      sidebarItems={clientSidebar}
      accent="brand"
    />
  );
}
