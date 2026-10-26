"use client";

import { useEffect } from "react";
import { store, type Theme } from "@/lib/store";

/** Lee el tema que dejó el script de arranque y lo publica en el store. */
export function ThemeSync() {
  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    store.set({ theme: t === "light" ? "light" : "dark" });
  }, []);
  return null;
}

export function setTheme(next: Theme, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const apply = () => {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("kt-theme", next);
    } catch {
      /* almacenamiento no disponible */
    }
    store.set({ theme: next });
  };
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> };
  };
  if (!doc.startViewTransition) {
    apply();
    return;
  }
  const x = origin?.x ?? window.innerWidth - 80;
  const y = origin?.y ?? 34;
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const vt = doc.startViewTransition(apply);
  vt.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(.76,0,.24,1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {});
}

export function toggleTheme(origin?: { x: number; y: number }) {
  setTheme(store.get().theme === "dark" ? "light" : "dark", origin);
}
