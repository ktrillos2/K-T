"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { MacWindow } from "@/components/ui/MacWindow";
import { SectionHead } from "@/components/ui/SectionHead";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./TestRun.module.css";

/** Las garantías como una corrida de tests: cada línea pasa al aparecer en pantalla. */
export function TestRun() {
  const root = useRef<HTMLElement>(null);
  const { t: dict } = useI18n();
  const g = dict.about.tests;
  const TESTS = g.items;

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const rows = Array.from(el.querySelectorAll<HTMLElement>("[data-test]"));
      const summary = el.querySelector<HTMLElement>("[data-summary]");
      gsap.set(rows, { autoAlpha: 0, x: -16 });
      if (summary) gsap.set(summary, { autoAlpha: 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el.querySelector("[data-tests]"), start: "top 75%", once: true } });
      rows.forEach((r) => {
        tl.call(() => (r.dataset.state = "run"))
          .to(r, { autoAlpha: 1, x: 0, duration: 0.25, ease: "power2.out" })
          .call(() => (r.dataset.state = "pass"), undefined, "+=0.22");
      });
      if (summary) tl.to(summary, { autoAlpha: 1, duration: 0.4 });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="band" aria-labelledby="h-garantias" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead id="h-garantias" path={g.path} title={g.title} lead={g.lead} />
        <MacWindow title={`~/kytcode — ${g.cmd}`} bodyClassName={styles.body}>
          <div data-tests>
            <p className={styles.cmd}>
              <span>$</span> {g.cmd}
            </p>
            <p className={styles.suite}>
              <span className={styles.badge}>PASS</span> {g.suite}
            </p>
            <ul className={styles.list}>
              {TESTS.map((t) => (
                <li key={t.name} data-test data-state="pass" className={styles.row}>
                  <span className={styles.icon} aria-hidden="true" />
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.detail}>{t.detail}</span>
                  <span className={styles.ms}>{t.ms} ms</span>
                </li>
              ))}
            </ul>
            <p className={styles.summary} data-summary>
              <b>{g.summary(TESTS.length)}</b>
            </p>
          </div>
        </MacWindow>
      </div>
    </section>
  );
}
