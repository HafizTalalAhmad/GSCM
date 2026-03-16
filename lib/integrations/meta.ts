import type { IntegrationProvider, OAuthStartResult, OAuthTokenSet } from "@/lib/integrations/types";
import type { ProviderCampaignSnapshot } from "@/lib/platform-types";

const META_GRAPH_VERSION = "v20.0";

type MetaTokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
};

type MetaAdAccountRow = {
  id: string;
  name?: string;
  account_status?: number;
};

type MetaAdAccountsResponse = {
  data?: MetaAdAccountRow[];
};

function getRequiredEnv(name: "META_APP_ID" | "META_APP_SECRET") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function buildExpiryDate(expiresIn?: number) {
  if (!expiresIn) {
    return undefined;
  }

  return new Date(Date.now() + expiresIn * 1000).toISOString();
}

export const metaProvider: IntegrationProvider = {
  platform: "Meta Ads",
  buildAuthorizationUrl(clientId: string, redirectUri: string, state: string): OAuthStartResult {
    const url = new URL(`https://www.facebook.com/${META_GRAPH_VERSION}/dialog/oauth`);
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("scope", "ads_management,ads_read,business_management");

    return { authorizationUrl: url.toString(), state };
  },
  async exchangeCodeForToken(code: string, redirectUri: string): Promise<OAuthTokenSet> {
    const clientId = getRequiredEnv("META_APP_ID");
    const clientSecret = getRequiredEnv("META_APP_SECRET");
    const url = new URL(`https://graph.facebook.com/${META_GRAPH_VERSION}/oauth/access_token`);

    url.searchParams.set("client_id", clientId);
    url.searchParams.set("client_secret", clientSecret);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("code", code);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Meta token exchange failed: ${body}`);
    }

    const payload = (await response.json()) as MetaTokenResponse;

    return {
      accessToken: payload.access_token,
      expiresAt: buildExpiryDate(payload.expires_in),
    };
  },
  async refreshAccessToken(_refreshToken: string): Promise<OAuthTokenSet> {
    throw new Error("Meta token refresh is not wired yet. Add the real API call in lib/integrations/meta.ts.");
  },
  async fetchCampaignSnapshots(_args: {
    accessToken: string;
    accountId: string;
    dateFrom: string;
    dateTo: string;
  }): Promise<ProviderCampaignSnapshot[]> {
    throw new Error("Meta campaign sync is not wired yet. Add the real API call in lib/integrations/meta.ts.");
  },
};

export async function fetchMetaAdAccounts(accessToken: string) {
  const url = new URL(`https://graph.facebook.com/${META_GRAPH_VERSION}/me/adaccounts`);
  url.searchParams.set("fields", "id,name,account_status");

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Meta ad account fetch failed: ${body}`);
  }

  const payload = (await response.json()) as MetaAdAccountsResponse;

  return (payload.data ?? []).map((account) => ({
    externalAccountId: account.id,
    accountName: account.name || account.id,
    status: (account.account_status === 1 ? "connected" : "expired") as "connected" | "expired",
  }));
}
