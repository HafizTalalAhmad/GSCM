import { AdminIntegrationSettings } from "@/components/dashboard/admin-integration-settings";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getAllClients, getAllExternalAccounts } from "@/lib/platform-data";
import { adminSidebar } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const [clients, externalAccounts] = await Promise.all([
    getAllClients(),
    getAllExternalAccounts(),
  ]);
  const metaStatus = typeof params.meta === "string" ? params.meta : null;
  const metaDetail = typeof params.detail === "string" ? params.detail : null;

  return (
    <DashboardShell
      title="Platform Settings"
      subtitle="Control workspace roles, integrations, branding variables, and global platform preferences."
      sidebarItems={adminSidebar}
      accent="coral"
    >
      <AdminIntegrationSettings
        clients={clients}
        externalAccounts={externalAccounts}
        metaStatus={metaStatus}
        metaDetail={metaDetail}
      />
    </DashboardShell>
  );
}
