"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { m as motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  Zap,
  ShoppingCart,
  Code2,
  Share2,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Instagram,
  Facebook,
} from "lucide-react"

// Custom TikTok Icon
const TikTok = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import dynamic from "next/dynamic"
import { fadeUpVariant, staggerContainer, textRevealVariant } from "@/lib/animations"
import { countryCodes } from "@/lib/country-codes"
import { usePricing, type PlanType } from "@/hooks/use-pricing"
import { trackLeadSubmission } from "@/lib/analytics"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AlienRunner = dynamic(() => import("@/components/ui/alien-runner"), {
  ssr: false,
  loading: () => <div className="h-64 w-full max-w-4xl animate-pulse bg-white/5 rounded-xl"></div>,
})

const contactInfo = [
  { icon: Mail, label: "email", value: "contacto@kytcode.lat", href: "mailto:contacto@kytcode.lat" },
  { icon: Phone, label: "phone", value: "+57 311 636 0057", href: "tel:+573116360057" },
  { icon: MapPin, label: "location", value: "locationValue", href: null },
]

const socials = [
  { icon: TikTok, href: "https://www.tiktok.com/@kytweb", label: "TikTok" },
  { icon: Instagram, href: "https://www.instagram.com/ktweb_/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/KTSolutionsWeb", label: "Facebook" },
]

interface ServiceOption {
  id: PlanType
  icon: React.ComponentType<{ className?: string }>
  labelKey: string
  descriptionEs: string
  descriptionEn: string
}

const serviceOptions: ServiceOption[] = [
  {
    id: "landing",
    icon: Zap,
    labelKey: "landing",
    descriptionEs: "Ideal para campañas publicitarias, captación rápida de leads y lanzamientos.",
    descriptionEn: "High-converting single-page site for ad campaigns and fast lead capture.",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    labelKey: "ecommerce",
    descriptionEs: "Catálogo interactivo, pasarelas de pago colombianas e internacionales y pedidos por WhatsApp.",
    descriptionEn: "Online store with local/global payment gateways and automated order routing.",
  },
  {
    id: "custom",
    icon: Code2,
    labelKey: "custom",
    descriptionEs: "Páginas corporativas en Next.js, portales B2B, APIs y software a medida.",
    descriptionEn: "Corporate platforms in Next.js, B2B portals, custom APIs, and tailored software.",
  },
  {
    id: "social",
    icon: Share2,
    labelKey: "socialMedia",
    descriptionEs: "Estrategia de contenido, pauta en Meta/Google Ads y posicionamiento de marca.",
    descriptionEn: "Paid ad management on Meta/Google Ads and visual brand growth.",
  },
]

export default function ContactSection() {
  const { dictionary, country, language } = useLanguage()
  const { setCursorVariant } = useCursor()
  const { getPrice } = usePricing()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedService, setSelectedService] = useState<PlanType | null>(null)
  const [countryCode, setCountryCode] = useState("+57")

  useEffect(() => {
    const code = countryCodes.find((c) => c.name === country)?.code || "+57"
    setCountryCode(code)
  }, [country])

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSelectService = (serviceId: PlanType) => {
    setSelectedService(serviceId)
    // Smooth transition to step 2
    setTimeout(() => {
      setStep(2)
    }, 250)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.phone.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: `${countryCode} ${formData.phone}`,
          message: formData.message,
          service: selectedService,
        }),
      })

      if (response.ok) {
        setStep(3)
        trackLeadSubmission(
          selectedService || "general",
          selectedService ? getPrice(selectedService) : undefined
        )
      } else {
        console.error("Failed to send message")
      }
    } catch (error) {
      console.error("Error submitting form", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setStep(1)
    setSelectedService(null)
    setFormData({ name: "", phone: "", message: "" })
  }

  const activeServiceObj = serviceOptions.find((s) => s.id === selectedService)

  const getServiceTitle = (service: ServiceOption) => {
    // @ts-ignore
    return dictionary.contact[service.labelKey] || dictionary.services[service.labelKey]?.title || service.labelKey
  }

  const getWhatsAppDirectUrl = () => {
    const serviceName = activeServiceObj ? getServiceTitle(activeServiceObj) : "Desarrollo Web"
    const text = encodeURIComponent(
      `Hola K&T Code! Mi nombre es ${formData.name || ""}. Me interesa cotizar el servicio de *${serviceName}*.`
    )
    return `https://wa.me/573116360057?text=${text}`
  }

  return (
    <section
      id="contact"
      aria-label="Contacto y cotización de proyectos web y software"
      className="relative py-16 lg:py-24 px-4 sm:px-6 overflow-hidden cv-auto"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-black" />
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p className="text-white/60 font-mono text-xs sm:text-sm uppercase tracking-wider mb-3" variants={fadeUpVariant}>
            {dictionary.contact.subtitle}
          </motion.p>
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-title text-white tracking-tight" variants={textRevealVariant}>
            {dictionary.contact.title}
          </motion.h2>
        </motion.div>

        {/* Stepper Progress Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            {/* Background Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/10 -z-0" />
            {/* Active Progress Line */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-white transition-all duration-500 -z-0"
              style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
            />

            {/* Step 1 Pill */}
            <button
              onClick={() => step === 2 && setStep(1)}
              disabled={step === 3}
              className={`relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs font-bold transition-all duration-300 ${
                step >= 1
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  : "bg-neutral-900 border border-white/20 text-white/50"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">1</span>
              <span>{language === "en" ? "Service" : "Servicio"}</span>
            </button>

            {/* Step 2 Pill */}
            <div
              className={`relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs font-bold transition-all duration-300 ${
                step >= 2
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  : "bg-neutral-900 border border-white/20 text-white/50"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? "bg-black/10 text-black" : "bg-white/10 text-white/50"}`}>
                2
              </span>
              <span>{language === "en" ? "Details" : "Tus Datos"}</span>
            </div>

            {/* Step 3 Pill */}
            <div
              className={`relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs font-bold transition-all duration-300 ${
                step === 3
                  ? "bg-emerald-400 text-black shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                  : "bg-neutral-900 border border-white/20 text-white/50"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? "bg-black/20 text-black" : "bg-white/10 text-white/50"}`}>
                3
              </span>
              <span>{language === "en" ? "Confirmation" : "Listo"}</span>
            </div>
          </div>
        </div>

        {/* Main Stepper Card Container */}
        <div className="relative rounded-3xl border border-white/15 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/80 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* ════════════════════════════════════════════════════════════════════
                STEP 1: SELECT SERVICE
            ════════════════════════════════════════════════════════════════════ */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center max-w-xl mx-auto mb-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-xs text-white/70 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    {language === "en" ? "Step 1 of 2" : "Paso 1 de 2"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-title text-white">
                    {language === "en" ? "What type of project do you want to build?" : "¿Qué tipo de proyecto deseas construir?"}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-neutral-400 mt-2">
                    {language === "en" ? "Select an option to calculate your estimated investment." : "Selecciona una opción para calcular tu inversión estimada."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serviceOptions.map((service, index) => {
                    const Icon = service.icon
                    const isSelected = selectedService === service.id
                    const price = getPrice(service.id)

                    return (
                      <motion.button
                        key={service.id}
                        type="button"
                        onClick={() => handleSelectService(service.id)}
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Seleccionar ${getServiceTitle(service)}`}
                        className={`relative text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
                          isSelected
                            ? "bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                            : "bg-white/[0.03] text-white border-white/10 hover:border-white/30 hover:bg-white/[0.06]"
                        }`}
                      >
                        {/* Scanline texture */}
                        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />

                        <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
                          <div
                            className={`p-3 rounded-xl border transition-colors ${
                              isSelected
                                ? "bg-black text-white border-black"
                                : "bg-white/10 border-white/15 text-white group-hover:bg-white/20"
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>

                          <div className="text-right">
                            <span
                              className={`block font-mono text-[10px] uppercase tracking-wider ${
                                isSelected ? "text-black/60" : "text-white/50"
                              }`}
                            >
                              {dictionary.contact.estimatedInvestment || "Inversión:"}
                            </span>
                            <span
                              className={`font-mono text-sm sm:text-base font-bold ${
                                isSelected ? "text-black" : "text-white"
                              }`}
                            >
                              {price}
                            </span>
                          </div>
                        </div>

                        <div className="relative z-10 space-y-1">
                          <h4 className="font-title font-bold text-lg sm:text-xl">
                            {getServiceTitle(service)}
                          </h4>
                          <p
                            className={`font-mono text-xs leading-relaxed ${
                              isSelected ? "text-black/80" : "text-neutral-400"
                            }`}
                          >
                            {language === "en" ? service.descriptionEn : service.descriptionEs}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between font-mono text-xs font-semibold relative z-10">
                          <span>{isSelected ? (language === "en" ? "Selected ✓" : "Seleccionado ✓") : (language === "en" ? "Click to select" : "Haz clic para elegir")}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════════════
                STEP 2: CONTACT DETAILS FORM
            ════════════════════════════════════════════════════════════════════ */}
            {step === 2 && activeServiceObj && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Selected Service Recap Pill */}
                <div className="p-4 rounded-2xl border border-white/15 bg-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white text-black">
                      <activeServiceObj.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider block">
                        {language === "en" ? "Selected Solution" : "Solución Seleccionada"}
                      </span>
                      <strong className="font-title text-base text-white">
                        {getServiceTitle(activeServiceObj)}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                    <div className="text-left sm:text-right">
                      <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider block">
                        {dictionary.contact.estimatedInvestment || "Inversión:"}
                      </span>
                      <strong className="font-mono text-base text-emerald-400 font-bold">
                        {getPrice(activeServiceObj.id)}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-3 py-1.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/15 text-white font-mono text-xs transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3 h-3" />
                      {language === "en" ? "Change" : "Cambiar"}
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-xs text-white/70">
                        {dictionary.contact.formName || "Tu Nombre Completo"} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={language === "en" ? "e.g. John Doe" : "Ej. Carlos Martínez"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3.5 text-white font-mono text-sm placeholder:text-white/20 focus:border-white focus:bg-white/[0.08] focus:outline-none transition-all"
                      />
                    </div>

                    {/* Phone / WhatsApp */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-xs text-white/70">
                        {language === "en" ? "WhatsApp / Phone" : "WhatsApp / Celular"} <span className="text-red-400">*</span>
                      </label>
                      <div className="flex gap-2">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger className="w-[110px] bg-white/[0.04] border border-white/15 rounded-xl px-3 text-white font-mono text-xs h-[48px] focus:ring-0 focus:border-white">
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 border-white/20 text-white max-h-[220px]">
                            {countryCodes.map((c) => (
                              <SelectItem key={c.code + c.name} value={c.code} className="font-mono text-xs focus:bg-white/10 focus:text-white">
                                <span className="mr-1.5">{c.flag}</span>
                                {c.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <input
                          type="tel"
                          required
                          placeholder={language === "en" ? "Phone number" : "Número de WhatsApp"}
                          value={formData.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "")
                            setFormData({ ...formData, phone: val })
                          }}
                          className="flex-1 bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3.5 text-white font-mono text-sm placeholder:text-white/20 focus:border-white focus:bg-white/[0.08] focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message (Optional) */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-white/70">
                      {dictionary.contact.formMessage || "¿Cuéntanos brevemente sobre tu proyecto?"} <span className="text-white/40 font-normal">({language === "en" ? "Optional" : "Opcional"})</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder={
                        language === "en"
                          ? "Brief description of your requirements, current website, or deadlines..."
                          : "Describe brevemente qué necesitas, si tienes web actual o cuándo planeas lanzar..."
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 text-white font-mono text-sm placeholder:text-white/20 focus:border-white focus:bg-white/[0.08] focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {language === "en" ? "Back to Services" : "Volver a Servicios"}
                    </button>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !formData.name.trim() || !formData.phone.trim()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-mono font-bold text-sm sm:text-base border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:bg-neutral-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>{language === "en" ? "Sending..." : "Enviando..."}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{dictionary.contact.formSubmit || (language === "en" ? "Request Quotation" : "Solicitar Cotización")}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════════════
                STEP 3: SUCCESS & CONFIRMATION
            ════════════════════════════════════════════════════════════════════ */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8 px-4 space-y-6 max-w-xl mx-auto"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold font-title text-white">
                    {dictionary.contact.successTitle || (language === "en" ? "Quotation Received!" : "¡Cotización Recibida con Éxito!")}
                  </h3>
                  <p className="font-mono text-sm text-neutral-300 leading-relaxed">
                    {dictionary.contact.successMessage || (language === "en" ? "We will respond in less than 24 hours with your project plan." : "Nos pondremos en contacto contigo vía WhatsApp o correo en menos de 24 horas.")}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] font-mono text-xs text-white/70 space-y-1">
                  <p>
                    <strong>{formData.name}</strong> • {countryCode} {formData.phone}
                  </p>
                  {activeServiceObj && (
                    <p className="text-emerald-400">
                      {getServiceTitle(activeServiceObj)} — {getPrice(activeServiceObj.id)}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href={getWhatsAppDirectUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {language === "en" ? "Open Chat in WhatsApp" : "Abrir Chat Directo en WhatsApp"}
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-sm rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {language === "en" ? "Quote Another Project" : "Cotizar Otro Proyecto"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Easter Egg / Alien Runner Game */}
        <div className="w-full mt-10">
          <AlienRunner />
        </div>

        {/* Contact Info & Socials Centered at Bottom */}
        <motion.div
          className="flex flex-col items-center gap-8 mt-16 pt-10 border-t border-white/10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {contactInfo.map((item) => {
              const Icon = item.icon
              const displayValue = item.label === "location" ? dictionary.contact.locationValue : item.value

              const Wrapper = item.href ? motion.a : motion.div
              const wrapperProps = item.href
                ? { href: item.href, target: "_blank", rel: "noopener noreferrer", "aria-label": `Contact via ${item.label}` }
                : {}

              return (
                <Wrapper
                  key={item.label}
                  {...wrapperProps}
                  className="flex items-center gap-4 group transition-colors"
                  variants={fadeUpVariant}
                  onMouseEnter={() => item.href && setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <div className="flex items-center justify-center w-12 h-12">
                    <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-white/60 font-mono uppercase leading-tight mb-1">
                      {dictionary.contact[item.label as keyof typeof dictionary.contact] || item.label}
                    </p>
                    <p className="text-white font-mono text-sm md:text-base font-medium group-hover:text-white/80 transition-colors">
                      {displayValue}
                    </p>
                  </div>
                </Wrapper>
              )
            })}
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.label} page`}
                  className="relative overflow-hidden w-12 h-12 rounded-xl bg-white text-gray-700 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 hover:border-white shadow-sm group"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] group-hover:opacity-20 transition-opacity duration-300" />
                  <Icon className="relative z-10 w-5 h-5 transition-colors duration-300" />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
