"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import { smoothScrollTo } from "@/lib/utils"
import SuperMenu from "./super-menu"
import { countryCodes } from "@/lib/country-codes"
/* eslint-disable @next/next/no-img-element */

export default function Header() {
  /* eslint-enable @next/next/no-img-element */
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrolledRef = useRef<boolean>(false)
  const rafRef = useRef<number | null>(null)
  const { dictionary, country, setCountry } = useLanguage()
  const { setCursorVariant } = useCursor()
  const [isCountryOpen, setIsCountryOpen] = useState(false)

  const currentCountry = countryCodes.find((c) => c.name === country)

  // Hide header on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  useEffect(() => {
    const update = () => {
      rafRef.current = null
      const next = window.scrollY > 50
      if (next !== lastScrolledRef.current) {
        lastScrolledRef.current = next
        setIsScrolled(next)
      }
    }

    const handleScroll = () => {
      if (rafRef.current !== null) return
      rafRef.current = window.requestAnimationFrame(update)
    }

    // Initialize once
    update()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300 ${isScrolled && !isMenuOpen
          ? "backdrop-blur-md bg-black/80 border-b border-white/10"
          : "bg-transparent border-b border-transparent"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button
            className="relative w-48 h-20 cursor-pointer"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              if (pathname === '/') {
                window.scrollTo({ top: 0, behavior: "instant" })
                smoothScrollTo(0, 1000)
              } else {
                router.push('/')
              }
            }}
          >
            <Image src="/images/logo.png" alt="K&T Agencia Digital - Desarrollo Web y Gestión de Redes Sociales en Colombia" fill sizes="(max-width: 768px) 150px, 200px" className="object-none" priority />
          </motion.button>

          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.button
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="px-3 py-2 text-sm font-mono rounded hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center border border-white/10 gap-2"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentCountry && (
                  <img
                    src={`https://flagcdn.com/w40/${currentCountry.iso}.png`}
                    alt={country}
                    className="w-5 h-auto rounded-sm object-cover"
                  />
                )}
                <span className="hidden md:inline">{country}</span>
              </motion.button>

              <AnimatePresence>
                {isCountryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 bg-zinc-900 border border-white/20 rounded-xl p-1 flex flex-col gap-1 min-w-[140px] z-50 overflow-hidden shadow-xl"
                  >
                    {countryCodes.map((c) => (
                      <button
                        key={c.iso}
                        onClick={() => {
                          // @ts-ignore
                          setCountry(c.name)
                          setIsCountryOpen(false)
                        }}
                        className={`px-3 py-2 text-xs font-mono text-left rounded hover:bg-white/10 transition-colors flex items-center gap-2 ${country === c.name ? "text-white bg-white/10" : "text-white"
                          }`}
                      >
                        <img
                          src={`https://flagcdn.com/w40/${c.iso}.png`}
                          alt={c.name}
                          className="w-4 h-auto rounded-sm object-cover"
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-4 py-2 text-sm font-mono border border-white/30 rounded hover:border-white hover:bg-white hover:text-black transition-all duration-300"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dictionary.nav.close}
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dictionary.nav.menu}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div >
        </div >
      </motion.header >

      <SuperMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
