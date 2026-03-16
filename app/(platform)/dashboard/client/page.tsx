import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ClientOverview } from "@/components/dashboard/client-overview";
import { getCampaignsByClientEmail } from "@/lib/platform-data";
import { clientSidebar } from "@/lib/site-data";
import { getCurrentSession } from "@/lib/session";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ClientDashboardPage() {
  const session = await getCurrentSession();
  const mode = isSupabaseConfigured() ? "supabase" : "local";
  const campaigns =
    mode === "supabase" ? await getCampaignsByClientEmail(session?.email ?? "") : [];

  return (
    <DashboardShell
      title="Client Growth Dashboard"
      subtitle="Monitor campaign progress, review assets, approve content, and keep every deliverable visible across your engagement."
      sidebarItems={clientSidebar}
      accent="brand"
    >
      <ClientOverview campaigns={campaigns} mode={mode} />
    </DashboardShell>
  );
}
