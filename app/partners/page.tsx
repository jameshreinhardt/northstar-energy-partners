import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { FadeIn } from "../components/FadeIn";
import { PartnerForm } from "../components/PartnerForm";

export const metadata = {
  title: "Partners | Northstar Energy Partners",
  description:
    "Northstar Energy Partners is a dedicated subscriber acquisition platform. Partner with us for community solar enrollment.",
  openGraph: {
    title: "Partners | Northstar Energy Partners",
    description:
      "Northstar Energy Partners is a dedicated subscriber acquisition platform. Partner with us for community solar enrollment.",
  },
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">
        <FadeIn>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Trusted Enrollment Partner
          </h1>
          <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
          <p className="mt-6 max-w-2xl text-xl text-slate-600">
            We help connect customers with approved community solar projects operated by leading energy developers and utilities.
          </p>
        </FadeIn>
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <FadeIn delay={0}>
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
              <h2 className="font-serif text-xl font-semibold text-navy">
                Secure enrollment
              </h2>
              <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                Your information is handled securely.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
              <h2 className="font-serif text-xl font-semibold text-navy">
                No cost to check
              </h2>
              <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                Checking eligibility is always free.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={160}>
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
              <h2 className="font-serif text-xl font-semibold text-navy">
                Real utility programs
              </h2>
              <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                We connect you with legitimate local solar projects.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* What partners can expect */}
        <section className="mt-24">
          <FadeIn>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              What partners can expect
            </h2>
            <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
          </FadeIn>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <FadeIn delay={0}>
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
                <h3 className="font-serif text-xl font-semibold text-navy">
                  Volume & quality controls
                </h3>
                <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                  QA and verification processes keep data clean and submission quality high.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
                <h3 className="font-serif text-xl font-semibold text-navy">
                  Compliance-first enrollment
                </h3>
                <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                  Disclosures and audit-ready tracking so enrollment stays compliant.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
                <h3 className="font-serif text-xl font-semibold text-navy">
                  Fast feedback loop
                </h3>
                <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                  Weekly reporting and rapid iteration so you can adjust as needed.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* How enrollment works with Northstar */}
        <section className="mt-24">
          <FadeIn>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              How enrollment works with Northstar
            </h2>
            <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
          </FadeIn>
          <FadeIn delay={80}>
            <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">1</span>
                  <span><strong className="text-navy">Customer acquisition</strong> — We generate customer interest through targeted outreach, digital channels, and referral sources.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">2</span>
                  <span><strong className="text-navy">Eligibility verification</strong> — We confirm utility territory, program eligibility, and customer information before submission.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">3</span>
                  <span><strong className="text-navy">Secure partner delivery</strong> — We provide qualified customer enrollment information through agreed-upon delivery and verification processes.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">4</span>
                  <span><strong className="text-navy">Ongoing reporting</strong> — We maintain communication and provide updates as customers move through enrollment and activation.</span>
                </li>
              </ol>
            </div>
          </FadeIn>
        </section>

        <section className="mt-24">
          <FadeIn>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Partner With Us
            </h2>
            <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
            <p className="mt-6 text-xl text-slate-600">
              For developers, utilities, and program partners: share your goals and we&apos;ll respond within one business day.
            </p>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 lg:p-10">
              <PartnerForm />
            </div>
          </FadeIn>
        </section>

        <p className="mt-16 pt-8 border-t border-slate-200">
          <Link href="/" className="text-navy font-medium hover:text-gold transition">
            ← Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}
