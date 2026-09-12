"use client"

import { useState, useCallback, useEffect } from "react"
import { m as motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

export default function CxellenceSection({ initialProjects = [] }: { initialProjects?: any[] }) {
  const { language, dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()

  const allProjects = initialProjects.map((p, i) => ({
    id: i,
    titleEn: p.title,
    titleEs: p.title,
    descEn: p.shortDescription || p.description,
    descEs: p.shortDescription || p.description,
    image: p.hero || p.images?.hero || "/images/projects/gmx-gaming.webp",
    imageMobile: p.mobile || p.images?.mobile || "/images/projects/gmx-gaming-mobile.webp",
    tech: p.tech || [],
    year: p.year,
    month: p.month,
    country: p.country,
    city: p.city,
    slug: p.slug,
    link: `/projects/${p.slug}`,
    liveUrl: p.liveUrl,
    isFeatured: p.isFeatured,
  }))

  // Sincronizado dinámicamente con Sanity (campo isFeatured) + fallback a destacados principales
  const isFeatured = (proj: any) =>
    proj.isFeatured === true ||
    proj.slug === "gmx-gaming" ||
    proj.slug === "gmxgaming" ||
    proj.slug === "cxellence-group" ||
    proj.slug === "cxellence" ||
    proj.slug === "telas-real" ||
    proj.titleEn?.toLowerCase().includes("gmx gaming") ||
    proj.titleEs?.toLowerCase().includes("gmx gaming") ||
    proj.titleEn?.toLowerCase().includes("cxellence") ||
    proj.titleEs?.toLowerCase().includes("cxellence") ||
    proj.titleEn?.toLowerCase().includes("telas real") ||
    proj.titleEs?.toLowerCase().includes("telas real") ||
    proj.liveUrl?.includes("gmxgaming.com") ||
    proj.liveUrl?.includes("cxellence.co") ||
    proj.liveUrl?.includes("telasreal.com")

  const featuredProjects = allProjects.filter(isFeatured)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false, dragFree: false },
    [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }) as any]
  )

  const onSelect = useCallback((api: any) => {
    if (!api) return
    setCurrentSlide(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  if (featuredProjects.length === 0) return null

  return (
    <section
      id="featured-projects"
      aria-label={language === "en" ? "Featured web projects" : "Proyectos web destacados"}
      className="relative pt-8 lg:pt-12 pb-12 overflow-hidden cv-auto"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header with title and carousel controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {language === "en" ? "Selected Works" : "Casos de Éxito"}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight">
              {language === "en" ? (
                <>
                  <span className="block">Featured Projects</span>
                  <span className="block text-white/90">in Web Development</span>
                </>
              ) : (
                <>
                  <span className="block">Proyectos Destacados</span>
                  <span className="block text-white/90">de Desarrollo Web</span>
                </>
              )}
            </h2>
          </motion.div>

          {/* Carousel Arrows & Counter */}
          {featuredProjects.length > 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 shrink-0 self-start md:self-end"
            >
              <span className="text-white/60 font-mono text-sm font-semibold mr-2">
                {String(currentSlide + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={scrollPrev}
                aria-label={language === "en" ? "Previous featured project" : "Proyecto destacado anterior"}
                className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 active:scale-95 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-md hover:border-white/30 cursor-pointer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label={language === "en" ? "Next featured project" : "Siguiente proyecto destacado"}
                className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 active:scale-95 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-md hover:border-white/30 cursor-pointer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Embla Carousel Viewport (Single-view) */}
        <div
          ref={emblaRef}
          className="overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-3xl"
          style={{ touchAction: "pan-y" }}
        >
          <div className="flex">
            {featuredProjects.map((featuredProject, index) => (
              <div
                key={featuredProject.slug || index}
                className="min-w-0 flex-[0_0_100%]"
              >
                <Link
                  href={featuredProject.link}
                  className="block group"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  draggable={false}
                >
                  <div className="relative rounded-3xl border border-white/10 bg-card/30 backdrop-blur-md overflow-hidden flex flex-col lg:flex-row shadow-[0_0_50px_rgba(0,0,0,0.35)] transition-all duration-500 hover:border-white/20">
                    {/* Image Section */}
                    <div className="relative w-full lg:w-[58%] shrink-0 overflow-hidden bg-neutral-900">
                      <div className="w-full h-full relative aspect-[16/10]">
                        <Image
                          src={featuredProject.image}
                          alt={language === "en" ? featuredProject.titleEn : featuredProject.titleEs}
                          fill
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-103"
                          priority={index === 0}
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 lg:from-transparent via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 sm:p-8 lg:p-12 w-full lg:w-[42%] flex flex-col justify-between relative bg-gradient-to-br from-white/[0.03] to-transparent">
                      <div>
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="text-white/50 font-mono text-xs uppercase">
                            {featuredProject.month} {featuredProject.year}
                          </span>
                          {featuredProject.country && (
                            <span className="text-blue-400 font-mono text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                              {featuredProject.country} {featuredProject.city ? `• ${featuredProject.city}` : ""}
                            </span>
                          )}
                          {featuredProject.liveUrl && (
                            <span className="text-emerald-400 font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                              {featuredProject.liveUrl.replace("https://", "").replace(/\/$/, "")}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-title text-white mb-4 group-hover:text-white/90 transition-colors duration-300">
                          {language === "en" ? featuredProject.titleEn : featuredProject.titleEs}
                        </h3>

                        {/* Description */}
                        <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 font-mono">
                          {language === "en" ? featuredProject.descEn : featuredProject.descEs}
                        </p>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featuredProject.tech?.map((tech: string) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-mono border border-white/15 rounded-full text-white/90 bg-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* View Project CTA */}
                      <div className="flex items-center gap-3 text-white font-title text-base sm:text-lg uppercase tracking-wide group-hover:text-white/80 transition-colors duration-300 pt-4 border-t border-white/10 mt-4">
                        <span>{dictionary.common.viewProject}</span>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 border border-white/10 transition-colors duration-300">
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {featuredProjects.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {featuredProjects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`Ir al slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx
                    ? "w-10 bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                    : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
