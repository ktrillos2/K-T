"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"

export default function HeroSection() {
  const { dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const text = dictionary.hero.slogan
    let index = 0
    setDisplayedText("")
    setIsTypingComplete(false)

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        setIsTypingComplete(true)
        clearInterval(interval)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [dictionary.hero.slogan])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    const isSmallScreen = window.matchMedia?.("(max-width: 768px)")?.matches ?? window.innerWidth < 768
    if (prefersReducedMotion || isSmallScreen) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: { x: number; y: number; speed: number; char: string; opacity: number }[] = []
    const chars = "01アイウエオカキクケコ<>/{}[]();=+-*&^%$#@!"

    let rafId: number | null = null
    let idleId: number | null = null
    let timeoutId: number | null = null

    const start = () => {
      // Optimize particle count based on screen size
      const particleCount = window.innerWidth < 1024 ? 60 : 100

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 0.5,
          char: chars[Math.floor(Math.random() * chars.length)],
          opacity: Math.random() * 0.3 + 0.05,
        })
      }

      ctx.font = "14px Fira Code, monospace"

      const animate = () => {
        ctx.fillStyle = "rgba(10, 10, 10, 0.1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle) => {
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
          ctx.fillText(particle.char, particle.x, particle.y)

          particle.y += particle.speed
          if (particle.y > canvas.height) {
            particle.y = 0
            particle.x = Math.random() * canvas.width
            particle.char = chars[Math.floor(Math.random() * chars.length)]
          }
        })

        rafId = requestAnimationFrame(animate)
      }

      rafId = requestAnimationFrame(animate)
    }

    if ("requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(start, { timeout: 1500 })
    } else {
      timeoutId = window.setTimeout(start, 900)
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (idleId !== null) (window as any).cancelIdleCallback?.(idleId)
      if (timeoutId !== null) window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] z-0" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          className="text-white/60 font-mono text-sm md:text-base mb-6 min-h-[1.5em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {dictionary.hero.greeting}
        </motion.p>

        <motion.h1
          className="relative text-4xl md:text-6xl lg:text-8xl font-bold font-title mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Ghost text to reserve space and prevent CLS */}
          <span className="invisible" aria-hidden="true">
            {dictionary.hero.slogan}
          </span>

          {/* Actual animated text overlay */}
          <span className="absolute inset-0 flex justify-center">
            <span>
              <span className="text-foreground">{displayedText}</span>
              <motion.span
                className="inline-block w-[3px] h-[1em] bg-white ml-1 align-middle"
                animate={{ opacity: isTypingComplete ? [1, 0] : 1 }}
                transition={{
                  duration: 0.5,
                  repeat: isTypingComplete ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "reverse",
                }}
              />
            </span>
          </span>
        </motion.h1>

        <motion.a
          href="#services"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-mono font-bold rounded hover:bg-white/80 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {dictionary.hero.cta}
          <span className="text-lg">→</span>
        </motion.a>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-xs text-muted-foreground font-mono">{dictionary.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>
    </section>
  )
}
