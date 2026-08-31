import React from "react"
import { CheckCircle2, HelpCircle, Lightbulb, Sparkles, Wrench, XCircle } from "lucide-react"
import { type DecisionTreeData } from "@/lib/blog-diagram-parser"

interface DecisionTreeViewProps {
  data: DecisionTreeData
}

export function DecisionTreeView({ data }: DecisionTreeViewProps) {
  const { rootQuestion, yesBranch, noBranch } = data

  return (
    <div className="w-full py-2">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* ROOT QUESTION */}
        <div className="rounded-xl border border-white/10 bg-[#131313] p-5 hover:border-white/20 transition-colors text-center">
          <div className="inline-flex items-center justify-center p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 mb-2.5">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
            Evaluación Inicial
          </span>
          <h4 className="font-title text-base md:text-lg font-bold text-white tracking-tight">
            {rootQuestion}
          </h4>
        </div>

        {/* BRANCH SPLIT CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* YES BRANCH */}
          <div className="rounded-xl border border-white/10 bg-[#131313] p-4 hover:border-white/20 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-200 font-mono text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  RESPUESTA: SÍ
                </span>
              </div>

              {yesBranch.nextQuestion && (
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 mb-3">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                    Condición de volumen
                  </span>
                  <p className="font-title text-xs md:text-sm font-bold text-white mt-1">
                    {yesBranch.nextQuestion}
                  </p>
                </div>
              )}

              {yesBranch.yesAction && (
                <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 mt-2">
                  <div className="flex items-center gap-1.5 text-neutral-200 font-mono text-[11px] font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Recomendación:</span>
                  </div>
                  <p className="font-sans text-xs md:text-sm font-semibold text-white">
                    {yesBranch.yesAction}
                  </p>
                </div>
              )}

              {yesBranch.noAction && (
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 mt-2">
                  <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] font-semibold mb-0.5">
                    <Wrench className="w-3 h-3" />
                    <span>Alternativa:</span>
                  </div>
                  <p className="font-sans text-xs text-neutral-300">
                    {yesBranch.noAction}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* NO BRANCH */}
          <div className="rounded-xl border border-white/10 bg-[#131313] p-4 hover:border-white/20 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-400 font-mono text-xs font-semibold">
                  <XCircle className="w-3.5 h-3.5" />
                  RESPUESTA: NO
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 mb-3">
                <div className="flex items-center gap-1.5 text-neutral-300 font-mono text-[11px] font-semibold mb-1">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Acción recomendada:</span>
                </div>
                <p className="font-sans text-xs md:text-sm font-semibold text-white">
                  {noBranch.action}
                </p>
              </div>

              {noBranch.subtext && (
                <p className="font-sans text-xs text-neutral-400 leading-relaxed italic">
                  “{noBranch.subtext}”
                </p>
              )}
            </div>

            <div className="mt-3 pt-2 border-t border-white/5">
              <span className="font-mono text-[10px] text-neutral-500">
                Paso previo a la implementación
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
