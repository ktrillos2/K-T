"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SITE } from "@/lib/site";
import { useI18n } from "@/i18n/I18nProvider";
import { Tilt } from "@/components/motion/Tilt";
import { MacWindow } from "@/components/ui/MacWindow";
import { SectionHead } from "@/components/ui/SectionHead";
import { PixelPhoto } from "./PixelPhoto";
import styles from "./Founder.module.css";

/** Quién dirige el desarrollo: foto que se "compila" en píxeles + perfil como JSON que se escribe al entrar. */
export function Founder() {
  const { t } = useI18n();
  const f = t.about.founder;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const lines = root.current?.querySelectorAll("[data-json]");
      if (!lines?.length) return;
      gsap.fromTo(
        lines,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.5,
          ease: "steps(16)",
          stagger: 0.09,
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="band" aria-labelledby="h-lider" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead id="h-lider" path={f.path} title={f.title} />
        <div className={styles.grid}>
          <figure className={styles.figure}>
            <Tilt className={styles.cardWrap} innerClassName={styles.card} max={8} glare={false}>
              <PixelPhoto src={SITE.founder.photo} alt={f.photoAlt} width={256} height={319} className={styles.photo} />
              <span className={`dots ${styles.dots}`} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.tag}>{f.hover}</span>
            </Tilt>
            <figcaption className={styles.caption}>
              <strong className="display">{f.caption}</strong>
              <span>{f.role}</span>
            </figcaption>
          </figure>

          <div className={styles.copy}>
            <MacWindow title="keyner.json" bodyClassName={styles.json}>
              <pre className={styles.pre}>
                <span data-json className={styles.l}>
                  {"{"}
                </span>
                {f.json.map(([k, v], i) => (
                  <span key={k} data-json className={styles.l}>
                    {"  "}
                    <span className={styles.key}>&quot;{k}&quot;</span>
                    <span className={styles.p}>: </span>
                    <span className={styles.str}>&quot;{v}&quot;</span>
                    <span className={styles.p}>{i < f.json.length - 1 ? "," : ""}</span>
                  </span>
                ))}
                <span data-json className={styles.l}>
                  {"}"}
                </span>
              </pre>
            </MacWindow>
            {f.bio.map((p) => (
              <p key={p} className="lead">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
