"use client";

import { useState } from "react";

export function PartnerForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Mailto fallback: open client email with pre-filled body
      const subject = encodeURIComponent(`Partner inquiry from ${formData.company || formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:james@northstarenergypartners.com?subject=${subject}&body=${body}`;
      setStatus("sent");
      setFormData({ name: "", company: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-base font-semibold text-navy">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            placeholder="Full name"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-base font-semibold text-navy">
            Company / Organization
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            placeholder="Company name"
          />
        </div>
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
          value={formData.email}
          onChange={handleChange}
          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-base font-semibold text-navy">
          How can we help? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-lg text-slate-800 shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          placeholder="Tell us about your community solar program or partnership interest."
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-navy px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-navy-light disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
      >
        {status === "sending" ? "Sending…" : status === "sent" ? "Thank you" : "Send inquiry"}
      </button>
      {status === "error" && (
        <p className="text-base text-red-600">Something went wrong. Please email james@northstarenergypartners.com directly.</p>
      )}
    </form>
  );
}
