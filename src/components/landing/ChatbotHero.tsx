"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { prefersReducedMotion } from "@/lib/gsap";
import { cx } from "@/lib/utils";
import styles from "./ChatbotHero.module.css";

/**
 * Hero del servicio de chatbot: un robot en pixel art que "habla" mientras
 * aparece una conversación de WhatsApp (el cliente pide una cita y el bot la agenda).
 * Decorativo: el texto real del servicio está en el h1 y el párrafo del hero.
 */

// Sprite 16×16. k borde · g cuerpo · s pantalla · e ojos · m boca · a luz
const SPRITE = [
  "       aa       ",
  "       kk       ",
  "  kkkkkkkkkkkk  ",
  " kggggggggggggk ",
  " kgssssssssssgk ",
  "kkgsseesseessgkk",
  "kkgsseesseessgkk",
  " kgssssssssssgk ",
  " kgsssmmmmsssgk ",
  " kgssssssssssgk ",
  " kggggggggggggk ",
  "  kkkkkkkkkkkk  ",
  "    kggggggk    ",
  "  kkggggggggkk  ",
  "  kgggaaaagggk  ",
  "  kkkkkkkkkkkk  ",
];
const CELLS = SPRITE.flatMap((row, y) => [...row].map((c, x) => ({ c, x, y })).filter((p) => p.c !== " "));
const cls: Record<string, string | undefined> = { k: styles.k, g: styles.g, s: styles.s, e: styles.e, m: styles.m, a: styles.a };

type Msg = { from: "user" | "bot"; text: string };
const SCRIPT: Record<"es" | "en", Msg[]> = {
  es: [
    { from: "user", text: "Hola, ¿tienen cita el jueves en la tarde?" },
    { from: "bot", text: "¡Hola! 👋 Sí: tengo 3:00 o 4:30 p. m. ¿Cuál prefieres?" },
    { from: "user", text: "4:30 porfa" },
    { from: "bot", text: "Listo ✅ Quedaste el jueves a las 4:30 p. m. Te recuerdo un día antes." },
  ],
  en: [
    { from: "user", text: "Hi, any openings Thursday afternoon?" },
    { from: "bot", text: "Hi! 👋 Yes: 3:00 or 4:30 p.m. Which works for you?" },
    { from: "user", text: "4:30 please" },
    { from: "bot", text: "Done ✅ You're booked Thursday at 4:30 p.m. I'll remind you the day before." },
  ],
};
const STEP_MS = 1700;
const TYPING_MS = 1100;
const PAUSE_STEPS = 3;

export function ChatbotHero({ className }: { className?: string }) {
  const { lang } = useI18n();
  const msgs = SCRIPT[lang === "en" ? "en" : "es"];
  const [shown, setShown] = useState(msgs.length);
  const [typing, setTyping] = useState(false);
  const root = useRef<HTMLDivElement>(null);

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
      const total = msgs.length + PAUSE_STEPS;
      if (step > total) {
        step = 0;
        setShown(0);
        return;
      }
      if (step > msgs.length) return;
      const next = msgs[step - 1];
      if (next.from === "bot") {
        setTyping(true);
        typingTimer = window.setTimeout(() => {
          setTyping(false);
          setShown(step);
        }, TYPING_MS);
      } else {
        setShown(step);
      }
    };
    const id = window.setInterval(tick, STEP_MS);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(typingTimer);
    };
  }, [msgs]);

  const talking = typing || (shown > 0 && msgs[shown - 1]?.from === "bot");

  return (
    <div ref={root} className={cx(styles.root, className)} aria-hidden="true">
      <div className={styles.chat}>
        <div className={styles.head}>
          <span className={styles.avatar} />
          <span>
            <b>K&T Bot</b>
            <small>{typing ? (lang === "en" ? "typing…" : "escribiendo…") : lang === "en" ? "online" : "en línea"}</small>
          </span>
        </div>
        <div className={styles.thread}>
          {msgs.slice(0, shown).map((m, i) => (
            <p key={i} className={cx(styles.bubble, m.from === "bot" ? styles.bot : styles.user)}>
              {m.text}
            </p>
          ))}
          {typing && (
            <p className={cx(styles.bubble, styles.bot, styles.dots)}>
              <i />
              <i />
              <i />
            </p>
          )}
        </div>
      </div>
      <svg className={cx(styles.robot, talking && styles.talking)} viewBox="0 0 16 16" shapeRendering="crispEdges">
        {CELLS.map(({ c, x, y }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={1.04} height={1.04} className={cls[c]} />
        ))}
        {/* boca abierta: se muestra al hablar */}
        <rect x={6} y={9} width={4} height={1.04} className={cx(styles.m, styles.open)} />
      </svg>
    </div>
  );
}
