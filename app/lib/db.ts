/**
 * Vercel Postgres lead storage. Fail-open: never throw; log and return on missing DB or insert errors.
 * Requires Vercel Postgres (create in Vercel project → Storage → Postgres); env vars are added automatically.
 */

import { sql } from "@vercel/postgres";

async function ensureSchema(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS eligibility_leads (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      zip_code TEXT NOT NULL,
      utility TEXT,
      account_type TEXT NOT NULL,
      message TEXT
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS support_requests (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS careers_applications (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      city_state TEXT,
      role_interest TEXT NOT NULL,
      experience TEXT
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS partner_inquiries (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      full_name TEXT NOT NULL,
      organization TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      market_states TEXT,
      message TEXT
    )
  `;
}

/** Insert eligibility lead. Does not throw; logs and returns on failure. */
export async function insertEligibilityLead(row: {
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  utility: string;
  accountType: string;
  message: string;
}): Promise<void> {
  try {
    await ensureSchema();
    await sql`
      INSERT INTO eligibility_leads (full_name, email, phone, zip_code, utility, account_type, message)
      VALUES (${row.fullName}, ${row.email}, ${row.phone || null}, ${row.zipCode}, ${row.utility || null}, ${row.accountType}, ${row.message || null})
    `;
  } catch (err) {
    console.error("[db] insertEligibilityLead failed", err);
  }
}

/** Insert support request. Does not throw; logs and returns on failure. */
export async function insertSupportRequest(row: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<void> {
  try {
    await ensureSchema();
    await sql`
      INSERT INTO support_requests (full_name, email, phone, subject, message)
      VALUES (${row.fullName}, ${row.email}, ${row.phone || null}, ${row.subject}, ${row.message})
    `;
  } catch (err) {
    console.error("[db] insertSupportRequest failed", err);
  }
}

/** Insert careers application. Does not throw; logs and returns on failure. */
export async function insertCareersApplication(row: {
  fullName: string;
  email: string;
  phone: string;
  cityState: string;
  roleInterest: string;
  experience: string;
}): Promise<void> {
  try {
    await ensureSchema();
    await sql`
      INSERT INTO careers_applications (full_name, email, phone, city_state, role_interest, experience)
      VALUES (${row.fullName}, ${row.email}, ${row.phone}, ${row.cityState || null}, ${row.roleInterest}, ${row.experience || null})
    `;
  } catch (err) {
    console.error("[db] insertCareersApplication failed", err);
  }
}

/** Insert partner inquiry. Does not throw; logs and returns on failure. */
export async function insertPartnerInquiry(row: {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  marketStates: string;
  message: string;
}): Promise<void> {
  try {
    await ensureSchema();
    await sql`
      INSERT INTO partner_inquiries (full_name, organization, email, phone, market_states, message)
      VALUES (${row.fullName}, ${row.organization}, ${row.email}, ${row.phone || null}, ${row.marketStates || null}, ${row.message || null})
    `;
  } catch (err) {
    console.error("[db] insertPartnerInquiry failed", err);
  }
}
