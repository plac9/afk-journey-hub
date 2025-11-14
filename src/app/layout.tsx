import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnalyticsSnippet } from "@/components/AnalyticsSnippet";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://afkjourney.laclair.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AFK Journey Hub",
    template: "%s · AFK Journey Hub",
  },
  description:
    "Live hero spotlights, event trackers, and calculators for AFK Journey players.",
  openGraph: {
    title: "AFK Journey Hub",
    description:
      "Live hero spotlights, event trackers, and calculators for AFK Journey players.",
    siteName: "AFK Journey Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AFK Journey Hub",
    description:
      "Live hero spotlights, event trackers, and calculators for AFK Journey players.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <AnalyticsSnippet />
      </body>
    </html>
  );
}
