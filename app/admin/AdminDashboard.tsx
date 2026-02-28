"use client";

import { useState } from "react";
import Link from "next/link";
import { adminLogout } from "./actions";
import type { AdminLeadRow } from "../lib/db";

type TabId = "eligibility" | "support" | "careers" | "partners";

const TABS: { id: TabId; label: string }[] = [
  { id: "eligibility", label: "Eligibility Leads" },
  { id: "support", label: "Support Requests" },
  { id: "careers", label: "Careers Applications" },
  { id: "partners", label: "Partner Inquiries" },
];

type Props = {
  eligibilityLeads: AdminLeadRow[];
  supportRequests: AdminLeadRow[];
  careersApplications: AdminLeadRow[];
  partnerInquiries: AdminLeadRow[];
};

export function AdminDashboard({ eligibilityLeads, supportRequests, careersApplications, partnerInquiries }: Props) {
  const [tab, setTab] = useState<TabId>("eligibility");

  const dataByTab: Record<TabId, AdminLeadRow[]> = {
    eligibility: eligibilityLeads,
    support: supportRequests,
    careers: careersApplications,
    partners: partnerInquiries,
  };

  const rows = dataByTab[tab];

  async function handleLogout() {
    await adminLogout();
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="font-serif text-lg font-semibold text-navy">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-navy">
              Back to site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex gap-1 border-b border-slate-200">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                tab === id
                  ? "border-navy text-navy"
                  : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th className="bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Name
                  </th>
                  <th className="bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Email
                  </th>
                  <th className="bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Phone
                  </th>
                  <th className="bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">
                      No records yet.
                    </td>
                  </tr>
                ) : (
                  rows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900">{row.name}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{row.email}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{row.phone || "—"}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{row.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
