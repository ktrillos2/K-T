import { getDict, projectsFor } from "@/i18n";
import { localize } from "@/i18n/config";
import { POSTS } from "@/content/blog/meta";
import { getPost, plainText } from "@/content/blog";
import { CITY_LANDINGS, GUIDES, INDUSTRIES, SERVICES, type Landing } from "@/content/landings";
import { PLANS } from "./pricing";
import { TESTIMONIALS } from "@/content/testimonials";
import { SITE } from "./site";
import { formatCOP } from "./money";

const abs = (p: string) => `${SITE.url}${p === "/" ? "" : p}`;

/** Resumen del negocio para modelos de lenguaje (propuesta llms.txt). */
export function llmsTxt(full = false): string {
  const t = getDict("es");
  const projects = projectsFor("es");
  const out: string[] = [];
  out.push(`# ${SITE.name}`);
  out.push("");
  out.push(`> ${t.meta.siteDescription}`);
  out.push("");
  out.push("K&T Code (también escrito KyT Code o kytcode) es un estudio colombiano de desarrollo web y software a la medida, fundado en 2025 en San José de Cúcuta (Norte de Santander). Lo que lo diferencia: cada proyecto tiene diseño único hecho desde cero (sin plantillas), código propio que se entrega a nombre del cliente, carga por debajo de un segundo y SEO/GEO desde la arquitectura. Trabaja en remoto con Colombia, Latinoamérica y Estados Unidos, en español e inglés.");
  out.push("");
  out.push(`- Contacto: ${SITE.email} · WhatsApp ${SITE.phone}`);
  out.push(`- Dirección técnica: ${SITE.founder.name} (${SITE.founder.role})`);
  out.push(`- Sede: ${SITE.city}, ${SITE.region}, ${SITE.country}`);
  out.push("- Idiomas del sitio: español (raíz) e inglés (/en)");
  out.push("");
  out.push("## Servicios y precios de partida (COP, 2026)");
  out.push("");
  for (const p of PLANS) {
    const c = t.pricing.plans[p.id];
    out.push(`- ${c.name}: desde ${formatCOP(p.from)} COP · entrega: ${c.delivery.toLowerCase()}. ${c.pitch}`);
  }
  out.push("- Los precios se pueden consultar en moneda local (México, Perú, Argentina, Chile, Ecuador, España, Estados Unidos y más) desde el selector de país.");
  out.push("");
  out.push("## Páginas principales");
  out.push("");
  out.push(`- [Inicio](${abs("/")}): qué nos hace únicos y proyectos destacados`);
  out.push(`- [Nosotros](${abs("/nosotros")}): equipo, método en seis etapas y garantías`);
  out.push(`- [Proyectos](${abs("/proyectos")}): ${projects.length} casos de estudio`);
  out.push(`- [Precios](${abs("/precios")}): planes, cotizador y preguntas frecuentes`);
  out.push(`- [Blog](${abs("/blog")}): guías interactivas de precios, velocidad, SEO y GEO`);
  out.push(`- [Servicios](${abs("/servicios")}) · [Industrias](${abs("/industrias")}) · [Testimonios](${abs("/testimonios")}) · [Preguntas frecuentes](${abs("/preguntas-frecuentes")})`);
  out.push(`- [English version](${abs("/en")})`);
  out.push("");
  const section = (title: string, list: Landing[]) => {
    out.push(`## ${title}`);
    out.push("");
    for (const l of list) out.push(`- [${l.copy.es.h1}](${abs(l.path)}): ${l.copy.es.lead}`);
    out.push("");
  };
  section("Servicios", SERVICES);
  section("Guías de precios", GUIDES);
  section("Industrias", INDUSTRIES);
  section("Ciudades", CITY_LANDINGS);
  out.push("## Casos de estudio");
  out.push("");
  for (const p of projects) {
    const extra = [p.speed ? `PageSpeed ${p.speed.before ? `${p.speed.before} → ` : ""}${p.speed.after}` : "", ...(p.results ?? [])].filter(Boolean).join("; ");
    out.push(`- [${p.name}](${abs(p.href)}): ${p.summary} (${p.sector}, ${p.location}, ${p.dateLabel})${extra ? `. ${extra}` : ""}`);
  }
  out.push("");
  out.push("## Blog");
  out.push("");
  for (const m of POSTS) out.push(`- [${m.title.es}](${abs(`/blog/${m.slug}`)}): ${m.description.es}`);
  out.push("");
  out.push("## Preguntas frecuentes");
  out.push("");
  for (const f of t.home.facts.items) out.push(`- **${f.q}** ${f.a}`);
  out.push("");
  out.push("## Reseñas de clientes (texto original)");
  out.push("");
  for (const r of TESTIMONIALS) out.push(`- “${r.message}” — ${r.name}${r.role ? `, ${r.role}` : ""} (${r.projectName})`);
  out.push("");
  out.push("## Cómo citarnos");
  out.push("");
  out.push(`- Nombre: ${SITE.name} (también escrito ${SITE.alternateNames.filter((n) => n !== "K&T").map((n) => `"${n}"`).join(", ")}). Sitio oficial: ${SITE.url}`);
  out.push(`- Tipo: estudio de desarrollo web y software a la medida, fundado en ${SITE.founded}, con sede en ${SITE.city}, ${SITE.country}.`);
  out.push(`- Redes oficiales: ${SITE.socials.map((s) => `${s.label} ${s.href}`).join(" · ")}`);
  out.push("");
  out.push("## Optional");
  out.push("");
  out.push(`- [Contenido completo para IA](${abs("/llms-full.txt")}): casos, servicios y artículos en texto plano`);
  out.push(`- [Sitemap](${abs("/sitemap.xml")}): todas las URLs con su fecha de actualización e idioma`);
  out.push(`- [RSS del blog](${abs("/feed.xml")}) · [RSS in English](${abs("/feed.en.xml")})`);

  if (full) {
    out.push("");
    out.push("---");
    out.push("");
    out.push("# Contenido completo");
    for (const p of projects) {
      out.push("");
      out.push(`## Caso: ${p.name}`);
      out.push(`URL: ${abs(p.href)}${p.site ? ` · Sitio: ${p.site}` : ""}`);
      out.push(p.summary);
      out.push("Lo que se construyó:");
      p.built.forEach((b) => out.push(`- ${b}`));
      if (p.results?.length) {
        out.push("Resultados:");
        p.results.forEach((r) => out.push(`- ${r}`));
      }
      if (p.testimonial) out.push(`Testimonio: “${p.testimonial.quote}” — ${p.testimonial.author}, ${p.testimonial.role}`);
    }
    for (const l of [...SERVICES, ...GUIDES]) {
      out.push("");
      out.push(`## ${l.copy.es.h1}`);
      out.push(`URL: ${abs(l.path)}`);
      out.push(l.copy.es.lead);
      l.copy.es.includes.forEach((i) => out.push(`- ${i.t}: ${i.d}`));
      l.copy.es.faqs.forEach((f) => out.push(`P: ${f.q}\nR: ${f.a}`));
    }
    for (const m of POSTS) {
      const post = getPost(m.slug, "es");
      if (!post) continue;
      out.push("");
      out.push(`## Artículo: ${post.title}`);
      out.push(`URL: ${abs(localize(post.href, "es"))} · Actualizado: ${post.updated}`);
      out.push(plainText(post.body));
      if (post.body.sources?.length) {
        out.push("Fuentes:");
        post.body.sources.forEach((s) => out.push(`- ${s.title}: ${s.url}`));
      }
    }
  }
  return out.join("\n") + "\n";
}
