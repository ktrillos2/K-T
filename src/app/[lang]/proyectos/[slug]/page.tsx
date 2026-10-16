import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, localizeProject } from "@/i18n";
import { isLang, type Lang } from "@/i18n/config";
import { getProject, PROJECTS } from "@/lib/projects";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph, projectWork } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CaseStudy } from "@/components/projects/CaseStudy";

type Params = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

async function resolve(params: Params["params"]) {
  const { lang: raw, slug } = await params;
  const lang: Lang = isLang(raw) ? raw : "es";
  const base = getProject(slug);
  return { lang, project: base ? localizeProject(base, lang) : undefined };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, project: p } = await resolve(params);
  if (!p) return {};
  const t = getDict(lang);
  const category = t.projects.category[p.category];
  return pageMeta({
    lang,
    path: p.href,
    title: lang === "en" ? `${p.name}: ${category} case study` : `${p.name}: caso de estudio de ${category.toLowerCase()}`,
    description: `${p.summary} ${p.location ? `${p.location}. ` : ""}${t.projects.detail.built}: ${p.built.slice(0, 2).join(", ").toLowerCase()}.`,
    // Imagen social: captura propia o portada del portafolio (con w=1200 para Open Graph)
    image: p.hasShot ? p.shot : p.cover ? p.cover.replace(/w=\d+/, "w=1200") : undefined,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { lang, project: p } = await resolve(params);
  if (!p) notFound();
  const t = getDict(lang);
  return (
    <>
      <CaseStudy slug={p.slug} />
      <JsonLd
        data={graph(
          breadcrumbs(lang, [
            { name: t.nav.projects, path: "/proyectos" },
            { name: p.name, path: p.href },
          ]),
          projectWork(p, lang, !!p.image),
        )}
      />
    </>
  );
}
