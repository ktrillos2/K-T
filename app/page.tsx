import HeroSection from "@/components/sections/hero-section"
import dynamic from 'next/dynamic'
import { client } from "@/sanity/lib/client"
import TestimonialsSection from "@/components/sections/testimonials-section"

// Lazy load below-the-fold sections heavily relying on heavy third-parties
const AboutSection = dynamic(() => import("@/components/sections/about-section"))
const CxellenceSection = dynamic(() => import("@/components/sections/cxellence-section"))
const ProjectsSection = dynamic(() => import("@/components/sections/projects-section"))
// TestimonialsSection is now static to support anchor link navigation, but its INTERNAL carousel must be dynamic if possible
const InternationalSection = dynamic(() => import("@/components/sections/international-section"))
const ContactSection = dynamic(() => import("@/components/sections/contact-section"))
const Footer = dynamic(() => import("@/components/layout/footer"))
const ServicesSection = dynamic(() => import("@/components/sections/services-section"))

import { getAllProjects } from "@/sanity/lib/queries"
import type { Metadata } from "next"
import JsonLd from "@/components/seo/json-ld"
import { absoluteUrl, siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Agencia de desarrollo web en Colombia",
  description: "Desarrollamos páginas web, tiendas virtuales y software a medida de alto rendimiento para empresas en Colombia y Latinoamérica.",
  alternates: {
    canonical: absoluteUrl('/'),
  }
}

export const revalidate = 60;

async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial" && status == "approved"] | order(_createdAt desc) {
      _id,
      name,
      role,
      content,
      rating,
      project,
      projectUrl,
      image
    }
  `)
}

export default async function Home() {
  const [testimonials, projects] = await Promise.all([
    getTestimonials().catch(() => []),
    getAllProjects().catch(() => []),
  ])

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${siteConfig.url}/#webpage`,
            url: siteConfig.url,
            name: "Agencia de desarrollo web en Colombia",
            description: siteConfig.description,
            isPartOf: { "@id": `${siteConfig.url}/#website` },
            about: { "@id": `${siteConfig.url}/#organization` },
            inLanguage: "es-CO",
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Servicios de K&T Code",
            itemListElement: [
              ["Desarrollo web a medida", "/servicios/desarrollo-web-a-medida"],
              ["Diseño web corporativo", "/servicios/diseno-web-corporativo"],
              ["Tiendas virtuales", "/servicios/tiendas-virtuales"],
              ["Software a medida", "/servicios/software-a-medida"],
              ["SEO técnico", "/servicios/seo-tecnico"],
              ["Mantenimiento web", "/servicios/mantenimiento-web"],
            ].map(([name, path], index) => ({
              "@type": "ListItem",
              position: index + 1,
              name,
              url: absoluteUrl(path),
            })),
          },
        ]}
      />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <InternationalSection />
        <CxellenceSection initialProjects={projects} />
        <ProjectsSection initialProjects={projects} />
        <TestimonialsSection initialTestimonials={testimonials} />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
