import React from "react"
import { Bot, Lock, Smartphone, Sparkles, Users, Zap } from "lucide-react"
import { type FeatureGridData } from "@/lib/blog-diagram-parser"

interface FeatureGridViewProps {
  data: FeatureGridData
}

export function FeatureGridView({ data }: FeatureGridViewProps) {
  const { title, features } = data

  const getFeatureIcon = (iconStr: string | undefined, titleStr: string) => {
    const t = titleStr.toLowerCase()
    if (t.includes("velocidad") || t.includes("rendimiento") || iconStr === "🚀") {
      return <Zap className="w-5 h-5 text-amber-400" />
    }
    if (t.includes("usuario") || t.includes("ilimitados") || iconStr === "👥") {
      return <Users className="w-5 h-5 text-cyan-400" />
    }
    if (t.includes("seguridad") || t.includes("rbac") || iconStr === "🔒") {
      return <Lock className="w-5 h-5 text-emerald-400" />
    }
    if (t.includes("responsive") || t.includes("móvil") || iconStr === "📱") {
      return <Smartphone className="w-5 h-5 text-purple-400" />
    }
    if (t.includes("ia") || t.includes("agente") || iconStr === "🤖") {
      return <Bot className="w-5 h-5 text-pink-400" />
    }
    return <Sparkles className="w-5 h-5 text-emerald-400" />
  }

  return (
    <div className="w-full py-4 px-2 sm:px-4">
      {title && (
        <div className="text-center mb-6">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold block mb-1">
            VENTAJAS TÉCNICAS CLAVE
          </span>
          <h3 className="font-title text-xl md:text-2xl font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl border border-white/10 hover:border-emerald-500/40 bg-neutral-950/80 p-5 backdrop-blur-xl transition-all duration-300 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors">
                  {getFeatureIcon(feature.icon, feature.title)}
                </div>
                <h4 className="font-title text-sm md:text-base font-bold text-white tracking-tight">
                  {feature.title}
                </h4>
              </div>
              <p className="font-sans text-xs md:text-sm text-neutral-300 leading-relaxed">
                {feature.description}
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-neutral-500 font-mono text-[10px]">
              <span>K&T Engineering</span>
              <span className="text-emerald-400 font-bold">✓ Incluido</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
