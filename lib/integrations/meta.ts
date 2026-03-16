import type { IntegrationProvider, OAuthStartResult, OAuthTokenSet } from "@/lib/integrations/types";
import type { ProviderCampaignSnapshot } from "@/lib/platform-types";

export const metaProvider: IntegrationProvider = {
  platform: "Meta Ads",
  buildAuthorizationUrl(clientId: string, redirectUri: string, state: string): OAuthStartResult {
    const url = new URL("https://www.facebook.com/v20.0/dialog/oauth");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("scope", "ads_management,ads_read,business_management");

    return { authorizationUrl: url.toString(), state };
  },
  async exchangeCodeForToken(_code: string, _redirectUri: string): Promise<OAuthTokenSet> {
    throw new Error("Meta token exchange is not wired yet. Add the real API call in lib/integrations/meta.ts.");
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
