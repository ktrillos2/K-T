import React from "react"
import { ArrowDown, CheckCircle2, Cpu, FileCheck, Layers } from "lucide-react"
import { type WorkflowPipelineData } from "@/lib/blog-diagram-parser"

interface WorkflowPipelineViewProps {
  data: WorkflowPipelineData
}

export function WorkflowPipelineView({ data }: WorkflowPipelineViewProps) {
  const { steps, title } = data

  return (
    <div className="w-full py-2">
      {title && (
        <div className="text-center mb-6">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mb-1">
            Flujo de Proceso
          </span>
          <h3 className="font-title text-xl md:text-2xl font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-3">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1

          return (
            <div key={idx} className="relative">
              {/* Step Card */}
              <div className="rounded-xl border border-white/10 bg-[#131313] p-4 sm:p-5 hover:border-white/20 transition-colors">
                <div className="flex items-start gap-3.5">
                  {/* Step Number Badge */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-neutral-200 text-xs">
                      {step.stepNumber}
                    </div>
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-title text-sm sm:text-base font-bold text-white tracking-tight mb-1 flex items-center gap-2">
                      <span>{step.title}</span>
                    </h4>

                    {step.subtitle && (
                      <p className="font-sans text-xs text-neutral-400 mb-2.5">{step.subtitle}</p>
                    )}

                    {/* Sub Items List */}
                    {step.subItems && step.subItems.length > 0 && (
                      <div className="space-y-1.5 mt-2 pt-2 border-t border-white/5">
                        {step.subItems.map((item, itemIdx) => {
                          const cleanItem = item.replace(/^[├└───►\s]+/, "").trim()
                          if (!cleanItem) return null

                          return (
                            <div
                              key={itemIdx}
                              className="flex items-start gap-2 font-sans text-xs text-neutral-300"
                            >
                              <div className="mt-0.5 shrink-0 text-neutral-400">
                                {cleanItem.toLowerCase().includes("xml") || cleanItem.toLowerCase().includes("pdf") ? (
                                  <FileCheck className="w-3.5 h-3.5" />
                                ) : cleanItem.toLowerCase().includes("api") || cleanItem.toLowerCase().includes("webhook") ? (
                                  <Cpu className="w-3.5 h-3.5" />
                                ) : (
                                  <CheckCircle2 className="w-3.5 h-3.5" />
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
                <div className="flex flex-col items-center justify-center py-1 relative z-10">
                  <div className="w-px h-2.5 bg-white/20" />
                  {step.connectorLabel ? (
                    <div className="my-0.5 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-400 font-mono text-[10px] flex items-center gap-1.5">
                      <Layers className="w-3 h-3" />
                      <span>{step.connectorLabel}</span>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center text-neutral-400 my-0.5">
                      <ArrowDown className="w-3 h-3" />
                    </div>
                  )}
                  <div className="w-px h-2.5 bg-white/20" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
