"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Widget.module.css";
import own from "./Checklist.module.css";

/** Lista de verificación cuyo avance se guarda en el navegador del lector. */
export function Checklist({ id, title, items }: { id: string; title: string; items: string[] }) {
  const { t } = useI18n();
  const c = t.blog.widgets.checklist;
  const key = `kt-check-${id}`;
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const arr = JSON.parse(raw) as boolean[];
        if (Array.isArray(arr)) setDone(items.map((_, i) => !!arr[i]));
      }
    } catch {
      /* sin almacenamiento */
    }
  }, [key, items]);

  const save = (next: boolean[]) => {
    setDone(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* sin almacenamiento */
    }
  };

  const count = done.filter(Boolean).length;
  const pct = Math.round((count / items.length) * 100);

  return (
    <div className={styles.widget}>
      <div className={styles.bar}>
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <strong>{title}</strong>
        <span className={styles.badge}>{c.done(count, items.length)}</span>
      </div>
      <div className={styles.body}>
        <div className={own.meter} aria-hidden="true">
          <i style={{ width: `${pct}%` }} />
        </div>
        <ul className={own.list}>
          {items.map((it, i) => (
            <li key={it}>
              <label className={own.item} data-done={done[i]}>
                <input type="checkbox" checked={done[i]} onChange={() => save(done.map((d, k) => (k === i ? !d : d)))} />
                <span className={own.box} aria-hidden="true">
                  {done[i] ? "✓" : ""}
                </span>
                <span>{it}</span>
              </label>
            </li>
          ))}
        </ul>
        <button type="button" className={own.reset} onClick={() => save(items.map(() => false))}>
          {c.reset}
        </button>
      </div>
    </div>
  );
}
