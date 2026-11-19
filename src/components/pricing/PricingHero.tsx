"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { HeroArt } from "@/components/ui/HeroArt";
import { LocaleSelector } from "@/components/shell/LocaleSelector";
import styles from "./PricingHero.module.css";

export function PricingHero() {
  const { t, country } = useI18n();
  const h = t.pricing.hero;
  return (
    <section className={styles.hero} aria-labelledby="h-precios" data-hero="split">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <Reveal mode="enter" y={20}>
            {/* H1 con lo que se busca ("precios de páginas web"); el lema grande se ve igual como párrafo. */}
            <h1 id="h-precios" className={styles.eyebrow} tabIndex={-1}>{`${h.eyebrow} · ${country.currency}`}</h1>
          </Reveal>
          <SplitTitle as="p" mode="enter" className="h-hero">
            {h.title}
          </SplitTitle>
          <Reveal mode="enter" delay={0.4}>
            <p className="lead">{h.lead}</p>
          </Reveal>
          <Reveal mode="enter" delay={0.55} className={styles.locale}>
            <LocaleSelector align="left" />
          </Reveal>
        </div>
        <HeroArt className={styles.stage} chips={h.chips} label={h.stageLabel} />
      </div>
    </section>
  );
}
