"use client";

import { useEffect, useRef } from "react";

export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max <= 0 ? 0 : window.scrollY / max;
      bar.style.transform = `scaleX(${progress})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[250] h-[2px] bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-[#C9A86C]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
