"use server";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { Resend } from "resend";
import { safeFormString as s } from "../lib/formData";
import { maskFromEmail } from "../lib/emailLog";
import { getClientIp } from "../lib/getClientIp";
import { checkRateLimitKv } from "../lib/rateLimitKv";

const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Northstar Energy Partners <support@northstarenergypartners.com>";
const SUBJECT = "New Eligibility Lead — Northstar Energy Partners";
const CONFIRM_SUBJECT = "We received your eligibility request — Northstar Energy Partners";
const TO_EMAILS = [
  "support@northstarenergypartners.com",
  "jreinhardt@northstarenergypartners.com",
];

function isValidEmail(email: string): boolean {
  if (!email || !email.includes("@")) return false;
  const afterAt = email.split("@")[1];
  return Boolean(afterAt?.includes("."));
}

function confirmationEmailHtml(): string {
  return `
    <p>Thank you for checking your eligibility with Northstar Energy Partners.</p>
    <p><strong>What happens next:</strong></p>
    <ol>
      <li><strong>We confirm availability</strong> — We check your ZIP and utility against available community solar projects.</li>
      <li><strong>We follow up</strong> — A team member will email you (and may text or call if you provided a phone number) to confirm details.</li>
      <li><strong>You decide</strong> — If there's a fit, we'll share the next steps. No obligation.</li>
    </ol>
    <p>Questions? Reach us at <a href="mailto:support@northstarenergypartners.com">support@northstarenergypartners.com</a>.</p>
    <p style="color:#64748b;font-size:14px;">We don't sell your information.</p>
  `.trim();
}

type Lead = {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  utility: string;
  accountType: string;
  message: string;
};

async function saveLead(lead: Lead): Promise<void> {
  const dir = path.join(process.cwd(), "data");
  const filePath = path.join(dir, "leads.json");
  await mkdir(dir, { recursive: true });
  let leads: Lead[] = [];
  try {
    const raw = await readFile(filePath, "utf-8");
    leads = JSON.parse(raw);
  } catch {
    // file missing or invalid
  }
  if (!Array.isArray(leads)) leads = [];
  leads.push(lead);
  await writeFile(filePath, JSON.stringify(leads, null, 2), "utf-8");
}

const FRIENDLY_ERROR = "Something went wrong. Please try again, or email support@northstarenergypartners.com.";
const SEND_ERROR = "We couldn't send your request right now. Please email support@northstarenergypartners.com.";
const FALLBACK_NO_KEY = "Request received. Email confirmation is currently disabled—please email support@northstarenergypartners.com if needed.";
const FALLBACK_CONFIRM_FAILED = "Request received, but we could not send a confirmation email. If you don't hear back, email support@northstarenergypartners.com.";

export async function submitEligibilityLead(
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
      rate = await checkRateLimitKv(getClientIp(), "eligibility");
    } catch {
      rate = { allowed: true };
    }
    if (!rate.allowed) return { ok: false, error: rate.error };

    const fullName = s(formData.get("fullName"));
    const email = s(formData.get("email"));
    const phone = s(formData.get("phone"));
    const zipCode = s(formData.get("zipCode"));
    const utility = s(formData.get("utility"));
    const accountType = s(formData.get("accountType"));
    const message = s(formData.get("message"));

    if (!fullName || !email || !zipCode || !accountType) {
      return { ok: false, error: "Please fill out required fields." };
    }
    if (!email.includes("@")) return { ok: false, error: "Please enter a valid email address." };

    const body = [
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone || "(not provided)"}`,
      `ZIP Code: ${zipCode}`,
      `Utility: ${utility || "(not provided)"}`,
      `Account Type: ${accountType}`,
      "",
      "Message:",
      message || "(not provided)",
    ].join("\n");

    const lead: Lead = {
      timestamp: new Date().toISOString(),
      name: fullName,
      email,
      phone,
      zip: zipCode,
      utility,
      accountType,
      message,
    };

    const resendKey = process.env.RESEND_API_KEY;
    console.log("[eligibility] RESEND_API_KEY present:", !!resendKey);
    console.log("[eligibility] CONTACT_FROM_EMAIL:", maskFromEmail(FROM_EMAIL));

    if (!resendKey) {
      console.log("[eligibility] Confirmation email disabled (no API key)");
      try {
        await saveLead(lead);
      } catch {
        // ignore
      }
      return { ok: true, confirmationSent: false, fallback: FALLBACK_NO_KEY };
    }

    let confirmationSent = false;
    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAILS,
        replyTo: email,
        subject: SUBJECT,
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
            replyTo: "support@northstarenergypartners.com",
            subject: CONFIRM_SUBJECT,
            html: confirmationEmailHtml(),
          });
          console.log("[eligibility] Confirmation email send succeeded");
          confirmationSent = true;
        } catch (confirmErr) {
          console.error("[eligibility] Confirmation email send failed", confirmErr);
          try {
            await saveLead(lead);
          } catch {
            // ignore
          }
          return { ok: true, confirmationSent: false, fallback: FALLBACK_CONFIRM_FAILED };
        }
      }
    } catch (e) {
      console.error("Resend send failed (eligibility)", e);
      return { ok: false, error: SEND_ERROR };
    }

    try {
      await saveLead(lead);
    } catch {
      // lead still sent by email; don't fail the form
    }

    return { ok: true, confirmationSent };
  } catch (err) {
    console.error("submitEligibilityLead failed", err);
    return { ok: false, error: FRIENDLY_ERROR };
  }
}
