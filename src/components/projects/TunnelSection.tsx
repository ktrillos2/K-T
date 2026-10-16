"use client";

import { useMemo, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, SCRAMBLE_CHARS, prefersReducedMotion } from "@/lib/gsap";
import { PROJECTS } from "@/lib/projects";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsFor } from "@/i18n";
import { TLink } from "@/components/transition/TLink";
import { COLOR_VAR } from "@/lib/routes";
import { live } from "@/lib/store";
import { vars } from "@/lib/utils";
import styles from "./TunnelSection.module.css";

const N = PROJECTS.length;

/**
 * Sección alta que "conduce" el túnel 3D: su progreso de scroll mueve las tarjetas en Z.
 * El HUD fijo muestra el proyecto que está frente a la cámara.
 */
export function TunnelSection() {
  const root = useRef<HTMLElement>(null);
  const { t, lang, href } = useI18n();
  const tt = t.projects.tunnel;
  const items = useMemo(() => projectsFor(lang), [lang]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = <T extends HTMLElement>(s: string) => el.querySelector<T>(s);
      const idx = q("[data-idx]");
      const name = q("[data-name]");
      const sector = q("[data-sector]");
      const date = q("[data-date]");
      const summary = q("[data-summary]");
      const stack = q("[data-stack]");
      const link = q<HTMLAnchorElement>("[data-link]");
      const dot = q("[data-dot]");
      const bar = q("[data-bar]");
      const ticks = Array.from(el.querySelectorAll<HTMLElement>("[data-tick]"));
      const reduced = prefersReducedMotion();

      const progress = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          live.tunnel = self.progress;
          if (bar) bar.style.transform = `scaleY(${self.progress})`;
        },
      });
      // Visibilidad del túnel: aparece cuando el título del hero ya subió (antes las tarjetas
      // quedaban detrás del h1 al cargar y el texto no se leía) y se desvanece al salir.
      const vis = ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 15%",
        onUpdate: (self) => {
          const p = self.progress;
          const span = Math.max(0.0001, window.innerHeight * 0.45) / Math.max(1, self.end - self.start);
          const fadeIn = Math.min(1, p / span);
          const fadeOut = Math.min(1, (1 - p) / span);
          live.tunnelVis = Math.max(0, Math.min(fadeIn, fadeOut));
        },
        onLeave: () => (live.tunnelVis = 0),
        onLeaveBack: () => (live.tunnelVis = 0),
      });

      let shown = -1;
      const tick = () => {
        const i = Math.min(N - 1, Math.max(0, live.tunnelIndex));
        if (i === shown) return;
        shown = i;
        const p = items[i];
        if (idx) idx.textContent = `${String(i + 1).padStart(2, "0")} / ${N}`;
        if (sector) sector.textContent = p.sector + (p.location ? ` · ${p.location}` : "");
        if (date) date.textContent = p.dateLabel;
        if (summary) summary.textContent = p.summary;
        if (stack) stack.innerHTML = p.tags.map((s) => `<span>${s.replace(/</g, "&lt;")}</span>`).join("");
        if (link) {
          link.href = href(p.href);
          link.setAttribute("aria-label", tt.openAria(p.name));
        }
        if (dot) dot.style.background = COLOR_VAR[p.color];
        ticks.forEach((t, k) => (t.dataset.on = String(k === i)));
        if (name) {
          if (reduced) name.textContent = p.name;
          else gsap.to(name, { duration: 0.6, scrambleText: { text: p.name, chars: SCRAMBLE_CHARS, speed: 1 }, overwrite: true });
        }
        if (!reduced && summary) gsap.fromTo([sector, date, summary, stack].filter(Boolean), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.4, overwrite: true });
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        progress.kill();
        vis.kill();
        live.tunnel = 0;
        live.tunnelVis = 0;
      };
    },
    { scope: root, dependencies: [items], revertOnUpdate: true },
  );

  const first = items[0];

  return (
    <section ref={root} className={styles.section} style={vars({ "--n": N })} aria-label={tt.aria}>
      <div className={styles.sticky}>
        <div className={`wrap ${styles.hud}`}>
          <div className={styles.panel}>
            <p className={styles.top}>
              <span data-dot className={styles.dot} style={{ background: COLOR_VAR[first.color] }} />
              <span data-idx className="tnum">
                01 / {N}
              </span>
              <span className={styles.sep}>·</span>
              <span data-date>{first.dateLabel}</span>
            </p>
            <h2 data-name className={`display ${styles.name}`} aria-live="polite">
              {first.name}
            </h2>
            <p data-sector className={styles.sector}>
              {first.sector}
              {first.location ? ` · ${first.location}` : ""}
            </p>
            <p data-summary className={styles.summary}>
              {first.summary}
            </p>
            <p data-stack className={styles.stack}>
              {first.tags.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </p>
            <TLink data-link href={first.href} className="btn btn--solid btn--sm" data-stick>
              {tt.openCase} <span className="arr">→</span>
            </TLink>
          </div>

          <div className={styles.rail} aria-hidden="true">
            <span className={styles.railBar} data-bar />
            {PROJECTS.map((p, i) => (
              <span key={p.slug} data-tick data-on={i === 0} className={styles.tick} />
            ))}
          </div>

          <p className={styles.hint} aria-hidden="true">
            {tt.hint}
          </p>
        </div>
      </div>
    </section>
  );
}
