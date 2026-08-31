import React from "react"
import { ArrowDown, Cpu, Layers } from "lucide-react"
import { type GenericBoxData } from "@/lib/blog-diagram-parser"

interface GenericBoxViewProps {
  data: GenericBoxData
}

export function GenericBoxView({ data }: GenericBoxViewProps) {
  const { boxes } = data

  return (
    <div className="w-full py-4 px-2 sm:px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {boxes.map((box, idx) => {
          const isLast = idx === boxes.length - 1

          return (
            <div key={idx} className="relative">
              <div className="rounded-2xl border border-white/15 hover:border-emerald-500/40 bg-neutral-950/80 p-5 md:p-6 backdrop-blur-xl transition-all duration-300 shadow-xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="font-title text-base md:text-lg font-bold text-white tracking-tight">
                    {box.title}
                  </h4>
                </div>

                {box.lines && box.lines.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-white/10 font-sans text-xs md:text-sm text-neutral-300 leading-relaxed">
                    {box.lines.map((line, lIdx) => (
                      <p key={lIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        <span>{line}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {!isLast && (
                <div className="flex flex-col items-center justify-center py-2 relative z-10">
                  <div className="w-px h-3 bg-white/20" />
                  <div className="w-5 h-5 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center text-neutral-400 my-0.5">
                    <ArrowDown className="w-3 h-3 text-emerald-400" />
                  </div>
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
