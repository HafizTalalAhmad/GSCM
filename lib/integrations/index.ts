import { linkedinProvider } from "@/lib/integrations/linkedin";
import { metaProvider } from "@/lib/integrations/meta";
import { tiktokProvider } from "@/lib/integrations/tiktok";
import type { IntegrationProvider } from "@/lib/integrations/types";
import type { SocialPlatform } from "@/lib/platform-types";

const providers: Record<SocialPlatform, IntegrationProvider> = {
  "Meta Ads": metaProvider,
  "TikTok Ads": tiktokProvider,
  "LinkedIn Ads": linkedinProvider,
};

export function getIntegrationProvider(platform: SocialPlatform) {
  return providers[platform];
}

export function listIntegrationProviders() {
  return Object.values(providers);
}
