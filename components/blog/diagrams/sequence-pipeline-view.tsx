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
      return <Smartphone className="w-4 h-4 text-neutral-300" />
    }
    if (n.includes("server") || n.includes("next.js") || n.includes("api")) {
      return <Server className="w-4 h-4 text-neutral-300" />
    }
    return <Cpu className="w-4 h-4 text-neutral-300" />
  }

  return (
    <div className="w-full py-2">
      <div className="max-w-2xl mx-auto space-y-3">
        {nodes.map((node, idx) => {
          const isLast = idx === nodes.length - 1

          return (
            <div key={idx} className="relative">
              {/* Node Card */}
              <div className="rounded-xl border border-white/10 bg-[#131313] p-4 sm:p-5 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                    {getNodeIcon(node.name)}
                  </div>
                  <h4 className="font-title text-sm sm:text-base font-bold text-white tracking-tight">
                    {node.name}
                  </h4>
                </div>

                {/* Sub Operations */}
                {node.subOperations && node.subOperations.length > 0 && (
                  <div className="space-y-1.5 mt-2.5 pt-2.5 border-t border-white/10">
                    {node.subOperations.map((op, opIdx) => (
                      <div
                        key={opIdx}
                        className="flex items-center gap-2 font-mono text-xs text-neutral-300 pl-1"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <span>{op}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Output Return */}
                {node.outputReturn && (
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-2 text-neutral-300 font-mono text-xs">
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Retorno: {node.outputReturn}</span>
                  </div>
                )}
              </div>

              {/* Transition Connector */}
              {!isLast && (
                <div className="flex flex-col items-center justify-center py-1 relative z-10">
                  <div className="w-px h-2.5 bg-white/20" />
                  {node.connectorLabel ? (
                    <div className="my-0.5 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-400 font-mono text-[10px] flex items-center gap-1.5">
                      <Layers className="w-3 h-3" />
                      <span>{node.connectorLabel}</span>
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
