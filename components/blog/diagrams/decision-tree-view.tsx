import React from "react"
import { CheckCircle2, HelpCircle, Lightbulb, Sparkles, Wrench, XCircle } from "lucide-react"
import { type DecisionTreeData } from "@/lib/blog-diagram-parser"

interface DecisionTreeViewProps {
  data: DecisionTreeData
}

export function DecisionTreeView({ data }: DecisionTreeViewProps) {
  const { rootQuestion, yesBranch, noBranch } = data

  return (
    <div className="w-full py-4 px-2 sm:px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* ROOT QUESTION */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 via-emerald-500/20 to-cyan-500/30 rounded-2xl blur-sm opacity-60" />
          <div className="relative rounded-2xl border border-cyan-500/30 bg-neutral-950/90 p-5 md:p-6 backdrop-blur-xl shadow-xl text-center">
            <div className="inline-flex items-center justify-center p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-3">
              <HelpCircle className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold block mb-1">
              PREGUNTA DE DECISIÓN ARQUITECTÓNICA
            </span>
            <h4 className="font-title text-base md:text-xl font-bold text-white tracking-tight">
              {rootQuestion}
            </h4>
          </div>
        </div>

        {/* BRANCH SPLIT CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* YES BRANCH */}
          <div className="rounded-2xl border border-emerald-500/30 bg-neutral-950/90 p-5 backdrop-blur-xl flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  RESPUESTA: SÍ
                </span>
              </div>

              {yesBranch.nextQuestion && (
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 mb-3">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                    Condición secundaria
                  </span>
                  <p className="font-title text-xs md:text-sm font-bold text-white mt-1">
                    {yesBranch.nextQuestion}
                  </p>
                </div>
              )}

              {yesBranch.yesAction && (
                <div className="space-y-2 mt-2">
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] font-bold mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>RECOMENDACIÓN FINAL:</span>
                    </div>
                    <p className="font-sans text-xs md:text-sm font-bold text-emerald-200">
                      {yesBranch.yesAction}
                    </p>
                  </div>
                </div>
              )}

              {yesBranch.noAction && (
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 mt-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] font-bold mb-0.5">
                    <Wrench className="w-3 h-3" />
                    <span>SI EL VOLUMEN ES BAJO:</span>
                  </div>
                  <p className="font-sans text-xs text-neutral-300">
                    {yesBranch.noAction}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* NO BRANCH */}
          <div className="rounded-2xl border border-amber-500/30 bg-neutral-950/90 p-5 backdrop-blur-xl flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                  <XCircle className="w-3.5 h-3.5" />
                  RESPUESTA: NO
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 mb-3">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] font-bold mb-1">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>ACCIÓN RECOMENDADA:</span>
                </div>
                <p className="font-sans text-xs md:text-sm font-bold text-amber-200">
                  {noBranch.action}
                </p>
              </div>

              {noBranch.subtext && (
                <p className="font-sans text-xs text-neutral-400 leading-relaxed italic">
                  “{noBranch.subtext}”
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10">
              <span className="font-mono text-[10px] text-neutral-500">
                Paso previo antes de automatizar con IA
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
