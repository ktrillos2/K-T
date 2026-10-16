"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { HERO_BG, STATS } from "@/lib/site";
import { live } from "@/lib/store";
import { useI18n } from "@/i18n/I18nProvider";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { Counter } from "@/components/motion/Counter";
import { Stage3D } from "@/components/three/Stage3D";
import { TLink } from "@/components/transition/TLink";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  const { t } = useI18n();
  const h = t.home.hero;
  const root = useRef<HTMLElement>(null);

  // Visibilidad del hero para el campo de píxeles y ondas al hacer clic.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    live.heroVis = 1;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => (live.heroVis = 1 - self.progress),
    });
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button, input, [data-no-ripple]")) return;
      live.ripples.push({ x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1, t: performance.now() });
    };
    el.addEventListener("pointerdown", onDown);
    return () => {
      st.kill();
      el.removeEventListener("pointerdown", onDown);
      live.heroVis = 0;
    };
  }, []);

  return (
    <section ref={root} className={styles.hero} aria-labelledby="h-inicio" data-field={HERO_BG} data-hero="split">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.slash}>{"//"}</span> <Scramble trigger="enter" text={h.eyebrow} />
          </p>
          <SplitTitle as="h1" id="h-inicio" mode="enter" className="h-hero" tabIndex={-1}>
            {h.title}
          </SplitTitle>
          <Reveal mode="enter" delay={0.4} className={styles.leadWrap}>
            <p className="lead">{h.lead}</p>
          </Reveal>
          <Reveal mode="enter" delay={0.55} stagger={0.08} className={styles.ctas}>
            <TLink href="/proyectos" className="btn btn--solid" data-stick>
              {h.cta1} <span className="arr">→</span>
            </TLink>
            <TLink href="#contacto" className="btn btn--ghost" data-stick>
              {h.cta2} <span className="arr">→</span>
            </TLink>
          </Reveal>
        </div>
        <Stage3D formation="logo" className={styles.stage} label={h.stageLabel} />
      </div>

      <div className="wrap">
        <Reveal mode="enter" delay={0.7} className={styles.stats}>
          <p className={styles.cmd}>
            <span>$</span> {h.statsCmd}
          </p>
          <dl className={styles.statGrid}>
            {STATS.map((s, i) => (
              <div key={s.label} className={styles.stat}>
                <dt className={styles.statLabel}>{h.stats[i]}</dt>
                <dd className={`display ${styles.statValue}`}>
                  <Counter value={s.value} suffix={s.suffix} trigger="enter" delay={0.9 + i * 0.12} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <div className={styles.hintRow} aria-hidden="true">
          <p className={styles.hint}>
            <span>{h.scroll}</span>
            <i />
          </p>
          {HERO_BG === "field" && <p className={styles.fieldHint}>↖ {h.fieldHint}</p>}
        </div>
      </div>
    </section>
  );
}
