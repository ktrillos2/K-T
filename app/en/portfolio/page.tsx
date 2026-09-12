import { getAllProjects } from "@/sanity/lib/queries"
import Footer from "@/components/layout/footer"
import PortafolioClient from "@/app/portafolio/portafolio-client"
import { Metadata } from "next"
import { absoluteUrl } from "@/lib/site-config"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Portfolio & Verified Case Studies",
  description:
    "Explore our verified web development projects, custom software platforms, and headless e-commerce case studies across various industries.",
  keywords: [
    "web development portfolio",
    "next.js case studies",
    "software development agency projects",
    "ecommerce website examples",
    "K&T Code portfolio",
  ],
  alternates: {
    canonical: absoluteUrl("/en/portfolio"),
    languages: {
      "es-CO": absoluteUrl("/portafolio"),
      es: absoluteUrl("/portafolio"),
      en: absoluteUrl("/en/portfolio"),
      "en-US": absoluteUrl("/en/portfolio"),
      "x-default": absoluteUrl("/portafolio"),
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
    title: "Portfolio & Verified Case Studies | K&T Code",
    description:
      "Explore our web development projects, custom software platforms, and headless e-commerce case studies.",
    url: absoluteUrl("/en/portfolio"),
    siteName: "K&T Code",
    locale: "en_US",
    type: "website",
  },
}

export default async function EnglishPortfolioPage() {
  let projects: any[] = []
  try {
    const sanityProjects = await getAllProjects()
    const { projects: hardcodedProjects } = await import("@/lib/projects")
    const allSlugSet = new Set(sanityProjects.map((p) => p.slug))
    projects = [
      ...sanityProjects,
      ...hardcodedProjects.filter((p) => !allSlugSet.has(p.slug)),
    ]
  } catch (error) {
    console.error("Error fetching projects for English portfolio:", error)
    const { projects: hardcodedProjects } = await import("@/lib/projects")
    projects = hardcodedProjects
  }

  return (
    <>
      <PortafolioClient initialProjects={projects} />
      <Footer />
    </>
  )
}
