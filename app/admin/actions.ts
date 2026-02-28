"use server";

import { cookies } from "next/headers";
import { createAdminToken, getAdminCookieName } from "../lib/adminAuth";

export async function adminLogin(password: string): Promise<{ ok: boolean; error?: string }> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return { ok: false, error: "Admin not configured." };
  }
  if (password !== expected) {
    return { ok: false, error: "Invalid password." };
  }
  const token = createAdminToken();
  const cookieStore = await cookies();
  cookieStore.set(getAdminCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24h
    path: "/",
  });
  return { ok: true };
}

export async function adminLogout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(getAdminCookieName());
}
