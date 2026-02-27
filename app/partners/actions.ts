"use server";

import { Resend } from "resend";
import { getClientIp } from "../lib/getClientIp";
import { checkRateLimitKv } from "../lib/rateLimitKv";

const resend = new Resend(process.env.RESEND_API_KEY);
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

export async function submitPartnerInquiry(
  _prev: unknown,
  formData: FormData
): Promise<{ ok: true; fallback?: string } | { ok: false; error: string }> {
  const honeypot = (formData.get("company") as string)?.trim() ?? "";
  if (honeypot) return { ok: true };

  const rate = await checkRateLimitKv(getClientIp(), "partners");
  if (!rate.allowed) return { ok: false, error: rate.error };

  const fullName = (formData.get("fullName") as string)?.trim() ?? "";
  const organization = (formData.get("organization") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const marketStates = (formData.get("marketStates") as string)?.trim() ?? "";
  const message = (formData.get("message") as string)?.trim() ?? "";

  if (!fullName) return { ok: false, error: "Full name is required." };
  if (!organization) return { ok: false, error: "Company name is required." };
  if (!email) return { ok: false, error: "Email is required." };
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

  if (!process.env.RESEND_API_KEY) {
    return {
      ok: true,
      fallback: "If you don't hear back, email partners@northstarenergypartners.com",
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: PARTNERS_TO,
      cc: [CC_EMAIL],
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
          replyTo: PARTNERS_TO,
          subject: CONFIRM_SUBJECT,
          html: confirmationHtml(message),
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
