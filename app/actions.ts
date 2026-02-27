"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Northstar Energy Partners <noreply@northstarenergypartners.com>";

export async function submitEligibilityCheck(
  _prev: unknown,
  formData: FormData
): Promise<
  | { ok: true }
  | { ok: false; error: string }
> {
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

  if (!process.env.RESEND_API_KEY) {
    return {
      ok: false,
      error: "Email service is not configured yet. Please email support@northstarenergypartners.com",
    };
  }

  const subject = `Eligibility request — ${zipCode} — ${fullName}`;
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

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: "support@northstarenergypartners.com",
      replyTo: email,
      subject,
      text: body,
    });

    if (error) {
      return { ok: false, error: error.message ?? "Failed to send. Please try again." };
    }
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send. Please try again.";
    return { ok: false, error: msg };
  }
}
