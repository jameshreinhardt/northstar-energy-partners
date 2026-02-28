import { createHmac } from "crypto";

const COOKIE_NAME = "admin_token";
const TOKEN_PAYLOAD = "admin";

export function createAdminToken(): string {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  return createHmac("sha256", secret).update(TOKEN_PAYLOAD).digest("hex");
}

export function verifyAdminToken(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  return createAdminToken() === cookieValue;
}

export function getAdminCookieName(): string {
  return COOKIE_NAME;
}

export function isAdminAuthenticated(cookieValue: string | undefined): boolean {
  return verifyAdminToken(cookieValue);
}
