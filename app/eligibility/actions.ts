"use server";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { Resend } from "resend";
import { getClientIp } from "../lib/getClientIp";
import { checkRateLimit } from "../lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);
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

export async function submitEligibilityLead(
  _prev: unknown,
  formData: FormData
): Promise<{ ok: true } | { ok: false; error: string }> {
  const honeypot = (formData.get("company") as string)?.trim() ?? "";
  if (honeypot) return { ok: true };

  const rate = checkRateLimit(getClientIp(), "eligibility");
  if (!rate.allowed) return { ok: false, error: rate.error };

  const fullName = (formData.get("fullName") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const zipCode = (formData.get("zipCode") as string)?.trim() ?? "";
  const utility = (formData.get("utility") as string)?.trim() ?? "";
  const accountType = (formData.get("accountType") as string)?.trim() ?? "";
  const message = (formData.get("message") as string)?.trim() ?? "";

  if (!fullName) return { ok: false, error: "Full name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  if (!email.includes("@")) return { ok: false, error: "Please enter a valid email address." };
  if (!zipCode) return { ok: false, error: "ZIP code is required." };
  if (!accountType) return { ok: false, error: "Please select an account type." };

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

  if (process.env.RESEND_API_KEY) {
    try {
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAILS,
        replyTo: email,
        subject: SUBJECT,
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
            replyTo: "support@northstarenergypartners.com",
            subject: CONFIRM_SUBJECT,
            html: confirmationEmailHtml(),
          });
        } catch {
          // best-effort: don't fail the form if confirmation email fails
        }
      }
    } catch (err) {
      return { ok: false, error: "Something went wrong. Please try again." };
    }
  }

  try {
    await saveLead(lead);
  } catch {
    // lead still sent by email; don't fail the form
  }

  return { ok: true };
}
