import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { FadeIn } from "../components/FadeIn";
import { SupportForm } from "../components/SupportForm";

export const metadata = {
  title: "Support | Northstar Energy Partners",
  description:
    "Questions about your account or eligibility? Reach out and we'll get back to you.",
  openGraph: {
    title: "Support | Northstar Energy Partners",
    description:
      "Questions about your account or eligibility? Reach out and we'll get back to you.",
  },
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-24 lg:px-8 lg:py-32">
        <FadeIn>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Support
          </h1>
          <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
          <p className="mt-6 text-xl text-slate-600">
            Questions about your account or eligibility? Reach out and we&apos;ll get back to you.
          </p>
          <p className="mt-6">
            <a
              href="mailto:support@northstarenergypartners.com"
              className="text-xl font-semibold text-navy hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded"
            >
              support@northstarenergypartners.com
            </a>
          </p>
          <p className="mt-4 text-slate-600">
            We aim to respond within one business day.
          </p>
          <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50/50 p-6">
            <h3 className="font-serif text-lg font-semibold text-navy">
              What to expect
            </h3>
            <ol className="mt-4 space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">1</span>
                <span>We review within 1 business day.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">2</span>
                <span>We reply by email (and may call/text if provided).</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">3</span>
                <span>We help resolve or route your request.</span>
              </li>
            </ol>
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 lg:p-10">
            <SupportForm />
          </div>
        </FadeIn>
        <p className="mt-16 pt-8 border-t border-slate-200">
          <Link href="/" className="text-navy font-medium hover:text-gold transition">
            ← Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}
