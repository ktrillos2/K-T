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
  planData: { title: string; price: string; features: string[]; cta: string }
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
      className={`relative rounded-xl overflow-hidden border bg-zinc-950 flex flex-col ${isPopular ? "border-white lg:-mt-6 lg:mb-6" : "border-white/10"
        }`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
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
      <motion.div
        className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-white/10"
        style={{ transform: "translateZ(30px)" }}
      >
        {["#FF5F56", "#FFBD2E", "#27C93F"].map((color, i) => (
          <motion.div
            key={color}
            className="w-3 h-3 rounded-full cursor-pointer"
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.5, boxShadow: `0 0 15px ${color}` }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          />
        ))}
        <span className="ml-3 text-xs text-white font-mono">{plan}.config.ts</span>
        {isPopular && (
          <motion.span
            className="ml-auto text-xs bg-white text-black px-3 py-1 rounded-full font-bold flex items-center gap-1"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255,255,255,0)",
                "0 0 0 8px rgba(255,255,255,0.1)",
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
      </motion.div>

      <div className="p-6 lg:p-8 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
        {/* Icon and title */}
        <div className="flex items-start gap-4 mb-6">
          <motion.div
            className="p-3 rounded-xl bg-white/10 border border-white/10"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white font-title">{planData.title}</h3>
            <motion.p
              className="text-3xl font-bold text-white mt-1 font-mono"
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {planData.price}
            </motion.p>
          </div>
        </div>

        {/* Features with stagger and hover effects */}
        <ul className="space-y-3 mb-8 flex-grow">
          {planData.features.map((feature, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 group cursor-default"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 + index * 0.1 }}
              whileHover={{ x: 10, transition: { type: "spring", stiffness: 400 } }}
            >
              <motion.div
                className="mt-0.5 p-1 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-200"
                whileHover={{ scale: 1.3, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Check className="w-3 h-3 text-white group-hover:text-black transition-colors duration-200" />
              </motion.div>
              <span className="text-sm text-white font-mono group-hover:text-white transition-colors duration-200">
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Interactive CTA Button with ripple effect */}
        <motion.button
          onClick={(e) => {
            e.preventDefault()
            // onSelect() - Triggering straight navigation as per user request
            reportConversion(`https://wa.me/573116360057?text=${encodeURIComponent(
              planData.whatsapp_message || "Hola, me gustaría recibir más información."
            )}`)
            notifyInteraction(`Service Button: ${planData.cta}`, {
              plan: plan,
              price: planData.price
            })
          }}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold bg-white text-black relative overflow-hidden group cursor-pointer"
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12"
            initial={{ x: "-150%" }}
            whileHover={{ x: "150%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
          <span className="relative z-10 font-mono">{planData.cta}</span>
          <motion.span
            className="relative z-10"
            initial={{ x: 0 }}
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  )
})

export default function ServicesSection() {
  const { dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()
  const { getPrice } = usePricing()
  const { openModal } = useModal()

  return (
    <section id="services" className="relative pt-0 pb-16 lg:pt-0 lg:pb-24 px-6 bg-black overflow-hidden cv-auto">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
          animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-white font-mono text-sm mb-4"
            initial={{ opacity: 1 }}
          >
            {dictionary.services.subtitle}
          </motion.p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-title text-white">
            {dictionary.services.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1000">
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
        </div>
      </div>
    </section>
  )
}
