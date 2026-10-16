"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { sourceFile } from "@/lib/routes";
import { live, store, useUI } from "@/lib/store";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./StatusBar.module.css";

/** Barra de estado tipo editor: archivo abierto, línea (scroll), fps reales y hora de Cúcuta. */
export function StatusBar() {
  const route = useUI((s) => s.route);
  const { t, lang, country } = useI18n();
  const ln = useRef<HTMLSpanElement>(null);
  const fps = useRef<HTMLSpanElement>(null);
  const clock = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let last = -1;
    let lastFps = -1;
    const fmt = new Intl.DateTimeFormat("es-CO", {
      timeZone: "America/Bogota",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const setClock = () => {
      if (clock.current) clock.current.textContent = fmt.format(new Date());
    };
    setClock();
    const iv = window.setInterval(setClock, 20000);
    const tick = () => {
      const p = Math.round(live.progress * 100);
      if (p !== last && ln.current) {
        last = p;
        ln.current.textContent = `Ln ${String(Math.round(live.scroll / 24) + 1).padStart(3, " ")} · ${p}%`;
      }
      if (live.fps !== lastFps && fps.current) {
        lastFps = live.fps;
        fps.current.textContent = `${Math.min(live.fps, 144)} fps`;
      }
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.clearInterval(iv);
    };
  }, []);

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.branch}>
          <i aria-hidden="true" /> main
        </span>
        <span className={styles.ok}>{t.status.errors}</span>
        <span className={styles.file}>{sourceFile(route)}</span>
      </div>
      <div className={styles.right}>
        <span ref={ln} className="tnum">
          Ln 1 · 0%
        </span>
        <span ref={fps} className="tnum">
          60 fps
        </span>
        <span>{lang.toUpperCase()}</span>
        <span>{country.currency}</span>
        <button type="button" className={styles.kbd} onClick={() => store.set({ paletteOpen: true })}>
          {t.status.commands}
        </button>
        <span>
          Cúcuta <span ref={clock} className="tnum">--:--</span>
        </span>
      </div>
    </div>
  );
}
