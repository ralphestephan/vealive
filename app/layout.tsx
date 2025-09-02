// app/layout.tsx (RootLayout)
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import { SITE } from "@/lib/site";

const poppins = Poppins({ subsets: ["latin"], weight: ["700"] });

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
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/solutions", label: "Solutions" },
    { href: "/ecommerce", label: "Store" },
    { href: "/insights", label: "IoT Insights" },
    { href: "/homedome", label: "Smart Dome" },
    { href: "/faqs", label: "FAQ" },
  ];

  return (
    <html lang="en" className={poppins.className}>
      {/* restore default dark text for body */}
      <body className="min-h-screen text-zinc-800 antialiased overflow-x-hidden">
        {/* HEADER */}
        <header className="sticky top-0 z-50">
          {/* gradient accent line */}
          <div className="h-[3px] bg-gradient-to-r from-brand-blue via-brand-green to-emerald-400" />

          {/* dark nav only */}
          <div className="backdrop-blur supports-[backdrop-filter]:bg-zinc-700/70 bg-zinc-900/90 border-b border-white/10 text-zinc-100">
            <nav className="mx-auto max-w-6xl px-4">
              {/* Desktop */}
              <div className="hidden md:flex h-20 items-center justify-between">
                <Link href="/" className="inline-flex items-center gap-3">
                  <Image
                    src="/images/logo.png"
                    alt="Vealive"
                    width={240}
                    height={80}
                    className="h-14 md:h-20 w-auto"
                    priority
                  />
                </Link>

                <ul className="flex items-center gap-6 text-sm font-medium">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="hover:text-white transition"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 hover:border-white/30 transition"
                >
                  Let’s talk →
                </Link>
              </div>

              {/* Mobile */}
              <div className="md:hidden h-16 flex items-center justify-between">
                <Link href="/" className="inline-flex items-center gap-2">
                  <Image
                    src="/images/logo.png"
                    alt="Vealive"
                    width={200}
                    height={70}
                    className="h-12 w-auto"
                    priority
                  />
                </Link>

                <details className="relative">
                  <summary className="list-none cursor-pointer rounded-lg px-3 py-2 border border-white/10 bg-white/10 hover:bg-white/20 text-sm">
                    Menu
                  </summary>
                  <div className="absolute right-0 mt-2 w-60 rounded-xl border border-white/10 bg-zinc-900/95 backdrop-blur p-2 shadow-lg">
                    <ul className="divide-y divide-white/10">
                      {links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="block px-4 py-2 hover:bg-white/10 rounded-md"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="p-2">
                      <Link
                        href="/contact"
                        className="block text-center rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
                      >
                        Let’s talk
                      </Link>
                    </div>
                  </div>
                </details>
              </div>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
