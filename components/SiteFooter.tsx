// components/SiteFooter.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MessageCircle,
  MapPin,
  Phone,
  X as CloseIcon,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

// Minimal brand marks (inline SVGs)
function XLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.146 3H21l-7.47 8.54L22.5 21h-6.03l-4.72-5.77L5.5 21H3l7.9-9.02L1.5 3h6.03l4.33 5.29L18.146 3Z"/>
    </svg>
  );
}



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

  // Mobile Subscribe modal state
  const [showSub, setShowSub] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // lock body scroll when modal opens
  useEffect(() => {
    if (showSub) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // move focus to close button for accessibility
      closeBtnRef.current?.focus();
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showSub]);

  // submit handler (shared)
  async function handleSubscribeSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    try {
      setStatus("loading");
      setMsg("");
  
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      if (!res.ok) throw new Error("Request failed");
  
      setStatus("ok");
      setMsg("Thanks! We’ll be in touch soon.");
      setEmail("");
    } catch {
      setStatus("err");
      setMsg("Subscription failed. Please try again.");
    }
  }
  

  return (
    <footer
      id="site-footer"
      className="relative border-t border-zinc-100 bg-white overflow-x-clip"
      aria-labelledby="footer-heading"
    >
      {/* subtle wash */}
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

      {/* UPPER: mobile=2 cols (compact), desktop=5 cols */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10">
        {/* BRAND */}
        <div className="col-span-2 md:col-span-2">
          <h2 id="footer-heading" className="sr-only">Footer</h2>
          <Link href="/" className="inline-flex items-center" aria-label="VeaLive home">
            <img src="/images/logo.png" alt="VeaLive logo" className="h-9 w-auto md:h-12" />
          </Link>
          <p className="text-zinc-600 mt-2 md:mt-3 max-w-[36ch] text-sm md:text-base leading-6">
            Smart living made simple—design, integration, and support.
          </p>

          <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-2">
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

{/* Socials */}
<div className="mt-4 md:mt-6 flex flex-wrap items-center gap-2">
  {[
    { label: "Instagram", href: "https://www.instagram.com/vealive360", Icon: Instagram },
    { label: "Facebook",  href: "https://www.facebook.com/Vealive3d",  Icon: Facebook  },
    { label: "LinkedIn",  href: "https://lb.linkedin.com/company/vealive-360?trk=public_post_feed-actor-name", Icon: Linkedin },
    { label: "YouTube",   href: "https://www.youtube.com/@vealive3606", Icon: Youtube  },
    // New ones:
    { label: "X",        href: "https://x.com/Vealive326022", Icon: XLogo },
    { label: "TikTok",   href: "https://tiktok.com/@vealive360?lang=en", Icon: FaTiktok },
  ].map(({ label, href, Icon }) => (
    <a
      key={label}
      aria-label={label}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-grid place-items-center size-9 rounded-full border border-zinc-200 hover:border-brand-green transition"
    >
      <Icon className="h-4 w-4" />
    </a>
  ))}
</div>

        </div>

        {/* EXPLORE */}
        <nav aria-label="Explore" className="col-span-1 md:col-span-1">
          <h4 className="font-semibold text-zinc-900 tracking-wide">Explore</h4>
          <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
          {/* mobile: 2-col dense grid; desktop: list */}
          <ul className="mt-2 md:mt-3 grid grid-cols-2 gap-x-4 gap-y-1 md:block md:space-y-2 text-sm md:text-base">
            {links.map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="text-zinc-700 hover:underline">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CONTACT + INFO + NEWSLETTER */}
        <div className="col-span-1 md:col-start-4 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Contact */}
          <nav aria-label="Contact">
            <h4 className="font-semibold text-zinc-900 tracking-wide">Contact</h4>
            <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
            <ul className="mt-2 md:mt-3 grid grid-cols-2 gap-x-4 gap-y-1 md:block md:space-y-2 text-sm md:text-base">
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

          {/* Info (condensed) */}
          <address className="not-italic">
            <h4 className="font-semibold text-zinc-900 tracking-wide">Info</h4>
            <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
            <div className="mt-2 md:mt-3 space-y-2 md:space-y-3 text-zinc-700 text-sm md:text-base leading-6">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-zinc-500" aria-hidden />
                <span className="whitespace-nowrap md:whitespace-normal">Cielo Tower, Saray — Beirut, LB</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-zinc-500" aria-hidden />
                <a href="tel:+96181632241" className="hover:underline">+961 81 632 241</a>
              </div>
            </div>
          </address>

          {/* Newsletter: mobile popup trigger + desktop form */}
          <div className="md:col-span-2 md:row-start-2">
            {/* Mobile popup trigger */}
            <div className="sm:hidden mt-2">
              <button
                onClick={() => setShowSub(true)}
                className="inline-flex items-center px-3 py-2 rounded-full border border-zinc-300 text-sm font-semibold hover:border-brand-blue"
                aria-haspopup="dialog"
                aria-controls="mobile-subscribe"
              >
                Subscribe to updates
              </button>
            </div>

            {/* Desktop inline form */}
            <div className="hidden sm:block" id="newsletter">
              <h4 className="font-semibold text-zinc-900 tracking-wide">Stay in the loop</h4>
              <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
              <p className="mt-1 text-sm text-zinc-600">Short, useful updates. No spam—ever.</p>

              <form
                className="mt-3 flex w-full items-stretch rounded-full border border-zinc-200 overflow-hidden"
                onSubmit={handleSubscribeSubmit}
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
                  status === "ok" ? "text-brand-green" : status === "err" ? "text-red-600" : "text-zinc-500"
                }`}
              >
                {msg}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER */}
      <div className="border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500">
          <div>© {new Date().getFullYear()} VeaLive • All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </div>
        </div>
      </div>

      {/* MOBILE SUBSCRIBE MODAL */}
      {showSub && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-subscribe-title"
          id="mobile-subscribe"
          className="sm:hidden fixed inset-0 z-[100] flex items-end"
          onKeyDown={(e) => e.key === "Escape" && setShowSub(false)}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setShowSub(false)}
            aria-hidden
          />
          {/* Sheet */}
          <div className="relative w-full bg-white rounded-t-2xl shadow-2xl p-5 border border-zinc-200">
            <div className="mx-auto w-12 h-1.5 rounded-full bg-zinc-200 mb-4" aria-hidden />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/images/logo.png" alt="VeaLive logo" className="h-8 w-auto" />
                <h3 id="mobile-subscribe-title" className="text-lg font-semibold">
                  Stay in the loop
                </h3>
              </div>
              <button
                ref={closeBtnRef}
                className="p-2 rounded-full hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                onClick={() => setShowSub(false)}
                aria-label="Close"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-2 text-sm text-zinc-600">
              Short, useful updates. No spam—ever.
            </p>

            <form className="mt-4 space-y-3" onSubmit={handleSubscribeSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                aria-label="Email address"
                autoComplete="email"
              />
              <button
                disabled={status === "loading"}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-brand-blue to-brand-green text-white font-semibold disabled:opacity-60"
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>

            <div
              aria-live="polite"
              className={`mt-2 text-sm ${
                status === "ok" ? "text-brand-green" : status === "err" ? "text-red-600" : "text-zinc-500"
              }`}
            >
              {msg}
            </div>

            <div className="mt-3 text-[11px] text-zinc-500">
              By subscribing you agree to our{" "}
              <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
