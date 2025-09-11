"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  watch?: string;
  align?: "center" | "left";
  widthClass?: string;
  height?: number;
  className?: string;
  gradientClass?: string;
  minProgress?: number;

};



export default function DynamicUnderline({
  watch,
  align = "center",
  widthClass = "w-20",
  height = 4,
  className = "",
  gradientClass = "from-brand-blue to-brand-green",
  minProgress = 0.15,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(minProgress);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const track = trackRef.current;
    const target =
      (watch ? document.querySelector(watch) : null) ??
      track?.closest("section") ??
      null;

    if (!track || !target) return;

    let raf = 0;

    const update = () => {
      const rect = (target as HTMLElement).getBoundingClientRect();
      const vh = window.innerHeight;

      // when to start/finish filling
      const start = vh * 0.9;
      const end = -(rect.height * 0.2);

      const t = (start - rect.top) / (start - end);
      const clamped = Math.max(minProgress, Math.min(1, t));
      setProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [watch, minProgress]);

  return (
    <div
      ref={trackRef}
      className={`${align === "center" ? "mx-auto" : ""} ${widthClass} relative rounded-full ${className}`}
      style={{ height }}
      aria-hidden
    >
      {/* transparent track; animated gradient fill */}
      <div
        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradientClass} will-change-[width] ${
          prefersReducedMotion ? "" : "transition-all duration-300 ease-out"
        }`}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
