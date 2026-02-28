import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Northstar Energy Partners | Maryland Community Solar Eligibility & Bill Credits",
    template: "%s",
  },
  description:
    "Lower your electric bill with community solar in Maryland. No panels, no installation—just bill credits from a local solar farm. Check eligibility for BGE, Pepco, SMECO, Delmarva & Potomac Edison.",
  openGraph: {
    title: "Northstar Energy Partners | Maryland Community Solar Eligibility & Bill Credits",
    description:
      "Lower your electric bill with community solar in Maryland. No panels, no installation—just bill credits. Check eligibility for BGE, Pepco, SMECO, Delmarva & Potomac Edison.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Northstar Energy Partners — Maryland Community Solar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northstar Energy Partners | Maryland Community Solar Eligibility & Bill Credits",
    description:
      "Lower your electric bill with community solar in Maryland. No panels, no installation—just bill credits. Check eligibility in under 30 seconds.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
