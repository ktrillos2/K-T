"use client"

import { useState, useEffect } from "react"
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
    const [showQuote, setShowQuote] = useState(false)

    const [isQuotationUrl, setIsQuotationUrl] = useState(false)

    useEffect(() => {
        // Detect if we are on a quotation subdomain or path
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname
            const subdomain = hostname.split('.')[0]
            const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1')
            const isMainDomain = subdomain === 'www' || subdomain === 'kytcode' || isLocalhost
            
            if ((!isMainDomain && subdomain) || pathname?.startsWith('/cotizaciones')) {
                setIsQuotationUrl(true)
            } else {
                setIsQuotationUrl(false)
            }
        }
    }, [pathname])

    useEffect(() => {
        let mounted = true;
        let audio: HTMLAudioElement | null = null;
        let soundPlayed = false;

        const initAudio = () => {
            if (audio) return;
            try {
                audio = new Audio('/notificacion.mp3');

                // Mute, play, and immediately pause to force browser authorization for this element
                audio.muted = true;
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        if (audio) {
                            audio.pause();
                            audio.currentTime = 0;
                            audio.muted = false; // Restore audio for the actual notification
                        }
                    }).catch(e => {
                        console.log("Audio silent play failed:", e);
                    });
                }
            } catch (e) {
                console.log("Error creando objeto Audio", e);
            }
        };

        const playNotificationSound = () => {
            if (!mounted) return;
            try {
                if (!audio) initAudio();
                if (!audio) return;

                audio.currentTime = 0;
                const playPromise = audio.play();

                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Audio autoplay blocked by browser policy:", error);
                    });
                }
            } catch (e) {
                console.log("Audio reproduction failed", e);
            }
        };

        // Escuchar la primera interacción del usuario para destrabar el Audio de HTML5
        const onFirstInteract = () => {
            initAudio();
            window.removeEventListener('click', onFirstInteract);
            window.removeEventListener('scroll', onFirstInteract);
            window.removeEventListener('touchstart', onFirstInteract);
            window.removeEventListener('keydown', onFirstInteract);
        };

        window.addEventListener('click', onFirstInteract, { passive: true });
        window.addEventListener('scroll', onFirstInteract, { passive: true });
        window.addEventListener('touchstart', onFirstInteract, { passive: true });
        window.addEventListener('keydown', onFirstInteract, { passive: true });

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (!mounted) return;
                    const docHeight = document.documentElement.scrollHeight;
                    const winHeight = window.innerHeight;
                    const maxScrollable = Math.max(0, docHeight - winHeight);

                    // Salir de nuevo solamente cuando se baja casi hasta la mitad de la página (~45% del scroll total)
                    // y quitarse inmediatamente al subir hacia la parte superior.
                    const threshold = Math.max(maxScrollable * 0.45, 800);
                    const isPast = window.scrollY >= threshold;

                    setShowQuote(isPast);

                    if (isPast && !soundPlayed && !isQuotationUrl) {
                        soundPlayed = true;
                        playNotificationSound();
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Verificación inicial de posición de scroll
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            mounted = false;
            window.removeEventListener('click', onFirstInteract);
            window.removeEventListener('scroll', onFirstInteract);
            window.removeEventListener('touchstart', onFirstInteract);
            window.removeEventListener('keydown', onFirstInteract);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (audio) {
                audio.pause();
                audio = null;
            }
        };
    }, [isQuotationUrl, pathname])

    // Don't show any floating UI on admin, studio, or dashboard routes
    const isDashboardRoute = pathname?.startsWith('/admin') || 
                            pathname?.startsWith('/studio') || 
                            pathname?.startsWith('/crm') || 
                            pathname?.startsWith('/proyectos') ||
                            pathname?.startsWith('/finanzas');
                            
    if (isDashboardRoute) return null

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
        hidden: { opacity: 0, y: 20, scale: 0.85, transition: { duration: 0.2, ease: "easeOut" } },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 22 } as any
        },
        exit: {
            opacity: 0,
            y: 20,
            scale: 0.85,
            transition: { duration: 0.2, ease: "easeInOut" }
        }
    }

    return (
        <motion.div
            className="fixed inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-6 z-50 pointer-events-none"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <AnimatePresence>
                {/* Quote Button (Stacked above WhatsApp on mobile, bottom-left on desktop) */}
                {showQuote && !isQuotationUrl && (
                    <motion.div
                        key="floating-quote-button"
                        className="absolute bottom-[68px] sm:bottom-0 right-0 sm:left-0 sm:right-auto"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.button
                            onClick={handleQuoteClick}
                            aria-label={pathname?.startsWith('/en') ? "Quote your project" : "Cotizar tu proyecto"}
                            className="pointer-events-auto relative overflow-hidden group flex items-center gap-2 sm:gap-2.5 bg-white text-black px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full border border-white/20 shadow-[0_4px_25px_rgba(0,0,0,0.45)] sm:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.45)] transition-all duration-300 font-title"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onMouseEnter={() => setCursorVariant("hover")}
                            onMouseLeave={() => setCursorVariant("default")}
                        >
                            <motion.div 
                                className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.06)_50%,transparent_100%)] w-[200%] z-0"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                            
                            <motion.div
                                className="font-title font-bold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase relative z-10 flex items-center gap-2 text-black"
                                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                                transition={{ 
                                    clipPath: { duration: 0.6, ease: "linear", delay: 0.1 },
                                    opacity: { duration: 0.1, delay: 0.1 }
                                }}
                            >
                                <Sparkles className="w-3.5 h-3.5 text-black shrink-0 animate-pulse" />
                                <span>{pathname?.startsWith('/en') ? "Quote your project" : "Cotizar tu proyecto"}</span>
                            </motion.div>
                        </motion.button>
                    </motion.div>
                )}

                {/* WhatsApp Button (Bottom Right) */}
                <motion.div
                    key="floating-whatsapp-button"
                    className="absolute bottom-0 right-0"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.button
                        onClick={handleWhatsAppClick}
                        className="pointer-events-auto group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-shadow duration-300"
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
                                src="/whatsapp-logo.webp"
                                alt="WhatsApp"
                                width={34}
                                height={34}
                                className="object-contain drop-shadow-md"
                            />
                        </div>
                    </motion.button>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    )
}
