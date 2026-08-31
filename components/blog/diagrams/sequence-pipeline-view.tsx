import React from "react"
import { ArrowDown, Check, ChevronRight, Cpu, Layers, Server, Smartphone } from "lucide-react"
import { type SequencePipelineData } from "@/lib/blog-diagram-parser"

interface SequencePipelineViewProps {
  data: SequencePipelineData
}

export function SequencePipelineView({ data }: SequencePipelineViewProps) {
  const { nodes } = data

  const getNodeIcon = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes("cliente") || n.includes("whatsapp")) {
      return <Smartphone className="w-4 h-4 text-emerald-400" />
    }
    if (n.includes("server") || n.includes("next.js") || n.includes("api")) {
      return <Server className="w-4 h-4 text-cyan-400" />
    }
    return <Cpu className="w-4 h-4 text-purple-400" />
  }

  return (
    <div className="w-full py-4 px-2 sm:px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {nodes.map((node, idx) => {
          const isLast = idx === nodes.length - 1

          return (
            <div key={idx} className="relative">
              {/* Node Card */}
              <div className="rounded-2xl border border-white/15 hover:border-emerald-500/40 bg-neutral-950/80 p-5 backdrop-blur-xl transition-all duration-300 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    {getNodeIcon(node.name)}
                  </div>
                  <h4 className="font-title text-base md:text-lg font-bold text-white tracking-tight">
                    {node.name}
                  </h4>
                </div>

                {/* Sub Operations */}
                {node.subOperations && node.subOperations.length > 0 && (
                  <div className="space-y-2 mt-3 pt-3 border-t border-white/10">
                    {node.subOperations.map((op, opIdx) => (
                      <div
                        key={opIdx}
                        className="flex items-center gap-2 font-mono text-xs text-neutral-300 pl-2"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{op}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Output Return */}
                {node.outputReturn && (
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-2 text-emerald-300 font-mono text-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Retorno: {node.outputReturn}</span>
                  </div>
                )}
              </div>

              {/* Transition Connector */}
              {!isLast && (
                <div className="flex flex-col items-center justify-center py-2 relative z-10">
                  <div className="w-px h-3 bg-white/20" />
                  {node.connectorLabel ? (
                    <div className="my-1 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] shadow-md flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-cyan-400" />
                      <span>{node.connectorLabel}</span>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center text-neutral-400 my-0.5">
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
