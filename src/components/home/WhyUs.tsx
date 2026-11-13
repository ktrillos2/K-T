"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { cx, vars } from "@/lib/utils";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./WhyUs.module.css";

/** Por qué elegirnos: comparador "plantilla vs. hecha a tu medida" y cuatro razones en lenguaje simple. */
export function WhyUs() {
  const { t } = useI18n();
  const w = t.home.why;
  const c = w.compare;
  const [pos, setPos] = useState(42);

  return (
    <section className={cx("band", styles.section)} aria-labelledby="h-why">
      <div className="wrap">
        <SectionHead id="h-why" path={w.path} title={w.title} lead={w.lead} />
        <div className={styles.grid}>
          <Reveal className={styles.compareWrap}>
            <div className={styles.compare} style={vars({ "--pos": `${pos}%` })}>
              {/* Capa 1: plantilla genérica */}
              <div className={cx(styles.layer, styles.tpl)} aria-hidden="true">
                <div className={styles.tplNav}>
                  <i />
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.tplHero}>
                  <b>{c.tplTitle}</b>
                  <span />
                  <p className={styles.tplLoading}>
                    <i /> {c.tplLoading}
                  </p>
                </div>
                <div className={styles.tplCards}>
                  <i />
                  <i />
                  <i />
                </div>
                <p className={cx(styles.tag, styles.tagTpl)}>{c.tplNote}</p>
              </div>
              {/* Capa 2: hecha a la medida (se descubre al arrastrar) */}
              <div className={cx(styles.layer, styles.ours)} aria-hidden="true">
                <div className={styles.oursNav}>
                  <b>K&amp;T</b>
                  <span />
                  <span />
                </div>
                <div className={styles.oursHero}>
                  <em>{c.oursFast}</em>
                  <b className="display">{c.oursTitle}</b>
                  <span className={styles.oursCta}>{c.oursCta}</span>
                </div>
                <div className={styles.oursCards}>
                  <i />
                  <i />
                  <i />
                </div>
                <p className={cx(styles.tag, styles.tagOurs)}>★ {c.oursNote}</p>
              </div>
              <span className={styles.handle} aria-hidden="true">
                <i>↔</i>
              </span>
              <span className={cx(styles.side, styles.sideL)} aria-hidden="true">
                {c.left}
              </span>
              <span className={cx(styles.side, styles.sideR)} aria-hidden="true">
                {c.right}
              </span>
              {/* El control real es un range invisible: funciona con mouse, dedo y teclado. */}
              <input className={styles.range} type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label={c.aria} />
            </div>
            <p className={styles.hint}>{c.hint}</p>
          </Reveal>

          <Reveal as="ul" stagger={0.08} className={styles.items}>
            {w.items.map((it, i) => (
              <li key={it.t} className={styles.item}>
                <span className={styles.num}>{i + 1}</span>
                <div>
                  <h3 className={cx("display", styles.itemTitle)}>{it.t}</h3>
                  <p>{it.d}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
