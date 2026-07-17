"use client"

import { m as motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // En Next.js App Router, usar template.tsx obliga a que React desmonte
  // y vuelva a montar los componentes hijos en cada navegación de ruta.
  // Esto es vital para resetear las animaciones de framer-motion (como whileInView o initial)
  // que tienen viewport={{ once: true }}, permitiendo que se reproduzcan de nuevo al navegar.

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}
