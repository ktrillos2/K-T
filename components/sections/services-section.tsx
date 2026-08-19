"use client"

import type React from "react"

import { memo, useRef } from "react"
import { m as motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Check, ArrowRight, Sparkles, Zap, ShoppingCart, Code2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import { reportConversion } from "@/lib/gtag"
import { usePricing } from "@/hooks/use-pricing"
import { useModal } from "@/context/modal-context"
import { notifyInteraction } from "@/app/actions/notify-click"
import { fadeUpVariant, staggerContainer, textRevealVariant, cardDepthVariant, ANIMATION_EASING } from "@/lib/animations"

const plans = ["landing", "ecommerce", "custom"] as const

const planIcons = {
  landing: Zap,
  ecommerce: ShoppingCart,
  custom: Code2,
}

const ServiceCard = memo(function ServiceCard({
  plan,
  planData,
  isPopular,
  index,
  setCursorVariant,
  dictionary,
  onSelect
}: {
  plan: (typeof plans)[number]
  planData: { title: string; price: string; features: string[]; cta: string; whatsapp_message?: string }
  isPopular: boolean
  index: number
  setCursorVariant: (v: "default" | "text" | "hover") => void
  dictionary: any
  onSelect: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = planIcons[plan]

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 })
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.1, 0.9])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setCursorVariant("default")
  }

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden border bg-zinc-950/90 flex flex-col w-full transition-all duration-300 ${
        isPopular ? "border-white shadow-[0_0_30px_rgba(255,255,255,0.08)] lg:-translate-y-2" : "border-white/15 hover:border-white/30"
      }`}
      variants={cardDepthVariant}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${50}% ${50}%, rgba(255,255,255,0.06), transparent 40%)`,
        }}
        whileHover={{ opacity: 1 }}
      />

      {/* macOS window header with interactive buttons */}
      <div
        className="flex items-center gap-2 px-4 py-3 bg-zinc-900/90 border-b border-white/10 shrink-0"
        style={{ transform: "translateZ(20px)" }}
      >
        {["#FF5F56", "#FFBD2E", "#27C93F"].map((color) => (
          <motion.div
            key={color}
            className="w-3 h-3 rounded-full cursor-pointer shrink-0"
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.4, boxShadow: `0 0 15px ${color}` }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          />
        ))}
        <span className="ml-2 text-xs text-white/80 font-mono truncate">{plan}.config.ts</span>
        {isPopular && (
          <motion.span
            className="ml-auto text-[10px] sm:text-xs bg-white text-black px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0 shadow-md"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255,255,255,0)",
                "0 0 0 6px rgba(255,255,255,0.12)",
                "0 0 0 0 rgba(255,255,255,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className="w-3 h-3" />
            {/* @ts-ignore */}
            {dictionary.services.popular}
          </motion.span>
        )}
      </div>

      <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-grow justify-between" style={{ transform: "translateZ(15px)" }}>
        <div>
          {/* Icon and title */}
          <div className="flex items-start gap-3.5 mb-5">
            <motion.div
              className="p-2.5 rounded-xl bg-white/10 border border-white/10 shrink-0 text-white"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white font-title leading-snug break-words">
                {planData.title}
              </h3>
              <motion.p
                className="text-base sm:text-lg font-bold text-emerald-400 mt-1 font-mono tracking-tight"
                whileHover={{ scale: 1.02, x: 2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {planData.price}
              </motion.p>
            </div>
          </div>

          {/* Features with stagger and hover effects */}
          <ul className="space-y-2.5 mb-8 font-mono text-xs text-neutral-300 leading-relaxed">
            {planData.features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2.5 group cursor-default"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 + index * 0.08 }}
                whileHover={{ x: 6, transition: { type: "spring", stiffness: 400 } }}
              >
                <div className="mt-0.5 p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-neutral-300 group-hover:text-white transition-colors duration-200">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Interactive CTA Button */}
        <motion.button
          onClick={(e) => {
            e.preventDefault()
            reportConversion(`https://wa.me/573116360057?text=${encodeURIComponent(
              planData.whatsapp_message || "Hola, me gustaría recibir más información."
            )}`)
            notifyInteraction(`Service Button: ${planData.cta}`, {
              plan: plan,
              price: planData.price
            })
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 font-mono font-bold text-xs sm:text-sm bg-white text-black rounded-xl border-2 border-white hover:bg-neutral-200 transition-all duration-300 relative overflow-hidden group cursor-pointer shadow-lg"
          aria-label={`Solicitar cotización del plan ${planData.title} por ${planData.price}`}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-0" />
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12 z-0"
            initial={{ x: "-150%" }}
            whileHover={{ x: "150%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
          <span className="relative z-10 font-mono flex items-center gap-2">
            {planData.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
})

export default function ServicesSection({ showHeader = true }: { showHeader?: boolean }) {
  const { dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()
  const { getPrice } = usePricing()
  const { openModal } = useModal()

  return (
    <section id="services" aria-label="Planes y servicios de desarrollo web y software" className="relative pt-0 pb-16 lg:pt-0 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden cv-auto">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
          animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {showHeader && (
          <motion.div
            className="text-center mb-14 sm:mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              className="text-white font-mono text-sm mb-4"
              variants={fadeUpVariant}
            >
              {dictionary.services.subtitle}
            </motion.p>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-title text-white"
              variants={textRevealVariant}
            >
              {dictionary.services.title}
            </motion.h2>
          </motion.div>
        )}

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {plans.map((plan, index) => {
            const planInfo = dictionary.services[plan]
            const price = getPrice(plan)

            return (
              <ServiceCard
                key={plan}
                plan={plan}
                planData={{
                  ...planInfo,
                  price: price
                }}
                isPopular={plan === "ecommerce"}
                index={index}
                setCursorVariant={setCursorVariant}
                dictionary={dictionary}
                onSelect={() => openModal(plan)}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
