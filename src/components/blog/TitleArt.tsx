"use client";

import { useEffect, useRef } from "react";
import type { BlogCategory } from "@/content/blog/types";
import { shortHash, vars } from "@/lib/utils";
import styles from "./TitleArt.module.css";

type Props = {
  title: string;
  slug: string;
  category: BlogCategory;
  color: "red" | "yellow" | "green";
  size?: "sm" | "md" | "lg";
  className?: string;
};

type Variant = "versus" | "price" | "search" | "chat" | "terminal";

const clean = (s: string) =>
  s
    .replace(/[¿?¡!]/g, "")
    .replace(/\s*\(.*?\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Elige la animación según el título: comparativas, precios, búsqueda, IA o código. */
function analyze(title: string, category: BlogCategory) {
  const head = clean(title.split(/[:?|]/).find((x) => x.replace(/[¿¡\s]/g, "").length > 2) ?? title);
  const vs = head.split(/\s+vs\.?\s+/i);
  if (vs.length >= 2) return { variant: "versus" as Variant, a: vs[0].trim(), b: vs[1].trim(), phrase: head };
  if (/^cu[aá]nto cuesta/i.test(head) || category === "precios") {
    const subject = head.replace(/^cu[aá]nto cuesta(n)?\s+/i, "").replace(/\s+en\s+colombia.*$/i, "").replace(/^(el|la|una?|los|las)\s+/i, "");
    return { variant: "price" as Variant, a: subject, b: "", phrase: head };
  }
  if (category === "seo-geo") return { variant: "search" as Variant, a: head.toLowerCase(), b: "", phrase: head };
  if (category === "ia") return { variant: "chat" as Variant, a: head, b: "", phrase: head };
  return { variant: "terminal" as Variant, a: head, b: "", phrase: head };
}

/**
 * Portada animada a partir del título del artículo (sin imágenes): cada tipo de artículo
 * tiene su propia escena tipográfica y la animación solo corre cuando está en pantalla.
 */
export function TitleArt({ title, slug, category, color, size = "md", className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { variant, a, b } = analyze(title, category);
  const seed = parseInt(shortHash(slug), 16) || 1;
  const digits = String(1000 + (seed % 9000));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (el.dataset.on = String(e.isIntersecting)), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.art} ${styles[size]} ${className ?? ""}`} data-c={color} data-v={variant} data-on="false" aria-hidden="true">
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
    </div>
  );
}
