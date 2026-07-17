"use client"

import { useState } from "react"
import { m as motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

import { useLanguage } from "@/context/language-context"

export default function PricingFAQ() {
  const { dictionary } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative px-6 max-w-4xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-title mb-6">
          {/* @ts-ignore */}
          {dictionary.pricingFaq.title}
        </h2>
        <p className="text-white/60 font-mono text-lg max-w-2xl mx-auto">
          {/* @ts-ignore */}
          {dictionary.pricingFaq.description}
        </p>
      </div>

      <div className="space-y-4">
        {/* @ts-ignore */}
        {dictionary.pricingFaq.faqs.map((faq: any, index: number) => {
          const isOpen = openIndex === index

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="border border-white/10 rounded-xl bg-neutral-950/50 backdrop-blur-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <h3 className="font-bold font-mono text-white/90 pr-8">{faq.question}</h3>
                <div className="shrink-0 text-white/50">
                  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0 text-white/60 font-mono text-sm leading-relaxed border-t border-white/5">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
