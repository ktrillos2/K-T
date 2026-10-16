"use client";

import { useMemo, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { COLOR_VAR } from "@/lib/routes";
import { initialsOf, type ProjectView } from "@/lib/projects";
import { wa } from "@/lib/site";
import { vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { monthLabel, projectsFor } from "@/i18n";
import { useSceneDim } from "@/hooks/useSceneDim";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { Stage3D } from "@/components/three/Stage3D";
import { BrowserPreview } from "@/components/ui/BrowserPreview";
import { SiteShot } from "@/components/ui/SiteShot";
import { TLink } from "@/components/transition/TLink";
import styles from "./CaseStudy.module.css";

function Gauge({ value, label, tone }: { value: number; label: string; tone: "red" | "green" }) {
  const R = 46;
  const C = 2 * Math.PI * R;
  return (
    <div className={styles.gauge} data-tone={tone}>
      <svg viewBox="0 0 110 110" aria-hidden="true">
        <circle cx="55" cy="55" r={R} className={styles.track} />
        <circle cx="55" cy="55" r={R} className={styles.arc} data-gauge={value} style={{ strokeDasharray: C, strokeDashoffset: C * (1 - value / 100) }} />
      </svg>
      <span className={`display tnum ${styles.gv}`} data-count={value}>
        {value}
      </span>
      <span className={styles.gl}>{label}</span>
    </div>
  );
}

/** Caso de estudio completo de un proyecto: reto, lo construido, cómo se hizo, resultados y la vista del sitio. */
export function CaseStudy({ slug }: { slug: string }) {
  const { t, lang } = useI18n();
  const d = t.projects.detail;
  const all = useMemo(() => projectsFor(lang), [lang]);
  const idx = all.findIndex((p) => p.slug === slug);
  const p = all[idx] as ProjectView;
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  const root = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  useSceneDim(body, 0.92);

  const category = t.projects.category[p.category];
  const weeks = p.weeks ?? 3;
  const phases = d.phases(weeks);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      el.querySelectorAll<SVGCircleElement>("[data-gauge]").forEach((c) => {
        const C = Number(c.style.strokeDasharray);
        gsap.from(c, { strokeDashoffset: C, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: c, start: "top 85%", once: true } });
      });
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
        const target = Number(n.dataset.count);
        const o = { v: 0 };
        gsap.to(o, { v: target, duration: 1.6, ease: "power3.out", onUpdate: () => (n.textContent = String(Math.round(o.v))), scrollTrigger: { trigger: n, start: "top 85%", once: true } });
      });
      const line = el.querySelector<HTMLElement>("[data-phase-line]");
      if (line) gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: line, start: "top 80%", end: "top 40%", scrub: 0.5 } });
    },
    { scope: root, dependencies: [slug] },
  );

  const facts: [string, string][] = [
    [d.client, p.name],
    [d.sector, p.sector],
    [d.location, p.location],
    [d.date, monthLabel(p.date, lang, true)],
    [d.type, category],
  ];

  return (
    <div ref={root} style={vars({ "--c": COLOR_VAR[p.color] })}>
      <header className={styles.hero} data-hero="">
        <Stage3D formation="projects" anchored={false} />
        <div className="wrap">
          <nav className={styles.crumbs} aria-label="breadcrumb">
            <TLink href="/">{t.nav.home}</TLink> <span aria-hidden="true">/</span> <TLink href="/proyectos">{d.breadcrumb}</TLink>{" "}
            <span aria-hidden="true">/</span> <span aria-current="page">{p.name}</span>
          </nav>
          <p className={styles.eyebrow}>
            <i aria-hidden="true" /> <Scramble trigger="enter" text={`${category} · ${p.dateLabel}`} />
          </p>
          <SplitTitle as="h1" mode="enter" className={`h-hero ${styles.title}`} tabIndex={-1}>
            {p.name}
          </SplitTitle>
          <Reveal mode="enter" delay={0.35}>
            <p className={`lead ${styles.lead}`}>{p.summary}</p>
          </Reveal>
          <Reveal mode="enter" delay={0.5} className={styles.heroCtas}>
            {p.site && (
              <a href={p.site} className="btn btn--solid" target="_blank" rel="noopener noreferrer" data-stick>
                {d.visit} <span className="arr">↗</span>
              </a>
            )}
            <a href={wa(t.wa.default)} className="btn btn--ghost" target="_blank" rel="noopener noreferrer" data-stick>
              {d.cta} <span className="arr">→</span>
            </a>
          </Reveal>
        </div>
      </header>

      <div ref={body} className={styles.body}>
        <div className="wrap">
          <Reveal className={styles.preview}>
            {p.site ? <BrowserPreview project={p} priority /> : <SiteShot project={p} className={styles.noSiteShot} />}
            {!p.site && <p className={styles.note}>{d.noSite}</p>}
          </Reveal>

          <Reveal as="dl" stagger={0.06} className={styles.facts}>
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </Reveal>

          <section className={styles.block} aria-labelledby="cs-challenge">
            <h2 id="cs-challenge" className={styles.h2}>
              <span>01</span> {d.challenge}
            </h2>
            <Reveal>
              <p className={styles.big}>{d.challengeText({ name: p.name, sector: p.sector, category })}</p>
            </Reveal>
          </section>

          <section className={styles.block} aria-labelledby="cs-built">
            <h2 id="cs-built" className={styles.h2}>
              <span>02</span> {d.built}
            </h2>
            <Reveal as="ul" stagger={0.08} className={styles.built}>
              {p.built.map((b, i) => (
                <li key={b}>
                  <span className={styles.check} aria-hidden="true">
                    ✓
                  </span>
                  <span className={styles.bi}>{String(i + 1).padStart(2, "0")}</span>
                  {b}
                </li>
              ))}
            </Reveal>
            <p className={styles.tags}>
              {p.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
              {p.pages ? <span>{d.pagesLabel(p.pages)}</span> : null}
            </p>
          </section>

          <section className={styles.block} aria-labelledby="cs-how">
            <h2 id="cs-how" className={styles.h2}>
              <span>03</span> {d.how}
            </h2>
            <div className={styles.phases}>
              <span className={styles.phaseLine} data-phase-line aria-hidden="true" />
              <Reveal as="ol" stagger={0.12} className={styles.phaseList}>
                {phases.map((ph, i) => (
                  <li key={ph.t} className={styles.phase}>
                    <span className={styles.node} aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className={styles.week}>{ph.w}</span>
                    <h3 className={`display ${styles.pt}`}>{ph.t}</h3>
                    <p>{ph.d}</p>
                  </li>
                ))}
              </Reveal>
            </div>
          </section>

          <section className={styles.block} aria-labelledby="cs-results">
            <h2 id="cs-results" className={styles.h2}>
              <span>04</span> {d.results}
            </h2>
            <div className={styles.results}>
              {p.speed ? (
                <div className={styles.gauges}>
                  {p.speed.before ? <Gauge value={p.speed.before} label={`PageSpeed · ${d.speedBefore}`} tone="red" /> : null}
                  <Gauge value={p.speed.after} label={`PageSpeed · ${d.speedAfter}`} tone="green" />
                </div>
              ) : null}
              <dl className={styles.kpis}>
                {p.lcp ? (
                  <div>
                    <dt>LCP</dt>
                    <dd className="display tnum">{(p.lcp / 1000).toFixed(2)} s</dd>
                  </div>
                ) : null}
                {p.pages ? (
                  <div>
                    <dt>{t.home.featured.metrics.pages}</dt>
                    <dd className="display tnum">{p.pages}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>{t.home.featured.metrics.weeks}</dt>
                  <dd className="display tnum">{weeks}</dd>
                </div>
              </dl>
              {p.results?.length ? (
                <ul className={styles.wins}>
                  {p.results.map((r) => (
                    <li key={r}>
                      <span aria-hidden="true">↑</span> {r}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>

          {p.testimonial && (
            <section className={styles.block} aria-labelledby="cs-quote">
              <h2 id="cs-quote" className={styles.h2}>
                <span>05</span> {d.testimonial}
              </h2>
              <Reveal>
                <figure className={styles.quote}>
                  <blockquote>
                    <p>“{p.testimonial.quote}”</p>
                  </blockquote>
                  <figcaption>
                    <span className={styles.avatar}>{initialsOf(p.testimonial.author)}</span>
                    <span>
                      <strong>{p.testimonial.author}</strong>
                      <span>{p.testimonial.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </section>
          )}

          <Reveal className={styles.cta}>
            <h2 className="display">{d.ctaTitle}</h2>
            <p className="lead">{d.ctaText}</p>
            <TLink href="#contacto" className="btn btn--solid" data-stick>
              {d.cta} <span className="arr">→</span>
            </TLink>
          </Reveal>

          <nav className={styles.pager} aria-label={t.nav.projects}>
            {[
              { p: prev, label: d.prev, dir: "←" },
              { p: next, label: d.next, dir: "→" },
            ].map(({ p: x, label, dir }) => (
              <TLink key={label} href={x.href} className={styles.pagerItem} style={vars({ "--c": COLOR_VAR[x.color] })} data-cursor={t.cursor.open}>
                <span className={styles.pagerLabel}>
                  {dir === "←" ? `${dir} ${label}` : `${label} ${dir}`}
                </span>
                <span className={`display ${styles.pagerName}`}>{x.name}</span>
                <span className={styles.pagerThumb}>
                  <SiteShot project={x} scrollOnHover={false} />
                </span>
              </TLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
