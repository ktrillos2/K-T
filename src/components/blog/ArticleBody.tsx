"use client";

import type { Block } from "@/content/blog/types";
import { Inline } from "./Inline";
import { PriceCalculator } from "./widgets/PriceCalculator";
import { SpeedSimulator } from "./widgets/SpeedSimulator";
import { TemplateVsCustom } from "./widgets/TemplateVsCustom";
import { Quiz } from "./widgets/Quiz";
import { Checklist } from "./widgets/Checklist";
import styles from "./Article.module.css";

/** Renderiza los bloques de un artículo, incluidos los widgets interactivos. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={b.id} data-toc>
                <a href={`#${b.id}`} className={styles.anchor} aria-hidden="true" tabIndex={-1}>
                  #
                </a>
                {b.text}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
            return (
              <ul key={i} className={styles.ul}>
                {b.items.map((it) => (
                  <li key={it}>
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className={styles.ol}>
                {b.items.map((it) => (
                  <li key={it}>
                    <Inline text={it} />
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className={styles.quote}>
                <p>
                  <Inline text={b.text} />
                </p>
                {b.cite && <cite>{b.cite}</cite>}
              </blockquote>
            );
          case "callout":
            return (
              <aside key={i} className={styles.callout} data-tone={b.tone}>
                {b.title && <p className={styles.calloutTitle}>{b.title}</p>}
                <p>
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          case "table":
            return (
              <div key={i} className={styles.tableWrap}>
                <table className={styles.table}>
                  {b.caption && <caption>{b.caption}</caption>}
                  <thead>
                    <tr>
                      {b.head.map((h, k) => (
                        <th key={k} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, k) => (
                      <tr key={k}>
                        {r.map((c, j) =>
                          j === 0 ? (
                            <th key={j} scope="row">
                              {c}
                            </th>
                          ) : (
                            <td key={j}>{c}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "stat":
            return (
              <figure key={i} className={styles.stat}>
                <span className={styles.statValue}>{b.value}</span>
                <figcaption>
                  {b.label}
                  {b.source && <small>{b.source}</small>}
                </figcaption>
              </figure>
            );
          case "widget":
            if (b.name === "price-calculator") return <PriceCalculator key={i} />;
            if (b.name === "speed-simulator") return <SpeedSimulator key={i} />;
            if (b.name === "template-vs-custom") return <TemplateVsCustom key={i} />;
            if (b.name === "quiz") return <Quiz key={i} questions={b.questions} />;
            if (b.name === "checklist") return <Checklist key={i} id={b.id} title={b.title} items={b.items} />;
            return null;
        }
      })}
    </>
  );
}
