"use client";

import { useMemo, useRef } from "react";
import { COLOR_VAR } from "@/lib/routes";
import { initialsOf } from "@/lib/projects";
import { vars } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsFor } from "@/i18n";
import { useSceneDim } from "@/hooks/useSceneDim";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { Stage3D } from "@/components/three/Stage3D";
import { TLink } from "@/components/transition/TLink";
import { Reviews, reviewItems } from "@/components/home/Reviews";
import { ReviewForm } from "./ReviewForm";
import { TESTIMONIALS, type Testimonial } from "@/content/testimonials";
import styles from "./Testimonials.module.css";

/** Página de testimonios: el mazo interactivo y el muro completo de reseñas, cada una enlazada a su caso. */
export function Testimonials({ reviews = TESTIMONIALS }: { reviews?: Testimonial[] }) {
  const { t, lang } = useI18n();
  const c = t.landing.testimonials;
  const items = useMemo(() => reviewItems(reviews, projectsFor(lang)), [reviews, lang]);
  const wall = useRef<HTMLDivElement>(null);
  useSceneDim(wall, 0.92);
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
      <div ref={wall} className={styles.body}>
        <Reviews path={c.eyebrow} title={t.home.reviews.title} lead={t.home.reviews.lead} reviews={reviews} />
        <div className="wrap">
          <Reveal as="ul" stagger={0.05} className={styles.wall}>
            {items.map((p) => (
              <li key={p.slug} className={styles.item} style={vars({ "--c": COLOR_VAR[p.color] })}>
                <figure>
                  <div className={styles.stars} aria-label={`${p.testimonial!.rating || 5}/5`}>
                    {"★".repeat(p.testimonial!.rating || 5)}
                  </div>
                  <blockquote>
                    <p>“{p.testimonial!.quote}”</p>
                  </blockquote>
                  <figcaption>
                    <span className={styles.avatar}>
                      {p.testimonial!.avatar ? (
                        <img
                          src={p.testimonial!.avatar}
                          alt={p.testimonial!.author}
                          width={36}
                          height={36}
                          style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                        />
                      ) : (
                        initialsOf(p.testimonial!.author)
                      )}
                    </span>
                    <span>
                      <strong>{p.testimonial!.author}</strong>
                      <span>{p.testimonial!.role}</span>
                    </span>
                  </figcaption>
                </figure>
                {p.href ? (
                  <TLink href={p.href} className={styles.link}>
                    {t.home.reviews.seeProject}: {p.name} →
                  </TLink>
                ) : (
                  <span className={styles.link}>{p.name}</span>
                )}
              </li>
            ))}
          </Reveal>
        </div>
        <ReviewForm />
      </div>
    </>
  );
}
