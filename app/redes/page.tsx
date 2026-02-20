"use client"

import { m as motion } from "framer-motion"
import { ArrowRight, Globe, Instagram, MessageCircle, Code2, Briefcase, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { projects } from "@/lib/projects"
import { useCursor } from "@/context/cursor-context"
import { useState, useEffect } from "react"

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        {...props}
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.61-5.66-.21-2.07.41-4.2 1.7-5.75 1.57-1.92 4.1-3 6.57-2.67v4.06c-1.25-.11-2.55.15-3.56.91-1.15.86-1.74 2.37-1.43 3.82.26 1.48 1.44 2.74 2.87 3.12 1.43.38 3.04.14 4.19-.8 1.09-.85 1.63-2.18 1.6-3.55.06-5.83.04-11.66.03-17.49h4.1z" />
    </svg>
)

export default function RedesPage() {
    const { setCursorVariant } = useCursor()

    // Almacenamos los proyectos aleatorios en el state para evitar Hydration Errors (SSR / CSR mismatches)
    const [topProjects, setTopProjects] = useState<typeof projects>([])

    useEffect(() => {
        // Ordenamos aleatoriamente todos los proyectos y obtenemos 4
        const shuffled = [...projects].sort(() => 0.5 - Math.random())
        setTopProjects(shuffled.slice(0, 4))
    }, [])

    const socialLinks = [
        {
            name: "Instagram",
            desc: "@kytweb_co",
            url: "https://www.instagram.com/kytweb_co/",
            icon: Instagram,
            color: "from-pink-500 to-orange-400"
        },
        {
            name: "TikTok",
            desc: "@kytweb",
            url: "https://tiktok.com/@kytweb",
            icon: TikTokIcon,
            color: "from-black via-gray-800 to-black border border-gray-700"
        },
        {
            name: "WhatsApp",
            desc: "Hablemos de tu proyecto",
            url: "https://wa.me/573116360057", // Replace with real later or just keep general
            icon: MessageCircle,
            color: "from-green-500 to-emerald-400"
        },
        {
            name: "Sitio Web",
            desc: "www.kytcode.lat",
            url: "https://kytcode.lat",
            icon: Globe,
            color: "from-blue-600 to-cyan-400"
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring" as const, stiffness: 100 }
        }
    }

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl opacity-30 pointer-events-none">
                <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">


                {/* Intro */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-white font-title mb-4 leading-tight">
                        ¿Estás curioseando <br className="hidden md:block" /> sobre <span className="text-white ">K&T</span>?
                    </h1>
                    <p className="text-neutral-400 font-mono text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                        Somos una <strong>agencia de desarrollo web élite</strong>. Especializados en crear software a la medida, sitios corporativos inmersivos con alto enfoque en experiencia de usuario y rendimiento. Elevamos marcas globalmente desde Colombia.
                    </p>
                </motion.div>

                {/* Social Links Grid */}
                <motion.div
                    className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {socialLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onMouseEnter={() => setCursorVariant("hover")}
                            onMouseLeave={() => setCursorVariant("default")}
                            className={`relative overflow-hidden group rounded-2xl p-[1px] ${link.color.includes('border') ? link.color : 'bg-gradient-to-br ' + link.color}`}
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-white" />
                            <div className="bg-card/95 backdrop-blur-sm p-4 rounded-2xl h-full flex items-center gap-4 transition-colors group-hover:bg-card/80">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${link.color} shadow-lg`}>
                                    <link.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold font-title text-lg">{link.name}</h3>
                                    <p className="text-neutral-400 font-mono text-xs">{link.desc}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Top Projects Section */}
                <motion.div
                    className="w-full text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <Briefcase className="w-5 h-5 text-neutral-400" />
                        <h2 className="text-2xl font-bold text-white font-title">Proyectos Destacados</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                        {topProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link href={`/projects/${project.slug}`} className="block group">
                                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3 border border-border">
                                        <Image
                                            src={project.images.hero}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            unoptimized={project.slug === 'estrella-de-david'}
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-white text-black px-4 py-2 rounded-full font-mono text-xs font-bold font-title">
                                                Ver Proyecto
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-white font-bold text-lg font-title group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-400 text-xs font-mono line-clamp-1">
                                        {project.shortDescription}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white font-mono text-sm transition-colors"
                        >
                            <Code2 className="w-4 h-4" />
                            Volver al Inicio
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <div className="text-center mt-16 text-xs text-muted-foreground font-mono">
                <Link href="https://www.kytcode.lat" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                    Desarrollado por K&T <Heart className="w-3 h-3 text-white fill-white" />
                </Link>
            </div>
        </main>
    )
}
