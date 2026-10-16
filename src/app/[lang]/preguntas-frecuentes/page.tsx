import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { langOf, type LangParams } from "@/i18n/server";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, faqPage, graph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqPage, type FaqGroup } from "@/components/landing/FaqPage";

const EXTRA = {
  es: {
    process: [
      { q: "¿Cómo es el proceso de trabajo?", a: "Seis etapas: descubrimiento, diseño, arquitectura, desarrollo, calidad y lanzamiento. En cada una ves avances en línea y das tu aprobación antes de seguir." },
      { q: "¿Qué necesito para empezar?", a: "Tu logo, los textos o la información de tu negocio, fotos si las tienes y claridad sobre el objetivo de la web. Si no tienes textos, te ayudamos a construirlos." },
      { q: "¿Hacen reuniones presenciales?", a: "En Cúcuta sí. Con el resto del país y el exterior trabajamos por videollamada." },
    ],
    tech: [
      { q: "¿Mi web aparecerá en Google?", a: "Entregamos cada sitio con SEO técnico: datos estructurados, sitemap, Search Console y velocidad medida. El posicionamiento sólido suele tomar de 3 a 6 meses según la competencia." },
      { q: "¿Y en ChatGPT o Gemini?", a: "Preparamos el sitio para GEO: acceso para rastreadores de IA, llms.txt, datos estructurados y respuestas citables. Ninguna empresa puede garantizar que una IA te cite, pero sí dejar tu sitio en las mejores condiciones." },
      { q: "¿Qué tan rápida será mi web?", a: "Nuestros proyectos suelen cargar el contenido principal en menos de un segundo y obtener puntajes de velocidad de 95 a 100 en móvil." },
    ],
  },
  en: {
    process: [
      { q: "What is the work process like?", a: "Six stages: discovery, design, architecture, development, quality and launch. At each one you see progress online and approve before moving on." },
      { q: "What do I need to start?", a: "Your logo, copy or business information, photos if you have them and a clear goal for the site. If you don't have copy, we help you write it." },
      { q: "Do you hold in-person meetings?", a: "In Cúcuta, yes. With the rest of Colombia and abroad we work by video call." },
    ],
    tech: [
      { q: "Will my site show up on Google?", a: "Every site ships with technical SEO: structured data, sitemap, Search Console and measured speed. Solid rankings usually take 3 to 6 months depending on competition." },
      { q: "And in ChatGPT or Gemini?", a: "We prepare the site for GEO: access for AI crawlers, llms.txt, structured data and citable answers. No one can guarantee an AI will cite you, but we leave your site in the best shape for it." },
      { q: "How fast will my website be?", a: "Our projects usually load their main content in under a second and score 95 to 100 for speed on mobile." },
    ],
  },
};

function groupsFor(lang: "es" | "en"): FaqGroup[] {
  const t = getDict(lang);
  const g = t.landing.faqPage.groups;
  return [
    { id: "general", title: g.general, items: t.home.facts.items },
    { id: "pricing", title: g.pricing, items: t.pricing.faq.items },
    { id: "process", title: g.process, items: EXTRA[lang].process },
    { id: "tech", title: g.tech, items: EXTRA[lang].tech },
  ];
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const c = getDict(lang).landing.faqPage;
  return pageMeta({ lang, path: "/preguntas-frecuentes", title: c.title, description: c.description });
}

export default async function FaqRoute({ params }: LangParams) {
  const lang = await langOf(params);
  const c = getDict(lang).landing.faqPage;
  const groups = groupsFor(lang);
  return (
    <>
      <FaqPage groups={groups} />
      <JsonLd data={graph(breadcrumbs(lang, [{ name: c.h1, path: "/preguntas-frecuentes" }]), faqPage(groups.flatMap((g) => g.items)))} />
    </>
  );
}
