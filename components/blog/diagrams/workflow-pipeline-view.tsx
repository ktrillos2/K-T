import React from "react"
import { ArrowDown, CheckCircle2, Cpu, FileCheck, Layers } from "lucide-react"
import { type WorkflowPipelineData } from "@/lib/blog-diagram-parser"

interface WorkflowPipelineViewProps {
  data: WorkflowPipelineData
}

export function WorkflowPipelineView({ data }: WorkflowPipelineViewProps) {
  const { steps, title } = data

  return (
    <div className="w-full py-4 px-2 sm:px-4">
      {title && (
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold block mb-1">
            FLUJO DE PROCESO
          </span>
          <h3 className="font-title text-xl md:text-2xl font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-4">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1

          return (
            <div key={idx} className="relative">
              {/* Step Card */}
              <div className="relative group rounded-2xl border border-white/15 hover:border-emerald-500/40 bg-neutral-950/80 p-5 md:p-6 backdrop-blur-xl transition-all duration-300 shadow-xl">
                <div className="flex items-start gap-4">
                  {/* Step Number Badge */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-emerald-300 text-sm shadow-md">
                      {step.stepNumber}
                    </div>
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-title text-base md:text-lg font-bold text-white tracking-tight mb-2 flex items-center gap-2">
                      <span>{step.title}</span>
                    </h4>

                    {step.subtitle && (
                      <p className="font-sans text-xs text-neutral-400 mb-3">{step.subtitle}</p>
                    )}

                    {/* Sub Items List */}
                    {step.subItems && step.subItems.length > 0 && (
                      <div className="space-y-2 mt-3 pt-3 border-t border-white/10">
                        {step.subItems.map((item, itemIdx) => {
                          const cleanItem = item.replace(/^[├└───►\s]+/, "").trim()
                          if (!cleanItem) return null

                          return (
                            <div
                              key={itemIdx}
                              className="flex items-start gap-2.5 font-sans text-xs md:text-sm text-neutral-300"
                            >
                              <div className="mt-1 shrink-0">
                                {cleanItem.toLowerCase().includes("xml") || cleanItem.toLowerCase().includes("pdf") ? (
                                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                                ) : cleanItem.toLowerCase().includes("api") || cleanItem.toLowerCase().includes("webhook") ? (
                                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                                ) : (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                )}
                              </div>
                              <span className="leading-relaxed">{cleanItem}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Connector Arrow to next step */}
              {!isLast && (
                <div className="flex flex-col items-center justify-center py-2 relative z-10">
                  <div className="w-px h-3 bg-white/20" />
                  {step.connectorLabel ? (
                    <div className="my-1 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] shadow-md flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-emerald-400" />
                      <span>{step.connectorLabel}</span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center text-neutral-400 my-0.5">
                      <ArrowDown className="w-3 h-3 text-emerald-400" />
                    </div>
                  )}
                  <div className="w-px h-3 bg-white/20" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
