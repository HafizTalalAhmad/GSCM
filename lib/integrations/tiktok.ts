import type { IntegrationProvider, OAuthStartResult, OAuthTokenSet } from "@/lib/integrations/types";
import type { ProviderCampaignSnapshot } from "@/lib/platform-types";

export const tiktokProvider: IntegrationProvider = {
  platform: "TikTok Ads",
  buildAuthorizationUrl(clientId: string, redirectUri: string, state: string): OAuthStartResult {
    const url = new URL("https://ads.tiktok.com/marketing_api/auth");
    url.searchParams.set("app_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("state", state);

    return { authorizationUrl: url.toString(), state };
  },
  async exchangeCodeForToken(_code: string, _redirectUri: string): Promise<OAuthTokenSet> {
    throw new Error("TikTok token exchange is not wired yet. Add the real API call in lib/integrations/tiktok.ts.");
  },
  async refreshAccessToken(_refreshToken: string): Promise<OAuthTokenSet> {
    throw new Error("TikTok token refresh is not wired yet. Add the real API call in lib/integrations/tiktok.ts.");
  },
  async fetchCampaignSnapshots(_args: {
    accessToken: string;
    accountId: string;
    dateFrom: string;
    dateTo: string;
  }): Promise<ProviderCampaignSnapshot[]> {
    throw new Error("TikTok campaign sync is not wired yet. Add the real API call in lib/integrations/tiktok.ts.");
  },
};
