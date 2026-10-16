"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Widget.module.css";
import own from "./Quiz.module.css";

type Q = { q: string; options: string[]; answer: number; why: string };

/** Mini test de comprensión con explicación tras cada respuesta. */
export function Quiz({ questions }: { questions: Q[] }) {
  const { t } = useI18n();
  const c = t.blog.widgets.quiz;
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [right, setRight] = useState(0);
  const done = i >= questions.length;
  const q = questions[Math.min(i, questions.length - 1)];

  return (
    <div className={styles.widget}>
      <div className={styles.bar}>
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <strong>quiz.md</strong>
        <span className={own.progress} aria-hidden="true">
          {questions.map((_, k) => (
            <i key={k} data-on={k < i || (k === i && checked)} />
          ))}
        </span>
      </div>
      <div className={styles.body} aria-live="polite">
        {done ? (
          <div className={own.done}>
            <p className={styles.big}>{c.score(right, questions.length)}</p>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => {
                setI(0);
                setPick(null);
                setChecked(false);
                setRight(0);
              }}
            >
              {c.again}
            </button>
          </div>
        ) : (
          <>
            <p className={own.q}>
              <span className="tnum">
                {i + 1}/{questions.length}
              </span>{" "}
              {q.q}
            </p>
            <div className={own.options} role="radiogroup" aria-label={q.q}>
              {q.options.map((o, k) => {
                const state = !checked ? (pick === k ? "pick" : "") : k === q.answer ? "ok" : pick === k ? "bad" : "";
                return (
                  <button key={o} type="button" role="radio" aria-checked={pick === k} className={own.opt} data-state={state} disabled={checked} onClick={() => setPick(k)}>
                    <span className={own.letter}>{String.fromCharCode(65 + k)}</span>
                    {o}
                  </button>
                );
              })}
            </div>
            {checked && (
              <p className={own.why} data-ok={pick === q.answer}>
                <b>{pick === q.answer ? c.correct : c.wrong}</b> {q.why}
              </p>
            )}
            <div>
              {!checked ? (
                <button
                  type="button"
                  className="btn btn--solid btn--sm"
                  disabled={pick === null}
                  onClick={() => {
                    setChecked(true);
                    if (pick === q.answer) setRight((r) => r + 1);
                  }}
                >
                  {c.check}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn--solid btn--sm"
                  onClick={() => {
                    setI((x) => x + 1);
                    setPick(null);
                    setChecked(false);
                  }}
                >
                  {c.next} <span className="arr">→</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
