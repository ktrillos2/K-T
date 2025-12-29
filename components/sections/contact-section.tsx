"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Share2,
  CheckCircle,
  ArrowRight,
  Send,
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



const ProgrammingAnimation = dynamic(() => import("@/components/ui/programming-animation"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-neutral-950 rounded-xl">
      <div className="text-white/60 font-mono text-sm animate-pulse">Loading...</div>
    </div>
  ),
})

const contactInfo = [
  { icon: Mail, label: "email", value: "contactoktweb@gmail.com", href: "mailto:contactoktweb@gmail.com" },
  { icon: Phone, label: "phone", value: "+57 311 636 0057", href: "tel:+573116360057" },
  { icon: MapPin, label: "location", value: "locationValue", href: null },
]

const socials = [
  { icon: TikTok, href: "https://www.tiktok.com/@kytweb", label: "TikTok" },
  { icon: Instagram, href: "https://www.instagram.com/ktweb_/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/KTSolutionsWeb", label: "Facebook" },
]

const serviceOptions = [
  {
    id: "web",
    icon: Globe,
    labelKey: "webDev",
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
import { countryCodes } from "@/lib/country-codes"

export default function ContactSection() {
  const { dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()

  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [countryCode, setCountryCode] = useState("+57")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
          service: selectedService
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setSelectedService(null)
          setFormData({ name: "", phone: "", message: "" })
        }, 3000)
      } else {
        console.error("Failed to send message")
      }
    } catch (error) {
      console.error("Error submitting form", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-16 lg:py-24 px-6 overflow-hidden cv-auto">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/70 font-mono text-sm mb-4">{dictionary.contact.subtitle}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-title mb-8">{dictionary.contact.title}</h2>

          {/* Contact Info & Socials Centered */}
          <div className="flex flex-col items-center gap-6">
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
                    className="flex items-center gap-3 group transition-colors"
                    onMouseEnter={() => item.href && setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground font-mono uppercase leading-tight mb-1">
                        {dictionary.contact[item.label as keyof typeof dictionary.contact]}
                      </p>
                      <p className="text-foreground font-mono text-base md:text-lg font-medium group-hover:text-white transition-colors">
                        {displayValue}
                      </p>
                    </div>
                  </Wrapper>
                )
              })}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.label} page`}
                    className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors border border-white/10 hover:border-white"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Service Selection */}
            <div className="space-y-4">
              <p className="text-white/60 font-mono text-sm">{dictionary.contact.selectService}</p>
              <div className="grid grid-cols-2 gap-4">
                {serviceOptions.map((service, index) => {
                  const Icon = service.icon
                  const isSelected = selectedService === service.id

                  return (
                    <motion.button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${isSelected
                        ? "border-white/20 bg-black text-white"
                        : "border-white bg-white text-black hover:bg-black hover:text-white hover:border-white/20"
                        }`}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${isSelected
                            ? "bg-white text-black"
                            : "bg-black text-white group-hover:bg-white group-hover:text-black"
                            }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-sm font-medium">
                          {dictionary.contact[service.labelKey as keyof typeof dictionary.contact]}
                        </span>
                      </div>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            className="absolute top-2 right-2"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                          >
                            <CheckCircle className="w-5 h-5 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!selectedService ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  className="ide-window p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px] border border-dashed border-white/10 bg-white/5 rounded-xl"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
                    <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
                  </div>
                  <h3 className="text-xl font-title font-bold text-white">
                    {dictionary.contact.readyToStart || "Ready to Start?"}
                  </h3>
                  <p className="text-white/40 font-mono text-sm max-w-xs">
                    {dictionary.contact.selectPrompt || "Select an option above to initialize the contact protocol."}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <span className="w-2 h-2 rounded-full bg-red-500/50" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <span className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                </motion.div>
              ) : !isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="ide-window overflow-hidden">
                    <div className="p-4 space-y-4">
                      {/* Name field */}
                      <div className="relative">
                        <motion.label
                          className={`absolute left-3 transition-all duration-200 font-mono text-xs ${focusedField === "name" || formData.name
                            ? "-top-2 text-white bg-neutral-900 px-1"
                            : "top-3 text-white/40"
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
                              : "top-4 text-white/40"
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
                            : "top-3 text-white/40"
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

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-xl bg-white text-black font-bold text-lg border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 disabled:opacity-70"
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center justify-center gap-3">
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
                  </div>
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
                  <p className="text-white/60 font-mono text-sm">{dictionary.contact.successMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

          {/* Right side - Code Animation */}
          <motion.div
            className="relative w-full min-h-[400px] lg:min-h-full h-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-neutral-950 rounded-xl">
                  {/* @ts-ignore */}
                  <div className="text-white/60 font-mono text-sm animate-pulse">{dictionary?.common?.loading || "Loading..."}</div>
                </div>
              }
            >
              <ProgrammingAnimation />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
