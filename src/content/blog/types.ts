import type { Lang } from "@/i18n/config";

export type BlogCategory = "precios" | "desarrollo-web" | "seo-geo" | "ia" | "ecommerce" | "software" | "comparativas" | "estrategia";

export type WidgetName = "price-calculator" | "speed-simulator" | "template-vs-custom" | "quiz" | "checklist";

/**
 * Bloques de contenido de un artículo. El texto admite un markdown mínimo en línea:
 * **negrita**, *cursiva*, `código` y [enlace](url). Los enlaces internos empiezan con "/".
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; tone: "info" | "tip" | "warn"; title?: string; text: string }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "stat"; value: string; label: string; source?: string }
  | { type: "widget"; name: "price-calculator" | "speed-simulator" | "template-vs-custom" }
  | { type: "widget"; name: "quiz"; questions: { q: string; options: string[]; answer: number; why: string }[] }
  | { type: "widget"; name: "checklist"; id: string; title: string; items: string[] };

export type PostBody = {
  /** Resumen en viñetas al inicio: lo que un lector (o un motor de IA) debe llevarse. */
  tldr: string[];
  blocks: Block[];
  faq?: { q: string; a: string }[];
  sources?: { title: string; url: string }[];
};

export type PostMeta = {
  slug: string;
  category: BlogCategory;
  /** ISO yyyy-mm-dd */
  date: string;
  updated: string;
  minutes: number;
  interactive: boolean;
  featured?: boolean;
  /** Color de la portada pixel. */
  color: "red" | "yellow" | "green";
  /** Idiomas disponibles. */
  langs: Lang[];
  title: Partial<Record<Lang, string>> & { es: string };
  description: Partial<Record<Lang, string>> & { es: string };
  tags: Partial<Record<Lang, string[]>> & { es: string[] };
};

/** Metadatos ya resueltos en un idioma. */
export type PostCard = Omit<PostMeta, "title" | "description" | "tags"> & {
  title: string;
  description: string;
  tags: string[];
  href: string;
  lang: Lang;
  /** true si el artículo no existe en el idioma pedido y se muestra en español. */
  fallback: boolean;
};
