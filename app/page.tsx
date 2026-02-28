"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./components/FadeIn";
import { SiteHeader } from "./components/SiteHeader";
import { EligibilityForm } from "./components/EligibilityForm";
import { StickyEligibilityBar } from "./components/StickyEligibilityBar";
import { HomeFAQAccordion } from "./components/HomeFAQAccordion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=80";

const CHECK_ELIGIBILITY_ID = "check-eligibility";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <SiteHeader />
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
                Lower your electric bill with Community Solar.
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-white/90 sm:text-2xl">
                No panels. No installation. Just monthly bill credits from a local solar farm—available to renters and homeowners.
              </p>
              <p className="text-base text-slate-600 mt-3">
                Available through regulated community solar programs. No installation required.
              </p>
              <ul className="mx-auto mt-6 max-w-md list-none space-y-2 text-left text-white/90 sm:max-w-lg">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-light" aria-hidden />
                  <span>No panels or installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-light" aria-hidden />
                  <span>No contracts / cancel anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-light" aria-hidden />
                  <span>Savings applied as credits on your existing utility bill</span>
                </li>
              </ul>
            </FadeIn>
            <div className="mt-4 h-1 w-20 bg-gold-light rounded-full" aria-hidden />
            <FadeIn delay={100}>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => scrollTo(CHECK_ELIGIBILITY_ID)}
                  className="w-full rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-navy shadow-sm transition hover:bg-gold-light sm:w-auto"
                >
                  Check My Eligibility
                </button>
                <Link
                  href="/how-it-works"
                  className="w-full rounded-lg border-2 border-white/80 bg-transparent px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10 sm:w-auto text-center"
                >
                  How it Works
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  Free to check
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  No obligation
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  Takes 30 seconds
                </span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Trust strip: Maryland utilities */}
        <section className="border-t border-white/10 bg-white px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              Serving BGE • Pepco • SMECO • Delmarva • Potomac Edison
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-base font-semibold text-slate-700 sm:gap-x-10">
              <span>BGE</span>
              <span>Pepco</span>
              <span>SMECO</span>
              <span>Delmarva Power</span>
              <span>Potomac Edison</span>
            </div>
          </div>
        </section>

        {/* Testimonial / credibility strip */}
        <section className="border-t border-slate-200 bg-slate-50/70 px-6 py-10 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 sm:grid-cols-3">
              <blockquote className="text-center">
                <p className="text-slate-700 leading-relaxed">
                  &ldquo;We didn&apos;t change anything with our utility—just started seeing credits.&rdquo;
                </p>
                <footer className="mt-2 text-sm text-slate-500">— Sarah M., Baltimore, MD</footer>
              </blockquote>
              <blockquote className="text-center">
                <p className="text-slate-700 leading-relaxed">
                  &ldquo;Took two minutes to check. No sales pressure, no equipment.&rdquo;
                </p>
                <footer className="mt-2 text-sm text-slate-500">— James T., Silver Spring, MD</footer>
              </blockquote>
              <blockquote className="text-center">
                <p className="text-slate-700 leading-relaxed">
                  &ldquo;Credits show up on my same BGE bill. One less thing to think about.&rdquo;
                </p>
                <footer className="mt-2 text-sm text-slate-500">— Michelle R., Columbia, MD</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* How Community Solar Works */}
        <section className="border-t border-slate-200 bg-slate-50/70 px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl text-center">
                How Community Solar Works
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full mx-auto" />
            </FadeIn>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <FadeIn delay={0}>
                <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-lg font-semibold text-gold" aria-hidden>1</span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-navy break-words">
                    Local solar farm generates power
                  </h3>
                  <p className="mt-2 text-slate-600 leading-relaxed break-words">
                    A solar project in your utility&apos;s territory produces clean energy.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-lg font-semibold text-gold" aria-hidden>2</span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-navy break-words">
                    Utility applies credits to your bill
                  </h3>
                  <p className="mt-2 text-slate-600 leading-relaxed break-words">
                    Credits from the project show up on your existing electric bill.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-lg font-semibold text-gold" aria-hidden>3</span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-navy break-words">
                    You pay less each month
                  </h3>
                  <p className="mt-2 text-slate-600 leading-relaxed break-words">
                    Your bill reflects the credits—no new accounts or equipment.
                  </p>
                </div>
              </FadeIn>
            </div>
            <p className="text-sm text-slate-600 text-center mt-6 max-w-2xl mx-auto">
              Your utility provider does not change. You&apos;ll see credits applied to your existing bill.
            </p>
          </div>
        </section>

        {/* Mini FAQ accordion */}
        <HomeFAQAccordion />

        {/* Why Northstar Energy Partners (authority / trust) */}
        <section className="scroll-mt-24 bg-slate-50/70 px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl text-center">
                Why Northstar Energy Partners
              </h2>
              <div className="mt-4 h-1 w-14 bg-gold rounded-full mx-auto" />
            </FadeIn>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FadeIn delay={0}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-lg font-semibold text-navy">
                    Enrollment-focused infrastructure
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">QA + verification checkpoints</p>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    Built specifically to support customer acquisition and enrollment for regulated community solar programs.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-lg font-semibold text-navy">
                    Program-aligned process
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">Disclosure + audit-ready tracking</p>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    Enrollment follows structured program requirements, verification standards, and partner delivery workflows.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={160}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-lg font-semibold text-navy">
                    Customer-first experience
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">Clear follow-ups and support</p>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    Clear communication, transparent expectations, and ongoing support throughout the enrollment process.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={240}>
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-serif text-lg font-semibold text-navy">
                    Secure and privacy-focused
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">Used only for eligibility + enrollment</p>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    Customer information is handled securely and used only for eligibility verification and program enrollment.
                  </p>
                </div>
              </FadeIn>
            </div>
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
            <FadeIn delay={60}>
              <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-600">
                  How it works
                </p>
                <ol className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
                  <li className="flex min-w-0 gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">1</span>
                    <span className="min-w-0 text-sm text-slate-700"><strong className="text-navy">Check eligibility</strong> — Enter your ZIP and utility.</span>
                  </li>
                  <li className="flex min-w-0 gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">2</span>
                    <span className="min-w-0 text-sm text-slate-700"><strong className="text-navy">We confirm availability</strong> — We match you to a local project.</span>
                  </li>
                  <li className="flex min-w-0 gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">3</span>
                    <span className="min-w-0 text-sm text-slate-700"><strong className="text-navy">Enroll</strong> — Credits appear on your utility bill.</span>
                  </li>
                </ol>
              </div>
            </FadeIn>
            <FadeIn delay={80}>
              <p className="mb-4 mt-8 text-center text-sm text-slate-500">
                Your information is secure and never sold. Used only to verify eligibility and support enrollment.
              </p>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 lg:p-10">
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
                  <span className="min-w-0 break-words"><strong className="text-navy">We confirm availability</strong> — We check your ZIP + utility/provider against available community solar projects.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">2</span>
                  <span className="min-w-0 break-words"><strong className="text-navy">We follow up</strong> — A team member emails you (and may text/call if you provided a phone number) to confirm details.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-sm font-semibold text-gold">3</span>
                  <span className="min-w-0 break-words"><strong className="text-navy">You decide</strong> — If there&apos;s a fit, we&apos;ll share the next steps. No obligation.</span>
                </li>
              </ol>
              <p className="mt-4 text-sm text-slate-500">
                Availability depends on utility territory and project capacity. We don&apos;t sell your information.
              </p>
            </div>
          </div>
        </section>


      </main>

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
            Northstar Energy Partners is a customer acquisition and enrollment support provider for community solar programs.
          </p>
          <p className="mt-2 text-center text-sm text-white/80">
            © {year} Northstar Energy Partners. All rights reserved.
          </p>
        </div>
      </footer>

      <StickyEligibilityBar />
    </>
  );
}
