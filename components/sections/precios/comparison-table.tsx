"use client"

import { m as motion } from "framer-motion"
import { Check, Minus } from "lucide-react"

import { useLanguage } from "@/context/language-context"

export default function ComparisonTable() {
  const { dictionary } = useLanguage()

  return (
    <section className="relative px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-title mb-6">
          {/* @ts-ignore */}
          {dictionary.comparisonTable.title}
        </h2>
        <p className="text-white/60 font-mono text-lg max-w-2xl mx-auto">
          {/* @ts-ignore */}
          {dictionary.comparisonTable.description}
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="overflow-x-auto pb-4"
      >
        <div className="min-w-[800px] border border-white/10 rounded-2xl overflow-hidden bg-neutral-950/50 backdrop-blur-sm">
          {/* Table Header */}
          <div className="grid grid-cols-5 border-b border-white/10 bg-white/5">
            <div className="p-6 col-span-1">
              {/* @ts-ignore */}
              <span className="text-white/40 font-mono text-sm uppercase tracking-wider">{dictionary.comparisonTable.featuresLabel}</span>
            </div>
            {/* @ts-ignore */}
            {dictionary.comparisonTable.planNames.map((name: string, i: number) => (
              <div key={name} className={`p-6 text-center col-span-1 border-l border-white/10 ${i === 1 ? 'bg-white/5' : ''}`}>
                <span className={`font-mono font-bold ${i === 1 ? 'text-white' : 'text-white/80'}`}>{name}</span>
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {/* @ts-ignore */}
            {dictionary.comparisonTable.features.map((feature: any, featureIndex: number) => (
              <div key={feature.name} className="grid grid-cols-5 hover:bg-white/[0.02] transition-colors">
                <div className="p-6 col-span-1 flex items-center">
                  <span className="text-white/80 font-mono text-sm">{feature.name}</span>
                </div>
                {feature.plans.map((value: any, i: number) => (
                  <div key={`${feature.name}-${i}`} className={`p-6 text-center col-span-1 border-l border-white/10 flex items-center justify-center ${i === 1 ? 'bg-white/[0.02]' : ''}`}>
                    {typeof value === 'boolean' ? (
                      value ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Minus className="w-5 h-5 text-white/20" />
                      )
                    ) : (
                      <span className="text-white/60 font-mono text-sm">{value}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
