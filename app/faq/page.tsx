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
        text: "No. Community solar uses large off-site solar farms. Nothing is installed on your home or property.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to switch utilities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You stay with your current utility and continue receiving the same electric bill. Solar credits are simply applied to that bill.",
      },
    },
    {
      "@type": "Question",
      name: "How do I see savings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Solar credits appear directly on your existing electric bill, reducing the amount you pay to your utility.",
      },
    },
    {
      "@type": "Question",
      name: "Are there contracts or long-term commitments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No long-term commitment is required. You can cancel anytime.",
      },
    },
    {
      "@type": "Question",
      name: "What actually changes for me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nothing about your service changes. You keep the same utility, the same account, and the same bill. The only difference is that solar credits are added.",
      },
    },
    {
      "@type": "Question",
      name: "Who is eligible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most customers with an active electric bill can qualify, including renters, homeowners, condos, apartments, and small businesses. Availability depends on your utility and project capacity.",
      },
    },
    {
      "@type": "Question",
      name: "How is my information used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your information is used only to check eligibility and support enrollment. It is never sold for marketing.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after I check eligibility?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you're eligible, you'll receive the project details and enrollment information. You'll always be able to review the terms before deciding to proceed.",
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
            What Most People Ask Before Enrolling
          </h1>
          <div className="mt-4 h-1 w-14 bg-gold rounded-full" />
        </FadeIn>
        <dl className="mt-12 space-y-8">
          <FadeIn delay={0}>
            <div>
              <dt className="font-semibold text-navy text-lg">Do I need solar panels or any equipment?</dt>
              <dd className="mt-2 text-slate-600 leading-relaxed">
                No. Community solar uses large off-site solar farms. Nothing is installed on your home or property.
              </dd>
            </div>
          </FadeIn>
          <FadeIn delay={40}>
            <div>
              <dt className="font-semibold text-navy text-lg">Do I have to switch utilities?</dt>
              <dd className="mt-2 text-slate-600 leading-relaxed">
                No. You stay with your current utility and continue receiving the same electric bill. Solar credits are simply applied to that bill.
              </dd>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <div>
              <dt className="font-semibold text-navy text-lg">How do I see savings?</dt>
              <dd className="mt-2 text-slate-600 leading-relaxed">
                Solar credits appear directly on your existing electric bill, reducing the amount you pay to your utility.
              </dd>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div>
              <dt className="font-semibold text-navy text-lg">Are there contracts or long-term commitments?</dt>
              <dd className="mt-2 text-slate-600 leading-relaxed">
                No long-term commitment is required. You can cancel anytime.
              </dd>
            </div>
          </FadeIn>
          <FadeIn delay={160}>
            <div>
              <dt className="font-semibold text-navy text-lg">What actually changes for me?</dt>
              <dd className="mt-2 text-slate-600 leading-relaxed">
                Nothing about your service changes. You keep the same utility, the same account, and the same bill. The only difference is that solar credits are added.
              </dd>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div>
              <dt className="font-semibold text-navy text-lg">Who is eligible?</dt>
              <dd className="mt-2 text-slate-600 leading-relaxed">
                Most customers with an active electric bill can qualify, including renters, homeowners, condos, apartments, and small businesses. Availability depends on your utility and project capacity.
              </dd>
            </div>
          </FadeIn>
          <FadeIn delay={240}>
            <div>
              <dt className="font-semibold text-navy text-lg">How is my information used?</dt>
              <dd className="mt-2 text-slate-600 leading-relaxed">
                Your information is used only to check eligibility and support enrollment. It is never sold for marketing.
              </dd>
            </div>
          </FadeIn>
          <FadeIn delay={280}>
            <div>
              <dt className="font-semibold text-navy text-lg">What happens after I check eligibility?</dt>
              <dd className="mt-2 text-slate-600 leading-relaxed">
                If you&apos;re eligible, you&apos;ll receive the project details and enrollment information. You&apos;ll always be able to review the terms before deciding to proceed.
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
