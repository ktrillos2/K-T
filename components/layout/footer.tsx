"use client"

import Image from "next/image"
import Link from "next/link"
import { m as motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { staggerContainer, fadeUpVariant } from "@/lib/animations"

export default function Footer() {
  const { dictionary } = useLanguage()

  return (
    <footer className="relative py-8 px-6 border-t border-border cv-auto">
      <motion.div 
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div
          className="relative w-32 h-32"
          variants={fadeUpVariant}
        >
          <Image src="/images/logo.webp" alt="K&T Agencia Digital - Desarrollo Web y Gestión de Redes Sociales en Colombia" fill sizes="80px" className="object-contain" />
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground font-mono text-center"
          variants={fadeUpVariant}
        >
          © {new Date().getFullYear()} K&T. {dictionary.footer.rights}.
        </motion.p>

        <motion.div
          className="text-sm text-muted-foreground font-mono"
          variants={fadeUpVariant}
        >
          {/* @ts-ignore */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/preguntas-frecuentes" className="hover:text-white transition-colors">
              Preguntas frecuentes
            </Link>
            <Link href="/politica-de-privacidad" className="hover:text-white transition-colors">
              {/* @ts-ignore */}
              {dictionary.footer.privacy}
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="text-sm text-muted-foreground font-mono text-center md:text-left max-w-sm"
          variants={fadeUpVariant}
        >
          {/* @ts-ignore */}
          <p className="font-semibold text-neutral-300 mb-1">{dictionary.footer.guarantee}</p>
        </motion.div>

        <motion.div
          className="text-sm text-muted-foreground font-mono w-full md:w-auto text-center mt-4 md:mt-0"
          variants={fadeUpVariant}
        >
          <a 
            href="https://www.kytcode.lat" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center md:justify-end gap-1 hover:text-white transition-colors whitespace-nowrap"
          >
            <span>Desarrollado por K&T</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Heart className="w-4 h-4 text-white fill-white" />
            </motion.span>
          </a>
        </motion.div>
      </motion.div>
    </footer>
  )
}
