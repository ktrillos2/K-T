import React from "react"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

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
  if (Array.isArray(children)) {
    return children.map(getTextContent).join("")
  }
  if (React.isValidElement(children) && (children.props as any)?.children) {
    return getTextContent((children.props as any).children)
  }
  return ""
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

  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="not-prose my-8 rounded-2xl border border-white/10 bg-neutral-950 p-6 font-mono text-xs md:text-sm text-neutral-200 overflow-x-auto shadow-2xl">
      <pre className="leading-relaxed" {...props}>
        {children}
      </pre>
    </div>
  ),

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

  // 7. Blockquotes and Callouts
  blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="not-prose my-10 p-6 md:p-8 rounded-2xl border-l-4 border-emerald-400 bg-emerald-950/20 border-t border-r border-b border-white/10 font-sans text-base md:text-lg leading-relaxed text-zinc-200 shadow-xl"
      {...props}
    >
      {children}
    </blockquote>
  ),

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
