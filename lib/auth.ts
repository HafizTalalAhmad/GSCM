import { SignJWT, jwtVerify } from "jose";

export type SessionRole = "admin" | "client";

export type SessionPayload = {
  email: string;
  role: SessionRole;
};

const COOKIE_NAME = "gscm_session";

function getSecret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET || "dev-only-secret-change-me");
}

export async function signSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySession(token: string) {
  const verified = await jwtVerify<SessionPayload>(token, getSecret());
  return verified.payload;
}

export const sessionCookieName = COOKIE_NAME;
