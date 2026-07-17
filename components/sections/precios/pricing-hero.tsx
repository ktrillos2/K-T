"use client"

import { m as motion } from "framer-motion"
import { useCursor } from "@/context/cursor-context"
import { smoothScrollTo } from "@/lib/utils"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useEffect } from "react"
import { useLanguage } from "@/context/language-context"

export default function PricingHero() {
  const { setCursorVariant } = useCursor()
  const { dictionary } = useLanguage()

  useEffect(() => {
    // Send event on mount
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "view_pricing", {
        event_category: "pricing",
        event_label: "Pricing Page Loaded"
      })
    }
  }, [])

  const handleScrollToPlans = () => {
    const el = document.getElementById("plans")
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }

  const handleContactClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "click_whatsapp", {
        event_category: "pricing_hero",
        event_label: "Solicitar cotizacion"
      })
    }
    window.open("https://wa.me/573116360057?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n%20para%20un%20proyecto.", "_blank")
  }

  return (
    <section className="relative px-6 pt-20 lg:pt-32 pb-16 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          {/* @ts-ignore */}
          {dictionary.pricingHero.badge}
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-title leading-normal tracking-tight py-2 mt-2">
          {/* @ts-ignore */}
          {dictionary.pricingHero.title}
        </h1>

        <p className="text-lg md:text-xl text-white/60 font-mono max-w-3xl mx-auto leading-relaxed">
          {/* @ts-ignore */}
          {dictionary.pricingHero.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <motion.button
            onClick={handleScrollToPlans}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            className="group relative px-8 py-4 bg-white text-black font-bold font-mono rounded-lg overflow-hidden w-full sm:w-auto flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* @ts-ignore */}
            <span className="relative z-10">{dictionary.pricingHero.viewPlans}</span>
            <ChevronDown className="w-4 h-4 relative z-10 group-hover:translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </motion.button>

          <motion.button
            onClick={handleContactClick}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            className="group relative px-8 py-4 bg-transparent text-white border border-white/20 font-bold font-mono rounded-lg overflow-hidden w-full sm:w-auto flex items-center justify-center gap-3 hover:border-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* @ts-ignore */}
            <span className="relative z-10">{dictionary.pricingHero.requestQuote}</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
