"use client";

import { useFormState } from "react-dom";
import { submitPartnerInquiry } from "../partners/actions";

const inputClass =
  "mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";
const labelClass = "block text-base font-semibold text-navy";

export function PartnerForm() {
  const [state, formAction] = useFormState(submitPartnerInquiry, null);
  const success = state?.ok === true;
  const formKey = success ? "submitted" : "form";

  return (
    <>
      {success && (
        <div className="mb-6 rounded-lg border border-sky-200 bg-sky-50 p-4" role="status">
          <p className="text-lg font-medium text-navy">
            {state.confirmationSent === true
              ? "Partnership request received. Check your email for confirmation."
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
          <label htmlFor="partner-honeypot">Leave this blank</label>
          <input id="partner-honeypot" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="partner-fullName" className={labelClass}>
              Name *
            </label>
            <input
              id="partner-fullName"
              name="fullName"
              type="text"
              required
              className={inputClass}
              placeholder="Full name"
            />
          </div>
          <div>
            <label htmlFor="partner-organization" className={labelClass}>
              Company / Organization *
            </label>
            <input
              id="partner-organization"
              name="organization"
              type="text"
              required
              className={inputClass}
              placeholder="Company name"
            />
          </div>
        </div>
        <div>
          <label htmlFor="partner-email" className={labelClass}>
            Email *
          </label>
          <input
            id="partner-email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="partner-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="partner-phone"
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="(555) 000-0000"
          />
        </div>
        <div>
          <label htmlFor="partner-marketStates" className={labelClass}>
            Market(s) / State(s)
          </label>
          <input
            id="partner-marketStates"
            name="marketStates"
            type="text"
            className={inputClass}
            placeholder="e.g. Maryland, DC, Virginia"
          />
        </div>
        <div>
          <label htmlFor="partner-message" className={labelClass}>
            How can we help?
          </label>
          <textarea
            id="partner-message"
            name="message"
            rows={4}
            className={inputClass}
            placeholder="Tell us about your community solar program or partnership interest."
          />
        </div>
        {state && !state.ok && (
          <p className="text-base text-red-600">{state.error ?? "Something went wrong. Please try again."}</p>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-navy px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-navy-light disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
        >
          Request Partnership
        </button>
      </form>
    </>
  );
}
