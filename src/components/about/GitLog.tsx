"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { shortHash } from "@/lib/utils";
import { SectionHead } from "@/components/ui/SectionHead";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./GitLog.module.css";

/** La metodología en 6 etapas como un `git log --graph`: la rama se dibuja con el scroll. */
export function GitLog() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();
  const m = t.about.method;
  const STEPS = m.steps;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const list = el.querySelector<HTMLElement>("[data-log]");
      const rail = el.querySelector<HTMLElement>("[data-rail]");
      const commits = Array.from(el.querySelectorAll<HTMLElement>("[data-commit]"));
      if (!list || !rail) return;
      if (prefersReducedMotion()) {
        commits.forEach((c) => (c.dataset.lit = "true"));
        return;
      }
      gsap.fromTo(
        rail,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 65%", end: "bottom 65%", scrub: 0.5 } },
      );
      commits.forEach((c) => {
        gsap.from(c.querySelector("[data-msg]"), {
          x: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: c,
            start: "top 65%",
            onEnter: () => (c.dataset.lit = "true"),
            onLeaveBack: () => (c.dataset.lit = "false"),
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="band" aria-labelledby="h-metodo" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead id="h-metodo" path={m.path} title={m.title} lead={m.lead} />
        <div className={styles.log} data-log>
          <span className={styles.railBg} aria-hidden="true" />
          <span className={styles.rail} data-rail aria-hidden="true" />
          <ol>
          {STEPS.map((s, i) => {
            const hash = shortHash(s.title);
            return (
              <li key={s.title} className={styles.commit} data-commit data-lit="false">
                <span className={styles.node} aria-hidden="true" />
                <div className={styles.msg} data-msg>
                  <p className={styles.head}>
                    <span className={styles.hash}>{hash}</span>
                    {i === STEPS.length - 1 && <span className={styles.ref}>{m.head}</span>}
                    <span className={styles.type}>
                      {s.type}({s.scope}):
                    </span>
                  </p>
                  <h3 className={`display ${styles.title}`}>
                    <span className={styles.step}>{m.stage(i + 1)}</span>
                    {s.title}
                  </h3>
                  <p className={styles.body}>{s.body}</p>
                </div>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
