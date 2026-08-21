import { getAllProjects } from "@/sanity/lib/queries"
import Footer from "@/components/layout/footer"
import PortafolioClient from "./portafolio-client"

export const revalidate = 60;

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portafolio de Proyectos y Casos de Éxito",
  description: "Explora nuestros proyectos de desarrollo web a medida, tiendas virtuales headless y software corporativo para empresas en Colombia y Latinoamérica.",
  alternates: {
    canonical: "https://www.kytcode.lat/portafolio",
    languages: {
      "es-CO": "https://www.kytcode.lat/portafolio",
      es: "https://www.kytcode.lat/portafolio",
      en: "https://www.kytcode.lat/en/portfolio",
      "x-default": "https://www.kytcode.lat/portafolio",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Portafolio de Proyectos y Casos de Éxito | K&T Code",
    description: "Explora nuestros proyectos de desarrollo web a medida, tiendas virtuales headless y software corporativo para empresas en Colombia.",
    url: "https://www.kytcode.lat/portafolio",
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Portafolio de Proyectos K&T Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio de Proyectos y Casos de Éxito | K&T Code",
    description: "Explora nuestros proyectos de desarrollo web a medida, tiendas virtuales headless y software corporativo para empresas.",
    images: ["/opengraph-image.png"],
  },
}

export default async function PortafolioPage() {
  const sanityProjects = await getAllProjects()
  
  // Combine Sanity projects with hardcoded projects from lib/projects.ts
  const { projects: hardcodedProjects } = await import("@/lib/projects")
  
  // If sanity has projects, we prioritize them, otherwise we show hardcoded, or we can just merge them if needed.
  // For now, let's use hardcoded if Sanity is empty, or merge them.
  const projects = sanityProjects.length > 0 ? sanityProjects : hardcodedProjects

  return (
    <>
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
