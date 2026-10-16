"use client";

import { useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useSceneDim } from "@/hooks/useSceneDim";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Stage3D } from "@/components/three/Stage3D";
import styles from "./LegalPage.module.css";

export function LegalPage() {
  const { t } = useI18n();
  const p = t.privacy;
  const root = useRef<HTMLElement>(null);
  useSceneDim(root, 0.95);
  return (
    <article ref={root} className={styles.page} aria-labelledby="h-legal">
      <Stage3D formation="projects" anchored={false} />
      <div className={`wrap ${styles.inner}`}>
        <p className={styles.updated}>{p.updated}</p>
        <SplitTitle as="h1" id="h-legal" mode="enter" className="h-sec" tabIndex={-1}>
          {p.title}
        </SplitTitle>
        <Reveal mode="enter" delay={0.3} stagger={0.06} className={styles.sections}>
          {p.sections.map((s, i) => (
            <section key={s.h}>
              <h2>
                <span>{String(i + 1).padStart(2, "0")}</span> {s.h}
              </h2>
              <p>{s.p}</p>
            </section>
          ))}
        </Reveal>
      </div>
    </article>
  );
}
