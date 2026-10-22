"use client";

import { STATS } from "@/lib/site";
import { useI18n } from "@/i18n/I18nProvider";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { HeroArt } from "@/components/ui/HeroArt";
import { TLink } from "@/components/transition/TLink";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  const { t } = useI18n();
  const h = t.home.hero;

  return (
    <section className={styles.hero} aria-labelledby="h-inicio" data-hero="split">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <Reveal mode="enter" y={20}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} /> {h.eyebrow}
            </p>
          </Reveal>
          <SplitTitle as="h1" id="h-inicio" mode="enter" className={`h-hero ${styles.title}`} tabIndex={-1}>
            {h.title}
          </SplitTitle>
          <Reveal mode="enter" delay={0.4} className={styles.leadWrap}>
            <p className="lead">{h.lead}</p>
          </Reveal>
          <Reveal mode="enter" delay={0.55} stagger={0.08} className={styles.ctas}>
            <TLink href="#contacto" className="btn btn--solid" data-stick>
              {h.cta2} <span className="arr">→</span>
            </TLink>
            <TLink href="/proyectos" className="btn btn--ghost" data-stick>
              {h.cta1} <span className="arr">→</span>
            </TLink>
          </Reveal>
        </div>
        <HeroArt className={styles.stage} chips={h.chips} label={h.stageLabel} />
      </div>

      <div className="wrap">
        <Reveal mode="enter" delay={0.7} className={styles.stats}>
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
      </div>
    </section>
  );
}
