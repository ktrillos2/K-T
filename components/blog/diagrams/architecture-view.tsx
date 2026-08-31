import React from "react"
import {
  Bot,
  BrainCircuit,
  Database,
  Globe,
  Layers,
  Lock,
  MessageSquare,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react"
import { type Architecture4TierData } from "@/lib/blog-diagram-parser"

interface ArchitectureViewProps {
  data: Architecture4TierData
}

export function ArchitectureView({ data }: ArchitectureViewProps) {
  const { tier1, tier2, tier3Left, tier3Right, tier4 } = data

  return (
    <div className="w-full py-4 px-2 sm:px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* TIER 1: User Interface / Perception Layer */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 via-cyan-500/20 to-emerald-500/30 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-500" />
          <div className="relative rounded-2xl border border-emerald-500/30 bg-neutral-950/90 p-5 md:p-6 backdrop-blur-xl shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-bold block">
                    {tier1.badge || "CAPA 1 • PERCEPCIÓN & ENTRADA"}
                  </span>
                  <h4 className="font-title text-base md:text-lg font-bold text-white tracking-tight">
                    {tier1.title}
                  </h4>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono text-[10px] text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Omnicanal 24/7
              </span>
            </div>

            {tier1.subtitle && (
              <p className="font-sans text-xs text-neutral-400 mb-4">{tier1.subtitle}</p>
            )}

            {/* Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {tier1.chips.map((chip, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-200 font-mono text-xs transition-colors"
                >
                  {chip.toLowerCase().includes("whatsapp") ? (
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  ) : chip.toLowerCase().includes("web") ? (
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <Server className="w-3.5 h-3.5 text-purple-400" />
                  )}
                  <span>{chip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONNECTOR 1 -> 2 */}
        <div className="flex flex-col items-center justify-center -my-3 relative z-10">
          <div className="w-px h-5 bg-gradient-to-b from-emerald-500/60 to-purple-500/60" />
          <div className="w-6 h-6 rounded-full bg-neutral-900 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-md">
            <Zap className="w-3 h-3 animate-pulse" />
          </div>
          <div className="w-px h-5 bg-gradient-to-b from-purple-500/60 to-purple-500" />
        </div>

        {/* TIER 2: Reasoning Engine (LLM) */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-purple-500/30 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-500" />
          <div className="relative rounded-2xl border border-purple-500/30 bg-neutral-950/90 p-5 md:p-6 backdrop-blur-xl shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-purple-400 font-bold block">
                    {tier2.badge || "CAPA 2 • ORQUESTACIÓN & RAZONAMIENTO"}
                  </span>
                  <h4 className="font-title text-base md:text-lg font-bold text-white tracking-tight">
                    {tier2.title}
                  </h4>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 font-mono text-[10px] text-purple-300">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Modelos de Frontera
              </span>
            </div>

            {tier2.subtitle && (
              <p className="font-sans text-xs text-neutral-400 mb-4">{tier2.subtitle}</p>
            )}

            {/* Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {tier2.chips.map((chip, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/20 text-purple-200 font-mono text-xs transition-colors"
                >
                  <Bot className="w-3.5 h-3.5 text-purple-400" />
                  <span>{chip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONNECTOR 2 -> 3 (DUAL BRANCH) */}
        <div className="flex flex-col items-center justify-center -my-3 relative z-10">
          <div className="w-px h-5 bg-purple-500/60" />
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-white/10 font-mono text-[10px] text-neutral-400 shadow-md">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>Ejecución Paralela & RAG</span>
          </div>
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mt-2" />
        </div>

        {/* TIER 3: Dual Columns (Knowledge & Tools) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TIER 3 LEFT: Knowledge Layer */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-2xl blur-sm opacity-50 group-hover:opacity-90 transition duration-500" />
            <div className="relative h-full rounded-2xl border border-cyan-500/30 bg-neutral-950/90 p-5 backdrop-blur-xl shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 font-bold block">
                      {tier3Left.badge || "CAPA 3A • CONOCIMIENTO"}
                    </span>
                    <h5 className="font-title text-sm md:text-base font-bold text-white tracking-tight">
                      {tier3Left.title}
                    </h5>
                  </div>
                </div>

                {tier3Left.subtitle && (
                  <p className="font-sans text-[11px] text-neutral-400 mb-3">{tier3Left.subtitle}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                {tier3Left.chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-cyan-500/5 border border-cyan-500/20 text-cyan-200 font-mono text-[11px]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* TIER 3 RIGHT: Tools & Actions Layer */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-2xl blur-sm opacity-50 group-hover:opacity-90 transition duration-500" />
            <div className="relative h-full rounded-2xl border border-amber-500/30 bg-neutral-950/90 p-5 backdrop-blur-xl shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                      {tier3Right.badge || "CAPA 3B • TOOL CALLING"}
                    </span>
                    <h5 className="font-title text-sm md:text-base font-bold text-white tracking-tight">
                      {tier3Right.title}
                    </h5>
                  </div>
                </div>

                {tier3Right.subtitle && (
                  <p className="font-sans text-[11px] text-neutral-400 mb-3">{tier3Right.subtitle}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                {tier3Right.chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-500/5 border border-amber-500/20 text-amber-200 font-mono text-[11px]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CONNECTOR 3 -> 4 (CONVERGENCE) */}
        <div className="flex flex-col items-center justify-center -my-3 relative z-10">
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent mb-2" />
          <div className="w-6 h-6 rounded-full bg-neutral-900 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
            <Lock className="w-3 h-3" />
          </div>
          <div className="w-px h-5 bg-gradient-to-b from-emerald-500/60 to-emerald-500" />
        </div>

        {/* TIER 4: Audit & Security Layer */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition duration-500" />
          <div className="relative rounded-2xl border border-emerald-500/30 bg-neutral-950/90 p-5 md:p-6 backdrop-blur-xl shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-bold block">
                    {tier4.badge || "CAPA 4 • GOBERNANZA & AUDITORÍA"}
                  </span>
                  <h4 className="font-title text-base md:text-lg font-bold text-white tracking-tight">
                    {tier4.title}
                  </h4>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono text-[10px] text-emerald-300">
                <ShieldCheck className="w-3 h-3" />
                Cumplimiento Ley 1581
              </span>
            </div>

            {tier4.subtitle && (
              <p className="font-sans text-xs text-neutral-400 mb-4">{tier4.subtitle}</p>
            )}

            {/* Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {tier4.chips.map((chip, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 font-mono text-xs transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{chip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
