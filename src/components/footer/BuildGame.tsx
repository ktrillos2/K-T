"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { wa } from "@/lib/site";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./BuildGame.module.css";

type Piece = { el: HTMLSpanElement; x: number; y: number; w: number; vy: number; good: boolean; kind: number };
type Status = "idle" | "playing" | "won" | "lost";

const LIVES = 3;
const BASKET_W = 96;
const BASKET_H = 14;

/**
 * "Arma tu página": mueve la canasta (dedo, mouse o flechas) para atrapar las 6 piezas de una
 * buena página y esquiva las malas. Las piezas se mueven con transform fuera de React.
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

  // Estado del bucle (fuera de React para no re-renderizar en cada cuadro).
  const sim = useRef({ pieces: [] as Piece[], bx: 0, got: [] as boolean[], lives: LIVES, next: 0, t: 0, raf: 0, last: 0, keys: 0 });

  const clear = useCallback(() => {
    sim.current.pieces.forEach((p) => p.el.remove());
    sim.current.pieces = [];
  }, []);

  const stop = useCallback(
    (end: Status) => {
      cancelAnimationFrame(sim.current.raf);
      clear();
      setStatus(end);
    },
    [clear],
  );

  const start = () => {
    const f = field.current;
    if (!f) return;
    clear();
    const s = sim.current;
    s.got = g.good.map(() => false);
    s.lives = LIVES;
    s.next = 0;
    s.t = 0;
    s.last = performance.now();
    s.bx = f.clientWidth / 2;
    s.keys = 0;
    setGot(s.got);
    setLives(LIVES);
    setStatus("playing");
  };

  useEffect(() => {
    if (status !== "playing") return;
    const f = field.current;
    const l = layer.current;
    const b = basket.current;
    if (!f || !l || !b) return;
    const s = sim.current;

    const spawn = (W: number) => {
      // 1 de cada 4 piezas es mala; entre las buenas se prefieren las que faltan.
      const good = Math.random() > 0.26;
      const missing = s.got.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
      const kind = good
        ? missing.length && Math.random() < 0.75
          ? missing[Math.floor(Math.random() * missing.length)]
          : Math.floor(Math.random() * g.good.length)
        : Math.floor(Math.random() * g.bad.length);
      const el = document.createElement("span");
      el.className = styles.piece;
      el.dataset.good = String(good);
      el.textContent = good ? g.good[kind] : g.bad[kind];
      l.appendChild(el);
      const w = el.offsetWidth;
      s.pieces.push({ el, x: 8 + Math.random() * Math.max(1, W - w - 16), y: -36, w, vy: 110 + Math.min(s.t, 40) * 3 + Math.random() * 40, good, kind });
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
        s.bx = Math.max(BASKET_W / 2, Math.min(W - BASKET_W / 2, s.bx + s.keys * 420 * dt));
        b.style.transform = `translate3d(${s.bx - BASKET_W / 2}px,0,0)`;
        s.next -= dt;
        if (s.next <= 0) {
          spawn(W);
          s.next = Math.max(0.45, 1.05 - s.t * 0.012);
        }
        const top = H - BASKET_H - 12;
        const keep: Piece[] = [];
        for (const p of s.pieces) {
          p.y += p.vy * dt;
          p.el.style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
          const hit = p.y + 30 >= top && p.y <= top + BASKET_H && p.x + p.w > s.bx - BASKET_W / 2 && p.x < s.bx + BASKET_W / 2;
          if (hit) {
            p.el.remove();
            if (p.good) {
              if (!s.got[p.kind]) {
                s.got = s.got.map((v, i) => v || i === p.kind);
                setGot(s.got);
              }
              b.dataset.flash = "good";
            } else {
              s.lives -= 1;
              setLives(s.lives);
              b.dataset.flash = "bad";
            }
            window.setTimeout(() => delete b.dataset.flash, 220);
          } else if (p.y > H) p.el.remove();
          else keep.push(p);
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
  }, [status, g.good, g.bad, stop]);

  useEffect(() => clear, [clear]);

  return (
    <div className={styles.game}>
      <div className={styles.hud}>
        <ul className={styles.slots} aria-label={g.title}>
          {g.good.map((label, i) => (
            <li key={label} data-on={got[i]}>
              {label}
            </li>
          ))}
        </ul>
        <span className={styles.lives} role="img" aria-label={`${g.lives}: ${lives}`}>
          {Array.from({ length: LIVES }, (_, i) => (
            <i key={i} data-on={i < lives} />
          ))}
        </span>
      </div>

      <div ref={field} className={styles.field} data-playing={status === "playing"} role="application" aria-label={g.aria}>
        <div ref={layer} className={styles.layer} />
        <div ref={basket} className={styles.basket} />
        {status !== "playing" && (
          <div className={styles.overlay}>
            {status !== "idle" && <p className={`display ${styles.msg}`}>{status === "won" ? g.win : g.lose}</p>}
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
