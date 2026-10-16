"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cx } from "@/lib/utils";
import styles from "./Tilt.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  max?: number;
  glare?: boolean;
  as?: "div" | "article" | "li";
};

/** Tarjeta con inclinación 3D según el puntero y reflejo de luz. */
export function Tilt({ children, className, innerClassName, max = 10, glare = true, as = "div" }: Props) {
  const root = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = root.current;
    const card = inner.current;
    if (!el || !card) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
    const z = gsap.quickTo(card, "z", { duration: 0.6, ease: "power3.out" });
    const gx = shine.current ? gsap.quickTo(shine.current, "xPercent", { duration: 0.6 }) : null;
    const gy = shine.current ? gsap.quickTo(shine.current, "yPercent", { duration: 0.6 }) : null;

    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      const nx = (e.clientX - b.left) / b.width - 0.5;
      const ny = (e.clientY - b.top) / b.height - 0.5;
      rx(-ny * max);
      ry(nx * max * 1.2);
      z(30);
      gx?.(nx * 100);
      gy?.(ny * 100);
      if (shine.current) shine.current.style.opacity = "1";
    };
    const leave = () => {
      rx(0);
      ry(0);
      z(0);
      if (shine.current) shine.current.style.opacity = "0";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  });

  const Tag = as as React.ElementType;
  return (
    <Tag ref={root} className={cx(styles.root, className)}>
      <div ref={inner} className={cx(styles.inner, innerClassName)}>
        {children}
        {glare && <span ref={shine} className={styles.glare} aria-hidden="true" />}
      </div>
    </Tag>
  );
}
