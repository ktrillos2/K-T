"use client"

import type React from "react"

import { memo, useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Code2, Rocket, Users, Zap, ChevronRight, Terminal } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"

const values = ["innovation", "quality", "speed", "collaboration"] as const

const iconMap = {
  innovation: Code2,
  quality: Rocket,
  speed: Zap,
  collaboration: Users,
}

const ValueCard = memo(function ValueCard({
  value,
  data,
  isActive,
  onClick,
  setCursorVariant,
}: {
  value: (typeof values)[number]
  data: { title: string; description: string }
  isActive: boolean
  onClick: () => void
  setCursorVariant: (v: string) => void
}) {
  const Icon = iconMap[value]
  const ref = useRef<HTMLButtonElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

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
    <motion.button
      ref={ref}
      onClick={onClick}
      className={`w-full text-left p-5 rounded-xl border backdrop-blur-sm transition-colors duration-200 ${
        isActive
          ? "bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:bg-white/10"
      }`}
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-4">
          <motion.div
            className={`p-2.5 rounded-lg ${isActive ? "bg-black/10" : "bg-white/10"}`}
            animate={isActive ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-black" : "text-white/60"}`} />
          </motion.div>
          <div>
            <span className="font-mono font-bold text-lg block">{data.title}</span>
            {isActive && (
              <motion.span
                className="text-black/60 text-xs font-mono"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Click to explore
              </motion.span>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isActive ? 90 : 0, x: isActive ? 0 : -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ChevronRight className={`w-5 h-5 ${isActive ? "text-black" : "text-white/40"}`} />
        </motion.div>
      </div>
    </motion.button>
  )
})

const StatCounter = memo(function StatCounter({
  value,
  label,
  suffix = "",
  delay = 0,
}: {
  value: number
  label: string
  suffix?: string
  delay?: number
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const start = 0
          const duration = 2000
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
          }

          setTimeout(() => requestAnimationFrame(animate), delay)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, delay, hasAnimated])

  return (
    <motion.div
      ref={ref}
      className="text-center group cursor-default"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <motion.div className="relative">
        <motion.span
          className="text-5xl md:text-6xl font-bold font-title text-white block"
          animate={{ opacity: hasAnimated ? 1 : 0.3 }}
        >
          {count}
          {suffix}
        </motion.span>
        <motion.div
          className="absolute -inset-4 bg-white/5 rounded-2xl -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
        />
      </motion.div>
      <span className="text-white/40 text-sm font-mono mt-3 block group-hover:text-white/60 transition-colors">
        {label}
      </span>
    </motion.div>
  )
})

const TypingCode = memo(function TypingCode({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    setDisplayed("")
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
        }
      }, 30)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span>
      {displayed}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
    </span>
  )
})

export default function AboutSection() {
  const { dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()
  const [activeValue, setActiveValue] = useState<(typeof values)[number]>("innovation")

  return (
    <section id="about" className="relative py-24 lg:py-32 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * 800,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-white/40 font-mono text-sm mb-4 flex items-center justify-center gap-2"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Terminal className="w-4 h-4" />
            {dictionary.about.subtitle}
          </motion.p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-title text-white">{dictionary.about.title}</h2>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left - Interactive values */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/60 font-mono text-lg mb-8 leading-relaxed">{dictionary.about.description}</p>

            <div className="space-y-4">
              {values.map((value, i) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ValueCard
                    value={value}
                    data={dictionary.about.values[value]}
                    isActive={activeValue === value}
                    onClick={() => setActiveValue(value)}
                    setCursorVariant={setCursorVariant}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Terminal with typing effect */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-32">
              {/* Terminal window with glow */}
              <motion.div
                className="rounded-xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl"
                animate={{ boxShadow: `0 0 60px rgba(255,255,255,0.05)` }}
                whileHover={{ boxShadow: `0 0 80px rgba(255,255,255,0.1)` }}
              >
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-white/10">
                  <motion.div className="w-3 h-3 rounded-full bg-[#FF5F56]" whileHover={{ scale: 1.4 }} />
                  <motion.div className="w-3 h-3 rounded-full bg-[#FFBD2E]" whileHover={{ scale: 1.4 }} />
                  <motion.div className="w-3 h-3 rounded-full bg-[#27C93F]" whileHover={{ scale: 1.4 }} />
                  <span className="ml-3 text-xs text-white/40 font-mono">~/k&t/{activeValue}.ts</span>
                </div>

                <div className="p-6 min-h-[350px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeValue}
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="font-mono text-sm space-y-2">
                        <p className="text-white/30">
                          <TypingCode text={`// ${dictionary.about.values[activeValue].title}`} />
                        </p>
                        <p>
                          <span className="text-purple-400">export const</span>{" "}
                          <span className="text-cyan-400">{activeValue}</span> <span className="text-white">=</span>{" "}
                          <span className="text-yellow-400">{"{"}</span>
                        </p>
                        <motion.div
                          className="pl-4 space-y-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p>
                            <span className="text-cyan-400">message</span>
                            <span className="text-white">:</span>{" "}
                            <span className="text-green-400">
                              "<TypingCode text={dictionary.about.values[activeValue].description} delay={200} />"
                            </span>
                            <span className="text-white">,</span>
                          </p>
                          <p>
                            <span className="text-cyan-400">active</span>
                            <span className="text-white">:</span> <span className="text-orange-400">true</span>
                            <span className="text-white">,</span>
                          </p>
                          <p>
                            <span className="text-cyan-400">level</span>
                            <span className="text-white">:</span> <span className="text-orange-400">"maximum"</span>
                          </p>
                        </motion.div>
                        <p>
                          <span className="text-yellow-400">{"}"}</span>{" "}
                          <span className="text-purple-400">as const</span>
                        </p>
                      </div>

                      {/* Animated progress bar */}
                      <div className="mt-8 space-y-2">
                        <div className="flex justify-between text-xs text-white/40 font-mono">
                          <span>Compiling...</span>
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                            Done!
                          </motion.span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-white/50 to-white rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats with animated counters */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <StatCounter value={50} suffix="+" label={dictionary.about.stats.projects} delay={0} />
          <StatCounter value={30} suffix="+" label={dictionary.about.stats.clients} delay={200} />
          <StatCounter value={3} suffix="+" label={dictionary.about.stats.years} delay={400} />
          <StatCounter value={100} suffix="%" label={dictionary.about.stats.satisfaction} delay={600} />
        </motion.div>
      </div>
    </section>
  )
}
