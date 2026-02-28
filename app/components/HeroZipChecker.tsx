"use client";

import { useState } from "react";

const ZIP_LENGTH = 5;
const ZIP_ONLY = /^\d{5}$/;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

type Props = {
  onZipSubmit: (zip: string) => void;
  scrollToId: string;
};

export function HeroZipChecker({ onZipSubmit, scrollToId: targetId }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length !== ZIP_LENGTH || !ZIP_ONLY.test(trimmed)) {
      setError("Enter a 5-digit ZIP code");
      return;
    }
    setError("");
    onZipSubmit(trimmed);
    scrollToId(targetId);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(/\D/g, "").slice(0, ZIP_LENGTH);
    setValue(v);
    if (error) setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex w-full max-w-sm flex-col gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:items-start sm:justify-center"
    >
      <div className="flex flex-1 flex-col gap-1 sm:max-w-[10rem]">
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={value}
          onChange={handleChange}
          placeholder="Enter ZIP code"
          aria-label="ZIP code"
          aria-invalid={!!error}
          aria-describedby={error ? "hero-zip-error" : undefined}
          className="w-full rounded-lg border border-white/80 bg-white/95 px-4 py-3 text-navy placeholder:text-slate-400 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
        {error && (
          <span id="hero-zip-error" className="text-sm text-gold-light">
            {error}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-gold px-6 py-3 font-semibold text-navy shadow-lg transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold/30 focus:ring-offset-2 focus:ring-offset-navy/70"
      >
        Check availability
      </button>
    </form>
  );
}
