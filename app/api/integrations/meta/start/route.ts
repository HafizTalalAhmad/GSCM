import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";
import { metaProvider } from "@/lib/integrations/meta";
import { getClientById } from "@/lib/platform-data";

const metaCookieName = "gscm_meta_oauth";

export async function GET(request: NextRequest) {
  const session = await getCurrentSession();

  if (!session || session.role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const clientId = request.nextUrl.searchParams.get("clientId");

  if (!clientId) {
    return NextResponse.redirect(new URL("/dashboard/admin/settings?meta=missing-client", request.url));
  }

  const client = await getClientById(clientId);

  if (!client) {
    return NextResponse.redirect(new URL("/dashboard/admin/settings?meta=invalid-client", request.url));
  }

  if (!process.env.META_APP_ID || !process.env.META_REDIRECT_URI) {
    return NextResponse.redirect(new URL("/dashboard/admin/settings?meta=missing-env", request.url));
  }

  const state = crypto.randomUUID();
  const { authorizationUrl } = metaProvider.buildAuthorizationUrl(
    process.env.META_APP_ID,
    process.env.META_REDIRECT_URI,
    state,
  );

  const cookieStore = await cookies();
  cookieStore.set(
    metaCookieName,
    JSON.stringify({
      state,
      clientId,
    }),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 10,
    },
  );

  return NextResponse.redirect(authorizationUrl);
}
