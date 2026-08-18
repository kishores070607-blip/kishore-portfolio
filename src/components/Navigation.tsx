"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "HOME" },
  { id: "lab", label: "LAB" },
  { id: "journey", label: "JOURNEY" },
  { id: "stack", label: "STACK" },
  { id: "contact", label: "CONTACT" },
];

export default function Navigation() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Navigation starts completely hidden.
    const handleEntered = () => {
      setHasEntered(true);

      // Make absolutely sure we start at HOME.
      setActiveSection("home");
    };

    window.addEventListener("portfolio:entered", handleEntered);

    return () => {
      window.removeEventListener("portfolio:entered", handleEntered);
    };
  }, []);

  useEffect(() => {
    if (!hasEntered) return;

    const updateActiveSection = () => {
      const viewportHeight = window.innerHeight;

      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= viewportHeight * 0.5) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [hasEntered]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* DESKTOP NAVIGATION */}
      <nav
        aria-label="Desktop navigation"
        className={`fixed right-8 top-1/2 z-[200] hidden -translate-y-1/2 transition-all duration-700 md:block ${
          hasEntered
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-8 opacity-0"
        }`}
      >
        <div className="flex flex-col items-end">
          {sections.map((section, index) => {
            const active = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-current={active ? "page" : undefined}
                className="group flex h-9 items-center gap-3"
              >
                <span
                  className={`w-5 text-right font-mono text-[8px] tracking-[0.12em] transition-all duration-500 ${
                    active ? "text-white/80" : "text-white/25"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="relative h-px w-10">
                  <span
                    className={`absolute right-0 top-0 h-px transition-all duration-700 ease-out ${
                      active
                        ? "w-10 bg-white"
                        : "w-4 bg-white/20 group-hover:w-7 group-hover:bg-white/60"
                    }`}
                  />
                </span>

                <span
                  className={`w-16 text-left text-[8px] uppercase tracking-[0.18em] transition-all duration-500 ${
                    active
                      ? "text-white"
                      : "text-white/30 group-hover:text-white/70"
                  }`}
                >
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MOBILE NAVIGATION */}
      <nav
        aria-label="Mobile navigation"
        className={`fixed bottom-4 left-1/2 z-[200] w-[calc(100%-32px)] -translate-x-1/2 transition-all duration-700 md:hidden ${
          hasEntered
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0"
        }`}
      >
        <div className="rounded-full border border-white/10 bg-[#0a0a0a]/90 p-2 backdrop-blur-md">
          <div className="flex gap-1">
            {sections.map((section, index) => {
              const active = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-w-0 flex-1 flex-col items-center rounded-full px-1 py-2 transition-all duration-500 ${
                    active
                      ? "bg-white text-black"
                      : "text-white/35 active:bg-white/10"
                  }`}
                >
                  <span className="font-mono text-[7px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="mt-0.5 text-[6px] uppercase tracking-[0.08em]">
                    {section.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}