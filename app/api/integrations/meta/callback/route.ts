import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { fetchMetaAdAccounts, metaProvider } from "@/lib/integrations/meta";
import { upsertExternalAccounts } from "@/lib/platform-data";
import { getCurrentSession } from "@/lib/session";

const metaCookieName = "gscm_meta_oauth";

export async function GET(request: NextRequest) {
  const session = await getCurrentSession();

  if (!session || session.role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const params = request.nextUrl.searchParams;
  const code = params.get("code");
  const state = params.get("state");
  const error = params.get("error");
  const errorReason = params.get("error_reason");
  const errorDescription = params.get("error_description");
  const settingsUrl = new URL("/dashboard/admin/settings", request.url);
  const cookieStore = await cookies();
  const rawState = cookieStore.get(metaCookieName)?.value;

  cookieStore.delete(metaCookieName);

  if (error) {
    settingsUrl.searchParams.set("meta", "oauth-denied");
    if (errorReason) settingsUrl.searchParams.set("reason", errorReason);
    if (errorDescription) settingsUrl.searchParams.set("detail", errorDescription);
    return NextResponse.redirect(settingsUrl);
  }

  if (!code || !state || !rawState) {
    settingsUrl.searchParams.set("meta", "invalid-state");
    return NextResponse.redirect(settingsUrl);
  }

  try {
    const parsed = JSON.parse(rawState) as { state: string; clientId: string };

    if (parsed.state !== state) {
      settingsUrl.searchParams.set("meta", "invalid-state");
      return NextResponse.redirect(settingsUrl);
    }

    if (!process.env.META_REDIRECT_URI) {
      settingsUrl.searchParams.set("meta", "missing-env");
      return NextResponse.redirect(settingsUrl);
    }

    const tokenSet = await metaProvider.exchangeCodeForToken(code, process.env.META_REDIRECT_URI);
    const accounts = await fetchMetaAdAccounts(tokenSet.accessToken);

    if (!accounts.length) {
      settingsUrl.searchParams.set("meta", "no-accounts");
      return NextResponse.redirect(settingsUrl);
    }

    await upsertExternalAccounts({
      clientId: parsed.clientId,
      platform: "Meta Ads",
      accessToken: tokenSet.accessToken,
      refreshToken: tokenSet.refreshToken,
      tokenExpiresAt: tokenSet.expiresAt,
      accounts,
    });

    settingsUrl.searchParams.set("meta", "connected");
    return NextResponse.redirect(settingsUrl);
  } catch (caughtError) {
    settingsUrl.searchParams.set("meta", "failed");
    settingsUrl.searchParams.set(
      "detail",
      caughtError instanceof Error ? caughtError.message : "Unknown Meta connection error.",
    );
    return NextResponse.redirect(settingsUrl);
  }
}
