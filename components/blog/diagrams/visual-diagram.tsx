"use client"

import React, { useState } from "react"
import { Check, Copy } from "lucide-react"
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

  // Minimalist clean badge labels
  const getBadgeLabel = () => {
    if (!parsed) return "Esquema Técnico"
    switch (parsed.type) {
      case "architecture_4tier":
        return "Arquitectura del Sistema"
      case "comparison_side_by_side":
        return "Comparativa Técnica"
      case "workflow_pipeline":
        return "Flujo de Procesos"
      case "decision_tree":
        return "Árbol de Decisión"
      case "feature_grid":
        return "Ventajas y Capacidades"
      case "scenario_chat":
        return "Simulación de Flujo"
      case "sequence_pipeline":
        return "Secuencia de Servidores"
      default:
        return "Diagrama Estructurado"
    }
  }

  if (!parsed) {
    return (
      <div className="not-prose my-8 rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 font-mono text-xs text-neutral-300 overflow-x-auto">
        <pre className="!bg-transparent !p-0 !m-0 !border-0">
          <code>{rawText}</code>
        </pre>
      </div>
    )
  }

  return (
    <div className="not-prose my-8 rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 sm:p-6 md:p-7 relative">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 pb-5 border-b border-white/10 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white/40" />
          <span className="font-mono text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            {getBadgeLabel()}
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          title="Copiar esquema"
          aria-label="Copiar esquema"
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-white" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Main Diagram Area */}
      <div className="w-full">
        {parsed.type === "architecture_4tier" && <ArchitectureView data={parsed} />}
        {parsed.type === "workflow_pipeline" && <WorkflowPipelineView data={parsed} />}
        {parsed.type === "comparison_side_by_side" && <ComparisonView data={parsed} />}
        {parsed.type === "decision_tree" && <DecisionTreeView data={parsed} />}
        {parsed.type === "feature_grid" && <FeatureGridView data={parsed} />}
        {parsed.type === "scenario_chat" && <ScenarioChatView data={parsed} />}
        {parsed.type === "sequence_pipeline" && <SequencePipelineView data={parsed} />}
        {parsed.type === "generic_box" && <GenericBoxView data={parsed} />}
      </div>
    </div>
  )
}
