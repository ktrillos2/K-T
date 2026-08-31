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
      return <Zap className="w-4 h-4 text-neutral-300" />
    }
    if (t.includes("usuario") || t.includes("ilimitados") || iconStr === "👥") {
      return <Users className="w-4 h-4 text-neutral-300" />
    }
    if (t.includes("seguridad") || t.includes("rbac") || iconStr === "🔒") {
      return <Lock className="w-4 h-4 text-neutral-300" />
    }
    if (t.includes("responsive") || t.includes("móvil") || iconStr === "📱") {
      return <Smartphone className="w-4 h-4 text-neutral-300" />
    }
    if (t.includes("ia") || t.includes("agente") || iconStr === "🤖") {
      return <Bot className="w-4 h-4 text-neutral-300" />
    }
    return <Sparkles className="w-4 h-4 text-neutral-300" />
  }

  return (
    <div className="w-full py-2">
      {title && (
        <div className="text-center mb-6">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mb-1">
            Ventajas Técnicas
          </span>
          <h3 className="font-title text-xl md:text-2xl font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-white/10 bg-[#131313] p-4 hover:border-white/20 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
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
          </div>
        ))}
      </div>
    </div>
  )
}
