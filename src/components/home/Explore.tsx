"use client";

import { useMemo, useState } from "react";
import { PLANS } from "@/lib/pricing";
import { SITE } from "@/lib/site";
import { cx, vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsFor } from "@/i18n";
import { postsFor } from "@/content/blog/meta";
import { SectionHead } from "@/components/ui/SectionHead";
import { SiteShot } from "@/components/ui/SiteShot";
import { Price } from "@/components/ui/Price";
import { Reveal } from "@/components/motion/Reveal";
import { TLink } from "@/components/transition/TLink";
import styles from "./Explore.module.css";

type Key = "about" | "projects" | "pricing" | "blog";
const ORDER: { key: Key; href: string; color: string; file: string }[] = [
  { key: "projects", href: "/proyectos", color: "var(--yellow)", file: "proyectos/" },
  { key: "pricing", href: "/precios", color: "var(--green)", file: "precios.tsx" },
  { key: "about", href: "/nosotros", color: "var(--red)", file: "nosotros.tsx" },
  { key: "blog", href: "/blog", color: "var(--fg)", file: "blog/" },
];

/**
 * Siguiente paso: un acordeón horizontal de "ventanas". La activa se expande y muestra
 * un adelanto real de esa sección (capturas, precios en tu moneda, el equipo, artículos).
 */
export function Explore() {
  const { t, lang } = useI18n();
  const e = t.home.explore;
  const [active, setActive] = useState<Key>("projects");
  const shots = useMemo(() => projectsFor(lang).filter((p) => p.site).slice(0, 3), [lang]);
  const posts = useMemo(() => postsFor(lang).slice(0, 3), [lang]);

  const preview = (k: Key) => {
    switch (k) {
      case "projects":
        return (
          <div className={styles.shots}>
            {shots.map((p) => (
              <SiteShot key={p.slug} project={p} className={styles.shot} scrollOnHover={false} active={active === "projects"} />
            ))}
          </div>
        );
      case "pricing":
        return (
          <ul className={styles.prices}>
            {PLANS.map((p) => (
              <li key={p.id}>
                <span>{t.pricing.plans[p.id].name}</span>
                <span className={styles.dotted} aria-hidden="true" />
                <strong>{p.quote ? t.price.quote : <Price cop={p.from} />}</strong>
              </li>
            ))}
          </ul>
        );
      case "about":
        return (
          <div className={styles.person}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE.founder.photo} alt={t.about.founder.photoAlt} width={256} height={319} loading="lazy" />
            <p>
              <strong>{SITE.founder.name}</strong>
              <span>{t.about.founder.role}</span>
            </p>
          </div>
        );
      case "blog":
        return (
          <ul className={styles.posts}>
            {posts.map((p) => (
              <li key={p.slug}>
                <span className={styles.postDot} data-c={p.color} aria-hidden="true" />
                {p.title}
              </li>
            ))}
          </ul>
        );
    }
  };

  return (
    <section className="band" aria-labelledby="h-explore">
      <div className="wrap">
        <SectionHead path={e.path} title={e.title} id="h-explore" />
        <Reveal className={styles.rail}>
          {ORDER.map((o, i) => {
            const it = e.items[o.key];
            const on = active === o.key;
            return (
              <article
                key={o.key}
                className={cx(styles.panel, on && styles.on)}
                style={vars({ "--c": o.color })}
                data-ink={o.color === "var(--fg)" ? "inv" : "dark"}
                onPointerEnter={() => setActive(o.key)}
                onFocusCapture={() => setActive(o.key)}
              >
                <TLink href={o.href} className={styles.cover} aria-label={`${it.label}: ${it.cta}`} />
                <header className={styles.head}>
                  <span className={styles.idx}>0{i + 1}</span>
                  <span className={styles.file}>{o.file}</span>
                </header>
                <h3 className={`display ${styles.label}`}>{it.label}</h3>
                <div className={styles.content} aria-hidden={!on}>
                  <p className={styles.text}>{it.text}</p>
                  <div className={styles.preview}>{preview(o.key)}</div>
                  <span className={styles.cta}>
                    {it.cta} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
