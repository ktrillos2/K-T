"use client";

import { useEffect, useRef } from "react";
import { store } from "@/lib/store";

/**
 * Ejecuta `fn` cuando la página debe reproducir su entrada: al terminar el loader
 * y cada vez que una transición revela una ruta nueva.
 */
export function useEnter(fn: () => void | (() => void)) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    let last = store.get().enterKey;
    let cleanup: void | (() => void);
    // Si la página monta cuando todo ya está listo (navegación rápida), entra igual.
    const s0 = store.get();
    const mountedReady = s0.loaded && !s0.transitioning;
    let ran = false;

    const run = () => {
      if (typeof cleanup === "function") cleanup();
      cleanup = fnRef.current();
      ran = true;
    };

    const unsub = store.subscribe(() => {
      const s = store.get();
      if (s.enterKey !== last) {
        last = s.enterKey;
        run();
      }
    });

    let raf = 0;
    if (mountedReady) {
      raf = requestAnimationFrame(() => {
        if (!ran) run();
      });
    }

    return () => {
      unsub();
      cancelAnimationFrame(raf);
      if (typeof cleanup === "function") cleanup();
    };
  }, []);
}
