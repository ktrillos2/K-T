"use client"

import { m as motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
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

interface TestimonialsCarouselProps {
    testimonials: Testimonial[]
    dictionary: any
}

export default function TestimonialsCarousel({ testimonials, dictionary }: TestimonialsCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
        Autoplay({ delay: 5000, stopOnInteraction: true })
    ])

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
    const scrollNext = () => emblaApi && emblaApi.scrollNext()

    return (
        <>
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
                                className="group h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors flex flex-col relative overflow-hidden"
                            >
                                {/* Project Badge */}
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

            {/* Navigation Buttons */}
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
        </>
    )
}
