"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, EASE_INOUT, prefersReducedMotion } from "@/lib/gsap";
import { store } from "@/lib/store";
import { LOGO } from "@/lib/bitmaps";
import { vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Loader.module.css";

const lineKind = (l: string) => {
  const x = l.trim();
  if (x.startsWith("$")) return "cmd";
  if (x.startsWith("✓")) return "ok";
  if (x.startsWith("-") || x.startsWith("○")) return "dim";
  return "line";
};

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

export function Loader() {
  const { t } = useI18n();
  const tRef = useRef(t);
  tRef.current = t;
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const cells = useMemo(() => {
    const ord = order(LOGO.cells.length);
    return LOGO.cells.map((c, i) => ({ c: c[0], r: c[1], th: ord[i] / LOGO.cells.length }));
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // Buscadores y crawlers: sin loader, contenido inmediato.
    if (document.documentElement.classList.contains("bot")) {
      setDone(true);
      document.documentElement.classList.add("ready");
      store.set({ loaded: true });
      store.enter();
      return;
    }
    const reduced = prefersReducedMotion();
    const booted = document.documentElement.classList.contains("booted");
    const MIN = reduced ? 300 : booted ? 1100 : 2800;
    const t0 = performance.now();
    let ready = false;
    let shown = 0;
    let finished = false;
    let skip = false;

    const num = el.querySelector<HTMLElement>("[data-num]")!;
    const bar = el.querySelector<HTMLElement>("[data-bar]")!;
    const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-line]"));
    const cellEls = Array.from(el.querySelectorAll<HTMLElement>("[data-cell]"));
    const dotEls = Array.from(el.querySelectorAll<HTMLElement>("[data-dot]"));
    const readyLine = el.querySelector<HTMLElement>("[data-ready]")!;

    const fonts = document.fonts?.ready ?? Promise.resolve();
    const load =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }));
    Promise.race([Promise.all([fonts, load]), new Promise((r) => setTimeout(r, 4500))]).then(() => {
      ready = true;
    });

    const onSkip = () => {
      skip = true;
      ready = true;
    };
    const skipBtn = el.querySelector<HTMLButtonElement>("[data-skip]");
    skipBtn?.addEventListener("click", onSkip);

    const burst = () => {
      const ms = Math.round(performance.now() - t0);
      readyLine.textContent = tRef.current.loader.ready(ms);
      readyLine.dataset.on = "true";
      const finish = () => {
        setDone(true);
        document.documentElement.classList.add("ready");
        try {
          sessionStorage.setItem("kt-booted", "1");
        } catch {
          /* sin sessionStorage */
        }
        store.set({ loaded: true });
        store.enter();
      };
      if (reduced) {
        gsap.to(el, { autoAlpha: 0, duration: 0.3, onComplete: finish });
        return;
      }
      const circles = Array.from(el.querySelectorAll<HTMLElement>("[data-burst]"));
      const far = (x: number, y: number) =>
        Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const tl = gsap.timeline({ delay: 0.25, onComplete: finish });
      circles.forEach((c, i) => {
        const d = dotEls[Math.min(i, 2)].getBoundingClientRect();
        const x = d.left + d.width / 2;
        const y = d.top + d.height / 2;
        const size = d.width || 16;
        gsap.set(c, { left: x - size / 2, top: y - size / 2, width: size, height: size, scale: 0 });
        tl.to(c, { scale: (far(x, y) * 2.1) / size, duration: 1.05, ease: EASE_INOUT }, i * 0.13);
      });
      tl.to(el.querySelector("[data-stage]"), { scale: 1.08, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 0);
    };

    const tick = () => {
      if (finished) return;
      const now = performance.now();
      const target = skip ? 1 : Math.min((now - t0) / MIN, ready ? 1 : 0.92);
      shown = Math.max(shown, shown + (target - shown) * 0.09);
      if (target >= 1 && shown > 0.985) shown = 1;
      const pct = Math.round(shown * 100);
      num.textContent = String(pct).padStart(3, "0");
      const blocks = 24;
      const full = Math.round(shown * blocks);
      bar.textContent = "█".repeat(full) + "░".repeat(blocks - full);
      lines.forEach((l, i) => (l.dataset.on = String(shown >= i / (lines.length + 1))));
      cellEls.forEach((c, i) => (c.dataset.on = String(shown >= cells[i].th * 0.95)));
      dotEls.forEach((d, i) => (d.dataset.on = String(shown >= 0.9 + i * 0.03)));
      if (shown >= 1) {
        finished = true;
        gsap.ticker.remove(tick);
        burst();
      }
    };
    gsap.ticker.add(tick);

    return () => {
      finished = true;
      gsap.ticker.remove(tick);
      skipBtn?.removeEventListener("click", onSkip);
    };
  }, [cells]);

  if (done) return null;

  return (
    <div ref={root} className={styles.root} role="status" aria-live="polite" aria-label={t.loader.aria}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.top}>
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.title}>{t.loader.title}</span>
        <button type="button" className={styles.skip} data-skip>
          {t.loader.skip} ↵
        </button>
      </div>

      <div className={styles.stage} data-stage aria-hidden="true">
        <div className={styles.logo} style={vars({ "--w": LOGO.w, "--h": LOGO.h })}>
          {LOGO.dots?.map((d, i) => (
            <span
              key={`d${i}`}
              data-dot
              className={styles.dot}
              style={{ left: `calc(${d[0]} / var(--w) * 100%)`, top: `calc(${d[1]} / var(--h) * 100%)` }}
            />
          ))}
          {cells.map((c, i) => (
            <span
              key={i}
              data-cell
              className={styles.cell}
              style={{ gridColumn: c.c + 1, gridRow: c.r + 1 }}
            />
          ))}
        </div>
      </div>

      <div className={styles.console} aria-hidden="true">
        {t.loader.lines.map((l, i) => (
          <p key={i} data-line className={styles[lineKind(l)]}>
            {l}
          </p>
        ))}
        <p data-ready className={styles.ready} />
        <p className={styles.barLine}>
          [<span data-bar>░░░░░░░░░░░░░░░░░░░░░░░░</span>]
        </p>
      </div>

      <div className={styles.pct} aria-hidden="true">
        <span data-num>000</span>
        <small>%</small>
      </div>

      {[0, 1, 2, 3].map((i) => (
        <span key={i} data-burst className={styles.burst} data-i={i} aria-hidden="true" />
      ))}
    </div>
  );
}
