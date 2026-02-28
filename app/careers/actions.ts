"use server";

import { Resend } from "resend";
import { safeFormString as s } from "../lib/formData";
import { getClientIp } from "../lib/getClientIp";
import { checkRateLimitKv } from "../lib/rateLimitKv";

const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Northstar Energy Partners <support@northstarenergypartners.com>";
const INTERNAL_SUBJECT = "Career application — Northstar Energy Partners";
const CONFIRM_SUBJECT = "We received your application — Northstar Energy Partners";
const RECRUITING_TO = "recruiting@northstarenergypartners.com";

function isValidEmail(email: string): boolean {
  if (!email || !email.includes("@")) return false;
  const afterAt = email.split("@")[1];
  return Boolean(afterAt?.includes("."));
}

function confirmationHtml(): string {
  return `
    <p>Thank you for your interest in joining Northstar Energy Partners.</p>
    <p>We received your application and will review it shortly. We'll be in touch if there's a fit.</p>
    <p>Questions? Email us at <a href="mailto:recruiting@northstarenergypartners.com">recruiting@northstarenergypartners.com</a>.</p>
  `.trim();
}

const ROLE_OPTIONS: Record<string, string> = {
  canvassing: "Canvassing",
  sales: "Sales",
  operations: "Operations",
  other: "Other",
};

const FRIENDLY_ERROR = "Something went wrong. Please try again, or email support@northstarenergypartners.com.";
const SEND_ERROR = "We couldn't send your request right now. Please email recruiting@northstarenergypartners.com.";

export async function submitCareersApplication(
  _prev: unknown,
  formData: FormData
): Promise<{ ok: true; fallback?: string } | { ok: false; error: string }> {
  try {
    const honeypot = s(formData.get("company"));
    if (honeypot) return { ok: true };

    let rate: { allowed: true } | { allowed: false; error: string };
    try {
      rate = await checkRateLimitKv(getClientIp(), "careers");
    } catch {
      rate = { allowed: true };
    }
    if (!rate.allowed) return { ok: false, error: rate.error };

    const fullName = s(formData.get("fullName"));
    const email = s(formData.get("email"));
    const phone = s(formData.get("phone"));
    const cityState = s(formData.get("cityState"));
    const roleKey = s(formData.get("roleInterest"));
    const experience = s(formData.get("experience"));

    if (!fullName || !email || !phone || !roleKey) {
      return { ok: false, error: "Please fill out required fields." };
    }
    if (!email.includes("@")) return { ok: false, error: "Please enter a valid email address." };

    const roleLabel = ROLE_OPTIONS[roleKey] ?? roleKey;
    const body = [
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `City/State: ${cityState || "(not provided)"}`,
      `Role Interest: ${roleLabel}`,
      "",
      "Experience:",
      experience || "(not provided)",
    ].join("\n");

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return { ok: true, fallback: "Please email recruiting@northstarenergypartners.com to apply." };
    }

    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: RECRUITING_TO,
        replyTo: email,
        subject: INTERNAL_SUBJECT,
        text: body,
      });
      if (error) {
        return { ok: false, error: error.message ?? FRIENDLY_ERROR };
      }
      if (isValidEmail(email)) {
        try {
          await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            replyTo: RECRUITING_TO,
            subject: CONFIRM_SUBJECT,
            html: confirmationHtml(),
          });
        } catch {
          // best-effort
        }
      }
    } catch (e) {
      console.error("Resend send failed (careers)", e);
      return { ok: false, error: SEND_ERROR };
    }

    return { ok: true };
  } catch (err) {
    console.error("submitCareersApplication failed", err);
    return { ok: false, error: FRIENDLY_ERROR };
  }
}
