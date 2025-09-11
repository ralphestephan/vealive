"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUp, Rocket } from "lucide-react";

type Props = {
  insetClass?: string;                 // e.g. "bottom-20 right-6 sm:bottom-24 sm:right-8"
  size?: number;                       // px
  superAt?: number;                    // % scrolled to enter "super" mode
  label?: string;                      // a11y label
  avoidFooterSelector?: string | null; // footer to avoid
  maxLiftPx?: number;                  // <-- NEW: clamp how high the FAB can lift
};

export default function BackToTopFab({
  insetClass = "bottom-20 right-6 sm:bottom-24 sm:right-8",
  size = 56,
  superAt = 98,
  label = "Back to top",
  avoidFooterSelector = "#site-footer",
  maxLiftPx = 220, // sensible default so it won't collide with the navbar
}: Props) {
  const [progress, setProgress] = useState(0); // 0..100
  const [isSuper, setIsSuper] = useState(false);
  const [lift, setLift] = useState(0);         // translateY up when footer overlaps (px)
  const btnRef = useRef<HTMLButtonElement>(null);
  const foRef = useRef<Element | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const computeProgress = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    return Math.max(0, Math.min(100, pct));
  }, []);

  const updateFooterLift = useCallback(() => {
    if (!foRef.current) return setLift(0);
    const rect = (foRef.current as HTMLElement).getBoundingClientRect();

    // overlap of footer with bottom of viewport
    const overlap = Math.max(0, window.innerHeight - rect.top);

    // 12px margin + iOS safe-area inset
    const safePad =
      12 +
      (typeof window !== "undefined"
        ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--sat-safe-bottom") || "0")
        : 0);

    // clamp to avoid colliding with header/nav
    const desired = overlap > 0 ? overlap + safePad : 0;
    setLift(Math.min(desired, maxLiftPx));
  }, [maxLiftPx]);

  useEffect(() => {
    // write a CSS var for safe-area once
    if (typeof window !== "undefined") {
      const safe = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue("padding-bottom")
          .replace("px", "")
      );
      // fallback to env(safe-area-inset-bottom)
      document.documentElement.style.setProperty(
        "--sat-safe-bottom",
        String((window as any).visualViewport ? 0 : 0)
      );
    }
  }, []);

  useEffect(() => {
    let raf = 0;

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const pct = computeProgress();
        setProgress(pct);
        setIsSuper(pct >= superAt);
        updateFooterLift();
      });
    };

    if (avoidFooterSelector) {
      foRef.current = document.querySelector(avoidFooterSelector);
    }

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [computeProgress, superAt, avoidFooterSelector, updateFooterLift]);

  const onClick = () => {
    const behavior = prefersReducedMotion ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior: behavior as ScrollBehavior });
  };

  // SVG circular progress
  const R = (size - 8) / 2;
  const C = 2 * Math.PI * R;
  const strokeDashoffset = C - (progress / 100) * C;

  return (
    <div
      className={["fixed z-50 isolate pointer-events-none", insetClass].join(" ")}
      style={{ transform: `translateY(-${lift}px)` }}
    >
      <button
        ref={btnRef}
        onClick={onClick}
        aria-label={label}
        title={label}
        className={[
          "relative rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60",
          "bg-white/90 backdrop-blur border border-zinc-200",
          "hover:shadow-xl",
          prefersReducedMotion ? "" : "transition-all duration-300",
          isSuper ? "scale-110 shadow-2xl ring-1 ring-brand-green/30" : "scale-100",
          "group pointer-events-auto",
        ].join(" ")}
        style={{ width: size, height: size }}
      >
        {/* progress ring */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0"
          aria-hidden
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={R}
            className="text-transparent"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <defs>
            <linearGradient id="fabGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--tw-gradient-from, #3b82f6)" />
              <stop offset="100%" stopColor="var(--tw-gradient-to, #10b981)" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={R}
            stroke="url(#fabGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: C,
              strokeDashoffset,
              transition: prefersReducedMotion
                ? undefined
                : "stroke-dashoffset 200ms ease-out",
            }}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>

        {/* icon */}
        <span
          className={[
            "relative inline-flex items-center justify-center",
            "text-zinc-900",
            prefersReducedMotion ? "" : "transition-transform duration-300",
            isSuper ? "scale-110" : "scale-100",
          ].join(" ")}
          style={{ width: size, height: size }}
        >
          {isSuper ? (
            <Rocket
              className={[
                "w-5 h-5",
                prefersReducedMotion ? "" : "animate-pulse",
                "text-brand-green",
              ].join(" ")}
              aria-hidden
            />
          ) : (
            <ArrowUp className="w-5 h-5 text-zinc-900" aria-hidden />
          )}
        </span>
      </button>
    </div>
  );
}
