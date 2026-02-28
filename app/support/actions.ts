"use server";

import { Resend } from "resend";
import { safeFormString as s } from "../lib/formData";
import { maskFromEmail } from "../lib/emailLog";
import { insertSupportRequest } from "../lib/db";
import { getClientIp } from "../lib/getClientIp";
import { checkRateLimitKv } from "../lib/rateLimitKv";

const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Northstar Energy Partners <support@northstarenergypartners.com>";
const INTERNAL_SUBJECT = "Support request — Northstar Energy Partners";
const CONFIRM_SUBJECT = "We received your support request — Northstar Energy Partners";
const SUPPORT_TO = "support@northstarenergypartners.com";

function isValidEmail(email: string): boolean {
  if (!email || !email.includes("@")) return false;
  const afterAt = email.split("@")[1];
  return Boolean(afterAt?.includes("."));
}

function confirmationHtml(subject: string): string {
  return `
    <p>Thank you for reaching out. We received your support request.</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p>We aim to respond within one business day. If you have additional questions, reply to this email or contact us at <a href="mailto:support@northstarenergypartners.com">support@northstarenergypartners.com</a>.</p>
  `.trim();
}

const SUBJECT_OPTIONS: Record<string, string> = {
  billing: "Billing",
  enrollment: "Enrollment Status",
  cancel: "Cancel",
  general: "General Question",
  other: "Other",
};

const FRIENDLY_ERROR = "Something went wrong. Please try again, or email support@northstarenergypartners.com.";
/** Shown when submission succeeds but email/confirmation could not be sent. Never show Resend error to user. */
const FALLBACK_EMAIL_UNAVAILABLE = "Request received. We'll follow up by email within one business day. Email confirmation is not available yet.";

export async function submitSupportRequest(
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
      rate = await checkRateLimitKv(getClientIp(), "support");
    } catch {
      rate = { allowed: true };
    }
    if (!rate.allowed) return { ok: false, error: rate.error };

    const fullName = s(formData.get("fullName"));
    const email = s(formData.get("email"));
    const phone = s(formData.get("phone"));
    const subjectKey = s(formData.get("subject"));
    const message = s(formData.get("message"));

    if (!fullName || !email || !subjectKey || !message) {
      return { ok: false, error: "Please fill out required fields." };
    }
    if (!email.includes("@")) return { ok: false, error: "Please enter a valid email address." };

    const subjectLabel = SUBJECT_OPTIONS[subjectKey] ?? subjectKey;

    try {
      await insertSupportRequest({
        fullName,
        email,
        phone,
        subject: subjectKey,
        message,
      });
    } catch (dbErr) {
      console.error("[support] insertSupportRequest failed", dbErr);
    }

    const body = [
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone || "(not provided)"}`,
      `Subject: ${subjectLabel}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const resendKey = process.env.RESEND_API_KEY;
    console.log("[support] RESEND_API_KEY present:", !!resendKey);
    console.log("[support] CONTACT_FROM_EMAIL:", maskFromEmail(FROM_EMAIL));

    let confirmationSent = false;
    try {
      if (!resendKey) {
        console.log("[support] Confirmation email disabled (no API key)");
        return { ok: true, confirmationSent: false, fallback: FALLBACK_EMAIL_UNAVAILABLE };
      }

      const resend = new Resend(resendKey);
      const { error: internalError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: SUPPORT_TO,
        replyTo: email,
        subject: `${INTERNAL_SUBJECT} — ${subjectLabel}`,
        text: body,
      });
      if (internalError) {
        console.error("[support] Resend internal email failed", internalError);
        return { ok: true, confirmationSent: false, fallback: FALLBACK_EMAIL_UNAVAILABLE };
      }

      if (isValidEmail(email)) {
        try {
          const { error: confirmError } = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            replyTo: SUPPORT_TO,
            subject: CONFIRM_SUBJECT,
            html: confirmationHtml(subjectLabel),
          });
          if (confirmError) {
            console.error("[support] Resend confirmation failed", confirmError);
            return { ok: true, confirmationSent: false, fallback: FALLBACK_EMAIL_UNAVAILABLE };
          }
          console.log("[support] Confirmation email send succeeded");
          confirmationSent = true;
        } catch (confirmErr) {
          console.error("[support] Confirmation email send failed", confirmErr);
          return { ok: true, confirmationSent: false, fallback: FALLBACK_EMAIL_UNAVAILABLE };
        }
      }

      return { ok: true, confirmationSent };
    } catch (e) {
      console.error("[support] Resend send failed", e);
      return { ok: true, confirmationSent: false, fallback: FALLBACK_EMAIL_UNAVAILABLE };
    }
  } catch (err) {
    console.error("submitSupportRequest failed", err);
    return { ok: false, error: FRIENDLY_ERROR };
  }
}
