"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { scrollToId } from "@/lib/scroll";

export default function Navigation() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 24);
      const mid = window.innerHeight * 0.42;
      let current = "home";
      for (const item of nav) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= mid) current = item.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (id: string) => {
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[200] transition-all duration-500 ${
          scrolled
            ? "border-b border-[#C9A86C]/15 bg-[#0C0B0A]/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <button
            type="button"
            onClick={() => go("home")}
            className="font-mono text-[11px] tracking-[0.28em] text-[#C9A86C]"
            aria-label="Back to top"
          >
            {site.short}
          </button>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? "text-[#F4EFE6]" : "text-[#9A9184] hover:text-[#F4EFE6]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#C9A86C] transition-all duration-500 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <a
            href={`mailto:${site.email}`}
            className="hidden text-[11px] uppercase tracking-[0.18em] text-[#C9A86C] md:inline"
          >
            Write
          </a>
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#9A9184] md:hidden">
            {site.location.split(",")[0]}
          </span>
        </div>
      </header>

      <nav
        aria-label="Mobile"
        className="fixed bottom-4 left-1/2 z-[200] w-[min(100%-24px,440px)] -translate-x-1/2 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="rounded-full border border-[#C9A86C]/20 bg-[#0C0B0A]/90 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
          <div className="flex">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-1 text-[10px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                    isActive
                      ? "bg-[#C9A86C] text-[#0C0B0A]"
                      : "text-[#9A9184]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
