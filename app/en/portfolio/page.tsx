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
      "en-US": absoluteUrl("/en/portfolio"),
      en: absoluteUrl("/en/portfolio"),
      es: absoluteUrl("/portafolio"),
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
    projects = await getAllProjects()
  } catch (error) {
    console.error("Error fetching projects for English portfolio:", error)
  }

  return (
    <>
      <PortafolioClient initialProjects={projects} />
      <Footer />
    </>
  )
}
