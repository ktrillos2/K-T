"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { COLOR_VAR } from "@/lib/routes";
import { initialsOf } from "@/lib/projects";
import { vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsFor } from "@/i18n";
import { TESTIMONIALS, type Testimonial } from "@/content/testimonials";
import type { ProjectView } from "@/lib/projects";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { TLink } from "@/components/transition/TLink";
import styles from "./Reviews.module.css";

/** Primera frase de una reseña, para la cinta inferior. */
const snippet = (q: string) => {
  const m = q.match(/^.*?[.!?](?=\s|$)/);
  const s = m ? m[0] : q;
  return s.length > 78 ? `${s.slice(0, 75).trimEnd()}…` : s;
};

const AUTO_MS = 6500;

/**
 * Reseñas en un carrusel 3D (anillo):
 * - Las tarjetas giran alrededor de un eje; se arrastran con el mouse o el dedo (con inercia)
 *   y se acomodan en la más cercana. Clic en una tarjeta lateral la trae al frente.
 * - Avanza sola cada pocos segundos mientras nadie interactúa y la sección está en pantalla.
 * - El conjunto se inclina con el puntero; la tarjeta del frente muestra el enlace al proyecto.
 * - Abajo, clientes como botones de color y dos cintas con fragmentos de todas las reseñas.
 * Todo el movimiento va por transform/opacity en un solo ticker (sin re-renders por frame).
 */
type Item = {
  slug: string;
  name: string;
  sector: string;
  href?: string;
  color: ProjectView["color"];
  testimonial: { quote: string; author: string; role: string };
};

const CYCLE: ProjectView["color"][] = ["red", "yellow", "green"];

/** Convierte una reseña en lo que pinta la tarjeta (color y enlace del proyecto, si existe). */
export function reviewItems(reviews: Testimonial[], projects: ProjectView[]): Item[] {
  return reviews.map((r, i) => {
    const p = r.project ? projects.find((x) => x.slug === r.project) : undefined;
    return {
      slug: r.id,
      name: r.projectName || p?.name || "",
      sector: p?.sector ?? "",
      href: p?.href,
      color: p?.color ?? CYCLE[i % 3],
      testimonial: { quote: r.message, author: r.name, role: r.role ?? "" },
    };
  });
}

export function Reviews({ path, title, lead, reviews = TESTIMONIALS }: { path?: string; title?: string; lead?: string; reviews?: Testimonial[] }) {
  const { t, lang } = useI18n();
  const r = t.home.reviews;
  const items = useMemo(() => reviewItems(reviews, projectsFor(lang)), [reviews, lang]);
  const n = items.length;
  const step = 360 / Math.max(1, n);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const api = useRef<{ goTo: (i: number) => void } | null>(null);

  useEffect(() => {
    const st = stage.current;
    const rg = ring.current;
    const sec = root.current;
    if (!st || !rg || !sec || !n) return;
    const cards: HTMLElement[] = Array.from(rg.querySelectorAll<HTMLElement>("[data-card]"));
    const reduced = prefersReducedMotion();
    const state = { rot: 0, vel: 0, dragging: false, x0: 0, rot0: 0, lastX: 0, lastT: 0, moved: 0, idle: 0, visible: false, hover: false };
    let last = -1;
    let snapTween: ReturnType<typeof gsap.to> | null = null;

    const radius = () => {
      const w = cards[0]?.offsetWidth || 360;
      return Math.round(w / 2 / Math.tan(Math.PI / n)) + 24;
    };
    let R = radius();

    const render = () => {
      rg.style.transform = `translateZ(${-R}px) rotateY(${state.rot.toFixed(3)}deg)`;
      cards.forEach((c, i) => {
        // Qué tan de frente está cada tarjeta (1 = al frente, 0 = detrás)
        let a = (((i * step + state.rot) % 360) + 360) % 360;
        if (a > 180) a -= 360;
        const f = Math.max(0, 1 - Math.abs(a) / 110);
        c.style.transform = `rotateY(${i * step}deg) translateZ(${R}px)`;
        c.style.opacity = (0.08 + f * 0.92).toFixed(3);
        c.style.setProperty("--f", f.toFixed(3));
      });
      const idx = ((Math.round(-state.rot / step) % n) + n) % n;
      if (idx !== last) {
        last = idx;
        setActive(idx);
      }
    };

    const snap = (target?: number) => {
      snapTween?.kill();
      const to = target ?? Math.round(state.rot / step) * step;
      state.vel = 0;
      snapTween = gsap.to(state, { rot: to, duration: reduced ? 0 : 0.9, ease: "expo.out", onUpdate: render });
    };

    const goTo = (i: number) => {
      // Camino más corto hacia la tarjeta i
      const cur = Math.round(-state.rot / step);
      let d = ((((i - cur) % n) + n) % n);
      if (d > n / 2) d -= n;
      state.idle = 0;
      snap(-(cur + d) * step);
    };
    api.current = { goTo };

    // Inercia + avance automático en un único ticker
    const tick = (_t: number, dtMs: number) => {
      if (state.dragging || snapTween?.isActive()) return;
      if (Math.abs(state.vel) > 0.02) {
        state.rot += state.vel * (dtMs / 16);
        state.vel *= 0.92;
        render();
        if (Math.abs(state.vel) <= 0.02) snap();
        return;
      }
      if (!reduced && state.visible && !state.hover && !document.hidden) {
        state.idle += dtMs;
        if (state.idle > AUTO_MS) {
          state.idle = 0;
          goTo(Math.round(-state.rot / step) + 1);
        }
      }
    };
    gsap.ticker.add(tick);

    const degPerPx = () => (step * 1.4) / Math.max(200, cards[0]?.offsetWidth || 360);

    // Arrastre
    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      snapTween?.kill();
      state.dragging = true;
      state.x0 = state.lastX = e.clientX;
      state.rot0 = state.rot;
      state.lastT = performance.now();
      state.vel = 0;
      state.moved = 0;
      st.setPointerCapture(e.pointerId);
      st.dataset.drag = "true";
    };
    const move = (e: PointerEvent) => {
      // Inclinación del conjunto según el puntero (solo mouse)
      if (e.pointerType === "mouse") {
        const b = st.getBoundingClientRect();
        st.style.setProperty("--tx", (((e.clientX - b.left) / b.width) * 2 - 1).toFixed(3));
        st.style.setProperty("--ty", (((e.clientY - b.top) / b.height) * 2 - 1).toFixed(3));
      }
      if (!state.dragging) return;
      const k = degPerPx();
      state.rot = state.rot0 + (e.clientX - state.x0) * k;
      const now = performance.now();
      const dt = Math.max(1, now - state.lastT);
      state.vel = ((e.clientX - state.lastX) * k * 16) / dt;
      state.moved += Math.abs(e.clientX - state.lastX);
      state.lastX = e.clientX;
      state.lastT = now;
      render();
    };
    const up = () => {
      if (!state.dragging) return;
      state.dragging = false;
      st.dataset.drag = "false";
      state.idle = 0;
      if (Math.abs(state.vel) < 0.3) snap();
    };
    // Clic en una tarjeta lateral: traerla al frente (si no fue un arrastre)
    const click = (e: MouseEvent) => {
      if (state.moved > 6) return;
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) return;
      const card = target.closest<HTMLElement>("[data-card]");
      if (card) goTo(Number(card.dataset.card));
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") state.hover = true;
    };
    const leave = () => {
      state.hover = false;
      st.style.setProperty("--tx", "0");
      st.style.setProperty("--ty", "0");
    };
    st.addEventListener("pointerdown", down);
    st.addEventListener("pointermove", move);
    st.addEventListener("pointerup", up);
    st.addEventListener("pointercancel", up);
    st.addEventListener("click", click);
    st.addEventListener("pointerenter", enter);
    st.addEventListener("pointerleave", leave);

    const io = new IntersectionObserver(
      ([e]) => {
        state.visible = e.isIntersecting;
        sec.dataset.play = String(e.isIntersecting);
      },
      { rootMargin: "60px" },
    );
    io.observe(sec);

    const ro = new ResizeObserver(() => {
      R = radius();
      render();
    });
    ro.observe(st);
    render();

    return () => {
      gsap.ticker.remove(tick);
      snapTween?.kill();
      io.disconnect();
      ro.disconnect();
      st.removeEventListener("pointerdown", down);
      st.removeEventListener("pointermove", move);
      st.removeEventListener("pointerup", up);
      st.removeEventListener("pointercancel", up);
      st.removeEventListener("click", click);
      st.removeEventListener("pointerenter", enter);
      st.removeEventListener("pointerleave", leave);
      api.current = null;
    };
  }, [n, step]);

  const go = (i: number) => api.current?.goTo(i);
  const cur = items[active];
  if (!cur) return null;
  const rows = [items, [...items].reverse()];

  return (
    <section ref={root} className={`band ${styles.section}`} aria-labelledby="h-reviews" style={vars({ "--c": COLOR_VAR[cur.color] })}>
      <div className="wrap">
        <SectionHead path={path ?? r.path} title={title ?? r.title} lead={lead ?? r.lead} id="h-reviews" />

        <Reveal className={styles.shell}>
          <div className={styles.score}>
            <span className={`display ${styles.scoreNum}`}>5.0</span>
            <span className={styles.stars} aria-hidden="true">
              {[0, 1, 2, 3, 4].map((s) => (
                <i key={s} style={vars({ "--d": `${s * 0.08}s` })} />
              ))}
            </span>
            <span className={styles.scoreMeta}>{r.count(n)}</span>
          </div>

          {/* Anillo 3D */}
          <div ref={stage} className={styles.stage} data-cursor={t.cursor.drag} data-drag="false">
            <span className={styles.floor} aria-hidden="true" />
            <div className={styles.tilt}>
              <div ref={ring} className={styles.ring}>
                {items.map((p, k) => {
                  const tm = p.testimonial!;
                  const front = k === active;
                  return (
                    <figure key={p.slug} className={styles.card} data-card={k} data-front={front} style={vars({ "--cc": COLOR_VAR[p.color] })} aria-hidden={!front}>
                      <span className={styles.cardTop}>
                        <svg className={styles.mark} viewBox="0 0 7 5" shapeRendering="crispEdges" aria-hidden="true">
                          <path d="M0 0h3v3h-1v2h-2zM4 0h3v3h-1v2h-2z" />
                        </svg>
                        <span className={styles.cardStars} aria-hidden="true">
                          ★★★★★
                        </span>
                      </span>
                      <blockquote className={styles.quote}>
                        <p>{tm.quote}</p>
                      </blockquote>
                      <figcaption className={styles.who}>
                        <span className={styles.avatar}>{initialsOf(tm.author)}</span>
                        <span className={styles.whoText}>
                          <strong>{tm.author}</strong>
                          <span>{!tm.role ? p.name : tm.role.includes(p.name) ? tm.role : `${tm.role} · ${p.name}`}</span>
                        </span>
                      </figcaption>
                      {p.href ? (
                        <TLink href={p.href} className={styles.link} tabIndex={front ? 0 : -1}>
                          {r.seeProject} →
                        </TLink>
                      ) : (
                        <span />
                      )}
                    </figure>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Controles */}
          <div className={styles.controls}>
            <button type="button" className={styles.arrow} onClick={() => go(active - 1)} aria-label={r.prev} data-stick>
              ←
            </button>
            <ol className={styles.dots} aria-label={r.title}>
              {items.map((p, k) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    className={styles.dot}
                    data-on={k === active}
                    style={vars({ "--cc": COLOR_VAR[p.color] })}
                    onClick={() => go(k)}
                    aria-label={`${p.name}: ${p.testimonial!.author}`}
                    aria-current={k === active}
                  >
                    <span>{initialsOf(p.testimonial!.author)}</span>
                  </button>
                </li>
              ))}
            </ol>
            <button type="button" className={styles.arrow} onClick={() => go(active + 1)} aria-label={r.next} data-stick>
              →
            </button>
          </div>
          <p className={styles.now} aria-live="polite">
            <span className="tnum">
              {String(active + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}
            </span>{" "}
            · {cur.name}
            {cur.sector ? ` · ${cur.sector}` : ""}
          </p>
          <TLink href="/testimonios#dejar-resena" className={styles.leave} data-stick>
            ✎ {t.landing.testimonials.form.cta} <span aria-hidden="true">→</span>
          </TLink>
        </Reveal>
      </div>

      {/* Cintas con fragmentos de todas las reseñas */}
      <div className={styles.ribbons} aria-hidden="true">
        {rows.map((row, ri) => (
          <div key={ri} className={styles.ribbon} data-dir={ri}>
            <div className={styles.track}>
              {[0, 1].map((dup) =>
                row.map((p) => (
                  <button key={`${dup}-${p.slug}`} type="button" tabIndex={-1} className={styles.chip} style={vars({ "--cc": COLOR_VAR[p.color] })} onClick={() => go(items.indexOf(p))}>
                    <i />
                    “{snippet(p.testimonial!.quote)}”<b>{p.name}</b>
                  </button>
                )),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
