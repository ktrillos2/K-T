"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { m as motion } from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"

export default function QuotationProjectsSlider({ projects = [] }: { projects?: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full my-12 group/slider overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
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

      {/* Scrollable container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.5) }}
            className="flex-none w-[260px] sm:w-[280px] md:w-[300px] snap-start group cursor-pointer"
          >
            <Link href={`/projects/${project.slug}`} target="_blank" className="block h-full">
              <div className="relative h-[320px] sm:h-[340px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 group-hover:border-white/20 transition-all duration-300 flex flex-col">
                {/* Image */}
                <div className="relative h-[160px] sm:h-[180px] w-full shrink-0 overflow-hidden">
                  <Image
                    src={project.hero}
                    alt={project.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 260px, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-grow p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider leading-tight">{project.category}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors shrink-0" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1.5 leading-tight">{project.title}</h4>
                  <p className="text-xs text-white/60 line-clamp-2">{project.shortDescription}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Mobile hint */}
      <div className="sm:hidden flex items-center justify-center mt-3 text-white/40 text-xs gap-1.5">
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
