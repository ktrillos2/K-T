"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function Footer() {
  const { dictionary } = useLanguage()

  return (
    <footer className="relative py-8 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          className="relative w-20 h-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Image src="/images/logo.png" alt="K&T Logo" fill className="object-contain" />
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground font-mono text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} K&T. {dictionary.footer.rights}.
        </motion.p>

        <motion.p
          className="text-sm text-muted-foreground font-mono flex items-center gap-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {dictionary.footer.made} <Heart className="w-4 h-4 text-white fill-white" /> {dictionary.footer.by}
        </motion.p>
      </div>
    </footer>
  )
}
