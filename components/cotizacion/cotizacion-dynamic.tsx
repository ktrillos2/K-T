"use client"

import React, { useState, useEffect } from "react"
import { CheckCircle2, ShieldCheck, Lock, Copy, Check, ThumbsUp, HelpCircle, ArrowRight, Calendar, Receipt, Globe, CreditCard } from "lucide-react"
import { m as motion, AnimatePresence } from "framer-motion"
import Footer from "@/components/layout/footer"
import QuotationProjectsSlider from "@/components/sections/quotation-projects-slider"
import { notifyQuotationViewed, notifyQuotationAccepted } from "@/app/actions/cotizacion-actions"

interface CotizacionData {
  _id: string
  title: string
  slug: string
  password: string
  clientName: string
  headerTitle: string
  headerSubtitle?: string
  date: string
  validityDays: string
  scopeTitle: string
  scopeDescription: string
  scopeItems: { title: string; description: string }[]
  investmentTitle: string
  currency: string
  investmentItems: { concept: string; value?: string; isIncluded: boolean }[]
  totalLabel: string
  totalValue: string
  termsTitle: string
  termsCards: { title: string; content: string; isFullWidth: boolean; isWarning: boolean }[]
  paymentTitle: string
  showInternationalPayments: boolean
  internationalPaymentMethods?: { name: string; description: string; recommended: boolean }[]
  warrantyTitle: string
  warrantyDescription: string
  warrantyCoverageTitle: string
  warrantyCoverage: string[]
  warrantyExclusionsTitle: string
  warrantyExclusions: string[]
  whatsappMessage: string
}

export default function CotizacionDynamicPage({ data }: { data: CotizacionData }) {
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
    if (password === data.password) {
      setIsAuthenticated(true)
      setError(false)
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
      
      if (!hasViewed) {
        setHasViewed(true)
        notifyQuotationViewed({ client: data.clientName }).catch(console.error)
      }
    } else {
      setError(true)
      setPassword("")
    }
  }

  const handleAccept = async () => {
    setIsAccepting(true)
    try {
      await notifyQuotationAccepted({ client: data.clientName })
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

  const whatsappLink = `https://wa.me/573133087069?text=${encodeURIComponent(data.whatsappMessage || 'Hola, tengo dudas sobre la cotización')}`

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
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              
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
                  {error && <p className="text-white text-xs mt-2">Contraseña incorrecta. Intenta nuevamente.</p>}
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
                {data.headerTitle}
                {data.headerSubtitle && (
                  <span className="text-xl sm:text-2xl text-white/70 block mt-4">{data.headerSubtitle}</span>
                )}
              </h1>
              
              <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-5 sm:p-6 rounded-2xl bg-zinc-900/80 border border-white/10 shadow-lg">
                <div className="flex items-center gap-4 px-4">
                  <Calendar className="w-6 h-6 text-white/80" />
                  <div className="text-left leading-tight">
                    <p className="text-xs text-white/60 uppercase tracking-widest mb-1">Emisión</p>
                    <p className="text-sm sm:text-base text-white font-medium">{data.date}</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/10"></div>
                <div className="flex items-center gap-4 px-4 border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0 w-full sm:w-auto">
                  <Receipt className="w-6 h-6 text-white/80" />
                  <div className="text-left leading-tight">
                    <p className="text-xs text-white/60 uppercase tracking-widest mb-1">Validez</p>
                    <p className="text-sm sm:text-base text-white font-medium">{data.validityDays}</p>
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
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold font-title text-sm">1</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">{data.scopeTitle}</h2>
                </div>
                {data.scopeDescription && (
                  <p className="text-white/80 mb-8 text-base sm:text-lg leading-relaxed">
                    {data.scopeDescription}
                  </p>
                )}
                
                <motion.div 
                  variants={staggerContainer as any}
                  initial="hidden"
                  animate="visible"
                  className="grid sm:grid-cols-2 gap-4 sm:gap-6"
                >
                  {data.scopeItems?.map((item, i) => (
                    <motion.div 
                      variants={fadeIn as any}
                      key={i} 
                      className={`flex flex-col sm:flex-row gap-4 p-5 sm:p-6 rounded-xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/80 transition-all duration-300 group ${data.scopeItems.length % 2 !== 0 && i === data.scopeItems.length - 1 ? 'sm:col-span-2 sm:mx-auto sm:max-w-[calc(50%-0.75rem)]' : ''}`}
                    >
                      <CheckCircle2 className="w-6 h-6 text-white shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="text-white font-semibold mb-2 sm:text-lg">{item.title}</h3>
                        <p className="text-white/80 leading-relaxed text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* Section 2: Investment */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                animate="visible"
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold font-title text-sm">2</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">{data.investmentTitle}</h2>
                </div>
                
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/50 shadow-xl">
                  <table className="w-full text-left border-collapse min-w-full">
                    <thead>
                      <tr className="border-b border-white/10 bg-black/40">
                        <th className="p-4 sm:p-6 font-semibold text-white">Concepto</th>
                        <th className="p-4 sm:p-6 font-semibold text-white whitespace-nowrap text-right">Valor{data.currency ? ` (${data.currency})` : ''}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {data.investmentItems?.map((item, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-4 sm:p-6 text-white/90 text-sm sm:text-base">{item.concept}</td>
                          <td className="p-4 sm:p-6 text-white font-medium text-right whitespace-nowrap">
                            {item.isIncluded ? <span className="text-white/80">Incluido</span> : item.value}
                          </td>
                        </tr>
                      ))}
                      {data.totalLabel && (
                        <tr className="bg-white/5 font-semibold">
                          <td className="p-4 sm:p-6 text-white">{data.totalLabel}</td>
                          <td className="p-4 sm:p-6 text-white text-lg sm:text-xl text-right whitespace-nowrap">{data.totalValue}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.section>

              {/* Section 3: Terms */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                animate="visible"
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold font-title text-sm">3</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">{data.termsTitle}</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                  {data.termsCards?.map((card, i) => (
                    <div 
                      key={i} 
                      className={`p-5 sm:p-8 rounded-xl ${card.isWarning ? 'border border-amber-900/30 bg-amber-950/20' : 'bg-zinc-900/50 border border-white/5'} relative overflow-hidden ${card.isFullWidth ? 'lg:col-span-2' : ''}`}
                    >
                      {card.isWarning ? (
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                      ) : (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                      )}
                      <h3 className={`text-white font-bold text-lg mb-4 ${card.isWarning ? 'flex items-center gap-2 pl-2' : ''}`}>
                        {card.isWarning && <ShieldCheck className="w-5 h-5 text-amber-500" />}
                        {card.title}
                      </h3>
                      <p className={`${card.isWarning ? 'text-white/80 leading-relaxed selection:bg-amber-500/30 pl-2' : 'text-white/80 text-sm sm:text-base leading-relaxed'}`} style={{ whiteSpace: 'pre-line' }}>
                        {card.content}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Section 4: Payment Methods */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                animate="visible"
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold font-title text-sm">4</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">{data.paymentTitle}</h2>
                </div>

                {data.showInternationalPayments && data.internationalPaymentMethods && data.internationalPaymentMethods.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* International Payments */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-white/10 relative overflow-hidden shadow-2xl">
                      <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-emerald-400" />
                        Pagos Internacionales (Exterior)
                      </h3>
                      <ul className="space-y-6">
                        {data.internationalPaymentMethods.map((method, i) => (
                          <li key={i} className={i < data.internationalPaymentMethods!.length - 1 ? 'border-b border-white/10 pb-4' : ''}>
                            <p className="font-bold text-white mb-1 flex items-center">
                              {method.name}
                              {method.recommended && (
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full ml-2 uppercase tracking-wide">Recomendado</span>
                              )}
                            </p>
                            <p className="text-sm text-white/70">{method.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* National Payments */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-white/10 relative overflow-hidden shadow-2xl">
                      <div className="absolute right-0 top-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-red-500"></div>
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-yellow-400" />
                        Pagos Nacionales (Colombia)
                      </h3>
                      <div className="flex flex-col space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Banco</p>
                            <span className="w-8 h-5 rounded bg-white/10 flex items-center justify-center border border-white/20">
                              <div className="w-2 h-2 rounded-full bg-white/50"></div>
                            </span>
                          </div>
                          <p className="text-xl text-white font-bold tracking-tight">Bancolombia</p>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Tipo</p>
                              <p className="text-white text-sm font-medium font-mono">AHORROS</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Número</p>
                              <div className="flex items-center gap-2">
                                <p className="text-white text-sm tracking-widest font-mono">91290318578</p>
                                <button onClick={() => handleCopy('91290318578', 'cuenta')} className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white" title="Copiar número de cuenta">
                                  {copiedCuenta ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-white/10 pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold mb-1">Nequi</p>
                              <div className="flex items-center gap-2">
                                <p className="text-white text-sm tracking-widest font-mono">3133087069</p>
                                <button onClick={() => handleCopy('3133087069', 'nequi')} className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white" title="Copiar número de Nequi">
                                  {copiedNequi ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Titular Details (shared, always shown) */}
                {!data.showInternationalPayments && (
                  <motion.div 
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-white/10 relative overflow-hidden shadow-2xl mb-6"
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
                              <button onClick={() => handleCopy('91290318578', 'cuenta')} className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white" title="Copiar número de cuenta">
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
                            <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Cédula y RUT</p>
                            <p className="text-white text-sm tracking-widest font-mono leading-tight">C.C. 1.090.384.736<br/>RUT: 1090384736-8</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Nequi</p>
                            <div className="flex items-center gap-2">
                              <p className="text-white text-sm sm:text-base tracking-widest font-mono">3133087069</p>
                              <button onClick={() => handleCopy('3133087069', 'nequi')} className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white" title="Copiar número de Nequi">
                                {copiedNequi ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Titular Details for international layout */}
                {data.showInternationalPayments && (
                  <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-white/10 shadow-lg">
                    <p className="text-[10px] text-white/60 uppercase tracking-widest mb-4 font-bold">Datos del Titular para Transferencias</p>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Nombre</p>
                        <p className="text-white font-medium">Keyner Steban Trillos Useche</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Cédula</p>
                        <p className="text-white font-mono">1.090.384.736</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">RUT</p>
                        <p className="text-white font-mono">1090384736-8</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.section>

              {/* Section 5: Warranty */}
              <motion.section 
                variants={fadeIn as any}
                initial="hidden"
                animate="visible"
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold font-title text-sm">5</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-title text-white">{data.warrantyTitle}</h2>
                </div>
                
                {data.warrantyDescription && (
                  <div className="mb-8 p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-lg">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white text-sm sm:text-base leading-relaxed">
                      {data.warrantyDescription}
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
                  {data.warrantyCoverage && data.warrantyCoverage.length > 0 && (
                    <div className="bg-zinc-900/30 p-6 rounded-xl border border-white/5">
                      <h3 className="text-white flex items-center gap-3 font-bold mb-6 tracking-wide sm:text-lg">
                        <CheckCircle2 className="w-5 h-5" /> {data.warrantyCoverageTitle || 'Cobertura Incluida'}
                      </h3>
                      <ul className="space-y-4 text-sm sm:text-base text-white/90">
                        {data.warrantyCoverage.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-2"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {data.warrantyExclusions && data.warrantyExclusions.length > 0 && (
                    <div className="bg-zinc-900/30 p-6 rounded-xl border border-white/5">
                      <h3 className="text-white flex items-center gap-3 font-bold mb-6 tracking-wide sm:text-lg">
                        <div className="w-5 h-5 rounded-full border-2 border-red-400 flex items-center justify-center text-xs text-red-400">✕</div> 
                        {data.warrantyExclusionsTitle || 'Exclusiones'}
                      </h3>
                      <ul className="space-y-4 text-sm sm:text-base text-white/80">
                        {data.warrantyExclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/30 shrink-0 mt-2"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.section>

              {/* Section 6: Portfolio & Next Steps */}
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
                      href={whatsappLink}
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
