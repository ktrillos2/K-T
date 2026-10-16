"use client";

import { useMemo, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useSceneDim } from "@/hooks/useSceneDim";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { Stage3D } from "@/components/three/Stage3D";
import styles from "./FaqPage.module.css";

export type FaqGroup = { id: string; title: string; items: { q: string; a: string }[] };

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

/** Preguntas frecuentes agrupadas, con buscador instantáneo. Todo el texto está en el HTML. */
export function FaqPage({ groups }: { groups: FaqGroup[] }) {
  const { t } = useI18n();
  const c = t.landing.faqPage;
  const [q, setQ] = useState("");
  const body = useRef<HTMLDivElement>(null);
  useSceneDim(body, 0.92);
  const shown = useMemo(() => {
    const s = norm(q.trim());
    if (!s) return groups;
    return groups.map((g) => ({ ...g, items: g.items.filter((it) => norm(`${it.q} ${it.a}`).includes(s)) })).filter((g) => g.items.length);
  }, [q, groups]);

  return (
    <>
      <header className={styles.hero} data-hero="">
        <Stage3D formation="about" anchored={false} />
        <div className="wrap">
          <p className={styles.eyebrow}>
            <span>{"//"}</span> <Scramble trigger="enter" text={c.eyebrow} />
          </p>
          <SplitTitle as="h1" mode="enter" className="h-hero" tabIndex={-1}>
            {c.h1}
          </SplitTitle>
          <Reveal mode="enter" delay={0.3}>
            <p className="lead">{c.lead}</p>
          </Reveal>
        </div>
      </header>
      <div ref={body} className={styles.body}>
        <div className="wrap">
          <label className={styles.search}>
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">{t.blog.searchAria}</span>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={c.search} />
          </label>
          {shown.map((g) => (
            <section key={g.id} className={styles.group} aria-labelledby={`faq-${g.id}`}>
              <h2 id={`faq-${g.id}`} className={styles.h2}>
                {g.title}
              </h2>
              <div className={styles.list}>
                {g.items.map((it) => (
                  <details key={it.q}>
                    <summary>{it.q}</summary>
                    <p>{it.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
          {shown.length === 0 && <p className={styles.empty}>{t.blog.empty}</p>}
        </div>
      </div>
    </>
  );
}
