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
    absolute: "Empresa de Desarrollo Web y Software en Colombia | K&T Code",
  },
  description: "K&T Code es una empresa colombiana de desarrollo web y software a medida. Creamos páginas web, tiendas virtuales y plataformas digitales para empresas en Colombia y Latinoamérica.",
  keywords: [
    "empresa de desarrollo web colombia",
    "desarrollo web y software a medida",
    "diseño de paginas web bogota",
    "desarrollo web medellin",
    "desarrollo web a medida",
    "tiendas virtuales colombia",
    "software a medida para empresas",
    "e-commerce headless",
    "agencia digital colombia",
    "programacion web next.js",
    "K&T Code",
  ],
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
    title: "Empresa de Desarrollo Web y Software en Colombia | K&T Code",
    description: "K&T Code es una empresa colombiana de desarrollo web y software a medida. Creamos páginas web, tiendas virtuales y plataformas digitales para empresas en Colombia y Latinoamérica.",
    url: "https://www.kytcode.lat",
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
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
  const projects = await getAllProjects()
  const projectCount = projects?.length ?? 0

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
