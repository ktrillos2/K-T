"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { store } from "@/lib/store";
import { LOGO } from "@/lib/bitmaps";
import { vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Loader.module.css";

/** Duración mínima de la intro desde que empieza la navegación (ms). */
const MIN_MS = 900;

/** Orden pseudoaleatorio estable para encender las celdas del logo. */
function order(n: number) {
  const a = Array.from({ length: n }, (_, i) => i);
  let seed = 7;
  for (let i = n - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Intro corta (~1 s) en la primera visita de la sesión. Todo el encendido del logo es CSS,
 * así que se ve desde el primer pintado sin esperar a JavaScript, y la página ya está
 * renderizada debajo (no se oculta el contenido: el LCP es el de la página, no el de la intro).
 * Al hidratar, se espera lo que falte de la duración mínima y se desvanece.
 * En visitas repetidas y para buscadores no se muestra.
 */
export function Loader() {
  const { t } = useI18n();
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const cells = useMemo(() => {
    const ord = order(LOGO.cells.length);
    return LOGO.cells.map((c, i) => ({ c: c[0], r: c[1], th: ord[i] / LOGO.cells.length }));
  }, []);

  useEffect(() => {
    const el = root.current;
    const html = document.documentElement;
    // La página entra al mismo tiempo que la intro se desvanece (así no se ve "quieta" debajo).
    const enter = () => {
      html.classList.add("ready");
      try {
        sessionStorage.setItem("kt-booted", "1");
      } catch {
        /* sin sessionStorage */
      }
      store.set({ loaded: true });
      store.enter();
    };
    if (!el || html.classList.contains("bot") || html.classList.contains("booted")) {
      setDone(true);
      enter();
      return;
    }
    const wait = Math.max(0, MIN_MS - performance.now());
    let tw: ReturnType<typeof gsap.to> | null = null;
    const id = window.setTimeout(() => {
      enter();
      tw = gsap.to(el, { autoAlpha: 0, duration: prefersReducedMotion() ? 0.15 : 0.35, ease: "power2.in", onComplete: () => setDone(true) });
    }, wait);
    return () => {
      window.clearTimeout(id);
      tw?.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className={styles.root} role="status" aria-label={t.loader.aria}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.top} aria-hidden="true">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.title}>{t.loader.title}</span>
      </div>

      <div className={styles.stage} aria-hidden="true">
        <div className={styles.logo} style={vars({ "--w": LOGO.w, "--h": LOGO.h })}>
          {LOGO.dots?.map((d, i) => (
            <span
              key={`d${i}`}
              className={styles.dot}
              style={{ left: `calc(${d[0]} / var(--w) * 100%)`, top: `calc(${d[1]} / var(--h) * 100%)`, ...vars({ "--i": i }) }}
            />
          ))}
          {cells.map((c, i) => (
            <span key={i} className={styles.cell} style={{ gridColumn: c.c + 1, gridRow: c.r + 1, ...vars({ "--th": c.th.toFixed(3) }) }} />
          ))}
        </div>
      </div>

      <div className={styles.console} aria-hidden="true">
        {t.loader.lines.map((l, i) => (
          <p key={i} className={l.trim().startsWith("✓") ? styles.ok : styles.line} style={vars({ "--i": i })}>
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}
