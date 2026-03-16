import { ClientApprovalsPanel } from "@/components/dashboard/client-approvals-panel";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getCampaignsByClientEmail } from "@/lib/platform-data";
import { clientSidebar } from "@/lib/site-data";
import { getCurrentSession } from "@/lib/session";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ClientApprovalsPage() {
  const session = await getCurrentSession();
  const mode = isSupabaseConfigured() ? "supabase" : "local";
  const campaigns =
    mode === "supabase" ? await getCampaignsByClientEmail(session?.email ?? "") : [];

  return (
    <DashboardShell
      title="Client Approvals"
      subtitle="Approve creative assets, ad copy, campaign launches, and social content from one queue."
      sidebarItems={clientSidebar}
      accent="brand"
    >
      <ClientApprovalsPanel campaigns={campaigns} />
    </DashboardShell>
  );
}
