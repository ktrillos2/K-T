"use client"

import { useState } from "react"
import { m as motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Code2 } from "lucide-react"

interface PortfolioGridProps {
  projects: any[]
  dictionary: any
  setCursorVariant: (variant: any) => void
}

export default function PortfolioGrid({ projects, dictionary, setCursorVariant }: PortfolioGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Extraer todas las categorías únicas
  const categories = ["Todos", ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))]
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filteredProjects = activeCategory === "Todos" 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <div className="w-full">
      {/* Category Dropdown Filter */}
      {categories.length > 1 && (
        <div className="flex justify-center mb-12 lg:mb-16 relative z-30">
          <div className="relative w-full max-w-xs md:max-w-md">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className="w-full relative overflow-hidden flex items-center justify-between px-6 py-4 bg-zinc-950 text-white font-mono font-bold text-sm md:text-base rounded-xl border-2 border-white/20 hover:border-white/50 hover:bg-zinc-900 transition-all duration-300 uppercase tracking-wider group shadow-2xl"
            >
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-0" />
              <span className="relative z-10 truncate pr-4">{activeCategory}</span>
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
                    {categories.map((category) => (
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
                        {category}
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
                <Link href={project.link || `/projects/${project.slug}`} className="block relative w-full aspect-[4/3] overflow-hidden bg-neutral-950">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.titleEs || project.title || "Project"}
                      fill
                      className={`object-cover transition-all duration-700 ease-out ${
                        isHovered ? "scale-105 opacity-60" : "scale-100 opacity-80"
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
                  {project.category && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white/80 text-[10px] uppercase tracking-wider font-mono rounded border border-white/10">
                        {project.category}
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
                      {project.titleEs || project.title}
                    </h3>
                    {(project.year || project.month) && (
                      <span className="text-white/40 font-mono text-sm shrink-0">
                        {project.month} {project.year}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-white/60 text-sm line-clamp-2 flex-grow mb-6">
                    {project.descEs || project.shortDescription || project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.slice(0, 4).map((t: string, i: number) => (
                        <span key={`${t}-${i}`} className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded">
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
