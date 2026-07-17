import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ProjectClientView from "@/components/project-client-view"
import JsonLd from "@/components/seo/json-ld"
import { projects as staticProjects, type Project } from "@/lib/projects"
import { buildBreadcrumbJsonLd } from "@/lib/seo"
import { absoluteUrl, siteConfig } from "@/lib/site-config"
import { getAllProjects, getProjectBySlug } from "@/sanity/lib/queries"

function mapSanityProjectToClientProject(sanityProject: any): Project {
  return {
    id: sanityProject._id || sanityProject.slug,
    slug: sanityProject.slug,
    title: sanityProject.title,
    description: sanityProject.description || "",
    shortDescription: sanityProject.shortDescription || "",
    year: sanityProject.year || "",
    month: sanityProject.month || "",
    category: sanityProject.category || "",
    tech: sanityProject.tech || [],
    images: {
      hero: sanityProject.hero || "",
      mobile: sanityProject.mobile || sanityProject.hero || "",
      gallery: [],
    },
    liveUrl: sanityProject.liveUrl || "",
    content: {
      challenge: sanityProject.challenge || "",
      solution: sanityProject.solution || "",
      seoFocus: sanityProject.seoFocus || "",
    },
  }
}

async function findProject(slug: string) {
  try {
    const sanityProject = await getProjectBySlug(slug)
    if (sanityProject) return mapSanityProjectToClientProject(sanityProject)
  } catch {
    // Fall back to the version bundled with the site when Sanity is unavailable.
  }
  return staticProjects.find((project) => project.slug === slug) || null
}

export async function generateStaticParams() {
  let sanityProjects: Array<{ slug: string }> = []
  try {
    sanityProjects = await getAllProjects()
  } catch {
    sanityProjects = []
  }

  return Array.from(
    new Set([...staticProjects.map((project) => project.slug), ...sanityProjects.map((project) => project.slug)]),
  ).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await findProject(slug)

  if (!project) {
    return {
      title: "Proyecto no encontrado",
      description: "El proyecto que buscas no existe.",
      robots: { index: false, follow: false },
    }
  }

  const canonical = absoluteUrl(`/projects/${project.slug}`)
  return {
    title: `${project.title}: caso de estudio`,
    description: project.shortDescription || project.description,
    alternates: { canonical },
    openGraph: {
      title: `${project.title} | Portafolio K&T Code`,
      description: project.description,
      type: "article",
      url: canonical,
      images: project.images.hero
        ? [{ url: absoluteUrl(project.images.hero), width: 1200, height: 630, alt: project.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Portafolio K&T Code`,
      description: project.shortDescription,
      images: project.images.hero ? [absoluteUrl(project.images.hero)] : undefined,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await findProject(slug)
  if (!project) notFound()

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Portafolio", path: "/portafolio" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "@id": `${absoluteUrl(`/projects/${project.slug}`)}#project`,
            name: project.title,
            description: project.description,
            url: absoluteUrl(`/projects/${project.slug}`),
            image: project.images.hero ? absoluteUrl(project.images.hero) : undefined,
            creator: { "@id": `${siteConfig.url}/#organization` },
            keywords: [...project.tech, project.category].filter(Boolean).join(", "),
          },
        ]}
      />
      <ProjectClientView project={project} />
    </>
  )
}
