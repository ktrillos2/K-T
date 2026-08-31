import React from "react"
import {
  ArrowDown,
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
  Wrench,
} from "lucide-react"
import { type Architecture4TierData } from "@/lib/blog-diagram-parser"

interface ArchitectureViewProps {
  data: Architecture4TierData
}

export function ArchitectureView({ data }: ArchitectureViewProps) {
  const { tier1, tier2, tier3Left, tier3Right, tier4 } = data

  return (
    <div className="w-full py-2">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* TIER 1: Perception / Entry Layer */}
        <div className="rounded-xl border border-white/10 bg-[#131313] p-5 hover:border-white/20 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                  {tier1.badge || "Capa 1 • Interfaz & Entrada"}
                </span>
                <h4 className="font-title text-base md:text-lg font-bold text-white tracking-tight">
                  {tier1.title}
                </h4>
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-neutral-300">
              Omnicanal 24/7
            </span>
          </div>

          {tier1.subtitle && (
            <p className="font-sans text-xs text-neutral-400 mb-3">{tier1.subtitle}</p>
          )}

          {/* Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {tier1.chips.map((chip, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-neutral-300 font-mono text-xs"
              >
                {chip.toLowerCase().includes("whatsapp") ? (
                  <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
                ) : chip.toLowerCase().includes("web") ? (
                  <Globe className="w-3.5 h-3.5 text-neutral-400" />
                ) : (
                  <Server className="w-3.5 h-3.5 text-neutral-400" />
                )}
                <span>{chip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CONNECTOR 1 -> 2 */}
        <div className="flex flex-col items-center justify-center py-0.5">
          <div className="w-px h-3 bg-white/20" />
          <div className="w-5 h-5 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center text-neutral-400 my-0.5">
            <ArrowDown className="w-3 h-3" />
          </div>
          <div className="w-px h-3 bg-white/20" />
        </div>

        {/* TIER 2: Reasoning Engine (LLM) */}
        <div className="rounded-xl border border-white/10 bg-[#131313] p-5 hover:border-white/20 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                  {tier2.badge || "Capa 2 • Orquestación & LLM"}
                </span>
                <h4 className="font-title text-base md:text-lg font-bold text-white tracking-tight">
                  {tier2.title}
                </h4>
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-neutral-300">
              Modelos de Frontera
            </span>
          </div>

          {tier2.subtitle && (
            <p className="font-sans text-xs text-neutral-400 mb-3">{tier2.subtitle}</p>
          )}

          {/* Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {tier2.chips.map((chip, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-neutral-300 font-mono text-xs"
              >
                <Bot className="w-3.5 h-3.5 text-neutral-400" />
                <span>{chip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CONNECTOR 2 -> 3 */}
        <div className="flex flex-col items-center justify-center py-0.5">
          <div className="w-px h-3 bg-white/20" />
          <div className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-neutral-400 flex items-center gap-1.5 my-0.5">
            <Layers className="w-3 h-3" />
            <span>Ejecución Paralela & RAG</span>
          </div>
          <div className="w-px h-3 bg-white/20" />
        </div>

        {/* TIER 3: Dual Columns (Knowledge & Tools) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* TIER 3 LEFT: Knowledge Layer */}
          <div className="rounded-xl border border-white/10 bg-[#131313] p-4 hover:border-white/20 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                  <Database className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                    {tier3Left.badge || "Capa 3A • Conocimiento"}
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
                  className="inline-flex items-center px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-neutral-300 font-mono text-[11px]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* TIER 3 RIGHT: Tools & Actions Layer */}
          <div className="rounded-xl border border-white/10 bg-[#131313] p-4 hover:border-white/20 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                    {tier3Right.badge || "Capa 3B • Acciones & APIs"}
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
                  className="inline-flex items-center px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-neutral-300 font-mono text-[11px]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CONNECTOR 3 -> 4 */}
        <div className="flex flex-col items-center justify-center py-0.5">
          <div className="w-px h-3 bg-white/20" />
          <div className="w-5 h-5 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center text-neutral-400 my-0.5">
            <Lock className="w-3 h-3" />
          </div>
          <div className="w-px h-3 bg-white/20" />
        </div>

        {/* TIER 4: Audit & Security Layer */}
        <div className="rounded-xl border border-white/10 bg-[#131313] p-5 hover:border-white/20 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                  {tier4.badge || "Capa 4 • Gobernanza & Seguridad"}
                </span>
                <h4 className="font-title text-base md:text-lg font-bold text-white tracking-tight">
                  {tier4.title}
                </h4>
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-neutral-300">
              Cumplimiento Normativo
            </span>
          </div>

          {tier4.subtitle && (
            <p className="font-sans text-xs text-neutral-400 mb-3">{tier4.subtitle}</p>
          )}

          {/* Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {tier4.chips.map((chip, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-neutral-300 font-mono text-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>{chip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
