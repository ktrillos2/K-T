"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Widget.module.css";
import own from "./TemplateVsCustom.module.css";

/** Comparador ponderado: el lector da importancia a cada criterio y ve qué opción gana para su caso. */
export function TemplateVsCustom() {
  const { t } = useI18n();
  const c = t.blog.widgets.compare;
  const [w, setW] = useState<number[]>(() => c.items.map(() => 2));
  const [open, setOpen] = useState(0);

  const score = useMemo(() => {
    let tpl = 0;
    let cus = 0;
    c.items.forEach((it, i) => {
      tpl += it.tpl * w[i];
      cus += it.cus * w[i];
    });
    const sum = tpl + cus || 1;
    return { tpl: tpl / sum, cus: cus / sum };
  }, [w, c.items]);

  const cusPct = Math.round(score.cus * 100);
  const verdict = Math.abs(score.cus - score.tpl) < 0.03 ? c.tie : score.cus > score.tpl ? c.winner(c.custom, cusPct) : c.winner(c.template, 100 - cusPct);

  return (
    <div className={styles.widget}>
      <div className={styles.bar}>
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <strong>
          {c.template} vs. {c.custom}
        </strong>
      </div>
      <div className={styles.body}>
        <p className={styles.note}>{c.lead}</p>
        <ul className={own.list}>
          {c.items.map((it, i) => (
            <li key={it.t} className={own.item} data-open={open === i}>
              <button type="button" className={own.head} onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className={own.name}>{it.t}</span>
                <span className={own.bars} aria-hidden="true">
                  <i style={{ width: `${it.tpl * 10}%` }} />
                  <i style={{ width: `${it.cus * 10}%` }} />
                </span>
              </button>
              <div className={own.detail}>
                <p>
                  <b>{c.template}:</b> {it.dTpl}
                </p>
                <p>
                  <b>{c.custom}:</b> {it.dCus}
                </p>
              </div>
              <div className={own.weight} role="radiogroup" aria-label={`${c.importance}: ${it.t}`}>
                {[0, 1, 2, 3].map((v) => (
                  <button
                    key={v}
                    type="button"
                    role="radio"
                    aria-checked={w[i] === v}
                    className={own.dot}
                    data-on={v <= w[i] && v > 0}
                    onClick={() => setW((arr) => arr.map((x, k) => (k === i ? v : x)))}
                    title={`${c.importance}: ${v}`}
                  >
                    {v === 0 ? "∅" : ""}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <div className={own.result} aria-live="polite">
          <div className={own.split}>
            <span style={{ width: `${100 - cusPct}%` }}>{c.template}</span>
            <span style={{ width: `${cusPct}%` }}>{c.custom}</span>
          </div>
          <p className={own.verdict}>{verdict}</p>
        </div>
      </div>
    </div>
  );
}
