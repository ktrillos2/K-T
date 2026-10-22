"use client";

import { COLOR_VAR } from "@/lib/routes";
import { vars } from "@/lib/utils";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Disciplines.module.css";

const COLORS = ["red", "yellow", "green"] as const;

/** Tres disciplinas en tarjetas simples: suben al pasar el cursor y la barra de color se llena. */
export function Disciplines() {
  const { t } = useI18n();
  const d = t.about.disciplines;
  return (
    <section className="band" aria-labelledby="h-disc" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead id="h-disc" path={d.path} title={d.title} lead={d.lead} />
        <Reveal stagger={0.1} className={styles.grid}>
          {d.items.map((it, i) => (
            <article key={it.title} className={styles.card} style={vars({ "--c": COLOR_VAR[COLORS[i % 3]] })}>
              <h3 className={`display ${styles.title}`}>{it.title}</h3>
              <p className={styles.text}>{it.front}</p>
              <ul className={styles.tags}>
                {it.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
