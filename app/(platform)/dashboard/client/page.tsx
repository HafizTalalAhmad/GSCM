import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ClientOverview } from "@/components/dashboard/client-overview";
import { clientSidebar } from "@/lib/site-data";
import { getCurrentSession } from "@/lib/session";

export default async function ClientDashboardPage() {
  const session = await getCurrentSession();
  return (
    <DashboardShell
      title="Client Growth Dashboard"
      subtitle="Monitor campaign progress, review assets, approve content, and keep every deliverable visible across your engagement."
      sidebarItems={clientSidebar}
      accent="brand"
    >
      <ClientOverview clientEmail={session?.email ?? ""} />
    </DashboardShell>
  );
}
