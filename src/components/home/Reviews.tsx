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
/** Tarjeta con la que arranca la fila: la segunda, para que haya reseñas a ambos lados. */
const START = 1;

/**
 * Reseñas en un slider horizontal 2D:
 * - Las tarjetas se deslizan en fila; se arrastran con el mouse o el dedo (con inercia)
 *   y se acomodan en la más cercana. Clic en una tarjeta lateral la trae al centro.
 * - Avanza sola cada pocos segundos mientras nadie interactúa y la sección está en pantalla.
 * - Abajo, clientes como botones de color y dos cintas con fragmentos de todas las reseñas.
 * Todo el movimiento va por transform/opacity en un solo ticker (sin re-renders por frame).
 */
type Item = {
  slug: string;
  name: string;
  sector: string;
  href?: string;
  color: ProjectView["color"];
  testimonial: { quote: string; author: string; role: string; avatar?: string; rating?: number };
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
      testimonial: { quote: r.message, author: r.name, role: r.role ?? "", avatar: r.avatar, rating: r.rating },
    };
  });
}

export function Reviews({ path, title, lead, reviews = TESTIMONIALS }: { path?: string; title?: string; lead?: string; reviews?: Testimonial[] }) {
  const { t, lang } = useI18n();
  const r = t.home.reviews;
  const items = useMemo(() => reviewItems(reviews, projectsFor(lang)), [reviews, lang]);
  const n = items.length;
  const [active, setActive] = useState(() => Math.min(START, Math.max(0, items.length - 1)));
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
    // pos = índice "continuo" de la tarjeta centrada (0 = primera)
    const state = { pos: Math.min(START, n - 1), vel: 0, dragging: false, x0: 0, pos0: 0, lastX: 0, lastT: 0, moved: 0, idle: 0, visible: false, hover: false };
    let last = -1;
    let snapTween: ReturnType<typeof gsap.to> | null = null;

    const pitch = () => {
      const c = cards[0];
      if (!c) return 380;
      const gap = parseFloat(getComputedStyle(rg).columnGap) || 20;
      return c.offsetWidth + gap;
    };
    let P = pitch();

    const render = () => {
      const center = (st.clientWidth - (cards[0]?.offsetWidth || 0)) / 2;
      rg.style.transform = `translateX(${(center - state.pos * P).toFixed(2)}px)`;
      cards.forEach((c, i) => {
        const f = Math.max(0, 1 - Math.abs(i - state.pos));
        c.style.opacity = (0.35 + f * 0.65).toFixed(3);
        c.style.scale = (0.92 + f * 0.08).toFixed(3);
        c.style.setProperty("--f", f.toFixed(3));
      });
      const idx = Math.max(0, Math.min(n - 1, Math.round(state.pos)));
      if (idx !== last) {
        last = idx;
        setActive(idx);
      }
    };

    const snap = (target?: number) => {
      snapTween?.kill();
      const to = Math.max(0, Math.min(n - 1, target ?? Math.round(state.pos)));
      state.vel = 0;
      snapTween = gsap.to(state, { pos: to, duration: reduced ? 0 : 0.8, ease: "expo.out", onUpdate: render });
    };

    const goTo = (i: number) => {
      state.idle = 0;
      snap(((i % n) + n) % n);
    };
    api.current = { goTo };

    // Inercia + avance automático en un único ticker
    const tick = (_t: number, dtMs: number) => {
      if (state.dragging || snapTween?.isActive()) return;
      if (Math.abs(state.vel) > 0.002) {
        state.pos += state.vel * (dtMs / 16);
        state.vel *= 0.9;
        if (state.pos < 0 || state.pos > n - 1) state.vel *= 0.5;
        render();
        if (Math.abs(state.vel) <= 0.002) snap();
        return;
      }
      if (!reduced && state.visible && !state.hover && !document.hidden) {
        state.idle += dtMs;
        if (state.idle > AUTO_MS) {
          state.idle = 0;
          goTo(Math.round(state.pos) + 1);
        }
      }
    };
    gsap.ticker.add(tick);

    // Arrastre
    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      snapTween?.kill();
      state.dragging = true;
      state.x0 = state.lastX = e.clientX;
      state.pos0 = state.pos;
      state.lastT = performance.now();
      state.vel = 0;
      state.moved = 0;
      st.setPointerCapture(e.pointerId);
      st.dataset.drag = "true";
    };
    const move = (e: PointerEvent) => {
      if (!state.dragging) return;
      state.pos = state.pos0 - (e.clientX - state.x0) / P;
      const now = performance.now();
      const dt = Math.max(1, now - state.lastT);
      state.vel = (-(e.clientX - state.lastX) / P) * (16 / dt);
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
      if (Math.abs(state.vel) < 0.03) snap();
    };
    // Clic en una tarjeta lateral: traerla al centro (si no fue un arrastre)
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
      P = pitch();
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
  }, [n]);

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

          {/* Fila deslizable */}
          <div ref={stage} className={styles.stage} data-cursor={t.cursor.drag} data-drag="false">
            <div>
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
                          {"★".repeat(tm.rating || 5)}
                        </span>
                      </span>
                      <blockquote className={styles.quote}>
                        <p>{tm.quote}</p>
                      </blockquote>
                      <figcaption className={styles.who}>
                        <span className={styles.avatar}>
                          {tm.avatar ? (
                            <img
                              src={tm.avatar}
                              alt={tm.author}
                              width={36}
                              height={36}
                              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                            />
                          ) : (
                            initialsOf(tm.author)
                          )}
                        </span>
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
