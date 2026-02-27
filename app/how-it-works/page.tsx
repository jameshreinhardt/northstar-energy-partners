import Link from "next/link";
import { PageHeader } from "../components/PageHeader";
import { FadeIn } from "../components/FadeIn";

export const metadata = {
  title: "How it Works | Northstar Energy Partners",
  description:
    "Community solar lets you support local solar power and see credits on your electric bill. Learn how it works.",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader />
      <main className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">
        <FadeIn>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            How it Works
          </h1>
          <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
          <p className="mt-6 max-w-2xl text-xl text-slate-600">
            Community solar lets you support local solar power and see credits on your electric bill. Here&apos;s what happens.
          </p>
        </FadeIn>
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <FadeIn delay={0}>
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-muted font-serif text-lg font-semibold text-gold">
                1
              </span>
              <h2 className="mt-6 font-serif text-xl font-semibold text-navy">
                Sign up
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Tell us where you live and who your utility is. We&apos;ll confirm if a project is available in your area.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-muted font-serif text-lg font-semibold text-gold">
                2
              </span>
              <h2 className="mt-6 font-serif text-xl font-semibold text-navy">
                We connect you
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                You&apos;re matched with a local solar project. Your utility account stays the same; nothing is installed at your home.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={160}>
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-muted font-serif text-lg font-semibold text-gold">
                3
              </span>
              <h2 className="mt-6 font-serif text-xl font-semibold text-navy">
                Credits on your bill
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Solar credits show up on your existing electric bill. You keep one bill and one utility.
              </p>
            </div>
          </FadeIn>
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            href="/#check-eligibility"
            className="rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-navy shadow-lg transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-white"
          >
            Check My Eligibility
          </Link>
        </div>
        <p className="mt-16 pt-8 border-t border-slate-200">
          <Link href="/" className="text-navy font-medium hover:text-gold transition">
            ← Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}
