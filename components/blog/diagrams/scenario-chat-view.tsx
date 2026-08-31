import React from "react"
import { AlertCircle, Bot, CheckCircle2, MessageSquare, Sparkles, User, XCircle } from "lucide-react"
import { type ScenarioChatData } from "@/lib/blog-diagram-parser"

interface ScenarioChatViewProps {
  data: ScenarioChatData
}

export function ScenarioChatView({ data }: ScenarioChatViewProps) {
  const { scenario, botA, botB } = data

  return (
    <div className="w-full py-4 px-2 sm:px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* ESCENARIO PROMPT CARD */}
        <div className="rounded-2xl border border-white/20 bg-neutral-900/60 p-5 md:p-6 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-2.5 mb-2.5 text-neutral-400 font-mono text-xs font-bold uppercase tracking-wider">
            <User className="w-4 h-4 text-cyan-400" />
            <span>ESCENARIO REAL: MENSAJE DEL CLIENTE EN WHATSAPP</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-950/90 border border-white/10 text-white font-sans text-sm md:text-base leading-relaxed italic">
            “{scenario}”
          </div>
        </div>

        {/* COMPARISON CHAT CONTAINERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BOT A: Chatbot Rígido */}
          <div className="rounded-3xl border border-red-500/30 bg-gradient-to-b from-red-950/20 via-neutral-950/90 to-black p-5 md:p-6 backdrop-blur-xl flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-red-500/20">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-title text-sm md:text-base font-bold text-white tracking-tight">
                      {botA.title}
                    </h5>
                    <span className="font-mono text-[10px] text-red-400 font-bold block">
                      Flujo Estático Basado en Reglas
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Bubble Simulation */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-red-500/20 text-neutral-300 font-mono text-xs leading-relaxed whitespace-pre-line mb-4">
                {botA.content}
              </div>
            </div>

            {botA.annotation && (
              <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 flex items-start gap-2 text-red-300 font-sans text-xs">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{botA.annotation}</span>
              </div>
            )}
          </div>

          {/* BOT B: Agente de IA K&T */}
          <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 via-neutral-950/90 to-black p-5 md:p-6 backdrop-blur-xl flex flex-col justify-between shadow-2xl shadow-emerald-500/5">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-title text-sm md:text-base font-bold text-white tracking-tight">
                      {botB.title}
                    </h5>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold block">
                      Razonamiento Autónomo & Tool Calling
                    </span>
                  </div>
                </div>
              </div>

              {/* Internal Steps Executed */}
              {botB.points && botB.points.length > 0 && (
                <div className="space-y-1.5 mb-3">
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-bold">
                    Acciones de Ingeniería Ejecutadas:
                  </span>
                  {botB.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-[11px] font-mono text-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Chat Bubble Simulation */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-100 font-sans text-xs md:text-sm leading-relaxed mb-4">
                {botB.responseMessage}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-emerald-300 font-mono text-xs">
              <span className="flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                Cierre comercial en &lt; 2 seg
              </span>
              <span className="text-emerald-400 font-bold">✓ Éxito</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
