import Link from "next/link";

export function SecondaryCta() {
  return (
    <section className="py-24 bg-slate-50" aria-labelledby="secondary-cta-heading">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2
          id="secondary-cta-heading"
          className="font-serif text-2xl font-semibold tracking-tight text-navy sm:text-3xl"
        >
          Ready to check eligibility?
        </h2>
        <p className="mt-2 text-slate-600">
          Takes less than 30 seconds.
        </p>
        <p className="mt-6">
          <Link
            href="/#check-eligibility"
            className="inline-block rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-navy shadow-lg transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-white"
          >
            Check My Eligibility →
          </Link>
        </p>
      </div>
    </section>
  );
}
