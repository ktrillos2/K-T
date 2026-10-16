"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useEnter } from "@/hooks/useEnter";

type Props = {
  as?: "div" | "section" | "ul" | "ol" | "p" | "span" | "article" | "dl";
  children: React.ReactNode;
  className?: string;
  /** Anima los hijos directos en cascada en lugar del contenedor. */
  stagger?: number;
  mode?: "enter" | "scroll";
  delay?: number;
  y?: number;
  id?: string;
  style?: React.CSSProperties;
};

/** Aparición con desplazamiento y opacidad, al entrar la página o al hacer scroll. */
export function Reveal({ as = "div", children, className, stagger, mode = "scroll", delay = 0, y = 48, id, style }: Props) {
  const ref = useRef<HTMLElement>(null);
  const targets = () => {
    const el = ref.current!;
    return stagger ? Array.from(el.children) : [el];
  };

  useEnter(() => {
    if (mode !== "enter" || !ref.current) return;
    const el = ref.current;
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }
    gsap.set(el, { autoAlpha: 1 });
    const tw = gsap.fromTo(
      targets(),
      { autoAlpha: 0, y },
      { autoAlpha: 1, y: 0, duration: 1, delay: delay + 0.35, stagger: stagger ?? 0, ease: "power3.out" },
    );
    return () => {
      tw.kill();
    };
  });

  useGSAP(
    () => {
      if (mode !== "scroll" || !ref.current || prefersReducedMotion()) return;
      gsap.from(targets(), {
        autoAlpha: 0,
        y,
        duration: 1.05,
        delay,
        stagger: stagger ?? 0,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { dependencies: [mode] },
  );

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className} id={id} style={style} data-intro={mode === "enter" ? "" : undefined}>
      {children}
    </Tag>
  );
}
