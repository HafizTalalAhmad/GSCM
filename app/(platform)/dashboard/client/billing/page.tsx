import { ClientBillingPanel } from "@/components/dashboard/client-billing-panel";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getCampaignsByClientEmail } from "@/lib/platform-data";
import { clientSidebar } from "@/lib/site-data";
import { getCurrentSession } from "@/lib/session";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ClientBillingPage() {
  const session = await getCurrentSession();
  const mode = isSupabaseConfigured() ? "supabase" : "local";
  const campaigns =
    mode === "supabase" ? await getCampaignsByClientEmail(session?.email ?? "") : [];

  return (
    <DashboardShell
      title="Client Billing"
      subtitle="Track invoices, payment status, retainers, and upcoming billing milestones."
      sidebarItems={clientSidebar}
      accent="brand"
    >
      <ClientBillingPanel campaigns={campaigns} />
    </DashboardShell>
  );
}
