"use client";

import { useEffect, useState } from "react";

const ELIGIBILITY_SECTION_ID = "check-eligibility";

export function StickyEligibilityBar() {
  const [visible, setVisible] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const el = document.getElementById(ELIGIBILITY_SECTION_ID);
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    document.getElementById(ELIGIBILITY_SECTION_ID)?.scrollIntoView({ behavior: "smooth" });
  };

  if (sectionInView) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white shadow-lg transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="text-center lg:text-left">
          <p className="font-semibold text-navy">
            Check your eligibility for community solar
          </p>
          <p className="mt-0.5 text-sm text-slate-500">
            Free. No obligation. Takes less than 30 seconds.
          </p>
        </div>
        <div className="shrink-0 lg:w-auto">
          <button
            type="button"
            onClick={handleClick}
            className="w-full rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-navy shadow-lg transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-white lg:w-auto"
          >
            Check My Eligibility
          </button>
        </div>
      </div>
    </div>
  );
}
