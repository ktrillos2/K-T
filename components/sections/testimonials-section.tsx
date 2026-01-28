"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useLanguage } from "@/context/language-context"
import TestimonialModal from "@/components/modals/testimonial-modal"
import Image from "next/image"



import { urlFor } from "@/sanity/lib/image"

interface Testimonial {
    _id: string
    name: string
    role: string
    content: string
    rating: number
    project: string
    projectUrl?: string
    image?: any
}

interface TestimonialsSectionProps {
    initialTestimonials?: Testimonial[]
}

export default function TestimonialsSection({ initialTestimonials = [] }: TestimonialsSectionProps) {
    const { dictionary } = useLanguage()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
        Autoplay({ delay: 5000, stopOnInteraction: true })
    ])

    // Use initialTestimonials if available, otherwise fallback to empty (or mock if strictly needed for dev, but removing mock as planned)
    const testimonials = initialTestimonials.length > 0 ? initialTestimonials : []

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
    const scrollNext = () => emblaApi && emblaApi.scrollNext()

    return (
        <section id="testimonios" className="relative py-20 lg:py-32 overflow-hidden -scroll-mt-24 lg:-scroll-mt-[150px]">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-neutral-950" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-white font-mono text-sm"
                    >
                        {dictionary.testimonials.subtitle}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-title text-white"
                    >
                        {dictionary.testimonials.title}
                    </motion.h2>
                </div>

                {/* Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4">
                        {testimonials.map((testimonial, index) => (
                            <div key={testimonial._id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 min-w-0">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    // Use 'group' to enable hover effects
                                    className="group h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors flex flex-col relative overflow-hidden"
                                >
                                    {/* Project Badge - Visible, eye-catching */}
                                    <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-4 py-1.5 rounded-bl-xl font-mono uppercase tracking-wider z-10">
                                        {testimonial.project}
                                    </div>

                                    <div className="flex gap-1 mb-6 mt-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-500 text-yellow-500" : "text-white/20"}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Text is now pure white and slightly larger for readability */}
                                    <p className="text-white font-mono text-sm leading-relaxed mb-8 flex-grow">
                                        "{testimonial.content}"
                                    </p>

                                    <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-4 justify-between">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-neutral-800 relative ring-2 ring-white/10">
                                                {testimonial.image ? (
                                                    <Image
                                                        src={urlFor(testimonial.image).width(100).height(100).url()}
                                                        alt={testimonial.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-white/40 text-xs font-bold font-mono">
                                                        {testimonial.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-white font-bold font-title text-sm truncate">{testimonial.name}</h4>
                                                <p className="text-white/40 text-xs font-mono truncate">{testimonial.role}</p>
                                            </div>
                                        </div>

                                        {testimonial.projectUrl && (
                                            <a
                                                href={testimonial.projectUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-shrink-0 px-3 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2"
                                            >
                                                {dictionary.testimonials.visitProject}
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons - Centered below carousel */}
                <div className="flex justify-center gap-4 mt-12">
                    <button
                        onClick={scrollPrev}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* CTA Button */}
                <div className="mt-16 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl flex items-center gap-3 overflow-hidden outline-none"
                    >
                        <span className="relative z-10 font-title flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            {dictionary.testimonials.leaveReview}
                        </span>
                        <div className="absolute inset-0 bg-neutral-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </motion.button>
                </div>
            </div>

            <TestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}
