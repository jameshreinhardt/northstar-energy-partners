"use server";

import { Resend } from "resend";
import { safeFormString as s } from "../lib/formData";
import { maskFromEmail } from "../lib/emailLog";
import { insertPartnerInquiry } from "../lib/db";
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
/** Shown when submission succeeds but email/confirmation could not be sent. Never show Resend error to user. */
const FALLBACK_EMAIL_UNAVAILABLE = "Request received. We'll follow up by email within one business day. Email confirmation is not available yet.";

export async function submitPartnerInquiry(
  _prev: unknown,
  formData: FormData
): Promise<
  | { ok: true; confirmationSent: true }
  | { ok: true; confirmationSent: false; fallback?: string }
  | { ok: false; error: string }
> {
  try {
    const honeypot = s(formData.get("company"));
    if (honeypot) return { ok: true, confirmationSent: false };

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

    try {
      await insertPartnerInquiry({
        fullName,
        organization,
        email,
        phone,
        marketStates,
        message,
      });
    } catch (dbErr) {
      console.error("[partners] insertPartnerInquiry failed", dbErr);
    }

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

    let confirmationSent = false;
    try {
      if (!resendKey) {
        console.log("[partners] Confirmation email disabled (no API key)");
        return { ok: true, confirmationSent: false, fallback: FALLBACK_EMAIL_UNAVAILABLE };
      }

      const resend = new Resend(resendKey);
      const { error: internalError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: PARTNERS_TO,
        cc: [CC_EMAIL],
        replyTo: email,
        subject: INTERNAL_SUBJECT,
        text: body,
      });
      if (internalError) {
        console.error("[partners] Resend internal email failed", internalError);
        return { ok: true, confirmationSent: false, fallback: FALLBACK_EMAIL_UNAVAILABLE };
      }

      if (isValidEmail(email)) {
        try {
          const { error: confirmError } = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            replyTo: PARTNERS_TO,
            subject: CONFIRM_SUBJECT,
            html: confirmationHtml(message),
          });
          if (confirmError) {
            console.error("[partners] Resend confirmation failed", confirmError);
            return { ok: true, confirmationSent: false, fallback: FALLBACK_EMAIL_UNAVAILABLE };
          }
          console.log("[partners] Confirmation email send succeeded");
          confirmationSent = true;
        } catch (confirmErr) {
          console.error("[partners] Confirmation email send failed", confirmErr);
          return { ok: true, confirmationSent: false, fallback: FALLBACK_EMAIL_UNAVAILABLE };
        }
      }

      return { ok: true, confirmationSent };
    } catch (e) {
      console.error("[partners] Resend send failed", e);
      return { ok: true, confirmationSent: false, fallback: FALLBACK_EMAIL_UNAVAILABLE };
    }
  } catch (err) {
    console.error("submitPartnerInquiry failed", err);
    return { ok: false, error: FRIENDLY_ERROR };
  }
}
