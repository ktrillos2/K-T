"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const DIGITS = "0123456789";
import { PLANS, type PlanId } from "@/lib/pricing";
import { COLOR_VAR } from "@/lib/routes";
import { wa } from "@/lib/site";
import { scrollToEl } from "@/lib/lenis";
import { cx, vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { Tilt } from "@/components/motion/Tilt";
import { Price } from "@/components/ui/Price";
import { PlanArt } from "./PlanArt";
import { useMedia } from "@/hooks/useMedia";
import styles from "./Plans.module.css";

const MAX_DAYS = 45;
const VISIBLE = 3;

/** Avisa al cotizador qué plan se eligió desde una tarjeta. */
export const choosePlan = (id: PlanId) => window.dispatchEvent(new CustomEvent("kt:plan", { detail: id }));

/**
 * Planes como tarjetas interactivas: se levantan al pasar el puntero, barra de tiempo de entrega,
 * lista de lo incluido que se despliega, selección de plan y paso directo al cotizador.
 * En móvil son un carrusel con desplazamiento por pasos.
 */
export function Plans() {
  const { t, country } = useI18n();
  const pr = t.pricing;
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<PlanId | null>(null);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [slide, setSlide] = useState(0);
  // En el carrusel del celular la tarjeta centrada se "activa" (no hay hover).
  const mobile = useMedia("(max-width: 680px)");

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-days]", el).forEach((b) => {
        gsap.fromTo(b, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: b, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-feats]", el).forEach((list) => {
        gsap.from(list.children, { autoAlpha: 0, x: -10, stagger: 0.07, duration: 0.5, scrollTrigger: { trigger: list, start: "top 90%", once: true } });
      });
    },
    { scope: root },
  );

  /** Al entrar con el puntero, el precio "recalcula" con dígitos que giran. */
  const scramble = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = e.currentTarget.querySelector<HTMLElement>("[data-amount] [data-currency]");
    const text = el?.textContent;
    if (!el || !text || gsap.isTweening(el)) return;
    gsap.to(el, { duration: 0.6, scrambleText: { text, chars: DIGITS, speed: 1.2, tweenLength: false }, ease: "none" });
  };

  /** Lluvia de píxeles de colores desde el botón al elegir un plan. */
  const burst = (btn: HTMLElement) => {
    if (prefersReducedMotion()) return;
    const colors = ["var(--red)", "var(--yellow)", "var(--green)", "var(--fg)"];
    const b = btn.getBoundingClientRect();
    for (let i = 0; i < 18; i++) {
      const px = document.createElement("i");
      px.className = styles.px;
      px.style.background = colors[i % colors.length];
      px.style.left = `${b.left + b.width / 2}px`;
      px.style.top = `${b.top + b.height / 2}px`;
      document.body.appendChild(px);
      const a = (i / 18) * Math.PI * 2 + Math.random() * 0.3;
      const d = 50 + Math.random() * 70;
      gsap.fromTo(
        px,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        { x: Math.cos(a) * d, y: Math.sin(a) * d - 20, scale: 0.4, opacity: 0, duration: 0.7 + Math.random() * 0.3, ease: "power3.out", onComplete: () => px.remove() },
      );
    }
  };

  const spot = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const toQuote = (id: PlanId, btn?: HTMLElement) => {
    if (btn) burst(btn);
    setSelected(id);
    choosePlan(id);
    scrollToEl("#cotizar");
  };

  const onRail = () => {
    const r = rail.current;
    if (!r) return;
    const w = r.scrollWidth / PLANS.length;
    setSlide(Math.round(r.scrollLeft / w));
  };

  return (
    <section ref={root} className={styles.section} aria-label={t.nav.pricing}>
      <div className="wrap">
        <div ref={rail} className={styles.grid} onScroll={onRail} data-lenis-prevent-touch>
          {PLANS.map((p) => {
            const c = pr.plans[p.id];
            const isOpen = !!open[p.id];
            const extra = c.features.length - VISIBLE;
            const days = p.days;
            return (
              <Tilt key={p.id} as="article" className={styles.wrap} innerClassName={cx(styles.card, p.hot && styles.hot, selected === p.id && styles.selected, selected && selected !== p.id && styles.dim)} max={7}>
                <div
                  className={styles.cardInner}
                  onPointerMove={spot}
                  onPointerEnter={scramble}
                  style={vars({ "--c": COLOR_VAR[p.color] })}
                  data-plan-card
                  data-active={mobile && PLANS.indexOf(p) === slide}
                >
                  <span className={styles.spot} aria-hidden="true" />
                  <span className={styles.scan} aria-hidden="true" />
                  <div className={styles.head}>
                    <span className={styles.file}>
                      <i aria-hidden="true" /> {pr.file(p.id)}
                    </span>
                    {p.hot && <span className={styles.badge}>★ {pr.hot}</span>}
                  </div>
                  <div className={styles.art}>
                    <PlanArt id={p.id} />
                  </div>
                  <h3 className={cx("display", styles.name)}>{c.name}</h3>
                  <p className={styles.price}>
                    <span className={styles.from}>{t.price.from}</span>
                    <span className={cx("display", styles.amount)} data-amount>
                      <Price cop={p.from} showCode={false} />
                    </span>
                    <span className={styles.cur}>
                      {country.currency}
                      {p.quote ? ` · ${t.price.quote}` : ""}
                    </span>
                  </p>
                  <p className={styles.pitch}>{c.pitch}</p>

                  <div className={styles.time}>
                    <span className={styles.timeLabel}>
                      {pr.deliveryLabel}: <b>{c.delivery}</b>
                    </span>
                    <span className={styles.timeBar} aria-hidden="true">
                      {days ? (
                        <i data-days style={{ left: `${(days[0] / MAX_DAYS) * 100}%`, width: `${((days[1] - days[0]) / MAX_DAYS) * 100}%` }} />
                      ) : (
                        <i data-days className={styles.flex} />
                      )}
                    </span>
                  </div>

                  <ul className={styles.features} data-feats>
                    {c.features.map((f, k) => (
                      <li key={f} hidden={!isOpen && k >= VISIBLE} style={vars({ "--i": k })}>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {extra > 0 && (
                    <button type="button" className={styles.more} aria-expanded={isOpen} onClick={() => setOpen((o) => ({ ...o, [p.id]: !isOpen }))}>
                      {isOpen ? "− " : `+${extra} `}
                      {isOpen ? pr.less : pr.more}
                    </button>
                  )}

                  <div className={styles.actions}>
                    <button type="button" className={cx("btn", p.hot ? styles.ctaHot : "btn--solid", styles.cta)} onClick={(e) => toQuote(p.id, e.currentTarget)} data-stick>
                      {pr.build} <span className="arr">→</span>
                    </button>
                    <a className={styles.waLink} href={wa(t.wa.plan(c.name))} target="_blank" rel="noopener noreferrer">
                      {p.quote ? pr.talk : pr.ask} ↗
                    </a>
                  </div>
                </div>
              </Tilt>
            );
          })}
        </div>
        <div className={styles.pager} aria-hidden="true">
          {PLANS.map((p, i) => (
            <i key={p.id} data-on={i === slide} style={vars({ "--c": COLOR_VAR[p.color] })} />
          ))}
        </div>
        <p className={styles.note}>{pr.note}</p>
      </div>
    </section>
  );
}
