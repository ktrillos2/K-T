"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { m as motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Layers,
  Globe,
  Gauge,
  Zap,
  CheckCircle2,
  Building2,
  Clock,
  Target,
  FileCode2,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { useCursor } from "@/context/cursor-context"
import { Project } from "@/lib/projects"

interface ProjectClientViewProps {
  project: Project
}

export default function ProjectClientView({ project }: ProjectClientViewProps) {
  const { setCursorVariant } = useCursor()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = "/portafolio"
    }
  }

  return (
    <main ref={containerRef} className="bg-background min-h-screen text-foreground">
      {/* Navigation Back */}
      <div className="fixed top-24 left-6 z-[100] hidden lg:block">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group cursor-pointer pointer-events-auto mix-blend-difference bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-wider">Volver al Portafolio</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[500px] w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
          <Image
            src={project.images.hero}
            alt={`Captura del proyecto ${project.title} desarrollado por K&T Code`}
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/70 to-black/40 backdrop-blur-[2px]" />
        </motion.div>

        <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3.5 py-1 border border-white/20 rounded-full text-emerald-400 text-xs font-mono uppercase tracking-wider bg-black/50 backdrop-blur-md flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                {project.industry}
              </span>
              <span className="px-3.5 py-1 border border-white/20 rounded-full text-neutral-300 text-xs font-mono uppercase tracking-wider bg-black/50 backdrop-blur-md flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {project.date || `${project.month} ${project.year}`}
              </span>
              <span className="px-3.5 py-1 border border-white/20 rounded-full text-blue-400 text-xs font-mono uppercase tracking-wider bg-black/50 backdrop-blur-md flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                {project.country} {project.city ? `• ${project.city}` : ""}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white font-title mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-3xl font-light leading-relaxed">
              {project.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content & Case Study Data */}
      <section className="relative z-20 bg-background py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Sidebar / Client Factsheet Table */}
            <div className="lg:col-span-4 space-y-8">
              {/* Factsheet Card */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 font-mono text-sm space-y-4">
                <h3 className="text-white font-title text-lg font-bold pb-3 border-b border-white/10 flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-emerald-400" />
                  Ficha Técnica del Caso
                </h3>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Cliente</span>
                    <strong className="text-neutral-200">{project.client || project.title}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Industria / Sector</span>
                    <span className="text-neutral-200">{project.industry}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Ubicación</span>
                    <span className="text-neutral-200">{project.country} {project.city ? `(${project.city})` : ""}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Tipo de Proyecto</span>
                    <span className="text-neutral-200">{project.projectType || project.category}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Duración del Desarrollo</span>
                    <span className="text-neutral-200 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {project.duration || "4 semanas"}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Objetivo Principal</span>
                    <p className="text-neutral-300 text-xs mt-0.5">{project.objective}</p>
                  </div>
                </div>

                {project.liveUrl && (
                  <div className="pt-3 border-t border-white/10">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-black font-mono font-bold text-xs rounded-xl hover:bg-neutral-200 transition-all duration-300 group"
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <span>Ver Sitio en Vivo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Technologies */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-title text-base font-bold mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  Stack Tecnológico
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-neutral-300 text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Narrative & Results */}
            <div className="lg:col-span-8 space-y-12">
              {/* Problem / Challenge */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/[0.015] border border-white/10 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Target className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white font-title">
                    El Desafío
                  </h2>
                </div>
                <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                  {project.content.challenge}
                </p>
              </motion.section>

              {/* Solution */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/[0.015] border border-white/10 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-emerald-500" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white font-title">
                    La Solución e Ingeniería
                  </h2>
                </div>
                <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                  {project.content.solution}
                </p>
              </motion.section>

              {/* Verified Metrics / Proof of Capability */}
              {project.metrics && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-neutral-900/90 to-black border border-white/15 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Gauge className="w-4 h-4" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white font-title">
                      Resultados y Métricas de Rendimiento
                    </h2>
                  </div>

                  {/* Metrics KPI Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 not-prose mb-8 font-mono">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                      <span className="text-neutral-400 text-[11px] block uppercase">Lighthouse</span>
                      <strong className="text-emerald-400 text-2xl font-bold mt-1 block">
                        {project.metrics.lighthouseAfter}
                      </strong>
                      {project.metrics.lighthouseBefore && (
                        <span className="text-neutral-500 text-[10px]">Antes: {project.metrics.lighthouseBefore}</span>
                      )}
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                      <span className="text-neutral-400 text-[11px] block uppercase">Velocidad LCP</span>
                      <strong className="text-white text-2xl font-bold mt-1 block">
                        {project.metrics.lcp}
                      </strong>
                      <span className="text-emerald-400 text-[10px]">Carga rápida</span>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                      <span className="text-neutral-400 text-[11px] block uppercase">Alcance</span>
                      <strong className="text-white text-2xl font-bold mt-1 block">
                        {project.metrics.pagesDeveloped}
                      </strong>
                      <span className="text-neutral-400 text-[10px]">Interfaces web</span>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                      <span className="text-neutral-400 text-[11px] block uppercase">Arquitectura</span>
                      <strong className="text-emerald-400 text-2xl font-bold mt-1 block">
                        100%
                      </strong>
                      <span className="text-neutral-400 text-[10px]">Next.js nativo</span>
                    </div>
                  </div>

                  {/* Key Achievements List */}
                  {project.metrics.keyAchievements && project.metrics.keyAchievements.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Evidencias y Logros Técnicos:
                      </h4>
                      {project.metrics.keyAchievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-neutral-300 font-mono">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.section>
              )}

              {/* SEO Focus */}
              {project.content.seoFocus && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/[0.015] border border-white/10 rounded-2xl p-8"
                >
                  <h3 className="text-xl font-bold text-white font-title mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Enfoque de Posicionamiento y Entidades
                  </h3>
                  <p className="text-neutral-300 font-mono text-sm leading-relaxed">
                    {project.content.seoFocus}
                  </p>
                </motion.section>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-r from-neutral-900 to-black border border-white/15 rounded-2xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-title mb-2">
                    ¿Quieres un resultado similar para tu empresa?
                  </h3>
                  <p className="text-neutral-400 font-mono text-xs">
                    Cotizamos tu proyecto con alcance claro, tiempos de entrega y arquitectura a la medida.
                  </p>
                </div>
                <Link
                  href="/precios"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono font-bold text-sm rounded-xl hover:bg-neutral-200 transition-colors shrink-0"
                >
                  Ver Planes y Cotizar
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Portfolio Link */}
      <section className="py-16 flex justify-center border-t border-white/10">
        <Link
          href="/portafolio"
          className="text-neutral-400 hover:text-white font-mono text-sm transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Explorar todos los casos de estudio en el portafolio
        </Link>
      </section>
    </main>
  )
}
