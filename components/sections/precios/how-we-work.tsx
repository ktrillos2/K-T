"use client"

import { m as motion } from "framer-motion"

import { useLanguage } from "@/context/language-context"

export default function HowWeWork() {
  const { dictionary } = useLanguage()

  return (
    <section className="relative px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-title mb-6">
          {/* @ts-ignore */}
          {dictionary.howWeWork.title}
        </h2>
        <p className="text-white/60 font-mono text-lg max-w-2xl mx-auto">
          {/* @ts-ignore */}
          {dictionary.howWeWork.description}
        </p>
      </div>

      <div className="relative">
        {/* Continuous line connecting steps on large screens */}
        <div className="hidden lg:block absolute top-[50px] left-0 right-0 h-px bg-white/10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* @ts-ignore */}
          {dictionary.howWeWork.steps.map((step: any, index: number) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Point on the line */}
              <div className="relative z-10 w-24 h-24 mb-6 rounded-full border border-white/20 bg-neutral-950 flex items-center justify-center group-hover:border-white/50 group-hover:scale-110 transition-all duration-300">
                <span className="text-2xl font-bold font-mono text-white/40 group-hover:text-white transition-colors">
                  {step.num}
                </span>
                
                {/* Outer glowing ring */}
                <div className="absolute inset-[-4px] rounded-full border border-white/0 group-hover:border-white/20 transition-colors duration-500" />
              </div>

              <h3 className="text-lg font-bold font-mono text-white/90 mb-3 group-hover:text-white transition-colors">{step.title}</h3>
              <p className="text-sm text-white/50 font-mono leading-relaxed max-w-[250px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
