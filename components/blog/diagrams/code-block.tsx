"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language = "text", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const langLabel = language.replace("language-", "").toUpperCase() || "CODE"

  return (
    <div className={`not-prose my-8 rounded-2xl border border-white/15 bg-neutral-950/90 shadow-2xl overflow-hidden backdrop-blur-xl ${className || ""}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10 font-mono text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="w-px h-3.5 bg-white/15 mx-1" />
          <span className="flex items-center gap-1.5 font-bold tracking-wider text-neutral-300">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            {langLabel}
          </span>
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copiar código"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all text-xs font-mono"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-5 font-mono text-xs md:text-sm text-neutral-200 overflow-x-auto leading-relaxed">
        <pre className="!bg-transparent !p-0 !m-0 !border-0 font-mono text-neutral-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
