"use client"

import { m as motion } from "framer-motion"
import { Settings, Globe, Search, CreditCard, Cpu, LayoutDashboard, Webhook, MonitorUp, LineChart, Wrench } from "lucide-react"

const services = [
  { name: "Mantenimiento mensual", icon: Settings },
  { name: "Hosting y dominio", icon: Globe },
  { name: "Posicionamiento SEO", icon: Search },
  { name: "Integración con pasarelas de pago", icon: CreditCard },
  { name: "Automatización de procesos", icon: Cpu },
  { name: "Paneles administrativos", icon: LayoutDashboard },
  { name: "Integraciones con APIs", icon: Webhook },
  { name: "Rediseño de páginas existentes", icon: MonitorUp },
  { name: "Configuración de analítica", icon: LineChart },
  { name: "Soporte técnico", icon: Wrench },
]

import { useLanguage } from "@/context/language-context"

export default function AdditionalServices() {
  const { dictionary } = useLanguage()

  // @ts-ignore
  const servicesData = dictionary.additionalServices.services

  return (
    <section className="relative px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-title mb-6">
          {/* @ts-ignore */}
          {dictionary.additionalServices.title}
        </h2>
        <p className="text-white/60 font-mono text-lg">
          {/* @ts-ignore */}
          {dictionary.additionalServices.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* @ts-ignore */}
        {servicesData.map((serviceInfo: any, index: number) => {
          const serviceStatic = services[index]
          if (!serviceStatic) return null;
          const Icon = serviceStatic.icon
          return (
            <motion.div
              key={serviceStatic.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex flex-col items-center text-center gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-white/70" />
              </div>
              <div>
                <h3 className="font-mono text-sm text-white/90 mb-2">{serviceInfo.name}</h3>
                <p className="text-xs text-white/40 font-mono">
                  {/* @ts-ignore */}
                  {dictionary.additionalServices.priceLabel}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
