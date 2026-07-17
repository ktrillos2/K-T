"use client"

import { m as motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import { fadeUpVariant, staggerContainer, textRevealVariant } from "@/lib/animations"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"

const ProjectsCarousel = dynamic(() => import("./projects-carousel"), { ssr: false })

export default function ProjectsSection({ initialProjects = [] }: { initialProjects?: any[] }) {
  const { language, dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()

  // Map raw data to a normalized shape
  const allProjects = initialProjects.map((p, i) => ({
    id: i,
    titleEn: p.title,
    titleEs: p.title,
    descEn: p.shortDescription || p.description,
    descEs: p.shortDescription || p.description,
    image: p.hero,
    imageMobile: p.mobile,
    tech: p.tech || [],
    year: p.year,
    month: p.month,
    slug: p.slug,
    link: `/projects/${p.slug}`,
    externalLink: p.liveUrl,
  }));

  // Separate featured project (named "Cxellence") from the rest
  const featuredProject = allProjects.find(
    (proj) =>
      proj.titleEn?.toLowerCase() === "cxellence" ||
      proj.titleEs?.toLowerCase() === "cxellence"
  );
  const projects = allProjects.filter((proj) => proj !== featuredProject);

  return (
    <section id="work" className="relative py-16 lg:py-24 overflow-hidden cv-auto">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-20 px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p 
            className="text-white font-mono text-sm mb-4"
            variants={fadeUpVariant}
          >
            {dictionary.projects.subtitle}
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-title"
            variants={textRevealVariant}
          >
            {dictionary.projects.title}
          </motion.h2>
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
  );
}
