"use client";

import { SITE } from "@/lib/site";
import { MacWindow } from "@/components/ui/MacWindow";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./InfoTerminal.module.css";

/** Ficha institucional como salida de terminal. */
export function InfoTerminal() {
  const { t } = useI18n();
  const info = t.about.info;
  const ROWS: [string, string][] = [...info.rows, [t.common.email, `${SITE.email} · ${SITE.phone}`]];
  return (
    <section className="band" aria-labelledby="h-ficha" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SplitTitle as="h2" id="h-ficha" className={`h-sec ${styles.title}`}>
          {info.title}
        </SplitTitle>
        <Reveal>
          <MacWindow title={info.cmd.replace("$ ", "")} bodyClassName={styles.term}>
            <p className={styles.prompt}>{info.cmd}</p>
            <dl className={styles.rows}>
              {ROWS.map(([k, v]) => (
                <div key={k} className={styles.row}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </MacWindow>
        </Reveal>
      </div>
    </section>
  );
}
