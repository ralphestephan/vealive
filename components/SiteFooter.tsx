// components/SiteFooter.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Youtube, MessageCircle } from "lucide-react";

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
    ["Book a consultation", "/contact"],
    ["WhatsApp", "ttps://wa.me/96181632241"],
    ["Email us", "mailto:hello@metalife.com"],
  ];

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  return (
    <footer className="relative border-t border-zinc-100 bg-white overflow-x-clip">
      {/* soft background wash + glow accents */}
      <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
      <div className="pointer-events-none absolute -top-16 -left-10 w-64 h-64 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-10 w-64 h-64 rounded-full bg-brand-green/10 blur-3xl" />

      {/* upper */}
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* brand */}
        <div>
          <Link href="/" className="inline-flex items-center">
            {/* keep <img> if your logo is not under next/image domain config */}
            <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
          </Link>
          <p className="text-zinc-600 mt-3 max-w-[36ch]">
            Smart living made simple—design, integration, and support.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Made in Beirut
            </span>
            <a
              href="ttps://wa.me/96181632241"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp
            </a>
          </div>

          {/* socials */}
          <div className="mt-6 flex items-center gap-3">
            <a aria-label="Instagram" href="#" className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition">
              <Instagram className="h-4 w-4" />
            </a>
            <a aria-label="Facebook" href="#" className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition">
              <Facebook className="h-4 w-4" />
            </a>
            <a aria-label="LinkedIn" href="#" className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition">
              <Linkedin className="h-4 w-4" />
            </a>
            <a aria-label="YouTube" href="#" className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* explore */}
        <nav aria-label="Explore">
          <h4 className="font-semibold">Explore</h4>
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

        {/* helpful */}
        <nav aria-label="Helpful">
          <h4 className="font-semibold">Helpful</h4>
          <ul className="mt-3 space-y-2">
            {helpful.map(([label, href]) => (
              <li key={label}>
                <a href={href} className="text-zinc-700 hover:underline" target={href.startsWith("http") ? "_blank" : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* newsletter */}
        <div>
          <h4 className="font-semibold">Stay in the loop</h4>
          <p className="mt-2 text-zinc-600 text-sm">Short, useful updates. No spam—ever.</p>

 <form
    className="mt-4 flex flex-col sm:flex-row gap-2"
    onSubmit={async (e) => { /* unchanged */ }}
  >
    {/* pill input */}
    <div className="flex w-full items-center rounded-full border border-zinc-200 overflow-hidden">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="min-w-0 flex-1 px-4 py-2 outline-none"
      />
      <button
        disabled={status === "loading"}
        className="shrink-0 px-5 py-2 bg-brand-blue text-white font-semibold disabled:opacity-60"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
    </div>

    <div aria-live="polite" className={`text-sm ${status === "ok" ? "text-brand-green" : status === "err" ? "text-red-600" : "text-zinc-500"}`}>
      {msg}
    </div>
  </form>
        </div>
      </div>

      {/* lower */}
      <div className="border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500">
          <div>© {new Date().getFullYear()} MetaLife • All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <a href="#top" className="hover:underline">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
