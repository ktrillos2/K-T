"use client";

import { PROJECTS } from "@/lib/projects";
import { useI18n } from "@/i18n/I18nProvider";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { TLink } from "@/components/transition/TLink";
import styles from "./ProjectsHero.module.css";

export function ProjectsHero() {
  const { t, lang } = useI18n();
  const h = t.projects.hero;
  return (
    <section className={styles.hero} aria-labelledby="h-proyectos" data-hero="">
      <div className="wrap">
        {/* H1 con lo que se busca; el titular grande se ve igual como párrafo. */}
        <h1 id="h-proyectos" className={styles.eyebrow} tabIndex={-1}>
          <span className={`${styles.slash} ${styles.dot}`} aria-hidden="true" /> <Scramble trigger="enter" text={h.eyebrow} />
        </h1>
        <SplitTitle as="p" mode="enter" className="h-hero">
          {h.title(PROJECTS.length)}
        </SplitTitle>
        <Reveal mode="enter" delay={0.4} className={styles.row}>
          <p className="lead">{h.lead}</p>
          <a href="#indice" className="btn btn--ghost" data-stick>
            {h.toIndex} <span className="arr">↓</span>
          </a>
        </Reveal>
        <p className={styles.local}>
          {lang === "es" ? "Para empresas de la región, presentamos el caso de las Olimpiadas de Robótica y nuestros " : "For businesses in the region, see the Robotics Olympiad case and our "}
          <TLink href="/desarrollo-web-cucuta" raw>
            {lang === "es" ? "servicios de diseño y desarrollo web en Cúcuta" : "web design and development services in Cúcuta"}
          </TLink>.
        </p>
      </div>
    </section>
  );
}
