"use client";

import { PLANS } from "@/lib/pricing";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./CompareTable.module.css";

/** Comparativa lado a lado. Cada fila se resalta al pasar el puntero, como una línea de diff. */
export function CompareTable() {
  const { t } = useI18n();
  const c = t.pricing.compare;
  const Value = ({ v }: { v: boolean | string }) => {
    if (v === true) return <span className={styles.yes} aria-label={c.included} role="img" />;
    if (v === false) return <span className={styles.no} aria-label={c.notIncluded} role="img" />;
    return <span>{v}</span>;
  };
  return (
    <section className="band" aria-labelledby="h-comparar" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead id="h-comparar" path={c.path} title={c.title} lead={c.lead} />
        <Reveal className={styles.wrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{c.feature}</th>
                {PLANS.map((p) => (
                  <th key={p.id} scope="col">
                    {t.pricing.plans[p.id].name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td key={i}>
                      <Value v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
