import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { FadeIn } from "../components/FadeIn";
import { SecondaryCta } from "../components/SecondaryCta";

export const metadata = {
  title: "FAQ | Northstar Energy Partners",
  description:
    "Frequently asked questions about Maryland community solar: eligibility, billing, cancellation, and how Northstar Energy Partners connects you with local solar credits.",
  openGraph: {
    title: "FAQ | Northstar Energy Partners",
    description:
      "Frequently asked questions about Maryland community solar: eligibility, billing, cancellation, and how Northstar Energy Partners connects you with local solar credits.",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need solar panels or any equipment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Community solar uses shared projects off-site. Nothing is installed at your home or business.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to switch utilities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You keep your current utility and one bill. Credits from the solar project are applied to that same bill.",
      },
    },
    {
      "@type": "Question",
      name: "How do I see savings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Credits from the solar project appear on your regular electric bill. Your bill may be lower depending on the credits and your usage.",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel later?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Terms depend on the specific project. When you sign up, you'll see the agreement details before you commit.",
      },
    },
    {
      "@type": "Question",
      name: "What actually changes for me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You stay with your utility and get one bill. The only change is that solar credits may be applied to that bill. No new equipment and no new company to pay.",
      },
    },
    {
      "@type": "Question",
      name: "Who is eligible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In many areas, anyone with an electric bill can apply—renters, homeowners, condos, apartments, and small businesses. Eligibility depends on your location and utility.",
      },
    },
    {
      "@type": "Question",
      name: "How is my information used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use your information only to check eligibility and connect you with a project. We don't sell your data to third parties for marketing.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50/70">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24 lg:px-8 lg:py-32">
        <FadeIn>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Frequently Asked Questions
          </h1>
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
                Terms depend on the specific project. When you sign up, you&apos;ll see the agreement details before you commit.
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
                We use your information only to check eligibility and connect you with a project. We don&apos;t sell your data to third parties for marketing.
              </dd>
            </div>
          </FadeIn>
        </dl>
      </main>
      <SecondaryCta />
      <div className="mx-auto max-w-3xl px-6 pb-24 lg:px-8">
        <p className="border-t border-slate-200 pt-8">
          <Link href="/" className="text-navy font-medium hover:text-gold transition">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
