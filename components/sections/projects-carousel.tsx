"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { m as motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { ArrowUpRight, MousePointer2 } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

// Animation simulating a mouse click
const ClickAnimation = ({ text }: { text: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
        animate={{
            opacity: [1, 1, 1, 1],
            scale: [1, 0.9, 1, 1], // Click effect
            x: [20, 0, 0, 20], // Move in and out
            y: [20, 0, 0, 20]
        }}
        transition={{
            duration: 2,
            repeat: Infinity,
            times: [0, 0.2, 0.3, 1], // Quick click at 0.2-0.3
            repeatDelay: 1
        }}
        className="absolute bottom-8 right-8 z-[999] pointer-events-none flex flex-col items-center gap-2"
    >
        <motion.span
            animate={{ scale: [1, 0.9, 1, 1] }}
            transition={{
                duration: 2,
                repeat: Infinity,
                times: [0, 0.2, 0.3, 1],
                repeatDelay: 1
            }}
            className="text-white font-title text-sm font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap relative z-[1002]"
        >
            {text}
        </motion.span>
        <div className="relative">
            <motion.div
                animate={{ scale: [1, 2, 0], opacity: [0.8, 0, 0] }} // Ripple effect
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="absolute -inset-4 bg-white/40 rounded-full z-[1000]"
            />
            <MousePointer2 className="w-8 h-8 text-white fill-white relative z-[1001]" />
        </div>
    </motion.div>
)

interface ProjectsCarouselProps {
    projects: any[]
    language: "en" | "es"
    dictionary: any
    setCursorVariant: (variant: "default" | "hover" | "text") => void
}

export default function ProjectsCarousel({ projects, language, setCursorVariant, dictionary }: ProjectsCarouselProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false, dragFree: false }, [
        Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true }),
    ])

    const onSelect = useCallback((api: any) => {
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

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="flex-[0_0_90%] md:flex-[0_0_60%] lg:flex-[0_0_45%] min-w-0 pl-6 md:pl-10"
                    >
                        <ProjectCard
                            project={project}
                            index={index}
                            isActive={activeIndex === index}
                            isCurrent={currentSlide === index}
                            onHover={() => setActiveIndex(index)}
                            onLeave={() => setActiveIndex(null)}
                            language={language}
                            setCursorVariant={setCursorVariant}
                            dictionary={dictionary}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

function ProjectCard({ project, index, isActive, isCurrent, onHover, onLeave, language, setCursorVariant, dictionary }: any) {
    const cardRef = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        onLeave()
        setCursorVariant("default")
    }

    const title = language === "en" ? project.titleEn : project.titleEs
    const desc = language === "en" ? project.descEn : project.descEs

    const CardContent = (
        <motion.div
            ref={cardRef}
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
                onHover()
                setCursorVariant("hover")
            }}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
            }}
        >
            <motion.div
                className="relative group h-full"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm flex flex-col">
                    <div className="relative h-52 lg:h-80 w-full overflow-hidden shrink-0">
                        {project.imageMobile ? (
                            <>
                                <div className="w-full h-full lg:hidden block relative">
                                    <Image
                                        src={project.imageMobile}
                                        alt={title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover lg:object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div className="w-full h-full hidden lg:block relative">
                                    <motion.div
                                        className="w-full h-full relative"
                                        animate={{ scale: isActive ? 1.05 : 1 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    >
                                        <Image
                                            src={project.image}
                                            alt={title}
                                            fill
                                            sizes="(max-width: 1200px) 50vw, 50vw"
                                            className="object-cover object-top"
                                        />
                                    </motion.div>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full relative">
                                <motion.div
                                    className="w-full h-full relative"
                                    animate={{ scale: isActive ? 1.05 : 1 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    <Image
                                        src={project.image}
                                        alt={title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                        className="object-cover object-top"
                                    />
                                </motion.div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
                            <span className="text-xs font-mono text-white capitalize">{project.month} {project.year}</span>
                        </div>
                        <AnimatePresence>
                            {isCurrent && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ClickAnimation text={language === "en" ? "Click here" : "Clic aquí"} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col flex-grow relative">
                        <motion.span
                            className="text-6xl font-bold font-title text-white/5 absolute top-4 right-4"
                            animate={{ opacity: isActive ? 0.1 : 0.03 }}
                        >
                            0{index + 1}
                        </motion.span>
                        <motion.h3
                            className="text-xl lg:text-3xl font-bold font-title mb-4 relative z-10"
                            animate={{ x: isActive ? 10 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {title}
                        </motion.h3>
                        <p className="text-white font-mono text-sm relative z-10 flex-grow">{desc}</p>
                        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                            {project.tech.slice(0, 3).map((tech: string) => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 text-[10px] lg:text-xs font-mono border border-white/20 rounded-full text-white"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <motion.div
                            className="flex items-center gap-2 text-white font-mono text-sm relative z-10"
                            animate={{ x: isActive ? 10 : 0, opacity: isActive ? 1 : 0.6 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span>{dictionary.common.viewProject}</span>
                            <motion.div animate={{ x: isActive ? 5 : 0, y: isActive ? -5 : 0 }}>
                                <ArrowUpRight className="w-4 h-4" />
                            </motion.div>
                        </motion.div>
                    </div>
                    <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        animate={{
                            boxShadow: isActive
                                ? "inset 0 0 0 1px rgba(255,255,255,0.2), 0 0 40px rgba(255,255,255,0.05)"
                                : "inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 0px rgba(255,255,255,0)",
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </motion.div>
        </motion.div>
    )

    if (project.link) {
        return (
            <Link href={project.link} className="block outline-none h-full">
                {CardContent}
            </Link>
        )
    }

    return CardContent
}
