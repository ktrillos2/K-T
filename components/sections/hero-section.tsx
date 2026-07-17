"use client"

import { useEffect, useRef, useState } from "react"
import { m as motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import Link from "next/link"

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          className="text-white font-mono text-sm md:text-base mb-6 min-h-[1.5em]"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
          }}
        >
          {dictionary.hero.greeting}
        </motion.p>

        <motion.h1 
          className="relative text-4xl md:text-6xl lg:text-8xl font-bold font-title mb-8 flex justify-center"
          variants={{
            hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0, y: 20 },
            visible: { 
              clipPath: "inset(0% 0 0 0)", 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] }
            }
          }}
        >
          <span>
            <span className="text-foreground">{dictionary.hero.slogan}</span>
            <motion.span
              className="inline-block w-[3px] h-[1em] bg-white ml-2 align-middle"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </span>
        </motion.h1>

        <motion.div
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
          <Link href="/portafolio">
            <motion.span
              className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-mono font-bold rounded-xl border-2 border-white shadow-[6px_6px_0_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0_rgba(255,255,255,0.2)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-0" />
              <span className="relative z-10 flex items-center gap-2">
                {dictionary.hero.cta}
                <span className="text-lg">→</span>
              </span>
            </motion.span>
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
