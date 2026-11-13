"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { wa } from "@/lib/site";
import { useI18n } from "@/i18n/I18nProvider";
import { cx } from "@/lib/utils";
import styles from "./BuildGame.module.css";

type Kind = "good" | "bad" | "gold";
type Piece = { el: HTMLSpanElement; x: number; y: number; w: number; vy: number; sway: number; phase: number; type: Kind; kind: number };
type Status = "idle" | "playing" | "won" | "lost";

const LIVES = 3;
const BASKET_W = 104;
const BASKET_WIDE = 190;
const BASKET_H = 18;
const WIDE_SECONDS = 7;
const BEST_KEY = "kt-game-best";
/** Ícono y color de cada pieza buena, en el mismo orden que el diccionario (logo, fotos, precios, whatsapp, reseñas, google). */
const GOOD = [
  { icon: "◆", color: "var(--red)" },
  { icon: "▣", color: "var(--yellow)" },
  { icon: "$", color: "var(--green)" },
  { icon: "✆", color: "#25d366" },
  { icon: "★", color: "var(--yellow)" },
  { icon: "G", color: "#6aa8ff" },
];
const BAD_ICONS = ["▦", "…", "✕"];

/**
 * "Arma tu página": al fondo hay una página en blanco; cada pieza buena que atrapas (dedo, mouse o
 * flechas) enciende su parte de la página. Las malas quitan vidas y la dorada agranda la canasta.
 * Las piezas y los destellos se mueven fuera de React para no re-renderizar en cada cuadro.
 */
export function BuildGame() {
  const { t } = useI18n();
  const g = t.footer.game;
  const field = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const basket = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [got, setGot] = useState<boolean[]>(() => g.good.map(() => false));
  const [lives, setLives] = useState(LIVES);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const sim = useRef({ pieces: [] as Piece[], bx: 0, bw: BASKET_W, wide: 0, got: [] as boolean[], lives: LIVES, score: 0, combo: 0, next: 0, t: 0, raf: 0, last: 0, keys: 0 });

  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem(BEST_KEY)) || 0);
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  const clear = useCallback(() => {
    sim.current.pieces.forEach((p) => p.el.remove());
    sim.current.pieces = [];
  }, []);

  const stop = useCallback(
    (end: Status) => {
      cancelAnimationFrame(sim.current.raf);
      clear();
      const s = sim.current;
      // Ganar con vidas de sobra da puntos extra.
      if (end === "won") s.score += s.lives * 50;
      setScore(s.score);
      setBest((b) => {
        const nb = Math.max(b, s.score);
        try {
          localStorage.setItem(BEST_KEY, String(nb));
        } catch {
          /* almacenamiento no disponible */
        }
        return nb;
      });
      setStatus(end);
    },
    [clear],
  );

  const start = () => {
    const f = field.current;
    if (!f) return;
    clear();
    const s = sim.current;
    Object.assign(s, { got: g.good.map(() => false), lives: LIVES, score: 0, combo: 0, next: 0.2, t: 0, last: performance.now(), bx: f.clientWidth / 2, bw: BASKET_W, wide: 0, keys: 0 });
    setGot(s.got);
    setLives(LIVES);
    setScore(0);
    setStatus("playing");
  };

  useEffect(() => {
    if (status !== "playing") return;
    const f = field.current;
    const l = layer.current;
    const b = basket.current;
    if (!f || !l || !b) return;
    const s = sim.current;

    /** Destellos y texto flotante al atrapar una pieza. */
    const burst = (x: number, y: number, color: string, text: string) => {
      for (let i = 0; i < 10; i++) {
        const sp = document.createElement("i");
        sp.className = styles.spark;
        const a = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
        const d = 34 + Math.random() * 46;
        sp.style.cssText = `left:${x}px;top:${y}px;background:${color};--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 20}px`;
        sp.addEventListener("animationend", () => sp.remove(), { once: true });
        l.appendChild(sp);
      }
      const pop = document.createElement("b");
      pop.className = styles.pop;
      pop.textContent = text;
      pop.style.cssText = `left:${x}px;top:${y}px;color:${color}`;
      pop.addEventListener("animationend", () => pop.remove(), { once: true });
      l.appendChild(pop);
    };

    const spawn = (W: number) => {
      const r = Math.random();
      const type: Kind = r < 0.07 && s.t > 4 ? "gold" : r < 0.3 ? "bad" : "good";
      const missing = s.got.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
      const kind =
        type === "good"
          ? missing.length && Math.random() < 0.7
            ? missing[Math.floor(Math.random() * missing.length)]
            : Math.floor(Math.random() * g.good.length)
          : type === "bad"
            ? Math.floor(Math.random() * g.bad.length)
            : 0;
      const el = document.createElement("span");
      el.className = styles.piece;
      el.dataset.type = type;
      const icon = document.createElement("i");
      icon.textContent = type === "good" ? GOOD[kind].icon : type === "bad" ? BAD_ICONS[kind] : "★";
      if (type === "good") el.style.setProperty("--pc", GOOD[kind].color);
      el.append(icon, type === "good" ? g.good[kind] : type === "bad" ? g.bad[kind] : g.bonus);
      l.appendChild(el);
      const w = el.offsetWidth;
      s.pieces.push({ el, x: 10 + Math.random() * Math.max(1, W - w - 20), y: -40, w, vy: 120 + Math.min(s.t, 45) * 3.2 + Math.random() * 45, sway: 10 + Math.random() * 18, phase: Math.random() * 6, type, kind });
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - s.last) / 1000);
      s.last = now;
      const r = f.getBoundingClientRect();
      // En pausa si la pestaña está oculta o el juego salió de la pantalla.
      if (!document.hidden && r.bottom > 0 && r.top < window.innerHeight) {
        const W = f.clientWidth;
        const H = f.clientHeight;
        s.t += dt;
        if (s.wide > 0) {
          s.wide -= dt;
          if (s.wide <= 0) b.dataset.wide = "false";
        }
        const target = s.wide > 0 ? BASKET_WIDE : BASKET_W;
        s.bw += (target - s.bw) * Math.min(1, dt * 10);
        s.bx = Math.max(s.bw / 2, Math.min(W - s.bw / 2, s.bx + s.keys * 460 * dt));
        b.style.width = `${s.bw}px`;
        b.style.transform = `translate3d(${s.bx - s.bw / 2}px,0,0)`;
        s.next -= dt;
        if (s.next <= 0) {
          spawn(W);
          s.next = Math.max(0.4, 0.95 - s.t * 0.012);
        }
        const top = H - BASKET_H - 14;
        const keep: Piece[] = [];
        for (const p of s.pieces) {
          p.y += p.vy * dt;
          const x = p.x + Math.sin(s.t * 2 + p.phase) * p.sway;
          p.el.style.transform = `translate3d(${x}px,${p.y}px,0) rotate(${Math.sin(s.t * 3 + p.phase) * 6}deg)`;
          const hit = p.y + 32 >= top && p.y <= top + BASKET_H && x + p.w > s.bx - s.bw / 2 && x < s.bx + s.bw / 2;
          if (hit) {
            p.el.remove();
            const cx0 = x + p.w / 2;
            if (p.type === "bad") {
              s.lives -= 1;
              s.combo = 0;
              setLives(s.lives);
              b.dataset.flash = "bad";
              f.dataset.shake = "true";
              window.setTimeout(() => delete f.dataset.shake, 320);
              burst(cx0, top, "var(--red)", "✕");
            } else {
              s.combo += 1;
              const pts = (p.type === "gold" ? 50 : 10) * Math.min(s.combo, 5);
              s.score += pts;
              setScore(s.score);
              if (p.type === "gold") {
                s.wide = WIDE_SECONDS;
                b.dataset.wide = "true";
              } else if (!s.got[p.kind]) {
                s.got = s.got.map((v, i) => v || i === p.kind);
                setGot(s.got);
              }
              b.dataset.flash = "good";
              burst(cx0, top, p.type === "gold" ? "var(--yellow)" : GOOD[p.kind].color, `+${pts}`);
            }
            window.setTimeout(() => delete b.dataset.flash, 220);
          } else if (p.y > H) {
            // Dejar caer una pieza buena corta la racha.
            if (p.type === "good") s.combo = 0;
            p.el.remove();
          } else keep.push(p);
        }
        s.pieces = keep;
        if (s.got.every(Boolean)) return stop("won");
        if (s.lives <= 0) return stop("lost");
      }
      s.raf = requestAnimationFrame(frame);
    };

    const move = (e: PointerEvent) => {
      s.bx = e.clientX - f.getBoundingClientRect().left;
    };
    const key = (e: KeyboardEvent) => {
      const dir = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0;
      if (!dir) return;
      if (e.type === "keydown") {
        s.keys = dir;
        e.preventDefault();
      } else if (s.keys === dir) s.keys = 0;
    };
    f.addEventListener("pointermove", move);
    f.addEventListener("pointerdown", move);
    window.addEventListener("keydown", key);
    window.addEventListener("keyup", key);
    s.last = performance.now();
    s.raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(s.raf);
      f.removeEventListener("pointermove", move);
      f.removeEventListener("pointerdown", move);
      window.removeEventListener("keydown", key);
      window.removeEventListener("keyup", key);
    };
  }, [status, g.good, g.bad, g.bonus, stop]);

  useEffect(() => clear, [clear]);

  const done = got.filter(Boolean).length;
  return (
    <div className={styles.game}>
      <div className={styles.hud}>
        <span className={styles.stat}>
          {g.score} <b className="display tnum">{score}</b>
        </span>
        <span className={styles.stat}>
          {g.best} <b className="display tnum">{best}</b>
        </span>
        <span className={styles.progress} role="img" aria-label={`${done}/${g.good.length}`}>
          <i style={{ transform: `scaleX(${done / g.good.length})` }} />
        </span>
        <span className={styles.lives} role="img" aria-label={`${g.lives}: ${lives}`}>
          {Array.from({ length: LIVES }, (_, i) => (
            <i key={i} data-on={i < lives}>
              ♥
            </i>
          ))}
        </span>
      </div>

      <div ref={field} className={styles.field} data-playing={status === "playing"} data-won={status === "won"} role="application" aria-label={g.aria}>
        {/* La página que se va armando: cada parte se enciende al atrapar su pieza. */}
        <div className={styles.site} aria-hidden="true">
          <span className={cx(styles.part, styles.pLogo)} data-on={got[0]}>
            K&amp;T
          </span>
          <span className={cx(styles.part, styles.pGoogle)} data-on={got[5]}>
            G · #1
          </span>
          <span className={cx(styles.part, styles.pPhoto)} data-on={got[1]} />
          <span className={cx(styles.part, styles.pPrices)} data-on={got[2]}>
            <i>$</i>
            <i>$</i>
            <i>$</i>
          </span>
          <span className={cx(styles.part, styles.pStars)} data-on={got[4]}>
            ★★★★★
          </span>
          <span className={cx(styles.part, styles.pWa)} data-on={got[3]}>
            ✆ WhatsApp
          </span>
        </div>
        <div ref={layer} className={styles.layer} />
        <div ref={basket} className={styles.basket} />
        {status !== "playing" && (
          <div className={styles.overlay}>
            {status === "idle" ? (
              <ul className={styles.legend}>
                {g.good.map((label, i) => (
                  <li key={label} style={{ "--pc": GOOD[i].color } as React.CSSProperties}>
                    <i>{GOOD[i].icon}</i>
                    {label}
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className={`display ${styles.msg}`}>{status === "won" ? g.win : g.lose}</p>
                <p className={styles.final}>
                  {g.score}: <b className="tnum">{score}</b> · {g.best}: <b className="tnum">{best}</b>
                </p>
              </>
            )}
            <div className={styles.actions}>
              <button type="button" className="btn btn--solid" onClick={start}>
                {status === "idle" ? g.start : g.again} <span className="arr">→</span>
              </button>
              {status === "won" && (
                <a href={wa(t.wa.default)} target="_blank" rel="noopener noreferrer" className={`btn ${styles.wa}`} data-native data-track="juego">
                  {g.cta}
                </a>
              )}
            </div>
            {status === "idle" && <p className={styles.hint}>{g.hint}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
