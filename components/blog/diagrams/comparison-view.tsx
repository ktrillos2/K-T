import React from "react"
import { AlertTriangle, CheckCircle2, ShieldCheck, XCircle } from "lucide-react"
import { type ComparisonSideBySideData } from "@/lib/blog-diagram-parser"

interface ComparisonViewProps {
  data: ComparisonSideBySideData
}

export function ComparisonView({ data }: ComparisonViewProps) {
  const { columns, title } = data

  return (
    <div className="w-full py-4 px-2 sm:px-4">
      {title && (
        <div className="text-center mb-6">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold block mb-1">
            ANÁLISIS COMPARATIVO
          </span>
          <h3 className="font-title text-xl md:text-2xl font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {columns.map((col, idx) => {
          const isNegative = col.isNegative ?? idx === 0

          return (
            <div
              key={idx}
              className={`relative rounded-3xl p-6 md:p-7 backdrop-blur-xl border transition-all duration-300 shadow-2xl flex flex-col justify-between ${
                isNegative
                  ? "bg-gradient-to-b from-red-950/20 via-neutral-950/80 to-black border-red-500/30 hover:border-red-500/50"
                  : "bg-gradient-to-b from-emerald-950/20 via-neutral-950/80 to-black border-emerald-500/40 hover:border-emerald-500/60 shadow-emerald-500/5"
              }`}
            >
              <div>
                {/* Header Badge & Title */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-xl border ${
                        isNegative
                          ? "bg-red-500/10 border-red-500/30 text-red-400"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      }`}
                    >
                      {isNegative ? (
                        <AlertTriangle className="w-5 h-5" />
                      ) : (
                        <ShieldCheck className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-title text-base md:text-lg font-bold text-white tracking-tight">
                        {col.title}
                      </h4>
                      {col.badge && (
                        <span
                          className={`font-mono text-[11px] uppercase tracking-wider font-semibold block mt-0.5 ${
                            isNegative ? "text-red-400" : "text-emerald-400"
                          }`}
                        >
                          {col.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3.5 pt-4 border-t border-white/10">
                  {col.items.map((item, itemIdx) => {
                    const isItemNegative = item.isNegative ?? isNegative

                    return (
                      <div key={itemIdx} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {isItemNegative ? (
                            <XCircle className="w-4 h-4 text-red-400" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          )}
                        </div>
                        <span className="font-sans text-xs md:text-sm text-neutral-300 leading-relaxed">
                          {item.text}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-semibold ${
                    isNegative
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isNegative ? "bg-red-400" : "bg-emerald-400 animate-pulse"
                    }`}
                  />
                  {isNegative ? "No recomendado para empresas" : "Estándar K&T de Alto Rendimiento"}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
