import { TESTIMONIALS, type Testimonial } from "@/content/testimonials";
import { PROJECTS } from "./projects";

/**
 * Reseñas publicadas = las fijas de src/content/testimonials.ts + las aprobadas en Sanity.
 *
 * El formulario de /testimonios crea documentos "testimonial" con status "pending" en el mismo
 * proyecto de Sanity que usaba el sitio anterior. Cuando los cambias a "approved" en Sanity Studio,
 * aparecen aquí solas (la página se regenera como máximo cada hora).
 */
export const SANITY_PROJECT = process.env.SANITY_PROJECT_ID || "bc3zxc91";
export const SANITY_DATASET = process.env.SANITY_DATASET || "production";
export const SANITY_API = `https://${SANITY_PROJECT}.api.sanity.io/v2021-10-21/data`;

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Proyecto del portafolio a partir del nombre que llega de Sanity (p. ej. "Salón de Belleza Brahneyker"). */
export function projectSlugFor(name: string): string {
  const n = norm(name);
  if (!n) return "";
  const exact = PROJECTS.find((p) => norm(p.name) === n || p.slug === n.replace(/ /g, "-"));
  if (exact) return exact.slug;
  const loose = PROJECTS.find((p) => {
    const pn = norm(p.name);
    return n.includes(pn) || pn.includes(n);
  });
  return loose?.slug ?? "";
}

type SanityDoc = {
  _id: string;
  _createdAt: string;
  name?: string;
  role?: string;
  project?: string;
  content?: string;
  rating?: number;
  avatar?: string;
};

async function approvedFromSanity(): Promise<Testimonial[]> {
  const query = encodeURIComponent(
    '*[_type == "testimonial" && status == "approved"] | order(_createdAt desc){_id,_createdAt,name,role,project,content,rating,"avatar": avatar.asset->url}'
  );
  try {
    const res = await fetch(`${SANITY_API}/query/${SANITY_DATASET}?query=${query}`, {
      next: { revalidate: 3600, tags: ["testimonials"] },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { result?: SanityDoc[] };
    return (json.result ?? [])
      .filter((d) => d.name?.trim() && d.content?.trim())
      .map((d) => ({
        id: `sanity-${d._id}`,
        project: projectSlugFor(d.project ?? ""),
        projectName: (d.project ?? "").trim(),
        name: d.name!.trim(),
        role: d.role?.trim() || undefined,
        message: d.content!.trim(),
        date: d._createdAt?.slice(0, 10),
        rating: typeof d.rating === "number" ? d.rating : 5,
        avatar: d.avatar ? `${d.avatar.split("?")[0]}?auto=format&fit=crop&w=160&h=160&q=82` : undefined,
        source: "sanity" as const,
      }));
  } catch {
    return [];
  }
}

/** Todas las reseñas publicadas (sin duplicados). Si Sanity no responde, quedan las fijas. */
export async function getTestimonials(): Promise<Testimonial[]> {
  const extra = await approvedFromSanity();
  const key = (t: Testimonial) => `${norm(t.name)}|${t.project || norm(t.projectName)}`;
  const seen = new Set(TESTIMONIALS.map(key));
  const fresh = extra.filter((t) => {
    const k = key(t);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  // Las nuevas primero: así la última reseña aprobada es la que se ve al entrar.
  return [...fresh, ...TESTIMONIALS];
}
