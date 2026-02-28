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

/** Insert eligibility lead. Does not throw; logs and returns false on failure. */
export async function insertEligibilityLead(row: {
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  utility: string;
  accountType: string;
  message: string;
}): Promise<boolean> {
  try {
    await ensureSchema();
    await sql`
      INSERT INTO eligibility_leads (full_name, email, phone, zip_code, utility, account_type, message)
      VALUES (${row.fullName}, ${row.email}, ${row.phone || null}, ${row.zipCode}, ${row.utility || null}, ${row.accountType}, ${row.message || null})
    `;
    return true;
  } catch (err) {
    console.error("[db] insertEligibilityLead failed", err);
    return false;
  }
}

/** Insert support request. Does not throw; logs and returns false on failure. */
export async function insertSupportRequest(row: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  try {
    await ensureSchema();
    await sql`
      INSERT INTO support_requests (full_name, email, phone, subject, message)
      VALUES (${row.fullName}, ${row.email}, ${row.phone || null}, ${row.subject}, ${row.message})
    `;
    return true;
  } catch (err) {
    console.error("[db] insertSupportRequest failed", err);
    return false;
  }
}

/** Insert careers application. Does not throw; logs and returns false on failure. */
export async function insertCareersApplication(row: {
  fullName: string;
  email: string;
  phone: string;
  cityState: string;
  roleInterest: string;
  experience: string;
}): Promise<boolean> {
  try {
    await ensureSchema();
    await sql`
      INSERT INTO careers_applications (full_name, email, phone, city_state, role_interest, experience)
      VALUES (${row.fullName}, ${row.email}, ${row.phone}, ${row.cityState || null}, ${row.roleInterest}, ${row.experience || null})
    `;
    return true;
  } catch (err) {
    console.error("[db] insertCareersApplication failed", err);
    return false;
  }
}

/** Insert partner inquiry. Does not throw; logs and returns false on failure. */
export async function insertPartnerInquiry(row: {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  marketStates: string;
  message: string;
}): Promise<boolean> {
  try {
    await ensureSchema();
    await sql`
      INSERT INTO partner_inquiries (full_name, organization, email, phone, market_states, message)
      VALUES (${row.fullName}, ${row.organization}, ${row.email}, ${row.phone || null}, ${row.marketStates || null}, ${row.message || null})
    `;
    return true;
  } catch (err) {
    console.error("[db] insertPartnerInquiry failed", err);
    return false;
  }
}

export type AdminLeadRow = { name: string; email: string; phone: string; date: string };

/** Admin read: eligibility leads. Returns [] on error. */
export async function getEligibilityLeads(): Promise<AdminLeadRow[]> {
  try {
    const { rows } = await sql`
      SELECT full_name AS name, email, phone, created_at
      FROM eligibility_leads
      ORDER BY created_at DESC
    `;
    return (rows as { name: string; email: string; phone: string | null; created_at: string }[]).map((r) => ({
      name: r.name,
      email: r.email,
      phone: r.phone ?? "",
      date: formatAdminDate(r.created_at),
    }));
  } catch (err) {
    console.error("[db] getEligibilityLeads failed", err);
    return [];
  }
}

/** Admin read: support requests. Returns [] on error. */
export async function getSupportRequests(): Promise<AdminLeadRow[]> {
  try {
    const { rows } = await sql`
      SELECT full_name AS name, email, phone, created_at
      FROM support_requests
      ORDER BY created_at DESC
    `;
    return (rows as { name: string; email: string; phone: string | null; created_at: string }[]).map((r) => ({
      name: r.name,
      email: r.email,
      phone: r.phone ?? "",
      date: formatAdminDate(r.created_at),
    }));
  } catch (err) {
    console.error("[db] getSupportRequests failed", err);
    return [];
  }
}

/** Admin read: careers applications. Returns [] on error. */
export async function getCareersApplications(): Promise<AdminLeadRow[]> {
  try {
    const { rows } = await sql`
      SELECT full_name AS name, email, phone, created_at
      FROM careers_applications
      ORDER BY created_at DESC
    `;
    return (rows as { name: string; email: string; phone: string; created_at: string }[]).map((r) => ({
      name: r.name,
      email: r.email,
      phone: r.phone ?? "",
      date: formatAdminDate(r.created_at),
    }));
  } catch (err) {
    console.error("[db] getCareersApplications failed", err);
    return [];
  }
}

/** Admin read: partner inquiries. Returns [] on error. */
export async function getPartnerInquiries(): Promise<AdminLeadRow[]> {
  try {
    const { rows } = await sql`
      SELECT full_name AS name, email, phone, created_at
      FROM partner_inquiries
      ORDER BY created_at DESC
    `;
    return (rows as { name: string; email: string; phone: string | null; created_at: string }[]).map((r) => ({
      name: r.name,
      email: r.email,
      phone: r.phone ?? "",
      date: formatAdminDate(r.created_at),
    }));
  } catch (err) {
    console.error("[db] getPartnerInquiries failed", err);
    return [];
  }
}

function formatAdminDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}
