"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { prefersReducedMotion } from "@/lib/gsap";
import { cx } from "@/lib/utils";
import styles from "./ChatbotHero.module.css";

/**
 * Hero del servicio de chatbot: el robot de K&T (cabeza de terminal, antena verde y «K&T» en el pecho)
 * en pixel art, que habla mientras atiende un pedido por WhatsApp a las 3 a. m.
 * Decorativo: el texto real del servicio está en el h1 y el párrafo del hero.
 */

// Pixeles del pecho: «K&T» (X = pixel)
const GLYPHS = [
  ["X..X", "X.X.", "XX..", "X.X.", "X..X"],
  [".X..", "X.X.", ".X..", "X.XX", ".XXX"],
  ["XXX", ".X.", ".X.", ".X.", ".X."],
];
const LETTER_PX = 1.6;
const LETTERS = (() => {
  const out: { x: number; y: number }[] = [];
  let ox = 0;
  for (const g of GLYPHS) {
    g.forEach((row, y) => [...row].forEach((c, x) => c === "X" && out.push({ x: ox + x, y })));
    ox += g[0].length + 1;
  }
  const width = ox - 1;
  return { px: out, width };
})();
// Ojo «>» y cursor «_» de la pantalla
const CHEVRON = [
  [0, 0],
  [1, 1],
  [2, 2],
  [1, 3],
  [0, 4],
];

type Msg = { from: "user" | "bot"; text: string; time: string; menu?: boolean };
type Copy = { name: string; online: string; typing: string; assistant: string; menuTitle: string; menuSub: string; confirm: string; msgs: Msg[] };
const COPY: Record<"es" | "en", Copy> = {
  es: {
    name: "Camilo",
    online: "en línea",
    typing: "Asistente K&T está escribiendo…",
    assistant: ">_ Asistente K&T",
    menuTitle: "Menú · Pizzería Doña Rosa",
    menuSub: "Pizzas, combos y bebidas",
    confirm: "Pedido confirmado · 3:07 a. m.",
    msgs: [
      { from: "user", text: "Buenas, ¿todavía reciben pedidos?", time: "2:58 a. m." },
      { from: "bot", text: "¡Hola, Camilo! Claro que sí. Este es el menú:", time: "2:58 a. m.", menu: true },
      { from: "user", text: "Una hawaiana grande para mañana al almuerzo, porfa", time: "3:05 a. m." },
      { from: "bot", text: "Listo. Queda para mañana a las 12:30.", time: "3:07 a. m." },
    ],
  },
  en: {
    name: "Camilo",
    online: "online",
    typing: "K&T Assistant is typing…",
    assistant: ">_ K&T Assistant",
    menuTitle: "Menu · Doña Rosa Pizzeria",
    menuSub: "Pizzas, combos and drinks",
    confirm: "Order confirmed · 3:07 a.m.",
    msgs: [
      { from: "user", text: "Hi, are you still taking orders?", time: "2:58 a.m." },
      { from: "bot", text: "Hi, Camilo! Sure we are. Here's the menu:", time: "2:58 a.m.", menu: true },
      { from: "user", text: "One large Hawaiian for lunch tomorrow, please", time: "3:05 a.m." },
      { from: "bot", text: "Done. It's set for tomorrow at 12:30.", time: "3:07 a.m." },
    ],
  },
};
const STEP_MS = 1800;
const TYPING_MS = 1200;
const PAUSE_STEPS = 4;

export function ChatbotHero({ className }: { className?: string }) {
  const { lang } = useI18n();
  const c = COPY[lang === "en" ? "en" : "es"];
  const msgs = c.msgs;
  const [shown, setShown] = useState(msgs.length);
  const [typing, setTyping] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const thread = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setShown(0);
    let step = 0;
    let typingTimer = 0;
    const visible = () => {
      const el = root.current;
      if (!el || document.hidden || el.offsetParent === null) return false;
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    };
    const tick = () => {
      if (!visible()) return;
      step += 1;
      if (step > msgs.length + PAUSE_STEPS) {
        step = 0;
        setShown(0);
        return;
      }
      if (step > msgs.length) return;
      if (msgs[step - 1].from === "bot") {
        setTyping(true);
        typingTimer = window.setTimeout(() => {
          setTyping(false);
          setShown(step);
        }, TYPING_MS);
      } else setShown(step);
    };
    const id = window.setInterval(tick, STEP_MS);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(typingTimer);
    };
  }, [msgs]);

  // Mantiene visible el último mensaje dentro del chat (sin mover la página).
  useEffect(() => {
    const t = thread.current;
    if (t) t.scrollTop = t.scrollHeight;
  }, [shown, typing]);

  const talking = typing;
  const done = shown === msgs.length;

  return (
    <div ref={root} className={cx(styles.root, className)} aria-hidden="true">
      <div className={styles.phone}>
        <div className={styles.head}>
          <span className={styles.avatar}>C</span>
          <span>
            <b>{c.name}</b>
            <small>{typing ? c.typing : c.online}</small>
          </span>
        </div>
        <div ref={thread} className={styles.thread}>
          {msgs.slice(0, shown).map((m, i) => (
            <div key={i} className={cx(styles.bubble, m.from === "bot" ? styles.bot : styles.user)}>
              {m.from === "bot" && <span className={styles.label}>{c.assistant}</span>}
              <p>{m.text}</p>
              {m.menu && (
                <span className={styles.menu}>
                  <span className={styles.pizza} />
                  <b>{c.menuTitle}</b>
                  <small>{c.menuSub}</small>
                </span>
              )}
              <time>{m.time}</time>
            </div>
          ))}
          {typing && (
            <div className={cx(styles.bubble, styles.bot, styles.dots)}>
              <i />
              <i />
              <i />
            </div>
          )}
          {done && <p className={styles.confirm}>✓ {c.confirm}</p>}
        </div>
      </div>

      <svg className={cx(styles.robot, talking && styles.talking)} viewBox="0 0 44 58" shapeRendering="crispEdges">
        {/* antena */}
        <rect x={21.5} y={4} width={1} height={6} className={styles.stem} />
        <rect x={20} y={0.5} width={4} height={4} className={styles.bulb} />
        {/* cabeza: monitor con los tres puntos de ventana */}
        <rect x={3} y={10} width={38} height={27} className={styles.case} />
        <rect x={3} y={10} width={38} height={1} className={styles.edge} />
        <rect x={5.5} y={12.2} width={2.4} height={2.4} className={styles.dr} />
        <rect x={9} y={12.2} width={2.4} height={2.4} className={styles.dy} />
        <rect x={12.5} y={12.2} width={2.4} height={2.4} className={styles.dg} />
        <rect x={6} y={16} width={32} height={18.5} className={styles.screen} />
        {/* ojo > */}
        <g className={styles.eye}>
          {CHEVRON.map(([x, y]) => (
            <rect key={`c${x}${y}`} x={10 + x * 1.8} y={18 + y * 1.8} width={1.6} height={1.6} className={styles.led} />
          ))}
        </g>
        {/* cursor _ */}
        <g className={styles.cursor}>
          {[0, 1, 2, 3].map((i) => (
            <rect key={`u${i}`} x={24.5 + i * 1.8} y={23.4} width={1.6} height={1.6} className={styles.led} />
          ))}
        </g>
        {/* boca: línea (callado) o bloque (hablando) */}
        <g className={styles.mouthClosed}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={`m${i}`} x={13.7 + i * 1.8} y={29.4} width={1.6} height={1.6} className={styles.led} />
          ))}
        </g>
        <g className={styles.mouthOpen}>
          {[0, 1, 2].flatMap((r) =>
            [0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={`o${r}${i}`} x={13.7 + i * 1.8} y={27.6 + r * 1.8} width={1.6} height={1.6} className={styles.led} />),
          )}
        </g>
        {/* cuello y cuerpo con «K&T» */}
        <rect x={18} y={37} width={8} height={2} className={styles.edge} />
        <rect x={7} y={39} width={30} height={19} className={styles.case} />
        <g>
          {LETTERS.px.map(({ x, y }) => (
            <rect
              key={`l${x}-${y}`}
              x={22 - (LETTERS.width * LETTER_PX) / 2 + x * LETTER_PX}
              y={43 + y * LETTER_PX}
              width={LETTER_PX * 0.88}
              height={LETTER_PX * 0.88}
              className={styles.cream}
            />
          ))}
        </g>
        {/* manos */}
        <rect x={1} y={45} width={6.5} height={6.5} className={styles.hand} />
        <rect x={36.5} y={45} width={6.5} height={6.5} className={cx(styles.hand, styles.wave)} />
      </svg>
    </div>
  );
}
