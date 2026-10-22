"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SITE } from "@/lib/site";
import { cx, vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { CATEGORY_LABELS, formatDate, postsFor } from "@/content/blog/meta";
import type { PostBody, PostCard } from "@/content/blog/types";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { TLink } from "@/components/transition/TLink";
import { ArticleBody } from "./ArticleBody";
import { TitleArt } from "./TitleArt";
import styles from "./Article.module.css";

type Props = { post: PostCard & { body: PostBody }; words: number; plain: string };

const SIZES = [15, 16.5, 18, 20];

export function ArticleView({ post, words, plain }: Props) {
  const { t, lang, href } = useI18n();
  const a = t.blog.article;
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState(1);
  const [active, setActive] = useState<string | null>(null);
  const [left, setLeft] = useState(post.minutes);
  const [speaking, setSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [vote, setVote] = useState<"yes" | "no" | null>(null);

  const toc = useMemo(() => post.body.blocks.filter((b): b is Extract<typeof b, { type: "h2" }> => b.type === "h2"), [post.body.blocks]);
  const related = useMemo(() => {
    const all = postsFor(lang).filter((p) => p.slug !== post.slug);
    return [...all.filter((p) => p.category === post.category), ...all.filter((p) => p.category !== post.category)].slice(0, 3);
  }, [lang, post.slug, post.category]);

  // Preferencias guardadas
  useEffect(() => {
    try {
      const s = Number(localStorage.getItem("kt-fs"));
      if (s >= 0 && s < SIZES.length) setSize(s);
      const v = localStorage.getItem(`kt-vote-${post.slug}`);
      if (v === "yes" || v === "no") setVote(v);
    } catch {
      /* sin almacenamiento */
    }
  }, [post.slug]);

  // Progreso de lectura y minutos restantes
  useEffect(() => {
    const el = root.current?.querySelector<HTMLElement>("[data-prose]");
    if (!el) return;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const m = Math.max(0, Math.ceil(post.minutes * (1 - p)));
      setLeft((x) => (x === m ? x : m));
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [post.minutes]);

  // Índice con scrollspy
  useEffect(() => {
    const hs = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-toc]") ?? []);
    if (!hs.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((x, y) => x.boundingClientRect.top - y.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    hs.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [post.slug]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const changeSize = (d: number) => {
    const n = Math.max(0, Math.min(SIZES.length - 1, size + d));
    setSize(n);
    try {
      localStorage.setItem("kt-fs", String(n));
    } catch {
      /* sin almacenamiento */
    }
  };

  const listen = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(`${post.title}. ${plain}`);
    u.lang = post.lang === "en" ? "en-US" : "es-CO";
    u.rate = 1.02;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    synth.cancel();
    synth.speak(u);
    setSpeaking(true);
  };

  const [url, setUrl] = useState(`${SITE.url}${href(post.href)}`);
  useEffect(() => setUrl(window.location.href.split("#")[0]), [post.slug]);
  const share = [
    { k: "WhatsApp", u: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}` },
    { k: "LinkedIn", u: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { k: "X", u: `https://x.com/intent/post?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}` },
  ];
  const copy = () => {
    navigator.clipboard
      ?.writeText(url)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  };
  const castVote = (v: "yes" | "no") => {
    setVote(v);
    try {
      localStorage.setItem(`kt-vote-${post.slug}`, v);
    } catch {
      /* sin almacenamiento */
    }
  };

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    import("@/lib/lenis").then(({ scrollToEl }) => scrollToEl(el));
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <article ref={root} className={styles.article} style={vars({ "--fs": `${SIZES[size]}px` })} aria-labelledby="h-post">
      <span ref={bar} className={styles.progress} aria-hidden="true" />

      <header className={cx("wrap", styles.header)} data-hero="">
        <nav className={styles.crumbs} aria-label="breadcrumb">
          <TLink href="/">{t.nav.home}</TLink> <span aria-hidden="true">/</span> <TLink href="/blog">{t.nav.blog}</TLink> <span aria-hidden="true">/</span>{" "}
          <span>{CATEGORY_LABELS[lang][post.category]}</span>
        </nav>
        <div className={styles.headGrid}>
          <div className={styles.headCopy}>
            <p className={styles.kicker}>
              <span data-c={post.color} />
              {CATEGORY_LABELS[lang][post.category]}
              {post.interactive && <em>{t.blog.interactive}</em>}
            </p>
            <SplitTitle as="h1" id="h-post" mode="enter" className={styles.title} tabIndex={-1}>
              {post.title}
            </SplitTitle>
            <Reveal mode="enter" delay={0.3}>
              <p className={styles.desc}>{post.description}</p>
            </Reveal>
            <Reveal mode="enter" delay={0.45} className={styles.byline}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SITE.founder.photo} alt="" width={40} height={40} className={styles.author} />
              <span>
                {a.by} <strong>{SITE.founder.name}</strong>
                <br />
                <time dateTime={post.date}>{formatDate(post.date, lang)}</time> · {a.updated} <time dateTime={post.updated}>{formatDate(post.updated, lang)}</time>
              </span>
              <span className={styles.metaChip}>{t.blog.minutes(post.minutes)}</span>
              <span className={styles.metaChip}>{a.words(words)}</span>
            </Reveal>
            {post.fallback && <p className={styles.onlyEs}>{a.onlySpanish}</p>}
          </div>
          <Reveal mode="enter" delay={0.2} className={styles.cover}>
            <TitleArt title={post.title} slug={post.slug} category={post.category} color={post.color} size="lg" />
          </Reveal>
        </div>
      </header>

      <div className={cx("wrap", styles.layout)}>
        <aside className={styles.side} aria-label={a.toc}>
          <div className={styles.sideInner}>
            <p className={styles.sideTitle}>{a.toc}</p>
            <ol className={styles.toc}>
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} onClick={goTo(h.id)} aria-current={active === h.id ? "location" : undefined}>
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
            <p className={styles.left}>{a.minutesLeft(left)}</p>
            <div className={styles.tools}>
              <div className={styles.sizer} role="group" aria-label={a.fontSize}>
                <button type="button" onClick={() => changeSize(-1)} disabled={size === 0} aria-label={`${a.fontSize} −`}>
                  A−
                </button>
                <button type="button" onClick={() => changeSize(1)} disabled={size === SIZES.length - 1} aria-label={`${a.fontSize} +`}>
                  A+
                </button>
              </div>
              <button type="button" className={styles.tool} onClick={listen} aria-pressed={speaking}>
                {speaking ? `■ ${a.stop}` : `▶ ${a.listen}`}
              </button>
            </div>
            <p className={styles.sideTitle}>{a.share}</p>
            <div className={styles.share}>
              <button type="button" className={styles.tool} onClick={copy}>
                {copied ? a.copied : a.copyLink}
              </button>
              {share.map((s) => (
                <a key={s.k} className={styles.tool} href={s.u} target="_blank" rel="noopener noreferrer">
                  {s.k}
                </a>
              ))}
            </div>
          </div>
        </aside>

        <div className={styles.main}>
          <section className={styles.tldr} aria-label={a.tldr} data-tldr>
            <p className={styles.tldrTitle}>{a.tldr}</p>
            <ul>
              {post.body.tldr.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>

          <div className={styles.prose} data-prose>
            <ArticleBody blocks={post.body.blocks} />
          </div>

          {post.body.faq?.length ? (
            <section className={styles.faq} aria-labelledby="h-post-faq">
              <h2 id="h-post-faq">{a.faq}</h2>
              {post.body.faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>
          ) : null}

          {post.body.sources?.length ? (
            <section className={styles.sources} aria-labelledby="h-post-sources">
              <h2 id="h-post-sources">{a.sources}</h2>
              <ol>
                {post.body.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <div className={styles.helpful}>
            {vote ? (
              <p>{a.thanks}</p>
            ) : (
              <>
                <p>{a.helpful}</p>
                <button type="button" onClick={() => castVote("yes")}>
                  👍 {a.yes}
                </button>
                <button type="button" onClick={() => castVote("no")}>
                  👎 {a.no}
                </button>
              </>
            )}
          </div>

          <div className={styles.cta}>
            <p className="display">{a.ctaTitle}</p>
            <p>{a.ctaText}</p>
            <TLink href="#contacto" className="btn btn--solid" data-stick>
              {a.cta} <span className="arr">→</span>
            </TLink>
          </div>
        </div>
      </div>

      <section className={cx("wrap", styles.related)} aria-labelledby="h-related">
        <h2 id="h-related" className="display">
          {a.related}
        </h2>
        <ul>
          {related.map((p) => (
            <li key={p.slug}>
              <TLink href={p.href} className={styles.relCard} data-cursor={t.cursor.open}>
                <TitleArt title={p.title} slug={p.slug} category={p.category} color={p.color} size="sm" />
                <span className={styles.relCat}>{CATEGORY_LABELS[lang][p.category]}</span>
                <span className={styles.relTitle}>{p.title}</span>
                <span className={styles.relMeta}>{t.blog.minutes(p.minutes)}</span>
              </TLink>
            </li>
          ))}
        </ul>
        <TLink href="/blog" className={styles.back}>
          ← {a.back}
        </TLink>
      </section>
    </article>
  );
}
