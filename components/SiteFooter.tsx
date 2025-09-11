// components/SiteFooter.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MessageCircle,
  MapPin,
  Phone,
} from "lucide-react";

export default function SiteFooter() {
  const links: [string, string][] = [
    ["About", "/about"],
    ["Solutions", "/solutions"],
    ["Smart Dome", "/homedome"],
    ["IoT Insights", "/insights"],
    ["FAQ", "/faqs"],
    ["Contact", "/contact"],
    ["Shop", "/ecommerce"],
  ];

  const helpful: [string, string][] = [
    ["Support", "/contact"],
    ["WhatsApp", "https://wa.me/96181632241"],
    ["Email us", "mailto:mwazzan@gmail.com"],
  ];

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  return (
    <footer
      id="site-footer"
      className="relative border-t border-zinc-100 bg-white overflow-x-clip"
      aria-labelledby="footer-heading"
    >
      {/* contained soft wash that fades at edges */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-blue/[0.06] via-brand-green/[0.06] to-transparent"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />
      <div className="pointer-events-none absolute -top-16 -left-10 w-64 h-64 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-10 w-64 h-64 rounded-full bg-brand-green/10 blur-3xl" />

      {/* upper */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">
        {/* brand */}
        <div className="md:col-span-2">
          <h2 id="footer-heading" className="sr-only">Footer</h2>
          <Link href="/" className="inline-flex items-center" aria-label="VeaLive home">
            <img src="/images/logo.png" alt="VeaLive logo" className="h-10 w-auto md:h-12" />
          </Link>
          <p className="text-zinc-600 mt-3 max-w-[36ch]">
            Smart living made simple—design, integration, and support.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Made in Beirut
            </span>
            <a
              href="https://wa.me/96181632241"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp
            </a>
          </div>

          {/* socials – button micro-interactions from globals */}
          <div className="mt-6 flex items-center gap-3">
            <a aria-label="Instagram" href="#" className="btn btn-ghost p-2 rounded-full !px-2 !py-2">
              <Instagram className="h-4 w-4" />
            </a>
            <a aria-label="Facebook" href="#" className="btn btn-ghost p-2 rounded-full !px-2 !py-2">
              <Facebook className="h-4 w-4" />
            </a>
            <a aria-label="LinkedIn" href="#" className="btn btn-ghost p-2 rounded-full !px-2 !py-2">
              <Linkedin className="h-4 w-4" />
            </a>
            <a aria-label="YouTube" href="#" className="btn btn-ghost p-2 rounded-full !px-2 !py-2">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* explore */}
        <nav aria-label="Explore" className="md:col-span-1">
          <h4 className="font-semibold text-zinc-900 tracking-wide">Explore</h4>
          <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
          <ul className="mt-3 space-y-2">
            {links.map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="text-zinc-700 hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT SIDE: Contact + Info + Newsletter */}
        <div className="md:col-start-4 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact */}
          <nav aria-label="Contact">
            <h4 className="font-semibold text-zinc-900 tracking-wide">Contact</h4>
            <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
            <ul className="mt-3 space-y-2">
              {helpful.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-zinc-700 hover:underline"
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Info */}
          <address className="not-italic">
            <h4 className="font-semibold text-zinc-900 tracking-wide">Info</h4>
            <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
            <div className="mt-3 space-y-3 text-zinc-700">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-zinc-500" aria-hidden />
                <span>
                  Offices, Cielo Tower, Saray,<br />Beirut, Lebanon
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-zinc-500" aria-hidden />
                <a href="tel:+96181632241" className="hover:underline">
                  +961 81 632 241
                </a>
              </div>
            </div>
          </address>

          {/* Newsletter (spans) */}
          <div className="md:col-span-2 md:row-start-2">
            <h4 className="font-semibold text-zinc-900 tracking-wide">Stay in the loop</h4>
            <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
            <p className="mt-1 text-sm text-zinc-600">Short, useful updates. No spam—ever.</p>

            <form
              className="mt-3 flex w-full items-stretch rounded-full border border-zinc-200 overflow-hidden"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  setStatus("loading");
                  setMsg("");
                  await new Promise((r) => setTimeout(r, 600));
                  setStatus("ok");
                  setMsg("Thanks for subscribing!");
                  setEmail("");
                } catch {
                  setStatus("err");
                  setMsg("Subscription failed. Please try again.");
                }
              }}
              aria-label="Newsletter subscription"
            >
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="min-w-0 flex-1 px-4 py-2 outline-none"
                aria-label="Email address"
                autoComplete="email"
              />
              <button
                disabled={status === "loading"}
                className="btn btn-primary shrink-0 rounded-none rounded-r-full !px-5 !py-2 disabled:opacity-60"
              >
                {status === "loading" ? "…" : "Subscribe"}
              </button>
            </form>

            <div
              aria-live="polite"
              className={`mt-1 text-sm ${
                status === "ok"
                  ? "text-brand-green"
                  : status === "err"
                  ? "text-red-600"
                  : "text-zinc-500"
              }`}
            >
              {msg}
            </div>
          </div>
        </div>
      </div>

      {/* lower */}
      <div className="border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500">
          <div>© {new Date().getFullYear()} VeaLive • All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
