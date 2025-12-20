"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"

interface SuperMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { key: "home", href: "#hero", image: "/dark-website-hero-section-with-matrix-code-effect.jpg" },
  { key: "about", href: "#about", image: "/dark-about-us-section-with-terminal-window-style.jpg" },
  { key: "services", href: "#services", image: "/dark-pricing-cards-with-macbook-window-buttons.jpg" },
  { key: "work", href: "#projects", image: "/dark-portfolio-projects-gallery-grid.jpg" },
  { key: "contact", href: "#contact", image: "/dark-contact-form-with-3d-visualization.jpg" },
]

export default function SuperMenu({ isOpen, onClose }: SuperMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  }

  const itemVariants = {
    closed: { x: -50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  }

  const handleLinkClick = (href: string) => {
    onClose()
    setTimeout(() => {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-30 bg-black"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <div className="h-full flex">
            {/* Left side - Navigation links */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 lg:px-16">
              <nav className="space-y-4">
                {menuItems.map((item, index) => {
                  const isHovered = hoveredItem === item.key
                  const hasHover = hoveredItem !== null
                  const isBlurred = hasHover && !isHovered

                  return (
                    <motion.div key={item.key} custom={index} variants={itemVariants} initial="closed" animate="open">
                      <motion.button
                        onClick={() => handleLinkClick(item.href)}
                        className="block text-left w-full"
                        onMouseEnter={() => {
                          setHoveredItem(item.key)
                          setCursorVariant("text")
                        }}
                        onMouseLeave={() => {
                          setHoveredItem(null)
                          setCursorVariant("default")
                        }}
                        animate={{
                          filter: isBlurred ? "blur(6px)" : "blur(0px)",
                          opacity: isBlurred ? 0.4 : 1,
                          scale: isHovered ? 1.05 : 1,
                          x: isHovered ? 20 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-white/40 text-sm font-mono">0{index + 1}.</span>
                        <h2
                          className={`text-5xl lg:text-7xl font-bold font-title transition-colors duration-300 ${
                            isHovered ? "text-white" : "text-white/80"
                          }`}
                          style={{ textShadow: isHovered ? "0 0 30px rgba(255,255,255,0.5)" : "none" }}
                        >
                          {dictionary.nav[item.key as keyof typeof dictionary.nav]}
                        </h2>
                      </motion.button>
                    </motion.div>
                  )
                })}
              </nav>

              <motion.div
                className="mt-16 text-sm text-white/50 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p>// K&T Digital Agency</p>
                <p className="text-white">contactoktweb@gmail.com</p>
              </motion.div>
            </div>

            {/* Right side - Preview window */}
            <div className="hidden lg:flex w-1/2 h-full items-center justify-center p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent z-10" />

              <AnimatePresence mode="wait">
                {hoveredItem && (
                  <motion.div
                    key={hoveredItem}
                    className="relative w-full max-w-lg h-[400px] rounded-xl overflow-hidden border border-white/20 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ perspective: 1000 }}
                  >
                    {/* macOS-style window header */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-neutral-900 flex items-center px-3 gap-2 z-20 border-b border-white/10">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                      <span className="ml-4 text-xs text-white/50 font-mono">preview_{hoveredItem}.tsx</span>
                    </div>

                    {/* Preview image */}
                    <div className="absolute inset-0 pt-8 bg-neutral-950">
                      <img
                        src={menuItems.find((m) => m.key === hoveredItem)?.image || ""}
                        alt={hoveredItem}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Scanline overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/5 via-transparent to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>

              {!hoveredItem && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className="text-6xl font-bold text-white/20 font-title mb-4"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.1)",
                        "0 0 20px rgba(255,255,255,0.2)",
                        "0 0 10px rgba(255,255,255,0.1)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {"{ }"}
                  </motion.div>
                  <p className="text-white/40 font-mono text-sm">// Hover a link to preview</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
