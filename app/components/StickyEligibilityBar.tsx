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
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white shadow-lg transition-opacity duration-300 lg:hidden"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="flex items-center justify-center px-6 py-3">
        <button
          type="button"
          onClick={handleClick}
          className="w-full max-w-sm rounded-lg bg-gold px-6 py-3.5 text-base font-semibold text-navy shadow-lg transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-white"
        >
          Check Eligibility
        </button>
      </div>
    </div>
  );
}
