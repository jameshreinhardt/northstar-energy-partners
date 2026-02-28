import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";

export const metadata = {
  title: "Privacy Policy | Northstar Energy Partners",
  description:
    "Northstar Energy Partners privacy policy. How we collect, use, and protect your information for Maryland community solar eligibility and enrollment.",
  openGraph: {
    title: "Privacy Policy | Northstar Energy Partners",
    description:
      "Northstar Energy Partners privacy policy. How we collect, use, and protect your information for Maryland community solar eligibility and enrollment.",
  },
};

const LAST_UPDATED = "Feb 27, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-slate-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-12 space-y-10 text-slate-600">
          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">1. What we collect</h2>
            <p className="mt-2 leading-relaxed">
              When you check eligibility or contact us, we may collect: name, email address, phone number, ZIP code, utility or provider, account type (residential or business), and any message you send. We collect only what you provide.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">2. How we use it</h2>
            <p className="mt-2 leading-relaxed">
              We use your information to check whether community solar is available for your utility account, to support your enrollment, to respond to your questions, and to coordinate with program partners when needed to complete enrollment or provide service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">3. What we don&apos;t do</h2>
            <p className="mt-2 leading-relaxed">
              We do not sell your personal information. We do not use your information for unrelated marketing or spam.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">4. Sharing</h2>
            <p className="mt-2 leading-relaxed">
              We may share information only with partners necessary to fulfill enrollment and support (for example, program administrators or utilities). We may use service providers who help us operate our site and systems under strict confidentiality. We may disclose information when required by law or to protect our rights and safety.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">5. Data retention</h2>
            <p className="mt-2 leading-relaxed">
              We keep your information as long as needed for eligibility checks, enrollment, and support. You may request access to or deletion of your data; we will honor such requests where possible under applicable law and our operational needs.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">6. Security</h2>
            <p className="mt-2 leading-relaxed">
              We use reasonable safeguards to protect your information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">7. Your choices</h2>
            <p className="mt-2 leading-relaxed">
              You may request access to or correction of your information, request deletion where applicable, or opt out of marketing communications. Contact us using the email below.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-navy">8. Contact</h2>
            <p className="mt-2 leading-relaxed">
              Questions about this privacy policy or your data? Email us at{" "}
              <a href="mailto:support@northstarenergypartners.com" className="font-medium text-navy hover:text-gold transition">
                support@northstarenergypartners.com
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
