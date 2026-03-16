import type { IntegrationProvider, OAuthStartResult, OAuthTokenSet } from "@/lib/integrations/types";
import type { ProviderCampaignSnapshot } from "@/lib/platform-types";

export const linkedinProvider: IntegrationProvider = {
  platform: "LinkedIn Ads",
  buildAuthorizationUrl(clientId: string, redirectUri: string, state: string): OAuthStartResult {
    const url = new URL("https://www.linkedin.com/oauth/v2/authorization");
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("scope", "r_ads_reporting rw_ads");

    return { authorizationUrl: url.toString(), state };
  },
  async exchangeCodeForToken(_code: string, _redirectUri: string): Promise<OAuthTokenSet> {
    throw new Error("LinkedIn token exchange is not wired yet. Add the real API call in lib/integrations/linkedin.ts.");
  },
  async refreshAccessToken(_refreshToken: string): Promise<OAuthTokenSet> {
    throw new Error("LinkedIn token refresh is not wired yet. Add the real API call in lib/integrations/linkedin.ts.");
  },
  async fetchCampaignSnapshots(_args: {
    accessToken: string;
    accountId: string;
    dateFrom: string;
    dateTo: string;
  }): Promise<ProviderCampaignSnapshot[]> {
    throw new Error("LinkedIn campaign sync is not wired yet. Add the real API call in lib/integrations/linkedin.ts.");
  },
};
