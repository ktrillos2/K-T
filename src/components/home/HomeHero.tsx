"use client";

import { STATS, wa } from "@/lib/site";
import { useI18n } from "@/i18n/I18nProvider";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { HeroDemo } from "./HeroDemo";
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
            {/* El H1 dice qué vendemos (páginas web y publicidad) para Google y los buscadores con IA;
                el lema grande de abajo se ve igual, pero es un párrafo. */}
            <h1 id="h-inicio" className={styles.eyebrow} tabIndex={-1}>
              <span className={styles.dot} aria-hidden="true" /> {h.eyebrow}
            </h1>
          </Reveal>
          <SplitTitle as="p" mode="enter" className={`h-hero ${styles.title}`}>
            {h.title}
          </SplitTitle>
          <Reveal mode="enter" delay={0.4} className={styles.leadWrap}>
            <p className="lead">{h.lead}</p>
          </Reveal>
          <div className={styles.ctas} data-track="hero">
            <a href={wa(t.wa.default)} target="_blank" rel="noopener noreferrer" className="btn btn--solid" data-stick data-native>
              {h.cta2} <span className="arr">→</span>
            </a>
            <TLink href="/proyectos" className="btn btn--ghost" data-stick>
              {h.cta1} <span className="arr">→</span>
            </TLink>
          </div>
        </div>
        <HeroDemo className={styles.stage} />
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
