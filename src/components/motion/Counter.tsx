"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useEnter } from "@/hooks/useEnter";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  format?: "plain" | "cop";
  duration?: number;
  trigger?: "scroll" | "enter";
  delay?: number;
};

const fmt = (n: number, f: Props["format"]) => (f === "cop" ? n.toLocaleString("es-CO") : String(n));

/** Número que cuenta hasta su valor. El valor final ya está en el HTML (SEO y sin JS). */
export function Counter({ value, prefix = "", suffix = "", className, format = "plain", duration = 1.6, trigger = "scroll", delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const tween = (scroll: boolean) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const obj = { v: 0 };
    return gsap.to(obj, {
      v: value,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: scroll ? { trigger: el, start: "top 92%", once: true } : undefined,
      onUpdate: () => {
        el.textContent = prefix + fmt(Math.round(obj.v), format) + suffix;
      },
    });
  };

  useEnter(() => {
    if (trigger !== "enter") return;
    const tw = tween(false);
    return () => {
      tw?.kill();
    };
  });

  useGSAP(
    () => {
      if (trigger === "scroll") tween(true);
    },
    { dependencies: [value, trigger] },
  );

  return (
    <span ref={ref} className={className}>
      {prefix + fmt(value, format) + suffix}
    </span>
  );
}
