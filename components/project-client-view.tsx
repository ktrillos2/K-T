"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, ExternalLink, Calendar, Layers, Globe } from "lucide-react"
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

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

    return (
        <main ref={containerRef} className="bg-background min-h-screen">
            {/* Navigation Back */}
            <div className="fixed top-24 left-6 z-50 mix-blend-difference hidden lg:block">
                <Link
                    href="/#work"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-sm uppercase tracking-wider">Volver</span>
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
                    <Image
                        src={project.images.hero}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                </motion.div>

                <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-end pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="flex flex-wrap gap-4 mb-6">
                            <span className="px-3 py-1 border border-white/20 rounded-full text-white/80 text-xs font-mono uppercase tracking-wider bg-black/30 backdrop-blur-md">
                                {project.category}
                            </span>
                            <span className="px-3 py-1 border border-white/20 rounded-full text-white/80 text-xs font-mono uppercase tracking-wider bg-black/30 backdrop-blur-md flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                {project.month} {project.year}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-title mb-6 leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light">
                            {project.shortDescription}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="relative z-20 bg-background py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* Sidebar / Info */}
                        <div className="lg:col-span-4 space-y-12">
                            <div>
                                <h3 className="text-white font-title text-xl mb-4 flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-primary" />
                                    Tecnologías
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-gray-300 text-sm font-mono"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-title text-xl mb-4 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary" />
                                    Sitio Web
                                </h3>
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors group"
                                    onMouseEnter={() => setCursorVariant("hover")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                >
                                    Visitar Sitio
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-white font-title mb-6">
                                    El Desafío
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    {project.content.challenge}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent rounded-full opacity-50" />
                                <h2 className="text-3xl md:text-4xl font-bold text-white font-title mb-6">
                                    La Solución
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    {project.content.solution}
                                </p>
                            </motion.div>

                            {project.content.seoFocus && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-white/5 border border-white/10 rounded-2xl p-8"
                                >
                                    <h3 className="text-2xl font-bold text-white font-title mb-4">
                                        Impacto SEO
                                    </h3>
                                    <p className="text-gray-300">
                                        {project.content.seoFocus}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project (Optional - loop or just footer) */}
            <section className="py-24 flex justify-center border-t border-white/10">
                <Link
                    href="/#work"
                    className="text-white/50 hover:text-white font-title text-2xl transition-colors"
                >
                    Ver Todos los Proyectos
                </Link>
            </section>
        </main>
    )
}
