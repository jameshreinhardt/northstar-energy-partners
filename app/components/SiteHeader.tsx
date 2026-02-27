"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const navLinkClass =
  "hidden sm:block text-base font-medium text-white/90 transition hover:text-gold-light py-2 px-1 rounded focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-navy";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Logo variant="light" href="/" />
        <div className="flex items-center gap-x-6">
          {!isHome && (
            <Link
              href="/"
              className="text-sm font-medium text-white/80 transition hover:text-gold-light py-2 px-1 rounded focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-navy shrink-0"
            >
              Back to home
            </Link>
          )}
          <Link href="/how-it-works" className={navLinkClass}>
            How it Works
          </Link>
          <Link href="/#check-eligibility" className={navLinkClass}>
            Eligibility
          </Link>
          <Link href="/faq" className={navLinkClass}>
            FAQ
          </Link>
          <Link href="/support" className={navLinkClass}>
            Support
          </Link>
          <Link href="/careers" className={navLinkClass}>
            Careers
          </Link>
          <Link
            href="/#check-eligibility"
            className="rounded-lg bg-gold px-6 py-3 text-base font-semibold text-navy shadow-sm transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-navy shrink-0"
          >
            Check My Eligibility
          </Link>
          <Link
            href="/partners"
            className="text-base font-medium text-white/80 transition hover:text-gold-light py-2 px-1 rounded focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 focus:ring-offset-navy"
          >
            Partners
          </Link>
        </div>
      </nav>
    </header>
  );
}
