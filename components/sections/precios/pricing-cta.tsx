"use client"

import { useState } from "react"
import { m as motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, ArrowRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCursor } from "@/context/cursor-context"
import { reportPixelLead } from "@/lib/gtag"

import { useLanguage } from "@/context/language-context"

export default function PricingCTA() {
  const { setCursorVariant } = useCursor()
  const { dictionary } = useLanguage()
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    whatsapp: "",
    projectType: "",
    budget: "",
    date: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "submit_lead", {
        event_category: "pricing_cta",
        event_label: formData.projectType
      })
    }

    const combinedMessage = `
EMPRESA: ${formData.company || 'No especificada'}
CORREO: ${formData.email}
PRESUPUESTO: ${formData.budget || 'No especificado'}
FECHA ESTIMADA: ${formData.date || 'No especificada'}

DESCRIPCIÓN DEL PROYECTO:
${formData.message}
    `.trim()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.whatsapp,
          message: combinedMessage,
          service: formData.projectType
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setShowForm(false)
          setFormData({
            name: "", company: "", email: "", whatsapp: "",
            projectType: "", budget: "", date: "", message: ""
          })
        }, 5000)
      } else {
        console.error("Failed to send message")
      }
    } catch (error) {
      console.error("Error submitting form", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleShowForm = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "start_form", {
        event_category: "pricing_cta"
      })
    }
    setShowForm(true)
  }

  const handleWhatsApp = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click_whatsapp", {
        event_category: "pricing_cta",
        event_label: "Hablar por WhatsApp"
      })
    }
    reportPixelLead()
    window.open("https://wa.me/573116360057?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20una%20propuesta%20personalizada.", "_blank")
  }

  return (
    <section className="relative px-6 max-w-4xl mx-auto w-full pb-20">
      <div className="relative p-8 md:p-12 lg:p-16 rounded-3xl border border-white/20 bg-neutral-950/80 backdrop-blur-md overflow-hidden text-center">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-[300px] bg-white/[0.05] blur-[100px] rounded-full pointer-events-none" />

        <AnimatePresence mode="wait">
          {!showForm && !isSubmitted ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="relative z-10 space-y-8"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-title">
                {/* @ts-ignore */}
                {dictionary.pricingCta.title}
              </h2>
              <p className="text-white/60 font-mono text-lg max-w-2xl mx-auto">
                {/* @ts-ignore */}
                {dictionary.pricingCta.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <motion.button
                  onClick={handleShowForm}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className="group relative px-8 py-4 bg-white text-black font-bold font-mono rounded-lg overflow-hidden w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {/* @ts-ignore */}
                    {dictionary.pricingCta.requestQuote}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>

                <motion.button
                  onClick={handleWhatsApp}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className="px-8 py-4 bg-transparent text-white border border-white/20 font-bold font-mono rounded-lg w-full sm:w-auto hover:bg-white/5 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* @ts-ignore */}
                  {dictionary.pricingCta.whatsappLink}
                </motion.button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-mono text-white/40 pt-6">
                {/* @ts-ignore */}
                <span>{dictionary.pricingCta.perks[0]}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                {/* @ts-ignore */}
                <span>{dictionary.pricingCta.perks[1]}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                {/* @ts-ignore */}
                <span>{dictionary.pricingCta.perks[2]}</span>
              </div>
            </motion.div>
          ) : !isSubmitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 text-left space-y-6 max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                {/* @ts-ignore */}
                <h3 className="text-2xl font-bold font-title mb-2">{dictionary.pricingCta.formTitle}</h3>
                {/* @ts-ignore */}
                <p className="text-white/50 font-mono text-sm">{dictionary.pricingCta.formDescription}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/50 uppercase tracking-wider">
                    {/* @ts-ignore */}
                    {dictionary.pricingCta.formFields.name}
                  </label>
                  <input
                    type="text"
                    required
                    /* @ts-ignore */
                    placeholder={dictionary.pricingCta.formFields.namePlaceholder}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/50 uppercase tracking-wider">
                    {/* @ts-ignore */}
                    {dictionary.pricingCta.formFields.company}
                  </label>
                  <input
                    type="text"
                    /* @ts-ignore */
                    placeholder={dictionary.pricingCta.formFields.companyPlaceholder}
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/50 uppercase tracking-wider">
                    {/* @ts-ignore */}
                    {dictionary.pricingCta.formFields.email}
                  </label>
                  <input
                    type="email"
                    required
                    /* @ts-ignore */
                    placeholder={dictionary.pricingCta.formFields.emailPlaceholder}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/50 uppercase tracking-wider">
                    {/* @ts-ignore */}
                    {dictionary.pricingCta.formFields.whatsapp}
                  </label>
                  <input
                    type="tel"
                    required
                    /* @ts-ignore */
                    placeholder={dictionary.pricingCta.formFields.whatsappPlaceholder}
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/50 uppercase tracking-wider">
                    {/* @ts-ignore */}
                    {dictionary.pricingCta.formFields.projectType}
                  </label>
                  <Select required value={formData.projectType} onValueChange={val => setFormData({ ...formData, projectType: val })}>
                    <SelectTrigger className="w-full bg-white/[0.02] border border-white/10 rounded-lg text-white font-mono text-sm h-[46px] focus:ring-0 focus:border-white/20">
                      {/* @ts-ignore */}
                      <SelectValue placeholder={dictionary.pricingCta.formFields.projectTypePlaceholder} />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-white/20 text-white">
                      {/* @ts-ignore */}
                      {dictionary.pricingCta.projectTypes.map((type: string) => (
                        <SelectItem key={type} value={type} className="font-mono text-sm focus:bg-white/10 focus:text-white">{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/50 uppercase tracking-wider">
                    {/* @ts-ignore */}
                    {dictionary.pricingCta.formFields.budget}
                  </label>
                  <Select required value={formData.budget} onValueChange={val => setFormData({ ...formData, budget: val })}>
                    <SelectTrigger className="w-full bg-white/[0.02] border border-white/10 rounded-lg text-white font-mono text-sm h-[46px] focus:ring-0 focus:border-white/20">
                      {/* @ts-ignore */}
                      <SelectValue placeholder={dictionary.pricingCta.formFields.budgetPlaceholder} />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-white/20 text-white">
                      {/* @ts-ignore */}
                      {dictionary.pricingCta.budgetOptions.map((opt: string) => (
                        <SelectItem key={opt} value={opt} className="font-mono text-sm focus:bg-white/10 focus:text-white">{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-white/50 uppercase tracking-wider">
                  {/* @ts-ignore */}
                  {dictionary.pricingCta.formFields.date}
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-white/50 uppercase tracking-wider">
                  {/* @ts-ignore */}
                  {dictionary.pricingCta.formFields.message}
                </label>
                <textarea
                  required
                  rows={4}
                  /* @ts-ignore */
                  placeholder={dictionary.pricingCta.formFields.messagePlaceholder}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-white focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 font-mono text-sm text-white/60 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 relative overflow-hidden py-3 px-6 rounded-lg bg-white text-black font-mono font-bold text-sm hover:bg-neutral-200 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  ) : (
                    <>
                      Recibir propuesta
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 flex flex-col items-center justify-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <CheckCircle className="w-20 h-20 text-white mb-6" />
              </motion.div>
              <h3 className="text-3xl font-title font-bold text-white mb-4">¡Propuesta Solicitada!</h3>
              <p className="text-white/60 font-mono">Hemos recibido los detalles de tu proyecto. Te contactaremos muy pronto.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
