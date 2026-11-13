"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { cx } from "@/lib/utils";
import styles from "./HeroDemo.module.css";

const KINDS = ["web", "tienda", "sistema"] as const;
const ROTATE_MS = 6500;

/**
 * Muestra viva del inicio: una página que se arma sola dentro de un navegador y termina con
 * el aviso de un cliente nuevo. Las pestañas cambian entre página web, tienda y sistema.
 */
export function HeroDemo({ className }: { className?: string }) {
  const { t } = useI18n();
  const d = t.home.hero.demo;
  const [kind, setKind] = useState(0);
  // Cada vuelta vuelve a montar la escena para repetir la animación de armado.
  const [run, setRun] = useState(0);
  const touched = useRef(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      // No rota si no se ve (pestaña oculta o fuera de pantalla).
      const r = root.current?.getBoundingClientRect();
      if (document.hidden || !r || r.bottom < 0 || r.top > window.innerHeight) return;
      if (!touched.current) setKind((k) => (k + 1) % KINDS.length);
      setRun((n) => n + 1);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const pick = (i: number) => {
    touched.current = true;
    setKind(i);
    setRun((n) => n + 1);
  };

  const k = KINDS[kind];
  return (
    <div ref={root} className={cx(styles.stage, className)} role="img" aria-label={t.home.hero.stageLabel}>
      <div className={styles.tabs}>
        {d.tabs.map((label, i) => (
          <button key={label} type="button" className={styles.tab} aria-pressed={kind === i} onClick={() => pick(i)}>
            {label}
          </button>
        ))}
      </div>

      <div key={`${k}-${run}`} className={styles.browser} data-kind={k} aria-hidden="true">
        <div className={styles.chrome}>
          <i />
          <i />
          <i />
          <span className={styles.url}>{d.url}</span>
        </div>
        <div className={styles.page}>
          <div className={cx(styles.row, styles.navRow)} style={{ "--i": 0 } as React.CSSProperties}>
            <b className={styles.logo} />
            <span className={styles.links}>
              <i />
              <i />
              <i />
            </span>
          </div>

          {k === "sistema" ? (
            <div className={styles.dash}>
              <div className={cx(styles.block, styles.kpis)} style={{ "--i": 1 } as React.CSSProperties}>
                <span />
                <span />
                <span />
              </div>
              <div className={cx(styles.block, styles.chart)} style={{ "--i": 2 } as React.CSSProperties}>
                {[38, 56, 44, 72, 64, 90].map((h, i) => (
                  <i key={i} style={{ height: `${h}%`, "--b": i } as React.CSSProperties} />
                ))}
              </div>
              <div className={cx(styles.block, styles.table)} style={{ "--i": 3 } as React.CSSProperties}>
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : (
            <>
              <div className={styles.heroRow}>
                <div className={cx(styles.block, styles.copy)} style={{ "--i": 1 } as React.CSSProperties}>
                  <span className={styles.h} />
                  <span className={cx(styles.h, styles.short)} />
                  <span className={styles.p} />
                  <span className={styles.cta}>{k === "tienda" ? d.buy : d.cta}</span>
                </div>
                <div className={cx(styles.block, styles.photo)} style={{ "--i": 2 } as React.CSSProperties} />
              </div>
              <div className={styles.cards}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className={cx(styles.block, styles.card)} style={{ "--i": 3 + i } as React.CSSProperties}>
                    <span className={styles.thumb} />
                    <span className={styles.line} />
                    {k === "tienda" && <span className={styles.price}>$</span>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className={styles.toast}>
          <span className={styles.check}>✓</span>
          {d.toasts[kind]}
        </div>
      </div>
    </div>
  );
}
