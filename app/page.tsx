"use client";

import Image from "next/image";
import { FadeIn } from "./components/FadeIn";
import { Logo } from "./components/Logo";
import { PartnerForm } from "./components/PartnerForm";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=80";

const PARTNER_FORM_ID = "partner-with-us";
const CAREERS_ID = "careers";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Sticky nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Logo variant="light" />
          <div className="flex items-center gap-6">
            <a
              href="#why-northstar"
              className="hidden text-base font-medium text-white/90 transition hover:text-gold-light sm:block"
            >
              Why Northstar
            </a>
            <a
              href="#markets"
              className="hidden text-base font-medium text-white/90 transition hover:text-gold-light sm:block"
            >
              Markets
            </a>
            <a
              href="#careers"
              className="hidden text-base font-medium text-white/90 transition hover:text-gold-light sm:block"
            >
              Careers
            </a>
            <button
              onClick={() => scrollTo(PARTNER_FORM_ID)}
              className="rounded-lg bg-gold px-6 py-3 text-base font-semibold text-navy shadow-sm transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-navy"
            >
              Partner With Us
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero with solar farm background */}
        <section className="relative min-h-[90vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy/70" />
          </div>
          <div className="relative mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-6 py-28 text-center lg:px-8">
            <FadeIn>
              <h1 className="font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Scaling Access to Community Solar
              </h1>
            </FadeIn>
            <div className="mt-4 h-1 w-20 bg-gold-light rounded-full" aria-hidden />
            <FadeIn delay={100}>
              <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-white/90 sm:text-2xl">
                We build customer acquisition infrastructure that helps community
                solar programs grow—connecting qualified households to bill
                savings and clean energy opportunities.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => scrollTo(PARTNER_FORM_ID)}
                  className="w-full rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-navy shadow-lg transition hover:bg-gold-light sm:w-auto"
                >
                  Partner With Us
                </button>
                <a
                  href="#contact"
                  className="w-full rounded-lg border-2 border-white/80 bg-transparent px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  Contact
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Credibility strip */}
        <section className="border-y border-slate-200 bg-slate-50 py-8 lg:py-10">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:gap-12">
              <FadeIn>
                <p className="font-serif text-xl font-semibold text-navy lg:text-2xl">
                  Performance-driven acquisition
                </p>
              </FadeIn>
              <FadeIn delay={50}>
                <p className="font-serif text-xl font-semibold text-navy lg:text-2xl">
                  Residential-first approach
                </p>
              </FadeIn>
              <FadeIn delay={100}>
                <p className="font-serif text-xl font-semibold text-navy lg:text-2xl">
                  Partner-aligned execution
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Why Northstar */}
        <section id="why-northstar" className="scroll-mt-24 bg-white px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                Why Northstar
              </h2>
              <div className="mt-4 h-1 w-16 bg-gold rounded-full" />
            </FadeIn>
            <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <FadeIn delay={0}>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-8 transition hover:border-gold/30 hover:shadow-lg">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 font-serif text-xl font-semibold text-gold">
                    1
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-navy">
                    Built to scale
                  </h3>
                  <p className="mt-3 text-lg text-slate-600 leading-relaxed">
                    Operational infrastructure and field leadership designed for
                    predictable volume at enterprise scale.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-8 transition hover:border-gold/30 hover:shadow-lg">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 font-serif text-xl font-semibold text-gold">
                    2
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-navy">
                    Partner-first
                  </h3>
                  <p className="mt-3 text-lg text-slate-600 leading-relaxed">
                    We align with your markets, eligibility, and quality bar—no
                    operational burden on your team.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-8 transition hover:border-gold/30 hover:shadow-lg sm:col-span-2 lg:col-span-1">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 font-serif text-xl font-semibold text-gold">
                    3
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-navy">
                    Institutional standards
                  </h3>
                  <p className="mt-3 text-lg text-slate-600 leading-relaxed">
                    Scripting, training, QC, and documentation built for
                    compliance and long-term program success.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="bg-slate-50/70 px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                What We Do
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <p className="mt-8 text-xl leading-relaxed text-slate-600">
                Northstar Energy Partners recruits, trains, and manages
                high-performing enrollment teams to drive subscriber volume for
                community solar programs. We focus on operational
                excellence—scripting, training, quality control, and field
                leadership—to create predictable production at scale.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Markets Served */}
        <section id="markets" className="scroll-mt-24 bg-white px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Markets Served
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
            </FadeIn>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FadeIn delay={0}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Northeast & Mid-Atlantic
                  </h3>
                  <p className="mt-2 text-lg text-slate-600">
                    State programs and utilities where community solar is
                    scaling rapidly.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={60}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Midwest & National
                  </h3>
                  <p className="mt-2 text-lg text-slate-600">
                    Expanding into new markets as programs come online and
                    eligibility broadens.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={120}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Developer & Utility Partners
                  </h3>
                  <p className="mt-2 text-lg text-slate-600">
                    Dedicated acquisition for developers, utilities, and
                    portfolio owners.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="bg-slate-50/70 px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                How We Work
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
            </FadeIn>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              <FadeIn delay={0}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-muted font-serif text-lg font-semibold text-gold">
                    1
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-navy">
                    Align on markets + eligibility
                  </h3>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-muted font-serif text-lg font-semibold text-gold">
                    2
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-navy">
                    Launch acquisition with quality controls
                  </h3>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-muted font-serif text-lg font-semibold text-gold">
                    3
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-navy">
                    Report + scale
                  </h3>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Partner With Us form */}
        <section
          id={PARTNER_FORM_ID}
          className="scroll-mt-24 bg-white px-6 py-24 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-2xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Partner With Us
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <p className="mt-6 text-xl text-slate-600">
                Tell us about your program or partnership goals. We’ll respond
                within one business day.
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 lg:p-10">
                <PartnerForm />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Partner Fit */}
        <section className="bg-slate-50/70 px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Partner Fit
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <ul className="mt-10 space-y-6 text-xl leading-relaxed text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  A scalable subscriber acquisition channel
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  Consistent enrollment quality and documentation
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  A partner who can build and manage teams—without operational
                  burden on your staff
                </li>
              </ul>
            </FadeIn>
          </div>
        </section>

        {/* Careers */}
        <section
          id={CAREERS_ID}
          className="scroll-mt-24 bg-white px-6 py-24 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Careers
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <p className="mt-8 text-xl leading-relaxed text-slate-600">
                We’re building a team that can scale community solar acquisition
                across the country. If you’re driven by operational excellence,
                clean energy, and building something that lasts, we’d like to
                hear from you.
              </p>
              <a
                href="mailto:james@northstarenergypartners.com?subject=Career%20inquiry"
                className="mt-8 inline-block rounded-lg bg-navy px-6 py-3.5 text-lg font-semibold text-white transition hover:bg-navy-light"
              >
                Get in touch
              </a>
            </FadeIn>
          </div>
        </section>

        {/* Professional Standards */}
        <section className="bg-navy px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Professional Standards
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold-light rounded-full" />
            </FadeIn>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <FadeIn delay={0}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-8">
                  <h3 className="font-serif text-xl font-semibold text-white">
                    Compliance & quality
                  </h3>
                  <p className="mt-3 text-lg text-white/80 leading-relaxed">
                    Enrollment practices and documentation meet regulatory and
                    utility requirements. We maintain audit-ready processes and
                    partner-specific quality controls.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-8">
                  <h3 className="font-serif text-xl font-semibold text-white">
                    Safety & ethics
                  </h3>
                  <p className="mt-3 text-lg text-white/80 leading-relaxed">
                    Field operations prioritize safety and ethical engagement.
                    We train to a code of conduct that protects consumers and
                    upholds program integrity.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-24 bg-slate-50/70 px-6 py-24 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Contact
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
            </FadeIn>
            <FadeIn delay={80}>
              <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
                <p className="font-serif text-2xl font-semibold text-navy">
                  James Reinhardt
                </p>
                <p className="mt-1 text-lg text-slate-600">
                  Founder, Northstar Energy Partners
                </p>
                <a
                  href="mailto:james@northstarenergypartners.com"
                  className="mt-6 inline-block rounded-lg bg-navy px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                >
                  Email James
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-navy py-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Logo variant="light" className="opacity-95" />
            <p className="text-base text-white/80">
              © {year} Northstar Energy Partners. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
