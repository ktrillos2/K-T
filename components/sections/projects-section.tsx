"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"

const projects = [
  {
    id: 1,
    titleEn: "E-Commerce Platform",
    titleEs: "Plataforma E-Commerce",
    descEn: "Full-stack online store with payment integration",
    descEs: "Tienda online full-stack con integración de pagos",
    image: "/modern-ecommerce-dark-theme-website.jpg",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
    year: "2024",
  },
  {
    id: 2,
    titleEn: "SaaS Dashboard",
    titleEs: "Dashboard SaaS",
    descEn: "Analytics dashboard for business intelligence",
    descEs: "Dashboard de análisis para inteligencia empresarial",
    image: "/modern-saas-dashboard-dark-minimal-design.jpg",
    tech: ["React", "Node.js", "MongoDB"],
    year: "2024",
  },
  {
    id: 3,
    titleEn: "Mobile Banking App",
    titleEs: "App de Banca Móvil",
    descEn: "Secure fintech application with biometric auth",
    descEs: "Aplicación fintech segura con autenticación biométrica",
    image: "/mobile-banking-app-dark-ui-design.jpg",
    tech: ["React Native", "Firebase", "Plaid"],
    year: "2023",
  },
  {
    id: 4,
    titleEn: "Real Estate Platform",
    titleEs: "Plataforma Inmobiliaria",
    descEn: "Property listing with 3D virtual tours",
    descEs: "Listado de propiedades con tours virtuales 3D",
    image: "/real-estate-website-dark-modern-design.jpg",
    tech: ["Next.js", "Three.js", "Supabase"],
    year: "2023",
  },
]

export default function ProjectsSection() {
  const { language } = useLanguage()
  const { dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="work" className="relative py-24 lg:py-32 px-6 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/40 font-mono text-sm mb-4">{dictionary.projects.subtitle}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-title">{dictionary.projects.title}</h2>
        </motion.div>

        {/* Projects Grid - Stacked Cards */}
        <div ref={containerRef} className="relative">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isActive={activeIndex === index}
              onHover={() => setActiveIndex(index)}
              onLeave={() => setActiveIndex(null)}
              language={language}
              setCursorVariant={setCursorVariant}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: (typeof projects)[0]
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
  language: "en" | "es"
  setCursorVariant: (variant: "default" | "hover" | "text") => void
}

function ProjectCard({ project, index, isActive, onHover, onLeave, language, setCursorVariant }: ProjectCardProps) {
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

  return (
    <motion.div
      ref={cardRef}
      className="mb-8 last:mb-0"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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
        className="relative group"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card Container */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-64 lg:h-96 overflow-hidden">
              <motion.img
                src={project.image}
                alt={title}
                className="w-full h-full object-cover"
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/80 lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent lg:hidden" />

              {/* Year badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-xs font-mono text-white">{project.year}</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Project number */}
              <motion.span
                className="text-6xl lg:text-8xl font-bold font-title text-white/5 absolute top-4 right-4 lg:top-8 lg:right-8"
                animate={{
                  opacity: isActive ? 0.1 : 0.03,
                }}
              >
                0{index + 1}
              </motion.span>

              {/* Title */}
              <motion.h3
                className="text-2xl lg:text-4xl font-bold font-title mb-4 relative z-10"
                animate={{
                  x: isActive ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.h3>

              {/* Description */}
              <p className="text-muted-foreground font-mono text-sm lg:text-base mb-6 relative z-10">{desc}</p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono border border-white/20 rounded-full text-white/60"
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
                <span>{language === "en" ? "View Project" : "Ver Proyecto"}</span>
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
}
