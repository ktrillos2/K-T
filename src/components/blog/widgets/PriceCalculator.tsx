"use client";

import { useMemo, useState } from "react";
import { PLANS, type PlanId } from "@/lib/pricing";
import { wa } from "@/lib/site";
import { useI18n } from "@/i18n/I18nProvider";
import { Price } from "@/components/ui/Price";
import styles from "./Widget.module.css";

/** Valores de referencia en COP para la calculadora (estimados de partida). */
const PAGE_COP = 120000;
const BASE_PAGES: Record<PlanId, number> = { landing: 1, tienda: 5, corporativo: 8, software: 6 };
const EXTRA_COP = { seo: 450000, languages: 500000, blog: 350000, payments: 450000, admin: 700000, booking: 600000 } as const;
type ExtraId = keyof typeof EXTRA_COP;

/** Calculadora de precio en la moneda del visitante. */
export function PriceCalculator() {
  const { t, money, country } = useI18n();
  const c = t.blog.widgets.calc;
  const [plan, setPlan] = useState<PlanId>("corporativo");
  const [pages, setPages] = useState(BASE_PAGES.corporativo);
  const [extras, setExtras] = useState<ExtraId[]>([]);
  const p = PLANS.find((x) => x.id === plan)!;

  const total = useMemo(() => {
    const extraPages = Math.max(0, pages - BASE_PAGES[plan]) * PAGE_COP;
    return p.from + extraPages + extras.reduce((a, e) => a + EXTRA_COP[e], 0);
  }, [p, pages, plan, extras]);

  const days = p.days ?? [30, 60];
  const extraDays = Math.round(Math.max(0, pages - BASE_PAGES[plan]) * 1.5 + extras.length * 3);
  const planName = t.pricing.plans[plan].name;
  const message = c.message(planName, pages, extras.map((e) => c.items[e]).join(", "), `${money(total)} ${country.currency}`);

  return (
    <div className={styles.widget}>
      <div className={styles.bar}>
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <strong>{c.title}</strong>
        <span className={styles.badge}>{country.currency}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.label}>{c.type}</span>
          <div className={styles.seg} role="group" aria-label={c.type}>
            {PLANS.map((x) => (
              <button
                key={x.id}
                type="button"
                aria-pressed={plan === x.id}
                onClick={() => {
                  setPlan(x.id);
                  setPages(BASE_PAGES[x.id]);
                }}
              >
                {t.pricing.plans[x.id].name}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="calc-pages">
            {c.pages} <output>{pages}</output>
          </label>
          <input id="calc-pages" className={styles.range} type="range" min={1} max={30} value={pages} onChange={(e) => setPages(Number(e.target.value))} />
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{c.extras}</span>
          <div className={styles.chips}>
            {(Object.keys(EXTRA_COP) as ExtraId[]).map((e) => (
              <button
                key={e}
                type="button"
                className={styles.chip}
                aria-pressed={extras.includes(e)}
                onClick={() => setExtras((xs) => (xs.includes(e) ? xs.filter((y) => y !== e) : [...xs, e]))}
              >
                {extras.includes(e) ? "✓ " : "+ "}
                {c.items[e]}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.total} aria-live="polite">
          <small>{c.total}</small>
          <span className={styles.big}>
            <Price cop={total} />
          </span>
          <small>{c.days(days[0] + extraDays, days[1] + extraDays)}</small>
        </div>
        <p className={styles.note}>{c.note}</p>
        <a className="btn btn--solid btn--sm" href={wa(message)} target="_blank" rel="noopener noreferrer" data-stick style={{ justifySelf: "start" }}>
          {c.cta} <span className="arr">→</span>
        </a>
      </div>
    </div>
  );
}
