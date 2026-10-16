"use client";

import { useState } from "react";
import { COLOR_VAR } from "@/lib/routes";
import { vars } from "@/lib/utils";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Disciplines.module.css";

const COLORS = ["red", "yellow", "green"] as const;

/** Tres disciplinas como tarjetas que giran en 3D (hover en escritorio, toque en móvil). */
export function Disciplines() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const { t } = useI18n();
  const d = t.about.disciplines;
  return (
    <section className="band" aria-labelledby="h-disc" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead id="h-disc" path={d.path} title={d.title} lead={d.lead} />
        <Reveal stagger={0.1} className={styles.grid}>
          {d.items.map((it, i) => (
            <button
              key={it.title}
              type="button"
              className={styles.card}
              data-flipped={flipped === i}
              onClick={() => setFlipped(flipped === i ? null : i)}
              aria-pressed={flipped === i}
              style={vars({ "--c": COLOR_VAR[COLORS[i % 3]] })}
            >
              <span className={styles.inner}>
                <span className={styles.front}>
                  <span className={styles.file}>{it.file}</span>
                  <span className={`display ${styles.title}`}>{it.title}</span>
                  <span className={styles.text}>{it.front}</span>
                  <span className={styles.hint} aria-hidden="true">
                    {d.flip}
                  </span>
                </span>
                <span className={styles.back}>
                  <span className={styles.text}>{it.back}</span>
                  <span className={styles.tags}>
                    {it.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                </span>
              </span>
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
