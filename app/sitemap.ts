import type { MetadataRoute } from "next"
import fs from "node:fs"
import path from "node:path"

import { blogPosts } from "@/lib/blog-posts"
import { projects as staticProjects } from "@/lib/projects"
import { siteConfig } from "@/lib/site-config"
import { getAllProjects } from "@/sanity/lib/queries"

const staticRoutes = [
  { path: "/", file: "app/page.tsx", frequency: "weekly", priority: 1 },
  { path: "/servicios", file: "app/servicios/page.tsx", frequency: "monthly", priority: 0.95 },
  { path: "/servicios/desarrollo-web-a-medida", file: "app/servicios/desarrollo-web-a-medida/page.tsx", frequency: "monthly", priority: 0.9 },
  { path: "/servicios/diseno-web-corporativo", file: "app/servicios/diseno-web-corporativo/page.tsx", frequency: "monthly", priority: 0.9 },
  { path: "/servicios/tiendas-virtuales", file: "app/servicios/tiendas-virtuales/page.tsx", frequency: "monthly", priority: 0.9 },
  { path: "/servicios/software-a-medida", file: "app/servicios/software-a-medida/page.tsx", frequency: "monthly", priority: 0.9 },
  { path: "/servicios/seo-tecnico", file: "app/servicios/seo-tecnico/page.tsx", frequency: "monthly", priority: 0.85 },
  { path: "/servicios/mantenimiento-web", file: "app/servicios/mantenimiento-web/page.tsx", frequency: "monthly", priority: 0.8 },
  { path: "/precios", file: "app/precios/page.tsx", frequency: "monthly", priority: 0.9 },
  { path: "/portafolio", file: "app/portafolio/page.tsx", frequency: "weekly", priority: 0.9 },
  { path: "/blog", file: "app/blog/page.tsx", frequency: "weekly", priority: 0.85 },
  { path: "/preguntas-frecuentes", file: "app/preguntas-frecuentes/page.tsx", frequency: "monthly", priority: 0.75 },
  { path: "/redes", file: "app/redes/page.tsx", frequency: "monthly", priority: 0.7 },
  { path: "/politica-de-privacidad", file: "app/politica-de-privacidad/page.tsx", frequency: "yearly", priority: 0.2 },
] as const

function fileModified(relativePath: string) {
  try {
    return fs.statSync(path.join(process.cwd(), relativePath)).mtime
  } catch {
    return undefined
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projects: Array<{ slug: string; _updatedAt?: string }> = []

  try {
    projects = await getAllProjects()
  } catch {
    projects = []
  }

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified: fileModified(route.file),
    changeFrequency: route.frequency,
    priority: route.priority,
  }))

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedAt),
    changeFrequency: "monthly",
    priority: 0.78,
  }))

  const projectMap = new Map<string, { slug: string; _updatedAt?: string }>()
  staticProjects.forEach((project) => projectMap.set(project.slug, { slug: project.slug }))
  projects.filter((project) => Boolean(project.slug)).forEach((project) => projectMap.set(project.slug, project))

  const projectUrls: MetadataRoute.Sitemap = Array.from(projectMap.values()).map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: project._updatedAt ? new Date(project._updatedAt) : fileModified("lib/projects.ts"),
    changeFrequency: "monthly",
    priority: 0.75,
  }))

  return [...staticUrls, ...blogUrls, ...projectUrls]
}
