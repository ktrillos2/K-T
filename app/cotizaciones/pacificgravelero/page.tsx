"use client"

import React, { useState } from "react"
import Link from "next/link"
import { CheckCircle2, ShieldCheck, Heart, ArrowRight, ExternalLink, Calendar, Receipt, Lock, Copy, Check, ThumbsUp, HelpCircle } from "lucide-react"
import { m as motion, AnimatePresence } from "framer-motion"
import Footer from "@/components/layout/footer"
import { notifyQuotationViewed, notifyQuotationAccepted } from "@/app/actions/cotizacion-actions"

export default function CotizacionPacificGravelero() {
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
    if (password === "cot_pacificgravelero") {
      setIsAuthenticated(true)
      setError(false)
      // Small delay to allow smooth transition before scrolling to top
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
      
      // Fire action silently only once per session
      if (!hasViewed) {
        setHasViewed(true);
        notifyQuotationViewed({ client: "Pacific Gravelero" }).catch(console.error);
      }
    } else {
      setError(true)
      setPassword("")
    }
  }

  const handleAccept = async () => {
    setIsAccepting(true)
    try {
      await notifyQuotationAccepted({ client: "Pacific Gravelero" })
      setIsAccepted(true)
    } catch (error) {
      console.error("Error accepting quote:", error)
    } finally {
      setIsAccepting(false)
    }
  }

  // Animation variants
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
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 to-gray-200"></div>
              
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
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12 border-b border-white/10 pb-10 flex flex-col items-center"
            >
              <div className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-white uppercase border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
                Propuesta Comercial
              </div>
              <h1 className="font-title text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-8 text-center">
                COTIZACIÓN DE<br />
                DESARROLLO WEB
              </h1>
              
              <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-5 sm:p-6 rounded-2xl bg-zinc-900/80 border border-white/10 shadow-lg">
                <div className="flex items-center gap-4 px-4">
                  <Calendar className="w-6 h-6 text-white/80" />
                  <div className="text-left leading-tight">
                    <p className="text-xs text-white/60 uppercase tracking-widest mb-1">Emisión</p>
                    <p className="text-sm sm:text-base text-white font-medium">5 de marzo de 2026</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/10"></div>
                <div className="flex items-center gap-4 px-4 border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0 w-full sm:w-auto">
                  <Receipt className="w-6 h-6 text-white/80" />
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
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold font-title text-sm">1</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">Alcance Detallado</h2>
                </div>
                <p className="text-white/80 mb-8 text-base sm:text-lg leading-relaxed">
                  La presente propuesta contempla el diseño a la medida y desarrollo de una página de aterrizaje (Landing Page) transaccional, enfocada en la conversión de usuarios hacia un modelo de pagos recurrentes:
                </p>
                
                <motion.div 
                  variants={staggerContainer as any}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid sm:grid-cols-2 gap-4 sm:gap-6"
                >
                  {[
                    {
                      title: "Diseño Web Personalizado",
                      desc: "Creación de interfaz gráfica única, estructurada para presentar el servicio y guiar al usuario a la suscripción."
                    },
                    {
                      title: "Sistema de Suscripción",
                      desc: "Desarrollo de la lógica interna para gestionar la membresía o servicio recurrente del cliente en la plataforma."
                    },
                    {
                      title: "Pasarela de Pago (Wompi)",
                      desc: "Integración técnica para recaudo. Wompi ofrece infraestructura robusta para cobros automáticos y suscripciones."
                    },
                    {
                      title: "Tecnología e Infraestructura",
                      desc: "Desarrollo de alto rendimiento alojado en Vercel, garantizando máxima estabilidad sin costos mensuales de servidor."
                    },
                    {
                      title: "Optimización SEO Técnico",
                      desc: "Estructuración de código y etiquetas meta para facilitar el posicionamiento orgánico en Google."
                    },
                    {
                      title: "Dominio Incluido",
                      desc: "Propiedad del nombre en internet por un año (Aplica únicamente para extensión .com)."
                    }
                  ].map((item, i) => (
                    <motion.div 
                      variants={fadeIn as any}
                      key={i} 
                      className="flex flex-col sm:flex-row gap-4 p-5 sm:p-6 rounded-xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/80 transition-all duration-300 group"
                    >
                      <CheckCircle2 className="w-6 h-6 text-white shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="text-white font-semibold mb-2 sm:text-lg">{item.title}</h3>
                        <p className="text-white/80 leading-relaxed text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* Section 2: Investment */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold font-title text-sm">2</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">Inversión del Proyecto</h2>
                </div>
                
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/50 mb-8 shadow-xl">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-white/10 bg-black/40">
                        <th className="p-4 sm:p-6 font-semibold text-white">Concepto</th>
                        <th className="p-4 sm:p-6 font-semibold text-white whitespace-nowrap text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 sm:p-6 text-white/90 text-sm sm:text-base">Landing Page Personalizada y Sistema de Suscripción</td>
                        <td className="p-4 sm:p-6 text-white font-medium text-right whitespace-nowrap">$1.300.000 COP</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 sm:p-6 text-white/90 text-sm sm:text-base">Integración de Pasarela de Pago (Wompi)</td>
                        <td className="p-4 sm:p-6 text-white/80 text-right">Incluido</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 sm:p-6 text-white/90 text-sm sm:text-base">Dominio Anual (.com), Infraestructura (Vercel) y SEO</td>
                        <td className="p-4 sm:p-6 text-white/80 text-right">Incluido</td>
                      </tr>
                      <tr className="bg-white/5 font-semibold">
                        <td className="p-4 sm:p-6 text-white">Total Proyecto Base</td>
                        <td className="p-4 sm:p-6 text-white text-lg sm:text-xl text-right whitespace-nowrap">$1.300.000 COP</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-xl border border-blue-900/30 bg-blue-950/10 p-5 sm:p-6 overflow-hidden relative"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
                  <h3 className="text-lg font-bold text-white mb-4">Módulos Adicionales (Opcionales)</h3>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="text-white font-medium mb-1">Mantenimiento y Optimización</p>
                      <p className="text-sm text-white/80 max-w-xl">Servicio mensual continuo para soporte técnico, optimización de contenido y actualizaciones generales del sitio web.</p>
                    </div>
                    <div className="text-white font-bold whitespace-nowrap bg-blue-500/10 px-4 py-3 rounded-lg border border-blue-500/20 text-center md:text-right">
                      +$50.000 COP / mes
                    </div>
                  </div>
                </motion.div>
              </motion.section>

              {/* Section 3: Terms */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold font-title text-sm">3</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">Condiciones Comerciales</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="p-5 sm:p-8 rounded-xl bg-zinc-900/50 border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 to-gray-700"></div>
                    <h3 className="text-white font-bold text-lg mb-4">Forma de Pago</h3>
                    <ul className="space-y-3 text-white/80 text-sm sm:text-base">
                      <li className="flex justify-between border-b border-white/5 pb-3">
                        <span>50% Inicio del desarrollo</span>
                        <strong className="text-white font-medium">$650.000 COP</strong>
                      </li>
                      <li className="flex justify-between pt-1">
                        <span>50% Contra entrega final</span>
                        <strong className="text-white font-medium">$650.000 COP</strong>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 sm:p-8 rounded-xl bg-zinc-900/50 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 to-gray-700"></div>
                    <h3 className="text-white font-bold text-lg mb-4">Tiempos de Desarrollo</h3>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      El tiempo de ejecución por parte de K&T es de <strong className="text-white font-semibold">1 a 2 semanas</strong> una vez recibida toda la información inicial (textos, logos, valor del plan de suscripción y credenciales de la pasarela).
                    </p>
                  </div>

                  <div className="lg:col-span-2 p-5 sm:p-8 rounded-xl border border-amber-900/30 bg-amber-950/20 text-sm sm:text-base">
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5" />
                      Cláusula de Límite Máximo
                    </h3>
                    <p className="text-white/80 leading-relaxed selection:bg-amber-500/30">
                      El proyecto tiene un ciclo de vida máximo de 4 semanas. Si transcurrido este límite el proyecto no se ha podido concluir por problemas de comunicación, demoras en la revisión o falta de entrega de material por parte del cliente, el desarrollo se dará por finalizado de manera unilateral. Se entregará todo el contenido y código que esté en nuestras manos en su estado actual, y se procederá con el cobro del saldo restante.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Section 4: Bank Details */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold font-title text-sm">4</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">Datos Bancarios</h2>
                </div>
                
                <motion.div 
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-white/10 relative overflow-hidden shadow-2xl"
                >
                  {/* Card Background Decoration */}
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
                              {copiedCuenta ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
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
                          <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Cédula</p>
                          <p className="text-white text-sm sm:text-base tracking-widest font-mono">1.090.384.736</p>
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
                              {copiedNequi ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.section>

              {/* Section 5: Warranty */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold font-title text-sm">5</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">Garantía y Soporte</h2>
                </div>
                
                <div className="mb-8 p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white text-sm sm:text-base leading-relaxed">
                    Se otorga una <strong className="font-bold text-white text-base sm:text-lg">Garantía Técnica de 1 mes (30 días)</strong> contados a partir de la fecha de entrega y publicación en producción.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
                  <div className="bg-zinc-900/30 p-6 rounded-xl border border-white/5">
                    <h3 className="text-white flex items-center gap-3 font-bold mb-6 tracking-wide sm:text-lg">
                      <CheckCircle2 className="w-5 h-5" /> Cobertura Incluida
                    </h3>
                    <ul className="space-y-4 text-sm sm:text-base text-white/90">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-2"></span>
                        <span>Resolución de errores de código (bugs) que afecten la navegación.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-2"></span>
                        <span>Corrección de fallos en la comunicación con la pasarela de pagos Wompi.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-2"></span>
                        <span>Corrección de fallos de diseño responsivo (visualización incorrecta en móviles).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-2"></span>
                        <span>Soporte frente a intermitencias derivadas netamente del Hosting en Vercel.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-zinc-900/30 p-6 rounded-xl border border-white/5">
                    <h3 className="text-white flex items-center gap-3 font-bold mb-6 tracking-wide sm:text-lg">
                      <div className="w-5 h-5 rounded-full border-2 border-red-400 flex items-center justify-center text-xs">✕</div> 
                      Exclusiones
                    </h3>
                    <ul className="space-y-4 text-sm sm:text-base text-white/80">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/30 shrink-0 mt-2"></span>
                        <span>Rechazos de tarjetas o caídas del sistema de Wompi (entidad externa).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/30 shrink-0 mt-2"></span>
                        <span>Cambios en diseño o estructura una vez aprobada la fase inicial.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/30 shrink-0 mt-2"></span>
                        <span>Desarrollo de nuevas funcionalidades no contratadas inicialmente.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/30 shrink-0 mt-2"></span>
                        <span>Desconfiguraciones por manipulación de código de terceros no autorizados.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.section>
              {/* Section 6: Portfolio & Next Steps */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="scroll-mt-24"
              >
                <div className="flex flex-col items-center justify-center border-t border-white/10 pt-16 pb-8 text-center">
                  <h2 className="text-3xl font-bold font-title text-white mb-4">¿Listo para comenzar tu proyecto?</h2>
                  <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
                    Revisa algunos de nuestros trabajos más recientes o procede a aceptar la cotización para dar el primer paso.
                  </p>
                  
                  <Link 
                    href="/projects" 
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 text-white transition-all font-medium mb-16 hover:scale-105"
                  >
                    Ver Portafolio de Proyectos <ArrowRight className="w-4 h-4" />
                  </Link>

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
                      href="https://wa.me/573116360057?text=Hola,%20tengo%20dudas%20sobre%20la%20cotizaci%C3%B3n%20de%20Pacific%20Gravelero"
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
              whileInView="visible"
              viewport={{ once: true }}
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
