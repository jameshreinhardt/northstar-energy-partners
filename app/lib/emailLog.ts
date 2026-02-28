/**
 * Mask CONTACT_FROM_EMAIL for server logs (show first 2 chars + domain).
 */
export function maskFromEmail(s: string): string {
  if (!s) return "(not set)";
  const at = s.lastIndexOf("@");
  return at === -1 ? s.slice(0, 2) + "***" : s.slice(0, 2) + "***" + s.slice(at);
}
