"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Star, CheckCircle, Search, ChevronDown, ImageIcon } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { projects } from "@/lib/projects"
import Image from "next/image"

interface TestimonialModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function TestimonialModal({ isOpen, onClose }: TestimonialModalProps) {
    const { dictionary, language } = useLanguage()
    const [step, setStep] = useState(1) // 1: Form, 2: Success
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form State
    const [selectedProject, setSelectedProject] = useState("")
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [role, setRole] = useState("") // Fixed: Added missing state
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [projectSearch, setProjectSearch] = useState("")

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(projectSearch.toLowerCase())
    )

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedProject || rating === 0 || !message || !name) return

        setIsSubmitting(true)

        // Default role logic
        const finalRole = role.trim() === "" ? (language === 'es' ? "Dueño del sitio web" : "Website Owner") : role

        // Create FormData
        const formData = new FormData()
        formData.append('project', selectedProject)
        formData.append('rating', rating.toString())
        formData.append('message', message)
        formData.append('name', name || "Anónimo")
        formData.append('role', finalRole)
        if (image) {
            formData.append('image', image)
        }

        try {
            const response = await fetch('/api/testimonials', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit testimonial')
            }

            setStep(2)
        } catch (error) {
            console.error('Submission error:', error)
            // Ideally show error to user, but for now just log it
            // Could add an error state here
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        setStep(1)
        setSelectedProject("")
        setRating(0)
        setMessage("")
        setName("")
        setImage(null)
        setImagePreview(null)
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/5">
                                <h3 className="text-xl font-bold font-title text-white">
                                    {step === 1 ? dictionary.testimonials.modalTitle : ""}
                                </h3>
                                <button
                                    onClick={handleClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                {step === 1 ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">

                                        {/* Project Selector */}
                                        <div className="space-y-2 relative">
                                            <label className="text-sm font-mono text-white/80">{dictionary.testimonials.selectProject}</label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 flex items-center justify-between text-white hover:border-white/20 transition-colors"
                                                >
                                                    <span className={selectedProject ? "text-white" : "text-white/40"}>
                                                        {selectedProject || dictionary.testimonials.projectPlaceholder}
                                                    </span>
                                                    <ChevronDown className="w-4 h-4 text-white/60" />
                                                </button>

                                                <AnimatePresence>
                                                    {isProjectDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 5 }}
                                                            className="absolute top-full left-0 right-0 mt-2 bg-[#111] border border-white/10 rounded-xl overflow-hidden z-20 shadow-xl max-h-60 flex flex-col"
                                                        >
                                                            <div className="p-2 border-b border-white/5">
                                                                <div className="flex items-center px-3 py-2 bg-white/5 rounded-lg">
                                                                    <Search className="w-4 h-4 text-white/40 mr-2" />
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Search..."
                                                                        value={projectSearch}
                                                                        onChange={(e) => setProjectSearch(e.target.value)}
                                                                        className="bg-transparent border-none outline-none text-sm text-white placeholder-white/20 w-full"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="overflow-y-auto flex-1 p-1">
                                                                {filteredProjects.map((project) => (
                                                                    <button
                                                                        key={project.id}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelectedProject(project.title)
                                                                            setIsProjectDropdownOpen(false)
                                                                        }}
                                                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm text-white/80 hover:text-white transition-colors flex items-center gap-3"
                                                                    >
                                                                        <div className="relative w-8 h-8 rounded-md overflow-hidden flex-shrink-0 bg-white/10">
                                                                            {/* Project thumbnail if available, else initial */}
                                                                            <Image
                                                                                src={project.images.hero}
                                                                                alt={project.title}
                                                                                fill
                                                                                className="object-cover"
                                                                            />
                                                                        </div>
                                                                        {project.title}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        {/* Role Input (Optional) */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-mono text-white/80">{dictionary.testimonials.role}</label>
                                            <input
                                                type="text"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                                placeholder={dictionary.testimonials.rolePlaceholder}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white placeholder-white/30 focus:border-white/30 focus:outline-none transition-colors"
                                            />
                                        </div>

                                        {/* Rating */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-mono text-white/80">{dictionary.testimonials.rating}</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        className="group relative"
                                                    >
                                                        <Star
                                                            className={`w-8 h-8 transition-all duration-200 ${star <= rating
                                                                ? "fill-yellow-500 text-yellow-500 scale-110"
                                                                : "text-white/20 hover:text-yellow-500/50"
                                                                }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-mono text-white/80">{dictionary.testimonials.message}</label>
                                            <textarea
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder={dictionary.testimonials.messagePlaceholder}
                                                rows={4}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:border-white/30 focus:outline-none transition-colors resize-none"
                                            />
                                        </div>

                                        {/* Image Upload */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-mono text-white/80">{dictionary.testimonials.image}</label>
                                            <div className="flex items-center gap-4">
                                                <label className="cursor-pointer relative group">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="hidden"
                                                    />
                                                    <div className="w-16 h-16 rounded-xl border border-dashed border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors overflow-hidden relative bg-white/5">
                                                        {imagePreview ? (
                                                            <Image
                                                                src={imagePreview}
                                                                alt="Preview"
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <ImageIcon className="w-6 h-6 text-white/40" />
                                                        )}
                                                    </div>
                                                </label>
                                                {image ? (
                                                    <div className="text-sm">
                                                        <p className="text-white font-medium truncate max-w-[200px]">{image.name}</p>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setImage(null)
                                                                setImagePreview(null)
                                                            }}
                                                            className="text-red-400 hover:text-red-300 text-xs mt-1"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-white/40">JPG, PNG up to 5MB</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !selectedProject || rating === 0 || !message}
                                            className="w-full h-14 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            ) : (
                                                dictionary.testimonials.submit
                                            )}
                                        </button>

                                    </form>
                                ) : (
                                    // Success State
                                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", damping: 15 }}
                                            className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center"
                                        >
                                            <CheckCircle className="w-10 h-10 text-green-500" />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-2xl font-bold font-title text-white mb-2">
                                                {dictionary.testimonials.successTitle}
                                            </h3>
                                            <p className="text-white/60">
                                                {dictionary.testimonials.successMessage}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleClose}
                                            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium"
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
