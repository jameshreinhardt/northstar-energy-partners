"use server";

import { Resend } from "resend";
import { safeFormString as s } from "../lib/formData";
import { maskFromEmail } from "../lib/emailLog";
import { getClientIp } from "../lib/getClientIp";
import { checkRateLimitKv } from "../lib/rateLimitKv";

const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Northstar Energy Partners <support@northstarenergypartners.com>";
const INTERNAL_SUBJECT = "Partnership request — Northstar Energy Partners";
const CONFIRM_SUBJECT = "We received your partnership request — Northstar Energy Partners";
const PARTNERS_TO = "partners@northstarenergypartners.com";
const CC_EMAIL = "jreinhardt@northstarenergypartners.com";

function isValidEmail(email: string): boolean {
  if (!email || !email.includes("@")) return false;
  const afterAt = email.split("@")[1];
  return Boolean(afterAt?.includes("."));
}

function confirmationHtml(message: string): string {
  const escaped = message
    ? message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")
    : "(none)";
  return `
    <p>Thank you for your interest in partnering with Northstar Energy Partners.</p>
    <p>We received your request and aim to respond within one business day.</p>
    <p><strong>Your message:</strong></p>
    <p style="white-space:pre-wrap;color:#475569;">${escaped}</p>
    <p>Questions? Reply to this email or contact <a href="mailto:partners@northstarenergypartners.com">partners@northstarenergypartners.com</a>.</p>
  `.trim();
}

const FRIENDLY_ERROR = "Something went wrong. Please try again, or email support@northstarenergypartners.com.";
const SEND_ERROR = "We couldn't send your request right now. Please email partners@northstarenergypartners.com.";
const FALLBACK_NO_KEY = "Request received. Email confirmation is currently disabled—please email support@northstarenergypartners.com if needed.";
const FALLBACK_CONFIRM_FAILED = "Request received, but we could not send a confirmation email. If you don't hear back, email support@northstarenergypartners.com.";

export async function submitPartnerInquiry(
  _prev: unknown,
  formData: FormData
): Promise<{ ok: true; fallback?: string } | { ok: false; error: string }> {
  try {
    const honeypot = s(formData.get("company"));
    if (honeypot) return { ok: true };

    let rate: { allowed: true } | { allowed: false; error: string };
    try {
      rate = await checkRateLimitKv(getClientIp(), "partners");
    } catch {
      rate = { allowed: true };
    }
    if (!rate.allowed) return { ok: false, error: rate.error };

    const fullName = s(formData.get("fullName"));
    const organization = s(formData.get("organization"));
    const email = s(formData.get("email"));
    const phone = s(formData.get("phone"));
    const marketStates = s(formData.get("marketStates"));
    const message = s(formData.get("message"));

    if (!fullName || !organization || !email) {
      return { ok: false, error: "Please fill out required fields." };
    }
    if (!email.includes("@")) return { ok: false, error: "Please enter a valid email address." };

    const body = [
      `Full Name: ${fullName}`,
      `Company: ${organization}`,
      `Email: ${email}`,
      `Phone: ${phone || "(not provided)"}`,
      `Market(s) / State(s): ${marketStates || "(not provided)"}`,
      "",
      "Message:",
      message || "(not provided)",
    ].join("\n");

    const resendKey = process.env.RESEND_API_KEY;
    console.log("[partners] RESEND_API_KEY present:", !!resendKey);
    console.log("[partners] CONTACT_FROM_EMAIL:", maskFromEmail(FROM_EMAIL));

    if (!resendKey) {
      console.log("[partners] Confirmation email disabled (no API key)");
      return { ok: true, fallback: FALLBACK_NO_KEY };
    }

    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: PARTNERS_TO,
        cc: [CC_EMAIL],
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
            replyTo: PARTNERS_TO,
            subject: CONFIRM_SUBJECT,
            html: confirmationHtml(message),
          });
          console.log("[partners] Confirmation email send succeeded");
        } catch (confirmErr) {
          console.error("[partners] Confirmation email send failed", confirmErr);
          return { ok: true, fallback: FALLBACK_CONFIRM_FAILED };
        }
      }
    } catch (e) {
      console.error("Resend send failed (partners)", e);
      return { ok: false, error: SEND_ERROR };
    }

    return { ok: true };
  } catch (err) {
    console.error("submitPartnerInquiry failed", err);
    return { ok: false, error: FRIENDLY_ERROR };
  }
}
