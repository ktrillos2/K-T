import type { Metadata } from "next"
import dynamic from "next/dynamic"
import HeroSection from "@/components/sections/hero-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import { client } from "@/sanity/lib/client"
import { getAllProjects } from "@/sanity/lib/queries"
import { absoluteUrl } from "@/lib/site-config"

const AboutSection = dynamic(() => import("@/components/sections/about-section"))
const ProjectsSection = dynamic(() => import("@/components/sections/projects-section"))
const InternationalSection = dynamic(() => import("@/components/sections/international-section"))
const ContactSection = dynamic(() => import("@/components/sections/contact-section"))
const Footer = dynamic(() => import("@/components/layout/footer"))
const ServicesSection = dynamic(() => import("@/components/sections/services-section"))

export const metadata: Metadata = {
  title: {
    absolute: "Web Development & Custom Software Agency | K&T Code",
  },
  description:
    "K&T Code is a web development and software engineering agency. We build fast corporate websites, headless e-commerce, and custom digital platforms with Next.js, React 19, and TypeScript.",
  keywords: [
    "web development agency",
    "custom software development",
    "next.js developers",
    "headless ecommerce agency",
    "react development services",
    "hire software engineers colombia",
    "web design agency us latam",
    "K&T Code",
  ],
  alternates: {
    canonical: absoluteUrl("/en"),
    languages: {
      "en-US": absoluteUrl("/en"),
      en: absoluteUrl("/en"),
      es: absoluteUrl("/"),
      "x-default": absoluteUrl("/"),
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
    title: "Web Development & Custom Software Agency | K&T Code",
    description:
      "High-performance corporate websites, headless e-commerce, and custom software engineered with Next.js, React 19, and TypeScript.",
    url: absoluteUrl("/en"),
    siteName: "K&T Code",
    locale: "en_US",
    type: "website",
  },
}

export const revalidate = 60

export default async function EnglishHomePage() {
  let initialProjects: any[] = []
  try {
    initialProjects = await getAllProjects()
  } catch (error) {
    console.error("Error fetching projects for English home page:", error)
  }

  let initialProjectCount = 0
  try {
    initialProjectCount = await client.fetch<number>(`count(*[_type == "project"])`)
  } catch (error) {
    console.error("Error fetching project count:", error)
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white selection:text-black">
      <HeroSection />
      <AboutSection projectCount={initialProjectCount} />
      <ProjectsSection initialProjects={initialProjects} />
      <ServicesSection />
      <TestimonialsSection />
      <InternationalSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
