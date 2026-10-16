"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { live, store, useUI } from "@/lib/store";
import { wa } from "@/lib/site";
import { pageLabel } from "@/lib/page-label";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./WhatsAppFloat.module.css";

/**
 * Ícono pixel 16×16: globo de chat verde con un auricular blanco (G verde, W blanco, D sombra).
 * Dibujado celda por celda para que encaje con el logo y la tipografía pixel del sitio.
 */
const ICON = [
  ".....GGGGGG.....",
  "...GGGGGGGGGG...",
  "..GGGGGGGGGGGG..",
  ".GGGWWGGGGGGGGG.",
  ".GGWWWGGGGGGGGG.",
  "GGGWWWGGGGGGGGGG",
  "GGGWWGGGGGGGGGGG",
  "GGGWWWGGGGGGGGGG",
  "GGGGWWWGGGGGGGGG",
  "GGGGGWWWGGWWGGGG",
  ".GGGGGWWWWWWWGG.",
  ".GGGGGGWWWWWGGG.",
  "..GGGGGGGGGGGG..",
  ".GGGGGGGGGGGGD..",
  "GGGGDDGGGGGD....",
  "GGD.............",
];
const CELLS = ICON.flatMap((row, y) =>
  [...row].flatMap((ch, x) => (ch === "." ? [] : [{ x, y, ch, d: Math.hypot(x - 7.5, y - 7.5) }])),
);
const FILL: Record<string, string> = { G: "#62c453", W: "#f2f2ee", D: "#3f8f35" };

const BUBBLE_KEY = "kt-wa-bubble";

/**
 * Botón flotante de WhatsApp en pixel art.
 * - Aparece al bajar un poco en cualquier página (se arma píxel por píxel) y se esconde
 *   cuando la sección de contacto está en pantalla, durante las transiciones y con el menú abierto.
 * - Al pasar el puntero se despliega "¿Hablamos?" con el estado "en línea".
 * - Una vez por sesión muestra un globo de saludo con puntos de "escribiendo…".
 * - El mensaje prellenado incluye el nombre de la página desde donde escribe la persona.
 */
export function WhatsAppFloat() {
  const { t } = useI18n();
  const f = t.wa.float;
  const pathname = usePathname();
  const transitioning = useUI((s) => s.transitioning);
  const menuOpen = useUI((s) => s.menuOpen);
  const paletteOpen = useUI((s) => s.paletteOpen);
  const loaded = useUI((s) => s.loaded);
  const [scrolled, setScrolled] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [bubble, setBubble] = useState<"off" | "typing" | "on">("off");
  const [seen, setSeen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const visible = loaded && scrolled && !contactInView && !transitioning && !menuOpen && !paletteOpen;

  // Umbral de scroll (lee el valor de Lenis en el ticker; solo hace setState al cruzarlo).
  useEffect(() => {
    let last = false;
    const tick = () => {
      const on = live.scroll > Math.min(520, window.innerHeight * 0.6);
      if (on !== last) {
        last = on;
        setScrolled(on);
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  // La sección de contacto ya tiene su propio botón de WhatsApp: ahí el flotante se aparta.
  useEffect(() => {
    const el = document.getElementById("contacto");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setContactInView(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Saludo una vez por sesión, un rato después de aparecer.
  useEffect(() => {
    if (!visible || seen) return;
    let shown = false;
    try {
      shown = sessionStorage.getItem(BUBBLE_KEY) === "1";
    } catch {
      /* sin sessionStorage */
    }
    if (shown) {
      setSeen(true);
      return;
    }
    const a = window.setTimeout(() => setBubble("typing"), 2600);
    const b = window.setTimeout(() => setBubble("on"), 4200);
    const c = window.setTimeout(() => dismiss(), 14000);
    return () => [a, b, c].forEach((id) => window.clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, seen]);

  const dismiss = () => {
    setBubble("off");
    setSeen(true);
    try {
      sessionStorage.setItem(BUBBLE_KEY, "1");
    } catch {
      /* sin sessionStorage */
    }
  };

  const href = wa(f.message(pageLabel(pathname || "/")));

  return (
    <div ref={root} className={styles.root} data-visible={visible} data-bubble={bubble}>
      {bubble !== "off" && (
        <div className={styles.bubble} role="status">
          <button type="button" className={styles.close} onClick={dismiss} aria-label={f.close}>
            ×
          </button>
          {bubble === "typing" ? (
            <span className={styles.typing} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          ) : (
            <a href={href} target="_blank" rel="noopener noreferrer" onClick={dismiss} data-native>
              {f.bubble}
            </a>
          )}
        </div>
      )}

      <a
        className={styles.btn}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={f.aria}
        onClick={dismiss}
        data-stick
        data-native
        tabIndex={visible ? 0 : -1}
      >
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="-1 -1 18 18" shapeRendering="crispEdges">
            {CELLS.map((c, i) => (
              <rect key={i} x={c.x} y={c.y} width="1" height="1" fill={FILL[c.ch]} style={{ transitionDelay: `${(c.d * 0.035).toFixed(3)}s` }} />
            ))}
          </svg>
          {!seen && <span className={styles.badge}>1</span>}
        </span>
        <span className={styles.text}>
          <span className={styles.textInner}>
            <b>{f.label}</b>
            <small>
              <i /> {f.online}
            </small>
          </span>
        </span>
      </a>
    </div>
  );
}
