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

export const metadata: Metadata = {
  title: {
    absolute: "Landing pages y tiendas virtuales | K&T Code",
  },
  description: "K&T Code desarrolla landing pages de alta conversión, tiendas virtuales y software a medida desde Colombia para clientes nacionales e internacionales, con enfoque en velocidad, SEO y resultados de negocio.",
  alternates: {
    canonical: "https://www.kytcode.lat",
    languages: {
      "es-CO": "https://www.kytcode.lat",
      es: "https://www.kytcode.lat",
      en: "https://www.kytcode.lat/en",
      "x-default": "https://www.kytcode.lat",
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
    title: "Landing pages y tiendas virtuales | K&T Code",
    description: "K&T Code desarrolla landing pages de alta conversión, tiendas virtuales y software a medida desde Colombia para clientes nacionales e internacionales.",
    url: "https://www.kytcode.lat",
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://www.kytcode.lat/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "K&T Code — Landing pages y tiendas virtuales en Colombia y el exterior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landing pages y tiendas virtuales | K&T Code",
    description: "K&T Code desarrolla landing pages de alta conversión, tiendas virtuales y software a medida desde Colombia para clientes nacionales e internacionales.",
    images: ["https://www.kytcode.lat/opengraph-image.png"],
  },
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
  const testimonials = await getTestimonials()
  const sanityProjects = await getAllProjects()
  const { projects: hardcodedProjects } = await import("@/lib/projects")
  
  const allSlugSet = new Set(sanityProjects.map(p => p.slug))
  const projects = [
    ...sanityProjects,
    ...hardcodedProjects.filter(p => !allSlugSet.has(p.slug))
  ]
  const projectCount = projects.length

  return (
    <>
      <HeroSection />
      <AboutSection projectCount={projectCount} />
      <ServicesSection />
      <InternationalSection />
      <CxellenceSection initialProjects={projects} />
      <ProjectsSection initialProjects={projects} />
      <TestimonialsSection initialTestimonials={testimonials} />
      <ContactSection />
      <Footer />
    </>
  )
}
