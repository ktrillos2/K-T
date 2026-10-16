"use client";

import { PROJECTS } from "@/lib/projects";
import { useI18n } from "@/i18n/I18nProvider";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { Stage3D } from "@/components/three/Stage3D";
import styles from "./ProjectsHero.module.css";

export function ProjectsHero() {
  const { t } = useI18n();
  const h = t.projects.hero;
  return (
    <section className={styles.hero} aria-labelledby="h-proyectos" data-hero="">
      <Stage3D formation="projects" anchored={false} />
      <div className="wrap">
        <p className={styles.eyebrow}>
          <span className={styles.slash}>{"//"}</span> <Scramble trigger="enter" text={h.eyebrow} />
        </p>
        <SplitTitle as="h1" id="h-proyectos" mode="enter" className="h-hero" tabIndex={-1}>
          {h.title(PROJECTS.length)}
        </SplitTitle>
        <Reveal mode="enter" delay={0.4} className={styles.row}>
          <p className="lead">{h.lead}</p>
          <a href="#indice" className="btn btn--ghost" data-stick>
            {h.toIndex} <span className="arr">↓</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
