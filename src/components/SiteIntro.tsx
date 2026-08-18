"use client";

import IntroAnimation from "./IntroAnimation";

export default function SiteIntro() {
  return (
    <section
      id="intro"
      className="site-grid fixed inset-0 z-[100] flex min-h-screen flex-col overflow-hidden bg-[#0a0a0a] px-6 py-6 md:px-10 md:py-8"
    >
      <IntroAnimation />

      {/* Top metadata */}
      <div className="intro-meta flex items-start justify-between text-[9px] uppercase tracking-[0.18em] text-white/50 sm:text-[10px] md:text-xs">
        <div>
          <p>KS / 01</p>
          <p className="mt-1">ECSE</p>
        </div>

        <div className="text-right">
          <p>CHENNAI</p>
          <p className="mt-1">INDIA</p>
        </div>
      </div>

      {/* Main identity */}
      <div className="flex flex-1 flex-col justify-center md:justify-end md:pb-[10vh]">
        <p className="intro-label mb-5 text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-xs md:mb-6 md:text-sm">
          Personal Interface
        </p>

        <h1 className="intro-title whitespace-nowrap text-[19vw] font-medium leading-[0.78] tracking-[-0.08em] sm:text-[17vw] md:text-[15vw]">
          KISHORE
        </h1>
      </div>

      {/* Bottom */}
      <div className="intro-footer flex flex-col gap-8 pb-2 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[240px] text-[10px] leading-[1.6] text-white/50 sm:text-xs md:max-w-xs md:text-sm">
          <p>Building things I want to understand.</p>
          <p>Exploring technology through making.</p>
        </div>

        <button
          id="enter-button"
          type="button"
          className="group flex w-fit touch-manipulation items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 hover:text-white active:text-white sm:text-[10px] md:text-xs"
        >
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute h-3 w-3 rounded-full border border-white/40 transition-transform duration-500 group-hover:scale-[1.7] group-active:scale-[1.7]" />

            <span className="h-1.5 w-1.5 rounded-full bg-white transition-transform duration-300 group-hover:scale-75 group-active:scale-75" />
          </span>

          <span>Enter</span>
        </button>
      </div>
    </section>
  );
}