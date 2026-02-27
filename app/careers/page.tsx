import Link from "next/link";
import { PageHeader } from "../components/PageHeader";
import { FadeIn } from "../components/FadeIn";
import { CareersForm } from "../components/CareersForm";

export const metadata = {
  title: "Careers | Northstar Energy Partners",
  description:
    "We're building a team that can scale community solar acquisition across the country. Join us.",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader />
      <main className="mx-auto max-w-2xl px-6 py-24 lg:px-8 lg:py-32">
        <FadeIn>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Careers
          </h1>
          <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
          <p className="mt-8 text-xl leading-relaxed text-slate-600">
            We&apos;re building a team that can scale community solar acquisition
            across the country. If you&apos;re driven by operational excellence,
            clean energy, and building something that lasts, we&apos;d like to
            hear from you.
          </p>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 lg:p-10">
            <CareersForm />
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
