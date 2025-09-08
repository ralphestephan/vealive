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
    <footer className="relative border-t border-zinc-100 bg-white overflow-x-clip">
      {/* background */}
      <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
      <div className="pointer-events-none absolute -top-16 -left-10 w-64 h-64 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-10 w-64 h-64 rounded-full bg-brand-green/10 blur-3xl" />

      {/* upper */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">
        {/* brand */}
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center">
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
        <nav aria-label="Explore" className="md:col-span-1">
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

{/* RIGHT SIDE: Contact + Info + Newsletter in a nested grid */}
<div className="md:col-start-4 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Contact */}
  <nav aria-label="Contact">
    <h4 className="font-semibold">Contact</h4>
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
    <h4 className="font-semibold">Info</h4>
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

  {/* Newsletter: row 2, span both inner columns (flush under Contact+Info) */}
  <div className="md:col-span-2 md:row-start-2">
    <h4 className="font-semibold">Stay in the loop</h4>
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
    >
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
        {status === "loading" ? "…" : "Subscribe"}
      </button>
    </form>

    <div
      aria-live="polite"
      className={`mt-1 text-sm ${
        status === "ok" ? "text-brand-green" : status === "err" ? "text-red-600" : "text-zinc-500"
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
          <div>© {new Date().getFullYear()} MetaLife • All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <a href="#top" className="hover:underline">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
