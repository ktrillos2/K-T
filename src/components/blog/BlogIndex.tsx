"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Flip, gsap, prefersReducedMotion } from "@/lib/gsap";
import { cx } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { CATEGORY_LABELS, formatDate, postsFor } from "@/content/blog/meta";
import type { BlogCategory } from "@/content/blog/types";
import { useSceneDim } from "@/hooks/useSceneDim";
import { useNavigate } from "@/components/transition/TransitionProvider";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { Stage3D } from "@/components/three/Stage3D";
import { TLink } from "@/components/transition/TLink";
import { TitleArt } from "./TitleArt";
import styles from "./BlogIndex.module.css";

type Sort = "new" | "short";
type View = "cards" | "terminal";
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

/**
 * Índice del blog: búsqueda instantánea (tecla "/"), filtros por categoría, orden,
 * vista de tarjetas o de terminal (`ls -la`) y un botón de artículo al azar.
 */
export function BlogIndex() {
  const { t, lang, href } = useI18n();
  const b = t.blog;
  const navigate = useNavigate();
  const posts = useMemo(() => postsFor(lang), [lang]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<BlogCategory | "all">("all");
  const [sort, setSort] = useState<Sort>("new");
  const [view, setView] = useState<View>("cards");
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const flip = useRef<ReturnType<typeof Flip.getState> | null>(null);
  useSceneDim(list, 0.9);

  const cats = useMemo(() => Array.from(new Set(posts.map((p) => p.category))), [posts]);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const widgets = posts.filter((p) => p.interactive).length;

  const shown = useMemo(() => {
    const s = norm(q.trim());
    const out = posts.filter((p) => (cat === "all" || p.category === cat) && (!s || norm(`${p.title} ${p.description} ${p.tags.join(" ")}`).includes(s)));
    return sort === "short" ? out.slice().sort((x, y) => x.minutes - y.minutes) : out;
  }, [posts, q, cat, sort]);

  const capture = () => {
    const els = list.current?.querySelectorAll("[data-post]");
    if (els && !prefersReducedMotion()) flip.current = Flip.getState(els);
  };
  useLayoutEffect(() => {
    const st = flip.current;
    if (!st) return;
    flip.current = null;
    Flip.from(st, {
      duration: 0.6,
      ease: "expo.inOut",
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.15 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, duration: 0.25 }),
    });
  }, [shown, view]);

  // "/" enfoca la búsqueda
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || (e.target as HTMLElement).closest("input, textarea")) return;
      e.preventDefault();
      input.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const random = () => {
    const pool = posts.filter((p) => p.slug !== featured?.slug);
    const pick = pool[Math.floor(Math.random() * pool.length)] ?? featured;
    if (pick) navigate(href(pick.href));
  };

  return (
    <section ref={root} className={styles.page} aria-labelledby="h-blog">
      <Stage3D formation="projects" anchored={false} />
      <header className={cx("wrap", styles.head)} data-hero="">
        <p className={styles.eyebrow}>
          <span>{"//"}</span> <Scramble trigger="enter" text={b.path} />
        </p>
        <SplitTitle as="h1" id="h-blog" mode="enter" className="h-hero" tabIndex={-1}>
          {b.title}
        </SplitTitle>
        <Reveal mode="enter" delay={0.35} className={styles.leadRow}>
          <p className="lead">{b.lead}</p>
          <p className={styles.stats}>{b.stats(posts.length, widgets)}</p>
        </Reveal>
      </header>

      {featured && (
        <div className="wrap">
          <Reveal mode="enter" delay={0.45}>
            <TLink href={featured.href} className={styles.featured} data-cursor={t.cursor.open}>
              <TitleArt title={featured.title} slug={featured.slug} category={featured.category} color={featured.color} size="lg" />
              <span className={styles.fBody}>
                <span className={styles.fTag}>
                  {b.featured} · {CATEGORY_LABELS[lang][featured.category]}
                  {featured.interactive && <em>{b.interactive}</em>}
                </span>
                <span className={`display ${styles.fTitle}`}>{featured.title}</span>
                <span className={styles.fDesc}>{featured.description}</span>
                <span className={styles.fMeta}>
                  {formatDate(featured.date, lang)} · {b.minutes(featured.minutes)}
                </span>
                <span className="btn btn--solid btn--sm">
                  {b.read} <span className="arr">→</span>
                </span>
              </span>
            </TLink>
          </Reveal>
        </div>
      )}

      <div ref={list} className={styles.listArea}>
        <div className="wrap">
          <div className={styles.toolbar}>
            <label className={styles.search}>
              <span aria-hidden="true">⌕</span>
              <span className="sr-only">{b.searchAria}</span>
              <input
                ref={input}
                type="search"
                value={q}
                placeholder={b.search}
                onChange={(e) => {
                  capture();
                  setQ(e.target.value);
                }}
              />
              <kbd>/</kbd>
            </label>
            <div className={styles.chips} role="group" aria-label={b.categoriesLabel}>
              {(["all", ...cats] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={cat === c}
                  onClick={() => {
                    capture();
                    setCat(c);
                  }}
                >
                  {c === "all" ? b.all : CATEGORY_LABELS[lang][c]}
                </button>
              ))}
            </div>
            <div className={styles.right}>
              <div className={styles.seg} role="group">
                {(["new", "short"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={sort === s}
                    onClick={() => {
                      capture();
                      setSort(s);
                    }}
                  >
                    {b.sort[s]}
                  </button>
                ))}
              </div>
              <div className={styles.seg} role="group">
                {(["cards", "terminal"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={view === v}
                    onClick={() => {
                      capture();
                      setView(v);
                    }}
                  >
                    {b.views[v]}
                  </button>
                ))}
              </div>
              <button type="button" className={styles.random} onClick={random} data-stick>
                ⚄ {b.random}
              </button>
            </div>
          </div>

          <p className={styles.count} aria-live="polite">
            {b.results(shown.length)}
          </p>

          {shown.length === 0 && <p className={styles.empty}>{b.empty}</p>}

          {view === "cards" ? (
            <ul className={styles.grid}>
              {shown.map((p) => (
                <li key={p.slug} data-post data-flip-id={p.slug}>
                  <TLink href={p.href} className={styles.card} data-cursor={t.cursor.open}>
                    <TitleArt title={p.title} slug={p.slug} category={p.category} color={p.color} />
                    <span className={styles.cMeta}>
                      {CATEGORY_LABELS[lang][p.category]} · {b.minutes(p.minutes)}
                      {p.fallback && <em>{b.onlyEs}</em>}
                    </span>
                    <span className={styles.cTitle}>{p.title}</span>
                    <span className={styles.cDesc}>{p.description}</span>
                    <span className={styles.cTags}>
                      {p.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </span>
                  </TLink>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.term}>
              <div className={styles.termBar}>
                <span className="dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>~/kytcode/blog</span>
              </div>
              <p className={styles.termCmd}>
                <span>$</span> ls -la blog/{cat !== "all" ? `${cat}/` : ""}
                {q ? ` | grep "${q}"` : ""}
              </p>
              <ul className={styles.termList}>
                {shown.map((p) => (
                  <li key={p.slug} data-post data-flip-id={p.slug}>
                    <TLink href={p.href} className={styles.termRow}>
                      <span className={styles.perm}>-rw-r--r--</span>
                      <span className={styles.min}>{String(p.minutes).padStart(2, " ")}m</span>
                      <span className={styles.date}>{p.date}</span>
                      <span className={styles.file} data-c={p.color}>
                        {p.slug}.md
                      </span>
                      <span className={styles.ttl}># {p.title}</span>
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
