import { headers } from "next/headers";

/**
 * Returns client IP from request headers when available.
 * Does not throw; returns null if headers are unavailable or IP cannot be determined.
 */
export function getClientIp(): string | null {
  try {
    const h = headers();
    const forwarded = h.get("x-forwarded-for");
    if (forwarded) {
      const first = forwarded.split(",")[0]?.trim();
      if (first) return first;
    }
    const real = h.get("x-real-ip")?.trim();
    if (real) return real;
    return null;
  } catch {
    return null;
  }
}
