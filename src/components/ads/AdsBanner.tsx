"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Price } from "@/components/ui/Price";
import { Reveal } from "@/components/motion/Reveal";
import { TLink } from "@/components/transition/TLink";
import { ADS_PRICE } from "@/lib/pricing";
import { cx } from "@/lib/utils";
import styles from "./AdsBanner.module.css";

/** Servicio mensual de administración de Ads: tarjeta ancha bajo los planes (inicio y precios). */
export function AdsBanner({ inset = false }: { inset?: boolean }) {
  const { t } = useI18n();
  const a = t.ads;
  const card = (
    <Reveal>
      <TLink href="/servicios/administracion-de-ads" className={styles.card}>
        <span className={styles.tag}>{a.tag}</span>
        <span className={styles.main}>
          <span className={cx("display", styles.name)}>{a.name}</span>
          <span className={styles.what}>{a.what}</span>
          <span className={styles.chips}>
            {a.chips.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </span>
        </span>
        <span className={styles.price}>
          <span className={styles.from}>{a.from}</span>
          <strong>
            <Price cop={ADS_PRICE.cop} usd={ADS_PRICE.usd} />
          </strong>
          <span className={styles.per}>{a.per}</span>
          <span className={styles.note}>{a.note}</span>
        </span>
      </TLink>
    </Reveal>
  );
  return inset ? card : (
    <section className={styles.section} aria-label={a.name}>
      <div className="wrap">{card}</div>
    </section>
  );
}
