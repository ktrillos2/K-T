"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useI18n } from "@/i18n/I18nProvider";
import { LOCALES, localize, splitLang, type Lang } from "@/i18n/config";
import { COUNTRIES } from "@/lib/money";
import { useNavigate } from "@/components/transition/TransitionProvider";
import { cx } from "@/lib/utils";
import styles from "./LocaleSelector.module.css";

const flag = (code: string) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

/** Selector de país (moneda) e idioma, como en kytcode.lat. */
export function LocaleSelector({ compact = false, up = false }: { compact?: boolean; up?: boolean }) {
  const { t, lang, country, setCountry } = useI18n();
  const navigate = useNavigate();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = panel.current;
    if (!p) return;
    if (open) {
      gsap.set(p, { display: "grid" });
      gsap.fromTo(p, { autoAlpha: 0, y: -10, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "expo.out" });
      gsap.fromTo(p.querySelectorAll("[data-row]"), { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, stagger: 0.02, duration: 0.3, delay: 0.05 });
    } else {
      gsap.to(p, { autoAlpha: 0, y: -6, duration: 0.2, onComplete: () => void gsap.set(p, { display: "none" }) });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const switchLang = (l: Lang) => {
    if (l === lang) return;
    setOpen(false);
    const { path } = splitLang(pathname);
    navigate(localize(path, l));
  };

  // 1 unidad de la moneda elegida en COP (con el recargo), como referencia.

  return (
    <div ref={root} className={styles.root} data-up={up}>
      <button
        type="button"
        className={cx(styles.trigger, compact && styles.compact)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`${t.locale.title}: ${country.name[lang]}, ${country.currency}, ${lang.toUpperCase()}`}
        onClick={() => setOpen((o) => !o)}
        data-stick
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={flag(country.code)} alt="" width={20} height={14} className={styles.flag} />
        <span className={styles.code}>{country.currency}</span>
        <span className={styles.lang}>{lang.toUpperCase()}</span>
      </button>

      <div ref={panel} className={styles.panel} role="dialog" aria-label={t.locale.title}>
        <p className={styles.head}>{t.locale.language}</p>
        <div className={styles.langs} role="group" aria-label={t.locale.language}>
          {LOCALES.map((l) => (
            <button key={l} type="button" aria-pressed={l === lang} className={styles.langBtn} onClick={() => switchLang(l)}>
              {l === "es" ? "Español" : "English"}
            </button>
          ))}
        </div>
        <p className={styles.head}>{t.locale.country}</p>
        <ul className={styles.list} data-lenis-prevent>
          {COUNTRIES.map((c) => (
            <li key={c.code} data-row>
              <button
                type="button"
                aria-pressed={c.code === country.code}
                className={styles.country}
                onClick={() => {
                  setCountry(c.code);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={flag(c.code)} alt="" width={22} height={15} className={styles.flag} loading="lazy" />
                <span className={styles.name}>{c.name[lang]}</span>
                <span className={styles.cur}>{c.currency}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
