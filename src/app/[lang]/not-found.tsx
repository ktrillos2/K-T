"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { TLink } from "@/components/transition/TLink";
import styles from "./not-found.module.css";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <section className={styles.wrap} aria-labelledby="h-404" data-hero="split">
      <div className="wrap">
        <p className={styles.err}>{t.notFound.err}</p>
        <SplitTitle as="h1" id="h-404" mode="enter" className="h-sec" tabIndex={-1}>
          {t.notFound.title}
        </SplitTitle>
        <Reveal mode="enter" delay={0.3} className={styles.actions}>
          <p className="lead">{t.notFound.lead}</p>
          <TLink href="/" className="btn btn--solid" data-stick>
            {t.notFound.home} <span className="arr">→</span>
          </TLink>
        </Reveal>
      </div>
    </section>
  );
}
