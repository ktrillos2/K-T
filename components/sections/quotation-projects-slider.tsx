"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { m as motion } from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { projects } from "@/lib/projects"

export default function QuotationProjectsSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full max-w-full my-12 group/slider">
      <div className="flex items-center justify-between mb-8 px-2">
        <h3 className="text-2xl font-bold font-title text-white">Casos de Éxito y Proyectos</h3>
        <div className="hidden sm:flex items-center gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-2 -mx-2 hide-scrollbar w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex-none w-[280px] sm:w-[320px] snap-center sm:snap-start group cursor-pointer"
          >
            <Link href={`/projects/${project.slug}`} target="_blank" className="block h-full">
              <div className="relative h-[400px] sm:h-[450px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 group-hover:border-white/20 transition-all duration-300 flex flex-col">
                <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
                  <Image
                    src={project.images.hero}
                    alt={project.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 280px, 320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-4 text-white/50 text-6xl font-black tracking-tighter mix-blend-overlay">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                
                <div className="flex flex-col flex-grow p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-white/60 uppercase tracking-wider">{project.category}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 leading-tight">{project.title}</h4>
                  <p className="text-sm text-white/70 line-clamp-3 mb-4 flex-grow">{project.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] py-1 px-2 rounded-full border border-white/10 bg-white/5 text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Mobile hint */}
      <div className="sm:hidden flex items-center justify-center mt-2 text-white/40 text-xs gap-2">
        <span>Desliza para ver más</span>
        <ChevronRight className="w-3 h-3" />
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  )
}
