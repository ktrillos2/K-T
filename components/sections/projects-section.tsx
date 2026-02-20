"use client"

import { m as motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import { projects as projectData } from "@/lib/projects"
import dynamic from "next/dynamic"

const ProjectsCarousel = dynamic(() => import("./projects-carousel"), { ssr: false })

const projects = projectData.map((p, i) => ({
  id: i,
  titleEn: p.title,
  titleEs: p.title,
  descEn: p.shortDescription,
  descEs: p.shortDescription,
  image: p.images.hero,
  imageMobile: p.images.mobile,
  tech: p.tech,
  year: p.year,
  month: p.month,
  link: `/projects/${p.slug}`,
  externalLink: p.liveUrl
}))

export default function ProjectsSection() {
  const { language, dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()

  return (
    <section id="work" className="relative py-16 lg:py-24 overflow-hidden cv-auto">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-20 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white font-mono text-sm mb-4">{dictionary.projects.subtitle}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-title">{dictionary.projects.title}</h2>
        </motion.div>

        {/* Projects Carousel */}
        <ProjectsCarousel
          projects={projects}
          language={language}
          dictionary={dictionary}
          setCursorVariant={setCursorVariant}
        />
      </div>
    </section>
  )
}
