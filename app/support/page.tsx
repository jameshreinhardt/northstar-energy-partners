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
