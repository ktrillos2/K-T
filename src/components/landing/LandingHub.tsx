"use client";

import { useRef } from "react";
import { PLANS, type PlanId } from "@/lib/pricing";
import { COLOR_VAR } from "@/lib/routes";
import { vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { useSceneDim } from "@/hooks/useSceneDim";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { Stage3D } from "@/components/three/Stage3D";
import { TLink } from "@/components/transition/TLink";
import { Price } from "@/components/ui/Price";
import styles from "./LandingHub.module.css";

export type HubItem = { href: string; label: string; text: string; color: "red" | "yellow" | "green"; plan?: PlanId; meta?: string };

type Props = {
  eyebrow: string;
  h1: string;
  lead: string;
  items: HubItem[];
  extra?: { title: string; links: { href: string; label: string }[] }[];
};

/** Índice de servicios o industrias: tarjetas con su precio de partida en la moneda del visitante. */
export function LandingHub({ eyebrow, h1, lead, items, extra = [] }: Props) {
  const { t } = useI18n();
  const body = useRef<HTMLDivElement>(null);
  useSceneDim(body, 0.92);
  return (
    <>
      <header className={styles.hero} data-hero="">
        <Stage3D formation="about" anchored={false} />
        <div className="wrap">
          <p className={styles.eyebrow}>
            <span>{"//"}</span> <Scramble trigger="enter" text={eyebrow} />
          </p>
          <SplitTitle as="h1" mode="enter" className="h-hero" tabIndex={-1}>
            {h1}
          </SplitTitle>
          <Reveal mode="enter" delay={0.3}>
            <p className={`lead ${styles.lead}`}>{lead}</p>
          </Reveal>
        </div>
      </header>
      <div ref={body} className={styles.body}>
        <div className="wrap">
          <Reveal as="ul" stagger={0.05} className={styles.grid}>
            {items.map((it, i) => {
              const plan = it.plan ? PLANS.find((p) => p.id === it.plan) : undefined;
              return (
                <li key={it.href}>
                  <TLink href={it.href} className={styles.card} style={vars({ "--c": COLOR_VAR[it.color] })} data-cursor={t.cursor.open}>
                    <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`display ${styles.name}`}>{it.label}</span>
                    <span className={styles.text}>{it.text}</span>
                    <span className={styles.foot}>
                      {plan && !plan.quote ? (
                        <span>
                          {t.price.from} <strong>{<Price cop={plan.from} />}</strong>
                        </span>
                      ) : (
                        <span>{it.meta}</span>
                      )}
                      <span className={styles.arrow} aria-hidden="true">
                        →
                      </span>
                    </span>
                  </TLink>
                </li>
              );
            })}
          </Reveal>
          {extra.map((g) => (
            <nav key={g.title} className={styles.extra} aria-label={g.title}>
              <p>{g.title}</p>
              {g.links.map((l) => (
                <TLink key={l.href} href={l.href} className={styles.chip}>
                  {l.label} →
                </TLink>
              ))}
            </nav>
          ))}
        </div>
      </div>
    </>
  );
}
