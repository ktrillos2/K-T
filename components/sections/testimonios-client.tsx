"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { m as motion, AnimatePresence } from "framer-motion"
import {
  Star,
  CheckCircle,
  Search,
  ChevronDown,
  ImageIcon,
  Sparkles,
  ShieldCheck,
  Globe,
  ArrowRight,
  MessageSquarePlus,
  Share2,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import { fadeUpVariant, staggerContainer, cardDepthVariant } from "@/lib/animations"

interface CmsProject {
  _id: string
  title: string
  slug: string
  hero?: string
  category?: string
  client?: string
}

interface TestimonialItem {
  _id: string
  name: string
  role: string
  content: string
  rating: number
  project: string
  projectUrl?: string
  image?: any
}

interface TestimoniosClientProps {
  initialTestimonials: TestimonialItem[]
}

export default function TestimoniosClient({ initialTestimonials }: TestimoniosClientProps) {
  const { dictionary, language } = useLanguage()
  const { setCursorVariant } = useCursor()

  const [step, setStep] = useState<1 | 2>(1) // 1: Formulario, 2: Éxito
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cmsProjects, setCmsProjects] = useState<CmsProject[]>([])

  // Estado del formulario
  const [selectedProject, setSelectedProject] = useState("")
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false)
  const [projectSearch, setProjectSearch] = useState("")
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [message, setMessage] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Cargar proyectos disponibles para asociar el testimonio
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: CmsProject[]) => {
        if (Array.isArray(data)) {
          setCmsProjects(data)
        }
      })
      .catch(() => {
        setCmsProjects([])
      })
  }, [])

  const filteredProjects = cmsProjects.filter((p) =>
    p.title?.toLowerCase().includes(projectSearch.toLowerCase())
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) {
        alert(language === "es" ? "La imagen no debe superar los 5MB" : "Image size must be under 5MB")
        return
      }
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProject || rating === 0 || !message.trim()) return

    setIsSubmitting(true)
    const finalRole =
      role.trim() === ""
        ? language === "es"
          ? "Cliente / Dueño del proyecto"
          : "Client / Project Owner"
        : role

    const formData = new FormData()
    formData.append("project", selectedProject)
    formData.append("rating", rating.toString())
    formData.append("message", message.trim())
    formData.append("name", name.trim() || (language === "es" ? "Cliente Verificado" : "Verified Client"))
    formData.append("role", finalRole)
    if (image) {
      formData.append("image", image)
    }

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el testimonio")
      }
      setStep(2)
      window.scrollTo({ top: 300, behavior: "smooth" })
    } catch (error: any) {
      console.error("Submission error:", error)
      alert(`Error al enviar testimonio: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("https://www.kytcode.lat/testimonios")
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    }
  }

  const handleResetForm = () => {
    setStep(1)
    setSelectedProject("")
    setRating(5)
    setMessage("")
    setName("")
    setRole("")
    setImage(null)
    setImagePreview(null)
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div
              variants={fadeUpVariant}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono text-xs uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Espacio de Experiencias y Reseñas Reales</span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariant}
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-title text-white tracking-tight leading-tight"
            >
              Comparte tu Testimonio con{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                K&T Code
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariant}
              className="font-mono text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            >
              Si confiaste en nosotros para el diseño de tu marca, tu plataforma web o el desarrollo de software a medida,
              tu experiencia ayuda a otros emprendedores y empresas a dar el paso hacia una presencia digital sin plantillas.
            </motion.p>

            {/* Actions Bar */}
            <motion.div
              variants={fadeUpVariant}
              className="pt-4 flex flex-wrap items-center justify-center gap-4"
            >
              <button
                onClick={handleCopyShareLink}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-all duration-200"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">¡Enlace copiado al portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-neutral-400" />
                    <span>Copiar enlace para compartir</span>
                  </>
                )}
              </button>

              <a
                href="#formulario-testimonio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-title font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all duration-200"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Dejar mi Testimonio</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content: Form & Live Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Card (Sticky on Large Screens) */}
          <section
            id="formulario-testimonio"
            aria-label="Formulario para subir testimonio de cliente"
            className="lg:col-span-5 relative"
          >
            <div className="sticky top-28 bg-neutral-950/90 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              {step === 1 ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="text-xl sm:text-2xl font-bold font-title text-white flex items-center gap-2">
                      <MessageSquarePlus className="w-5 h-5 text-amber-400" />
                      Cuéntanos tu Experiencia
                    </h2>
                    <p className="text-xs text-neutral-400 font-mono mt-1">
                      Tu reseña pasará por validación y se publicará en el portafolio y en el caso de estudio de tu proyecto.
                    </p>
                  </div>

                  {/* Selector de Proyecto */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/80 block uppercase tracking-wider">
                      1. Proyecto o Empresa *
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 flex items-center justify-between text-white hover:border-white/30 transition-colors text-left"
                      >
                        <span className={selectedProject ? "text-white font-medium truncate" : "text-white/40 text-sm"}>
                          {selectedProject || "Seleccionar proyecto desarrollado..."}
                        </span>
                        <ChevronDown className="w-4 h-4 text-white/60 shrink-0 ml-2" />
                      </button>

                      <AnimatePresence>
                        {isProjectDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/15 rounded-xl overflow-hidden z-30 shadow-2xl max-h-60 flex flex-col"
                          >
                            <div className="p-2 border-b border-white/10 bg-black/40">
                              <div className="flex items-center px-3 py-2 bg-white/5 rounded-lg">
                                <Search className="w-4 h-4 text-white/40 mr-2 shrink-0" />
                                <input
                                  type="text"
                                  placeholder="Filtrar por nombre..."
                                  value={projectSearch}
                                  onChange={(e) => setProjectSearch(e.target.value)}
                                  className="bg-transparent border-none outline-none text-xs text-white placeholder-white/30 w-full"
                                />
                              </div>
                            </div>

                            <div className="overflow-y-auto flex-1 p-1 divide-y divide-white/5">
                              {cmsProjects.length === 0 && (
                                <p className="text-white/40 text-xs text-center py-4 font-mono">
                                  Cargando proyectos disponibles...
                                </p>
                              )}
                              {filteredProjects.map((p) => (
                                <button
                                  key={p._id || p.slug}
                                  type="button"
                                  onClick={() => {
                                    setSelectedProject(p.title)
                                    setIsProjectDropdownOpen(false)
                                  }}
                                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 text-xs text-white transition-colors flex items-center gap-3 group"
                                >
                                  <div className="relative w-8 h-8 rounded-md overflow-hidden shrink-0 bg-neutral-800 border border-white/10">
                                    {p.hero ? (
                                      <Image
                                        src={p.hero}
                                        alt={p.title}
                                        fill
                                        sizes="32px"
                                        className="object-cover"
                                        unoptimized
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-white/40 font-bold">
                                        {p.title?.charAt(0) || "P"}
                                      </div>
                                    )}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="font-bold truncate text-white group-hover:text-amber-300 transition-colors">
                                      {p.title}
                                    </div>
                                    {p.category && (
                                      <div className="text-[10px] text-neutral-400 truncate font-mono">
                                        {p.category}
                                      </div>
                                    )}
                                  </div>
                                </button>
                              ))}
                              {filteredProjects.length === 0 && cmsProjects.length > 0 && (
                                <p className="text-white/40 text-xs text-center py-4 font-mono">
                                  No encontramos ese proyecto
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Nombre y Rol */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/80 block uppercase tracking-wider">
                        2. Tu Nombre
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 h-11 text-xs text-white placeholder-white/30 focus:border-amber-400 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/80 block uppercase tracking-wider">
                        3. Cargo o Rol
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Ej. Fundador / CEO"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 h-11 text-xs text-white placeholder-white/30 focus:border-amber-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Calificación por estrellas */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-white/80 uppercase tracking-wider">
                        4. Calificación General *
                      </label>
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        {rating} de 5 Estrellas
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white/[0.02] border border-white/10 rounded-xl justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1.5 transition-transform hover:scale-125 focus:outline-none"
                          aria-label={`Calificar con ${star} estrellas`}
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              star <= (hoverRating || rating)
                                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                                : "text-white/20 hover:text-white/40"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mensaje de Testimonio */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/80 block uppercase tracking-wider">
                      5. Tu Reseña u Opinión *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Cuéntanos cómo fue el proceso de trabajo con K&T, el resultado del diseño/desarrollo o el impacto en tu negocio..."
                      rows={4}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-white/30 focus:border-amber-400 focus:outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Foto o Logo del Cliente */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/80 block uppercase tracking-wider">
                      6. Tu Foto o Logo de la Empresa (Opcional)
                    </label>
                    <div className="flex items-center gap-4 p-3 bg-white/[0.02] border border-dashed border-white/15 rounded-xl">
                      <label className="cursor-pointer relative group shrink-0">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="w-14 h-14 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors overflow-hidden relative bg-white/5">
                          {imagePreview ? (
                            <Image
                              src={imagePreview}
                              alt="Vista previa"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                          )}
                        </div>
                      </label>
                      <div className="text-xs min-w-0 flex-1">
                        {image ? (
                          <>
                            <p className="text-white font-medium truncate">{image.name}</p>
                            <button
                              type="button"
                              onClick={() => {
                                setImage(null)
                                setImagePreview(null)
                              }}
                              className="text-red-400 hover:text-red-300 text-[11px] mt-0.5 underline block"
                            >
                              Quitar foto
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="text-neutral-300 font-medium">Subir foto de perfil o logo</p>
                            <p className="text-white/40 text-[11px]">Formatos PNG, JPG, WebP hasta 5MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Botón de envío */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedProject || !message.trim()}
                    className="w-full h-12 bg-white text-black font-title font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-white/10"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Publicar mi Testimonio</span>
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-[11px] text-neutral-500 font-mono text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Verificación de autenticidad para proteger a clientes y lectores.</span>
                  </div>
                </form>
              ) : (
                /* Estado de Éxito */
                <div className="py-8 text-center space-y-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 14 }}
                    className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400"
                  >
                    <CheckCircle className="w-8 h-8" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-title text-white">
                      ¡Gracias por tu Testimonio!
                    </h3>
                    <p className="text-neutral-300 text-xs font-mono leading-relaxed max-w-sm mx-auto">
                      Hemos recibido tu valoración para <strong className="text-white">{selectedProject}</strong>.
                      Nuestro equipo revisará y validará la publicación en el portal para que quede visible con su insignia de cliente verificado.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <button
                      onClick={handleResetForm}
                      className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                    >
                      Enviar otra valoración
                    </button>
                    <Link
                      href="/portafolio"
                      className="inline-flex items-center justify-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <span>Explorar proyectos en el portafolio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Testimonials Showcase Grid */}
          <section
            aria-label="Listado de testimonios de clientes de K&T Code"
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-title text-white">
                  Lo que dicen nuestros clientes
                </h2>
                <p className="text-xs font-mono text-neutral-400 mt-0.5">
                  Casos de éxito reales en desarrollo a medida, plataformas web y automatización.
                </p>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-neutral-300">
                {initialTestimonials.length} Reseñas Verificadas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {initialTestimonials.map((t, index) => (
                <motion.article
                  key={t._id}
                  variants={cardDepthVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-neutral-950/70 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/25 transition-all duration-300 relative overflow-hidden group shadow-lg"
                >
                  <div className="space-y-4">
                    {/* Top Row: Rating & Project Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < (t.rating || 5)
                                ? "fill-amber-400 text-amber-400"
                                : "text-white/20"
                            }`}
                          />
                        ))}
                      </div>

                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300 font-bold truncate max-w-[150px]">
                        {t.project}
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-neutral-200 text-xs sm:text-sm font-sans leading-relaxed italic">
                      &ldquo;{t.content}&rdquo;
                    </p>
                  </div>

                  {/* Author Row */}
                  <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/20 flex items-center justify-center text-white font-title font-bold text-xs shrink-0 shadow-inner">
                        {t.name?.charAt(0) || "C"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white font-title text-xs font-bold truncate">
                          {t.name}
                        </h3>
                        <p className="text-[11px] font-mono text-neutral-400 truncate">
                          {t.role}
                        </p>
                      </div>
                    </div>

                    {t.projectUrl && (
                      <a
                        href={t.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver sitio web del proyecto ${t.project}`}
                        className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Bottom Callout */}
            <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-r from-neutral-950 via-zinc-950 to-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-white font-title font-bold text-sm">
                  ¿Quieres comprobar nuestros trabajos en vivo?
                </h4>
                <p className="text-neutral-400 text-xs font-mono mt-0.5">
                  Revisa nuestro sello "Desarrollado por K&T" en el pie de página de cada sitio web en producción.
                </p>
              </div>
              <Link
                href="/portafolio"
                className="shrink-0 px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white text-white hover:text-black font-title font-bold text-xs uppercase tracking-wider transition-all duration-200 inline-flex items-center gap-2"
              >
                <span>Ver Portafolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
