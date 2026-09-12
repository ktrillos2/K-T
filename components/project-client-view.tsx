"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
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
  Star,
  Quote,
  TrendingUp,
  ShoppingBag,
  MessageSquarePlus,
} from "lucide-react"
import { useCursor } from "@/context/cursor-context"
import { Project } from "@/lib/projects"

const TestimonialModal = dynamic(() => import("@/components/modals/testimonial-modal"), { ssr: false })

interface ProjectClientViewProps {
  project: Project
}

export default function ProjectClientView({ project }: ProjectClientViewProps) {
  const { setCursorVariant } = useCursor()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false)

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
              {project.industry && (
                <span className="px-3.5 py-1 border border-white/20 rounded-full text-emerald-400 text-xs font-mono uppercase tracking-wider bg-black/50 backdrop-blur-md flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  {project.industry}
                </span>
              )}
              {(project.date || project.year) && (
                <span className="px-3.5 py-1 border border-white/20 rounded-full text-neutral-300 text-xs font-mono uppercase tracking-wider bg-black/50 backdrop-blur-md flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.date || `${project.month || ""} ${project.year || ""}`.trim()}
                </span>
              )}
              {project.country && (
                <span className="px-3.5 py-1 border border-white/20 rounded-full text-blue-400 text-xs font-mono uppercase tracking-wider bg-black/50 backdrop-blur-md flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  {project.country} {project.city ? `• ${project.city}` : ""}
                </span>
              )}
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
                  {project.industry && (
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Industria / Sector</span>
                      <span className="text-neutral-200">{project.industry}</span>
                    </div>
                  )}
                  {project.country && (
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Ubicación</span>
                      <span className="text-neutral-200">{project.country} {project.city ? `(${project.city})` : ""}</span>
                    </div>
                  )}
                  {(project.projectType || project.category) && (
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Tipo de Proyecto</span>
                      <span className="text-neutral-200">{project.projectType || project.category}</span>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Duración del Desarrollo</span>
                      <span className="text-neutral-200 flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        {project.duration}
                      </span>
                    </div>
                  )}
                  {project.objective && (
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Objetivo Principal</span>
                      <p className="text-neutral-300 text-xs mt-0.5">{project.objective}</p>
                    </div>
                  )}
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
            <div className="lg:col-span-8 space-y-10">
              {/* Production Live Status Badge */}
              {project.liveUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative flex h-3.5 w-3.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                          Proyecto en Producción Activa
                        </span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                          Entidad Validada
                        </span>
                      </div>
                      <p className="text-sm text-neutral-300 mt-0.5">
                        Desarrollado por <strong className="text-white">K&T Code</strong> para <strong className="text-white">{project.client || project.title}</strong>
                      </p>
                    </div>
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xs font-mono font-bold bg-emerald-400 text-black px-5 py-2.5 rounded-xl hover:bg-emerald-300 transition-all shrink-0 shadow-lg shadow-emerald-500/10"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <span>Visitar {project.client || "Sitio Web"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              )}

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
                    El Problema y Desafío
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
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white font-title">
                        Resultados Cuantificables: Antes vs. Después
                      </h2>
                      <p className="text-neutral-400 text-xs font-mono mt-1">
                        Auditoría real de Core Web Vitals e impacto directo en métricas de conversión
                      </p>
                    </div>
                  </div>

                  {/* Core Web Vitals Before vs After Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose mb-6 font-mono">
                    {/* PageSpeed */}
                    <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col justify-between">
                      <span className="text-neutral-400 text-[11px] uppercase tracking-wider block">PageSpeed Score</span>
                      <div className="my-3 flex items-baseline gap-2">
                        {project.metrics.lighthouseBefore && (
                          <span className="text-rose-400/80 text-lg line-through font-semibold">
                            {project.metrics.lighthouseBefore}
                          </span>
                        )}
                        {project.metrics.lighthouseBefore && (
                          <span className="text-neutral-500 text-sm">→</span>
                        )}
                        <strong className="text-emerald-400 text-3xl font-bold">
                          {project.metrics.lighthouseAfter}
                        </strong>
                      </div>
                      <span className="text-[11px] text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded inline-block w-fit">
                        Score óptimo
                      </span>
                    </div>

                    {/* LCP Speed */}
                    <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col justify-between">
                      <span className="text-neutral-400 text-[11px] uppercase tracking-wider block">Velocidad LCP</span>
                      <div className="my-3 flex items-baseline gap-2">
                        {project.metrics.lcpBefore && (
                          <span className="text-rose-400/80 text-lg line-through font-semibold">
                            {project.metrics.lcpBefore}
                          </span>
                        )}
                        {project.metrics.lcpBefore && (
                          <span className="text-neutral-500 text-sm">→</span>
                        )}
                        <strong className="text-emerald-400 text-3xl font-bold">
                          {project.metrics.lcp}
                        </strong>
                      </div>
                      <span className="text-[11px] text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded inline-block w-fit">
                        Core Web Vital superado
                      </span>
                    </div>

                    {/* Total Load Time */}
                    <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col justify-between">
                      <span className="text-neutral-400 text-[11px] uppercase tracking-wider block">Tiempo de Carga</span>
                      <div className="my-3 flex items-baseline gap-2">
                        {project.metrics.loadTimeBefore && (
                          <span className="text-rose-400/80 text-lg line-through font-semibold">
                            {project.metrics.loadTimeBefore}
                          </span>
                        )}
                        {project.metrics.loadTimeBefore && (
                          <span className="text-neutral-500 text-sm">→</span>
                        )}
                        <strong className="text-emerald-400 text-3xl font-bold">
                          {project.metrics.loadTimeAfter || project.metrics.lcp}
                        </strong>
                      </div>
                      <span className="text-[11px] text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded inline-block w-fit">
                        Ultra respuesta
                      </span>
                    </div>
                  </div>

                  {/* Business Impact Row */}
                  {(project.metrics.conversionIncrease || project.metrics.catalogSize || project.metrics.pagesDeveloped) && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 font-mono">
                      {project.metrics.conversionIncrease && (
                        <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-neutral-400 text-[10px] block uppercase">Conversiones / Leads</span>
                            <span className="text-white text-sm font-bold">{project.metrics.conversionIncrease}</span>
                          </div>
                        </div>
                      )}

                      {project.metrics.catalogSize && (
                        <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                            <ShoppingBag className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-neutral-400 text-[10px] block uppercase">Catálogo Administrado</span>
                            <span className="text-white text-sm font-bold">{project.metrics.catalogSize}</span>
                          </div>
                        </div>
                      )}

                      {project.metrics.pagesDeveloped && (
                        <div className="bg-purple-500/5 border border-purple-500/20 p-4 rounded-xl flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                            <Layers className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-neutral-400 text-[10px] block uppercase">Alcance del Proyecto</span>
                            <span className="text-white text-sm font-bold">{project.metrics.pagesDeveloped}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Key Achievements List */}
                  {project.metrics.keyAchievements && project.metrics.keyAchievements.length > 0 && (
                    <div className="space-y-3 pt-6 border-t border-white/10">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                        Evidencias y Logros Técnicos Verificados:
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

              {/* Real Client Testimonial (Only if left on web / approved in Sanity) */}
              {project.testimonial ? (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative bg-gradient-to-br from-neutral-900/90 via-neutral-950 to-black border border-amber-500/25 rounded-2xl p-8 overflow-hidden"
                >
                  <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(project.testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Testimonio Real Verificado
                    </span>
                  </div>

                  <blockquote className="text-neutral-200 text-base md:text-lg font-light italic leading-relaxed mb-6 relative z-10">
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      {project.testimonial.avatar ? (
                        <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-amber-500/30">
                          <Image
                            src={project.testimonial.avatar}
                            alt={project.testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-bold text-black text-base shrink-0 shadow-md shadow-amber-500/20">
                          {project.testimonial.author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="text-white font-bold font-title text-base">
                          {project.testimonial.author}
                        </div>
                        <div className="text-neutral-400 text-xs font-mono">
                          {project.testimonial.role}
                          {project.testimonial.company && (
                            <> &bull; <span className="text-neutral-300 font-semibold">{project.testimonial.company}</span></>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsTestimonialModalOpen(true)}
                      className="text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 self-start sm:self-center"
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <MessageSquarePlus className="w-3.5 h-3.5" />
                      <span>¿Dejar otro testimonio?</span>
                    </button>
                  </div>
                </motion.section>
              ) : (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative border border-dashed border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/[0.01]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <MessageSquarePlus className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-title text-base sm:text-lg font-bold">
                        ¿Fuiste cliente o parte de este proyecto?
                      </h3>
                      <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-0.5">
                        Déjanos tu testimonio sobre {project.title} para que aparezca verificado aquí.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsTestimonialModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs shrink-0 transition-all shadow-lg shadow-amber-400/10 flex items-center gap-2"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <span>Dejar Testimonio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
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

      {/* Modal para dejar testimonio desde el proyecto */}
      {isTestimonialModalOpen && (
        <TestimonialModal
          isOpen={isTestimonialModalOpen}
          onClose={() => setIsTestimonialModalOpen(false)}
          defaultProject={project.title}
        />
      )}
    </main>
  )
}
