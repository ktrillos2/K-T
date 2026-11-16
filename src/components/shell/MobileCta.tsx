"use client";

import { useEffect, useState } from "react";
import { wa } from "@/lib/site";
import { useUI } from "@/lib/store";
import { useI18n } from "@/i18n/I18nProvider";
import { WA_CELLS, WA_FILL } from "./WhatsAppFloat";
import styles from "./MobileCta.module.css";

/** Barra fija inferior en celular: WhatsApp siempre a un toque. Aparece al pasar la primera pantalla. */
export function MobileCta() {
  const { t } = useI18n();
  const menuOpen = useUI((s) => s.menuOpen);
  const transitioning = useUI((s) => s.transitioning);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.bar} data-show={show && !menuOpen && !transitioning} data-track="barra-movil">
      <a href={wa(t.wa.default)} target="_blank" rel="noopener noreferrer" className={styles.btn} data-native tabIndex={show ? 0 : -1}>
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="-1 -1 18 18" shapeRendering="crispEdges">
            {WA_CELLS.map((c, i) => (
              <rect key={i} x={c.x} y={c.y} width="1" height="1" fill={WA_FILL[c.ch]} style={{ transitionDelay: `${(c.d * 0.035).toFixed(3)}s` }} />
            ))}
          </svg>
          <span className={styles.badge}>1</span>
        </span>
        {t.home.hero.cta2}
      </a>
    </div>
  );
}
