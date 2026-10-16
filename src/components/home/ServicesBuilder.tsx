"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Flip, gsap, prefersReducedMotion } from "@/lib/gsap";
import { PLANS, type PlanId } from "@/lib/pricing";
import { COLOR_VAR } from "@/lib/routes";
import { wa } from "@/lib/site";
import { cx, vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHead } from "@/components/ui/SectionHead";
import { Price } from "@/components/ui/Price";
import { Reveal } from "@/components/motion/Reveal";
import { TLink } from "@/components/transition/TLink";
import { PlanArt } from "@/components/pricing/PlanArt";
import styles from "./ServicesBuilder.module.css";

type Kind = "hero" | "rows" | "form" | "chat" | "search" | "url" | "grid" | "cart" | "pay" | "side" | "truck" | "tabs" | "cards" | "stars" | "chart" | "kpi" | "users" | "table" | "nodes" | "receipt" | "flow";

/** Cómo se dibuja cada función dentro de la vista previa. */
const KIND: Record<string, Kind> = {
  hero: "hero", sections: "rows", form: "form", whatsapp: "chat", seo: "search", domain: "url",
  catalog: "grid", cart: "cart", payments: "pay", admin: "side", shipping: "truck",
  pages: "tabs", services: "cards", portfolio: "grid", reviews: "stars", analytics: "chart",
  dashboard: "kpi", roles: "users", database: "table", api: "nodes", invoice: "receipt", automation: "flow",
};

/** Bloques que ocupan todo el ancho de la vista previa. */
const WIDE = new Set<Kind>(["hero", "grid", "tabs", "kpi", "table", "flow", "rows"]);

function Block({ kind, label }: { kind: Kind; label: string }) {
  const n = (k: number) => Array.from({ length: k }, (_, i) => <i key={i} />);
  return (
    <div className={cx(styles.block, WIDE.has(kind) && styles.wide)} data-kind={kind} data-flip-id={label}>
      <span className={styles.blockLabel}>{label}</span>
      <div className={styles.art} aria-hidden="true">
        {kind === "hero" && (
          <>
            <b className={styles.heroTitle} />
            <b className={styles.heroSub} />
            <b className={styles.heroBtn} />
          </>
        )}
        {kind === "rows" && n(5)}
        {kind === "form" && (
          <>
            {n(3)}
            <b />
          </>
        )}
        {kind === "chat" && <b />}
        {kind === "search" && (
          <>
            <b />
            <i />
            <i />
          </>
        )}
        {kind === "url" && <b>tu-negocio.com</b>}
        {kind === "grid" && n(8)}
        {kind === "cart" && <b>3</b>}
        {kind === "pay" && (
          <>
            <b>PSE</b>
            <b>Nequi</b>
            <b>VISA</b>
          </>
        )}
        {kind === "side" && (
          <>
            <b />
            {n(4)}
          </>
        )}
        {kind === "truck" && (
          <>
            <b />
            <i />
          </>
        )}
        {kind === "tabs" && n(8)}
        {kind === "cards" && n(3)}
        {kind === "stars" && <b>★★★★★</b>}
        {kind === "chart" && n(7)}
        {kind === "kpi" && n(4)}
        {kind === "users" && n(4)}
        {kind === "table" && n(12)}
        {kind === "nodes" && n(4)}
        {kind === "receipt" && n(4)}
        {kind === "flow" && n(4)}
      </div>
    </div>
  );
}

/**
 * Constructor de servicios ("Arma tu proyecto"):
 * - Arriba eliges el tipo de proyecto (tarjetas con su ilustración pixel animada).
 * - A la izquierda activas o quitas funciones con interruptores pixel; el recibo se actualiza
 *   (precio, entrega y medidor de funciones) y el botón deja el mensaje listo para WhatsApp.
 * - A la derecha la maqueta se arma en vivo en un escritorio y un celular en 3D que siguen
 *   al puntero; cada cambio se anima con Flip y aparece un aviso de lo que se agregó o quitó.
 */
export function ServicesBuilder() {
  const { t, country } = useI18n();
  const s = t.home.services;
  const [planId, setPlanId] = useState<PlanId>("tienda");
  const plan = PLANS.find((p) => p.id === planId)!;
  const feats = s.features[planId] as Record<string, string>;
  const keys = Object.keys(feats);
  const [off, setOff] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<{ label: string; on: boolean; n: number } | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);

  const active = useMemo(() => keys.filter((k) => !off[`${planId}.${k}`]), [keys, off, planId]);

  const capture = () => {
    const el = stage.current;
    if (el && !prefersReducedMotion()) flipState.current = Flip.getState(el.querySelectorAll("[data-flip-id]"));
  };

  useLayoutEffect(() => {
    const st = flipState.current;
    if (!st) return;
    flipState.current = null;
    Flip.from(st, {
      duration: 0.6,
      ease: "expo.out",
      absolute: false,
      nested: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.85, y: 16 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.85, duration: 0.3 }),
    });
  }, [active, planId]);

  // Inclinación 3D de los dispositivos según el puntero (variables CSS, sin renders).
  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const untilt = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--px", "0");
    e.currentTarget.style.setProperty("--py", "0");
  };

  const toggle = (k: string) => {
    const id = `${planId}.${k}`;
    const isOn = !off[id];
    if (isOn && active.length <= 1) return; // siempre queda al menos una función
    capture();
    setOff((o) => ({ ...o, [id]: isOn }));
    setToast((tt) => ({ label: feats[k], on: !isOn, n: (tt?.n ?? 0) + 1 }));
  };

  const choosePlan = (id: PlanId) => {
    if (id === planId) return;
    capture();
    setPlanId(id);
    setToast(null);
  };

  const planName = t.pricing.plans[planId].name;
  const message = s.waMessage(planName, active.map((k) => feats[k]).join(", "));
  const accent = COLOR_VAR[plan.color];

  return (
    <section className="band" aria-labelledby="h-services" id="servicios">
      <div className="wrap">
        <SectionHead path={s.path} title={s.title} lead={s.lead} id="h-services" />

        <Reveal className={styles.studio} style={vars({ "--accent": accent })}>
          {/* 1. Tipo de proyecto */}
          <div className={styles.planRail} role="tablist" aria-label={s.title}>
            {PLANS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={p.id === planId}
                className={styles.planCard}
                style={vars({ "--c": COLOR_VAR[p.color] })}
                onClick={() => choosePlan(p.id)}
                data-plan-card
                data-active={p.id === planId}
              >
                <span className={styles.planNum}>0{i + 1}</span>
                <span className={styles.planThumb}>
                  <PlanArt id={p.id} />
                </span>
                <span className={`display ${styles.planName}`}>{t.pricing.plans[p.id].name}</span>
                <span className={styles.planMeta}>
                  {t.price.from} <Price cop={p.from} showCode={false} /> {country.currency}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.workspace}>
            {/* 2. Funciones + recibo */}
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <p className={styles.hint}>{s.hint}</p>
                <span className={styles.meter} aria-label={`${active.length} / ${keys.length} ${s.included}`}>
                  {keys.map((k, i) => (
                    <i key={k} data-on={i < active.length} />
                  ))}
                </span>
              </div>
              <ul className={styles.toggles}>
                {keys.map((k, i) => {
                  const on = !off[`${planId}.${k}`];
                  return (
                    <li key={`${planId}.${k}`} style={vars({ "--i": i })}>
                      <button type="button" className={styles.toggle} aria-pressed={on} onClick={() => toggle(k)}>
                        <span className={styles.toggleText}>{feats[k]}</span>
                        <span className={styles.switch} aria-hidden="true">
                          <i />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <p key={`pitch-${planId}`} className={styles.pitch}>
                {t.pricing.plans[planId].pitch}
              </p>

              <div className={styles.receipt}>
                <div className={styles.receiptRow}>
                  <span>{planName}</span>
                  <span className={`display ${styles.total}`}>{plan.quote ? t.price.quote : <Price cop={plan.from} />}</span>
                </div>
                <div className={styles.receiptRow}>
                  <span>{s.delivery}</span>
                  <b>{t.pricing.plans[planId].delivery}</b>
                </div>
                <div className={styles.receiptRow}>
                  <span>{s.included}</span>
                  <b className="tnum">
                    {active.length} / {keys.length}
                  </b>
                </div>
                <a className={styles.cta} href={wa(message)} target="_blank" rel="noopener noreferrer" data-stick>
                  <span>{s.cta}</span>
                  <span className={styles.ctaArrow} aria-hidden="true">
                    →
                  </span>
                </a>
                <TLink href="/servicios" className={styles.all}>
                  {s.all} →
                </TLink>
              </div>
            </div>

            {/* 3. Vista previa 3D */}
            <div ref={stage} className={styles.stage} onPointerMove={tilt} onPointerLeave={untilt}>
              <div className={styles.scene}>
                <div className={styles.browser}>
                  <div className={styles.bar}>
                    <span className="dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className={styles.url}>
                      <span aria-hidden="true">🔒</span> {s.url}
                    </span>
                  </div>
                  <div className={styles.preview} aria-live="polite">
                    <span key={`scan-${planId}`} className={styles.scan} aria-hidden="true" />
                    {active.map((k) => (
                      <Block key={`${planId}.${k}`} kind={KIND[k] ?? "rows"} label={feats[k]} />
                    ))}
                  </div>
                </div>

                <div className={styles.phone} aria-hidden="true">
                  <span className={styles.notch} />
                  <div className={styles.phoneScreen}>
                    <span className={styles.phoneHead}>
                      <b />
                      <i />
                    </span>
                    {active.map((k) => (
                      <span key={`m-${planId}.${k}`} className={styles.phoneRow} data-flip-id={`m-${feats[k]}`} data-kind={KIND[k] ?? "rows"}>
                        <i />
                        <small>{feats[k]}</small>
                      </span>
                    ))}
                  </div>
                </div>

                {toast && (
                  <span key={toast.n} className={styles.toast} data-on={toast.on} role="status">
                    <i>{toast.on ? "+" : "−"}</i>
                    {toast.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
