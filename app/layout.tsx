// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import { SITE } from "@/lib/site";
import BackToTopFab from "@/components/ui/BackToTopFab";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Header from "@/components/Header";

const poppins = Poppins({ subsets: ["latin"], display: "swap", variable: "--font-poppins", weight: ["700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: SITE.name,
    template: `%s | VeaLive360`,
  },
  description: SITE.description,
  keywords: Array.from(SITE.keywords),
  openGraph: {
    type: "website",
    url: SITE.baseUrl,
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.socials.twitter,
    creator: SITE.socials.twitter,
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: SITE.baseUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      
      <body className="min-h-screen text-zinc-800 antialiased overflow-x-hidden">

        <Header />
        
        <ScrollReveal />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <BackToTopFab insetClass="bottom-6 right-6 sm:bottom-8 sm:right-8" size={56} superAt={98} />
        <SiteFooter />
      </body>
    </html>
  );
}
