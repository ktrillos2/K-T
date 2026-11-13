"use client";

import { useEffect, useState } from "react";
import { wa } from "@/lib/site";
import { useUI } from "@/lib/store";
import { useI18n } from "@/i18n/I18nProvider";
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
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        {t.home.hero.cta2}
      </a>
    </div>
  );
}
