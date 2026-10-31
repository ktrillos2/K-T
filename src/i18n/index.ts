import es, { type Dict } from "./dictionaries/es";
import en from "./dictionaries/en";
import { PROJECTS_EN } from "./projects.en";
import { TESTIMONIALS } from "@/content/testimonials";
import { localizeTestimonial } from "./testimonials.en";
import { PROJECTS, type ProjectView } from "@/lib/projects";
import type { Lang } from "./config";

export type { Dict };
export const getDict = (lang: Lang): Dict => (lang === "en" ? en : es);

/** Proyecto con sus textos en el idioma pedido (el inglés cae al español si falta). */
const COUNTRY_EN: Record<string, string> = { Colombia: "Colombia", México: "Mexico", Perú: "Peru" };

/** Fecha "YYYY-MM" como "mes año" en el idioma pedido. */
export const monthLabel = (yyyyMm: string, lang: Lang, long = false) =>
  new Date(`${yyyyMm}-15T12:00:00Z`).toLocaleDateString(lang === "en" ? "en-US" : "es-CO", { month: long ? "long" : "short", year: "numeric", timeZone: "UTC" }).replace(".", "");

export function localizeProject(p: ProjectView, lang: Lang): ProjectView {
  if (lang !== "en") return p;
  const t = PROJECTS_EN[p.slug];
  const country = COUNTRY_EN[p.country] ?? p.country;
  const review = TESTIMONIALS.find((r) => r.project === p.slug);
  const tr = review ? localizeTestimonial(review, "en") : undefined;
  const testimonial = tr && p.testimonial ? { ...p.testimonial, quote: tr.message, role: tr.role ?? p.testimonial.role } : p.testimonial;
  const base = { ...p, country, testimonial, location: [p.city, country].filter(Boolean).join(", "), dateLabel: monthLabel(p.date, "en") };
  if (!t) return base;
  return { ...base, sector: t.sector, summary: t.summary, built: t.built, tags: t.tags, results: t.results ?? p.results };
}

export const projectsFor = (lang: Lang) => PROJECTS.map((p) => localizeProject(p, lang));
