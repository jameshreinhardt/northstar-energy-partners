"use client";

import { useFormState } from "react-dom";
import { submitCareersApplication } from "../careers/actions";

const ROLES = [
  { value: "canvassing", label: "Canvassing" },
  { value: "sales", label: "Sales" },
  { value: "operations", label: "Operations" },
  { value: "other", label: "Other" },
] as const;

const inputClass =
  "mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";
const labelClass = "block text-base font-semibold text-navy";

export function CareersForm() {
  const [state, formAction] = useFormState(submitCareersApplication, null);
  const success = state?.ok === true;
  const formKey = success ? "submitted" : "form";

  return (
    <>
      {success && (
        <p className="mb-6 text-lg font-medium text-navy">
          {state.fallback
            ? state.fallback
            : "Application received. Check your email for confirmation."}
        </p>
      )}
      <form key={formKey} action={formAction} className="space-y-6">
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
          <label htmlFor="careers-company">Leave this blank</label>
          <input id="careers-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="careers-fullName" className={labelClass}>
              Full name *
            </label>
            <input
              id="careers-fullName"
              name="fullName"
              type="text"
              required
              className={inputClass}
              placeholder="Full name"
            />
          </div>
          <div>
            <label htmlFor="careers-email" className={labelClass}>
              Email *
            </label>
            <input
              id="careers-email"
              name="email"
              type="email"
              required
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="careers-phone" className={labelClass}>
            Phone *
          </label>
          <input
            id="careers-phone"
            name="phone"
            type="tel"
            required
            className={inputClass}
            placeholder="(555) 000-0000"
          />
        </div>
        <div>
          <label htmlFor="careers-cityState" className={labelClass}>
            City / State
          </label>
          <input
            id="careers-cityState"
            name="cityState"
            type="text"
            className={inputClass}
            placeholder="City, State"
          />
        </div>
        <div>
          <label htmlFor="careers-roleInterest" className={labelClass}>
            Role interest *
          </label>
          <select id="careers-roleInterest" name="roleInterest" required className={inputClass}>
            <option value="">Select role</option>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="careers-experience" className={labelClass}>
            Experience
          </label>
          <textarea
            id="careers-experience"
            name="experience"
            rows={4}
            className={inputClass}
            placeholder="Tell us about your background (optional)"
          />
        </div>
        {state && !state.ok && (
          <p className="text-base text-red-600">{state.error ?? "Something went wrong. Please try again."}</p>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-navy px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-navy-light disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
        >
          Send Application
        </button>
      </form>
    </>
  );
}
