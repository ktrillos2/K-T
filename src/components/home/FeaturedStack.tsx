"use client";

import { useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { COLOR_VAR } from "@/lib/routes";
import { vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsFor } from "@/i18n";
import { useSceneDim } from "@/hooks/useSceneDim";
import { SectionHead } from "@/components/ui/SectionHead";
import { SiteShot } from "@/components/ui/SiteShot";
import { LiveModal, type Device } from "@/components/ui/LiveModal";
import { TLink } from "@/components/transition/TLink";
import type { ProjectView } from "@/lib/projects";
import styles from "./FeaturedStack.module.css";

/**
 * Proyectos destacados: una pila 3D guiada por el scroll. Cada proyecto llega desde el fondo
 * (se acerca a la cámara), su captura se revela desde una ventana recortada, el nombre sube
 * letra por letra y, al seguir bajando, el proyecto pasa de largo y entra el siguiente.
 */
export function FeaturedStack() {
  const { t, lang } = useI18n();
  const f = t.home.featured;
  const items = useMemo(() => projectsFor(lang).filter((p) => p.featured).sort((a, b) => (a.featured ?? 9) - (b.featured ?? 9)), [lang]);
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState<ProjectView | null>(null);
  const [device, setDevice] = useState<Device>("desktop");
  useSceneDim(stage, 0.75);
  const N = items.length;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", el);
      const names = gsap.utils.toArray<HTMLElement>("[data-name]", el);
      const bgs = gsap.utils.toArray<HTMLElement>("[data-bg]", el);
      const counter = el.querySelector<HTMLElement>("[data-counter]");
      const bar = el.querySelector<HTMLElement>("[data-bar]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-dot]", el);
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();
      mm.add({ desk: "(min-width: 861px)", mob: "(max-width: 860px)" }, (ctx) => {
        const desk = !!ctx.conditions?.desk;
        const depth = desk ? 1800 : 900;
        // words + chars: las letras se animan una por una pero el renglón solo se corta entre palabras
        // (con "chars" a secas "GMX Gaming" se partía en "GMX G / aming").
        const splits = names.map((n) => SplitText.create(n, { type: "words,chars", mask: "chars", wordsClass: styles.word }));

        cards.forEach((c, i) => {
          const media = c.querySelector("[data-media]");
          const img = c.querySelector("[data-img]");
          const info = c.querySelectorAll("[data-info]");
          gsap.set(c, { z: i === 0 ? 0 : -depth, yPercent: i === 0 ? 0 : 18, rotateX: i === 0 ? 0 : 18, rotateY: i === 0 ? 0 : i % 2 ? -16 : 16, autoAlpha: i === 0 ? 1 : 0, filter: i === 0 ? "blur(0px)" : "blur(14px)" });
          gsap.set(media, { clipPath: i === 0 ? "inset(0% 0% 0% 0% round 14px)" : "inset(22% 18% 22% 18% round 28px)" });
          gsap.set(img, { scale: i === 0 ? 1 : 1.35 });
          if (i > 0) {
            gsap.set(splits[i].chars, { yPercent: 115 });
            gsap.set(info, { autoAlpha: 0, y: 24 });
          }
        });
        gsap.set(bgs, { autoAlpha: (i: number) => (i === 0 ? 1 : 0) });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el.querySelector("[data-track]"),
            start: "top top",
            end: "bottom bottom",
            scrub: 0.9,
            onUpdate: (self) => {
              const p = self.progress;
              const idx = Math.min(N - 1, Math.round(p * (N - 1)));
              if (counter) counter.textContent = `0${idx + 1}`;
              if (bar) bar.style.transform = `scaleX(${p})`;
              dots.forEach((d, k) => (d.dataset.on = String(k === idx)));
            },
          },
        });

        // Entrada del primer proyecto (mientras la sección se fija)
        tl.from(splits[0].chars, { yPercent: 115, stagger: 0.02, duration: 0.3, ease: "power3.out" }, 0);

        for (let i = 0; i < N - 1; i++) {
          const at = i + 0.15;
          const cur = cards[i];
          const next = cards[i + 1];
          // El actual se acerca a la cámara y pasa de largo
          tl.to(cur, { z: desk ? 700 : 350, yPercent: -12, rotateX: -10, autoAlpha: 0, filter: "blur(10px)", duration: 0.75, ease: "power2.in" }, at);
          tl.to(cur.querySelector("[data-img]"), { scale: 1.2, duration: 0.75, ease: "power2.in" }, at);
          tl.to(bgs[i], { autoAlpha: 0, duration: 0.5 }, at);
          // El siguiente llega desde el fondo
          tl.to(next, { z: 0, yPercent: 0, rotateX: 0, rotateY: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.85, ease: "power3.out" }, at + 0.15);
          tl.to(next.querySelector("[data-media]"), { clipPath: "inset(0% 0% 0% 0% round 14px)", duration: 0.7, ease: "power2.out" }, at + 0.35);
          tl.to(next.querySelector("[data-img]"), { scale: 1, duration: 0.9, ease: "power2.out" }, at + 0.3);
          tl.to(splits[i + 1].chars, { yPercent: 0, stagger: 0.015, duration: 0.4, ease: "power3.out" }, at + 0.55);
          tl.to(next.querySelectorAll("[data-info]"), { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.35 }, at + 0.65);
          tl.to(bgs[i + 1], { autoAlpha: 1, duration: 0.5 }, at + 0.3);
        }
        tl.to({}, { duration: 0.35 });

        return () => splits.forEach((s) => s.revert());
      });

      // Inclinación con el puntero sobre la tarjeta activa (en un contenedor interno para no chocar con el scroll)
      const tilt = gsap.utils.toArray<HTMLElement>("[data-tilt]", el);
      const handlers = tilt.map((tEl) => {
        const rx = gsap.quickTo(tEl, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(tEl, "rotationY", { duration: 0.6, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = tEl.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 8);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        tEl.addEventListener("pointermove", move);
        tEl.addEventListener("pointerleave", leave);
        return () => {
          tEl.removeEventListener("pointermove", move);
          tEl.removeEventListener("pointerleave", leave);
        };
      });
      ScrollTrigger.refresh();
      return () => handlers.forEach((h) => h());
    },
    { scope: root, dependencies: [items] , revertOnUpdate: true },
  );

  return (
    <section ref={root} className={styles.section} aria-labelledby="h-featured" style={vars({ "--n": N })}>
      <div className="wrap">
        <SectionHead path={f.path} title={f.title} lead={f.lead} id="h-featured" />
      </div>

      <div className={styles.track} data-track>
        <div ref={stage} className={styles.sticky}>
          {items.map((p, i) => (
            <span key={p.slug} data-bg className={styles.bg} style={vars({ "--c": COLOR_VAR[p.color] })} aria-hidden="true" />
          ))}

          <div className={`wrap ${styles.hud}`} aria-hidden="true">
            <span className={styles.count}>
              <b data-counter>01</b> / 0{N}
            </span>
            <span className={styles.progress}>
              <i data-bar />
            </span>
            <span className={styles.dots}>
              {items.map((p, i) => (
                <i key={p.slug} data-dot data-on={i === 0} style={vars({ "--c": COLOR_VAR[p.color] })} />
              ))}
            </span>
          </div>

          <div className={styles.scene}>
            {items.map((p, i) => (
              <article key={p.slug} data-card className={styles.card} style={vars({ "--c": COLOR_VAR[p.color], "--i": i })} aria-label={p.name}>
                <div data-tilt className={styles.tilt}>
                  <div className={styles.window}>
                    <div className={styles.bar}>
                      <span className="dots" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className={styles.url}>{p.domain}</span>
                    </div>
                    <div data-media className={styles.media} style={!p.hasShot && p.coverRatio ? vars({ "--vr": p.coverRatio.toFixed(4) }) : undefined}>
                      <TLink href={p.href} className={styles.mediaLink} data-cursor={f.viewCase} tabIndex={-1} aria-hidden="true">
                        <div data-img className={styles.img}>
                          <SiteShot project={p} scrollOnHover className={styles.shot} fit="frame" />
                        </div>
                      </TLink>
                      {p.site && (
                        <button
                          type="button"
                          className={styles.liveBtn}
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
                      <span className={styles.idx}>0{i + 1}</span> {t.projects.category[p.category]} · {p.location}
                    </p>
                    <h3 className={`display ${styles.name}`}>
                      <span data-name>{p.name}</span>
                    </h3>
                    <p data-info className={styles.summary}>
                      {p.summary}
                    </p>
                    <ul data-info className={styles.metrics}>
                      {p.speed && (
                        <li>
                          <small>{f.metrics.speed}</small>
                          <b className="tnum">
                            {p.speed.before ? <em>{p.speed.before}→</em> : null}
                            {p.speed.after}
                          </b>
                        </li>
                      )}
                      {p.lcp && (
                        <li>
                          <small>{f.metrics.lcp}</small>
                          <b className="tnum">{(p.lcp / 1000).toFixed(2)}s</b>
                        </li>
                      )}
                      {p.pages && (
                        <li>
                          <small>{f.metrics.pages}</small>
                          <b className="tnum">{p.pages}</b>
                        </li>
                      )}
                    </ul>
                    {p.results?.[0] && (
                      <p data-info className={styles.result}>
                        ↑ {p.results[0]}
                      </p>
                    )}
                    <div data-info className={styles.ctas}>
                      <TLink href={p.href} className="btn btn--solid btn--sm" data-stick>
                        {f.viewCase} <span className="arr">→</span>
                      </TLink>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className={`wrap ${styles.foot}`}>
            <TLink href="/proyectos" className={styles.all} data-stick>
              {f.all} <span aria-hidden="true">→</span>
            </TLink>
          </div>
        </div>
      </div>

      {live && <LiveModal project={live} device={device} onDevice={setDevice} onClose={() => setLive(null)} />}
    </section>
  );
}
