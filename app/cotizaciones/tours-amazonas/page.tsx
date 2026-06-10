"use client"

import React, { useState } from "react"
import { CheckCircle2, ShieldCheck, Lock, Copy, Check, ThumbsUp, HelpCircle, ArrowRight, Calendar, Receipt, MonitorSmartphone, Globe, Search, Target, ChevronDown } from "lucide-react"
import { m as motion, AnimatePresence } from "framer-motion"
import Footer from "@/components/layout/footer"
import QuotationProjectsSlider from "@/components/sections/quotation-projects-slider"
import { notifyQuotationViewed, notifyQuotationAccepted } from "@/app/actions/cotizacion-actions"


const PricingCard = ({ title, desc, price, details, recommended = false, isAdditional = false }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`p-5 sm:p-6 rounded-xl border transition-colors flex flex-col group relative overflow-hidden ${recommended ? 'border-emerald-500/30 bg-emerald-900/10 hover:bg-emerald-900/20 shadow-lg' : isAdditional ? 'border-white/5 bg-zinc-900/30 hover:bg-zinc-900/50 shadow-lg' : 'border-white/10 bg-zinc-900/50 shadow-lg hover:bg-zinc-900/80'}`}>
      {recommended && <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>}
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex-1 space-y-2 pl-2">
          <div className="flex items-center gap-3">
            <h3 className={`text-lg font-bold ${recommended || !isAdditional ? 'text-emerald-400' : 'text-white/90'}`}>{title}</h3>
            {recommended && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 uppercase tracking-wider">Recomendada</span>}
          </div>
          <p className={`${isAdditional ? 'text-white/60 italic' : 'text-white/70'} text-sm sm:text-base leading-relaxed`}>{desc}</p>
        </div>
        
        <div className={`pt-4 md:pt-0 border-t ${recommended ? 'border-emerald-500/20' : isAdditional ? 'border-white/5' : 'border-white/10'} md:border-t-0 flex flex-col md:items-end md:pl-6 shrink-0 md:min-w-[140px]`}>
          <span className={`text-xs uppercase tracking-widest font-semibold mb-1 ${recommended ? 'text-emerald-500/70' : 'text-white/50'}`}>Valor</span>
          <div className="flex items-center gap-4">
            <span className={`text-2xl sm:text-lg lg:text-xl font-bold whitespace-nowrap ${isAdditional ? 'text-white font-medium' : 'text-white'}`}>
              {price} {isAdditional && <span className="text-xs text-white/50">c/u</span>}
            </span>
            {details && details.length > 0 && (
              <button 
                type="button" 
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10"
                aria-label="Ver detalles"
              >
                <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>
        
        {details && details.length > 0 && (
          <div className="hidden md:flex items-center mr-2">
            <ChevronDown className={`w-5 h-5 text-white/50 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        )}
      </div>

      {details && details.length > 0 && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-4 border-t border-white/10 pl-2">
                <p className="text-sm font-semibold text-white/90 mb-3">Características incluidas:</p>
                <ul className="space-y-3">
                  {details.map((detail: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-emerald-100/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-1.5"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default function CotizacionToursAmazonas() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [hasViewed, setHasViewed] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)
  const [isAccepting, setIsAccepting] = useState(false)
  const [copiedNequi, setCopiedNequi] = useState(false)
  const [copiedCuenta, setCopiedCuenta] = useState(false)

  const handleCopy = (text: string, type: 'nequi' | 'cuenta') => {
    navigator.clipboard.writeText(text)
    if (type === 'nequi') {
      setCopiedNequi(true)
      setTimeout(() => setCopiedNequi(false), 2000)
    } else {
      setCopiedCuenta(true)
      setTimeout(() => setCopiedCuenta(false), 2000)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "tours_amazonas2026" || password === "amazonas2026") {
      setIsAuthenticated(true)
      setError(false)
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
      
      if (!hasViewed) {
        setHasViewed(true);
        notifyQuotationViewed({ client: "Tours Amazonas" }).catch(console.error);
      }
    } else {
      setError(true)
      setPassword("")
    }
  }

  const handleAccept = async () => {
    setIsAccepting(true)
    try {
      await notifyQuotationAccepted({ client: "Tours Amazonas" })
      setIsAccepted(true)
    } catch (error) {
      console.error("Error accepting quote:", error)
    } finally {
      setIsAccepting(false)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white/90 font-mono selection:bg-white/20 pt-24">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center min-h-[70vh] px-4"
          >
            <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900/50 border border-white/10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-300"></div>
              
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold font-title text-center text-white mb-2">Acceso Protegido</h2>
              <p className="text-white/80 text-center text-sm mb-8">Ingresa la credencial proporcionada por K&T para ver tu cotización.</p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError(false)
                    }}
                    placeholder="Contraseña"
                    className={`w-full bg-black/50 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/20 focus:border-white/50'} rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none transition-colors`}
                  />
                  {error && <p className="text-white text-xs mt-2 mt-1">Contraseña incorrecta. Intenta nuevamente.</p>}
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                >
                  Acceder a la Cotización <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.main 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16"
          >
            {/* Header Section */}
            <motion.header 
              variants={fadeIn as any}
              initial="hidden"
              animate="visible"
              className="mb-12 border-b border-white/10 pb-10 flex flex-col items-center"
            >
              <div className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-white uppercase border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
                Propuesta Comercial
              </div>
              <h1 className="font-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-8 text-center uppercase">
                COTIZACIÓN DE DESARROLLO WEB <br /> Y MARKETING DIGITAL
                <span className="text-xl sm:text-2xl text-white/70 block mt-4">(TOURS AMAZONAS)</span>
              </h1>
              
              <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-5 sm:p-6 rounded-2xl bg-zinc-900/80 border border-white/10 shadow-lg">
                <div className="flex items-center gap-4 px-4">
                  <Calendar className="w-6 h-6 text-emerald-400" />
                  <div className="text-left leading-tight">
                    <p className="text-xs text-white/60 uppercase tracking-widest mb-1">Emisión</p>
                    <p className="text-sm sm:text-base text-white font-medium">11 de marzo de 2026</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/10"></div>
                <div className="flex items-center gap-4 px-4 border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0 w-full sm:w-auto">
                  <Receipt className="w-6 h-6 text-emerald-400" />
                  <div className="text-left leading-tight">
                    <p className="text-xs text-white/60 uppercase tracking-widest mb-1">Validez</p>
                    <p className="text-sm sm:text-base text-white font-medium">15 días calendario</p>
                  </div>
                </div>
              </div>
            </motion.header>

            <article className="space-y-12">
              {/* Section 1: Scope */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                animate="visible"
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-black font-bold font-title text-sm">1</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">Alcance Detallado del Proyecto</h2>
                </div>
                <p className="text-white/80 mb-8 text-base sm:text-lg leading-relaxed">
                  Plataforma Turística y Publicidad: La presente propuesta contempla el desarrollo de una plataforma web orientada a la captación de clientes extranjeros para tours en el Amazonas, junto con la gestión estratégica de campañas publicitarias:
                </p>
                
                <motion.div 
                  variants={staggerContainer as any}
                  initial="hidden"
                  animate="visible"
                  className="grid sm:grid-cols-2 gap-4 sm:gap-6"
                >
                  {[
                    {
                      title: "Desarrollo Web Escalonado",
                      desc: "Creación de una interfaz gráfica moderna, atractiva y adaptable a dispositivos móviles, diseñada para resaltar la experiencia turística en la selva amazónica y facilitar el contacto con clientes internacionales.",
                      icon: <MonitorSmartphone className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    },
                    {
                      title: "Tecnología e Infraestructura",
                      desc: "Desarrollo de alto rendimiento con alojamiento en Vercel, garantizando tiempos de carga ultrarrápidos y máxima estabilidad global sin costos mensuales de servidor web.",
                      icon: <Globe className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    },
                    {
                      title: "Optimización SEO Avanzado",
                      desc: "Implementación de estructuración de código, etiquetas meta y jerarquía técnica optimizadas para facilitar el posicionamiento orgánico de los tours en las búsquedas de Google a nivel internacional.",
                      icon: <Search className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    },
                    {
                      title: "Gestión de Pauta Digital",
                      desc: "Administración profesional de campañas publicitarias para maximizar el retorno de inversión y la captación de leads (clientes potenciales).",
                      icon: <Target className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    }
                  ].map((item, i) => (
                    <motion.div 
                      variants={fadeIn as any}
                      key={i} 
                      className={`flex flex-col sm:flex-row gap-4 p-5 sm:p-6 rounded-xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/80 transition-all duration-300 group`}
                    >
                      {item.icon}
                      <div>
                        <h3 className="text-white font-semibold mb-2 sm:text-lg">{item.title}</h3>
                        <p className="text-white/80 leading-relaxed text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* Section 2: Investment - Web */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                animate="visible"
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-black font-bold font-title text-sm">2</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">Opciones de Inversión: Desarrollo Web</h2>
                </div>
                
                <p className="text-white/80 mb-6 text-sm sm:text-base">Seleccione la estructura web que mejor se adapte a las necesidades actuales de la agencia de turismo:</p>

                <div className="grid gap-4 mb-6">
                  <PricingCard 
                    title="Opción 1: Landing Page"
                    desc="Sitio web de una sola página diseñado para conversión rápida e información concisa."
                    price="$450.000"
                    details={[
                      "Diseño Landing Page (1 sola página con navegación por scroll continuo).",
                      "Secciones integradas: Inicio (Hero), Nosotros, 3-4 Tours destacados, Contacto/WhatsApp.",
                      "Diseño interactivo responsivo (adaptable a celulares y tablets).",
                      "Optimización SEO técnica básica para posicionamiento.",
                      "Integración de enlaces directos a redes sociales."
                    ]}
                  />

                  <PricingCard 
                    title="Opción 2: Web Multipágina"
                    desc="Estructura base con secciones indicadas: Inicio, Nosotros, Servicios, etc."
                    price="$650.000"
                    details={[
                      "Estructura base de hasta 5 páginas independientes (Inicio, Nosotros, Tours, Galería, Contacto).",
                      "Apartado de Tours general con resúmenes atractivos.",
                      "Formulario de contacto avanzado con envíos al correo electrónico.",
                      "Integración de mapa interactivo con ubicación de agencia.",
                      "Botón flotante de WhatsApp en todo el sitio web.",
                      "Desarrollo modular y escalable a futuro."
                    ]}
                  />

                  <PricingCard 
                    title="Opción 3: Web Completa"
                    desc="Multipágina que incluye un apartado exclusivo y detallado de Tours + Sección de Contacto."
                    price="$850.000"
                    recommended={true}
                    details={[
                      "Incluye todo lo de la opción Multipágina.",
                      "Páginas individuales y detalladas para cada Tour (Ej: 'Tour Amazonas 3 Días') con su propia galería, itinerario, detalles de viaje y botón de confirmación/reserva directa.",
                      "Sistema de categorización visual para tipos de Tour (Aventura, Familiar, Ecológico).",
                      "Estructura SEO avanzada construida por cada tour particular para atraer tráfico específico.",
                      "Integración nativa rápida para el Meta Pixel y Google Analytics, lista para campañas publicitarias."
                    ]}
                  />

                  <PricingCard 
                    title="Secciones Adicionales"
                    desc="Cualquier apartado extra que se desee sumar a las opciones anteriores."
                    price="$100.000"
                    isAdditional={true}
                  />
                </div>
              </motion.section>

              {/* Section 3: Investment - Marketing */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                animate="visible"
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-black font-bold font-title text-sm">3</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">Opciones de Inversión: Marketing Digital</h2>
                </div>

                <div className="p-5 sm:p-8 rounded-xl border border-white/10 bg-zinc-900/50 shadow-xl flex flex-col md:flex-row gap-6 md:items-start justify-between group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                  <div className="flex-1 space-y-4 pl-2">
                    <div>
                      <h3 className="text-xl font-bold text-emerald-400 mb-2">Administración de Meta Ads</h3>
                      <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                        Gestión, segmentación, monitoreo y optimización de campañas publicitarias en Facebook e Instagram.
                      </p>
                    </div>
                    <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                      <p className="text-xs text-white/60 leading-relaxed">
                        <strong className="text-white/90">Nota:</strong> Este rubro cubre únicamente la gestión técnica de la pauta. No incluye la creación, diseño o edición de contenido multimedia, imágenes o videos, los cuales deben ser suministrados por el cliente o cotizados por aparte.
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 md:pt-0 border-t border-white/10 md:border-t-0 flex flex-col md:items-end md:pl-8 shrink-0 md:min-w-[180px]">
                    <span className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-2">Valor Mensual</span>
                    <span className="text-3xl text-white font-bold whitespace-nowrap">$350.000 <span className="text-sm font-normal text-white/50">COP</span></span>
                  </div>
                </div>
              </motion.section>

              {/* Section 4: Terms */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                animate="visible"
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-black font-bold font-title text-sm">4</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">Condiciones Comerciales y Tiempos</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="p-5 sm:p-8 rounded-xl bg-zinc-900/50 border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                    <h3 className="text-white font-bold text-lg mb-4">Forma de Pago (Desarrollo Web)</h3>
                    <ul className="space-y-3 text-white/80 text-sm sm:text-base">
                      <li className="flex justify-between border-b border-white/5 pb-3">
                        <span>Abono inicial para arrancar</span>
                        <strong className="text-emerald-400 font-medium whitespace-nowrap ml-2">50%</strong>
                      </li>
                      <li className="flex justify-between pt-1">
                        <span>Contra entrega final</span>
                        <strong className="text-emerald-400 font-medium whitespace-nowrap ml-2">50%</strong>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-5 sm:p-8 rounded-xl bg-zinc-900/50 border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                    <h3 className="text-white font-bold text-lg mb-4">Forma de Pago (Meta Ads)</h3>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      El servicio de gestión publicitaria se cancela mes a mes, por anticipado, durante los <strong>primeros cinco (5) días</strong> de cada periodo.
                    </p>
                  </div>

                  <div className="lg:col-span-2 p-5 sm:p-8 rounded-xl bg-zinc-900/50 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-500"></div>
                    <h3 className="text-white font-bold text-lg mb-4">Tiempos de Desarrollo Web</h3>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      El tiempo de ejecución es de <strong className="text-white font-semibold">1 a 2 semanas</strong> una vez recibida toda la información inicial (textos, fotografías de los tours amazónicos, logos y precios).
                    </p>
                  </div>

                  <div className="lg:col-span-2 p-5 sm:p-8 rounded-xl border border-amber-900/30 bg-amber-950/20 text-sm sm:text-base relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2 pl-2">
                      <ShieldCheck className="w-5 h-5 text-amber-500" />
                      Cláusula de Límite Máximo
                    </h3>
                    <p className="text-white/80 leading-relaxed selection:bg-amber-500/30 pl-2">
                      El proyecto web tiene un ciclo de vida máximo de <strong>4 semanas</strong>. Si transcurrido este límite no se ha podido concluir por problemas de comunicación o falta de entrega de material por parte del cliente, el desarrollo se dará por finalizado de manera unilateral, entregando el código en su estado actual y procediendo con el cobro del saldo restante.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Section 5: Bank Details */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                animate="visible"
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-black font-bold font-title text-sm">5</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">Datos Bancarios</h2>
                </div>
                
                <p className="text-white/80 mb-6 text-sm sm:text-base">Para formalizar el inicio del proyecto, ponemos a disposición las siguientes cuentas:</p>

                <motion.div 
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-white/10 relative overflow-hidden shadow-2xl"
                >
                  <div className="absolute right-0 top-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)] pointer-events-none"></div>
                  
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                    <div className="flex flex-col justify-between space-y-8">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Banco</p>
                          <span className="w-8 h-5 rounded bg-white/10 flex items-center justify-center border border-white/20">
                            <div className="w-2 h-2 rounded-full bg-white/50"></div>
                          </span>
                        </div>
                        <p className="text-xl sm:text-2xl text-white font-bold tracking-tight">Bancolombia</p>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Tipo de Cuenta</p>
                          <p className="text-white text-sm sm:text-base font-medium font-mono">AHORROS</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Número</p>
                          <div className="flex items-center gap-2">
                            <p className="text-white text-sm sm:text-base tracking-widest font-mono">91290318578</p>
                            <button 
                              onClick={() => handleCopy('91290318578', 'cuenta')}
                              className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white"
                              title="Copiar número de cuenta"
                            >
                              {copiedCuenta ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-between space-y-8 pt-8 md:pt-0 border-t border-white/10 md:border-t-0 md:border-l md:border-white/10 md:pl-12">
                      <div>
                        <p className="text-[10px] text-white/60 uppercase tracking-widest mb-2 font-bold">Titular</p>
                        <p className="text-lg sm:text-xl text-white font-medium uppercase tracking-wide leading-tight">Keyner Steban<br/>Trillos Useche</p>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Cédula y RUT</p>
                          <p className="text-white text-sm tracking-widest font-mono leading-tight">C.C. 1.090.384.736<br/>RUT: 1090384736-8</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Nequi</p>
                          <div className="flex items-center gap-2">
                            <p className="text-white text-sm sm:text-base tracking-widest font-mono">3133087069</p>
                            <button 
                              onClick={() => handleCopy('3133087069', 'nequi')}
                              className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white"
                              title="Copiar número de Nequi"
                            >
                              {copiedNequi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.section>

              {/* Section 6: Warranty */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                animate="visible"
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-black font-bold font-title text-sm">6</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">Política de Garantía y Soporte</h2>
                </div>
                
                <h3 className="sr-only">Detalles de la Garantía</h3>

                <div className="mb-8 p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <p className="text-white text-sm sm:text-base leading-relaxed">
                    Se otorga una <strong className="font-bold text-emerald-400 text-base sm:text-lg">Garantía Técnica de 1 mes (30 días calendario)</strong> contados a partir de la fecha de entrega y publicación del sitio web en producción.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
                  <div className="bg-zinc-900/30 p-6 rounded-xl border border-white/5">
                    <h3 className="text-white flex items-center gap-3 font-bold mb-6 tracking-wide sm:text-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Cobertura Específica
                    </h3>
                    <ul className="space-y-4 text-sm sm:text-base text-white/90">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-2"></span>
                        <span>Resolución de errores de código (bugs) que afecten la navegación del usuario extranjero.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-2"></span>
                        <span>Corrección de fallos en el funcionamiento de los botones de contacto (WhatsApp/Correo).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-2"></span>
                        <span>Corrección de fallos de diseño responsivo (visualización incorrecta en celulares o tablets).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-2"></span>
                        <span>Soporte frente a posibles intermitencias derivadas netamente de la infraestructura del Hosting en Vercel.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-zinc-900/30 p-6 rounded-xl border border-white/5">
                    <h3 className="text-white flex items-center gap-3 font-bold mb-6 tracking-wide sm:text-lg">
                      <div className="w-5 h-5 rounded-full border-2 border-red-400 flex items-center justify-center text-xs text-red-400">✕</div> 
                      Exclusiones Estrictas
                    </h3>
                    <ul className="space-y-4 text-sm sm:text-base text-white/80">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/30 shrink-0 mt-2"></span>
                        <span>Cambios en la estructura de diseño, layout o paleta de colores una vez el cliente haya aprobado la fase inicial.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/30 shrink-0 mt-2"></span>
                        <span>Problemas derivados del bloqueo de cuentas publicitarias en Meta (Business Manager), ya que dependen exclusivamente de las políticas de Facebook.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/30 shrink-0 mt-2"></span>
                        <span>Desconfiguraciones causadas por manipulación del código web por parte de terceros no autorizados por K&T.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Section 7: Portfolio & Next Steps */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                animate="visible"
                className="scroll-mt-24"
              >
                <div className="flex flex-col items-center justify-center border-t border-white/10 pt-16 pb-8 text-center">
                  <h2 className="text-3xl font-bold font-title text-white mb-4">¿Listo para comenzar tu proyecto?</h2>
                  <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
                    Revisa algunos de nuestros trabajos más recientes o procede a aceptar la cotización para dar el primer paso.
                  </p>
                  
                  <div className="w-full relative mb-16">
                    <QuotationProjectsSlider />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                    {isAccepted ? (
                      <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-8 py-4 rounded-full font-bold">
                        <CheckCircle2 className="w-5 h-5" />
                        ¡Cotización Aceptada!
                      </div>
                    ) : (
                      <button 
                        onClick={handleAccept}
                        disabled={isAccepting}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {isAccepting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                            Procesando...
                          </span>
                        ) : (
                          <>
                            <ThumbsUp className="w-5 h-5" />
                            Aceptar Cotización
                          </>
                        )}
                      </button>
                    )}
                    
                    <a 
                      href="https://wa.me/573133087069?text=Hola,%20tengo%20dudas%20sobre%20la%20cotizaci%C3%B3n%20de%20Tours%20Amazonas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 border border-white/10 px-8 py-4 rounded-full font-medium transition-all"
                    >
                      <HelpCircle className="w-5 h-5" />
                      Tengo dudas / Modificar
                    </a>
                  </div>
                </div>
              </motion.section>
            </article>

            {/* In-page Signature */}
            <motion.div 
              variants={fadeIn as any}
              initial="hidden"
              animate="visible"
              className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center justify-center gap-2 mb-12"
            >
              <p className="text-white/60 text-sm mb-1">Atentamente,</p>
              <p className="text-white font-bold font-title tracking-widest text-2xl">K&T</p>
              <p className="text-white/80 text-sm">Representado por Keyner Trillos</p>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  )
}
