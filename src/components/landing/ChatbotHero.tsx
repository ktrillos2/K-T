"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { prefersReducedMotion } from "@/lib/gsap";
import { cx } from "@/lib/utils";
import { KtRobot } from "@/components/ui/KtRobot";
import styles from "./ChatbotHero.module.css";

/**
 * Hero del servicio de chatbot: el robot de K&T (cabeza de terminal, antena verde y «K&T» en el pecho)
 * en pixel art, que habla mientras atiende un pedido por WhatsApp a las 3 a. m.
 * Decorativo: el texto real del servicio está en el h1 y el párrafo del hero.
 */

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

      <KtRobot talking={talking} className={styles.robot} />
    </div>
  );
}
