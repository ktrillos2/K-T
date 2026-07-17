"use client"

import { m as motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function CxellenceSection({ initialProjects = [] }: { initialProjects?: any[] }) {
  const { language, dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()

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
  }));

  const featuredProject = allProjects.find(
    (proj) =>
      proj.titleEn?.toLowerCase().includes("cxellence") ||
      proj.titleEs?.toLowerCase().includes("cxellence")
  );

  if (!featuredProject) return null;

  return (
    <section id="cxellence" className="relative pt-8 lg:pt-10 pb-8 overflow-hidden cv-auto">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-title text-white">
            {language === "en" ? "Featured Project" : "Proyecto Destacado"}
          </h2>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              href={featuredProject.link} 
              className="block group"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              draggable={false}
            >
              <div className="relative rounded-3xl border border-white/10 bg-card/30 backdrop-blur-md overflow-hidden flex flex-col lg:flex-row shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-white/20">
                {/* Image Section (Aspect Ratio Controlled to avoid cropping) */}
                <div className="relative w-full lg:w-[60%] shrink-0 overflow-hidden">
                  <motion.div 
                    className="w-full h-full relative aspect-[16/10] lg:aspect-[16/10]"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <Image
                      src={featuredProject.image}
                      alt={language === "en" ? featuredProject.titleEn : featuredProject.titleEs}
                      fill
                      className="object-cover object-top"
                      unoptimized
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 lg:from-transparent via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 w-full lg:w-[45%] flex flex-col justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <span className="inline-block text-white/50 font-mono text-sm mb-4 capitalize">
                        {featuredProject.month} {featuredProject.year}
                      </span>
                      <h3 className="text-3xl lg:text-5xl font-bold font-title text-white mb-6 group-hover:text-white/90 transition-colors duration-300">
                        {language === "en" ? featuredProject.titleEn : featuredProject.titleEs}
                      </h3>
                      <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-8 font-mono">
                        {language === "en" ? featuredProject.descEn : featuredProject.descEs}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8 lg:mb-12">
                        {featuredProject.tech?.map((tech: string, i: number) => (
                          <span
                            key={`${tech}-${i}`}
                            className="px-3 py-1.5 text-xs font-mono border border-white/20 rounded-full text-white/90 bg-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-white font-title text-lg uppercase tracking-wide group-hover:text-white/80 transition-colors duration-300 mt-auto">
                      <span>{dictionary.common.viewProject}</span>
                      <motion.div 
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 border border-white/10 transition-colors duration-300"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
      </div>
    </section>
  )
}
