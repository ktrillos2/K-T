"use client";

import type Lenis from "lenis";

/** Referencia global a la instancia de Lenis (la crea <SmoothScroll />). */
export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToTop(immediate = true) {
  const l = lenisRef.current;
  if (l) l.scrollTo(0, { immediate, force: true });
  if (immediate || !l) window.scrollTo(0, 0);
}

export function scrollToEl(target: HTMLElement | string, offset = -90) {
  const l = lenisRef.current;
  if (l) l.scrollTo(target, { offset, duration: 1.4 });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}
