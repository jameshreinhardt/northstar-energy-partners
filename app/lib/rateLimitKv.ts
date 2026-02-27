/**
 * Rate limiter using Vercel KV (Upstash Redis).
 * Key: rl:{form}:{ip} (ip sanitized: ':' -> '.', spaces removed).
 * 5 submissions per hour (3600s TTL) per IP per form.
 * Fail open: if URL/TOKEN missing or any KV error, returns allowed.
 */

const TTL_SECONDS = 3600;
const MAX_PER_WINDOW = 5;

function getKey(ip: string | null, formName: string): string | null {
  if (!ip || typeof ip !== "string") return null;
  const safeIp = ip.replace(/:/g, ".").replace(/\s/g, "");
  if (!safeIp) return null;
  return `rl:${formName}:${safeIp}`;
}

function getKvConfig(): { url: string; token: string } | null {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.STORAGE_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.STORAGE_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || typeof url !== "string" || typeof token !== "string") {
    return null;
  }
  return { url, token };
}

export async function checkRateLimitKv(
  ip: string | null,
  formName: string
): Promise<{ allowed: true } | { allowed: false; error: string }> {
  const key = getKey(ip, formName);
  if (key === null) return { allowed: true };

  const config = getKvConfig();
  if (!config) return { allowed: true };

  try {
    const { createClient } = await import("@vercel/kv");
    const kv = createClient({ url: config.url, token: config.token });
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
