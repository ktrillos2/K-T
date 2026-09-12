"use client"

import { useState } from "react"
import { m as motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Code2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"

interface PortfolioGridProps {
  projects: any[]
  dictionary: any
  setCursorVariant: (variant: "default" | "text" | "hover") => void
}

const categoryTranslationsEn: Record<string, string> = {
  "Todos": "All Projects",
  "Consultoría / Tecnología": "Consulting & Tech",
  "Consultoría / B2B": "Consulting & B2B",
  "Salud Mental y Bienestar": "Healthcare & Wellness",
  "Inmobiliaria / Real Estate": "Real Estate / PropTech",
  "Ingeniería / Construcción": "Engineering & Construction",
  "E-commerce B2B": "B2B E-commerce",
  "Sitio Corporativo": "Corporate Website",
  "Catálogo Digital": "Digital Catalog",
  "Comercio Electrónico": "E-Commerce",
  "Fintech / SaaS": "Fintech & SaaS",
  "Gaming / Esports": "Gaming & Esports",
}

const monthTranslationsEn: Record<string, string> = {
  "Enero": "Jan",
  "Febrero": "Feb",
  "Marzo": "Mar",
  "Abril": "Apr",
  "Mayo": "May",
  "Junio": "Jun",
  "Julio": "Jul",
  "Agosto": "Aug",
  "Septiembre": "Sep",
  "Octubre": "Oct",
  "Noviembre": "Nov",
  "Diciembre": "Dec",
}

const projectTranslationsEn: Record<string, { title?: string; desc: string; category?: string }> = {
  "gmx-gaming": {
    title: "GMX Gaming",
    desc: "Custom esports and tournament web platform with automated operations, brackets, and tailored high-speed gaming UI.",
    category: "Gaming & Esports",
  },
  "qvareli": {
    title: "Qvareli",
    desc: "B2B corporate web platform engineered for high conversion, authoritative positioning and instant load speeds.",
    category: "Consulting & Tech",
  },
  "psicowork": {
    title: "Psicowork",
    desc: "Clinical psychology and corporate wellness platform with automated booking workflows and warm UI.",
    category: "Healthcare & Wellness",
  },
  "brambila-inmobiliaria": {
    title: "Brambila's Real Estate",
    desc: "Dynamic proptech web platform with instant property sheets, search filters and social sharing automation.",
    category: "Real Estate / PropTech",
  },
  "nosky-group": {
    title: "Nosky Group",
    desc: "Precision engineering, aerial photogrammetry, and LiDAR scanning corporate platform.",
    category: "Engineering & Construction",
  },
  "telas-real": {
    title: "Telas Real",
    desc: "Enterprise B2B headless e-commerce for premium textiles with +850 products catalog and sub-second load times.",
    category: "B2B E-commerce",
  },
  "san-roqueros": {
    title: "San Roque",
    desc: "High-impact brand platform and online booking engine for premium pet care and veterinary grooming.",
    category: "Corporate Website",
  },
  "eklipse-home-textil": {
    title: "Eklipse Home Textil",
    desc: "Interactive digital showcase for luxury window coverings and motorized home decor with direct consultation.",
    category: "Digital Catalog",
  },
}

export default function PortfolioGrid({ projects, dictionary, setCursorVariant }: PortfolioGridProps) {
  const { language } = useLanguage()
  const isEn = language === "en"
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const allKey = "__all__"
  const allLabel = isEn ? "All Projects" : "Todos los Proyectos"
  
  // Extraer todas las categorías únicas originales
  const rawCategories = Array.from(new Set(projects.map(p => p.category).filter(Boolean)))
  const [activeCategory, setActiveCategory] = useState(allKey)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const getCategoryDisplay = (cat: string) => {
    if (cat === allKey) return allLabel
    return isEn ? (categoryTranslationsEn[cat] || cat) : cat
  }

  const filteredProjects = activeCategory === allKey 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <div className="w-full">
      {/* Category Dropdown Filter */}
      {rawCategories.length > 1 && (
        <div className="flex justify-center mb-12 lg:mb-16 relative z-30">
          <div className="relative w-full max-w-xs md:max-w-md">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className="w-full relative overflow-hidden flex items-center justify-between px-6 py-4 bg-zinc-950 text-white font-mono font-bold text-sm md:text-base rounded-xl border-2 border-white/20 hover:border-white/50 hover:bg-zinc-900 transition-all duration-300 uppercase tracking-wider group shadow-2xl"
            >
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-0" />
              <span className="relative z-10 truncate pr-4">{getCategoryDisplay(activeCategory)}</span>
              <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} className="relative z-10 shrink-0">
                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-zinc-950 border-2 border-white/20 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 flex flex-col"
                >
                  <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-0" />
                  <div className="max-h-[60vh] overflow-y-auto relative z-10">
                    {[allKey, ...rawCategories].map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setActiveCategory(category)
                          setIsDropdownOpen(false)
                        }}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                        className={`w-full text-left px-6 py-4 font-mono text-sm md:text-base uppercase tracking-wider transition-all duration-200 border-b border-white/5 last:border-0 ${
                          activeCategory === category
                            ? "bg-white text-black font-bold"
                            : "text-white/60 hover:bg-white/10 hover:text-white hover:pl-8"
                        }`}
                      >
                        {getCategoryDisplay(category)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Grid Layout */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredIndex === index
            const enData = isEn ? projectTranslationsEn[project.slug] : null
            const displayTitle = isEn
              ? (enData?.title || project.titleEn || project.title)
              : (project.titleEs || project.title)
            const displayDesc = isEn
              ? (enData?.desc || project.descEn || project.shortDescription || project.description)
              : (project.descEs || project.shortDescription || project.description)
            const displayCategory = isEn
              ? (enData?.category || (project.category ? categoryTranslationsEn[project.category] || project.category : null))
              : project.category
            const displayMonth = isEn && project.month
              ? (monthTranslationsEn[project.month] || project.month)
              : project.month
            
            return (
              <motion.div
                layout
                key={project.id || project.slug || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-neutral-900/50 border border-white/5 hover:border-white/20 transition-colors h-full"
                onMouseEnter={() => {
                  setHoveredIndex(index)
                  setCursorVariant("hover")
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null)
                  setCursorVariant("default")
                }}
              >
                {/* Project Image */}
                <Link href={project.link || `/projects/${project.slug}`} className="block relative w-full aspect-[16/9] overflow-hidden bg-neutral-950">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={displayTitle || "Project"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-contain object-top transition-all duration-700 ease-out ${
                        isHovered ? "scale-105 opacity-70" : "scale-100 opacity-90"
                      }`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                      <Code2 className="w-12 h-12 text-white/20" />
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                  
                  {/* Category Badge */}
                  {displayCategory && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white/80 text-[10px] uppercase tracking-wider font-mono rounded border border-white/10">
                        {displayCategory}
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay Button */}
                  <div 
                    className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-500 ${
                      isHovered ? "opacity-100 backdrop-blur-[2px]" : "opacity-0"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center transform transition-transform duration-500 hover:scale-110">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6 z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold font-title text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">
                      {displayTitle}
                    </h3>
                    {(project.year || displayMonth) && (
                      <span className="text-white/40 font-mono text-sm shrink-0">
                        {displayMonth} {project.year}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-white/60 text-sm line-clamp-2 flex-grow mb-6">
                    {displayDesc}
                  </p>
                  
                  {/* Tech Stack */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.slice(0, 4).map((t: string) => (
                        <span key={t} className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-xs font-mono text-white/30 px-2 py-1">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
