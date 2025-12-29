"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

const projects = [
  {
    id: -4,
    titleEn: "Eklipse Home Textil",
    titleEs: "Eklipse Home Textil",
    descEn: "Premium fabric catalog and sales",
    descEs: "Catálogo y venta de telas premium",
    image: "/images/projects/eklipse.png",
    imageMobile: "/images/projects/eklipse-mobile.png",
    tech: ["Next.js", "Tailwind CSS"],
    year: "2025",
    link: "https://www.eklipsehometextil.com",
  },
  {
    id: -3,
    titleEn: "San Roque",
    titleEs: "San Roque",
    descEn: "Pet spa and premium services",
    descEs: "Spa para mascotas y servicios premium",
    image: "/images/projects/san-roque.png",
    imageMobile: "/images/projects/san-roque-mobile.png",
    tech: ["Next.js", "Tailwind CSS"],
    year: "2025",
    link: "https://sanroqueros.com",
  },
  {
    id: 0,
    titleEn: "Telas Real",
    titleEs: "Telas Real",
    descEn: "Premium fabric e-commerce platform built from scratch",
    descEs: "Plataforma de comercio electrónico de telas premium hecha desde cero",
    image: "/images/projects/telas-real.png",
    imageMobile: "/images/projects/telas-real-mobile.png",
    tech: ["Next.js", "Tailwind CSS"],
    year: "2025",
    link: "https://telasreal.com",
  },
  {
    id: -1,
    titleEn: "Redeservi Paris",
    titleEs: "Redeservi Paris",
    descEn: "Private transport and tourism services in Paris",
    descEs: "Servicios de transporte privado y turismo en París",
    image: "/images/projects/redeservi-paris.png",
    imageMobile: "/images/projects/redeservi-paris-mobile.png",
    tech: ["Next.js", "Tailwind CSS"],
    year: "2025",
    link: "https://redeservieuropa.com",
  },
  {
    id: -2,
    titleEn: "Chevere Bogota Travel",
    titleEs: "Chevere Bogota Travel",
    descEn: "Tourism and travel experiences in Bogota",
    descEs: "Experiencias de turismo y viajes en Bogotá",
    image: "/images/projects/chevere-bogota.png",
    imageMobile: "/images/projects/chevere-bogota-mobile.png",
    tech: ["Next.js", "Tailwind CSS"],
    year: "2025",
    link: "https://cheverebogotatravel.com",
  },
]

export default function ProjectsSection() {
  const { language } = useLanguage()
  const { dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false, dragFree: false }, [
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true }),
  ])

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
          <p className="text-white/70 font-mono text-sm mb-4">{dictionary.projects.subtitle}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-title">{dictionary.projects.title}</h2>
        </motion.div>

        {/* Projects Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-[0_0_90%] md:flex-[0_0_60%] lg:flex-[0_0_45%] min-w-0 pl-6 md:pl-10"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isActive={activeIndex === index}
                  onHover={() => setActiveIndex(index)}
                  onLeave={() => setActiveIndex(null)}
                  language={language}
                  setCursorVariant={setCursorVariant}
                  dictionary={dictionary}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: (typeof projects)[0] & { link?: string }
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
  language: "en" | "es"
  setCursorVariant: (variant: "default" | "hover" | "text") => void
  dictionary: any
}

function ProjectCard({ project, index, isActive, onHover, onLeave, language, setCursorVariant, dictionary }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onLeave()
    setCursorVariant("default")
  }

  const title = language === "en" ? project.titleEn : project.titleEs
  const desc = language === "en" ? project.descEn : project.descEs

  const CardContent = (
    <motion.div
      ref={cardRef}
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        onHover()
        setCursorVariant("hover")
      }}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className="relative group h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card Container */}
        <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm flex flex-col">
          {/* Image Side */}
          <div className="relative h-64 lg:h-80 w-full overflow-hidden shrink-0">
            {project.imageMobile ? (
              <>
                <motion.div
                  className="w-full h-full lg:hidden block relative"
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={project.imageMobile}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  className="w-full h-full hidden lg:block relative"
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={project.image}
                    alt={title}
                    fill
                    sizes="(max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                </motion.div>
              </>
            ) : (
              <motion.div
                className="w-full h-full relative"
                animate={{ scale: isActive ? 1.05 : 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src={project.image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top"
                />
              </motion.div>
            )}
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent pointer-events-none" />

            {/* Year badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-xs font-mono text-white">{project.year}</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="p-6 lg:p-8 flex flex-col flex-grow relative">
            {/* Project number */}
            <motion.span
              className="text-6xl font-bold font-title text-white/5 absolute top-4 right-4"
              animate={{
                opacity: isActive ? 0.1 : 0.03,
              }}
            >
              0{index + 1}
            </motion.span>

            {/* Title */}
            <motion.h3
              className="text-xl lg:text-3xl font-bold font-title mb-4 relative z-10"
              animate={{
                x: isActive ? 10 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>

            {/* Description */}
            <p className="text-muted-foreground font-mono text-sm mb-6 relative z-10 flex-grow">{desc}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-8 mt-auto">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[10px] lg:text-xs font-mono border border-white/20 rounded-full text-white/60"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* View Project Link */}
            <motion.div
              className="flex items-center gap-2 text-white font-mono text-sm relative z-10"
              animate={{
                x: isActive ? 10 : 0,
                opacity: isActive ? 1 : 0.6,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* @ts-ignore */}
              <span>{dictionary.common.viewProject}</span>
              <motion.div
                animate={{
                  x: isActive ? 5 : 0,
                  y: isActive ? -5 : 0,
                }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </div>

          {/* Animated border glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            animate={{
              boxShadow: isActive
                ? "inset 0 0 0 1px rgba(255,255,255,0.2), 0 0 40px rgba(255,255,255,0.05)"
                : "inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 0px rgba(255,255,255,0)",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  )

  if (project.link) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block outline-none h-full">
        {CardContent}
      </a>
    )
  }

  return CardContent
}
