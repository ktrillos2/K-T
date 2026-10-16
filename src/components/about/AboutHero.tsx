"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { Stage3D } from "@/components/three/Stage3D";
import styles from "./AboutHero.module.css";

export function AboutHero() {
  const { t } = useI18n();
  const h = t.about.hero;
  return (
    <section className={styles.hero} aria-labelledby="h-nosotros" data-hero="split">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.slash}>{"//"}</span> <Scramble trigger="enter" text={h.eyebrow} />
          </p>
          <SplitTitle as="h1" id="h-nosotros" mode="enter" className="h-hero" tabIndex={-1}>
            {h.title}
          </SplitTitle>
          <Reveal mode="enter" delay={0.4}>
            <p className="lead">{h.lead}</p>
          </Reveal>
        </div>
        <Stage3D formation="about" className={styles.stage} label={h.stageLabel} />
      </div>
    </section>
  );
}
