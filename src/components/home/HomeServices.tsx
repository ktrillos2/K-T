"use client";

import { PLANS } from "@/lib/pricing";
import { COLOR_VAR } from "@/lib/routes";
import { cx, vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHead } from "@/components/ui/SectionHead";
import { Price } from "@/components/ui/Price";
import { Reveal } from "@/components/motion/Reveal";
import { TLink } from "@/components/transition/TLink";
import { PlanArt } from "@/components/pricing/PlanArt";
import styles from "./HomeServices.module.css";

/** Los cuatro servicios en tarjetas simples: qué es, para quién, desde cuánto. */
export function HomeServices() {
  const { t } = useI18n();
  const s = t.home.services;
  return (
    <section className={cx("band", styles.section)} aria-labelledby="h-servicios">
      <div className="wrap">
        <SectionHead id="h-servicios" path={s.path} title={s.title} lead={s.lead} />
        <Reveal as="ul" stagger={0.1} className={styles.grid}>
          {PLANS.map((p) => {
            const c = t.pricing.plans[p.id];
            return (
              <li key={p.id}>
                <TLink href="/precios" className={styles.card} data-plan-card style={vars({ "--c": COLOR_VAR[p.color] })}>
                  <span className={styles.art}>
                    <PlanArt id={p.id} />
                  </span>
                  <h3 className={cx("display", styles.name)}>{c.name}</h3>
                  <p className={styles.what}>{c.what}</p>
                  <p className={styles.pitch}>{c.pitch}</p>
                  <span className={styles.foot}>
                    <span className={styles.from}>
                      {p.quote ? s.fromQuote : s.from} <Price cop={p.from} className={styles.price} />
                    </span>
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </span>
                </TLink>
              </li>
            );
          })}
        </Reveal>
        <Reveal className={styles.more}>
          <TLink href="/servicios" className="btn btn--ghost" data-stick>
            {s.all} <span className="arr">→</span>
          </TLink>
        </Reveal>
      </div>
    </section>
  );
}
