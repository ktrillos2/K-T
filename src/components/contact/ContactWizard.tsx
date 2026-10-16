"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useI18n } from "@/i18n/I18nProvider";
import { PLANS } from "@/lib/pricing";
import { wa } from "@/lib/site";
import { cx } from "@/lib/utils";
import { CostSheet } from "./CostSheet";
import styles from "./ContactWizard.module.css";

type Answers = { what: string; biz: string; when: string; name: string; email: string; phone: string };
const EMPTY: Answers = { what: "", biz: "", when: "", name: "", email: "", phone: "" };
const KEYS: (keyof Answers)[] = ["what", "biz", "when", "name", "email", "phone"];
const STEPS = KEYS.length;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type Status = "idle" | "sending" | "sent" | "failed";

/**
 * Contacto conversacional: seis preguntas, la información se envía por correo (Resend)
 * y al terminar se muestra la ficha de costos del servicio elegido, con la opción de seguir por WhatsApp.
 */
export function ContactWizard() {
  const { t, country, lang, money } = useI18n();
  const c = t.contact;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [planIndex, setPlanIndex] = useState(-1);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [trap, setTrap] = useState("");
  const log = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const questions = [c.q1, c.q2, c.q3, c.q4, c.q5, c.q6];
  const options: (string[] | null)[] = [c.q1opts, null, c.q3opts, null, null, null];
  const placeholders = ["", c.q2ph, "", c.q4ph, c.q5ph, c.q6ph];
  const types = ["text", "text", "text", "text", "email", "tel"];
  const autos = ["off", "organization", "off", "name", "email", "tel"];
  const done = step >= STEPS;

  useEffect(() => {
    if (done) return;
    setTyping(true);
    const id = window.setTimeout(() => setTyping(false), prefersReducedMotion() ? 0 : 600);
    return () => window.clearTimeout(id);
  }, [step, done]);

  useEffect(() => {
    const el = log.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    const tail = Array.from(el.querySelectorAll("[data-bubble]")).slice(-2);
    if (!prefersReducedMotion() && tail.length) gsap.fromTo(tail, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power3.out" });
    if (!typing && !done && options[step] === null) inputRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, typing, status]);

  const message = c.message({ ...answers, name: answers.name || "—", phone: answers.phone || undefined }) + `\n${lang === "en" ? "Country" : "País"}: ${country.name[lang]}`;

  const submit = async (final: Answers, pIndex: number) => {
    setStatus("sending");
    const plan = pIndex >= 0 && pIndex < PLANS.length ? PLANS[pIndex] : null;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...final,
          planIndex: pIndex,
          country: country.name[lang],
          currency: country.currency,
          localPrice: plan ? `${money(plan.from)} ${country.currency}` : "",
          lang,
          page: window.location.href,
          website: trap,
        }),
      });
      setStatus(res.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  const answer = (value: string, optIndex?: number) => {
    const v = value.trim();
    const key = KEYS[step];
    if (key === "email" && !EMAIL.test(v)) {
      setError(c.invalidEmail);
      return;
    }
    if (!v && key !== "phone") return;
    setError("");
    const next = { ...answers, [key]: v };
    setAnswers(next);
    if (step === 0 && optIndex !== undefined) setPlanIndex(optIndex);
    setDraft("");
    setStep((s) => s + 1);
    if (step === STEPS - 1) submit(next, step === 0 ? optIndex ?? planIndex : planIndex);
  };

  const edit = (i: number) => {
    if (status === "sending" || status === "sent") return;
    setDraft(answers[KEYS[i]]);
    setStatus("idle");
    setStep(i);
  };

  const restart = () => {
    setAnswers(EMPTY);
    setDraft("");
    setPlanIndex(-1);
    setStatus("idle");
    setStep(0);
  };

  return (
    <div className={styles.win}>
      <div className={styles.bar}>
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.title}>{c.path}</span>
        <span className={styles.steps} aria-hidden="true">
          {KEYS.map((k, i) => (
            <i key={k} data-on={i < step} />
          ))}
        </span>
      </div>

      <div ref={log} className={styles.log} aria-live="polite">
        {questions.slice(0, Math.min(step, STEPS)).map((q, i) => (
          <div key={i} className={styles.pair}>
            <p data-bubble className={cx(styles.bubble, styles.bot)}>
              <span className={styles.who}>{c.bot}</span>
              {q}
            </p>
            {answers[KEYS[i]] && (
              <p data-bubble className={cx(styles.bubble, styles.you)}>
                <span className={styles.who}>
                  {c.you}
                  {status !== "sent" && status !== "sending" && (
                    <button type="button" className={styles.edit} onClick={() => edit(i)}>
                      {c.edit}
                    </button>
                  )}
                </span>
                {answers[KEYS[i]]}
              </p>
            )}
          </div>
        ))}

        {!done && (
          <div className={styles.pair}>
            <p data-bubble className={cx(styles.bubble, styles.bot, typing && styles.typing)}>
              <span className={styles.who}>{c.bot}</span>
              {typing ? (
                <span className={styles.dotsAnim} aria-label={c.typing}>
                  <i />
                  <i />
                  <i />
                </span>
              ) : (
                questions[step]
              )}
            </p>
          </div>
        )}

        {done && status === "sending" && (
          <p data-bubble className={cx(styles.bubble, styles.bot, styles.typing)}>
            <span className={styles.who}>{c.bot}</span>
            {c.sending}{" "}
            <span className={styles.dotsAnim} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </p>
        )}

        {done && status === "sent" && (
          <div className={styles.pair}>
            <p data-bubble className={cx(styles.bubble, styles.bot, styles.ok)}>
              <span className={styles.who}>{c.bot}</span>
              <span className={styles.check} aria-hidden="true">
                ✓
              </span>{" "}
              {c.sent}
              <br />
              <small>{c.copyTo(answers.email)}</small>
            </p>
            <div data-bubble>
              <CostSheet planIndex={planIndex} />
            </div>
          </div>
        )}

        {done && status === "failed" && (
          <p data-bubble className={cx(styles.bubble, styles.bot, styles.err)}>
            <span className={styles.who}>{c.bot}</span>
            {c.failed}
          </p>
        )}
      </div>

      <div className={styles.input}>
        {!done && !typing && options[step] && (
          <div className={styles.options} role="group" aria-label={questions[step]}>
            {options[step]!.map((o, k) => (
              <button key={o} type="button" className={styles.option} onClick={() => answer(o, k)} data-stick>
                {o}
              </button>
            ))}
          </div>
        )}
        {!done && !typing && !options[step] && (
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              answer(draft);
            }}
            noValidate
          >
            <span className={styles.ps} aria-hidden="true">
              {">"}
            </span>
            <label htmlFor={`wizard-${step}`} className="sr-only">
              {questions[step]}
            </label>
            <input
              ref={inputRef}
              id={`wizard-${step}`}
              name={KEYS[step]}
              className={styles.field}
              type={types[step]}
              inputMode={types[step] === "email" ? "email" : types[step] === "tel" ? "tel" : undefined}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (error) setError("");
              }}
              placeholder={placeholders[step]}
              autoComplete={autos[step]}
              maxLength={120}
              aria-invalid={!!error}
              aria-describedby={error ? "wizard-error" : undefined}
            />
            {/* Campo trampa para bots */}
            <input className={styles.trap} tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} aria-hidden="true" name="website" />
            {KEYS[step] === "phone" && (
              <button type="button" className={styles.skip} onClick={() => answer("")}>
                {c.skip}
              </button>
            )}
            <button type="submit" className={styles.send} disabled={!draft.trim()}>
              {c.send} ↵
            </button>
          </form>
        )}
        {error && (
          <p id="wizard-error" className={styles.error} role="alert">
            {error}
          </p>
        )}
        {done && status !== "sending" && (
          <div className={styles.finish}>
            <a className={cx("btn", styles.wa)} href={wa(message)} target="_blank" rel="noopener noreferrer" data-stick>
              {status === "sent" ? c.continueWa : c.viaWa} <span className="arr">→</span>
            </a>
            {status === "failed" && (
              <button type="button" className="btn btn--ghost" onClick={() => submit(answers, planIndex)}>
                {c.retry}
              </button>
            )}
            <button type="button" className={styles.restart} onClick={restart}>
              {c.restart}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
