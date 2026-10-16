"use client";

import { useEffect, useMemo, useState } from "react";
import { formatMoney } from "@/lib/money";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Widget.module.css";
import own from "./SpeedSimulator.module.css";

/** Aumento relativo de la probabilidad de rebote según el tiempo de carga (Google / SOASTA, 2017). */
const CURVE: [number, number][] = [
  [1, 0],
  [3, 0.32],
  [5, 0.9],
  [6, 1.06],
  [10, 1.23],
];
const BASE_BOUNCE = 0.32;
const increase = (s: number) => {
  for (let i = 1; i < CURVE.length; i++) {
    const [x1, y1] = CURVE[i];
    const [x0, y0] = CURVE[i - 1];
    if (s <= x1) return y0 + ((s - x0) / (x1 - x0)) * (y1 - y0);
  }
  return CURVE[CURVE.length - 1][1];
};
const bounce = (s: number) => Math.min(0.95, BASE_BOUNCE * (1 + increase(s)));

/** Simulador de ventas perdidas por lentitud, en la moneda del visitante. */
export function SpeedSimulator() {
  const { t, country, convert } = useI18n();
  const s = t.blog.widgets.speed;
  const [load, setLoad] = useState(4.5);
  const [visits, setVisits] = useState(3000);
  const [conv, setConv] = useState(2);
  const [ticket, setTicket] = useState(() => convert(250000));

  // Al cambiar de país, el valor del cliente se traduce a la nueva moneda.
  useEffect(() => setTicket(convert(250000)), [country.code, convert]);

  const r = useMemo(() => {
    const lost = Math.max(0, visits * (bounce(load) - bounce(1)));
    const money = lost * (conv / 100) * ticket;
    return { lost: Math.round(lost), money, share: lost / Math.max(1, visits) };
  }, [load, visits, conv, ticket]);

  const people = 30;
  const gone = Math.round(r.share * people);

  return (
    <div className={styles.widget}>
      <div className={styles.bar}>
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <strong>{s.title}</strong>
        <span className={styles.badge}>{country.currency}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="sim-load">
            {s.load} <output>{s.seconds(load)}</output>
          </label>
          <input id="sim-load" className={`${styles.range} ${own.load}`} type="range" min={1} max={10} step={0.1} value={load} onChange={(e) => setLoad(Number(e.target.value))} />
        </div>
        <div className={styles.grid2}>
          <label className={styles.row}>
            <span className={styles.label}>{s.visits}</span>
            <input className={styles.input} type="number" min={0} step={100} value={visits} onChange={(e) => setVisits(Math.max(0, Number(e.target.value)))} />
          </label>
          <label className={styles.row}>
            <span className={styles.label}>{s.conv} (%)</span>
            <input className={styles.input} type="number" min={0} max={100} step={0.1} value={conv} onChange={(e) => setConv(Math.max(0, Math.min(100, Number(e.target.value))))} />
          </label>
          <label className={styles.row}>
            <span className={styles.label}>
              {s.ticket} ({country.currency})
            </span>
            <input className={styles.input} type="number" min={0} value={ticket} onChange={(e) => setTicket(Math.max(0, Number(e.target.value)))} />
          </label>
        </div>

        <div className={own.crowd} aria-hidden="true">
          {Array.from({ length: people }, (_, i) => (
            <i key={i} data-gone={i >= people - gone} style={{ transitionDelay: `${(i % 10) * 20}ms` }} />
          ))}
        </div>

        <div className={styles.grid2} aria-live="polite">
          <div className={own.kpi}>
            <small>{s.lost}</small>
            <span className={styles.big}>{r.lost.toLocaleString(country.locale)}</span>
            <small>{s.perMonth}</small>
          </div>
          <div className={`${own.kpi} ${own.red}`}>
            <small>{s.money}</small>
            <span className={styles.big}>{formatMoney(r.money, country)}</span>
            <small>
              {formatMoney(r.money * 12, country)} {s.perYear}
            </small>
          </div>
        </div>
        <p className={styles.note}>{s.source}</p>
      </div>
    </div>
  );
}
