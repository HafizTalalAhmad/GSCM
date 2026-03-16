import { ClientReportsPanel } from "@/components/dashboard/client-reports-panel";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getCampaignsByClientEmail } from "@/lib/platform-data";
import { clientSidebar } from "@/lib/site-data";
import { getCurrentSession } from "@/lib/session";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ClientReportsPage() {
  const session = await getCurrentSession();
  const mode = isSupabaseConfigured() ? "supabase" : "local";
  const campaigns =
    mode === "supabase" ? await getCampaignsByClientEmail(session?.email ?? "") : [];

  return (
    <DashboardShell
      title="Client Reports"
      subtitle="Centralize exported reports, executive summaries, and monthly performance reviews."
      sidebarItems={clientSidebar}
      accent="brand"
    >
      <ClientReportsPanel campaigns={campaigns} />
    </DashboardShell>
  );
}
