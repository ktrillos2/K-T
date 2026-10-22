"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useEnter } from "@/hooks/useEnter";
import { cx } from "@/lib/utils";
import { Logo } from "./Logo";
import styles from "./HeroArt.module.css";

type Props = {
  /** Etiquetas cortas que flotan alrededor del logo (máx. 4). */
  chips?: string[];
  /** Texto grande en lugar del logo (p. ej. "404"). */
  word?: string;
  className?: string;
  label?: string;
};

/**
 * Visual 2D de los heroes: el logo entra deslizando, flota despacio y se mueve
 * con el mouse (solo en x/y). Las etiquetas aparecen en cascada y flotan a su ritmo.
 */
export function HeroArt({ chips = [], word, className, label }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEnter(() => {
    const el = root.current;
    if (!el) return;
    const mark = el.querySelector("[data-mark]");
    const pills = el.querySelectorAll("[data-chip]");
    if (prefersReducedMotion()) {
      gsap.set([mark, ...pills], { autoAlpha: 1 });
      return;
    }
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(mark, { autoAlpha: 0, y: 60, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out" });
    tl.fromTo(pills, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "back.out(1.6)" }, 0.45);
    return () => {
      tl.kill();
    };
  });

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const floats = Array.from(el.querySelectorAll<HTMLElement>("[data-float]"));
      floats.forEach((f, i) => {
        gsap.to(f, { y: i % 2 ? 10 : -12, duration: 2.6 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]")).map((l) => ({
        d: Number(l.dataset.depth),
        x: gsap.quickTo(l, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(l, "y", { duration: 0.9, ease: "power3.out" }),
      }));
      const move = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => {
          l.x(nx * l.d);
          l.y(ny * l.d);
        });
      };
      window.addEventListener("pointermove", move, { passive: true });
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  return (
    <div ref={root} className={cx(styles.art, className)} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <span className={styles.glow} aria-hidden="true" />
      <div className={styles.markWrap} data-depth="28">
        <div data-float>
          <div className={styles.mark} data-mark data-intro="">
            {word ? <span className={cx("display", styles.word)}>{word}</span> : <Logo className={styles.logo} title="" />}
          </div>
        </div>
      </div>
      {chips.slice(0, 4).map((c, i) => (
        <div key={c} className={cx(styles.chipWrap, styles[`p${i}`])} data-depth={String(50 + i * 14)}>
          <span data-float>
            <span className={styles.chip} data-chip data-intro="">
              <i className={styles[`dot${i % 3}`]} />
              {c}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
