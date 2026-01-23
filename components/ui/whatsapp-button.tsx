"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCursor } from "@/context/cursor-context"
import { useLanguage } from "@/context/language-context"
import { MessageSquareText } from "lucide-react"
import WhatsAppModal from "@/components/modals/whatsapp-modal"

export default function WhatsAppButton() {
  const { setCursorVariant } = useCursor()
  // @ts-ignore - dictionary might not have new keys yet
  const { dictionary } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <AnimatePresence>
        <motion.button
          key="whatsapp-btn"
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center justify-end"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          {/* Label Container */}
          <motion.div
            className="bg-white text-black px-4 py-2 rounded-l-full rounded-tr-full shadow-lg mr-3 block origin-right"
            initial={{ opacity: 0, x: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="font-bold text-sm leading-tight">Escríbenos</p>
            <p className="text-[10px] text-gray-500 leading-tight">Empecemos tu desarrollo web</p>
          </motion.div>

          {/* Main Button */}
          <div className={`
                flex items-center justify-center w-14 h-14 rounded-full 
                bg-[#25D366] text-white shadow-lg 
                group-hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] 
                transition-shadow duration-300 relative
            `}>
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

            <MessageSquareText size={28} className="relative z-10 fill-white" />
          </div>
        </motion.button>
      </AnimatePresence>

      <WhatsAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
