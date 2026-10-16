"use client";

import { useMemo, useRef } from "react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsFor } from "@/i18n";
import { postsFor } from "@/content/blog/meta";
import { useSceneDim } from "@/hooks/useSceneDim";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Stage3D } from "@/components/three/Stage3D";
import { TLink } from "@/components/transition/TLink";
import { PixelPhoto } from "@/components/about/PixelPhoto";
import { TitleArt } from "@/components/blog/TitleArt";
import styles from "./AuthorView.module.css";

/** Página de autor (E-E-A-T): quién escribe, qué ha construido y todos sus artículos. */
export function AuthorView() {
  const { t, lang } = useI18n();
  const a = t.landing.author;
  const posts = useMemo(() => postsFor(lang), [lang]);
  const projects = useMemo(() => projectsFor(lang).filter((p) => p.featured || p.testimonial).slice(0, 8), [lang]);
  const body = useRef<HTMLDivElement>(null);
  useSceneDim(body, 0.92);
  return (
    <>
      <header className={styles.hero} data-hero="">
        <Stage3D formation="about" anchored={false} />
        <div className={`wrap ${styles.grid}`}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>// {a.eyebrow}</p>
            <SplitTitle as="h1" mode="enter" className="h-hero" tabIndex={-1}>
              {SITE.founder.name}
            </SplitTitle>
            <Reveal mode="enter" delay={0.3}>
              <p className="lead">{a.lead}</p>
            </Reveal>
            <Reveal mode="enter" delay={0.4}>
              <dl className={styles.json}>
                {t.about.founder.json.map(([k, v]) => (
                  <div key={k}>
                    <dt>&quot;{k}&quot;:</dt>
                    <dd>&quot;{v}&quot;</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal mode="enter" delay={0.2}>
            <PixelPhoto src={SITE.founder.photo} alt={t.about.founder.photoAlt} width={256} height={319} className={styles.photo} />
          </Reveal>
        </div>
      </header>
      <div ref={body} className={styles.body}>
        <div className="wrap">
          <h2 className={styles.h2}>{a.articles(posts.length)}</h2>
          <ul className={styles.posts}>
            {posts.map((p) => (
              <li key={p.slug}>
                <TLink href={p.href} className={styles.post}>
                  <TitleArt title={p.title} slug={p.slug} category={p.category} color={p.color} size="sm" />
                  <span>{p.title}</span>
                </TLink>
              </li>
            ))}
          </ul>
          <h2 className={styles.h2}>{a.projects}</h2>
          <ul className={styles.projects}>
            {projects.map((p) => (
              <li key={p.slug}>
                <TLink href={p.href}>
                  {p.name} <span>{p.sector}</span>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
