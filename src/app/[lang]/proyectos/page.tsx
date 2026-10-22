import type { Metadata } from "next";
import { getDict, projectsFor } from "@/i18n";
import { langOf, type LangParams } from "@/i18n/server";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph, itemList } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { ProjectIndex } from "@/components/projects/ProjectIndex";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = getDict(lang);
  return pageMeta({ lang, path: "/proyectos", title: t.meta.projects.title, description: t.meta.projects.description });
}

export default async function ProjectsPage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = getDict(lang);
  return (
    <>
      <ProjectsHero />
      <ProjectIndex />
      <JsonLd data={graph(breadcrumbs(lang, [{ name: t.nav.projects, path: "/proyectos" }]), itemList(lang, projectsFor(lang)))} />
    </>
  );
}
