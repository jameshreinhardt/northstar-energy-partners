"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Is this a contract?",
    a: "You can typically cancel with notice (terms vary by program). Many programs have no long-term lock-in—you keep the flexibility to leave if you move or your situation changes.",
  },
  {
    q: "Will my utility provider change?",
    a: "No. You stay with your current utility. Community solar credits are applied to the same bill you already receive; nothing about your provider or account number changes.",
  },
  {
    q: "What's the catch?",
    a: "There isn't one. Programs are designed so you save on your bill. We help you check eligibility and enroll at no upfront cost. Savings come from credits on your existing utility bill.",
  },
  {
    q: "Can renters enroll?",
    a: "Yes. If you pay the electric bill, you can often enroll—you don't need to own your home. Landlord permission may be required in some cases; we can help clarify for your situation.",
  },
  {
    q: "When do credits start?",
    a: "After you're enrolled and the project is delivering energy, credits usually appear on your next utility bill or the one after. Timing depends on your utility's billing cycle.",
  },
  {
    q: "Does this affect my roof or require a site visit?",
    a: "No. Community solar is off-site—no panels on your property and no home visit. We only need your ZIP and utility to check eligibility.",
  },
] as const;

export function HomeFAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-slate-200 bg-white px-6 py-14 lg:px-8 lg:py-20" id="home-faq">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
          Common questions
        </h2>
        <div className="mt-2 h-1 w-12 bg-gold rounded-full" />
        <ul className="mt-8 divide-y divide-slate-200">
          {ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium text-navy transition hover:text-gold focus:outline-none focus:ring-0"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span
                    className={`shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden text-slate-600 transition-all duration-200 ${
                    isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="pb-4 text-sm leading-relaxed">{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
