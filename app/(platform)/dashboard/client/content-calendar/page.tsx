import { ClientSchedulePanel } from "@/components/dashboard/client-schedule-panel";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getCampaignsByClientEmail } from "@/lib/platform-data";
import { clientSidebar } from "@/lib/site-data";
import { getCurrentSession } from "@/lib/session";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ClientContentCalendarPage() {
  const session = await getCurrentSession();
  const mode = isSupabaseConfigured() ? "supabase" : "local";
  const campaigns =
    mode === "supabase" ? await getCampaignsByClientEmail(session?.email ?? "") : [];

  return (
    <DashboardShell
      title="Client Content Calendar"
      subtitle="Manage publishing cadence, review upcoming posts, and coordinate stakeholder approvals."
      sidebarItems={clientSidebar}
      accent="brand"
    >
      <ClientSchedulePanel campaigns={campaigns} />
    </DashboardShell>
  );
}
