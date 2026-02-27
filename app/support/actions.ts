"use server";

import { Resend } from "resend";
import { getClientIp } from "../lib/getClientIp";
import { checkRateLimit } from "../lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);
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

export async function submitSupportRequest(
  _prev: unknown,
  formData: FormData
): Promise<{ ok: true; fallback?: string } | { ok: false; error: string }> {
  const honeypot = (formData.get("company") as string)?.trim() ?? "";
  if (honeypot) return { ok: true };

  const rate = checkRateLimit(getClientIp(), "support");
  if (!rate.allowed) return { ok: false, error: rate.error };

  const fullName = (formData.get("fullName") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const subjectKey = (formData.get("subject") as string)?.trim() ?? "";
  const message = (formData.get("message") as string)?.trim() ?? "";

  if (!fullName) return { ok: false, error: "Full name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  if (!email.includes("@")) return { ok: false, error: "Please enter a valid email address." };
  if (!subjectKey) return { ok: false, error: "Please select a subject." };
  if (!message) return { ok: false, error: "Message is required." };

  const subjectLabel = SUBJECT_OPTIONS[subjectKey] ?? subjectKey;
  const body = [
    `Full Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone || "(not provided)"}`,
    `Subject: ${subjectLabel}`,
    "",
    "Message:",
    message,
  ].join("\n");

  if (!process.env.RESEND_API_KEY) {
    return { ok: true, fallback: "Please email support@northstarenergypartners.com to reach support." };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: SUPPORT_TO,
      replyTo: email,
      subject: `${INTERNAL_SUBJECT} — ${subjectLabel}`,
      text: body,
    });
    if (error) {
      return { ok: false, error: error.message ?? "Something went wrong. Please try again." };
    }
    if (isValidEmail(email)) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          replyTo: SUPPORT_TO,
          subject: CONFIRM_SUBJECT,
          html: confirmationHtml(subjectLabel),
        });
      } catch {
        // best-effort
      }
    }
  } catch (err) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
