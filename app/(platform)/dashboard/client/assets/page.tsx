import { DashboardPlaceholderPage } from "@/components/dashboard/placeholder-page";
import { clientSidebar } from "@/lib/site-data";

export default function ClientAssetsPage() {
  return (
    <DashboardPlaceholderPage
      title="Asset Library"
      subtitle="Store approved media, campaign kits, brand documents, and downloadable creative packs."
      sidebarItems={clientSidebar}
      accent="brand"
    />
  );
}
