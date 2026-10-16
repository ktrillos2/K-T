#!/usr/bin/env node
/**
 * Captura los sitios reales de los proyectos para las vistas previas y el túnel 3D.
 *
 *   npm run screenshots              → todos los proyectos con sitio
 *   npm run screenshots -- telas-real gmx-gaming   → solo esos
 *
 * Genera en public/shots:
 *   <slug>.jpg    escritorio 1440 px de ancho, página completa (máx. 4.200 px de alto)
 *   <slug>-m.jpg  móvil 390 px de ancho a 2x, página completa (máx. 3.200 px de alto)
 *
 * Requiere Playwright: npm i -D playwright && npx playwright install chromium
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "shots");
const only = process.argv.slice(2);

const src = await readFile(join(root, "src", "lib", "projects.ts"), "utf8");
const projects = [...src.matchAll(/slug: "([^"]+)", site: "([^"]+)"/g)]
  .map(([, slug, site]) => ({ slug, site }))
  .filter((p) => !only.length || only.includes(p.slug));

if (!projects.length) {
  console.error("No hay proyectos para capturar.");
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Falta Playwright. Instálalo con: npm i -D playwright && npx playwright install chromium");
  process.exit(1);
}

await mkdir(out, { recursive: true });
const browser = await chromium.launch();

const VIEWPORTS = [
  { suffix: "", width: 1440, height: 900, scale: 1, max: 4200, mobile: false },
  { suffix: "-m", width: 390, height: 844, scale: 2, max: 3200, mobile: true },
];

async function capture({ slug, site }, vp) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.scale,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
    locale: "es-CO",
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  try {
    await page.goto(site, { waitUntil: "networkidle", timeout: 45000 });
  } catch {
    await page.goto(site, { waitUntil: "load", timeout: 45000 });
  }
  // Recorre la página para disparar las imágenes con carga diferida y vuelve arriba.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < Math.min(document.body.scrollHeight, 8000); y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const file = join(out, `${slug}${vp.suffix}.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: 72, fullPage: true, clip: { x: 0, y: 0, width: vp.width, height: Math.min(height, vp.max) } });
  await ctx.close();
  return file;
}

const done = new Set();
for (const p of projects) {
  let both = true;
  for (const vp of VIEWPORTS) {
    try {
      const f = await capture(p, vp);
      console.log(`✓ ${p.slug}${vp.suffix} → ${f.replace(root, ".")}`);
    } catch (e) {
      both = false;
      console.warn(`✗ ${p.slug}${vp.suffix}: ${e instanceof Error ? e.message : e}`);
    }
  }
  if (both) done.add(p.slug);
}
await browser.close();

// Lista de proyectos con captura completa: el sitio la usa en lugar de la portada del portafolio.
const manifestPath = join(root, "src", "lib", "shots-manifest.json");
let prev = [];
try {
  prev = JSON.parse(await readFile(manifestPath, "utf8"));
} catch {}
const manifest = [...new Set([...prev, ...done])].sort();
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nshots-manifest.json: ${manifest.length} proyectos con captura completa.`);
