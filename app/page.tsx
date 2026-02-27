"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./components/FadeIn";
import { Logo } from "./components/Logo";
import { EligibilityForm } from "./components/EligibilityForm";
import { PartnerForm } from "./components/PartnerForm";
import { StickyEligibilityBar } from "./components/StickyEligibilityBar";
import { SupportForm } from "./components/SupportForm";
import { CareersForm } from "./components/CareersForm";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=80";

const HOW_IT_WORKS_ID = "how-it-works";
const CHECK_ELIGIBILITY_ID = "check-eligibility";
const FAQ_ID = "faq";
const SUPPORT_ID = "support";
const CAREERS_ID = "careers";
const PARTNER_FORM_ID = "partner-with-us";

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
            <Link
              href="/how-it-works"
              className="hidden text-base font-medium text-white/90 transition hover:text-gold-light sm:block"
            >
              How it Works
            </Link>
            <Link
              href="/#check-eligibility"
              className="hidden text-base font-medium text-white/90 transition hover:text-gold-light sm:block"
            >
              Eligibility
            </Link>
            <Link
              href="/faq"
              className="hidden text-base font-medium text-white/90 transition hover:text-gold-light sm:block"
            >
              FAQ
            </Link>
            <Link
              href="/support"
              className="hidden text-base font-medium text-white/90 transition hover:text-gold-light sm:block"
            >
              Support
            </Link>
            <Link
              href="/careers"
              className="hidden text-base font-medium text-white/90 transition hover:text-gold-light sm:block"
            >
              Careers
            </Link>
            <Link
              href="/#check-eligibility"
              className="rounded-lg bg-gold px-6 py-3 text-base font-semibold text-navy shadow-sm transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-navy"
            >
              Check My Eligibility
            </Link>
            <Link
              href="/partners"
              className="text-base font-medium text-white/80 transition hover:text-gold-light"
            >
              Partners
            </Link>
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
                Lower Your Electric Bill with Community Solar
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-white/90 sm:text-2xl">
                Available to renters, homeowners, apartments, and businesses.
              </p>
            </FadeIn>
            <div className="mt-4 h-1 w-20 bg-gold-light rounded-full" aria-hidden />
            <FadeIn delay={100}>
              <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-white/90 sm:text-2xl">
                Get credits from a local solar project on your existing bill.
                No panels, no installation, and no change to your utility.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => scrollTo(CHECK_ELIGIBILITY_ID)}
                  className="w-full rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-navy shadow-lg transition hover:bg-gold-light sm:w-auto"
                >
                  Check My Eligibility
                </button>
                <button
                  onClick={() => scrollTo(HOW_IT_WORKS_ID)}
                  className="w-full rounded-lg border-2 border-white/80 bg-transparent px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  How it Works
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* See How Much You Could Save */}
        <section className="bg-slate-50/70 px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                See How Much You Could Save
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <p className="mt-6 max-w-2xl text-xl text-slate-600">
                Most customers qualify in under 30 seconds. Check your eligibility to see if community solar is available for your utility account.
              </p>
            </FadeIn>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              <FadeIn delay={0}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    No equipment
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    Nothing is installed at your home or business.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    One utility bill
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    You keep your same utility and account.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    No commitment to check
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    Checking eligibility is free and takes less than 30 seconds.
                  </p>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={120}>
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => scrollTo(CHECK_ELIGIBILITY_ID)}
                  className="rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-navy shadow-lg transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-white"
                >
                  Check My Eligibility
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Check Eligibility */}
        <section
          id={CHECK_ELIGIBILITY_ID}
          className="scroll-mt-24 bg-white px-6 py-24 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-2xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Check Your Eligibility in 30 Seconds
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <p className="mt-4 text-base text-slate-500">
                No commitment. No equipment. Just see if you qualify.
              </p>
              <p className="mt-6 text-xl text-slate-600">
                See if you can get community solar credits on your bill. If you
                pay for electricity—whether you rent, own, or run a small
                business—you may qualify. No equipment and no change to your
                utility.
              </p>
              <ul className="mt-6 list-inside list-disc space-y-2 text-lg text-slate-600">
                <li>No panels or installation</li>
                <li>Keep your existing utility account</li>
                <li>Available for renters, homeowners, and small businesses</li>
              </ul>
            </FadeIn>
            <p className="mt-10 text-center text-sm text-slate-500">
              Free to check. No obligation. Takes less than 30 seconds.
            </p>
            <FadeIn delay={80}>
              <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 lg:p-10">
                <EligibilityForm />
              </div>
            </FadeIn>
            <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <h3 className="font-serif text-lg font-semibold text-navy">
                What happens next
              </h3>
              <ol className="mt-4 space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">1</span>
                  <span><strong className="text-navy">We confirm availability</strong> — We check your ZIP + utility/provider against available community solar projects.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">2</span>
                  <span><strong className="text-navy">We follow up</strong> — A team member emails you (and may text/call if you provided a phone number) to confirm details.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">3</span>
                  <span><strong className="text-navy">You decide</strong> — If there&apos;s a fit, we&apos;ll share the next steps. No obligation.</span>
                </li>
              </ol>
              <p className="mt-4 text-sm text-slate-500">
                Availability depends on utility territory and project capacity. We don&apos;t sell your information.
              </p>
            </div>
          </div>
        </section>

        {/* How it Works (consumer) */}
        <section
          id={HOW_IT_WORKS_ID}
          className="scroll-mt-24 bg-white px-6 py-24 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                How it Works
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <p className="mt-6 max-w-2xl text-xl text-slate-600">
                Community solar lets you support local solar power and see credits on your electric bill. Here’s what happens.
              </p>
            </FadeIn>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              <FadeIn delay={0}>
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-muted font-serif text-lg font-semibold text-gold">
                    1
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-navy">
                    Sign up
                  </h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    Tell us where you live and who your utility is. We’ll confirm if a project is available in your area.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-muted font-serif text-lg font-semibold text-gold">
                    2
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-navy">
                    We connect you
                  </h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    You’re matched with a local solar project. Your utility account stays the same; nothing is installed at your home.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-muted font-serif text-lg font-semibold text-gold">
                    3
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-navy">
                    Credits on your bill
                  </h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    Solar credits show up on your existing electric bill. You keep one bill and one utility.
                  </p>
                </div>
              </FadeIn>
            </div>
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => scrollTo(CHECK_ELIGIBILITY_ID)}
                className="rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-navy shadow-lg transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-white"
              >
                Check My Eligibility
              </button>
            </div>
          </div>
        </section>

        {/* Trusted by Energy Customers */}
        <section className="scroll-mt-24 bg-slate-50/70 px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Trusted by Energy Customers
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <p className="mt-6 max-w-2xl text-xl text-slate-600">
                Northstar Energy Partners helps households and businesses enroll in community solar programs with confidence, clarity, and support.
              </p>
            </FadeIn>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              <FadeIn delay={0}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Transparent and simple
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    We clearly explain eligibility, savings, and how the program works. No pressure and no confusing industry jargon.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Secure and confidential
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    Customer information is used only for program enrollment and support. We do not sell or share personal data.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Real human support
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    Our team is available to answer questions and guide customers through enrollment from start to finish.
                  </p>
                </div>
              </FadeIn>
            </div>
            <div className="mt-16 border-y border-slate-200 bg-slate-50 py-8 lg:py-10">
              <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:gap-12">
                <p className="font-serif text-xl font-semibold text-navy lg:text-2xl">
                  No equipment or installation
                </p>
                <p className="font-serif text-xl font-semibold text-navy lg:text-2xl">
                  Keep your existing utility account
                </p>
                <p className="font-serif text-xl font-semibold text-navy lg:text-2xl">
                  Available for households and businesses
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Program Compliance & Market Alignment */}
        <section className="scroll-mt-24 bg-white px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Program Compliance & Market Alignment
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <p className="mt-6 max-w-2xl text-xl text-slate-600">
                Northstar Energy Partners operates in accordance with state community solar program requirements and partner enrollment standards.
              </p>
            </FadeIn>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <FadeIn delay={0}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Utility-aligned enrollment
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    We enroll customers based on utility service territories, project availability, and eligibility requirements.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Program-compliant process
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    Enrollment follows program guidelines including customer disclosures, documentation, and verification steps.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Partner-ready infrastructure
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    Our systems and enrollment flow are designed to integrate with solar developers, subscriber managers, and utilities.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={240}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Multi-market capable
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    Northstar is building enrollment infrastructure designed to support multiple states and community solar markets.
                  </p>
                </div>
              </FadeIn>
            </div>
            <p className="mt-12 text-center text-sm text-slate-500">
              Specific program terms, availability, and eligibility vary by location and utility.
            </p>
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
                    Simple process
                  </h3>
                  <p className="mt-3 text-lg text-slate-600 leading-relaxed">
                    We help you find out if a project is available in your area and walk you through next steps. No pressure, no confusing jargon.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-8 transition hover:border-gold/30 hover:shadow-lg">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 font-serif text-xl font-semibold text-gold">
                    2
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-navy">
                    One bill, no new equipment
                  </h3>
                  <p className="mt-3 text-lg text-slate-600 leading-relaxed">
                    You keep your utility and your account. Credits show up on the bill you already get. Nothing is installed at your home.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-8 transition hover:border-gold/30 hover:shadow-lg sm:col-span-2 lg:col-span-1">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 font-serif text-xl font-semibold text-gold">
                    3
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-navy">
                    Clear communication
                  </h3>
                  <p className="mt-3 text-lg text-slate-600 leading-relaxed">
                    We explain how community solar works and what to expect. If you have questions, we’re here to help.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id={FAQ_ID}
          className="scroll-mt-24 bg-slate-50/70 px-6 py-24 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
            </FadeIn>
            <dl className="mt-12 space-y-8">
              <FadeIn delay={0}>
                <div>
                  <dt className="font-semibold text-navy text-lg">Do I need solar panels or any equipment?</dt>
                  <dd className="mt-2 text-slate-600 leading-relaxed">
                    No. Community solar uses shared projects off-site. Nothing is installed at your home or business.
                  </dd>
                </div>
              </FadeIn>
              <FadeIn delay={40}>
                <div>
                  <dt className="font-semibold text-navy text-lg">Do I have to switch utilities?</dt>
                  <dd className="mt-2 text-slate-600 leading-relaxed">
                    No. You keep your current utility and one bill. Credits from the solar project are applied to that same bill.
                  </dd>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div>
                  <dt className="font-semibold text-navy text-lg">How do I see savings?</dt>
                  <dd className="mt-2 text-slate-600 leading-relaxed">
                    Credits from the solar project appear on your regular electric bill. Your bill may be lower depending on the credits and your usage.
                  </dd>
                </div>
              </FadeIn>
              <FadeIn delay={120}>
                <div>
                  <dt className="font-semibold text-navy text-lg">Can I cancel later?</dt>
                  <dd className="mt-2 text-slate-600 leading-relaxed">
                    Terms depend on the specific project. When you sign up, you’ll see the agreement details before you commit.
                  </dd>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div>
                  <dt className="font-semibold text-navy text-lg">What actually changes for me?</dt>
                  <dd className="mt-2 text-slate-600 leading-relaxed">
                    You stay with your utility and get one bill. The only change is that solar credits may be applied to that bill. No new equipment and no new company to pay.
                  </dd>
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div>
                  <dt className="font-semibold text-navy text-lg">Who is eligible?</dt>
                  <dd className="mt-2 text-slate-600 leading-relaxed">
                    In many areas, anyone with an electric bill can apply—renters, homeowners, condos, apartments, and small businesses. Eligibility depends on your location and utility.
                  </dd>
                </div>
              </FadeIn>
              <FadeIn delay={240}>
                <div>
                  <dt className="font-semibold text-navy text-lg">How is my information used?</dt>
                  <dd className="mt-2 text-slate-600 leading-relaxed">
                    We use your information only to check eligibility and connect you with a project. We don’t sell your data to third parties for marketing.
                  </dd>
                </div>
              </FadeIn>
            </dl>
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => scrollTo(CHECK_ELIGIBILITY_ID)}
                className="rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-navy shadow-lg transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-white"
              >
                Check My Eligibility
              </button>
            </div>
          </div>
        </section>

        {/* Where We're Available */}
        <section id="markets" className="scroll-mt-24 bg-white px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Where We’re Available
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <p className="mt-6 max-w-2xl text-xl text-slate-600">
                We help connect customers with community solar in multiple regions. Availability depends on your location and utility.
              </p>
            </FadeIn>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FadeIn delay={0}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Northeast & Mid-Atlantic
                  </h3>
                  <p className="mt-2 text-lg text-slate-600">
                    Areas where community solar is available through local utilities and projects.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={60}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Midwest & more
                  </h3>
                  <p className="mt-2 text-lg text-slate-600">
                    We’re expanding as new projects and utilities open to customers.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={120}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    For partners
                  </h3>
                  <p className="mt-2 text-lg text-slate-600">
                    We also work with developers, utilities, and program owners on subscriber acquisition.
                  </p>
                </div>
              </FadeIn>
            </div>
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => scrollTo(CHECK_ELIGIBILITY_ID)}
                className="rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-navy shadow-lg transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-white"
              >
                Check My Eligibility
              </button>
            </div>
          </div>
        </section>

        {/* Support */}
        <section
          id={SUPPORT_ID}
          className="scroll-mt-24 bg-white px-6 py-24 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-2xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Support
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <p className="mt-6 text-xl text-slate-600">
                Questions about your account or eligibility? Reach out and we’ll get back to you.
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
          </div>
        </section>

        {/* For Developers & Partners */}
        <section className="scroll-mt-24 bg-slate-50/70 px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                For Developers & Partners
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <p className="mt-6 max-w-2xl text-xl text-slate-600">
                Northstar Energy Partners is a dedicated subscriber acquisition platform built to enroll and support high-quality community solar customers.
              </p>
            </FadeIn>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <FadeIn delay={0}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Customer-ready funnel
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    This site and our enrollment channels are designed to attract, educate, and convert qualified electricity customers into subscribers.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Consumer-focused experience
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    Clear messaging, simple eligibility checks, and guided enrollment increase conversion and reduce drop-off.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Quality and compliance
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    We follow partner guidelines and maintain accurate customer data and documentation.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={240}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Scalable acquisition
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    We are building systems to deliver consistent subscriber volume across multiple markets.
                  </p>
                </div>
              </FadeIn>
            </div>
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => scrollTo(PARTNER_FORM_ID)}
                className="rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-navy shadow-lg transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-white"
              >
                Partner With Northstar
              </button>
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
                For developers, utilities, and program partners: share your goals and we’ll respond within one business day. Submissions go to partners@northstarenergypartners.com.
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 lg:p-10">
                <PartnerForm />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Careers */}
        <section
          id={CAREERS_ID}
          className="scroll-mt-24 bg-white px-6 py-24 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-2xl">
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
            </FadeIn>
            <FadeIn delay={80}>
              <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 lg:p-10">
                <CareersForm />
              </div>
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

        {/* Trusted Enrollment Partner */}
        <section className="scroll-mt-24 bg-slate-50/70 px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Trusted Enrollment Partner
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
              <p className="mt-6 max-w-2xl text-xl text-slate-600">
                We help connect customers with approved community solar projects operated by leading energy developers and utilities.
              </p>
            </FadeIn>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              <FadeIn delay={0}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Secure enrollment
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    Your information is handled securely.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    No cost to check
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    Checking eligibility is always free.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Real utility programs
                  </h3>
                  <p className="mt-2 text-lg text-slate-600 leading-relaxed">
                    We connect you with legitimate local solar projects.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-navy py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="font-serif text-xl font-semibold text-white">
                Northstar Energy Partners
              </p>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                Community solar enrollment support and customer acquisition infrastructure.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Contact</p>
              <ul className="mt-3 space-y-1.5 text-sm text-white/80">
                <li>
                  General:{" "}
                  <a href="mailto:info@northstarenergypartners.com" className="text-white hover:text-gold-light transition">
                    info@northstarenergypartners.com
                  </a>
                </li>
                <li>
                  Support:{" "}
                  <a href="mailto:support@northstarenergypartners.com" className="text-white hover:text-gold-light transition">
                    support@northstarenergypartners.com
                  </a>
                </li>
                <li>
                  Partners:{" "}
                  <a href="mailto:partners@northstarenergypartners.com" className="text-white hover:text-gold-light transition">
                    partners@northstarenergypartners.com
                  </a>
                </li>
                <li>
                  Careers:{" "}
                  <a href="mailto:recruiting@northstarenergypartners.com" className="text-white hover:text-gold-light transition">
                    recruiting@northstarenergypartners.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Legal</p>
              <ul className="mt-3 space-y-1.5 text-sm text-white/80">
                <li>
                  <Link href="/privacy" className="text-white hover:text-gold-light transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white hover:text-gold-light transition">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 space-y-2 text-center text-xs text-white/70">
            <p>Availability and eligibility vary by location, utility, and project capacity.</p>
            <p>No solar panels are installed at your home or business.</p>
            <p>Bill credits and savings depend on project terms and your electricity usage.</p>
            <p>We do not sell your information. We use it to check eligibility and support enrollment.</p>
          </div>
          <p className="mt-10 text-center text-sm text-white/80">
            © {year} Northstar Energy Partners. All rights reserved.
          </p>
        </div>
      </footer>

      <StickyEligibilityBar />
    </>
  );
}
