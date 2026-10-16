"use client";

import { useMemo, useRef } from "react";
import type { Block } from "@/content/blog/types";
import type { LandingKind } from "@/content/landings/types";
import { PLANS, type PlanId } from "@/lib/pricing";
import { COLOR_VAR } from "@/lib/routes";
import { wa } from "@/lib/site";
import { cx, vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsFor } from "@/i18n";
import { postsFor } from "@/content/blog/meta";
import { useSceneDim } from "@/hooks/useSceneDim";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { Stage3D } from "@/components/three/Stage3D";
import { TLink } from "@/components/transition/TLink";
import { Price } from "@/components/ui/Price";
import { SiteShot } from "@/components/ui/SiteShot";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { TitleArt } from "@/components/blog/TitleArt";
import article from "@/components/blog/Article.module.css";
import styles from "./LandingView.module.css";

export type LandingViewProps = {
  kind: LandingKind;
  color: "red" | "yellow" | "green";
  plan?: PlanId;
  copy: {
    eyebrow: string;
    h1: string;
    lead: string;
    facts: [string, string][];
    includesTitle: string;
    includes: { t: string; d: string }[];
    forWhoTitle: string;
    forWho: string[];
    faqs: { q: string; a: string }[];
  };
  blocks: Block[];
  projects: string[];
  posts: string[];
  related: { href: string; label: string }[];
  fallback: boolean;
  crumbs: { href: string; label: string }[];
};

/**
 * Plantilla de las páginas de servicio, industria, ciudad y guía de precios.
 * Respuesta directa arriba (para buscadores y motores de IA), funciones, precio en la
 * moneda del visitante, proceso, proyectos reales, preguntas frecuentes y enlaces internos.
 */
export function LandingView({ kind, color, plan, copy, blocks, projects, posts, related, fallback, crumbs }: LandingViewProps) {
  const { t, lang } = useI18n();
  const l = t.landing;
  const body = useRef<HTMLDivElement>(null);
  useSceneDim(body, 0.94);

  const projectViews = useMemo(() => {
    const all = projectsFor(lang);
    return projects.map((s) => all.find((p) => p.slug === s)).filter(Boolean).slice(0, 6) as ReturnType<typeof projectsFor>;
  }, [lang, projects]);
  const postCards = useMemo(() => {
    const all = postsFor(lang);
    return posts.map((s) => all.find((p) => p.slug === s)).filter(Boolean).slice(0, 3) as ReturnType<typeof postsFor>;
  }, [lang, posts]);
  const planData = plan ? PLANS.find((p) => p.id === plan) : undefined;
  const planCopy = plan ? t.pricing.plans[plan] : undefined;
  const message = l.waMessage(copy.h1);

  return (
    <article style={vars({ "--c": COLOR_VAR[color] })}>
      <header className={styles.hero} data-hero="">
        <Stage3D formation="projects" anchored={false} />
        <div className={cx("wrap", styles.heroInner)}>
          <nav className={styles.crumbs} aria-label="breadcrumb">
            <TLink href="/">{t.nav.home}</TLink>
            {crumbs.map((c) => (
              <span key={c.href}>
                <span aria-hidden="true"> / </span>
                <TLink href={c.href}>{c.label}</TLink>
              </span>
            ))}
          </nav>
          <p className={styles.eyebrow}>
            <i aria-hidden="true" /> <Scramble trigger="enter" text={copy.eyebrow} />
          </p>
          <SplitTitle as="h1" mode="enter" className={styles.h1} tabIndex={-1}>
            {copy.h1}
          </SplitTitle>
          <Reveal mode="enter" delay={0.3}>
            <p className={styles.lead}>{copy.lead}</p>
          </Reveal>
          {fallback && <p className={styles.onlyEs}>{l.onlyEs}</p>}
          <Reveal mode="enter" delay={0.45} className={styles.ctas}>
            <a href={wa(message)} className="btn btn--solid" target="_blank" rel="noopener noreferrer" data-stick>
              {l.quote} <span className="arr">→</span>
            </a>
            <TLink href="/precios" className="btn btn--ghost" data-stick>
              {l.seePricing}
            </TLink>
          </Reveal>
          <Reveal mode="enter" delay={0.55} as="dl" stagger={0.06} className={styles.facts}>
            {copy.facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </header>

      <div ref={body} className={styles.body}>
        <div className="wrap">
          <section className={styles.section} aria-labelledby="l-includes">
            <h2 id="l-includes" className={styles.h2}>
              {copy.includesTitle}
            </h2>
            <Reveal as="ul" stagger={0.06} className={styles.includes}>
              {copy.includes.map((it, i) => (
                <li key={it.t} className={styles.include}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{it.t}</h3>
                  <p>{it.d}</p>
                </li>
              ))}
            </Reveal>
          </section>

          <section className={cx(styles.section, styles.split)} aria-labelledby="l-who">
            <div>
              <h2 id="l-who" className={styles.h2}>
                {copy.forWhoTitle}
              </h2>
              <Reveal as="ul" stagger={0.05} className={styles.who}>
                {copy.forWho.map((w) => (
                  <li key={w}>
                    <span aria-hidden="true">✓</span> {w}
                  </li>
                ))}
              </Reveal>
            </div>
            {planData && planCopy && (
              <Reveal className={styles.priceCard}>
                <p className={styles.priceLabel}>{l.priceTitle}</p>
                <p className={styles.planName}>{planCopy.name}</p>
                <p className={styles.price}>
                  <span>{t.price.from}</span>
                  <strong className="display">
                    <Price cop={planData.from} />
                  </strong>
                </p>
                <ul className={styles.planFeats}>
                  {planCopy.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <p className={styles.priceNote}>{l.priceNote}</p>
                <a href={wa(t.wa.plan(planCopy.name))} className="btn btn--solid btn--sm" target="_blank" rel="noopener noreferrer" data-stick>
                  {t.pricing.ask} <span className="arr">→</span>
                </a>
              </Reveal>
            )}
          </section>

          {blocks.length > 0 && (
            <section className={cx(styles.section, article.prose, styles.prose)}>
              <ArticleBody blocks={blocks} />
            </section>
          )}

          <section className={styles.section} aria-labelledby="l-process">
            <h2 id="l-process" className={styles.h2}>
              {l.process}
            </h2>
            <Reveal as="ol" stagger={0.08} className={styles.steps}>
              {l.steps.map((s, i) => (
                <li key={s}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  {s}
                </li>
              ))}
            </Reveal>
          </section>

          {projectViews.length > 0 && (
            <section className={styles.section} aria-labelledby="l-projects">
              <h2 id="l-projects" className={styles.h2}>
                {kind === "ciudad" ? l.projectsCity : l.projects}
              </h2>
              <Reveal as="ul" stagger={0.07} className={styles.projects}>
                {projectViews.map((p) => (
                  <li key={p.slug}>
                    <TLink href={p.href} className={styles.project} data-cursor={t.cursor.view}>
                      <SiteShot project={p} />
                      <span className={styles.pName}>{p.name}</span>
                      <span className={styles.pMeta}>
                        {p.sector} · {p.location}
                      </span>
                    </TLink>
                  </li>
                ))}
              </Reveal>
            </section>
          )}

          <section className={styles.section} aria-labelledby="l-faq">
            <h2 id="l-faq" className={styles.h2}>
              {l.faq}
            </h2>
            <div className={styles.faq}>
              {copy.faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {postCards.length > 0 && (
            <section className={styles.section} aria-labelledby="l-posts">
              <h2 id="l-posts" className={styles.h2}>
                {l.posts}
              </h2>
              <ul className={styles.posts}>
                {postCards.map((p) => (
                  <li key={p.slug}>
                    <TLink href={p.href} className={styles.post}>
                      <TitleArt title={p.title} slug={p.slug} category={p.category} color={p.color} size="sm" />
                      <span>{p.title}</span>
                    </TLink>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <nav className={styles.related} aria-label={l.related}>
              <p>{l.related}</p>
              {related.map((r) => (
                <TLink key={r.href} href={r.href} className={styles.chip}>
                  {r.label} →
                </TLink>
              ))}
            </nav>
          )}

          <Reveal className={styles.cta}>
            <h2 className="display">{l.ctaTitle}</h2>
            <p>{l.ctaText}</p>
            <div className={styles.ctas}>
              <a href={wa(message)} className="btn btn--solid" target="_blank" rel="noopener noreferrer" data-stick>
                {l.quote} <span className="arr">→</span>
              </a>
              <TLink href="#contacto" className="btn btn--ghost" data-stick>
                {t.home.hero.cta2}
              </TLink>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
