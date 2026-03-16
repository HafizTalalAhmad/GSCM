import type { ProviderCampaignSnapshot, SocialPlatform } from "@/lib/platform-types";

export type OAuthTokenSet = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  scope?: string;
};

export type OAuthStartResult = {
  authorizationUrl: string;
  state: string;
};

export type IntegrationProvider = {
  platform: SocialPlatform;
  buildAuthorizationUrl(clientId: string, redirectUri: string, state: string): OAuthStartResult;
  exchangeCodeForToken(code: string, redirectUri: string): Promise<OAuthTokenSet>;
  refreshAccessToken(refreshToken: string): Promise<OAuthTokenSet>;
  fetchCampaignSnapshots(args: {
    accessToken: string;
    accountId: string;
    dateFrom: string;
    dateTo: string;
  }): Promise<ProviderCampaignSnapshot[]>;
};
