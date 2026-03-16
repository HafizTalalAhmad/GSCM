import { GlassCard } from "@/components/ui/glass-card";
import type { ClientRecord, ExternalAccountRecord } from "@/lib/platform-types";

function buildMetaMessage(status: string | null) {
  if (status === "connected") return "Meta account connection completed successfully.";
  if (status === "missing-env") return "Meta environment variables are missing in Vercel.";
  if (status === "missing-client") return "Choose a valid client before starting the Meta connection.";
  if (status === "invalid-client") return "The selected client record could not be found.";
  if (status === "oauth-denied") return "Meta authorization was cancelled or denied.";
  if (status === "invalid-state") return "Meta OAuth state verification failed. Please try again.";
  if (status === "no-accounts") return "No accessible Meta ad accounts were returned for this login.";
  if (status === "failed") return "Meta connection failed. Review the details and try again.";
  return "";
}

export function AdminIntegrationSettings({
  clients,
  externalAccounts,
  metaStatus,
  metaDetail,
}: {
  clients: ClientRecord[];
  externalAccounts: ExternalAccountRecord[];
  metaStatus: string | null;
  metaDetail: string | null;
}) {
  const statusMessage = buildMetaMessage(metaStatus);

  return (
    <div className="space-y-6">
      {statusMessage ? (
        <GlassCard className="rounded-[30px] border-white/10 bg-white/[0.04] p-6">
          <div className="text-sm uppercase tracking-[0.24em] text-brand">Integration status</div>
          <p className="mt-3 text-sm leading-7 text-white/85">{statusMessage}</p>
          {metaDetail ? <p className="mt-3 text-sm leading-7 text-muted">{metaDetail}</p> : null}
        </GlassCard>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <GlassCard className="rounded-[30px] p-6">
          <div className="text-sm uppercase tracking-[0.28em] text-brand">Meta Ads</div>
          <h2 className="mt-3 text-3xl font-semibold text-white">Connect client ad accounts</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Start by connecting each client’s Meta ad account. This first step stores the accessible ad accounts in Supabase so we can later map them to campaigns and sync performance data.
          </p>
          <div className="mt-6 space-y-4">
            {clients.length === 0 ? (
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 text-sm text-muted">
                Add a client first before connecting a Meta ad account.
              </div>
            ) : (
              clients.map((client) => (
                <div key={client.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <div className="text-lg font-semibold text-white">{client.company}</div>
                      <div className="mt-2 text-sm text-muted">{client.name}</div>
                      <div className="mt-1 text-sm text-brand">{client.email}</div>
                    </div>
                    <a
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#281a27] via-[#5a415d] to-[#b88462] px-5 py-3 text-sm font-semibold tracking-wide text-white shadow-soft transition duration-200 hover:scale-[1.01]"
                      href={`/api/integrations/meta/start?clientId=${client.id}`}
                    >
                      Connect Meta Ads
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassCard>

        <GlassCard className="rounded-[30px] p-6">
          <div className="text-sm uppercase tracking-[0.28em] text-brand">Connected Accounts</div>
          <h2 className="mt-3 text-3xl font-semibold text-white">Saved provider accounts</h2>
          <div className="mt-6 space-y-4">
            {externalAccounts.length === 0 ? (
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 text-sm text-muted">
                No provider accounts have been connected yet.
              </div>
            ) : (
              externalAccounts.map((account) => (
                <div key={account.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold text-white">{account.accountName}</div>
                      <div className="mt-2 text-sm text-brand">{account.platform}</div>
                      <div className="mt-1 text-sm text-muted">{account.externalAccountId}</div>
                    </div>
                    <div className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white">
                      {account.status}
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-muted">
                    Last synced: {account.lastSyncedAt || "Not synced yet"}
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
