import { ClientAssetsPanel } from "@/components/dashboard/client-assets-panel";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getCampaignsByClientEmail } from "@/lib/platform-data";
import { clientSidebar } from "@/lib/site-data";
import { getCurrentSession } from "@/lib/session";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ClientAssetsPage() {
  const session = await getCurrentSession();
  const mode = isSupabaseConfigured() ? "supabase" : "local";
  const campaigns =
    mode === "supabase" ? await getCampaignsByClientEmail(session?.email ?? "") : [];

  return (
    <DashboardShell
      title="Asset Library"
      subtitle="Store approved media, campaign kits, brand documents, and downloadable creative packs."
      sidebarItems={clientSidebar}
      accent="brand"
    >
      <ClientAssetsPanel campaigns={campaigns} />
    </DashboardShell>
  );
}
