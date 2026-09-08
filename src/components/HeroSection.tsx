"use client";

import { useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { site } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";

const HeroScene = dynamic(() => import("@/components/canvas/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,108,0.12),_transparent_58%)]" />
  ),
});

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative flex min-h-dvh flex-col overflow-hidden px-5 pb-28 pt-24 md:px-10 md:pb-16 md:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 md:inset-y-0 md:left-[28%] md:right-0">
          <HeroScene />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0B0A]/20 via-transparent to-[#0C0B0A] md:bg-gradient-to-r md:from-[#0C0B0A] md:via-[#0C0B0A]/55 md:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end md:justify-center">
        <p data-hero className="mb-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[#C9A86C] md:text-[11px]">
          {site.role} · {site.location}
        </p>

        <h1 data-hero className="font-display text-[18vw] font-semibold leading-[0.86] tracking-[-0.04em] text-[#F4EFE6] sm:text-[14vw] md:text-[8.4vw] lg:text-[7.4rem]">
          KISHORE
          <span className="text-[#C9A86C]"> S</span>
        </h1>

        <p data-hero className="mt-8 max-w-xl text-[15px] leading-relaxed text-[#9A9184] md:mt-10 md:text-lg">
          {site.tagline}
        </p>
        <p data-hero className="mt-3 max-w-lg text-sm leading-relaxed text-[#9A9184]/80 md:text-[15px]">
          {site.summary}
        </p>

        <div data-hero className="mt-10 flex flex-wrap items-center gap-5 md:mt-14">
          <a
            href="#work"
            className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[#C9A86C]/40 bg-[#C9A86C] px-6 text-[11px] uppercase tracking-[0.22em] text-[#0C0B0A] transition-transform duration-300 hover:scale-[1.03]"
          >
            Selected work
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#C9A86C]"
          >
            Start a conversation
          </a>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 hidden w-full max-w-7xl items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#9A9184] md:flex">
        <span>Scroll to enter the work</span>
        <span className="inline-flex items-center gap-2">
          <ArrowDown size={14} strokeWidth={1.5} />
          01 / 05
        </span>
      </div>
    </section>
  );
}
