"use client";

import { useRef } from "react";
import { ROUTES } from "@/lib/routes";
import { SITE, wa } from "@/lib/site";
import { useI18n } from "@/i18n/I18nProvider";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { CopyField } from "@/components/ui/CopyField";
import { Logo } from "@/components/ui/Logo";
import { TLink } from "@/components/transition/TLink";
import { ContactWizard } from "@/components/contact/ContactWizard";
import { BreakoutGame } from "@/components/footer/BreakoutGame";
import { LocaleSelector } from "./LocaleSelector";
import { CITY_LANDINGS, GUIDES, INDUSTRIES, SERVICES, landingCopy } from "@/content/landings";
import styles from "./Footer.module.css";

export function Footer() {
  const { t, lang } = useI18n();
  const c = t.contact;
  const label = (l: (typeof SERVICES)[number]) => {
    const e = landingCopy(l, lang).copy.eyebrow.split("·").pop()!.trim();
    return e.charAt(0).toUpperCase() + e.slice(1);
  };
  const f = t.footer;
  const root = useRef<HTMLElement>(null);

  return (
    <footer ref={root} className={styles.footer}>
      {/* Contacto conversacional (reemplaza al antiguo "¿Hacemos git init?") */}
      <section id="contacto" className="wrap" aria-labelledby="contact-title">
        <p className={styles.path}>
          <span>{"//"}</span> {c.path}
        </p>
        <SplitTitle as="h2" id="contact-title" className={styles.title}>
          {c.title}
        </SplitTitle>
        <p className={`lead ${styles.lead}`}>{c.lead}</p>

        <div className={styles.grid}>
          <Reveal>
            <ContactWizard />
          </Reveal>
          <Reveal className={styles.direct} stagger={0.08}>
            <p className={styles.directLabel}>{c.direct}</p>
            <Magnetic strength={0.12} className={styles.waWrap}>
              <a className={styles.wa} href={wa(t.wa.default)} target="_blank" rel="noopener noreferrer" data-stick>
                <span>WhatsApp</span>
                <span className={styles.go} aria-hidden="true">
                  →
                </span>
              </a>
            </Magnetic>
            <CopyField label={t.common.email} value={SITE.email} />
            <CopyField label={t.common.phone} value={SITE.phone} />
          </Reveal>
        </div>
      </section>

      {/* Juego */}
      <section className={`wrap ${styles.gameRow}`} aria-labelledby="game-title">
        <div className={styles.gameCopy}>
          <p className={styles.path}>
            <span>{"//"}</span> game.exe
          </p>
          <h2 id="game-title" className={`display ${styles.gameTitle}`}>
            {f.game.title}
          </h2>
          <p className="lead">{f.game.lead}</p>
        </div>
        <BreakoutGame />
      </section>

      {/* Columnas */}
      <div className={`wrap ${styles.cols}`}>
        <div className={styles.brand}>
          <Logo className={styles.logo} />
          <p>{f.tagline}</p>
          <LocaleSelector up />
        </div>
        <nav aria-label={f.nav} className={styles.col}>
          <h3>{f.nav}</h3>
          {ROUTES.map((r) => (
            <TLink key={r.key} href={r.href}>
              {t.nav[r.nav]}
            </TLink>
          ))}
        </nav>
        <div className={styles.col}>
          <h3>{f.contact}</h3>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={wa(t.wa.default)} target="_blank" rel="noopener noreferrer">
            {SITE.phone}
          </a>
          <span className="muted">
            {SITE.city}, {SITE.region}, {SITE.country}
          </span>
        </div>
        <div className={styles.col}>
          <h3>{f.social}</h3>
          {SITE.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer me">
              {s.label} <span className="muted">{s.handle}</span>
            </a>
          ))}
        </div>
        <div className={styles.col}>
          <h3>{f.legal}</h3>
          <TLink href="/politica-de-privacidad">{f.privacy}</TLink>
          <TLink href="/preguntas-frecuentes">{t.landing.faq}</TLink>
          <TLink href="/testimonios">{t.landing.testimonials.title}</TLink>
        </div>
      </div>

      {/* Mapa de servicios: enlaces internos para buscadores y visitantes */}
      <div className={`wrap ${styles.map}`}>
        <nav aria-label={t.nav.services}>
          <h3>
            <TLink href="/servicios">{t.nav.services}</TLink>
          </h3>
          {SERVICES.map((l) => (
            <TLink key={l.path} href={l.path}>
              {label(l)}
            </TLink>
          ))}
        </nav>
        <nav aria-label={t.nav.industries}>
          <h3>
            <TLink href="/industrias">{t.nav.industries}</TLink>
          </h3>
          {INDUSTRIES.map((l) => (
            <TLink key={l.path} href={l.path}>
              {label(l)}
            </TLink>
          ))}
        </nav>
        <nav aria-label={t.landing.hubs.ciudades.title}>
          <h3>{t.landing.hubs.ciudades.title}</h3>
          {CITY_LANDINGS.map((l) => (
            <TLink key={l.path} href={l.path}>
              {t.landing.crumbs.ciudad} {l.city!.name}
            </TLink>
          ))}
        </nav>
        <nav aria-label={t.nav.pricing}>
          <h3>
            <TLink href="/precios">{t.nav.pricing}</TLink>
          </h3>
          {GUIDES.map((l) => (
            <TLink key={l.path} href={l.path}>
              {label(l)}
            </TLink>
          ))}
        </nav>
      </div>

      <div className={`wrap ${styles.foot}`}>
        <span>{f.rights}</span>
        <span className={styles.made}>{f.made}</span>
      </div>
    </footer>
  );
}
