"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signSession, sessionCookieName, type SessionRole } from "@/lib/auth";

export type AuthState = {
  success: boolean;
  message: string;
};

type CredentialConfig = {
  email?: string;
  password?: string;
  role: SessionRole;
  redirectTo: string;
};

const credentials: CredentialConfig[] = [
  {
    email: process.env.GSCM_ADMIN_EMAIL,
    password: process.env.GSCM_ADMIN_PASSWORD,
    role: "admin",
    redirectTo: "/dashboard/admin",
  },
  {
    email: process.env.GSCM_CLIENT_EMAIL,
    password: process.env.GSCM_CLIENT_PASSWORD,
    role: "client",
    redirectTo: "/dashboard/client",
  },
];

export async function loginAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "").trim();

  const matched = credentials.find(
    (item) =>
      item.email?.toLowerCase() === email &&
      item.password &&
      item.password === password,
  );

  if (!matched) {
    return {
      success: false,
      message: "Invalid credentials. Check your email and password.",
    };
  }

  const token = await signSession({
    email,
    role: matched.role,
  });

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(matched.redirectTo);
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
  redirect("/login");
}
