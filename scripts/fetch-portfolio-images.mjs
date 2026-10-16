#!/usr/bin/env node
/**
 * Descarga las imágenes de los proyectos del portafolio anterior a public/projects/<slug>.webp.
 *
 *   npm run covers
 *
 * - Las de Sanity (cdn.sanity.io) se piden ya en WebP a 1600 px.
 * - Repuestos Germana solo existía en el dominio viejo: descárgala ANTES de publicar el sitio nuevo.
 * Después puedes poner NEXT_PUBLIC_LOCAL_COVERS=1 (en .env.local / Vercel) para servir todas
 * desde tu propio dominio y no depender de Sanity.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "projects");
const src = await readFile(join(root, "src", "lib", "covers.ts"), "utf8");
const SANITY = src.match(/const SANITY = "([^"]+)"/)?.[1] ?? "";

const list = [
  ...[...src.matchAll(/"?([a-z0-9-]+)"?: `\$\{SANITY\}([^`]+)`/g)].map(([, slug, file]) => ({ slug, url: `${SANITY}${file}?fm=webp&fit=max&q=82&w=1600` })),
  ...[...src.matchAll(/"([a-z0-9-]+)": "(https:\/\/www\.kytcode\.lat[^"]+)"/g)].map(([, slug, url]) => ({ slug, url })),
];

await mkdir(out, { recursive: true });
let ok = 0;
for (const { slug, url } of list) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(join(out, `${slug}.webp`), buf);
    ok++;
    console.log(`✓ ${slug}.webp (${Math.round(buf.length / 1024)} KB)`);
  } catch (e) {
    console.warn(`✗ ${slug}: ${e instanceof Error ? e.message : e}`);
  }
}
console.log(`\n${ok}/${list.length} imágenes en public/projects. Para usarlas: NEXT_PUBLIC_LOCAL_COVERS=1`);
