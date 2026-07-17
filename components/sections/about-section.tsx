"use client"

import type React from "react"

import { memo, useState, useRef, useEffect } from "react"
import { m as motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  Code2,
  Rocket,
  Users,
  Zap,
  ChevronRight,
  Terminal,
  Globe,
  ShieldCheck,
  TrendingUp,
  Building2,
  HeartPulse,
  Home,
  Cpu,
  ShoppingBag,
  Plane,
  Car,
  Sparkles,
  BookOpen,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import { fadeUpVariant, staggerContainer, textRevealVariant, ANIMATION_EASING } from "@/lib/animations"

// ─── Types ────────────────────────────────────────────────────────────────────
const values = ["innovation", "quality", "speed", "collaboration"] as const

const iconMap = {
  innovation: Code2,
  quality: ShieldCheck,
  speed: Zap,
  collaboration: TrendingUp,
}

// Real tech stack used across all projects
const techStack = [
  { name: "Next.js" },
  { name: "TypeScript" },
  { name: "React" },
  { name: "Tailwind CSS" },
  { name: "Framer Motion" },
  { name: "Headless CMS" },
  { name: "Vercel" },
  { name: "Supabase" },
  { name: "WhatsApp API" },
  { name: "SEO Técnico" },
]

// Real sectors covered from projects.ts
const sectors = [
  { key: "health", Icon: HeartPulse },
  { key: "realestate", Icon: Home },
  { key: "engineering", Icon: Cpu },
  { key: "ecommerce", Icon: ShoppingBag },
  { key: "tourism", Icon: Plane },
  { key: "automotive", Icon: Car },
  { key: "beauty", Icon: Sparkles },
  { key: "publishing", Icon: BookOpen },
]

// Verifiable capabilities represented in the current website
const stats = [
  { value: "13+", labelKey: "projects" },
  { value: "6", labelKey: "clients" },
  { value: "2", labelKey: "countries" },
  { value: "PC + Móvil", labelKey: "satisfaction" },
]

// ─── ValueCard ────────────────────────────────────────────────────────────────
const ValueCard = memo(function ValueCard({
  value,
  data,
  isActive,
  onClick,
  setCursorVariant,
  dictionary,
  index,
}: {
  value: (typeof values)[number]
  data: { title: string; description: string }
  isActive: boolean
  onClick: () => void
  setCursorVariant: (v: "default" | "text" | "hover") => void
  dictionary: any
  index: number
}) {
  const Icon = iconMap[value]
  const ref = useRef<HTMLButtonElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

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
      className={`relative w-full text-left p-5 overflow-hidden font-mono transition-all duration-300 ${
        isActive
          ? "bg-[#e0e0e0] text-black shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] rounded-xl"
          : "bg-[#111111] text-white border border-white/5 shadow-[inset_8px_8px_16px_#070707,inset_-8px_-8px_16px_#1b1b1b] hover:border-white/20 hover:-translate-y-1 hover:shadow-[inset_8px_8px_16px_#070707,inset_-8px_-8px_16px_#222222,4px_4px_10px_rgba(0,0,0,0.5)] rounded-xl"
      }`}
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98, x: 2, y: 2, boxShadow: "0px 0px 0 rgba(255,255,255,0)" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {/* Glitch / scanline effect for active state */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />
      )}

      <div className="relative z-10 flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-4">
          <div className={`font-bold text-xs w-4 md:w-6 tracking-tighter ${isActive ? "opacity-30 text-black" : "opacity-30 text-white"}`}>0{index + 1}</div>
          <motion.div
            className={`p-2 border ${isActive ? "border-black/20 bg-black/5" : "border-white/10 bg-white/5"}`}
            animate={isActive ? { rotate: [0, -90, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, ease: "anticipate" }}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-black" : "text-white"}`} />
          </motion.div>
          <div>
            <h3 className="font-bold text-sm md:text-lg uppercase tracking-wide block">{data.title}</h3>
            <div className={`overflow-hidden transition-all duration-300 ${isActive ? "max-h-8 mt-1 opacity-100" : "max-h-0 opacity-0"}`}>
               <span className="text-black/70 text-[10px] md:text-xs tracking-widest uppercase">
                 {/* @ts-ignore */}
                 {dictionary.about.clickToExplore || ">> EXPLORAR"}
               </span>
            </div>
          </div>
        </div>
        <div className={`font-bold text-xl md:text-2xl transition-transform duration-300 ${isActive ? "rotate-180 opacity-50" : "opacity-30"}`}>
          {isActive ? "—" : "+"}
        </div>
      </div>
    </motion.button>
  )
})

// ─── TypingCode ───────────────────────────────────────────────────────────────
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
      }, 28)
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

// ─── StatCard ─────────────────────────────────────────────────────────────────
const StatCard = memo(function StatCard({
  value,
  label,
  index,
}: {
  value: string
  label: string
  index: number
}) {
  const delay = (3 - index) * 0.15 + 0.2; // Right to left entrance
  
  return (
    <motion.div 
      className="relative rounded-none bg-transparent overflow-hidden group cursor-crosshair border-t-2 border-white/20 hover:border-white hover:rounded-lg transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      {/* Race Car Streak */}
      <motion.div
        className="absolute inset-y-0 w-full bg-white blur-xl z-30 pointer-events-none skew-x-[-30deg]"
        initial={{ left: "150%" }}
        whileInView={{ left: "-150%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.2, ease: "linear", delay }}
      />
      
      {/* Content wrapper */}
      <motion.div
        className="p-6 w-full h-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1, duration: 0.1 }}
      >
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] text-white/40 font-mono tracking-tighter">[{index}] SYS.STAT</span>
        </div>
        <motion.div
          className="absolute -inset-1 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"
        />
        <p className="text-4xl md:text-5xl font-black font-title text-white tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300">
          {value}
        </p>
        <p className="text-xs text-white/50 font-mono mt-2 uppercase tracking-[0.2em] group-hover:text-white/90 transition-colors">
          // {label}
        </p>
      </motion.div>
    </motion.div>
  )
})

// ─── Brick Wall Components ───────────────────────────────────────────────────
const AnimatedBrick = memo(function AnimatedBrick({ 
  children, 
  isEmpty = false, 
  index = 0 
}: { 
  children?: React.ReactNode, 
  isEmpty?: boolean, 
  index?: number 
}) {
  const hoverColor = "rgba(255, 255, 255, 0.8)";

  return (
    <motion.div
      className={`relative rounded-md border flex items-center justify-center font-mono overflow-hidden
        ${isEmpty 
          ? "border-white/10 bg-white/[0.03] min-w-[50px] md:min-w-[80px] h-[46px]" 
          : "border-white/20 bg-white/5 text-white px-4 h-[46px] min-w-max cursor-crosshair"
        }`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 20 }}
      whileHover={
        isEmpty
          ? { scale: 1.05, backgroundColor: "rgba(255,255,255,0.03)", transition: { duration: 0.2 } }
          : {
              scale: 1.15,
              x: [0, -4, 4, -4, 4, 0],
              y: -8,
              backgroundColor: "rgba(0,0,0,1)", 
              borderColor: hoverColor,
              boxShadow: `0 20px 30px -10px ${hoverColor.replace('0.8', '0.2')}`,
              zIndex: 50,
              transition: { 
                x: { repeat: Number.POSITIVE_INFINITY, duration: 0.3, ease: "linear" },
                scale: { type: "spring", stiffness: 400, damping: 10 }
              }
            }
      }
      whileTap={!isEmpty ? { scale: 0.9, x: 0, y: 0 } : undefined}
    >
      {children}
    </motion.div>
  )
})

const BrickWall = memo(function BrickWall({ 
  items, 
  renderItem, 
  layout,
  align = "left"
}: { 
  items: any[], 
  renderItem: (item: any) => React.ReactNode,
  layout: number[][],
  align?: "left" | "right" | "center"
}) {
  let itemIndex = 0;
  
  const alignClass = 
    align === "right" ? "items-center lg:items-end mx-auto lg:ml-auto lg:mr-0" : 
    align === "left" ? "items-center lg:items-start mx-auto lg:mx-0" : 
    "items-center mx-auto";

  return (
    <div className={`flex flex-col gap-2 w-fit ${alignClass}`}>
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.map((p, colIndex) => {
            const isItem = p === 1 && itemIndex < items.length;
            const data = isItem ? items[itemIndex++] : null;
            
            return (
              <AnimatedBrick key={`${rowIndex}-${colIndex}`} isEmpty={!isItem} index={rowIndex * 5 + colIndex}>
                {isItem ? renderItem(data) : null}
              </AnimatedBrick>
            )
          })}
        </div>
      ))}
    </div>
  )
})

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AboutSection() {
  const { dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()

  const [activeValue, setActiveValue] = useState<(typeof values)[number]>("innovation")
  const [isCompiled, setIsCompiled] = useState(false)

  const [particles, setParticles] = useState<Array<{ x: number; y: number; duration: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = [...Array(10)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * 900,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    setIsCompiled(false)
    const timer = setTimeout(() => {
      setIsCompiled(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [activeValue])

  // Terminal lines for the right panel
  const terminalLines: Record<(typeof values)[number], Array<{ label: string; value: string; color: string }>> = {
    innovation: [
      { label: "framework", value: '"Next.js 15 App Router"', color: "text-cyan-400" },
      { label: "language", value: '"TypeScript 5"', color: "text-blue-400" },
      { label: "pattern", value: '"Headless Architecture"', color: "text-purple-400" },
      { label: "cms", value: '"Sanity v3"', color: "text-orange-400" },
    ],
    quality: [
      { label: "lcp", value: '"objetivo ≤ 2.5s"', color: "text-green-400" },
      { label: "cls", value: '"objetivo ≤ 0.1"', color: "text-green-400" },
      { label: "inp", value: '"objetivo ≤ 200ms"', color: "text-green-400" },
      { label: "audit", value: '"medición real"', color: "text-yellow-400" },
    ],
    speed: [
      { label: "hosting", value: '"según el proyecto"', color: "text-white" },
      { label: "cdn", value: '"cuando aplica"', color: "text-teal-400" },
      { label: "render", value: '"SSR · SSG · ISR"', color: "text-cyan-400" },
      { label: "monitoring", value: '"por región"', color: "text-green-400" },
    ],
    collaboration: [
      { label: "process", value: '"documentado"', color: "text-emerald-400" },
      { label: "work", value: '"remoto"', color: "text-blue-400" },
      { label: "support", value: '"según el plan"', color: "text-green-400" },
      { label: "delivery", value: '"por hitos"', color: "text-yellow-400" },
    ],
  }

  return (
    <section
      id="about"
      aria-label="Sobre nosotros"
      className="relative pt-16 lg:pt-24 px-6 bg-black overflow-hidden"
    >
      {/* Background glow + particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.012] rounded-full blur-3xl" />
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            initial={{ x: particle.x, y: particle.y }}
            animate={{ y: [null, -120], opacity: [0, 0.7, 0] }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            className="text-white/60 font-mono text-sm mb-4 flex items-center justify-center gap-2"
            variants={fadeUpVariant}
          >
            <Terminal className="w-4 h-4" />
            {dictionary.about.subtitle}
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight"
            variants={textRevealVariant}
          >
            {dictionary.about.title}
          </motion.h2>
        </motion.div>

        {/* ── Stats Row ── */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatCard
                key={stat.labelKey}
                value={stat.value}
                label={(dictionary.about.stats as any)[stat.labelKey]}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ── Main Grid: Values + Terminal ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">

          {/* Left — Description + Interactive values */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            <p className="text-white/70 font-mono text-base leading-relaxed">
              {dictionary.about.description}
            </p>

            {/* Team authority badge */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 w-fit">
              <Globe className="w-4 h-4 text-white/60 flex-shrink-0" />
              {/* @ts-ignore */}
              <span className="text-white/60 text-xs font-mono">{dictionary.about.teamAuthority}</span>
            </div>

            {/* Value cards */}
            <div className="space-y-3">
              {values.map((value, i) => (
                <motion.div
                  key={value}
                  variants={fadeUpVariant}
                >
                  <ValueCard
                    value={value}
                    data={dictionary.about.values[value]}
                    isActive={activeValue === value}
                    onClick={() => setActiveValue(value)}
                    setCursorVariant={setCursorVariant}
                    dictionary={dictionary}
                    index={i}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Terminal */}
          <motion.div
            className="relative"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="rounded-xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl flex flex-col transition-shadow duration-300 hover:shadow-[0_0_80px_rgba(255,255,255,0.08)]"
              initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
              whileInView={{ boxShadow: "0 0 60px rgba(255,255,255,0.05)" }}
              viewport={{ once: true }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-white/10">
                <motion.div className="w-3 h-3 rounded-full bg-[#FF5F56]" whileHover={{ scale: 1.4 }} />
                <motion.div className="w-3 h-3 rounded-full bg-[#FFBD2E]" whileHover={{ scale: 1.4 }} />
                <motion.div className="w-3 h-3 rounded-full bg-[#27C93F]" whileHover={{ scale: 1.4 }} />
                <span className="ml-3 text-xs text-white/50 font-mono">~/k&t/{activeValue}.config.ts</span>
              </div>

              {/* Code body */}
              <div className="p-6 flex-1 min-h-[280px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeValue}
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.25 }}
                    className="font-mono text-sm space-y-2"
                  >
                    {/* Comment */}
                    <p className="text-white/30">
                      <TypingCode text={`// ${dictionary.about.values[activeValue].title}`} />
                    </p>

                    {/* export const block */}
                    <p>
                      <span className="text-purple-400">export const </span>
                      <span className="text-cyan-400">{activeValue}</span>
                      <span className="text-white"> = </span>
                      <span className="text-yellow-400">{"{"}</span>
                    </p>

                    {/* Dynamic fields */}
                    <motion.div
                      className="pl-4 space-y-1.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                    >
                      {/* Description line */}
                      <p>
                        <span className="text-cyan-400">description</span>
                        <span className="text-white">: </span>
                        <span className="text-green-400">
                          &quot;<TypingCode text={dictionary.about.values[activeValue].description} delay={150} />&quot;
                        </span>
                        <span className="text-white">,</span>
                      </p>

                      {/* Dynamic extra fields per value */}
                      {terminalLines[activeValue].map((line, idx) => (
                        <motion.p
                          key={line.label}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.08 }}
                        >
                          <span className="text-cyan-400">{line.label}</span>
                          <span className="text-white">: </span>
                          <span className={line.color}>{line.value}</span>
                          <span className="text-white">,</span>
                        </motion.p>
                      ))}
                    </motion.div>

                    <p>
                      <span className="text-yellow-400">{"}"}</span>
                      <span className="text-purple-400"> as const</span>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Compile progress bar */}
              <div className="px-6 pb-5 space-y-2">
                <div className="flex justify-between text-xs text-white/40 font-mono">
                  {/* @ts-ignore */}
                  <span>{dictionary.about.compiling}</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isCompiled ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* @ts-ignore */}
                    {dictionary.about.done}
                  </motion.span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full transition-colors duration-500 ${
                      isCompiled
                        ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        : "bg-gradient-to-r from-white/40 to-white"
                    }`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Bottom Grid: Tech Stack & Sectors ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start pb-16">
          {/* ── Tech Stack ── */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-left w-full"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-4 h-4 text-white/40" />
              {/* @ts-ignore */}
              <p className="text-white/40 font-mono text-xs uppercase tracking-widest">{dictionary.about.techStack}</p>
            </div>
            <BrickWall 
              items={techStack}
              layout={[
                [1, 0, 1],
                [1, 0, 0, 1],
                [0, 1, 0, 1, 0],
                [1, 0, 0, 1],
                [1, 0, 1]
              ]}
              renderItem={(tech) => (
                <span className="text-[10px] md:text-sm font-medium px-2 text-center leading-tight">{tech.name}</span>
              )}
              align="left"
            />
          </motion.div>

          {/* ── Sectors / Industries ── */}
          <motion.div
            className="flex flex-col items-center lg:items-end text-right w-full"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
          <div className="flex items-center gap-3 mb-6 flex-row-reverse">
            <Rocket className="w-4 h-4 text-white/40" />
            {/* @ts-ignore */}
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest">{dictionary.about.sectorsTitle}</p>
          </div>
          <BrickWall 
            items={sectors}
            layout={[
              [0, 1, 0],
              [1, 0, 0, 1],
              [0, 1, 0, 1, 0],
              [1, 0, 0, 1],
              [0, 1, 0]
            ]}
            renderItem={(sector) => {
              const Icon = sector.Icon;
              return (
                <div className="flex items-center gap-1.5 md:gap-2 text-white/90 px-1">
                  <Icon className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="text-[10px] md:text-xs font-medium text-center leading-tight">{(dictionary.about.sectors as any)[sector.key]}</span>
                </div>
              )
            }}
            align="right"
          />
        </motion.div>
        </div>

      </div>
    </section>
  )
}
