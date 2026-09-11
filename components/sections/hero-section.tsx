"use client"

import { useEffect, useRef, useState } from "react"
import { m as motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import { useModal } from "@/context/modal-context"
import { trackGAEvent } from "@/lib/analytics"
import Link from "next/link"

export default function HeroSection() {
  const { dictionary, language } = useLanguage()
  const isEn = language === "en"
  const { openModal } = useModal()
  const { setCursorVariant } = useCursor()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  // Typewriter effect - Fast terminal-style typing animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    const text = dictionary.hero.slogan

    if (prefersReducedMotion) {
      setDisplayedText(text)
      setIsTypingComplete(true)
      return
    }

    setDisplayedText("")
    setIsTypingComplete(false)

    let index = 0
    let interval: NodeJS.Timeout | null = null

    // Short initial delay so hero element entrance aligns with typing start
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index++
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index))
        } else {
          setIsTypingComplete(true)
          if (interval) clearInterval(interval)
        }
      }, 22) // Fast typing speed (~22ms per char)
    }, 150)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [dictionary.hero.slogan])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    if (prefersReducedMotion) return

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
      const particleCount = window.innerWidth < 768 ? 40 : window.innerWidth < 1024 ? 60 : 100

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

      let lastTime = 0
      const fps = 30 // Cap at 30fps for performance
      const frameInterval = 1000 / fps

      const animate = (time: number) => {
        if (document.hidden) {
          rafId = requestAnimationFrame(animate)
          return
        }

        const deltaTime = time - lastTime

        if (deltaTime > frameInterval) {
          lastTime = time - (deltaTime % frameInterval)

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
        }

        rafId = requestAnimationFrame(animate)
      }

      rafId = requestAnimationFrame(animate)
    }

    if ("requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(start, { timeout: 2500 })
    } else {
      timeoutId = setTimeout(start, 2500) as unknown as number
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (idleId !== null) (window as any).cancelIdleCallback?.(idleId)
      if (timeoutId !== null) window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section id="hero" aria-label="Presentación y propuesta de valor de K&T Code" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>

      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
          }
        }}
      >
        <motion.p 
          className="text-emerald-400 font-mono text-xs md:text-sm tracking-wider uppercase mb-4 min-h-[1.5em] flex items-center justify-center gap-2"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
          }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {dictionary.hero.greeting}
        </motion.p>

        <motion.h1 
          className="relative text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-title leading-tight md:leading-[1.1] max-w-4xl mx-auto mb-6 flex items-center justify-center text-center text-white min-h-[3.3em]"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
            }
          }}
        >
          {/* Accessible full title for SEO crawlers and screen readers */}
          <span className="sr-only">{dictionary.hero.slogan}</span>

          {/* Visual fast typewriter animation */}
          <span aria-hidden="true" className="inline">
            <span className="text-white">{displayedText}</span>
            <motion.span
              className="inline-block w-[3px] sm:w-[4px] md:w-[6px] h-[0.9em] bg-emerald-400 ml-1.5 md:ml-2 align-middle shadow-[0_0_8px_rgba(52,211,153,0.8)]"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: isTypingComplete ? 0.7 : 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </span>
        </motion.h1>

        <motion.p
          className="text-neutral-300 font-mono text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
          }}
        >
          {dictionary.hero.description}
        </motion.p>

        {/* Priority Commercial CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-8"
          variants={{
            hidden: { opacity: 0, scale: 0.95, y: 20 },
            visible: { 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
            }
          }}
        >
          {/* Cotizar Landing Page */}
          <button
            onClick={() => {
              openModal("landing")
              trackGAEvent("begin_quote", {
                service_type: "landing-pages",
                click_location: "hero_primary_cta",
              })
            }}
            aria-label={dictionary.hero.ctaLanding}
            className="w-full sm:w-auto relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black font-mono font-bold text-xs sm:text-sm rounded-xl border-2 border-white shadow-[4px_4px_0_rgba(255,255,255,0.2)] hover:shadow-[1px_1px_0_rgba(255,255,255,0.2)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 cursor-pointer group"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              {dictionary.hero.ctaLanding}
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>

          {/* Cotizar Tienda Virtual */}
          <button
            onClick={() => {
              openModal("ecommerce")
              trackGAEvent("begin_quote", {
                service_type: "tiendas-virtuales",
                click_location: "hero_secondary_cta",
              })
            }}
            aria-label={dictionary.hero.ctaStore}
            className="w-full sm:w-auto relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs sm:text-sm rounded-xl border border-white/30 hover:border-white transition-all duration-200 cursor-pointer group"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
              {dictionary.hero.ctaStore}
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
        </motion.div>

        {/* Descriptive Crawlable Links to Priority Services */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6 font-mono text-xs text-neutral-400"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.4, duration: 0.6 } }
          }}
        >
          <Link
            href={isEn ? "/en/services/landing-pages" : "/servicios/landing-pages"}
            className="hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white"
          >
            {isEn ? "Landing Pages: From $200 USD" : "Landing Pages: Desde $450.000 COP"}
          </Link>
          <span className="text-white/20">•</span>
          <Link
            href={isEn ? "/en/services/ecommerce-development" : "/servicios/tiendas-virtuales"}
            className="hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white"
          >
            {isEn ? "E-commerce: From $450 USD" : "Tiendas Virtuales: Desde $1.300.000 COP"}
          </Link>
          <span className="text-white/20">•</span>
          <Link
            href={isEn ? "/en/portfolio" : "/portafolio"}
            className="hover:text-white transition-colors"
          >
            {dictionary.hero.cta} →
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs text-white font-mono">{dictionary.hero.scroll}</span>
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
