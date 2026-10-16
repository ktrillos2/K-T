"use client";

import { useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Faq.module.css";

/** Preguntas frecuentes como bloques de código que se pliegan y despliegan. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useI18n();
  const fq = t.pricing.faq;
  return (
    <section className="band" aria-labelledby="h-faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead id="h-faq" path={fq.path} title={fq.title} lead={fq.lead} />
        <Reveal stagger={0.06} className={styles.list}>
          {fq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={styles.item} data-open={isOpen}>
                <h3 className={styles.h}>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    className={styles.q}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={styles.fold} aria-hidden="true">
                      {isOpen ? "▾" : "▸"}
                    </span>
                    <span className={styles.qText}>{f.q}</span>
                    <span className={styles.lines} aria-hidden="true">
                      {isOpen ? "" : "{ … }"}
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={styles.a}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
