"use client";

import { useRef } from "react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-screen items-center overflow-hidden border-t border-white/10 px-6 py-24 md:px-10"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section label */}
        <p className="mb-16 text-[10px] uppercase tracking-[0.2em] text-white/40 md:text-xs">
          05 / Contact
        </p>

        {/* Main content */}
        <div className="grid gap-16 md:grid-cols-[1fr_320px] md:items-end">
          {/* Heading */}
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.15em] text-white/40">
              Have something in mind?
            </p>

            <h2 className="max-w-6xl text-[15vw] font-medium leading-[0.78] tracking-[-0.08em] md:text-[10vw]">
              LET&apos;S
              <br />
              TALK<span className="text-white/30">.</span>
            </h2>
          </div>

          {/* Contact links */}
          <div className="flex w-full max-w-[320px] flex-col border-t border-white/10 md:-translate-x-40">
            <a
              href="mailto:kishores070607@gmail.com"
              className="group/link flex items-center justify-between border-b border-white/10 py-5 text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:px-3"
            >
              <span>Email</span>

              <span className="text-white/40 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:text-white">
                ↗
              </span>
            </a>

            <a
              href="https://github.com/kishores070607-blip"
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center justify-between border-b border-white/10 py-5 text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:px-3"
            >
              <span>GitHub</span>

              <span className="text-white/40 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:text-white">
                ↗
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/kishore-s-98544837b/"
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center justify-between border-b border-white/10 py-5 text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:px-3"
            >
              <span>LinkedIn</span>

              <span className="text-white/40 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:text-white">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 flex flex-col justify-between gap-4 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.2em] text-white/30 md:flex-row md:text-xs">
          <span>Available for interesting things</span>

          <span>© 2026 Kishore</span>
        </div>
      </div>
    </section>
  );
}