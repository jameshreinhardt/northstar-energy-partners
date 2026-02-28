"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Do I need solar panels or any equipment?",
    a: "No. Community solar uses large off-site solar farms. Nothing is installed on your home or property.",
  },
  {
    q: "Do I have to switch utilities?",
    a: "No. You stay with your current utility and continue receiving the same electric bill. Solar credits are simply applied to that bill.",
  },
  {
    q: "How do I see savings?",
    a: "Solar credits appear directly on your existing electric bill, reducing the amount you pay to your utility.",
  },
  {
    q: "Are there contracts or long-term commitments?",
    a: "No long-term commitment is required. You can cancel anytime.",
  },
  {
    q: "What actually changes for me?",
    a: "Nothing about your service changes. You keep the same utility, the same account, and the same bill. The only difference is that solar credits are added.",
  },
  {
    q: "Who is eligible?",
    a: "Most customers with an active electric bill can qualify, including renters, homeowners, condos, apartments, and small businesses. Availability depends on your utility and project capacity.",
  },
  {
    q: "How is my information used?",
    a: "Your information is used only to check eligibility and support enrollment. It is never sold for marketing.",
  },
  {
    q: "What happens after I check eligibility?",
    a: "If you're eligible, you'll receive the project details and enrollment information. You'll always be able to review the terms before deciding to proceed.",
  },
] as const;

export function HomeFAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-slate-200 bg-white px-6 py-14 lg:px-8 lg:py-20" id="home-faq">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
          What Most People Ask Before Enrolling
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
