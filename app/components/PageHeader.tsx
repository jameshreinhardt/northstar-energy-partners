import Link from "next/link";
import { Logo } from "./Logo";

/**
 * Shared header for subpages (how-it-works, faq, support, careers, partners).
 * Matches the homepage header styling: same height, max-width container, fonts/colors, spacing.
 */
export function PageHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Logo variant="light" href="/" />
        <Link
          href="/"
          className="text-base font-medium text-white/90 transition hover:text-gold-light"
        >
          Back to home
        </Link>
      </nav>
    </header>
  );
}
