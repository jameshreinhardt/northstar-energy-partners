"use client";

import { useState } from "react";
import { adminLogin } from "./actions";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      const result = await adminLogin(password);
      if (result.ok) {
        window.location.reload();
      } else {
        setError(result.error ?? "Invalid password.");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-xl font-semibold text-navy">Admin</h1>
        <p className="mt-1 text-sm text-slate-600">Sign in to view the dashboard.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy/90 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 disabled:opacity-70"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
