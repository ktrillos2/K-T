import { TESTIMONIALS, type Testimonial } from "@/content/testimonials";
import type { Lang } from "./config";

/** Traducción al inglés de las reseñas (el original en español está en src/content/testimonials.ts). */
const EN: Record<string, { message: string; role: string }> = {
  "telas-real-stefanny-robayo": { role: "E-commerce Coordinator", message: "Their work is excellent, on time with deliveries, and a plus: anything you imagine for your website, K&T makes it possible. The experience has been very good. Thank you for supporting our digital growth." },
  "casa-medina-gonzalo-medina": { role: "Manager", message: "Totally satisfied, they exceeded all my expectations. Completely happy with my site. Their after-sales service has also been very efficient. 100% recommended." },
  "brambila-inmobiliaria-gerardo": { role: "Owner", message: "Excellent service, very happy with the great work they do, and always attentive to my questions." },
  "occ-partes-diego-gonzalez": { role: "Sales Director", message: "The implementation process was very dynamic, K&T's design proposal was spot on and they're very responsive to changes. We recommend them." },
  "estrella-de-david-ruby-mendoza": { role: "Communications Lead", message: "Very satisfied with the attention and service. They pay close attention to detail, are always available for any question or request, and are very efficient. Highly recommended." },
  "brahneyker-stella": { role: "Salon owner", message: "I'm happy with the product because I can now manage my inventory and have a website where people can find my business." },
  "gmx-gaming-equipo-directivo": { role: "Operations — GMX Gaming", message: "We came from a limited WordPress site that slowed everything down and forced us to run tournaments by hand. With K&T we built a custom platform: ultra-fast, with an immersive design and 100% automated registration." },
  "san-roque-marcela-gomez": { role: "Administrative Manager — San Roque Salud", message: "They built the medical portal and appointment system with a flawless Figma design and a fast, secure architecture. Our patients book appointments in seconds from their phones." },
  "cxellence-group-andres-restrepo": { role: "CEO & Co-Founder — CXellence Group", message: "K&T Code built our corporate website with semantic SEO from the ground up. Within a few weeks we started getting qualified B2B leads in Bogotá and Medellín." },
  "nosky-group-santiago-silva": { role: "CTO — Noskygroup", message: "Code delivery was on time, with rigorous architecture standards and a private repository that's 100% ours. Easily the best technical agency we've worked with in Colombia." },
  "psicowork-laura-martinez": { role: "Talent & Wellbeing Director — Psicowork", message: "We wanted an intuitive platform for companies and employees. K&T designed a modern interface with a user experience our corporate clients praise every day." },
};

export const TRANSLATED_NOTE = "translated from Spanish";

/** Reseña en el idioma pedido; en inglés indica que es una traducción del original. */
export function localizeTestimonial(t: Testimonial, lang: Lang): Testimonial {
  if (lang !== "en") return t;
  // Las reseñas que llegan aprobadas desde Sanity traen otro id: se reconocen por nombre y proyecto.
  const same = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();
  const id = EN[t.id] ? t.id : TESTIMONIALS.find((f) => same(f.name, t.name) && (f.project === t.project || !t.project || same(f.projectName, t.projectName)))?.id;
  const en = id ? EN[id] : undefined;
  return en ? { ...t, message: en.message, role: `${en.role} · ${TRANSLATED_NOTE}` } : t;
}
