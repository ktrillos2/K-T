"use client";

import { useRef } from "react";
import { gsap, useGSAP, SCRAMBLE_CHARS, prefersReducedMotion } from "@/lib/gsap";
import { useEnter } from "@/hooks/useEnter";

type Props = {
  text: string;
  className?: string;
  /** enter: con la entrada de la página · scroll: al aparecer · hover: al pasar el puntero. */
  trigger?: "enter" | "scroll" | "hover";
  delay?: number;
  duration?: number;
};

/** Texto que se "descifra" con caracteres de código antes de mostrarse. */
export function Scramble({ text, className, trigger = "scroll", delay = 0, duration = 1.1 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const play = (d = delay) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    return gsap.to(el, {
      duration,
      delay: d,
      scrambleText: { text, chars: SCRAMBLE_CHARS, revealDelay: 0.15, speed: 0.7 },
      ease: "none",
    });
  };

  useEnter(() => {
    if (trigger !== "enter") return;
    const el = ref.current;
    if (el) gsap.set(el, { autoAlpha: 1 });
    const tw = play(delay + 0.3);
    return () => {
      tw?.kill();
      if (el) el.textContent = text;
    };
  });

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (trigger === "scroll" && !prefersReducedMotion()) {
        gsap.to(el, {
          duration,
          delay,
          scrambleText: { text, chars: SCRAMBLE_CHARS, revealDelay: 0.15, speed: 0.7 },
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      }
    },
    { dependencies: [text, trigger] },
  );

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      onPointerEnter={trigger === "hover" ? () => play(0) : undefined}
      data-intro={trigger === "enter" ? "" : undefined}
    >
      {text}
    </span>
  );
}
