import React from "react"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { AlertCircle, AlertTriangle, Info, Lightbulb } from "lucide-react"
import { isAsciiDiagram } from "@/lib/blog-diagram-parser"
import { VisualDiagram } from "@/components/blog/diagrams/visual-diagram"
import { CodeBlock } from "@/components/blog/diagrams/code-block"
import { ArchitectureView } from "@/components/blog/diagrams/architecture-view"
import { WorkflowPipelineView } from "@/components/blog/diagrams/workflow-pipeline-view"
import { ComparisonView } from "@/components/blog/diagrams/comparison-view"
import { DecisionTreeView } from "@/components/blog/diagrams/decision-tree-view"
import { FeatureGridView } from "@/components/blog/diagrams/feature-grid-view"
import { ScenarioChatView } from "@/components/blog/diagrams/scenario-chat-view"
import { SequencePipelineView } from "@/components/blog/diagrams/sequence-pipeline-view"

interface MdxContentProps {
  content: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function getTextContent(children: React.ReactNode): string {
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) {
    return children.map(getTextContent).join("")
  }
  if (React.isValidElement(children) && (children.props as any)?.children) {
    return getTextContent((children.props as any).children)
  }
  return ""
}

function extractAndCleanAlert(children: React.ReactNode): {
  type: "important" | "warning" | "note" | "tip" | "caution" | "general"
  cleanChildren: React.ReactNode
} {
  const fullText = getTextContent(children).trim()
  const match = fullText.match(/^\[!(IMPORTANT|NOTE|WARNING|TIP|CAUTION)\]\s*/i)

  if (!match) {
    return { type: "general", cleanChildren: children }
  }

  const alertType = match[1].toLowerCase() as "important" | "warning" | "note" | "tip" | "caution"
  const tagRegex = /^\s*\[!(IMPORTANT|NOTE|WARNING|TIP|CAUTION)\]\s*/i

  let removed = false
  function cleanNode(node: React.ReactNode): React.ReactNode {
    if (removed) return node
    if (typeof node === "string") {
      if (tagRegex.test(node)) {
        removed = true
        return node.replace(tagRegex, "")
      }
      return node
    }
    if (Array.isArray(node)) {
      return node.map((child) => cleanNode(child))
    }
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<{ children?: React.ReactNode }>
      if (element.props && element.props.children) {
        return React.cloneElement(element, {
          children: cleanNode(element.props.children),
        })
      }
    }
    return node
  }

  const cleanChildren = cleanNode(children)
  return { type: alertType, cleanChildren }
}

function extractCodeBlockProps(children: React.ReactNode): { text: string; language: string } {
  if (React.isValidElement(children)) {
    const props = children.props as any
    const text = getTextContent(props?.children ?? "")
    const className = props?.className || ""
    const match = className.match(/language-([a-zA-Z0-9_-]+)/)
    const language = match ? match[1] : ""
    return { text, language }
  }
  const text = getTextContent(children)
  return { text, language: "" }
}

const customComponents = {
  // 1. Skip H1 in body to ensure single H1 per page for strict SEO
  h1: () => null,

  // 2. Headings with anchor IDs, generous margins and modern typographic hierarchy
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = getTextContent(children)
    const id = slugify(text)
    return (
      <h2
        id={id}
        className="font-title font-bold text-2xl md:text-3xl text-white mt-14 mb-6 tracking-tight scroll-mt-24 border-b border-white/10 pb-4"
        {...props}
      >
        {children}
      </h2>
    )
  },

  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = getTextContent(children)
    const id = slugify(text)
    return (
      <h3
        id={id}
        className="font-title font-bold text-xl md:text-2xl text-zinc-100 mt-10 mb-4 tracking-tight scroll-mt-24 flex items-center gap-2"
        {...props}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 inline-block" />
        <span>{children}</span>
      </h3>
    )
  },

  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="font-title font-semibold text-lg text-zinc-200 mt-8 mb-3"
      {...props}
    >
      {children}
    </h4>
  ),

  // 3. Paragraphs: Legible, proportional, comfortable line height and margins
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="font-sans text-base md:text-[17px] leading-[1.85] text-neutral-300 mb-6 tracking-normal"
      {...props}
    >
      {children}
    </p>
  ),

  // 4. Links: Next.js Link for internal, standard anchor with noopener for external
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (!href) return <span>{children}</span>
    const isInternal = href.startsWith("/") || href.startsWith("#")
    if (isInternal) {
      return (
        <Link
          href={href}
          className="text-white font-medium underline underline-offset-4 decoration-emerald-400/60 hover:text-emerald-300 hover:decoration-emerald-400 transition-colors"
          {...props}
        >
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white font-medium underline underline-offset-4 decoration-white/40 hover:text-emerald-300 transition-colors"
        {...props}
      >
        {children}
      </a>
    )
  },

  // 5. Code blocks and inline code
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !className
    if (isInline) {
      return (
        <code
          className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[0.88em] text-emerald-300 border border-white/10"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },

  // PRE element: Detects whether it's an ASCII diagram/schema or programming code
  pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) => {
    const { text, language } = extractCodeBlockProps(children)

    if (isAsciiDiagram(text, language)) {
      return <VisualDiagram rawText={text} language={language} />
    }

    return <CodeBlock code={text} language={language} />
  },

  // 6. Tables (GFM)
  table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="not-prose my-10 overflow-x-auto rounded-2xl border border-white/15 bg-white/[0.02] shadow-2xl">
      <table className="w-full text-left font-sans text-xs md:text-sm text-neutral-300" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className="bg-white/10 border-b border-white/15 text-white font-bold uppercase tracking-wider text-xs"
      {...props}
    >
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-white/10" {...props}>
      {children}
    </tbody>
  ),

  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-white/[0.04] transition-colors" {...props}>
      {children}
    </tr>
  ),

  th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-6 py-4" {...props}>
      {children}
    </th>
  ),

  td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-6 py-4 align-top leading-relaxed" {...props}>
      {children}
    </td>
  ),

  // 7. Blockquotes and Callouts: Cleanly parses and formats [!IMPORTANT], [!NOTE], etc. without raw tags
  blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => {
    const { type, cleanChildren } = extractAndCleanAlert(children)

    if (type === "general") {
      return (
        <blockquote
          className="not-prose my-8 p-5 md:p-6 rounded-xl border-l-2 border-emerald-400/80 bg-white/[0.02] border-t border-r border-b border-white/5 font-sans text-sm md:text-base leading-relaxed text-neutral-200"
          {...props}
        >
          {cleanChildren}
        </blockquote>
      )
    }

    const alertConfig = {
      important: {
        title: "Punto Clave",
        icon: <AlertCircle className="w-4 h-4 text-white" />,
        border: "border-l-2 border-l-white/70 border-white/10",
        bg: "bg-[#141414]",
      },
      warning: {
        title: "Advertencia",
        icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
        border: "border-l-2 border-l-amber-400 border-white/10",
        bg: "bg-[#141311]",
      },
      caution: {
        title: "Precaución",
        icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
        border: "border-l-2 border-l-rose-400 border-white/10",
        bg: "bg-[#141112]",
      },
      tip: {
        title: "Consejo",
        icon: <Lightbulb className="w-4 h-4 text-emerald-400" />,
        border: "border-l-2 border-l-emerald-400 border-white/10",
        bg: "bg-[#111412]",
      },
      note: {
        title: "Nota",
        icon: <Info className="w-4 h-4 text-neutral-300" />,
        border: "border-l-2 border-l-white/40 border-white/10",
        bg: "bg-[#131313]",
      },
    }[type]

    return (
      <div className={`not-prose my-8 p-5 rounded-xl border ${alertConfig.border} ${alertConfig.bg}`}>
        <div className="flex items-center gap-2 mb-2">
          {alertConfig.icon}
          <span className="font-mono text-xs uppercase tracking-wider text-white font-bold">
            {alertConfig.title}
          </span>
        </div>
        <div className="font-sans text-sm md:text-base leading-relaxed text-neutral-300 [&>p]:mb-0">
          {cleanChildren}
        </div>
      </div>
    )
  },

  // 8. Lists
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-6 space-y-3.5 pl-6 font-sans text-base md:text-[17px] text-neutral-300 list-disc"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-6 space-y-3.5 pl-6 font-sans text-base md:text-[17px] text-neutral-300 list-decimal"
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-[1.8] pl-2 text-neutral-300" {...props}>
      {children}
    </li>
  ),

  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-white font-bold" {...props}>
      {children}
    </strong>
  ),

  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-zinc-200" {...props}>
      {children}
    </em>
  ),

  // Custom Direct MDX Component tags
  VisualDiagram,
  ArchitectureView,
  WorkflowPipelineView,
  ComparisonView,
  DecisionTreeView,
  FeatureGridView,
  ScenarioChatView,
  SequencePipelineView,
  CodeBlock,
}

export function MdxContent({ content }: MdxContentProps) {
  return (
    <MDXRemote
      source={content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
      components={customComponents}
    />
  )
}
