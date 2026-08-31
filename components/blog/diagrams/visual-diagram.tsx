"use client"

import React, { useState } from "react"
import { Check, Code2, Copy, Eye, Sparkles, Terminal } from "lucide-react"
import { parseBlogDiagram, type ParsedDiagram } from "@/lib/blog-diagram-parser"
import { ArchitectureView } from "./architecture-view"
import { WorkflowPipelineView } from "./workflow-pipeline-view"
import { ComparisonView } from "./comparison-view"
import { DecisionTreeView } from "./decision-tree-view"
import { FeatureGridView } from "./feature-grid-view"
import { ScenarioChatView } from "./scenario-chat-view"
import { SequencePipelineView } from "./sequence-pipeline-view"
import { GenericBoxView } from "./generic-box-view"

interface VisualDiagramProps {
  rawText: string
  language?: string
  initialData?: ParsedDiagram
}

export function VisualDiagram({ rawText, language, initialData }: VisualDiagramProps) {
  const [viewMode, setViewMode] = useState<"visual" | "terminal">("visual")
  const [copied, setCopied] = useState(false)

  const parsed = initialData || parseBlogDiagram(rawText, language)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  // Get label based on diagram type
  const getBadgeLabel = () => {
    if (!parsed) return "ESQUEMA TÉCNICO"
    switch (parsed.type) {
      case "architecture_4tier":
        return "ARQUITECTURA DE SOFTWARE E IA • K&T CODE"
      case "comparison_side_by_side":
        return "ANÁLISIS COMPARATIVO TÉCNICO"
      case "workflow_pipeline":
        return "PIPELINE & FLUJO DE PROCESO"
      case "decision_tree":
        return "ÁRBOL DE DECISIÓN ARQUITECTÓNICA"
      case "feature_grid":
        return "BENEFICIOS & CAPACIDADES"
      case "scenario_chat":
        return "SIMULACIÓN DE CASO DE USO"
      case "sequence_pipeline":
        return "SECUENCIA DE SERVIDORES & APIS"
      default:
        return "DIAGRAMA TÉCNICO ESTRUCTURADO"
    }
  }

  return (
    <div className="not-prose my-10 rounded-3xl border border-white/20 bg-gradient-to-b from-neutral-950 via-zinc-950 to-black p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
      {/* Background blueprint grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-full max-w-3xl -translate-x-1/2 rounded-full bg-emerald-500/[0.04] blur-[100px]" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase">
            {getBadgeLabel()}
          </span>
        </div>

        {/* View Mode Toggle and Copy Button */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl bg-white/5 p-1 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setViewMode("visual")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                viewMode === "visual"
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diseño Visual</span>
            </button>
            <button
              onClick={() => setViewMode("terminal")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                viewMode === "terminal"
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Código ASCII</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            title="Copiar esquema"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10">
        {viewMode === "visual" && parsed ? (
          <div>
            {parsed.type === "architecture_4tier" && <ArchitectureView data={parsed} />}
            {parsed.type === "workflow_pipeline" && <WorkflowPipelineView data={parsed} />}
            {parsed.type === "comparison_side_by_side" && <ComparisonView data={parsed} />}
            {parsed.type === "decision_tree" && <DecisionTreeView data={parsed} />}
            {parsed.type === "feature_grid" && <FeatureGridView data={parsed} />}
            {parsed.type === "scenario_chat" && <ScenarioChatView data={parsed} />}
            {parsed.type === "sequence_pipeline" && <SequencePipelineView data={parsed} />}
            {parsed.type === "generic_box" && <GenericBoxView data={parsed} />}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6 font-mono text-xs md:text-sm text-emerald-400 overflow-x-auto shadow-inner leading-relaxed">
            <pre className="!bg-transparent !p-0 !m-0 !border-0 text-neutral-300">
              <code>{rawText}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Footer Branding Attribution */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-neutral-500 font-mono text-[11px]">
        <span>Arquitectura validada por K&T Code</span>
        <span className="text-emerald-400/80 font-bold">Producción 2026</span>
      </div>
    </div>
  )
}
