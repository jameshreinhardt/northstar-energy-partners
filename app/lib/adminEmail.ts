/**
 * Admin notification via Gmail SMTP. Fail-open: never throw; log only on failure.
 * Env: ADMIN_EMAIL, GMAIL_USER, GMAIL_APP_PASSWORD
 */

import nodemailer from "nodemailer";

export async function sendAdminNotification(subject: string, text: string): Promise<void> {
  try {
    const to = process.env.ADMIN_EMAIL;
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!to || !user || !pass) {
      console.error("[adminEmail] Missing ADMIN_EMAIL, GMAIL_USER, or GMAIL_APP_PASSWORD");
      return;
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: user,
      to,
      subject,
      text,
    });
  } catch (err) {
    console.error("[adminEmail] sendAdminNotification failed", err);
  }
}
