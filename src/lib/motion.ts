export const expoOut = "power3.out";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export function isCompactViewport() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(max-width: 768px)").matches;
}
