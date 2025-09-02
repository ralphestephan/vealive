// components/Reviews.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Star,
  CheckCircle2,
  Quote,
  Newspaper,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* =========================
   Types & Data
========================= */
type ReviewCategory = "Devices" | "Home Automation" | "Smart Dome";

type ReviewItem =
  | { type: "press"; quote: string; source: string }
  | {
      type: "review";
      quote: string;
      author: string;
      initials: string;
      category: ReviewCategory;
    };

const REVIEWS: ReviewItem[] = [
  // Devices (green)
  {
    type: "review",
    category: "Devices",
    quote:
      "The air-quality sensor + purifier routine just works. It kicks up a notch after cooking and settles quietly without us touching anything.",
    author: "Rami T.",
    initials: "RT",
  },
  {
    type: "review",
    category: "Devices",
    quote:
      "Door sensors + robot vacuum were the combo I didn’t know I needed — rainy-day entrances trigger a quick sweep automatically.",
    author: "Yasmin E.",
    initials: "YE",
  },
  // Home Automation (blue)
  {
    type: "review",
    category: "Home Automation",
    quote:
      "Lighting scenes follow our mornings and fade at night. We stopped arguing about switches — the home already feels a step ahead.",
    author: "Leila S.",
    initials: "LS",
  },
  {
    type: "review",
    category: "Home Automation",
    quote:
      "Voice, app, and wall panels finally in sync. We changed routines once and everything updated across the house.",
    author: "Nadia M.",
    initials: "NM",
  },
  // Smart Dome (purple)
  {
    type: "review",
    category: "Smart Dome",
    quote:
      "Our garden dome stays serene — auto-venting, glare control, and soft ambient lights. It became the favorite room instantly.",
    author: "Omar A.",
    initials: "OA",
  },
  {
    type: "review",
    category: "Smart Dome",
    quote:
      "We use it as a studio pod. Presence + temperature balance keeps sessions comfortable even on bright days.",
    author: "Maya K.",
    initials: "MK",
  },

  // More variety
  {
    type: "review",
    category: "Devices",
    quote:
      "The smart feeder learned our cat’s routine and weight changes. Portions adjust without me obsessing over it.",
    author: "Noor H.",
    initials: "NH",
  },
  {
    type: "review",
    category: "Home Automation",
    quote:
      "Support tuned the scenes after a week based on our actual usage. That follow-through made all the difference.",
    author: "Hassan R.",
    initials: "HR",
  },

  // Press (black panel)
  {
    type: "press",
    quote:
      "VeaLive turns ordinary rooms into responsive spaces with a rare mix of elegance and reliability.",
    source: "FUDOOL",
  },
  {
    type: "press",
    quote:
      "A thoughtful approach to local-first automation that prioritizes comfort over gimmicks.",
    source: "SMART LIVING REVIEW",
  },
];

function Stars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className="text-amber-500"
          strokeWidth={1.5}
          fill="currentColor"
        />
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-brand-blue to-brand-green text-white grid place-items-center text-sm font-bold shadow-sm"
      aria-hidden
    >
      {initials}
    </div>
  );
}

/* =========================
   Auto-rotate for press
========================= */
function useAutoRotate(enabled: boolean, length: number, delay = 4000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!enabled || length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), delay);
    return () => clearInterval(id);
  }, [enabled, length, delay]);
  return [index, setIndex] as const;
}

/* =========================
   Component
========================= */
export default function Reviews() {
  // split
  const reviews = useMemo(
    () =>
      REVIEWS.filter(
        (r): r is Extract<ReviewItem, { type: "review" }> =>
          r.type === "review"
      ),
    []
  );
  const press = useMemo(
    () =>
      REVIEWS.filter(
        (r): r is Extract<ReviewItem, { type: "press" }> => r.type === "press"
      ),
    []
  );

  // safe deterministic shuffle
  const shuffled = useMemo(() => {
    const arr = [...reviews];
    for (let i = arr.length - 1; i > 0; i--) {
      const seed = Math.abs(Math.sin(i * 9301 + 49297)) % 1;
      const j = Math.floor(seed * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [reviews]);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const [pressIndex, setPressIndex] = useAutoRotate(
    !prefersReduced,
    press.length,
    4000
  );

  // color theming per category
  const catClasses: Record<
    ReviewCategory,
    { card: string; textStrong: string; textSoft: string }
  > = {
    "Devices": {
      card:
        "bg-emerald-600 text-white border-emerald-700/30 shadow-[0_10px_30px_-12px_rgba(16,185,129,0.45)]",
      textStrong: "text-white",
      textSoft: "text-emerald-50/90",
    },
    "Home Automation": {
      card:
        "bg-sky-600 text-white border-sky-700/30 shadow-[0_10px_30px_-12px_rgba(14,165,233,0.45)]",
      textStrong: "text-white",
      textSoft: "text-sky-50/90",
    },
    "Smart Dome": {
      card:
        "bg-violet-600 text-white border-violet-700/30 shadow-[0_10px_30px_-12px_rgba(139,92,246,0.45)]",
      textStrong: "text-white",
      textSoft: "text-violet-50/90",
    },
  };

  return (
    <section className="py-20 relative">
      {/* soft colorful backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-blue/10 via-brand-green/10 to-emerald-100/20" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-blue/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-green/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/10 text-xs font-medium">
              Testimonials
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Loved in real homes & workplaces
              </span>
            </h2>
            <p className="mt-2 text-zinc-700">
              Real experiences across devices, whole-home automation, and our
              Smart Dome pods.
            </p>
            <span className="mt-4 block h-[3px] w-24 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2">
                <Stars size={18} />
                <span className="text-sm font-semibold text-zinc-800">
                  4.9 / 5
                </span>
              </div>
              <p className="text-xs text-zinc-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Verified
                clients
              </p>
            </div>
          </div>
        </div>

        {/* Mosaic grid: colored cards by category */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shuffled.map((r, i) => {
            const theme = catClasses[r.category];
            return (
              <figure
                key={i}
                className={[
                  "rounded-2xl border p-6",
                  theme.card,
                  i % 5 === 0 ? "lg:row-span-2" : "",
                  "hover:brightness-[1.05] transition",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <Stars />
                  <Quote className="opacity-70" size={18} />
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <Avatar initials={r.initials} />
                  <div>
                    <p className={`text-sm font-semibold ${theme.textStrong}`}>
                      {r.author}
                    </p>
                    <p className={`text-xs ${theme.textSoft}`}>{r.category}</p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Press carousel: black background */}
        {press.length > 0 && (
          <div className="mt-12 rounded-2xl border border-black/40 bg-black text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper className="h-5 w-5" />
                <p className="text-sm font-semibold">What the press says</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setPressIndex((i) => (i - 1 + press.length) % press.length)
                  }
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPressIndex((i) => (i + 1) % press.length)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
                  aria-label="Next quote"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative mt-4 h-32 overflow-hidden">
              {press.map((p, i) => (
                <figure
                  key={i}
                  className={`absolute inset-0 grid place-items-center text-center px-6 transition-opacity duration-700 ${
                    i === pressIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <blockquote className="text-lg md:text-xl leading-relaxed max-w-3xl">
                    “{p.quote}”
                  </blockquote>
                  <figcaption className="mt-3 text-xs tracking-wide text-white/70">
                    {p.source}
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {press.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPressIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === pressIndex ? "w-6 bg-white" : "w-3 bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Show press quote ${i + 1}`}
                />
              ))}
            </div>

            <p className="mt-3 text-center text-xs text-white/60">
              {prefersReduced
                ? "Use the arrows or dots to browse."
                : "Auto-playing — you can also use the arrows or dots."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
