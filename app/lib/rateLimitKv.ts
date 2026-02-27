/**
 * Rate limiter using Vercel KV (Upstash Redis).
 * Key: rl:{form}:{ip}
 * 5 submissions per hour (3600s TTL) per IP per form.
 * Fail open: if KV is not configured or client fails, returns allowed.
 */

const TTL_SECONDS = 3600;
const MAX_PER_WINDOW = 5;

function getKey(ip: string | null, formName: string): string | null {
  if (!ip || ip.trim() === "") return null;
  const safeIp = ip.trim().replace(/:/g, ".");
  return `rl:${formName}:${safeIp}`;
}

export async function checkRateLimitKv(
  ip: string | null,
  formName: string
): Promise<{ allowed: true } | { allowed: false; error: string }> {
  const key = getKey(ip, formName);
  if (key === null) return { allowed: true };

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return { allowed: true };
  }

  try {
    const { kv } = await import("@vercel/kv");
    const count = await kv.incr(key);
    if (count === 1) {
      await kv.expire(key, TTL_SECONDS);
    }
    if (count <= MAX_PER_WINDOW) {
      return { allowed: true };
    }
    return {
      allowed: false,
      error: "Too many requests. Please try again later.",
    };
  } catch {
    return { allowed: true };
  }
}
