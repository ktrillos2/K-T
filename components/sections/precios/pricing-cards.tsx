"use client"

import { m as motion } from "framer-motion"
import { Check, Info, ArrowRight } from "lucide-react"
import { useCursor } from "@/context/cursor-context"

import { useLanguage } from "@/context/language-context"

const plans = [
  {
    title: "Landing Page",
    copPrice: "Desde $450.000 COP",
    usdPrice: 200,
    description: "Ideal para campañas publicitarias, presentación de servicios, captación de clientes y lanzamientos.",
    features: [
      "Diseño personalizado",
      "Página responsive",
      "Hasta 5 secciones",
      "Formulario de contacto",
      "Integración con WhatsApp",
      "Optimización SEO básica",
      "Configuración de dominio y hosting",
      "Botones de conversión",
      "Entrega aproximada entre 7 y 12 días",
    ],
    buttonText: "Solicitar este plan",
    recommended: false,
    whatsappMessage: "Hola,%20me%20gustar%C3%ADa%20solicitar%20el%20plan%20Landing%20Page."
  },
  {
    title: "Sitio Web Corporativo",
    copPrice: "Desde $2.500.000 COP",
    usdPrice: 600,
    description: "Pensado para empresas que necesitan una presencia digital profesional, completa y preparada para crecer.",
    features: [
      "Diseño personalizado",
      "Hasta 8 páginas internas",
      "Página de servicios",
      "Portafolio o proyectos",
      "Testimonios",
      "Formulario de contacto",
      "Integración con WhatsApp",
      "SEO técnico inicial",
      "Google Analytics",
      "Diseño responsive",
      "Entrega aproximada entre 15 y 25 días",
    ],
    buttonText: "Solicitar este plan",
    recommended: true,
    whatsappMessage: "Hola,%20me%20gustar%C3%ADa%20solicitar%20el%20plan%20Sitio%20Web%20Corporativo."
  },
  {
    title: "Tienda Virtual",
    copPrice: "Desde $1.300.000 COP",
    usdPrice: 450,
    description: "Para negocios que quieren vender productos o servicios en línea con una experiencia moderna y confiable.",
    features: [
      "Diseño personalizado",
      "Catálogo de productos",
      "Carrito de compras",
      "Pasarela de pagos",
      "Gestión de pedidos",
      "Panel administrativo",
      "Integración con WhatsApp",
      "Configuración de envíos",
      "Diseño responsive",
      "SEO técnico inicial",
      "Entrega aproximada entre 25 y 40 días",
    ],
    buttonText: "Solicitar este plan",
    recommended: false,
    whatsappMessage: "Hola,%20me%20gustar%C3%ADa%20solicitar%20el%20plan%20Tienda%20Virtual."
  },
  {
    title: "Software a Medida",
    copPrice: "Cotización personalizada",
    usdPrice: null,
    description: "Para plataformas, sistemas internos, aplicaciones web, automatizaciones, paneles administrativos y soluciones con funcionalidades especiales.",
    features: [
      "Análisis de requerimientos",
      "Arquitectura personalizada",
      "Desarrollo frontend y backend",
      "Base de datos",
      "Panel administrativo",
      "Integraciones con APIs",
      "Automatizaciones",
      "Autenticación de usuarios",
      "Escalabilidad",
      "Soporte durante la implementación",
    ],
    buttonText: "Hablar sobre mi proyecto",
    recommended: false,
    whatsappMessage: "Hola,%20tengo%20un%20proyecto%20de%20software%20a%20medida%20y%20me%20gustar%C3%ADa%20cotizarlo."
  }
]

export default function PricingCards() {
  const { setCursorVariant } = useCursor()
  const { country, convertPrice } = useLanguage()

  const handleSelectPlan = (planTitle: string, whatsappMessage: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "select_plan", {
        event_category: "pricing_cards",
        event_label: planTitle
      })
    }
    window.open(`https://wa.me/573116360057?text=${whatsappMessage}`, "_blank")
  }

  const displayPrice = (plan: typeof plans[0]) => {
    if (plan.title === "Software a Medida" || !plan.usdPrice) return plan.copPrice;
    
    if (country === "Colombia") {
      return plan.copPrice;
    }
    
    const converted = convertPrice(plan.usdPrice);
    if (converted === "Loading...") return "Calculando...";
    return `Desde ${converted}`;
  }

  return (
    <section id="plans" className="relative px-6 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative p-8 rounded-2xl border flex flex-col h-full bg-neutral-950/50 backdrop-blur-sm transition-all duration-300 hover:border-white/40 group ${
              plan.recommended ? "border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)]" : "border-white/10"
            }`}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            {/* Top gradient effect on hover */}
            <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/50 transition-all duration-500" />
            
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold font-mono px-4 py-1.5 rounded-full shadow-lg z-10 whitespace-nowrap">
                Más recomendado
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold font-title mb-2 text-white/90">{plan.title}</h3>
              <div className="text-xl font-mono text-white mb-4 min-h-[3rem] flex items-center">
                {displayPrice(plan)}
              </div>
              <p className="text-white/50 text-sm font-mono leading-relaxed min-h-[5rem]">
                {plan.description}
              </p>
            </div>

            <div className="flex-grow">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/70 font-mono">
                    <Check className="w-4 h-4 text-white/90 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.button
              onClick={() => handleSelectPlan(plan.title, plan.whatsappMessage)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-xl font-mono font-bold text-sm transition-colors flex items-center justify-center gap-2 ${
                plan.recommended
                  ? "bg-white text-black hover:bg-neutral-200"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/5"
              }`}
            >
              {plan.buttonText}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 max-w-3xl mx-auto text-center"
      >
        <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-neutral-900/50 border border-white/10">
          <Info className="w-5 h-5 text-white/50 shrink-0 mt-0.5" />
          <div className="text-left font-mono text-sm text-white/60 space-y-2">
            <p>
              Los precios presentados son valores iniciales y pueden variar según el alcance, número de secciones, funcionalidades, integraciones, idiomas, diseño y nivel de personalización del proyecto.
            </p>
            <p className="text-white/80 font-medium">
              Antes de iniciar, realizamos una reunión para entender tus necesidades y entregarte una propuesta detallada.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
