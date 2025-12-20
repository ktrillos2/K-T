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
} from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import dynamic from "next/dynamic"

const CodeAnimation = dynamic(() => import("@/components/ui/code-animation"), {
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
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
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

export default function ContactSection() {
  const { dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()

  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setSelectedService(null)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 px-6 overflow-hidden">
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
          <p className="text-white/40 font-mono text-sm mb-4">{dictionary.contact.subtitle}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-title">{dictionary.contact.title}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
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
                      className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                        isSelected
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
                          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                            isSelected
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

            {/* Contact Form */}
            <AnimatePresence mode="wait">
              {selectedService && !isSubmitted && (
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
                          className={`absolute left-3 transition-all duration-200 font-mono text-xs ${
                            focusedField === "name" || formData.name
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

                      {/* Email field */}
                      <div className="relative">
                        <motion.label
                          className={`absolute left-3 transition-all duration-200 font-mono text-xs ${
                            focusedField === "email" || formData.email
                              ? "-top-2 text-white bg-neutral-900 px-1"
                              : "top-3 text-white/40"
                          }`}
                        >
                          {dictionary.contact.formEmail}
                        </motion.label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent border border-white/20 rounded-lg px-3 py-3 text-white font-mono text-sm focus:border-white focus:outline-none transition-colors"
                          required
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-white"
                          initial={{ width: "0%" }}
                          animate={{ width: focusedField === "email" ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      {/* Message field */}
                      <div className="relative">
                        <motion.label
                          className={`absolute left-3 transition-all duration-200 font-mono text-xs ${
                            focusedField === "message" || formData.message
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
              )}

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

            {/* Contact info */}
            <div className="grid grid-cols-1 gap-4 pt-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                const displayValue = item.label === "location" ? dictionary.contact.locationValue : item.value

                const Wrapper = item.href ? motion.a : motion.div
                const wrapperProps = item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {}

                return (
                  <Wrapper
                    key={item.label}
                    {...wrapperProps}
                    className="flex items-center gap-4 group p-3 rounded-lg hover:bg-white/5 transition-colors"
                    onMouseEnter={() => item.href && setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono uppercase">
                        {dictionary.contact[item.label as keyof typeof dictionary.contact]}
                      </p>
                      <p className="text-foreground font-mono text-sm group-hover:text-white transition-colors">
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
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Right side - Code Animation */}
          <motion.div
            className="relative w-full h-[400px] lg:h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-neutral-950 rounded-xl">
                  <div className="text-white/60 font-mono text-sm animate-pulse">Loading...</div>
                </div>
              }
            >
              <CodeAnimation />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
