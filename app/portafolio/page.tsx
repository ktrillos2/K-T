import { getAllProjects } from "@/sanity/lib/queries"
import Footer from "@/components/layout/footer"
import PortafolioClient from "./portafolio-client"
import JsonLd from "@/components/seo/json-ld"
import { buildBreadcrumbJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const revalidate = 60;

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portafolio y casos de estudio",
  description: "Explora nuestros casos de éxito y proyectos de desarrollo web a medida, tiendas virtuales y software para empresas.",
  alternates: {
    canonical: absoluteUrl('/portafolio'),
  }
}

export default async function PortafolioPage() {
  let sanityProjects: any[] = []
  try {
    sanityProjects = await getAllProjects()
  } catch {
    sanityProjects = []
  }
  
  // Combine Sanity projects with hardcoded projects from lib/projects.ts
  const { projects: hardcodedProjects } = await import("@/lib/projects")
  
  // If sanity has projects, we prioritize them, otherwise we show hardcoded, or we can just merge them if needed.
  // For now, let's use hardcoded if Sanity is empty, or merge them.
  const projects = sanityProjects.length > 0 ? sanityProjects : hardcodedProjects

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Portafolio", path: "/portafolio" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Portafolio y casos de estudio de K&T Code",
            url: absoluteUrl("/portafolio"),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.slice(0, 30).map((project: any, index: number) => ({
                "@type": "ListItem",
                position: index + 1,
                name: project.title,
                url: absoluteUrl(`/projects/${project.slug}`),
              })),
            },
          },
        ]}
      />
      <main className="min-h-screen pt-32 pb-16 px-6 lg:px-12 relative">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 lg:mb-24">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-title mb-6">
              Nuestro Portafolio
            </h1>
            <p className="text-white/60 font-mono text-lg max-w-2xl mx-auto">
              // Exploración de arquitecturas digitales escalables, e-commerce headless y software a medida.
            </p>
          </div>

          <PortafolioClient initialProjects={projects} />
        </div>
      </main>
      <Footer />
    </>
  )
}
