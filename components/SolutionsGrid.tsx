// components/SolutionsGrid.tsx
"use client";

import { useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SolutionCard from "@/components/SolutionCard";
import solutions from "@/data/solutions";

const GAP = 24;

export default function SolutionsGrid() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = useCallback((dir: "prev" | "next") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const firstCard = scroller.querySelector<HTMLElement>("[data-card]");
    const cardW = firstCard?.offsetWidth ?? 340;
    const delta = (cardW + GAP) * (dir === "next" ? 1 : -1);
    scroller.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent z-10" />

      <section
        aria-label="Solutions carousel"
        ref={scrollerRef}
        className="no-scrollbar overflow-x-auto"
        style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex gap-6 pr-4 items-stretch">
          {solutions.map((s) => (
            <div key={s.slug} data-card className="shrink-0 w-[280px] sm:w-[340px] md:w-[380px]">
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

      <div className="mt-3 flex justify-end gap-2">
        <button
          aria-label="Previous"
          onClick={() => scrollByAmount("prev")}
          className="h-10 w-10 rounded-full bg-white/95 border border-zinc-200 shadow-sm backdrop-blur flex items-center justify-center hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={() => scrollByAmount("next")}
          className="h-10 w-10 rounded-full bg-white/95 border border-zinc-200 shadow-sm backdrop-blur flex items-center justify-center hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
