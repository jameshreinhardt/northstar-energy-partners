"use client";

import { useFormState } from "react-dom";
import { submitEligibilityLead } from "../eligibility/actions";

const UTILITIES = ["BGE", "Pepco", "Delmarva", "Potomac Edison", "SMECO", "Other"] as const;
const ACCOUNT_TYPES = ["Residential", "Business"] as const;

export function EligibilityForm() {
  const [state, formAction] = useFormState(submitEligibilityLead, null);
  const success = state?.ok === true;
  const formKey = success ? "submitted" : "form";

  return (
    <>
      {success && (
        <div className="mb-6 rounded-lg border border-sky-200 bg-sky-50 p-4" role="status">
          <p className="text-lg font-medium text-navy">
            {state.confirmationSent === true
              ? "You're on the list. Check your email for confirmation."
              : "Request received. We'll follow up by email within one business day."}
          </p>
          {state.confirmationSent === false && state.fallback && (
            <p className="mt-2 text-base text-navy">
              {state.fallback}
            </p>
          )}
        </div>
      )}
      <form key={formKey} action={formAction} className="space-y-6">
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
          <label htmlFor="eligibility-company">Leave this blank</label>
          <input id="eligibility-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="block text-base font-semibold text-navy">
              Full Name *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              placeholder="Full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-base font-semibold text-navy">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block text-base font-semibold text-navy">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              placeholder="(555) 000-0000"
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-base font-semibold text-navy">
              ZIP Code *
            </label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              required
              inputMode="numeric"
              autoComplete="postal-code"
              className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              placeholder="ZIP code"
            />
          </div>
        </div>
        <div>
          <label htmlFor="utility" className="block text-base font-semibold text-navy">
            Utility / Provider
          </label>
          <select
            id="utility"
            name="utility"
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          >
            <option value="">Select utility</option>
            {UTILITIES.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className="block text-base font-semibold text-navy">Account type *</span>
          <div className="mt-2 flex flex-wrap gap-4">
            {ACCOUNT_TYPES.map((value) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accountType"
                  value={value}
                  required
                  className="h-4 w-4 border-slate-300 text-gold focus:ring-gold"
                />
                <span className="text-base text-slate-800">{value}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-base font-semibold text-navy">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            placeholder="Any questions or details you’d like to share."
          />
        </div>
        {state && !state.ok && (
          <p className="text-base text-red-600">{state.error ?? "Something went wrong. Please try again."}</p>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-navy px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-navy-light disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
        >
          Check My Eligibility
        </button>
      </form>
    </>
  );
}
