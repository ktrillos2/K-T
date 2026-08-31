import React from "react"
import { AlertCircle, Bot, CheckCircle2, MessageSquare, User, XCircle } from "lucide-react"
import { type ScenarioChatData } from "@/lib/blog-diagram-parser"

interface ScenarioChatViewProps {
  data: ScenarioChatData
}

export function ScenarioChatView({ data }: ScenarioChatViewProps) {
  const { scenario, botA, botB } = data

  return (
    <div className="w-full py-2">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* ESCENARIO PROMPT CARD */}
        <div className="rounded-xl border border-white/10 bg-[#131313] p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2 text-neutral-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>Escenario Real: Mensaje del Cliente</span>
          </div>
          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/10 text-white font-sans text-xs sm:text-sm leading-relaxed italic">
            “{scenario}”
          </div>
        </div>

        {/* COMPARISON CHAT CONTAINERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* BOT A: Chatbot Rígido */}
          <div className="rounded-xl border border-white/10 bg-[#141212] p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-400">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-title text-sm md:text-base font-bold text-white tracking-tight">
                      {botA.title}
                    </h5>
                    <span className="font-mono text-[10px] text-neutral-400 font-semibold block">
                      Flujo Estático
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Bubble Simulation */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-300 font-mono text-xs leading-relaxed whitespace-pre-line mb-3">
                {botA.content}
              </div>
            </div>

            {botA.annotation && (
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-start gap-2 text-neutral-400 font-sans text-xs">
                <AlertCircle className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>{botA.annotation}</span>
              </div>
            )}
          </div>

          {/* BOT B: Agente de IA */}
          <div className="rounded-xl border border-white/10 bg-[#121413] p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-200">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-title text-sm md:text-base font-bold text-white tracking-tight">
                      {botB.title}
                    </h5>
                    <span className="font-mono text-[10px] text-neutral-300 font-semibold block">
                      Razonamiento Autónomo
                    </span>
                  </div>
                </div>
              </div>

              {/* Internal Steps Executed */}
              {botB.points && botB.points.length > 0 && (
                <div className="space-y-1 mb-2.5">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block font-semibold">
                    Acciones Internas:
                  </span>
                  {botB.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-300">
                      <CheckCircle2 className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Chat Bubble Simulation */}
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-neutral-100 font-sans text-xs md:text-sm leading-relaxed mb-3">
                {botB.responseMessage}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between text-neutral-300 font-mono text-xs">
              <span className="flex items-center gap-1.5 text-neutral-400">
                <MessageSquare className="w-3.5 h-3.5" />
                Respuesta Contextual
              </span>
              <span className="text-white font-semibold">Resolutivo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
