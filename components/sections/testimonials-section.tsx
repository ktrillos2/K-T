"use client"

import { useState } from "react"
import { m as motion } from "framer-motion"
import { MessageSquare } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import dynamic from "next/dynamic"

const TestimonialsCarousel = dynamic(() => import("./testimonials-carousel"), { ssr: false })
const TestimonialModal = dynamic(() => import("@/components/modals/testimonial-modal"))

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
    const [hasOpened, setHasOpened] = useState(false)
    // Use initialTestimonials if available
    const testimonials = initialTestimonials.length > 0 ? initialTestimonials : []

    return (
        <section id="testimonios" className="relative py-20 lg:py-32 overflow-hidden -scroll-mt-12 lg:-scroll-mt-[180px]">
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
                <TestimonialsCarousel testimonials={testimonials} dictionary={dictionary} />

                {/* CTA Button */}
                <div className="mt-16 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setHasOpened(true)
                            setIsModalOpen(true)
                        }}
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

            {hasOpened && <TestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </section>
    )
}
