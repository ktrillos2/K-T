import type { Block, PostBody } from "./types";

/**
 * Markdown mínimo para escribir artículos rápido, con atajos para los widgets interactivos.
 *
 *   ## Título {#id}            → h2 con ancla (sin {#id} se genera del texto)
 *   ### Subtítulo              → h3
 *   - ítem / 1. ítem           → listas
 *   > cita                     → cita (una línea "> — Autor" agrega la fuente)
 *   Tabla: leyenda             → leyenda de la tabla que sigue
 *   | a | b |  + |---|---|     → tabla
 *   ::stat 58% | texto | fuente
 *   ::widget price-calculator  (speed-simulator, template-vs-custom)
 *   :::tip Título … :::        (info, tip, warn)
 *   :::checklist id="x" title="Título"  - ítems  :::
 *   :::quiz  ? pregunta  - opción  - *correcta  = explicación  :::
 */

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

const attr = (s: string, k: string) => s.match(new RegExp(`${k}="([^"]*)"`))?.[1] ?? "";
const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

export function parseMarkdown(md: string): Block[] {
  const lines = md.replace(/\r/g, "").split("\n");
  const out: Block[] = [];
  let i = 0;
  let caption: string | undefined;
  const ids = new Set<string>();

  const uniqueId = (base: string) => {
    let id = base || "seccion";
    let n = 2;
    while (ids.has(id)) id = `${base}-${n++}`;
    ids.add(id);
    return id;
  };

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) {
      i++;
      continue;
    }

    // Bloques ::: … :::
    if (line.startsWith(":::")) {
      const head = line.slice(3).trim();
      const body: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") body.push(lines[i++]);
      i++;
      const kind = head.split(/\s+/)[0];
      if (kind === "checklist") {
        out.push({ type: "widget", name: "checklist", id: attr(head, "id") || slugify(attr(head, "title")), title: attr(head, "title"), items: body.filter((l) => l.trim().startsWith("- ")).map((l) => l.trim().slice(2)) });
      } else if (kind === "quiz") {
        const questions: { q: string; options: string[]; answer: number; why: string }[] = [];
        for (const l of body.map((x) => x.trim()).filter(Boolean)) {
          if (l.startsWith("? ")) questions.push({ q: l.slice(2), options: [], answer: 0, why: "" });
          else if (l.startsWith("- ") && questions.length) {
            const q = questions[questions.length - 1];
            const opt = l.slice(2);
            if (opt.startsWith("*")) q.answer = q.options.length;
            q.options.push(opt.replace(/^\*/, ""));
          } else if (l.startsWith("= ") && questions.length) questions[questions.length - 1].why = l.slice(2);
        }
        out.push({ type: "widget", name: "quiz", questions });
      } else {
        const tone = (["info", "tip", "warn"].includes(kind) ? kind : "info") as "info" | "tip" | "warn";
        const title = head.slice(kind.length).trim() || undefined;
        out.push({ type: "callout", tone, title, text: body.map((l) => l.trim()).filter(Boolean).join(" ") });
      }
      continue;
    }

    if (line.startsWith("::widget ")) {
      const name = line.slice(9).trim() as "price-calculator" | "speed-simulator" | "template-vs-custom";
      out.push({ type: "widget", name });
      i++;
      continue;
    }
    if (line.startsWith("::stat ")) {
      const [value, label, source] = line.slice(7).split("|").map((s) => s.trim());
      out.push({ type: "stat", value, label, source: source || undefined });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      const m = line.slice(3).match(/^(.*?)\s*\{#([a-z0-9-]+)\}\s*$/);
      const text = m ? m[1] : line.slice(3);
      out.push({ type: "h2", id: uniqueId(m ? m[2] : slugify(text)), text });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      out.push({ type: "h3", text: line.slice(4) });
      i++;
      continue;
    }
    if (/^(Tabla|Table):\s/.test(line)) {
      caption = line.replace(/^(Tabla|Table):\s*/, "");
      i++;
      continue;
    }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const l = lines[i].trim();
        if (!/^\|[\s:|-]+\|$/.test(l)) rows.push(cells(l));
        i++;
      }
      const [head, ...rest] = rows;
      out.push({ type: "table", head, rows: rest, caption });
      caption = undefined;
      continue;
    }
    if (line.startsWith("> ")) {
      const parts: string[] = [];
      let cite: string | undefined;
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        const l = lines[i].trim().slice(2);
        if (l.startsWith("— ")) cite = l.slice(2);
        else parts.push(l);
        i++;
      }
      out.push({ type: "quote", text: parts.join(" "), cite });
      continue;
    }
    if (/^- /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^- /.test(lines[i].trim())) items.push(lines[i++].trim().slice(2));
      out.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^\d+\.\s/, ""));
      out.push({ type: "ol", items });
      continue;
    }
    // Párrafo: une líneas seguidas
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3} |- |\d+\.\s|> |\||:::|::|Tabla: |Table: )/.test(lines[i].trim())) para.push(lines[i++].trim());
    if (para.length) out.push({ type: "p", text: para.join(" ") });
    else i++;
  }
  return out;
}

export type MdPost = Omit<PostBody, "blocks"> & { md: string };

export const fromMarkdown = (p: MdPost): PostBody => ({ tldr: p.tldr, faq: p.faq, sources: p.sources, blocks: parseMarkdown(p.md) });
