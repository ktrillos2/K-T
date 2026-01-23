"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"

import { projects } from "@/lib/projects"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Check, X, Phone, User, Globe, MessageSquare, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { countryCodes } from "@/lib/country-codes"
import { sendLeadEmail } from "@/app/actions/send-lead"
import { identifyTikTokUser } from "@/lib/tiktok-client"
import { toast } from "sonner"

import { useRouter } from "next/navigation"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

interface WhatsAppModalProps {
    isOpen: boolean
    onClose: () => void
}

type Step = "projects" | "form" | "pricing"

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
    const [step, setStep] = useState<Step>("projects")
    const { dictionary, language, convertPrice, country } = useLanguage()
    const router = useRouter()

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        phoneCode: "+57",
        phoneNumber: "",
        service: "",
        contactPreference: "whatsapp"
    })

    // Validation State
    const [phoneError, setPhoneError] = useState("")

    useEffect(() => {
        if (formData.phoneNumber) {
            if (formData.phoneNumber.length < 7) {
                setPhoneError("El número parece muy corto. Verifícalo por favor.")
            } else if (!/^\d+$/.test(formData.phoneNumber)) {
                setPhoneError("Solo se permiten números.")
            } else {
                setPhoneError("")
            }
        } else {
            setPhoneError("")
        }
    }, [formData.phoneNumber])

    // Projects Carousel State
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false }, [
        Autoplay({ delay: 3000, stopOnInteraction: false }),
    ])
    const [currentProject, setCurrentProject] = useState(0)

    useEffect(() => {
        if (!emblaApi) return

        // Sync current index
        emblaApi.on("select", () => {
            setCurrentProject(emblaApi.selectedScrollSnap())
        })
    }, [emblaApi])

    // Pricing State
    const [calculatedPrice, setCalculatedPrice] = useState("")

    useEffect(() => {
        if (isOpen) {
            setStep("projects")
            // Set default phone code based on detected country
            const code = countryCodes.find(c => c.name === country)?.code || "+57"
            setFormData(prev => ({ ...prev, phoneCode: code }))
        }
    }, [isOpen, country])

    const handleNextProject = () => {
        if (emblaApi) emblaApi.scrollNext()
    }

    const handlePrevProject = () => {
        if (emblaApi) emblaApi.scrollPrev()
    }

    const handleBack = () => {
        if (step === "form") setStep("projects")
        if (step === "pricing") setStep("form")
    }

    const handleServiceChange = (service: string) => {
        setFormData({ ...formData, service })

        // Calculate Price Logic
        let basePriceUSD = 0

        switch (service) {
            case "web-dev":
                basePriceUSD = 200
                break
            case "landing":
                basePriceUSD = 150
                break
            case "ecommerce":
                basePriceUSD = 400
                break
            case "ecommerce":
                basePriceUSD = 400
                break
            case "social":
                basePriceUSD = 150
                break
            default:
                basePriceUSD = 0
        }

        setCalculatedPrice(convertPrice(basePriceUSD))
    }

    const handleFinalSubmit = async () => {
        const fullPhone = `${formData.phoneCode}${formData.phoneNumber}`



        // 2. Prepare WhatsApp Message
        let message = `Hola K&T, soy *${formData.name}*.\n\n`

        message += `🚀 *Estoy interesado en:* ${getServiceName(formData.service)}\n`
        message += `📱 *Mi número:* ${fullPhone}\n`
        message += `💬 *Prefiero ser contactado por:* ${formData.contactPreference === 'call' ? 'Llamada 📞' : 'WhatsApp 💬'}\n\n`

        if (formData.service === 'web-dev' || formData.service === 'ecommerce') {
            message += `Me gustaría recibir asesoría para iniciar mi proyecto. Quedo atento a su respuesta.`
        } else {
            message += `Quisiera más información sobre este servicio.`
        }

        const whatsappUrl = `https://wa.me/573116360057?text=${encodeURIComponent(message)}`

        // 3. Identify User for TikTok Pixel (Client Side for Session Matching)
        await identifyTikTokUser({
            phone: fullPhone,
            // email: no email in this form
        })

        // 2. Open WhatsApp IMMEDIATELY (to bypass popup blockers)


        // 2. Open WhatsApp IMMEDIATELY (to bypass popup blockers)
        // Adding 'noopener,noreferrer' is good practice but _blank is standard.
        // The user specifically asked for wa.me/, so we stick to it.
        window.open(whatsappUrl, "_blank", "noopener,noreferrer")

        // 3. Send Email in Background
        const emailPromise = sendLeadEmail({
            name: formData.name,
            phone: fullPhone,
            country: country,
            service: formData.service,
            priceQuote: calculatedPrice,
            contactPreference: formData.contactPreference as "whatsapp" | "call"
        })

        toast.promise(emailPromise, {
            loading: 'Notificando a la agencia...',
            success: '¡Notificación enviada! Revisa tu WhatsApp.',
            error: 'No se pudo enviar la notificación, pero el chat está abierto.'
        })

        // 4. Close modal after a short delay
        setTimeout(() => {
            onClose()
        }, 1000)
    }

    const getServiceName = (key: string) => {
        const services: Record<string, string> = {
            'web-dev': 'Desarrollo Web a Medida',
            'landing': 'Landing Page',
            'ecommerce': 'Tienda Online / E-commerce',
            'social': 'Gestión de Redes / Ads',
            'other': 'Otro / Asesoría'
        }
        return services[key] || key
    }

    const getServiceDescription = (key: string) => {
        const descriptions: Record<string, string> = {
            'web-dev': 'Sitios web corporativos, blogs o portafolios a la medida de tu marca.',
            'landing': 'Una página única diseñada específicamente para convertir visitantes en clientes (Ventas/Leads).',
            'ecommerce': 'Tienda virtual completa con carrito de compras y pasarela de pagos.',
            'social': 'Estrategia personalizada según tu objetivo: Ventas, Reconocimiento o Crecimiento de comunidad.',
            'other': 'Cualquier otro requerimiento o consultoría tecnológica.'
        }
        return descriptions[key] || ''
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-card/90 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative"
                >
                    {/* Close Button */}
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white z-20">
                        <X size={24} />
                    </button>

                    {/* Back Button */}
                    {step !== "projects" && (
                        <button onClick={handleBack} className="absolute top-4 left-4 text-white/50 hover:text-white z-20">
                            <ArrowLeft size={24} />
                        </button>
                    )}

                    <div className="p-6 pt-14 md:p-8 md:pt-14">

                        {/* STEP 1: PROJECT SHOWCASE */}
                        {step === "projects" && (
                            <div className="space-y-6 text-center">
                                <h3 className="text-2xl font-title font-bold text-white">¿Ya viste nuestros proyectos?</h3>

                                {/* Embla Carousel */}
                                <div className="overflow-hidden" ref={emblaRef}>
                                    <div className="flex touch-pan-y -ml-4 items-center">
                                        {projects.map((project, index) => (
                                            <div className="flex-[0_0_70%] min-w-0 pl-4 relative" key={project.id}>
                                                <div
                                                    onClick={() => window.open(project.liveUrl, "_blank")}
                                                    className={`
                                    relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 group cursor-pointer
                                    transition-all duration-500 ease-out
                                    ${index === currentProject ? 'scale-100 opacity-100 shadow-xl shadow-black/50' : 'scale-90 opacity-40 blur-[1px]'}
                                `}>
                                                    <Image
                                                        src={project.images.hero}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 text-left">
                                                        <h4 className="text-white font-bold text-lg">{project.title}</h4>
                                                        <p className="text-white/70 text-sm font-mono">{project.month} {project.year}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-6 transition-all transform hover:scale-105"
                                    onClick={() => window.open(projects[currentProject].liveUrl, "_blank")}
                                >
                                    Visitar sitio web <Globe size={16} className="ml-2" />
                                </Button>

                                <div className="flex flex-col md:flex-row gap-4 pt-4">
                                    <Button
                                        variant="ghost"
                                        className="flex-1 border border-white/20 hover:bg-white/10"
                                        onClick={() => {
                                            onClose()
                                            router.push("/#work")
                                        }}
                                    >
                                        No, quiero ver más
                                    </Button>
                                    <Button
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                        onClick={() => setStep("form")}
                                    >
                                        Sí, quiero empezar
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: LEAD FORM */}
                        {step === "form" && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h3 className="text-2xl font-title font-bold text-white">¡Empecemos tu desarrollo!</h3>
                                    <p className="text-white/60 text-sm">Cuéntanos un poco sobre ti.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Nombre</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 text-white/40" size={18} />
                                            <Input
                                                placeholder="Tu nombre"
                                                className="pl-10"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Teléfono</Label>
                                        <div className="flex gap-2">
                                            <Select
                                                value={formData.phoneCode}
                                                onValueChange={(val) => setFormData({ ...formData, phoneCode: val })}
                                            >
                                                <SelectTrigger className="w-[120px]">
                                                    <SelectValue placeholder="Code" />
                                                </SelectTrigger>
                                                <SelectContent className="z-[200]">
                                                    {countryCodes.map(c => (
                                                        <SelectItem key={c.code} value={c.code}>
                                                            <span className="mr-2">{c.flag}</span> {c.code}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <div className="relative flex-1">
                                                <Phone className="absolute left-3 top-3 text-white/40 align-center text-center" size={18} />
                                                <Input
                                                    placeholder="Número de WhatsApp"
                                                    className={`pl-10 ${phoneError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                                    type="tel"
                                                    value={formData.phoneNumber}
                                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        {phoneError && (
                                            <p className="text-xs text-red-400 mt-1 ml-1 animate-in slide-in-from-top-1">
                                                ⚠️ {phoneError}
                                            </p>
                                        )}
                                        {!phoneError && formData.phoneNumber.length > 6 && (
                                            <p className="text-xs text-yellow-400 mt-1 ml-1 animate-in slide-in-from-top-1">
                                                ⚠ Confirma que este número está correcto para poder contactarte.
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Servicio de Interés</Label>
                                        <Select onValueChange={handleServiceChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un servicio" />
                                            </SelectTrigger>
                                            <SelectContent className="z-[200]">
                                                <SelectItem value="web-dev">Desarrollo Web A Medida</SelectItem>
                                                <SelectItem value="landing">Landing Page</SelectItem>
                                                <SelectItem value="ecommerce">Tienda Online</SelectItem>
                                                <SelectItem value="social">Gestión de Redes / Ads</SelectItem>
                                                <SelectItem value="other">Otro / Asesoría</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {formData.service && (
                                            <div className="mt-2 text-xs text-blue-300 bg-blue-500/10 border border-blue-500/20 p-2 rounded flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                                                <Info size={14} className="mt-0.5 shrink-0" />
                                                <p>{getServiceDescription(formData.service)}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <Label>¿Cómo prefieres ser contactado?</Label>
                                        <RadioGroup
                                            defaultValue="whatsapp"
                                            value={formData.contactPreference}
                                            className="flex gap-4"
                                            onValueChange={(val) => setFormData({ ...formData, contactPreference: val })}
                                        >
                                            <div
                                                onClick={() => setFormData({ ...formData, contactPreference: "whatsapp" })}
                                                className={`flex items-center space-x-2 bg-white/5 p-3 rounded-lg border hover:bg-white/10 cursor-pointer transition-colors flex-1 ${formData.contactPreference === 'whatsapp' ? 'border-green-500/50 bg-green-500/10' : 'border-white/10'}`}
                                            >
                                                <RadioGroupItem value="whatsapp" id="r1" className="bg-white border-white/50 text-black fill-black" />
                                                <Label htmlFor="r1" className="cursor-pointer text-white flex items-center gap-2 w-full">
                                                    <MessageSquare size={16} className="text-green-400" /> WhatsApp
                                                </Label>
                                            </div>
                                            <div
                                                onClick={() => setFormData({ ...formData, contactPreference: "call" })}
                                                className={`flex items-center space-x-2 bg-white/5 p-3 rounded-lg border hover:bg-white/10 cursor-pointer transition-colors flex-1 ${formData.contactPreference === 'call' ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/10'}`}
                                            >
                                                <RadioGroupItem value="call" id="r2" className="bg-white border-white/50 text-black fill-black" />
                                                <Label htmlFor="r2" className="cursor-pointer text-white flex items-center gap-2 w-full">
                                                    <Phone size={16} className="text-blue-400" /> Llamada
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-primary text-primary-foreground font-bold mt-4"
                                    disabled={!formData.name || !formData.phoneNumber || !formData.service || !!phoneError}
                                    onClick={() => setStep("pricing")}
                                >
                                    Continuar <ArrowRight className="ml-2" size={18} />
                                </Button>
                            </div>
                        )}

                        {/* STEP 3: PRICING & LOGIC */}
                        {step === "pricing" && (
                            <div className="space-y-6 text-center animate-in fade-in zoom-in duration-300">
                                <h3 className="text-2xl font-title font-bold text-white">
                                    {getServiceName(formData.service)}
                                </h3>

                                <div className="py-6 bg-white/5 rounded-xl border border-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                                    <p className="text-white/60 text-sm mb-2">Precio estimado desde</p>
                                    <div className="text-4xl md:text-5xl font-bold text-primary font-title">
                                        {country === "Colombia"
                                            ? (formData.service === 'web-dev' ? '$700.000 COP' :
                                                formData.service === 'landing' ? '$450.000 COP' :
                                                    formData.service === 'ecommerce' ? '$1.300.000 COP' :
                                                        '$400.000 COP')
                                            : calculatedPrice
                                        }
                                    </div>
                                    {country !== "Colombia" && (
                                        <p className="text-xs text-white/40 mt-2">Moneda local aproximada ({country})</p>
                                    )}
                                </div>

                                {formData.service === 'landing' && (
                                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg text-left">
                                        <p className="text-sm text-blue-200">
                                            <strong>💡 Tip:</strong> ¿Necesitas una sola página (One-page) o un sitio completo multipágina? Lo definiremos en nuestra charla.
                                        </p>
                                    </div>
                                )}

                                <div className="pt-2">
                                    <Button
                                        size="lg"
                                        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg h-14 shadow-lg shadow-green-900/20"
                                        onClick={handleFinalSubmit}
                                    >
                                        <MessageSquare className="mr-2" size={24} />
                                        Sí, contactar ahora
                                    </Button>
                                    <p className="text-xs text-white/30 mt-4">
                                        Al continuar, aceptas que te contactemos vía WhatsApp.
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </motion.div>
            </motion.div >
        </AnimatePresence >
    )
}
