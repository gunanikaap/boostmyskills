"use client";

import { useRef } from "react";
import ProgramCard from "@/components/cards/ProgramCard";
import type { Program } from "@/lib/types";

/**
 * Horizontal card carousel matching the live "Our Trending Micro-programmes"
 * section: scroll-snap track with round green prev/next buttons (live
 * .carousel-btn, #079845) shown on larger screens.
 */
export default function ProgramCarousel({ programs }: { programs: Program[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 52 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto pb-8"
      >
        {programs.map((program) => (
          <div
            key={program.slug}
            data-card
            className="mr-8 w-[88%] max-w-[500px] shrink-0 snap-start md:mr-[52px] md:w-[500px]"
          >
            <ProgramCard program={program} variant="home" />
          </div>
        ))}
      </div>

      {/* Round green arrow controls (desktop), like the live carousel. */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-between px-8 lg:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous micro-programmes"
          className="pointer-events-auto -ml-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white opacity-90 transition hover:opacity-100"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next micro-programmes"
          className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white opacity-90 transition hover:opacity-100"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
