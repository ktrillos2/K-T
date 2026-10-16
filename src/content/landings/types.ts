import type { Lang } from "@/i18n/config";
import type { PlanId } from "@/lib/pricing";

export type LandingKind = "servicio" | "industria" | "ciudad" | "guia";

export type LandingCopy = {
  /** Título para buscadores (sin la marca). */
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  /** Respuesta directa en las primeras líneas: lo que un buscador o una IA debe poder citar. */
  lead: string;
  /** Datos rápidos (etiqueta, valor). */
  facts: [string, string][];
  includesTitle: string;
  includes: { t: string; d: string }[];
  forWhoTitle: string;
  forWho: string[];
  /** Contenido largo opcional en markdown (tablas, comparativas, guías de precio). */
  body?: string;
  faqs: { q: string; a: string }[];
  /** Palabras clave para datos estructurados. */
  keywords: string[];
};

export type Landing = {
  kind: LandingKind;
  slug: string;
  /** Ruta pública sin idioma. */
  path: string;
  color: "red" | "yellow" | "green";
  plan?: PlanId;
  /** Nombre del servicio para schema.org (en español). */
  serviceType?: string;
  projects: string[];
  posts: string[];
  related: string[];
  city?: { name: string; region: string; lat: number; lng: number };
  copy: Partial<Record<Lang, LandingCopy>> & { es: LandingCopy };
};
