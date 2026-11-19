"use client";

import { useEffect, useRef } from "react";
import type { BlogCategory } from "@/content/blog/types";
import { shortHash, vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { KtRobot } from "@/components/ui/KtRobot";
import styles from "./TitleArt.module.css";

type Props = {
  title: string;
  slug: string;
  category: BlogCategory;
  color: "red" | "yellow" | "green";
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Anima mientras está en pantalla sin esperar hover (portada dentro del artículo). */
  autoplay?: boolean;
};

type Variant = "versus" | "price" | "search" | "chat" | "terminal" | "receipt" | "bars" | "browser" | "phone" | "bot";

const clean = (s: string) =>
  s
    .replace(/[¿?¡!]/g, "")
    .replace(/\s*\(.*?\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Escenas posibles por categoría: el slug elige una, así artículos parecidos no repiten la misma animación. */
const POOL: Record<BlogCategory, Variant[]> = {
  precios: ["price", "receipt", "bars"],
  "seo-geo": ["search", "bars", "search"],
  ia: ["bot", "chat", "terminal"],
  ecommerce: ["browser", "receipt", "phone"],
  "desarrollo-web": ["browser", "terminal"],
  software: ["terminal", "browser"],
  comparativas: ["bars", "terminal"],
  estrategia: ["bars", "phone", "browser"],
};

/** Elige la animación según el título (comparativas y publicidad) o, si no, según la categoría y el slug. */
function analyze(title: string, category: BlogCategory, seed: number) {
  const head = clean(title.split(/[:?|]/).find((x) => x.replace(/[¿¡\s]/g, "").length > 2) ?? title);
  const vs = head.split(/\s+vs\.?\s+/i);
  if (vs.length >= 2) return { variant: "versus" as Variant, a: vs[0].trim(), b: vs[1].trim() };
  const subject = head
    .replace(/^cu[aá]nto (cuesta|vale)(n)?\s+/i, "")
    .replace(/^qu[eé] es (el|la|un|una)?\s*/i, "")
    .replace(/\s+en\s+colombia.*$/i, "")
    .replace(/^(el|la|una?|los|las)\s+/i, "");
  // Chatbots, WhatsApp y agentes de IA: el robot de K&T atendiendo la pregunta.
  if (/chatbot|\bbots?\b|agentes?\b|asistente|whatsapp/i.test(head)) return { variant: "bot" as Variant, a: head, b: "" };
  if (/ads|remarketing|publicidad|instagram|tiktok/i.test(head)) return { variant: "phone" as Variant, a: subject, b: "" };
  const pool = POOL[category] ?? ["terminal"];
  const variant = pool[seed % pool.length];
  return { variant, a: variant === "search" ? head.toLowerCase() : variant === "chat" || variant === "terminal" ? head : subject, b: "" };
}

/**
 * Portada animada a partir del título del artículo (sin imágenes): cada tipo de artículo
 * tiene su propia escena tipográfica y la animación solo corre cuando está en pantalla.
 */
export function TitleArt({ title, slug, category, color, size = "md", className, autoplay = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const en = useI18n().lang === "en";
  const seed = parseInt(shortHash(slug), 16) || 1;
  const { variant, a, b } = analyze(title, category, seed);
  const digits = String(1000 + (seed % 9000));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (el.dataset.on = String(e.isIntersecting)), {
      rootMargin: "0px",
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // data-nosnippet: el texto de la portada es decorativo (dominios de ejemplo, títulos recortados); Google no lo usa en fragmentos ni en sus respuestas con IA.
    <div ref={ref} className={`${styles.art} ${styles[size]} ${className ?? ""}`} data-c={color} data-v={variant} data-on="false" data-autoplay={autoplay || undefined} aria-hidden="true" data-nosnippet>
      <span className={styles.grid} />

      {variant === "versus" && (
        <div className={styles.versus}>
          <span className={styles.vsA}>{a}</span>
          <span className={styles.vsMid}>
            <i />
            <b>VS</b>
            <i />
          </span>
          <span className={styles.vsB}>{b}</span>
        </div>
      )}

      {variant === "price" && (
        <div className={styles.price}>
          <span className={styles.sign}>$</span>
          <span className={styles.odo}>
            {digits.split("").map((d, i) => (
              <span key={i} className={styles.col} style={vars({ "--to": d, "--i": i })}>
                {"0123456789".split("").map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </span>
            ))}
            <span className={styles.dots}>.000</span>
          </span>
          <span className={styles.subject}>{a}</span>
        </div>
      )}

      {variant === "search" && (
        <div className={styles.search}>
          <span className={styles.bar}>
            <span className={styles.glass}>⌕</span>
            <span className={styles.typed} style={vars({ "--n": Math.min(a.length, 34) })}>
              {a.slice(0, 34)}
            </span>
          </span>
          <span className={styles.results}>
            <span className={styles.hit}>
              <b>#1</b> kytcode.lat
            </span>
            <span />
            <span />
          </span>
        </div>
      )}

      {variant === "chat" && (
        <div className={styles.chat}>
          <span className={styles.me}>{a.length > 46 ? `${a.slice(0, 44)}…` : a}?</span>
          <span className={styles.bot}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.answer}>
            <i />
            <i />
          </span>
        </div>
      )}

      {variant === "terminal" && (
        <div className={styles.term}>
          <span className={styles.cmd}>
            $ kt build <span>{slug.split("-").slice(0, 3).join("-")}</span>
          </span>
          <span className={styles.word}>{a.split(" ").slice(0, 4).join(" ")}</span>
          <span className={styles.progress}>
            <i />
          </span>
          <span className={styles.ok}>✓ compilado</span>
        </div>
      )}

      {variant === "receipt" && (
        <div className={styles.receipt}>
          <span className={styles.paper}>
            <span className={styles.rTitle}>{(a.length > 34 ? `${a.slice(0, 32)}…` : a)}</span>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={styles.line} style={vars({ "--i": i })}>
                <i />
                <b />
              </span>
            ))}
            {/* El monto es decorativo y aleatorio: lo pinta el CSS para que Google y los buscadores con IA no lo lean como un precio real. */}
            <span className={styles.total}>
              TOTAL <b data-amount={`$${digits.slice(0, 1)}.${digits.slice(1)}.000`} />
            </span>
          </span>
        </div>
      )}

      {variant === "bars" && (
        <div className={styles.bars}>
          <span className={styles.chart}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <i key={i} style={vars({ "--i": i, "--h": `${28 + ((seed >> i) % 7) * 10}%` })} />
            ))}
            <svg className={styles.trend} viewBox="0 0 100 50" preserveAspectRatio="none">
              <polyline points="0,44 20,38 40,40 60,24 80,18 100,4" />
            </svg>
          </span>
          <span className={styles.label}>{(a.length > 34 ? `${a.slice(0, 32)}…` : a)}</span>
        </div>
      )}

      {variant === "browser" && (
        <div className={styles.browser}>
          <span className={styles.win}>
            <span className={styles.chrome}>
              <i />
              <i />
              <i />
              <span className={styles.url}>{en ? "yourbrand.com" : "tumarca.com"}</span>
            </span>
            <span className={styles.page}>
              <span className={styles.hero}>{(a.length > 34 ? `${a.slice(0, 32)}…` : a)}</span>
              <span className={styles.blocks}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.cta} />
            </span>
          </span>
        </div>
      )}

      {variant === "phone" && (
        <div className={styles.phone}>
          <span className={styles.device}>
            <span className={styles.post}>
              <span className={styles.media} />
              <span className={styles.caption}>{(a.length > 34 ? `${a.slice(0, 32)}…` : a)}</span>
              <span className={styles.likes}>
                ♥ <b>{digits}</b>
              </span>
            </span>
          </span>
          <span className={styles.notif} style={vars({ "--i": 0 })}>
            {en ? "+1 new customer" : "+1 cliente nuevo"}
          </span>
          <span className={styles.notif} style={vars({ "--i": 1 })}>
            {en ? "WhatsApp · 3 messages" : "WhatsApp · 3 mensajes"}
          </span>
        </div>
      )}
      {variant === "bot" && (
        <div className={styles.botScene}>
          <KtRobot talking className={styles.botRobot} />
          <span className={styles.botChat}>
            <span className={styles.botHead}>
              <i /> WhatsApp · {en ? "online" : "en línea"}
            </span>
            <span className={styles.botAsk}>{a.length > 52 ? `${a.slice(0, 50)}…` : a}?</span>
            <span className={styles.botReply}>
              <b>{en ? ">_ K&T Assistant" : ">_ Asistente K&T"}</b>
              <i />
              <i />
              <small>3:07 {en ? "a.m." : "a.\u00a0m."} ✓✓</small>
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
