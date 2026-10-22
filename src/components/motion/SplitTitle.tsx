"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useEnter } from "@/hooks/useEnter";
import { cx } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

type Props = {
  as?: Tag;
  children: string;
  className?: string;
  id?: string;
  /** "enter": anima con la entrada de la página. "scroll": al entrar en pantalla. */
  mode?: "enter" | "scroll";
  delay?: number;
  tabIndex?: number;
};

const SPLIT = { type: "lines,chars", mask: "lines", linesClass: "split-line", charsClass: "split-char" } as const;

/**
 * Título animado. Al entrar la página: barrido del bloque completo (rápido para el LCP).
 * Al hacer scroll: letras que suben desde una máscara, carácter por carácter.
 */
export function SplitTitle({ as = "h2", children, className, id, mode = "scroll", delay = 0, tabIndex }: Props) {
  const ref = useRef<HTMLElement>(null);

  // Entrada de página
  useEnter(() => {
    if (mode !== "enter") return;
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }
    // Barrido de abajo hacia arriba sobre el bloque completo. No se parte en letras:
    // el texto ya pintado se conserva y el título sigue siendo el LCP del primer pintado.
    gsap.set(el, { autoAlpha: 1 });
    const tw = gsap.fromTo(
      el,
      { yPercent: 18, clipPath: "inset(0% 0% 100% 0%)" },
      { yPercent: 0, clipPath: "inset(0% 0% -20% 0%)", duration: 1.1, ease: "power4.out", delay, clearProps: "clipPath,transform" },
    );
    return () => {
      tw.kill();
    };
  });

  // Al hacer scroll
  useGSAP(
    () => {
      if (mode !== "scroll" || prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;
      SplitText.create(el, {
        ...SPLIT,
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.chars, {
            yPercent: 120,
            rotate: 8,
            duration: 1,
            ease: "power4.out",
            stagger: { each: Math.min(0.025, 0.8 / Math.max(self.chars.length, 1)) },
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        },
      });
    },
    { dependencies: [mode] },
  );

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} id={id} tabIndex={tabIndex} className={cx("display", className)} data-intro={mode === "enter" ? "" : undefined}>
      {children}
    </Tag>
  );
}
