"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { m as motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  CheckCircle,
  ArrowRight,
  Send,
  Instagram,
  Facebook,
  Zap,
  ShoppingCart,
  Code2,
  Share2,
  Globe,
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

const serviceOptions: { id: PlanType; icon: any; labelKey: string }[] = [
  {
    id: "landing",
    icon: Zap,
    labelKey: "landing",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    labelKey: "ecommerce",
  },
  {
    id: "custom",
    icon: Code2,
    labelKey: "custom",
  },
  {
    id: "social",
    icon: Share2,
    labelKey: "socialMedia",
  },
]

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const NeonEscapeGame = dynamic(() => import("@/components/ui/neon-escape-game"), {
  ssr: false,
  loading: () => <div className="min-h-[720px] w-full animate-pulse rounded-2xl bg-white/5" />,
})
import { countryCodes } from "@/lib/country-codes"
import { usePricing, type PlanType } from "@/hooks/use-pricing"

export default function ContactSection() {
  const { dictionary, country } = useLanguage()
  const { setCursorVariant } = useCursor()
  const { getPrice } = usePricing()

  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [countryCode, setCountryCode] = useState("+57")
  const [discountCode, setDiscountCode] = useState("")
  const [rewardToken, setRewardToken] = useState("")

  useEffect(() => {
    const code = countryCodes.find(c => c.name === country)?.code || "+57"
    setCountryCode(code)
  }, [country])

  useEffect(() => {
    const handleReward = (event: Event) => {
      const detail = (event as CustomEvent<{ code?: string; claimToken?: string }>).detail
      if (!detail?.code) return

      setDiscountCode(detail.code)
      setRewardToken(detail.claimToken || "")
      setSelectedService("custom")
      setFormData((current) => ({
        ...current,
        message: current.message || `Obtuve el código ${detail.code} al superar los 3 bosses. Quiero cotizar mi proyecto web.`,
      }))
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    const handleContactRequest = () => {
      setSelectedService("custom")
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    window.addEventListener("kyt:discount-earned", handleReward)
    window.addEventListener("kyt:game-contact-click", handleContactRequest)
    return () => {
      window.removeEventListener("kyt:discount-earned", handleReward)
      window.removeEventListener("kyt:game-contact-click", handleContactRequest)
    }
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: `${countryCode} ${formData.phone}`,
          message: formData.message,
          service: selectedService,
          discountCode,
          rewardToken,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setSelectedService(null)
          setFormData({ name: "", phone: "", message: "" })
          setDiscountCode("")
          setRewardToken("")
        }, 3000)
      } else {
        const errorBody = await response.json().catch(() => null)
        setSubmitError(errorBody?.error || "No fue posible enviar el mensaje. Intenta nuevamente.")
      }
    } catch (error) {
      console.error("Error submitting form", error)
      setSubmitError("No fue posible conectar con el servidor. Revisa tu conexión e intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" data-contact-section className="relative py-16 lg:py-24 px-6 overflow-hidden cv-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />

      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p 
            className="text-white font-mono text-sm mb-4"
            variants={fadeUpVariant}
          >
            {dictionary.contact.subtitle}
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-title mb-8"
            variants={textRevealVariant}
          >
            {dictionary.contact.title}
          </motion.h2>

          {/* Contact Info & Socials moved to bottom */}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left column: service cards */}
          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p 
              className="text-white font-mono text-sm"
              variants={fadeUpVariant}
            >
              {dictionary.contact.selectService}
            </motion.p>
            <div className="grid grid-cols-2 gap-4">
                {serviceOptions.map((service, index) => {
                  const Icon = service.icon
                  const isSelected = selectedService === service.id

                  return (
                    <motion.button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`relative p-6 rounded-xl transition-all duration-300 overflow-hidden font-mono bg-[#e0e0e0] text-black h-full flex flex-col justify-center items-center ${
                        isSelected
                          ? "shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]"
                          : "shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] hover:-translate-y-1 hover:shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff,4px_4px_15px_rgba(0,0,0,0.3)]"
                      }`}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, damping: 30, delay: index * 0.1 }}
                      whileTap={{ scale: 0.98, x: 2, y: 2, boxShadow: "0px 0px 0 rgba(255,255,255,0)" }}
                    >
                      {/* Glitch / scanline effect always active */}
                      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />

                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <motion.div
                          className="p-3 border rounded-lg flex items-center justify-center transition-colors border-black/20 bg-black/5 text-black"
                          animate={isSelected ? { rotate: [0, -90, 0], scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5, ease: "anticipate" }}
                        >
                          <Icon className="w-6 h-6" />
                        </motion.div>
                        <span className="font-mono text-sm md:text-base font-bold uppercase tracking-wide text-center">
                          {
                            // @ts-ignore
                            dictionary.contact[service.labelKey] || dictionary.services[service.labelKey]?.title || service.labelKey
                          }
                        </span>
                      </div>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            className="absolute top-2 right-2 text-black/40"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )
                })}
            </div>


          </motion.div>

          {/* Right column: placeholder / form */}
          <motion.div
            className="w-full h-full flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!selectedService ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, scale: 0, rotateX: 180 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 100 }}
                  transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
                  whileHover={{ rotate: [-2, 2, -2, 2, 0], scale: 1.02, transition: { rotate: { type: "tween", duration: 0.4 } } }}
                  className="flex-1 ide-window p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px] border-2 border-dashed border-white/20 bg-black/40 rounded-xl relative overflow-hidden group cursor-crosshair"
                >
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-pulse" />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <div className="w-3 h-3 bg-white/60 rounded-full animate-ping" />
                  </div>
                  <h3 className="text-xl font-title font-bold text-green-500 group-hover:text-green-400 transition-colors">
                    {dictionary.contact.readyToStart || "¿Listo para empezar?"}
                  </h3>
                  <p className="text-white font-mono text-sm max-w-xs">
                    {dictionary.contact.selectPrompt || "Selecciona una opción arriba para iniciar el protocolo."}
                  </p>
                  <div className="flex gap-2 mt-4 group-hover:animate-bounce">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </motion.div>
              ) : !isSubmitted ? (
                <motion.form
                  id="contact-form"
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                >
                  <motion.div 
                    className="ide-window overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {/* Size and Price Display */}
                    <div className="px-4 pt-4 pb-0 space-y-3">

                      {/* Service Selector (Mobile Only replacement/Persistent selector) */}
                      <div className="relative">
                        <Select value={selectedService || ""} onValueChange={setSelectedService}>
                          <SelectTrigger className="w-full bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm h-12 focus:ring-0 focus:border-white/20">
                            <SelectValue placeholder={dictionary.contact.selectService} />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 border-white/20 text-white">
                            {serviceOptions.map((service) => (
                              <SelectItem key={service.id} value={service.id} className="font-mono text-xs focus:bg-white/10 focus:text-white">
                                <div className="flex items-center gap-2">
                                  <service.icon className="w-4 h-4" />
                                  <span>
                                    {
                                      // @ts-ignore
                                      dictionary.contact[service.labelKey] || dictionary.services[service.labelKey]?.title || service.labelKey
                                    }
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between">
                        {/* @ts-ignore */}
                        <span className="text-white/60 font-mono text-sm">{dictionary.contact.estimatedInvestment}</span>
                        <span className="text-white font-bold font-mono text-lg">
                          {getPrice(selectedService as PlanType)}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-4">
                      {/* Name field */}
                      <div className="relative">
                        <motion.label
                          className={`absolute left-3 transition-all duration-200 font-mono text-xs ${focusedField === "name" || formData.name
                            ? "-top-2 text-white bg-neutral-900 px-1"
                            : "top-3 text-white"
                            }`}
                        >
                          {dictionary.contact.formName}
                        </motion.label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent border border-white/20 rounded-lg px-3 py-3 text-white font-mono text-sm focus:border-white focus:outline-none transition-colors"
                          required
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-white"
                          initial={{ width: "0%" }}
                          animate={{ width: focusedField === "name" ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>


                      <div className="relative flex gap-2">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger
                            className="w-[120px] bg-transparent border border-white/20 rounded-lg px-3 text-white font-mono text-sm h-14 focus:ring-0 focus:ring-offset-0 focus:border-white transition-colors"
                            style={{ height: '56px' }}
                          >
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 border-white/20 text-white max-h-[200px]">
                            {countryCodes.map((country) => (
                              <SelectItem key={country.code + country.name} value={country.code} className="font-mono text-xs focus:bg-white/10 focus:text-white">
                                <span className="mr-2">{country.flag}</span>
                                {country.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="relative flex-1">
                          <motion.label
                            className={`absolute left-3 transition-all duration-200 font-mono text-xs z-10 ${focusedField === "phone" || formData.phone
                              ? "-top-2 text-white bg-neutral-900 px-1"
                              : "top-4 text-white"
                              }`}
                          >
                            Celular / WhatsApp
                          </motion.label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '')
                              setFormData({ ...formData, phone: value })
                            }}
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-transparent border border-white/20 rounded-lg px-3 text-white font-mono text-sm focus:border-white focus:outline-none transition-colors h-14"
                            style={{ height: '56px' }}
                            required
                          />
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-white rounded-b-lg"
                            initial={{ width: "0%" }}
                            animate={{ width: focusedField === "phone" ? "100%" : "0%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>

                      {/* Message field */}
                      <div className="relative">
                        <motion.label
                          className={`absolute left-3 transition-all duration-200 font-mono text-xs ${focusedField === "message" || formData.message
                            ? "-top-2 text-white bg-neutral-900 px-1"
                            : "top-3 text-white"
                            }`}
                        >
                          {dictionary.contact.formMessage}
                        </motion.label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          rows={4}
                          className="w-full bg-transparent border border-white/20 rounded-lg px-3 py-3 text-white font-mono text-sm focus:border-white focus:outline-none transition-colors resize-none"
                          required
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-white"
                          initial={{ width: "0%" }}
                          animate={{ width: focusedField === "message" ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      {submitError && (
                        <p role="alert" aria-live="assertive" className="rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 font-mono text-xs text-red-200">
                          {submitError}
                        </p>
                      )}

                      {discountCode && (
                        <div className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 font-mono text-xs text-emerald-200">
                          Descuento desbloqueado: <strong>{discountCode}</strong> · 10% sujeto a validación.
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative overflow-hidden w-full py-4 px-6 rounded-xl bg-white text-black font-mono font-bold text-lg border-2 border-white shadow-[6px_6px_0_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0_rgba(255,255,255,0.2)] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-transparent hover:text-white transition-all duration-300 disabled:opacity-70 group"
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-0" />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {isSubmitting ? (
                            <motion.div
                              className="w-6 h-6 border-3 border-black border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              {dictionary.contact.formSubmit}
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.form>
              ) : null}

              {isSubmitted && (
                <motion.div
                  key="success"
                  className="ide-window p-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-title font-bold text-white mb-2">{dictionary.contact.successTitle}</h3>
                  <p className="text-white font-mono text-sm">{dictionary.contact.successMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
        <div className="w-full mt-12">
          <NeonEscapeGame />
        </div>

        {/* Contact Info & Socials Centered at Bottom */}
        <motion.div 
          className="flex flex-col items-center gap-8 mt-20 pt-10 border-t border-white/10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              const displayValue = item.label === "location" ? dictionary.contact.locationValue : item.value

              const Wrapper = item.href ? motion.a : motion.div
              const wrapperProps = item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer", "aria-label": `Contact via ${item.label}` } : {}

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
                    <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-white/60 font-mono uppercase leading-tight mb-1">
                      {dictionary.contact[item.label as keyof typeof dictionary.contact]}
                    </p>
                    <p className="text-white font-mono text-base md:text-lg font-medium group-hover:text-white/80 transition-colors">
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
                  className="relative overflow-hidden w-14 h-14 rounded-xl bg-white text-gray-500 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 hover:border-black shadow-sm group"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Scanline pattern */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] group-hover:opacity-20 transition-opacity duration-300" />
                  
                  <Icon className="relative z-10 w-6 h-6 transition-colors duration-300" />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
