"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import { setLenis, scrollToId } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    const lenis = reduced
      ? null
      : new Lenis({
          duration: 1.15,
          smoothWheel: true,
          touchMultiplier: 1.2,
        });

    if (lenis) {
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const ticker = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      const onClick = (event: MouseEvent) => {
        const target = (event.target as HTMLElement | null)?.closest(
          "a[href^='#']",
        ) as HTMLAnchorElement | null;
        if (!target) return;
        const id = target.getAttribute("href")?.slice(1);
        if (!id) return;
        event.preventDefault();
        scrollToId(id);
      };
      document.addEventListener("click", onClick);

      return () => {
        window.removeEventListener("resize", onResize);
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(ticker);
        setLenis(null);
        lenis.destroy();
      };
    }

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest(
        "a[href^='#']",
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href")?.slice(1);
      if (!id) return;
      event.preventDefault();
      scrollToId(id);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
