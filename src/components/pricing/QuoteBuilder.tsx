"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { PLANS, type PlanId } from "@/lib/pricing";
import { wa } from "@/lib/site";
import { cx } from "@/lib/utils";
import { SectionHead } from "@/components/ui/SectionHead";
import { MacWindow } from "@/components/ui/MacWindow";
import { Price } from "@/components/ui/Price";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./QuoteBuilder.module.css";

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Arma tu cotización como si escribieras un comando: eliges plan y servicios adicionales,
 * el comando se actualiza en vivo y el mensaje sale listo para WhatsApp.
 */
export function QuoteBuilder() {
  const { t, lang, country, money } = useI18n();
  const q = t.pricing.quote;
  const EXTRAS = t.pricing.extras;
  const [plan, setPlan] = useState<PlanId>("tienda");
  const [extras, setExtras] = useState<string[]>([]);
  const [name, setName] = useState("");
  const cmd = useRef<HTMLParagraphElement>(null);
  const current = PLANS.find((p) => p.id === plan)!;

  const command = useMemo(() => {
    const ex = extras.length ? ` --extras ${extras.map(slug).join(",")}` : "";
    return `kt quote --plan ${plan}${ex} --currency ${country.currency.toLowerCase()}`;
  }, [plan, extras, country.currency]);

  const planName = t.pricing.plans[plan].name;
  const message = useMemo(
    () =>
      q.message({
        name: name.trim(),
        plan: planName,
        price: `${money(current.from)} ${country.currency}`,
        extras,
        country: country.name[lang],
      }),
    [q, name, planName, money, current.from, country, extras, lang],
  );

  // El comando se "reescribe" cada vez que cambia la selección.
  useEffect(() => {
    const el = cmd.current;
    if (!el || prefersReducedMotion()) return;
    gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "steps(20)", overwrite: true });
  }, [command]);

  // Cuando se elige un plan desde las tarjetas, el cotizador lo toma.
  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<PlanId>).detail;
      if (PLANS.some((p) => p.id === id)) setPlan(id);
    };
    window.addEventListener("kt:plan", on);
    return () => window.removeEventListener("kt:plan", on);
  }, []);

  const toggle = (x: string) => setExtras((xs) => (xs.includes(x) ? xs.filter((y) => y !== x) : [...xs, x]));

  return (
    <section id="cotizar" className="band" aria-labelledby="h-cotizar" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead id="h-cotizar" path={q.path} title={q.title} lead={q.lead} />
        <div className={styles.grid}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>{q.step1}</legend>
              <div className={styles.plans}>
                {PLANS.map((p) => (
                  <label key={p.id} className={cx(styles.plan, plan === p.id && styles.on)}>
                    <input
                      type="radio"
                      name="plan"
                      id={`quote-plan-${p.id}`}
                      value={p.id}
                      checked={plan === p.id}
                      onChange={() => setPlan(p.id)}
                    />
                    <span className={styles.planName}>{t.pricing.plans[p.id].name}</span>
                    <span className={styles.planPrice}>
                      {t.price.from} <Price cop={p.from} />
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>{q.step2}</legend>
              <div className={styles.extras}>
                {EXTRAS.map((x) => (
                  <label key={x} className={cx(styles.extra, extras.includes(x) && styles.on)}>
                    <input type="checkbox" id={`quote-extra-${slug(x)}`} checked={extras.includes(x)} onChange={() => toggle(x)} />
                    <span aria-hidden="true" className={styles.box} />
                    {x}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>{q.step3}</legend>
              <input
                id="quote-name"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={q.placeholder}
                autoComplete="organization"
              />
            </fieldset>
          </form>

          <MacWindow title="~/kytcode — zsh" className={styles.term} bodyClassName={styles.termBody}>
            <p ref={cmd} className={styles.cmd}>
              <span className={styles.ps}>$</span> {command}
            </p>
            <p className={styles.ok}>{q.generated}</p>
            <pre className={styles.msg}>{message}</pre>
            <a className={cx("btn btn--solid", styles.send)} href={wa(message)} target="_blank" rel="noopener noreferrer" data-stick>
              {q.send} <span className="arr">→</span>
            </a>
            <p className={styles.small}>{q.small}</p>
          </MacWindow>
        </div>
      </div>
    </section>
  );
}
