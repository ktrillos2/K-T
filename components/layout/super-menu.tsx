"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { m as motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { useCursor } from "@/context/cursor-context"
import { smoothScrollTo } from "@/lib/utils"
import { Instagram, Facebook } from "lucide-react"

// Custom TikTok Icon
const TikTok = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

const socials = [
  { icon: TikTok, href: "https://www.tiktok.com/@kytweb", label: "TikTok" },
  { icon: Instagram, href: "https://www.instagram.com/ktweb_/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/KTSolutionsWeb", label: "Facebook" },
]

interface SuperMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { key: "home", href: "#hero", image: "/images/home-preview.png" },
  { key: "about", href: "#about", image: "/images/about-preview.png" },
  { key: "services", href: "#services", image: "/images/services-preview.png" },
  { key: "work", href: "#projects", image: "/images/work-preview.png" },
  { key: "blog", href: "/blog", image: "/images/work-preview.png" }, // Reusing an image for preview
  { key: "contact", href: "#contact", image: "/images/contact-preview.png" },
]

export default function SuperMenu({ isOpen, onClose }: SuperMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { dictionary } = useLanguage()
  const { setCursorVariant } = useCursor()

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" as any },
    },
    open: {
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" as any },
    },
  }

  const itemVariants = {
    closed: { x: -50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as any },
    }),
  }

  const router = useRouter()
  const pathname = usePathname()

  const handleLinkClick = (href: string) => {
    onClose()

    // Dar tiempo a que el modal comience a cerrarse para no asfixiar el cálculo del scroll
    setTimeout(() => {
      if (href.startsWith("#")) {
        if (pathname === "/") {
          const element = document.querySelector(href)
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        } else {
          router.push(`/${href}`)
        }
      } else {
        router.push(href)
      }
    }, 150)
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
          <div className="h-full flex max-w-7xl mx-auto">
            {/* Left side - Navigation links */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 lg:px-0 pt-24">
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
                          className={`text-5xl lg:text-7xl font-bold font-title transition-colors duration-300 ${isHovered ? "text-white" : "text-white/80"
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
                {/* @ts-ignore */}
                <p>{dictionary.nav.agency}</p>
                <div className="flex flex-col gap-2 mt-2">
                  <a
                    href="mailto:contactoktweb@gmail.com"
                    className="text-white hover:text-white/80 transition-colors w-fit"
                    onMouseEnter={() => setCursorVariant("text")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    contactoktweb@gmail.com
                  </a>
                  <a
                    href="tel:+573116360057"
                    className="text-white hover:text-white/80 transition-colors w-fit"
                    onMouseEnter={() => setCursorVariant("text")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    +57 311 636 0057
                  </a>

                  {/* Social Icons in Header Menu */}
                  <div className="flex gap-3 mt-4">
                    {socials.map((social) => {
                      const Icon = social.icon
                      return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors border border-white/10 hover:border-white"
                          onMouseEnter={() => setCursorVariant("hover")}
                          onMouseLeave={() => setCursorVariant("default")}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Preview window */}
            <div className="hidden lg:flex w-1/2 h-full items-center justify-center p-16 relative overflow-hidden">
              {/* Removed gradient overlay as requested */}

              <AnimatePresence mode="wait">
                {hoveredItem && (
                  <motion.div
                    key={hoveredItem}
                    className="relative w-full max-w-lg h-auto rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-950"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
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
                    <div className="relative pt-8 w-full">
                      <img
                        src={menuItems.find((m) => m.key === hoveredItem)?.image || ""}
                        alt={hoveredItem}
                        className="w-full h-auto block"
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
                  <p className="text-white/40 font-mono text-sm">{dictionary.nav.hoverHint}</p>
                </motion.div>
              )}
            </div>
          </div >
        </motion.div >
      )
      }
    </AnimatePresence >
  )
}
