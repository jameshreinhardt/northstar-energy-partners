import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Northstar Energy Partners",
  description: "Terms of service for Northstar Energy Partners. Use of our website and enrollment support.",
};

const LAST_UPDATED = "Feb 27, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="font-serif text-xl font-semibold tracking-tight text-navy hover:text-gold transition focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded">
            Northstar Energy Partners
          </Link>
          <Link
            href="/"
            className="text-base font-medium text-navy hover:text-gold transition"
          >
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-slate-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-12 space-y-10 text-slate-600">
          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">1. Informational only</h2>
            <p className="mt-2 leading-relaxed">
              The content on this site is for general information about community solar and our enrollment support. It is not financial, legal, or tax advice. Consult your own advisors as needed.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">2. Program availability</h2>
            <p className="mt-2 leading-relaxed">
              Program availability varies by location, utility, and project capacity. Enrollment is subject to eligibility and capacity. We cannot guarantee that a program will be available for every inquiry.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">3. No guarantee of savings</h2>
            <p className="mt-2 leading-relaxed">
              We do not guarantee any specific level of savings or bill credits. Credits and savings depend on the terms of the specific community solar program and your electricity usage.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">4. Acceptable use</h2>
            <p className="mt-2 leading-relaxed">
              You agree to use this site and our forms only for lawful purposes. You may not use them to abuse, harass, spam, or conduct any illegal activity. We may refuse or limit access as we deem necessary.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">5. Limitation of liability</h2>
            <p className="mt-2 leading-relaxed">
              To the fullest extent permitted by law, Northstar Energy Partners and its affiliates are not liable for any indirect, incidental, special, or consequential damages arising from your use of this site or our services. Our total liability shall not exceed the amount you paid to us, if any, in the twelve months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">6. Changes to terms</h2>
            <p className="mt-2 leading-relaxed">
              We may update these terms from time to time. The &quot;Last updated&quot; date at the top will reflect the latest version. Continued use of the site after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">7. Contact</h2>
            <p className="mt-2 leading-relaxed">
              Questions about these terms? Email us at{" "}
              <a href="mailto:info@northstarenergypartners.com" className="font-medium text-navy hover:text-gold transition">
                info@northstarenergypartners.com
              </a>
              .
            </p>
          </section>
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
