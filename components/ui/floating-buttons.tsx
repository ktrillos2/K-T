"use client"

import { m as motion, AnimatePresence } from "framer-motion"
import { useCursor } from "@/context/cursor-context"
import { useModal } from "@/context/modal-context"
import { Sparkles } from "lucide-react"
import { trackTikTokEvent } from "@/app/actions/tiktok"
import { notifyInteraction } from "@/app/actions/notify-click"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function FloatingButtons() {
    const pathname = usePathname()
    const { setCursorVariant } = useCursor()
    const { openModal } = useModal()

    // Don't show on admin or studio pages
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/studio')) return null

    const handleWhatsAppClick = () => {
        notifyInteraction("WhatsApp Button (Direct)")
        trackTikTokEvent("ClickButton", {
            content_name: "Open WhatsApp Direct",
            content_type: "button"
        })
        window.open('https://wa.me/573116360057?text=Hola%20K%26T%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.', '_blank')
    }

    const handleQuoteClick = () => {
        openModal()
        notifyInteraction("Quote Button (Floating)")
        trackTikTokEvent("ClickButton", {
            content_name: "Open Quote Modal",
            content_type: "button"
        })
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 } as any
        }
    }

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <AnimatePresence>
                {/* Quote Button */}
                <motion.button
                    key="quote-btn"
                    onClick={handleQuoteClick}
                    className="pointer-events-auto group flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                >
                    <Sparkles size={18} className="animate-pulse" />
                    <span className="font-bold text-sm">Cotizar tu proyecto</span>
                </motion.button>

                {/* WhatsApp Button */}
                <motion.button
                    key="whatsapp-btn"
                    onClick={handleWhatsAppClick}
                    className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-shadow duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                >
                    {/* Pulse effect */}
                    <motion.span
                        className="absolute inset-0 rounded-full bg-[#25D366]"
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 0, 0.6],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />
                    <div className="flex items-center justify-center z-20 ">
                        <Image
                            src="/whatsapp-logo.png"
                            alt="WhatsApp"
                            width={34}
                            height={34}
                            className="object-contain drop-shadow-md"
                        />
                    </div>
                </motion.button>
            </AnimatePresence>
        </motion.div>
    )
}
