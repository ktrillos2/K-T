import React from "react"
import { AlertCircle, CheckCircle2, ShieldCheck, XCircle } from "lucide-react"
import { type ComparisonSideBySideData } from "@/lib/blog-diagram-parser"

interface ComparisonViewProps {
  data: ComparisonSideBySideData
}

export function ComparisonView({ data }: ComparisonViewProps) {
  const { columns, title } = data

  return (
    <div className="w-full py-2">
      {title && (
        <div className="text-center mb-6">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mb-1">
            Análisis Comparativo
          </span>
          <h3 className="font-title text-xl md:text-2xl font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {columns.map((col, idx) => {
          const isNegative = col.isNegative ?? idx === 0

          return (
            <div
              key={idx}
              className={`rounded-xl p-5 md:p-6 border transition-colors flex flex-col justify-between ${
                isNegative
                  ? "bg-[#141212] border-white/10 hover:border-white/20"
                  : "bg-[#121413] border-white/10 hover:border-white/20"
              }`}
            >
              <div>
                {/* Header Badge & Title */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                      {isNegative ? (
                        <AlertCircle className="w-4 h-4 text-neutral-400" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-neutral-200" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-title text-base md:text-lg font-bold text-white tracking-tight">
                        {col.title}
                      </h4>
                      {col.badge && (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mt-0.5">
                          {col.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  {col.items.map((item, itemIdx) => {
                    const isItemNegative = item.isNegative ?? isNegative

                    return (
                      <div key={itemIdx} className="flex items-start gap-2.5">
                        <div className="mt-0.5 shrink-0">
                          {isItemNegative ? (
                            <XCircle className="w-3.5 h-3.5 text-neutral-500" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-300" />
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
              <div className="mt-5 pt-3 border-t border-white/5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] bg-white/5 text-neutral-300 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  {isNegative ? "Método No Oficial" : "Arquitectura Recomendada"}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
