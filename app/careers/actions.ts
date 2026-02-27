"use server";

import { Resend } from "resend";
import { getClientIp } from "../lib/getClientIp";
import { checkRateLimit } from "../lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);
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

export async function submitCareersApplication(
  _prev: unknown,
  formData: FormData
): Promise<{ ok: true; fallback?: string } | { ok: false; error: string }> {
  const honeypot = (formData.get("company") as string)?.trim() ?? "";
  if (honeypot) return { ok: true };

  const rate = checkRateLimit(getClientIp(), "careers");
  if (!rate.allowed) return { ok: false, error: rate.error };

  const fullName = (formData.get("fullName") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const cityState = (formData.get("cityState") as string)?.trim() ?? "";
  const roleKey = (formData.get("roleInterest") as string)?.trim() ?? "";
  const experience = (formData.get("experience") as string)?.trim() ?? "";

  if (!fullName) return { ok: false, error: "Full name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  if (!email.includes("@")) return { ok: false, error: "Please enter a valid email address." };
  if (!phone) return { ok: false, error: "Phone is required." };
  if (!roleKey) return { ok: false, error: "Please select a role interest." };

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

  if (!process.env.RESEND_API_KEY) {
    return { ok: true, fallback: "Please email recruiting@northstarenergypartners.com to apply." };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: RECRUITING_TO,
      replyTo: email,
      subject: INTERNAL_SUBJECT,
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
          replyTo: RECRUITING_TO,
          subject: CONFIRM_SUBJECT,
          html: confirmationHtml(),
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
