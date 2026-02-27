"use client";

import { useFormState } from "react-dom";
import { submitSupportRequest } from "../support/actions";

const SUBJECTS = [
  { value: "billing", label: "Billing" },
  { value: "enrollment", label: "Enrollment Status" },
  { value: "cancel", label: "Cancel" },
  { value: "general", label: "General Question" },
  { value: "other", label: "Other" },
] as const;

const inputClass =
  "mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";
const labelClass = "block text-base font-semibold text-navy";

export function SupportForm() {
  const [state, formAction] = useFormState(submitSupportRequest, null);
  const success = state?.ok === true;
  const formKey = success ? "submitted" : "form";

  return (
    <>
      {success && (
        <p className="mb-6 text-lg font-medium text-navy">
          {state.fallback
            ? `Support request received. ${state.fallback}`
            : "Support request received. Check your email for confirmation."}
        </p>
      )}
      <form key={formKey} action={formAction} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="support-fullName" className={labelClass}>
              Full name *
            </label>
            <input
              id="support-fullName"
              name="fullName"
              type="text"
              required
              className={inputClass}
              placeholder="Full name"
            />
          </div>
          <div>
            <label htmlFor="support-email" className={labelClass}>
              Email *
            </label>
            <input
              id="support-email"
              name="email"
              type="email"
              required
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="support-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="support-phone"
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="(555) 000-0000"
          />
        </div>
        <div>
          <label htmlFor="support-subject" className={labelClass}>
            Subject *
          </label>
          <select id="support-subject" name="subject" required className={inputClass}>
            <option value="">Select subject</option>
            {SUBJECTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="support-message" className={labelClass}>
            Message *
          </label>
          <textarea
            id="support-message"
            name="message"
            required
            rows={4}
            className={inputClass}
            placeholder="How can we help?"
          />
        </div>
        {state && !state.ok && (
          <p className="text-base text-red-600">Something went wrong. Please try again.</p>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-navy px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-navy-light disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
        >
          Send to Support
        </button>
      </form>
    </>
  );
}
