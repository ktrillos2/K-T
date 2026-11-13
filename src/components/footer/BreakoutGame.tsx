"use client";

import { useEffect, useRef, useState } from "react";
import { LOGO } from "@/lib/bitmaps";
import { useI18n } from "@/i18n/I18nProvider";
import { store } from "@/lib/store";
import styles from "./BreakoutGame.module.css";

type Phase = "idle" | "play" | "paused" | "won" | "lost";
type Brick = { x: number; y: number; w: number; h: number; alive: boolean; color: string | null; pts: number };
type Ball = { x: number; y: number; vx: number; vy: number; r: number; stuck: boolean };
export type PowerId = "x2" | "x3" | "wide" | "slow" | "life" | "tiny" | "fast" | "reverse";
type Drop = { x: number; y: number; id: PowerId };

const W = 880;
const H = 520;
const BRAND = ["#ef685f", "#f6bd4e", "#62c453"];
const GOOD: PowerId[] = ["x2", "x3", "wide", "slow", "life"];
const BAD: PowerId[] = ["tiny", "fast", "reverse"];
/** Probabilidad relativa de cada poder al caer. */
const WEIGHT: Record<PowerId, number> = { x2: 5, x3: 3, wide: 4, slow: 3, life: 1, tiny: 3, fast: 3, reverse: 2 };
const LABEL: Record<PowerId, string> = { x2: "×2", x3: "×3", wide: "⟷", slow: "◷", life: "♥", tiny: "⟵⟶", fast: "»", reverse: "⇄" };
const DURATION: Partial<Record<PowerId, number>> = { wide: 12, slow: 9, tiny: 9, fast: 7, reverse: 7 };
const MAX_BALLS = 14;
export const isGood = (p: PowerId) => GOOD.includes(p);

function pickPower(): PowerId {
  const all = [...GOOD, ...BAD];
  const total = all.reduce((a, p) => a + WEIGHT[p], 0);
  let r = Math.random() * total;
  for (const p of all) {
    r -= WEIGHT[p];
    if (r <= 0) return p;
  }
  return "x2";
}

/**
 * "Rompe el logo": breakout con los píxeles del logo de K&T Code.
 * Al romper ladrillos caen poderes: multibola ×2 y ×3, paleta grande, cámara lenta y vidas,
 * pero también trampas: paleta mini, turbo y controles invertidos.
 */
export function BreakoutGame() {
  const { t } = useI18n();
  const g = t.footer.game;
  const canvas = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [best, setBest] = useState(0);
  const [balls, setBalls] = useState(1);
  const [effects, setEffects] = useState<{ id: PowerId; left: number }[]>([]);
  const [toast, setToast] = useState<{ id: PowerId; k: number } | null>(null);
  const api = useRef<{ start: () => void } | null>(null);
  const hovering = useRef(false);

  // Mientras se juega, el cursor personalizado desaparece para ver mejor la paleta.
  useEffect(() => {
    document.documentElement.classList.toggle("cursor-off", phase === "play" && hovering.current);
    return () => document.documentElement.classList.remove("cursor-off");
  }, [phase]);

  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem("kt-breakout-best") || 0));
    } catch {
      /* sin almacenamiento */
    }
  }, []);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = W * dpr;
    c.height = H * dpr;
    ctx.scale(dpr, dpr);

    const css = () => {
      const s = getComputedStyle(document.documentElement);
      return { fg: s.getPropertyValue("--fg").trim() || "#f2f2ee", line: s.getPropertyValue("--line").trim() || "rgba(255,255,255,.1)", bg: s.getPropertyValue("--surface").trim() || "#141416" };
    };
    let col = css();
    const unsub = store.subscribe(() => (col = css()));

    const cell = 30;
    const gap = 3;
    const ox = (W - LOGO.w * cell) / 2;
    const oy = 92;
    const makeBricks = (): Brick[] => {
      const list: Brick[] = LOGO.cells.map(([cx, cy]) => ({ x: ox + cx * cell + gap / 2, y: oy + cy * cell + gap / 2, w: cell - gap, h: cell - gap, alive: true, color: null, pts: 10 }));
      (LOGO.dots ?? []).forEach(([dx, dy], i) => {
        const size = cell * 1.25;
        list.push({ x: ox + (dx + 0.5) * cell - size / 2, y: oy + (dy + 0.5) * cell - size / 2, w: size, h: size, alive: true, color: BRAND[i], pts: 50 });
      });
      return list;
    };

    let bricks = makeBricks();
    const BASE_W = 120;
    const paddle = { x: W / 2, w: BASE_W, h: 12, y: H - 34, target: W / 2 };
    let list: Ball[] = [];
    let drops: Drop[] = [];
    const timers = new Map<PowerId, number>();
    let state: Phase = "idle";
    let pts = 0;
    let lv = 3;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let hudClock = 0;
    const keys = { left: false, right: false };
    const particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];

    const speedFactor = () => (timers.has("slow") ? 0.65 : 1) * (timers.has("fast") ? 1.5 : 1);
    const paddleTargetW = () => BASE_W * (timers.has("wide") ? 1.7 : 1) * (timers.has("tiny") ? 0.55 : 1);

    const setP = (p: Phase) => {
      state = p;
      setPhase(p);
    };
    const newBall = (): Ball => ({ x: paddle.x, y: paddle.y - 8, vx: 0, vy: 0, r: 7, stuck: true });
    const launch = () => {
      for (const b of list) {
        if (!b.stuck) continue;
        b.stuck = false;
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 0.7;
        b.vx = Math.cos(a) * 430;
        b.vy = Math.sin(a) * 430;
      }
    };
    const syncHud = () => {
      setBalls(list.length);
      setEffects([...timers.entries()].map(([id, left]) => ({ id, left: Math.ceil(left) })));
    };
    const saveBest = () => {
      setBest((b) => {
        const nb = Math.max(b, pts);
        try {
          localStorage.setItem("kt-breakout-best", String(nb));
        } catch {
          /* sin almacenamiento */
        }
        return nb;
      });
    };

    const burst = (x: number, y: number, color: string, n = 10) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 60 + Math.random() * 180;
        particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, color });
      }
    };

    const apply = (id: PowerId) => {
      if (id === "x2" || id === "x3") {
        const copies = id === "x2" ? 1 : 2;
        const moving = list.filter((b) => !b.stuck);
        const src = moving.length ? moving : list;
        const extra: Ball[] = [];
        for (const b of src) {
          for (let k = 0; k < copies && list.length + extra.length < MAX_BALLS; k++) {
            const sp = Math.hypot(b.vx, b.vy) || 430;
            const a = Math.atan2(b.vy || -1, b.vx) + (k + 1) * (k % 2 ? -0.45 : 0.45);
            extra.push({ x: b.x, y: b.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: 7, stuck: false });
          }
        }
        list.push(...extra);
      } else if (id === "life") {
        lv += 1;
        setLives(lv);
      } else {
        // Los opuestos se cancelan entre sí
        if (id === "wide") timers.delete("tiny");
        if (id === "tiny") timers.delete("wide");
        if (id === "slow") timers.delete("fast");
        if (id === "fast") timers.delete("slow");
        timers.set(id, DURATION[id] ?? 8);
      }
      setToast({ id, k: performance.now() });
      burst(paddle.x, paddle.y, isGood(id) ? BRAND[2] : BRAND[0], 18);
      syncHud();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = col.line;
      for (let x = 0; x < W; x += 40) ctx.fillRect(x, 0, 1, H);
      for (let y = 0; y < H; y += 40) ctx.fillRect(0, y, W, 1);

      for (const b of bricks) {
        if (!b.alive) continue;
        if (b.color) {
          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.arc(b.x + b.w / 2, b.y + b.h / 2, b.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = col.fg;
          ctx.fillRect(b.x, b.y, b.w, b.h);
        }
      }
      // Cápsulas de poder
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "700 14px ui-monospace, monospace";
      for (const d of drops) {
        const good = isGood(d.id);
        ctx.fillStyle = good ? BRAND[2] : BRAND[0];
        ctx.beginPath();
        ctx.roundRect(d.x - 22, d.y - 11, 44, 22, 11);
        ctx.fill();
        ctx.fillStyle = "#0b0b0c";
        ctx.fillText(LABEL[d.id], d.x, d.y + 1);
      }
      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
      }
      ctx.globalAlpha = 1;
      // Paleta (parpadea en rojo si los controles están invertidos)
      ctx.fillStyle = timers.has("reverse") ? BRAND[0] : timers.has("wide") ? BRAND[2] : col.fg;
      ctx.beginPath();
      ctx.roundRect(paddle.x - paddle.w / 2, paddle.y, paddle.w, paddle.h, 6);
      ctx.fill();
      // Pelotas
      for (const b of list) {
        ctx.fillStyle = timers.has("fast") ? BRAND[0] : timers.has("slow") ? "#8ab4f8" : BRAND[1];
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (dt: number) => {
      // Temporizadores de poderes
      if (state === "play" && timers.size) {
        let changed = false;
        timers.forEach((left, id) => {
          const n = left - dt;
          if (n <= 0) {
            timers.delete(id);
            changed = true;
          } else timers.set(id, n);
        });
        hudClock += dt;
        if (changed || hudClock > 0.5) {
          hudClock = 0;
          syncHud();
        }
      }

      const dir = timers.has("reverse") ? -1 : 1;
      if (keys.left) paddle.target -= 620 * dt * dir;
      if (keys.right) paddle.target += 620 * dt * dir;
      paddle.w += (paddleTargetW() - paddle.w) * Math.min(1, dt * 8);
      paddle.target = Math.max(paddle.w / 2, Math.min(W - paddle.w / 2, paddle.target));
      paddle.x += (paddle.target - paddle.x) * Math.min(1, dt * 18);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 400 * dt;
        p.life -= dt * 1.6;
        if (p.life <= 0) particles.splice(i, 1);
      }

      for (const b of list) {
        if (b.stuck) {
          b.x = paddle.x;
          b.y = paddle.y - b.r - 1;
        }
      }
      if (state !== "play") return;

      // Cápsulas
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.y += 150 * dt;
        if (d.y + 11 >= paddle.y && d.y - 11 <= paddle.y + paddle.h && Math.abs(d.x - paddle.x) <= paddle.w / 2 + 22) {
          drops.splice(i, 1);
          apply(d.id);
        } else if (d.y > H + 20) drops.splice(i, 1);
      }

      const sf = speedFactor();
      for (let bi = list.length - 1; bi >= 0; bi--) {
        const ball = list[bi];
        if (ball.stuck) continue;
        const steps = Math.ceil((Math.hypot(ball.vx, ball.vy) * sf * dt) / 6);
        const sdt = (dt * sf) / steps;
        for (let s = 0; s < steps; s++) {
          ball.x += ball.vx * sdt;
          ball.y += ball.vy * sdt;
          if (ball.x < ball.r) {
            ball.x = ball.r;
            ball.vx = Math.abs(ball.vx);
          } else if (ball.x > W - ball.r) {
            ball.x = W - ball.r;
            ball.vx = -Math.abs(ball.vx);
          }
          if (ball.y < ball.r) {
            ball.y = ball.r;
            ball.vy = Math.abs(ball.vy);
          }
          if (ball.vy > 0 && ball.y + ball.r >= paddle.y && ball.y + ball.r <= paddle.y + paddle.h + 8 && Math.abs(ball.x - paddle.x) <= paddle.w / 2 + ball.r) {
            const off = (ball.x - paddle.x) / (paddle.w / 2);
            const sp = Math.min(760, Math.hypot(ball.vx, ball.vy) * 1.02);
            const a = -Math.PI / 2 + off * 1.05;
            ball.vx = Math.cos(a) * sp;
            ball.vy = Math.sin(a) * sp;
            ball.y = paddle.y - ball.r;
          }
          for (const b of bricks) {
            if (!b.alive) continue;
            const nx = Math.max(b.x, Math.min(ball.x, b.x + b.w));
            const ny = Math.max(b.y, Math.min(ball.y, b.y + b.h));
            const dx = ball.x - nx;
            const dy = ball.y - ny;
            if (dx * dx + dy * dy > ball.r * ball.r) continue;
            if (Math.abs(dx) > Math.abs(dy)) ball.vx = Math.sign(dx || -ball.vx) * Math.abs(ball.vx);
            else ball.vy = Math.sign(dy || -ball.vy) * Math.abs(ball.vy);
            b.alive = false;
            pts += b.pts * (list.length > 1 ? 2 : 1);
            setScore(pts);
            burst(b.x + b.w / 2, b.y + b.h / 2, b.color ?? col.fg);
            // Los puntos de colores siempre sueltan un poder; los demás, a veces.
            if ((b.color || Math.random() < 0.13) && drops.length < 4) drops.push({ x: b.x + b.w / 2, y: b.y + b.h / 2, id: b.color ? GOOD[Math.floor(Math.random() * 2)] : pickPower() });
            break;
          }
        }
        if (ball.y > H + 20) list.splice(bi, 1);
      }

      if (!list.length) {
        lv -= 1;
        setLives(lv);
        timers.clear();
        drops = [];
        if (lv <= 0) {
          saveBest();
          setP("lost");
        }
        list = [newBall()];
        syncHud();
      }
      if (!bricks.some((b) => b.alive)) {
        saveBest();
        setP("won");
        list = [newBall()];
        drops = [];
        timers.clear();
        syncHud();
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      step(dt);
      draw();
      if (visible && (state === "play" || particles.length || Math.abs(paddle.target - paddle.x) > 0.5)) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => {
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    const reset = () => {
      bricks = makeBricks();
      pts = 0;
      lv = 3;
      list = [newBall()];
      drops = [];
      timers.clear();
      setScore(0);
      setLives(3);
      syncHud();
    };
    const start = () => {
      if (state === "won" || state === "lost") reset();
      if (state !== "play") setP("play");
      launch();
      kick();
    };
    api.current = { start };
    list = [newBall()];

    const toX = (clientX: number) => {
      const r = c.getBoundingClientRect();
      const x = ((clientX - r.left) / r.width) * W;
      return timers.has("reverse") ? W - x : x;
    };
    const onMove = (e: PointerEvent) => {
      paddle.target = toX(e.clientX);
      kick();
    };
    const onDown = (e: PointerEvent) => {
      paddle.target = toX(e.clientX);
      start();
    };
    const onKey = (e: KeyboardEvent) => {
      const down = e.type === "keydown";
      if (e.key === "ArrowLeft" || e.key === "a") keys.left = down;
      else if (e.key === "ArrowRight" || e.key === "d") keys.right = down;
      else if ((e.key === " " || e.key === "Enter") && down) start();
      else if (e.key === "Escape" && down && state === "play") setP("paused");
      else return;
      e.preventDefault();
      kick();
    };
    c.addEventListener("pointermove", onMove);
    c.addEventListener("pointerdown", onDown);
    c.addEventListener("keydown", onKey);
    c.addEventListener("keyup", onKey);

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (!visible && state === "play") setP("paused");
      if (visible) kick();
    });
    io.observe(c);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      unsub();
      c.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerdown", onDown);
      c.removeEventListener("keydown", onKey);
      c.removeEventListener("keyup", onKey);
    };
  }, []);

  return (
    <div className={styles.game}>
      <div className={styles.hud}>
        <span>
          {g.score} <strong className="tnum">{String(score).padStart(4, "0")}</strong>
        </span>
        <span>
          {g.best} <strong className="tnum">{String(Math.max(best, score)).padStart(4, "0")}</strong>
        </span>
        <span aria-label={`${g.lives}: ${lives}`}>
          {g.lives}{" "}
          <strong>
            {"●".repeat(Math.max(0, Math.min(lives, 6)))}
            {lives > 6 ? `+${lives - 6}` : ""}
          </strong>
        </span>
        {balls > 1 && (
          <span>
            {g.balls} <strong className="tnum">{balls}</strong>
          </span>
        )}
        <span className={styles.effects}>
          {effects.map((e) => (
            <em key={e.id} data-good={isGood(e.id)}>
              {g.powers[e.id]} {e.left}s
            </em>
          ))}
        </span>
      </div>
      <div
        className={styles.screen}
        data-playing={phase === "play"}
        onPointerEnter={() => (hovering.current = true)}
        onPointerLeave={() => {
          hovering.current = false;
          document.documentElement.classList.remove("cursor-off");
        }}
        onPointerMove={() => document.documentElement.classList.toggle("cursor-off", phase === "play")}
      >
        <canvas ref={canvas} className={styles.canvas} tabIndex={0} aria-label={g.aria} />
        {toast && (
          <p key={toast.k} className={styles.toast} data-good={isGood(toast.id)} aria-live="polite">
            {g.powers[toast.id]}
          </p>
        )}
        {phase !== "play" && (
          <div className={styles.overlay}>
            {phase === "won" && <p className={`display ${styles.big}`}>{g.win}</p>}
            {phase === "lost" && <p className={`display ${styles.big}`}>{g.lose}</p>}
            {phase === "paused" && <p className={`display ${styles.big}`}>{g.paused}</p>}
            <button type="button" className="btn btn--solid btn--sm" onClick={() => api.current?.start()}>
              {phase === "idle" ? g.start : g.again}
            </button>
            <p className={styles.keys}>{g.startKeys}</p>
          </div>
        )}
      </div>
      <ul className={styles.legend} aria-label={g.powersTitle}>
        {(["x2", "x3", "wide", "slow", "life", "tiny", "fast", "reverse"] as PowerId[]).map((p) => (
          <li key={p} data-good={isGood(p)}>
            <b>{LABEL[p]}</b> {g.powers[p]}
          </li>
        ))}
      </ul>
    </div>
  );
}
