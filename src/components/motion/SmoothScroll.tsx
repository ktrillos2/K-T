"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis";
import { live, store } from "@/lib/store";

/**
 * Lenis sincronizado con el ticker de GSAP: un solo requestAnimationFrame para todo el sitio.
 *
 * Anti-tirones:
 * - ScrollTrigger se recalcula solo cuando la altura real del documento cambia (imágenes,
 *   fuentes, acordeones), con un pequeño retraso, para que las secciones fijas no salten.
 * - Nunca se queda bloqueado: si una transición interrumpida deja el scroll detenido
 *   más de 10 s, se libera solo.
 * - Los elementos con scroll propio se detectan solos (allowNestedScroll); data-lenis-prevent queda
 *   solo para modales y menús que deben capturar la rueda por completo.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      autoRaf: false,
      // Más directo que antes (0.1): responde rápido a la rueda y frena sin "flotar".
      lerp: reduced ? 1 : 0.16,
      smoothWheel: !reduced,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      // Listas, chat y tablas con scroll propio: se desplazan ellos y, cuando llegan al final,
      // sigue la página. Antes usaban data-lenis-prevent y la rueda "se trababa" encima de ellos.
      allowNestedScroll: true,
      // Contenedores con su propio scroll (modales, listas, tablas, chat).
      prevent: (node: HTMLElement) =>
        !!node.closest?.("[data-lenis-prevent], [data-lenis-prevent-wheel], [role='dialog'], textarea, select"),
    });
    lenisRef.current = lenis;

    const onScroll = (l: Lenis) => {
      live.scroll = l.scroll;
      live.velocity = l.velocity;
      live.progress = l.progress;
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // FPS real para la barra de estado
    let frames = 0;
    let acc = 0;
    const fps = (_t: number, delta: number) => {
      frames++;
      acc += delta;
      if (acc >= 500) {
        live.fps = Math.round((frames * 1000) / acc);
        frames = 0;
        acc = 0;
      }
    };
    gsap.ticker.add(fps);

    // Bloqueo del scroll según el estado de la UI, con salvavidas.
    let stoppedAt = 0;
    const sync = () => {
      const s = store.get();
      const stop = !s.loaded || s.transitioning || s.menuOpen || s.paletteOpen;
      if (stop) {
        if (!stoppedAt) stoppedAt = performance.now();
        lenis.stop();
      } else {
        stoppedAt = 0;
        lenis.start();
      }
    };
    sync();
    const unsub = store.subscribe(sync);
    const guard = window.setInterval(() => {
      const s = store.get();
      if (stoppedAt && s.loaded && s.transitioning && performance.now() - stoppedAt > 10000) {
        store.set({ transitioning: false });
        stoppedAt = 0;
        lenis.start();
      }
    }, 2000);

    // Recalcular ScrollTrigger cuando cambia la altura del contenido (no en cada frame).
    let lastH = document.documentElement.scrollHeight;
    let to = 0;
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (Math.abs(h - lastH) < 4) return;
      lastH = h;
      window.clearTimeout(to);
      to = window.setTimeout(() => {
        if (store.get().transitioning) return;
        lenis.resize();
        ScrollTrigger.refresh();
        lastH = document.documentElement.scrollHeight;
      }, 220);
    });
    const main = document.getElementById("main");
    if (main) ro.observe(main);

    // Las fuentes cambian métricas del texto: un refresh cuando terminan de cargar.
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

    return () => {
      unsub();
      ro.disconnect();
      window.clearTimeout(to);
      window.clearInterval(guard);
      gsap.ticker.remove(tick);
      gsap.ticker.remove(fps);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
