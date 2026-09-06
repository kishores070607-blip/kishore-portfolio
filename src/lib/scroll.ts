import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, {
      offset: 0,
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return;
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
