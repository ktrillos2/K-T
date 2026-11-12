"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, Flip, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import type { ProjectCategory } from "@/lib/projects";
import { COLOR_VAR } from "@/lib/routes";
import { cx, vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsFor } from "@/i18n";
import { SectionHead } from "@/components/ui/SectionHead";
import { SiteShot } from "@/components/ui/SiteShot";
import { TLink } from "@/components/transition/TLink";
import styles from "./ProjectIndex.module.css";

type Filter = ProjectCategory | "todos";
const FILTERS: Filter[] = ["todos", "corporativo", "ecommerce", "plataforma", "landing"];

/**
 * Todos los proyectos en una cuadrícula simple: captura, nombre, sector y año.
 * Las tarjetas entran en cascada al hacer scroll y se reacomodan con GSAP Flip al filtrar.
 */
export function ProjectIndex() {
  const { t, lang } = useI18n();
  const ix = t.projects.index;
  const items = useMemo(() => projectsFor(lang), [lang]);
  const [filter, setFilter] = useState<Filter>("todos");
  const root = useRef<HTMLElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);

  const capture = () => {
    const els = root.current?.querySelectorAll("[data-item]");
    if (els && !prefersReducedMotion()) flipState.current = Flip.getState(els, { props: "opacity" });
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    Flip.from(state, {
      duration: 0.7,
      ease: "power3.inOut",
      stagger: 0.015,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.2 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, y: 20, duration: 0.3 }),
    });
  }, [filter]);

  // Entrada en cascada al hacer scroll: un solo observador por lotes (no uno por tarjeta)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const els = gsap.utils.toArray<HTMLElement>("[data-item]", root.current);
      gsap.set(els, { autoAlpha: 0, y: 40 });
      ScrollTrigger.batch(els, {
        start: "top 94%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power3.out", overwrite: true }),
      });
    },
    { scope: root },
  );

  const counts = (k: Filter) => (k === "todos" ? items.length : items.filter((p) => p.category === k).length);

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
        </div>

        <ul className={cx(styles.items, styles.grid)} data-view="grid">
          {items.map((p, i) => {
            const visible = filter === "todos" || p.category === filter;
            return (
              <li key={p.slug} data-item data-flip-id={p.slug} className={styles.li} hidden={!visible}>
                <TLink
                  href={p.href}
                  className={styles.item}
                  style={vars({ "--c": COLOR_VAR[p.color] })}
                  data-cursor={t.cursor.view}
                >
                  <span className={styles.thumb}>
                    <SiteShot project={p} thumb sizes="(max-width: 760px) 92vw, (max-width: 1100px) 46vw, 30vw" priority={i < 3} />
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
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </TLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
