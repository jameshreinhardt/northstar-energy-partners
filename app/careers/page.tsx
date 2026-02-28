import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { FadeIn } from "../components/FadeIn";
import { CareersForm } from "../components/CareersForm";
import { SecondaryCta } from "../components/SecondaryCta";

export const metadata = {
  title: "Careers | Northstar Energy Partners",
  description:
    "We're building a team that can scale community solar acquisition across the country. Join us.",
  openGraph: {
    title: "Careers | Northstar Energy Partners",
    description:
      "We're building a team that can scale community solar acquisition across the country. Join us.",
  },
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
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
          <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50/50 p-6">
            <h3 className="font-serif text-lg font-semibold text-navy">
              What to expect
            </h3>
            <ol className="mt-4 space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">1</span>
                <span>We review applications weekly.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">2</span>
                <span>If there&apos;s a fit, we schedule a call.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">3</span>
                <span>We confirm next steps.</span>
              </li>
            </ol>
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 lg:p-10">
            <CareersForm />
          </div>
        </FadeIn>
      </main>
      <SecondaryCta />
      <div className="mx-auto max-w-2xl px-6 pb-24 lg:px-8">
        <p className="border-t border-slate-200 pt-8">
          <Link href="/" className="text-navy font-medium hover:text-gold transition">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
