"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useI18n } from "@/i18n/I18nProvider";
import { PLANS } from "@/lib/pricing";
import { wa } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cx } from "@/lib/utils";
import { DIAL_COUNTRIES, dialCountryByCode, type DialCountry } from "@/lib/countries-dial";
import { CostSheet } from "./CostSheet";
import styles from "./ContactWizard.module.css";

type Answers = { what: string; name: string; phone: string; email: string };
const EMPTY: Answers = { what: "", name: "", phone: "", email: "" };
const KEYS: (keyof Answers)[] = ["what", "name", "phone", "email"];
const STEPS = KEYS.length;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+[1-9]\d{7,14}$/;
type Status = "idle" | "sending" | "sent" | "failed";

/** Opción «Administración de Ads» del primer paso: va después de los planes y no tiene ficha de plan. */
const ADS_INDEX = PLANS.length;

/**
 * Tres datos para contactar y un correo opcional. Al terminar se muestra la ficha
 * de costos del servicio elegido, con la opción de seguir por WhatsApp.
 */
export function ContactWizard() {
  const { t, country, lang, planMoney } = useI18n();
  const c = t.contact;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [planIndex, setPlanIndex] = useState(-1);
  const [draft, setDraft] = useState("");
  const [selectedDialCountry, setSelectedDialCountry] = useState<DialCountry>(() => dialCountryByCode(country?.code));
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [trap, setTrap] = useState("");
  const log = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (country?.code) {
      setSelectedDialCountry(dialCountryByCode(country.code));
    }
  }, [country?.code]);

  const questions = [c.q1, c.q4, c.q6, c.q5];
  const options: (string[] | null)[] = [c.q1opts, null, null, null];
  const placeholders = ["", c.q4ph, c.q6ph, c.q5ph];
  const types = ["text", "text", "tel", "email"];
  const autos = ["off", "name", "tel-national", "email"];
  const done = step >= STEPS;

  useEffect(() => {
    const el = log.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    const tail = Array.from(el.querySelectorAll("[data-bubble]")).slice(-2);
    if (!prefersReducedMotion() && tail.length) gsap.fromTo(tail, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power3.out" });
    if (!done && options[step] === null) inputRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, status]);

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
          localPrice: plan ? planMoney(plan) : "",
          lang,
          page: window.location.href,
          website: trap,
        }),
      });
      if (res.ok) trackEvent("generate_lead", { service: plan?.id ?? (pIndex === ADS_INDEX ? "administracion-de-ads" : "sin_definir"), method: "formulario" });
      setStatus(res.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  const answer = (value: string, optIndex?: number) => {
    let v = value.trim();
    const key = KEYS[step];
    if (key === "phone") {
      const rawDigits = v.replace(/\D/g, "");
      v = rawDigits ? `${selectedDialCountry.dial} ${rawDigits}` : "";
      if (rawDigits.length < 7 || !PHONE.test(v.replace(/\s/g, ""))) {
        setError(c.invalidPhone);
        return;
      }
    }
    if (key === "email" && v && !EMAIL.test(v)) {
      setError(c.invalidEmail);
      return;
    }
    if (!v && key !== "email") return;
    setError("");
    const next = { ...answers, [key]: v };
    setAnswers(next);
    if (step === 0) trackEvent("quote_form_start", { service: optIndex !== undefined ? PLANS[optIndex]?.id ?? (optIndex === ADS_INDEX ? "administracion-de-ads" : "sin_definir") : "sin_definir", location: "formulario" });
    if (step === 0 && optIndex !== undefined) setPlanIndex(optIndex);
    setDraft("");
    setStep((s) => s + 1);
    if (step === STEPS - 1) submit(next, step === 0 ? optIndex ?? planIndex : planIndex);
  };

  const edit = (i: number) => {
    if (status === "sending" || status === "sent") return;
    const currentVal = answers[KEYS[i]];
    if (KEYS[i] === "phone") {
      let localDigits = currentVal.replace(/\D/g, "");
      for (const dc of DIAL_COUNTRIES) {
        if (currentVal.includes(dc.dial)) {
          setSelectedDialCountry(dc);
          localDigits = currentVal.replace(dc.dial, "").replace(/\D/g, "");
          break;
        }
      }
      setDraft(localDigits);
    } else {
      setDraft(currentVal);
    }
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
            {(answers[KEYS[i]] || KEYS[i] === "email") && (
              <p data-bubble className={cx(styles.bubble, styles.you)}>
                <span className={styles.who}>
                  {c.you}
                  {status !== "sent" && status !== "sending" && (
                    <button type="button" className={styles.edit} onClick={() => edit(i)}>
                      {c.edit}
                    </button>
                  )}
                </span>
                {answers[KEYS[i]] || c.skipped}
              </p>
            )}
          </div>
        ))}

        {!done && (
          <div className={styles.pair}>
            <p data-bubble className={cx(styles.bubble, styles.bot)}>
              <span className={styles.who}>{c.bot}</span>
              {questions[step]}
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
              {answers.email && <small>{c.copyTo(answers.email)}</small>}
            </p>
            {planIndex !== ADS_INDEX && (
              <div data-bubble>
                <CostSheet planIndex={planIndex} />
              </div>
            )}
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
        {!done && options[step] && (
          <div className={styles.options} role="group" aria-label={questions[step]}>
            {options[step]!.map((o, k) => (
              <button key={o} type="button" className={styles.option} onClick={() => answer(o, k)} data-stick>
                {o}
              </button>
            ))}
          </div>
        )}
        {!done && !options[step] && (
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

            {KEYS[step] === "phone" && (
              <div className={styles.countrySelectWrap}>
                <select
                  className={styles.countrySelect}
                  value={selectedDialCountry.code}
                  onChange={(e) => setSelectedDialCountry(dialCountryByCode(e.target.value))}
                  aria-label={c.dialCode}
                >
                  {DIAL_COUNTRIES.map((dc) => (
                    <option key={dc.code} value={dc.code}>
                      {dc.code} {dc.dial} ({dc.name})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <input
              ref={inputRef}
              id={`wizard-${step}`}
              name={KEYS[step]}
              className={styles.field}
              type={types[step]}
              inputMode={
                types[step] === "email"
                  ? "email"
                  : KEYS[step] === "phone"
                  ? "numeric"
                  : undefined
              }
              value={draft}
              onKeyDown={(e) => {
                if (KEYS[step] === "phone") {
                  // Permitir teclas de navegación y comandos
                  if (
                    [
                      "Backspace",
                      "Delete",
                      "Tab",
                      "Escape",
                      "Enter",
                      "ArrowLeft",
                      "ArrowRight",
                      "ArrowUp",
                      "ArrowDown",
                    ].includes(e.key) ||
                    e.ctrlKey ||
                    e.metaKey
                  ) {
                    return;
                  }
                  // Permitir solo números 0-9
                  if (!/^\d$/.test(e.key)) {
                    e.preventDefault();
                  }
                }
              }}
              onChange={(e) => {
                const val = KEYS[step] === "phone" ? e.target.value.replace(/\D/g, "") : e.target.value;
                setDraft(val);
                if (error) setError("");
              }}
              placeholder={KEYS[step] === "phone" ? selectedDialCountry.placeholder : placeholders[step]}
              autoComplete={autos[step]}
              required={KEYS[step] !== "email"}
              maxLength={KEYS[step] === "phone" ? 15 : 120}
              aria-invalid={!!error}
              aria-describedby={error ? "wizard-error" : undefined}
            />
            {/* Campo trampa para bots */}
            <input className={styles.trap} tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} aria-hidden="true" name="website" />
            {KEYS[step] === "email" && (
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
