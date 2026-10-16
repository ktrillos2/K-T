"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { Logo } from "@/components/ui/Logo";
import { vars } from "@/lib/utils";
import styles from "./UniqueCompare.module.css";

/** Arte pixel de la tarjeta de producto (0 vacío, 1 rojo, 2 amarillo, 3 verde, 4 blanco). */
const ART = [
  0, 0, 4, 4, 0, 0,
  0, 4, 1, 1, 4, 0,
  4, 1, 2, 2, 1, 4,
  4, 1, 2, 3, 1, 4,
  0, 4, 1, 1, 4, 0,
  0, 0, 4, 4, 0, 0,
];

/** Flecha de cursor pixel (X borde, W relleno). */
const CURSOR_BMP = [
  "X",
  "XX",
  "XWX",
  "XWWX",
  "XWWWX",
  "XWWWWX",
  "XWWWWWX",
  "XWWWWWWX",
  "XWWWWWWWX",
  "XWWWWWWWWX",
  "XWWWWWXXXXX",
  "XWWXWWX",
  "XWX XWWX",
  "XX  XWWX",
  "X    XWWX",
  "     XWWX",
  "      XX",
];
const CURSOR = (() => {
  let edge = "";
  let fill = "";
  CURSOR_BMP.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch === "X") edge += `M${x} ${y}h1v1h-1z`;
      else if (ch === "W") fill += `M${x} ${y}h1v1h-1z`;
    }),
  );
  return { edge, fill };
})();

/**
 * "Lo que nos hace únicos": comparador de antes/después entre una plantilla genérica
 * y un diseño hecho a la medida. Se arrastra con el puntero, el teclado o el control deslizante.
 */
export function UniqueCompare() {
  const { t } = useI18n();
  const u = t.home.unique;
  const c = u.customBits;
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const dragging = useRef(false);
  const [touched, setTouched] = useState(false);

  // Las animaciones del mockup solo corren mientras el comparador está en pantalla.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (el.dataset.play = String(e.isIntersecting)), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Paralaje de las tarjetas con el puntero (variables CSS, sin renders de React).
  const onHover = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = frame.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const fromEvent = (clientX: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  // Al entrar en pantalla, el divisor "muestra" ambos lados antes de quedarse al centro.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !frame.current) return;
      const o = { v: 88 };
      gsap.to(o, {
        keyframes: [{ v: 12, duration: 1.1, ease: "power2.inOut" }, { v: 50, duration: 0.9, ease: "power3.out" }],
        onUpdate: () => !dragging.current && setPos(o.v),
        scrollTrigger: { trigger: frame.current, start: "top 70%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="band" aria-labelledby="h-unique">
      <div className="wrap">
        <SectionHead path={u.path} title={u.title} lead={u.lead} id="h-unique" />

        <Reveal>
          <div
            ref={frame}
            className={styles.frame}
            style={vars({ "--pos": `${pos}%` })}
            onPointerDown={(e) => {
              dragging.current = true;
              setTouched(true);
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              fromEvent(e.clientX);
            }}
            onPointerMove={(e) => {
              onHover(e);
              if (dragging.current) fromEvent(e.clientX);
            }}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
            data-cursor={t.cursor.drag}
          >
            {/* Plantilla genérica */}
            <div className={styles.side} aria-hidden="true">
              <div className={styles.tplNav}>
                <span className={styles.tplLogo}>LOGO</span>
                <span className={styles.tplLinks}>
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className={styles.tplHero}>
                <div className={styles.tplImg}>
                  <svg viewBox="0 0 100 60" preserveAspectRatio="none">
                    <path d="M0 60 L30 25 L50 45 L70 20 L100 60Z" />
                    <circle cx="78" cy="14" r="6" />
                  </svg>
                </div>
                <p className={styles.tplTitle}>{u.templateBits.title}</p>
                <p className={styles.tplSub}>{u.templateBits.sub}</p>
                <span className={styles.tplBtn}>{u.templateBits.btn}</span>
              </div>
              <div className={styles.tplCols}>
                {[0, 1, 2].map((i) => (
                  <span key={i}>
                    <b />
                    <i />
                    <i />
                  </span>
                ))}
              </div>
              <p className={styles.tplFoot}>
                {u.templateBits.foot}
                <span className={styles.tplMetrics}>
                  {u.templateBits.metrics.map((m) => (
                    <b key={m}>{m}</b>
                  ))}
                </span>
              </p>
              <span className={styles.tplLoad} />
              <span className={styles.tag}>{u.template}</span>
            </div>

            {/* A la medida: una mini web viva, con la identidad de K&T */}
            <div className={`${styles.side} ${styles.custom}`} aria-hidden="true">
              <span className={styles.cGlow} />
              <div className={styles.cNav}>
                <Logo className={styles.cLogo} title="" />
                <span className={styles.cLinks}>
                  {c.links.map((l, i) => (
                    <b key={l} data-on={i === 0}>
                      {l}
                    </b>
                  ))}
                </span>
                <span className={styles.cNavBtn}>{c.btn}</span>
              </div>

              <div className={styles.cHero}>
                <div className={styles.cCopy}>
                  <p className={styles.cKicker}>
                    <i /> {c.kicker}
                  </p>
                  <p className={`display ${styles.cTitle}`}>
                    {c.title} <span className={styles.cAccent}>{c.accent}</span>
                  </p>
                  <p className={styles.cSub}>{c.sub}</p>
                  <span className={styles.cBtns}>
                    <span className={styles.cBtn}>
                      {c.btn} <span>→</span>
                    </span>
                    <span className={styles.cBtnGhost}>{c.btn2}</span>
                  </span>
                  <span className={styles.cStats}>
                    {c.stats.map((st, i) => (
                      <span key={st.l} data-i={i}>
                        <b className="display">{st.v}</b>
                        {st.l}
                      </span>
                    ))}
                  </span>
                </div>

                <div className={styles.cStage}>
                  {/* Tarjeta de producto con arte pixel */}
                  <div className={`${styles.card} ${styles.cardProduct}`}>
                    <div className={styles.cArt}>
                      {Array.from({ length: 36 }, (_, i) => (
                        <i key={i} style={vars({ "--d": `${((i % 6) + Math.floor(i / 6)) * 0.07}s` })} data-c={ART[i]} />
                      ))}
                    </div>
                    <span className={styles.cardRow}>
                      <b>K&amp;T · 001</b>
                      <em>$389.000</em>
                    </span>
                    <span className={styles.cardAdd}>+</span>
                  </div>
                  {/* Gráfica de ventas */}
                  <div className={`${styles.card} ${styles.cardChart}`}>
                    <span className={styles.cardHead}>
                      {c.chart} <b>{c.stats[2].v}</b>
                    </span>
                    <span className={styles.bars}>
                      {[38, 52, 44, 70, 62, 86, 100].map((h, i) => (
                        <i key={i} style={vars({ "--h": `${h}%`, "--d": `${i * 0.09}s` })} />
                      ))}
                    </span>
                  </div>
                  {/* PageSpeed */}
                  <div className={`${styles.card} ${styles.cardGauge}`}>
                    <svg viewBox="0 0 44 44">
                      <circle cx="22" cy="22" r="18" />
                      <circle cx="22" cy="22" r="18" className={styles.gaugeArc} />
                    </svg>
                    <b className="display">{c.stats[1].v}</b>
                  </div>
                  {/* Notificación */}
                  <div className={`${styles.card} ${styles.cardToast}`}>
                    <i>✓</i> {c.toast}
                  </div>
                  {/* Cursor pixel que "usa" la web */}
                  <svg className={styles.pxCursor} viewBox="0 0 12 17" shapeRendering="crispEdges">
                    <path d={CURSOR.edge} fill="#0b0b0c" />
                    <path d={CURSOR.fill} fill="#f2f2ee" />
                  </svg>
                </div>
              </div>

              <div className={styles.ticker}>
                <span className={styles.tickerTrack}>
                  {[0, 1].map((k) => (
                    <span key={k}>
                      {c.ticker.map((w, i) => (
                        <span key={w}>
                          {w}
                          <i data-c={(i % 3) + 1}>✦</i>
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              </div>
              <span className={`${styles.tag} ${styles.tagCustom}`}>{u.custom}</span>
            </div>

            <div className={styles.handle} aria-hidden="true">
              <span className={styles.knob}>
                <i>◀</i>
                <i>▶</i>
              </span>
              <span className={styles.pill} data-hide={touched}>
                {u.handle}
              </span>
            </div>
            <label className="sr-only" htmlFor="unique-range">
              {u.range}
            </label>
            <input
              id="unique-range"
              className={styles.range}
              type="range"
              min={0}
              max={100}
              value={Math.round(pos)}
              onChange={(e) => {
                setTouched(true);
                setPos(Number(e.target.value));
              }}
            />
          </div>
        </Reveal>

        <Reveal as="ul" stagger={0.1} className={styles.points}>
          {u.points.map((p, i) => (
            <li key={p.t} className={styles.point}>
              <span className={styles.num}>0{i + 1}</span>
              <h3 className={`display ${styles.pt}`}>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
