"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { HeroArt } from "@/components/ui/HeroArt";
import styles from "./AboutHero.module.css";

export function AboutHero() {
  const { t } = useI18n();
  const h = t.about.hero;
  return (
    <section className={styles.hero} aria-labelledby="h-nosotros" data-hero="split">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <Reveal mode="enter" y={20}>
            <p className={styles.eyebrow}>{h.eyebrow}</p>
          </Reveal>
          <SplitTitle as="h1" id="h-nosotros" mode="enter" className="h-hero" tabIndex={-1}>
            {h.title}
          </SplitTitle>
          <Reveal mode="enter" delay={0.4}>
            <p className="lead">{h.lead}</p>
          </Reveal>
        </div>
        <HeroArt className={styles.stage} chips={h.chips} label={h.stageLabel} />
      </div>
    </section>
  );
}
