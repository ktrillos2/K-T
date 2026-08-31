import React from "react"
import { ArrowDown, Layers } from "lucide-react"
import { type GenericBoxData } from "@/lib/blog-diagram-parser"

interface GenericBoxViewProps {
  data: GenericBoxData
}

export function GenericBoxView({ data }: GenericBoxViewProps) {
  const { boxes } = data

  return (
    <div className="w-full py-2">
      <div className="max-w-2xl mx-auto space-y-3">
        {boxes.map((box, idx) => {
          const isLast = idx === boxes.length - 1

          return (
            <div key={idx} className="relative">
              <div className="rounded-xl border border-white/10 bg-[#131313] p-4 sm:p-5 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="font-title text-sm sm:text-base font-bold text-white tracking-tight">
                    {box.title}
                  </h4>
                </div>

                {box.lines && box.lines.length > 0 && (
                  <div className="space-y-1.5 pt-2.5 border-t border-white/10 font-sans text-xs md:text-sm text-neutral-300 leading-relaxed">
                    {box.lines.map((line, lIdx) => (
                      <p key={lIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                        <span>{line}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {!isLast && (
                <div className="flex flex-col items-center justify-center py-1 relative z-10">
                  <div className="w-px h-2.5 bg-white/20" />
                  <div className="w-5 h-5 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center text-neutral-400 my-0.5">
                    <ArrowDown className="w-3 h-3" />
                  </div>
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
