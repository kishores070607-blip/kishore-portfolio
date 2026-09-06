"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal() {
  useEffect(() => {
    const nodes = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (nodes.length === 0) return;

    if (prefersReducedMotion()) {
      gsap.set(nodes, { opacity: 1, y: 0 });
      return;
    }

    const tweens = nodes.map((el) =>
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      ),
    );

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, []);

  return null;
}
