"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, Flip, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import type { ProjectCategory } from "@/lib/projects";
import { COLOR_VAR } from "@/lib/routes";
import { cx, vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsFor } from "@/i18n";
import { useSceneDim } from "@/hooks/useSceneDim";
import { SectionHead } from "@/components/ui/SectionHead";
import { SiteShot } from "@/components/ui/SiteShot";
import { TLink } from "@/components/transition/TLink";
import styles from "./ProjectIndex.module.css";

type View = "grid" | "list";
type Filter = ProjectCategory | "todos";
const FILTERS: Filter[] = ["todos", "corporativo", "ecommerce", "plataforma", "landing"];

/**
 * Índice de proyectos sobre fondo sólido (la escena 3D se atenúa para leer bien).
 * Cuadrícula con la captura real de cada sitio, que se recorre al pasar el cursor,
 * o lista con una vista previa flotante. Filtro y vista se animan con GSAP Flip.
 */
export function ProjectIndex() {
  const { t, lang } = useI18n();
  const ix = t.projects.index;
  const items = useMemo(() => projectsFor(lang), [lang]);
  const [view, setView] = useState<View>("grid");
  const [filter, setFilter] = useState<Filter>("todos");
  const root = useRef<HTMLElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  useSceneDim(root, 0.92);

  const capture = () => {
    const els = root.current?.querySelectorAll("[data-item]");
    if (els && !prefersReducedMotion()) flipState.current = Flip.getState(els, { props: "opacity" });
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    Flip.from(state, {
      duration: 0.85,
      ease: "expo.inOut",
      stagger: 0.015,
      absolute: true,
      nested: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.25 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.85, duration: 0.4 }),
    });
  }, [view, filter]);

  // Vista previa que sigue al cursor en modo lista
  useGSAP(
    () => {
      const pv = preview.current;
      if (!pv || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const xTo = gsap.quickTo(pv, "x", { duration: 0.55, ease: "power3.out" });
      const yTo = gsap.quickTo(pv, "y", { duration: 0.55, ease: "power3.out" });
      const rTo = gsap.quickTo(pv, "rotation", { duration: 0.8, ease: "power3.out" });
      let lastX = 0;
      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        rTo(Math.max(-10, Math.min(10, (e.clientX - lastX) * 0.5)));
        lastX = e.clientX;
      };
      window.addEventListener("pointermove", move, { passive: true });
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  const counts = (k: Filter) => (k === "todos" ? items.length : items.filter((p) => p.category === k).length);
  const hovered = hover !== null ? items[hover] : null;

  return (
    <section ref={root} id="indice" className={cx("band", styles.section)} aria-labelledby="h-indice">
      <div className="wrap">
        <SectionHead id="h-indice" path={ix.path} title={ix.title} lead={ix.lead} />

        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label={ix.filterAria}>
            {FILTERS.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={filter === k}
                className={styles.chip}
                onClick={() => {
                  if (filter === k) return;
                  capture();
                  setFilter(k);
                }}
              >
                {t.projects.categories[k]} <sup className="tnum">{counts(k)}</sup>
              </button>
            ))}
          </div>
          <div className={styles.views} role="group" aria-label={ix.viewAria}>
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                className={styles.viewBtn}
                onClick={() => {
                  if (view === v) return;
                  capture();
                  setView(v);
                }}
              >
                <span className={cx(styles.icon, styles[`icon_${v}`])} aria-hidden="true" />
                {ix[v]}
              </button>
            ))}
          </div>
        </div>

        <ul className={cx(styles.items, styles[view])} data-view={view}>
          {items.map((p, i) => {
            const visible = filter === "todos" || p.category === filter;
            return (
              <li key={p.slug} data-item data-flip-id={p.slug} className={styles.li} hidden={!visible}>
                <TLink
                  href={p.href}
                  className={styles.item}
                  style={vars({ "--c": COLOR_VAR[p.color] })}
                  data-cursor={view === "grid" ? t.cursor.view : undefined}
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover((h) => (h === i ? null : h))}
                >
                  <span className={styles.thumb}>
                    <SiteShot project={p} active={view === "grid" && hover === i} scrollOnHover={false} />
                    <span className={styles.badge}>{t.projects.category[p.category]}</span>
                  </span>
                  <span className={styles.date}>{p.dateLabel}</span>
                  <span className={styles.nameRow}>
                    <i aria-hidden="true" />
                    <span className={cx("display", styles.name)}>{p.name}</span>
                  </span>
                  <span className={styles.sector}>
                    {p.sector}
                    {p.location ? ` · ${p.location}` : ""}
                  </span>
                  <span className={styles.summary}>{p.summary}</span>
                  {p.speed && (
                    <span className={styles.speed} title="PageSpeed">
                      <b className="tnum">{p.speed.after}</b>/100
                    </span>
                  )}
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </TLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div ref={preview} className={styles.preview} data-on={view === "list" && hovered !== null} aria-hidden="true">
        {hovered && (
          <div className={styles.previewWin}>
            <div className={styles.previewBar}>
              <span className="dots">
                <i />
                <i />
                <i />
              </span>
              <span>{hovered.domain ?? hovered.slug}</span>
            </div>
            <SiteShot project={hovered} active scrollOnHover={false} />
          </div>
        )}
      </div>
    </section>
  );
}
