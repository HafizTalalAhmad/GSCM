import { DashboardShell } from "@/components/layout/dashboard-shell";
import { clientSidebar } from "@/lib/site-data";
import { getCurrentSession } from "@/lib/session";
import { ClientAnalyticsPanel } from "@/components/dashboard/client-analytics-panel";
import { getCampaignsByClientEmail } from "@/lib/platform-data";
import { isSupabaseConfigured } from "@/lib/supabase";

export default async function ClientAnalyticsPage() {
  const session = await getCurrentSession();
  const mode = isSupabaseConfigured() ? "supabase" : "local";
  const campaigns =
    mode === "supabase" ? await getCampaignsByClientEmail(session?.email ?? "") : [];

  return (
    <DashboardShell
      title="Client Analytics"
      subtitle="See budget totals, platform distribution, and the current campaign mix assigned to your account."
      sidebarItems={clientSidebar}
      accent="brand"
    >
      <ClientAnalyticsPanel campaigns={campaigns} />
    </DashboardShell>
  );
}
