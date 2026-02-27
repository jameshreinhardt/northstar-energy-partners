/**
 * In-memory rate limiter keyed by (ip + formName).
 * Allow 5 submissions per hour per IP per form.
 * If IP is unavailable, skips rate limiting (does not throw).
 */

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;

const store = new Map<string, number[]>();

function getKey(ip: string | null, formName: string): string | null {
  if (!ip || ip.trim() === "") return null;
  return `${ip.trim()}:${formName}`;
}

function prune(key: string): void {
  const now = Date.now();
  const timestamps = store.get(key);
  if (!timestamps) return;
  const valid = timestamps.filter((t) => now - t < WINDOW_MS);
  if (valid.length === 0) store.delete(key);
  else store.set(key, valid);
}

export function checkRateLimit(
  ip: string | null,
  formName: string
): { allowed: true } | { allowed: false; error: string } {
  const key = getKey(ip, formName);
  if (key === null) return { allowed: true };

  const now = Date.now();
  prune(key);

  const timestamps = store.get(key) ?? [];
  if (timestamps.length >= MAX_PER_WINDOW) {
    return {
      allowed: false,
      error: "Too many requests. Please try again later.",
    };
  }

  timestamps.push(now);
  store.set(key, timestamps);
  return { allowed: true };
}
