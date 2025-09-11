"use client";

import { useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SolutionCard from "@/components/SolutionCard";
import solutions from "@/data/solutions";

const GAP = 24;

export default function SolutionsGrid() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) {
      el.classList.add("reveal-in");
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.classList.add("reveal-in");
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollByAmount = useCallback((dir: "prev" | "next") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const firstCard = scroller.querySelector<HTMLElement>("[data-card]");
    const cardW = firstCard?.offsetWidth ?? 340;
    const delta = (cardW + GAP) * (dir === "next" ? 1 : -1);
    scroller.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return (
    <div ref={wrapRef} className="relative reveal-base">
      <section
        aria-label="Solutions carousel"
        ref={scrollerRef}
        className="no-scrollbar overflow-x-auto scroll-smooth snap-x snap-mandatory pr-4"
        style={{
          WebkitOverflowScrolling: "touch",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
        }}
      >
        <div className="flex gap-6 items-stretch">
          {solutions.map((s) => (
            <div key={s.slug} data-card className="snap-start shrink-0 w-[280px] sm:w-[340px] md:w-[380px]">
              <SolutionCard
                slug={s.slug}
                title={s.heading}
                description={s.description}
                image={s.image}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="mt-4 flex justify-center gap-3">
        <button
          aria-label="Previous"
          onClick={() => scrollByAmount("prev")}
          className="h-10 w-10 rounded-full bg-white/95 border border-zinc-200 shadow-sm backdrop-blur
                     flex items-center justify-center hover:bg-white transition
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={() => scrollByAmount("next")}
          className="h-10 w-10 rounded-full bg-white/95 border border-zinc-200 shadow-sm backdrop-blur
                     flex items-center justify-center hover:bg-white transition
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
