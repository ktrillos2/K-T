"use client";

import { PLANS } from "@/lib/pricing";
import { COLOR_VAR } from "@/lib/routes";
import { vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { Price } from "@/components/ui/Price";
import { TLink } from "@/components/transition/TLink";
import styles from "./CostSheet.module.css";

/** Ficha de costos del servicio elegido (o de todos), en la moneda del visitante. */
export function CostSheet({ planIndex }: { planIndex: number }) {
  const { t, country } = useI18n();
  const c = t.contact;
  const one = planIndex >= 0 && planIndex < PLANS.length;
  const plans = one ? [PLANS[planIndex]] : PLANS;

  return (
    <div className={styles.sheet} data-one={one}>
      <div className={styles.head}>
        <span className={styles.file}>{one ? `ficha.${plans[0].id}.pdf` : "fichas/"}</span>
        <strong>{one ? c.sheetTitle : c.sheetAll}</strong>
        <span className={styles.cur}>{country.currency}</span>
      </div>
      <div className={styles.grid}>
        {plans.map((p, i) => {
          const d = t.pricing.plans[p.id];
          return (
            <article key={p.id} className={styles.card} style={vars({ "--c": COLOR_VAR[p.color], "--i": i })}>
              <h4 className={`display ${styles.name}`}>
                <i aria-hidden="true" /> {d.name}
              </h4>
              <p className={styles.pitch}>{d.pitch}</p>
              <p className={styles.priceLabel}>{c.sheetFrom}</p>
              <p className={`display ${styles.price}`}>{p.quote ? <>{t.price.quote} · <Price cop={p.from} /></> : <Price cop={p.from} />}</p>
              <p className={styles.delivery}>
                {c.sheetDelivery}: <b>{d.delivery}</b>
              </p>
              {one && (
                <>
                  <p className={styles.priceLabel}>{c.sheetIncludes}</p>
                  <ul className={styles.features}>
                    {d.features.map((f, k) => (
                      <li key={f} style={vars({ "--k": k })}>
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          );
        })}
      </div>
      <p className={styles.note}>
        {c.sheetNote} <TLink href="/precios">{c.seeAll} →</TLink>
      </p>
    </div>
  );
}
