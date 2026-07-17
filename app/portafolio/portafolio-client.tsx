"use client"

import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import PortfolioGrid from "@/components/sections/portfolio-grid"

export default function PortafolioClient({ initialProjects }: { initialProjects: any[] }) {
  const { dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()

  const projects = initialProjects.map((p, i) => ({
    id: i,
    titleEn: p.title,
    titleEs: p.title,
    descEn: p.shortDescription || p.description,
    descEs: p.shortDescription || p.description,
    image: p.hero || p.images?.hero,
    imageMobile: p.mobile || p.images?.mobile,
    tech: p.tech || [],
    year: p.year,
    month: p.month,
    category: p.category,
    slug: p.slug,
    link: `/projects/${p.slug}`,
    externalLink: p.liveUrl
  }))

  return (
    <PortfolioGrid 
      projects={projects} 
      dictionary={dictionary} 
      setCursorVariant={setCursorVariant} 
    />
  )
}
