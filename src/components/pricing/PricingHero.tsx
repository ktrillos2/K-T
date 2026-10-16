"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { Stage3D } from "@/components/three/Stage3D";
import { LocaleSelector } from "@/components/shell/LocaleSelector";
import styles from "./PricingHero.module.css";

export function PricingHero() {
  const { t, country } = useI18n();
  const h = t.pricing.hero;
  return (
    <section className={styles.hero} aria-labelledby="h-precios" data-hero="split">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.slash}>{"//"}</span> <Scramble trigger="enter" text={`${h.eyebrow} · ${country.currency}`} />
          </p>
          <SplitTitle as="h1" id="h-precios" mode="enter" className="h-hero" tabIndex={-1}>
            {h.title}
          </SplitTitle>
          <Reveal mode="enter" delay={0.4}>
            <p className="lead">{h.lead}</p>
          </Reveal>
          <Reveal mode="enter" delay={0.55} className={styles.locale}>
            <LocaleSelector />
          </Reveal>
        </div>
        <Stage3D formation="pricing" className={styles.stage} label={h.stageLabel} />
      </div>
    </section>
  );
}
