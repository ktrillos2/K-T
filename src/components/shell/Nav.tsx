"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ROUTES, COLOR_VAR, navKeyFor } from "@/lib/routes";
import { SITE, wa } from "@/lib/site";
import { live, store, useUI } from "@/lib/store";
import { cx, vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { TLink } from "@/components/transition/TLink";
import { Logo } from "@/components/ui/Logo";
import { NavIcon } from "./NavIcon";
import { LocaleSelector } from "./LocaleSelector";
import { toggleTheme } from "./ThemeSync";
import styles from "./Nav.module.css";

export function Nav() {
  const { t } = useI18n();
  const route = useUI((s) => s.route);
  const menuOpen = useUI((s) => s.menuOpen);
  const theme = useUI((s) => s.theme);
  const activeNav = navKeyFor(route);
  const bar = useRef<HTMLElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const ind = useRef<HTMLSpanElement>(null);

  // Indicador de la pestaña activa
  useLayoutEffect(() => {
    const wrap = tabs.current;
    const el = ind.current;
    if (!wrap || !el) return;
    const active = activeNav ? wrap.querySelector<HTMLElement>(`[data-nav="${activeNav}"]`) : null;
    if (!active) {
      gsap.to(el, { autoAlpha: 0, duration: 0.3 });
      return;
    }
    const color = ROUTES.find((r) => r.nav === activeNav)?.color ?? "fg";
    gsap.to(el, {
      autoAlpha: 1,
      x: active.offsetLeft,
      width: active.offsetWidth,
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(`--${color}`).trim() || undefined,
      duration: 0.7,
      ease: "expo.inOut",
    });
  }, [activeNav, theme, t]);

  // Ocultar al bajar, mostrar al subir
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let hidden = false;
    let last = 0;
    let scrolled = "";
    const tick = () => {
      const y = live.scroll;
      if (y === last && !hidden) return;
      const s = store.get();
      const sc = String(y > 24);
      if (sc !== scrolled) {
        scrolled = sc;
        el.dataset.scrolled = sc;
      }
      const down = y > last + 2;
      const up = y < last - 2;
      last = y;
      const shouldHide = down && y > 380 && !s.menuOpen && !s.transitioning;
      if (shouldHide && !hidden) {
        hidden = true;
        gsap.to(el, { yPercent: -110, duration: 0.6, ease: "expo.inOut" });
      } else if ((up || y < 380 || s.transitioning) && hidden) {
        hidden = false;
        gsap.to(el, { yPercent: 0, duration: 0.6, ease: "expo.out" });
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && store.set({ menuOpen: false });
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header ref={bar} className={styles.nav} data-scrolled="false">
        <div className={cx("wrap", styles.inner)}>
          <TLink href="/" className={styles.brand} aria-label={t.nav.homeAria} data-stick>
            <Logo className={styles.logo} />
          </TLink>

          <nav className={styles.tabs} ref={tabs} aria-label={t.nav.main}>
            {ROUTES.map((r) => (
              <TLink
                key={r.key}
                href={r.href}
                data-nav={r.nav}
                className={cx(styles.tab, activeNav === r.nav && styles.active)}
                aria-current={activeNav === r.nav ? "page" : undefined}
                style={vars({ "--c": COLOR_VAR[r.color] })}
                data-icon-hover
              >
                <NavIcon k={r.nav} active={activeNav === r.nav} className={styles.fileIcon} />
                <span className={styles.tabLabel}>{t.nav[r.nav]}</span>
              </TLink>
            ))}
            <span ref={ind} className={styles.indicator} aria-hidden="true" />
          </nav>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.search}
              onClick={() => store.set({ paletteOpen: true })}
              aria-label={t.palette.aria}
              data-stick
            >
              <span>{t.nav.search}</span>
              <kbd>⌘K</kbd>
            </button>
            <LocaleSelector />
            <button
              type="button"
              className={styles.theme}
              onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
              aria-label={theme === "dark" ? t.nav.toLight : t.nav.toDark}
              data-stick
            >
              <span className={styles.themeIcon} data-theme-icon={theme} />
            </button>
            <a className={cx("btn btn--solid btn--sm", styles.cta)} href={wa(t.wa.default)} target="_blank" rel="noopener noreferrer" data-stick>
              {t.nav.quote} <span className="arr">→</span>
            </a>
            <button
              type="button"
              className={styles.burger}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="menu"
              onClick={() => store.set({ menuOpen: !menuOpen })}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="menu" className={styles.menu} data-open={menuOpen} aria-hidden={!menuOpen}>
        {/* Cortina en franjas: primero los colores de la marca, luego el fondo */}
        <div className={styles.menuWipe} aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <i key={i} style={vars({ "--i": i, "--w": COLOR_VAR[(["red", "yellow", "green", "red", "yellow", "green"] as const)[i]] })} />
          ))}
        </div>
        <div className={styles.menuGrid} aria-hidden="true" />
        <nav className={styles.menuLinks} aria-label={t.nav.mobile}>
          {ROUTES.map((r, i) => (
            <TLink
              key={r.key}
              href={r.href}
              className={styles.menuLink}
              style={vars({ "--i": i, "--c": COLOR_VAR[r.color] })}
              tabIndex={menuOpen ? 0 : -1}
              data-icon-hover
              data-current={activeNav === r.nav}
              aria-current={activeNav === r.nav ? "page" : undefined}
            >
              <span className={styles.menuNum} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.menuIcon} aria-hidden="true">
                <NavIcon k={r.nav} play={menuOpen} />
              </span>
              <span className={styles.menuText}>
                <span>{t.nav[r.nav]}</span>
              </span>
              <span className={styles.menuArrow} aria-hidden="true">
                →
              </span>
            </TLink>
          ))}
        </nav>
        <div className={styles.menuFoot}>
          <a className={styles.menuCta} href={wa(t.wa.default)} target="_blank" rel="noopener noreferrer" tabIndex={menuOpen ? 0 : -1}>
            {t.nav.quote} · WhatsApp <span aria-hidden="true">→</span>
          </a>
          <span className={styles.menuContact}>
            <a href={`mailto:${SITE.email}`} tabIndex={menuOpen ? 0 : -1}>
              {SITE.email}
            </a>
            <span>{SITE.phone}</span>
          </span>
          <span className={styles.menuSocials}>
            {SITE.socials.map((so) => (
              <a key={so.label} href={so.href} target="_blank" rel="noopener noreferrer" tabIndex={menuOpen ? 0 : -1}>
                {so.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </>
  );
}
