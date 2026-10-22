"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { COLOR_VAR } from "@/lib/routes";
import { vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsFor } from "@/i18n";
import { SectionHead } from "@/components/ui/SectionHead";
import { SiteShot } from "@/components/ui/SiteShot";
import { LiveModal, type Device } from "@/components/ui/LiveModal";
import { TLink } from "@/components/transition/TLink";
import type { ProjectView } from "@/lib/projects";
import styles from "./FeaturedStack.module.css";

const AUTO_MS = 7000;

/**
 * Proyectos destacados en un slider 2D: el proyecto activo entra deslizando desde un lado
 * y el anterior sale hacia el otro. Flechas, puntos, arrastre y avance automático
 * mientras la sección está en pantalla (se detiene al interactuar).
 */
export function FeaturedStack() {
  const { t, lang } = useI18n();
  const f = t.home.featured;
  const items = useMemo(() => projectsFor(lang).filter((p) => p.featured).sort((a, b) => (a.featured ?? 9) - (b.featured ?? 9)), [lang]);
  const root = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const prev = useRef(0);
  const dir = useRef(1);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const [live, setLive] = useState<ProjectView | null>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const N = items.length;

  const go = useCallback(
    (to: number, d?: number, user = true) => {
      const next = (to + N) % N;
      if (next === prev.current) return;
      dir.current = d ?? (next > prev.current ? 1 : -1);
      if (user) setAuto(false);
      setIdx(next);
    },
    [N],
  );

  // Transición entre slides
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", el);
      const from = prev.current;
      prev.current = idx;
      slides.forEach((s, i) => gsap.set(s, { autoAlpha: i === idx || i === from ? 1 : 0, zIndex: i === idx ? 2 : 1 }));
      if (from === idx || prefersReducedMotion()) {
        slides.forEach((s, i) => gsap.set(s, { autoAlpha: i === idx ? 1 : 0, x: 0 }));
        return;
      }
      const d = dir.current;
      const out = slides[from];
      const inn = slides[idx];
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(out, { xPercent: -14 * d, autoAlpha: 0, duration: 0.55, ease: "power2.in" }, 0);
      tl.fromTo(inn, { xPercent: 14 * d, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.8 }, 0.25);
      tl.fromTo(inn.querySelector("[data-media]"), { clipPath: "inset(0% 0% 0% 12% round 14px)" }, { clipPath: "inset(0% 0% 0% 0% round 14px)", duration: 0.9 }, 0.25);
      tl.fromTo(inn.querySelectorAll("[data-info]"), { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.6 }, 0.4);
    },
    { scope: root, dependencies: [idx] },
  );

  // Avance automático solo con la sección en pantalla
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      ScrollTrigger.create({ trigger: el, start: "top 70%", end: "bottom 30%", onToggle: (self) => setInView(self.isActive) });
    },
    { scope: root },
  );
  useEffect(() => {
    if (!auto || !inView || prefersReducedMotion() || N < 2) return;
    const id = window.setTimeout(() => go(idx + 1, 1, false), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [auto, inView, idx, go, N]);

  // Arrastre horizontal
  const drag = useRef<{ x: number; y: number } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: React.PointerEvent) => {
    const s = drag.current;
    drag.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(idx + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  };

  return (
    <section ref={root} className={styles.section} aria-labelledby="h-featured" aria-roledescription="carousel">
      <div className="wrap">
        <SectionHead path={f.path} title={f.title} lead={f.lead} id="h-featured" />

        <div className={styles.stage} onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (drag.current = null)}>
          {items.map((p, i) => (
            <article
              key={p.slug}
              data-slide
              className={styles.slide}
              style={vars({ "--c": COLOR_VAR[p.color] })}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${N}: ${p.name}`}
              aria-hidden={i !== idx}
              data-active={i === idx}
            >
              <div className={styles.window}>
                <div className={styles.bar}>
                  <span className="dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.url}>{p.domain}</span>
                </div>
                <div data-media className={styles.media}>
                  <TLink href={p.href} className={styles.mediaLink} data-cursor={f.viewCase} tabIndex={-1} aria-hidden="true">
                    <SiteShot project={p} scrollOnHover className={styles.shot} fit="frame" />
                  </TLink>
                  {p.site && (
                    <button
                      type="button"
                      className={styles.liveBtn}
                      tabIndex={i === idx ? 0 : -1}
                      onClick={() => {
                        setDevice("desktop");
                        setLive(p);
                      }}
                    >
                      <i aria-hidden="true" /> {f.liveToggle}
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.info}>
                <p data-info className={styles.meta}>
                  {t.projects.category[p.category]} · {p.location}
                </p>
                <h3 data-info className={`display ${styles.name}`}>
                  {p.name}
                </h3>
                {p.results?.[0] && (
                  <p data-info className={styles.result}>
                    ↑ {p.results[0]}
                  </p>
                )}
                {p.speed && (
                  <p data-info className={styles.speed}>
                    <small>{f.metrics.speed}</small>
                    <b className="tnum">
                      {p.speed.before ? <em>{p.speed.before} → </em> : null}
                      {p.speed.after}
                    </b>
                  </p>
                )}
                <div data-info>
                  <TLink href={p.href} className="btn btn--solid btn--sm" data-stick tabIndex={i === idx ? 0 : -1}>
                    {f.viewCase} <span className="arr">→</span>
                  </TLink>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles.nav}>
            <button type="button" className={styles.arrow} onClick={() => go(idx - 1, -1)} aria-label={f.prev}>
              ←
            </button>
            <div className={styles.dots}>
              {items.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  className={styles.dot}
                  data-on={i === idx}
                  data-auto={auto && inView && i === idx}
                  style={vars({ "--c": COLOR_VAR[p.color], "--ms": `${AUTO_MS}ms` })}
                  onClick={() => go(i)}
                  aria-label={p.name}
                  aria-current={i === idx}
                >
                  <i />
                </button>
              ))}
            </div>
            <button type="button" className={styles.arrow} onClick={() => go(idx + 1, 1)} aria-label={f.next}>
              →
            </button>
          </div>
          <TLink href="/proyectos" className="btn btn--ghost" data-stick>
            {f.all} <span className="arr">→</span>
          </TLink>
        </div>
      </div>

      {live && <LiveModal project={live} device={device} onDevice={setDevice} onClose={() => setLive(null)} />}
    </section>
  );
}
