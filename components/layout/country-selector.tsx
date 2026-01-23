"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { countryCodes } from "@/lib/country-codes"
import { useLanguage, Country } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
/* eslint-disable @next/next/no-img-element */

export default function CountrySelector() {
    const pathname = usePathname()
    const [isVisible, setIsVisible] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const { setCountry, setIsAppReady } = useLanguage()

    useEffect(() => {
        // Function to normalize country names for comparison
        const normalizeName = (name: string) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const detectCountry = async () => {
            try {
                // Check local storage first
                const storedCountry = typeof window !== 'undefined' ? localStorage.getItem("user_country") : null;

                if (storedCountry) {
                    setIsVisible(false);
                    setIsAppReady(true);
                    return;
                }

                if (pathname === "/") {
                    // Try to auto-detect via API
                    const response = await fetch("/api/geo");
                    const data = await response.json();

                    if (data?.countryName) {
                        const detectedName = normalizeName(data.countryName);
                        // Find matching country in our list (comparing normalized names)
                        const matchedCountry = countryCodes.find(c =>
                            normalizeName(c.name) === detectedName
                        );

                        if (matchedCountry) {
                            // Auto-select and don't show modal
                            setCountry(matchedCountry.name as Country);
                            setIsVisible(false);
                            setIsAppReady(true);
                            return;
                        }
                    }

                    // Fallback to showing modal
                    setIsVisible(true);
                    setShowContent(true);
                    setIsAppReady(false);
                } else {
                    setIsVisible(false);
                    setIsAppReady(true);
                }
            } catch (error) {
                console.error("Auto-detection failed:", error);
                // Fallback to showing modal on error if on homepage
                if (pathname === "/") {
                    setIsVisible(true);
                    setShowContent(true);
                    setIsAppReady(false);
                }
            }
        };

        detectCountry();
    }, [pathname, setIsAppReady, setCountry]);

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isVisible])

    const handleSelectCountry = (countryCode: string) => {
        setCountry(countryCode as Country)
        setIsVisible(false)
        setIsAppReady(true)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-6 md:p-12"
                >
                    {showContent && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="w-full max-w-6xl flex flex-col gap-10 md:gap-14 max-h-full"
                        >
                            {/* Header Section */}
                            <div className="text-center space-y-6">
                                {/* Replaced gradient with font-title and solid color */}
                                <h2
                                    className="text-4xl md:text-6xl font-title font-bold text-foreground"
                                    data-clarity-unmask="true"
                                >
                                    ¿De qué país nos visitas?
                                </h2>
                                <p
                                    className="text-xl md:text-2xl text-white font-title"
                                    data-clarity-unmask="true"
                                >
                                    Selecciona tu ubicación para continuar
                                </p>
                                <div className="md:hidden flex flex-col items-center gap-1 text-white/60">
                                    <span className="text-sm font-medium">Desliza para ver más</span>
                                    <motion.div
                                        animate={{ y: [0, 5, 0] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-5 h-5"
                                        >
                                            <path d="M12 5v14M19 12l-7 7-7-7" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Grid Overlay */}
                            <div className="flex-1 overflow-y-auto min-h-0 p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                <div className="flex flex-wrap justify-center gap-6 p-2">
                                    {countryCodes.map((country) => (
                                        <motion.div
                                            key={country.code}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-[140px] sm:w-[160px] md:w-[180px]"
                                        >
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full h-full min-h-[140px] flex flex-col justify-center items-center gap-4",
                                                    "border-2 border-muted hover:border-primary transition-all duration-300",
                                                    "bg-card hover:bg-accent/10 backdrop-blur-sm rounded-xl p-6",
                                                    "shadow-sm hover:shadow-md hover:shadow-primary/20",
                                                    "group relative overflow-hidden"
                                                )}
                                                onClick={() => handleSelectCountry(country.name)}
                                                data-clarity-unmask="true"
                                                data-clarity-action={`Select Country: ${country.name}`}
                                            >
                                                {/* Subtle Background Glow */}
                                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                                                {/* Flag Image replaces emoji */}
                                                <div className="relative z-10 w-16 h-12 md:w-20 md:h-14 shadow-md rounded overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                                                    <img
                                                        src={`https://flagcdn.com/w160/${country.iso}.png`}
                                                        alt={`Flag of ${country.name}`}
                                                        title={`Flag of ${country.name}`}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>

                                                {/* Country Code & Name */}
                                                <div className="relative z-10 flex flex-col items-center gap-1">
                                                    <span
                                                        className="font-title text-lg font-bold text-foreground group-hover:text-primary transition-colors text-wrap text-center"
                                                        data-clarity-unmask="true"
                                                    >
                                                        {country.name}
                                                    </span>
                                                </div>
                                            </Button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
