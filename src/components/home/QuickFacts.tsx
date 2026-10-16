"use client";

import { useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./QuickFacts.module.css";

/**
 * "K&T Code en 30 segundos": preguntas y respuestas cortas, citables por buscadores
 * y motores de IA. Todo el texto está en el HTML (details/summary); la animación es un extra.
 */
export function QuickFacts() {
  const { t } = useI18n();
  const f = t.home.facts;
  const [open, setOpen] = useState(0);

  const type = (el: HTMLElement | null) => {
    if (!el || prefersReducedMotion()) return;
    const text = el.dataset.text ?? "";
    const o = { p: 0 };
    gsap.to(o, {
      p: 1,
      duration: Math.min(1.4, text.length / 90),
      ease: "none",
      onUpdate: () => {
        el.textContent = text.slice(0, Math.round(text.length * o.p));
      },
    });
  };

  return (
    <section className="band" aria-labelledby="h-facts">
      <div className="wrap">
        <SectionHead path={f.path} title={f.title} id="h-facts" />
        <Reveal className={styles.term}>
          <div className={styles.bar}>
            <span className="dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>{f.path}</span>
          </div>
          <div className={styles.body}>
            {[f.items.slice(0, Math.ceil(f.items.length / 2)), f.items.slice(Math.ceil(f.items.length / 2))].map((col, c) => (
              <div key={c} className={styles.col}>
                {col.map((it, k) => {
                  const i = c === 0 ? k : k + Math.ceil(f.items.length / 2);
                  return (
                    <details
                      key={it.q}
                      className={styles.item}
                      open={open === i}
                      onToggle={(e) => {
                        const d = e.currentTarget as HTMLDetailsElement;
                        if (d.open) {
                          setOpen(i);
                          type(d.querySelector<HTMLElement>("[data-text]"));
                        } else if (open === i) setOpen(-1);
                      }}
                    >
                      <summary className={styles.q}>
                        <span className={styles.ps}>$</span> {it.q}
                        <span className={styles.toggle} aria-hidden="true">
                          {open === i ? "−" : "+"}
                        </span>
                      </summary>
                      <p className={styles.a} data-text={it.a}>
                        {it.a}
                      </p>
                    </details>
                  );
                })}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
