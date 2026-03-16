import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { clientSidebar } from "@/lib/site-data";

export default function ClientApprovalsPage() {
  return (
    <DashboardPlaceholderPage
      title="Client Approvals"
      subtitle="Approve creative assets, ad copy, campaign launches, and social content from one queue."
      sidebarItems={clientSidebar}
      accent="brand"
    />
  );
}
