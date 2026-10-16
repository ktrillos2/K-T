"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { ROUTES } from "@/lib/routes";
import { projectsFor } from "@/i18n";
import { localize, splitLang } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { postsFor } from "@/content/blog/meta";
import { SERVICES, INDUSTRIES, landingCopy } from "@/content/landings";
import { SITE, wa } from "@/lib/site";
import { store, useUI } from "@/lib/store";
import { scrollToEl } from "@/lib/lenis";
import { useNavigate } from "@/components/transition/TransitionProvider";
import { toggleTheme } from "./ThemeSync";
import styles from "./CommandPalette.module.css";

type Item = { id: string; group: string; label: string; hint: string; run: () => void };

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

/** Paleta de comandos (⌘K / Ctrl+K): páginas, acciones, proyectos y artículos del blog. */
export function CommandPalette() {
  const open = useUI((s) => s.paletteOpen);
  const navigate = useNavigate();
  const pathname = usePathname();
  const { t, lang, href } = useI18n();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const items = useMemo<Item[]>(() => {
    const other = lang === "es" ? "en" : "es";
    return [
      ...ROUTES.map((r) => ({ id: `go-${r.key}`, group: t.palette.groups.nav, label: t.palette.goTo(t.nav[r.nav]), hint: href(r.href), run: () => navigate(href(r.href)) })),
      { id: "wa", group: t.palette.groups.actions, label: t.palette.quote, hint: SITE.phone, run: () => window.open(wa(t.wa.default), "_blank", "noopener") },
      { id: "mail", group: t.palette.groups.actions, label: t.palette.copyEmail, hint: SITE.email, run: () => void navigator.clipboard?.writeText(SITE.email).catch(() => {}) },
      { id: "theme", group: t.palette.groups.actions, label: t.palette.theme, hint: "⌥", run: () => toggleTheme() },
      { id: "lang", group: t.palette.groups.actions, label: t.palette.language, hint: other.toUpperCase(), run: () => navigate(localize(splitLang(pathname).path, other)) },
      { id: "contact", group: t.palette.groups.actions, label: t.palette.contact, hint: "#contacto", run: () => scrollToEl("#contacto") },
      ...[...SERVICES, ...INDUSTRIES].map((l) => {
        const c = landingCopy(l, lang).copy;
        return { id: `s-${l.slug}`, group: t.nav.services, label: c.h1, hint: l.path, run: () => navigate(href(l.path)) };
      }),
      ...projectsFor(lang).map((p) => ({ id: `p-${p.slug}`, group: t.palette.groups.projects, label: p.name, hint: `${p.sector} · ${p.dateLabel}`, run: () => navigate(href(p.href)) })),
      ...postsFor(lang).map((b) => ({ id: `b-${b.slug}`, group: t.palette.groups.blog, label: b.title, hint: t.blog.minutes(b.minutes), run: () => navigate(href(b.href)) })),
    ];
  }, [navigate, t, lang, href, pathname]);

  const filtered = useMemo(() => {
    const s = norm(q.trim());
    if (!s) return items;
    return items.filter((i) => norm(`${i.label} ${i.hint} ${i.group}`).includes(s));
  }, [q, items]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        store.set({ paletteOpen: !store.get().paletteOpen });
      } else if (e.key === "Escape" && store.get().paletteOpen) {
        store.set({ paletteOpen: false });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const r = root.current;
    const p = panel.current;
    if (!r || !p) return;
    if (open) {
      setQ("");
      setActive(0);
      gsap.set(r, { display: "grid" });
      gsap.fromTo(r, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 });
      gsap.fromTo(
        p,
        { y: 30, scale: 0.96, rotationX: 12, filter: "blur(8px)" },
        { y: 0, scale: 1, rotationX: 0, filter: "blur(0px)", duration: 0.55, ease: "expo.out" },
      );
      window.setTimeout(() => input.current?.focus(), 30);
    } else {
      gsap.to(p, { y: 16, scale: 0.97, duration: 0.25, ease: "power2.in" });
      gsap.to(r, { autoAlpha: 0, duration: 0.25, onComplete: () => void gsap.set(r, { display: "none" }) });
    }
  }, [open]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const exec = (i: Item | undefined) => {
    if (!i) return;
    store.set({ paletteOpen: false });
    window.setTimeout(i.run, 120);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      exec(filtered[active]);
    }
  };

  let lastGroup = "";

  return (
    <div
      ref={root}
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label={t.palette.aria}
      onPointerDown={(e) => e.target === root.current && store.set({ paletteOpen: false })}
    >
      <div ref={panel} className={styles.panel}>
        <div className={styles.inputRow}>
          <span className={styles.prompt} aria-hidden="true">
            {">"}
          </span>
          <input
            ref={input}
            id="command-input"
            className={styles.input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={t.palette.placeholder}
            aria-controls="command-list"
            aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className={styles.esc}>esc</kbd>
        </div>
        <ul ref={list} id="command-list" className={styles.list} role="listbox" data-lenis-prevent>
          {filtered.length === 0 && <li className={styles.empty}>{t.palette.empty(q)}</li>}
          {filtered.map((it, idx) => {
            const header = it.group !== lastGroup ? it.group : null;
            lastGroup = it.group;
            return (
              <li key={it.id} role="presentation">
                {header && <p className={styles.group}>{header}</p>}
                <button
                  type="button"
                  id={`cmd-${it.id}`}
                  role="option"
                  aria-selected={idx === active}
                  data-idx={idx}
                  className={styles.item}
                  onPointerMove={() => setActive(idx)}
                  onClick={() => exec(it)}
                >
                  <span>{it.label}</span>
                  <span className={styles.hint}>{it.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className={styles.foot}>
          <span>{t.palette.hints.move}</span>
          <span>{t.palette.hints.open}</span>
          <span>{t.palette.hints.close}</span>
        </div>
      </div>
    </div>
  );
}
