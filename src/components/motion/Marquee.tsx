"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { live } from "@/lib/store";
import { cx } from "@/lib/utils";
import styles from "./Marquee.module.css";

type Props = {
  items: readonly string[];
  /** Velocidad base en px/frame y sentido (negativo = hacia la derecha). */
  speed?: number;
  size?: "lg" | "sm";
  label: string;
};

/** Cinta infinita que acelera, invierte el sentido y se inclina según la velocidad del scroll. */
export function Marquee({ items, speed = 1, size = "lg", label }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;
    let x = 0;
    let dir = 1;
    let skew = 0;
    let visible = true;
    const half = () => tr.scrollWidth / 2;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const tick = (_t: number, dt: number) => {
      if (!visible) return;
      const v = live.velocity;
      if (Math.abs(v) > 0.5) dir = Math.sign(v);
      x -= (speed + Math.abs(v) * 0.35) * dir * (dt / 16.67);
      const w = half();
      if (w > 0) {
        if (x <= -w) x += w;
        if (x > 0) x -= w;
      }
      tr.style.transform = `translate3d(${x}px,0,0)`;
      skew += (Math.max(-12, Math.min(12, -v * 0.6)) - skew) * 0.1;
      tr.style.setProperty("--skew", `${skew.toFixed(2)}deg`);
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
    };
  });

  const row = (k: string) =>
    items.map((t, i) => (
      <span key={`${k}${i}`} className={styles.item}>
        {t}
        <i className={styles.sep} data-c={i % 3} aria-hidden="true" />
      </span>
    ));

  return (
    <div ref={root} className={cx(styles.root, styles[size])} aria-label={label} role="marquee">
      <div ref={track} className={styles.track} aria-hidden="true">
        {row("a")}
        {row("b")}
      </div>
      <p className="sr-only">{items.join(", ")}</p>
    </div>
  );
}
