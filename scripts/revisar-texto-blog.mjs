#!/usr/bin/env node
// Revisa artículos del blog: frases típicas de IA, caracteres invisibles y exceso de formato.
// Uso: node scripts/revisar-texto-blog.mjs <archivo.ts> [...]
// Sale con código 1 si encuentra errores (caracteres invisibles o frases prohibidas).
import { readFileSync } from "node:fs";

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Uso: node scripts/revisar-texto-blog.mjs <archivo.ts> [...]");
  process.exit(2);
}

const ES = [
  "en el mundo actual", "en la era digital", "hoy en día, más que nunca", "hoy más que nunca",
  "es importante destacar", "es importante mencionar", "es importante tener en cuenta", "cabe resaltar",
  "cabe destacar", "cabe mencionar", "vale la pena mencionar", "vale la pena destacar",
  "sin lugar a dudas", "sin duda alguna", "en conclusión,", "en resumen,", "sumérgete", "descubre cómo",
  "desbloquea", "lleva tu negocio al siguiente nivel", "al siguiente nivel", "juega un papel crucial",
  "juega un papel fundamental", "papel fundamental", "herramienta poderosa", "solución integral",
  "panorama digital", "ecosistema digital", "esperamos que este artículo", "excelente pregunta",
  "no solo eso", "en este artículo exploraremos", "a lo largo de este artículo", "potencia tu",
  "revoluciona", "navegar por el", "un sinfín de",
];
const EN = [
  "in today's fast-paced", "in today's digital", "in the digital age", "delve", "dive into", "unlock",
  "leverage", "seamless", "seamlessly", "robust", "game-changer", "game changer", "navigate the",
  "landscape", "it's worth noting", "it is worth noting", "it's important to note", "in conclusion,",
  "elevate your", "take your business to the next level", "next level", "tapestry", "embark",
  "harness the power", "unleash", "we hope this article", "plays a crucial role", "plays a pivotal role",
  "in the realm of", "a myriad of", "cutting-edge", "ever-evolving",
];
// Caracteres invisibles o de marca de agua (no se ven, pero delatan texto generado).
const INVISIBLE = /[​-‏‪-‮⁠-⁤⁦-⁩﻿­᠎]/g;

let errors = 0;
let warnings = 0;

for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const isEn = /\/en\//.test(file);
  const lower = raw.toLowerCase();
  const out = [];
  const lineOf = (i) => raw.slice(0, i).split("\n").length;

  for (const m of raw.matchAll(INVISIBLE)) {
    out.push(`ERROR  línea ${lineOf(m.index)}: carácter invisible U+${m[0].codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`);
    errors++;
  }
  for (const phrase of isEn ? EN : [...ES, ...EN.filter((p) => p.includes(" "))]) {
    let i = -1;
    while ((i = lower.indexOf(phrase, i + 1)) !== -1) {
      // palabra completa
      const before = lower[i - 1] ?? " ";
      const after = lower[i + phrase.length] ?? " ";
      if (/[a-záéíóúñü]/.test(before) || (/[a-záéíóúñü]/.test(after) && !phrase.endsWith(","))) continue;
      out.push(`ERROR  línea ${lineOf(i)}: frase de IA «${phrase}»`);
      errors++;
    }
  }

  const dashes = (raw.match(/—/g) || []).length;
  if (dashes > 2) { out.push(`AVISO  ${dashes} rayas largas (—); máximo 2`); warnings++; }

  const bold = (raw.match(/\*\*[^*\n]+\*\*/g) || []).length;
  const words = raw.split(/\s+/).length;
  if (bold > Math.max(8, words / 120)) { out.push(`AVISO  ${bold} negritas para ~${words} palabras; usa menos`); warnings++; }

  const lines = raw.split("\n");
  const bullets = lines.filter((l) => /^\s*(- |\* |\d+\. )/.test(l)).length;
  const prose = lines.filter((l) => l.trim().length > 80 && !/^\s*(- |\* |\d+\. |\||#|:::)/.test(l)).length;
  if (bullets > prose * 2 && bullets > 15) { out.push(`AVISO  ${bullets} viñetas y solo ${prose} párrafos; explica más en prosa`); warnings++; }

  if (/\bkytcode\b|\bkyt code\b/i.test(raw.replace(/kytcode\.lat/gi, ""))) {
    out.push("ERROR  aparece «KyT Code/kytcode» en el texto; usa «K&T Code»");
    errors++;
  }

  console.log(`\n${file}`);
  console.log(out.length ? out.join("\n") : "  sin hallazgos");
}

console.log(errors ? `\n${errors} error(es), ${warnings} aviso(s). Corrige los errores antes de publicar.` : `\nOK (${warnings} aviso(s)).`);
process.exit(errors ? 1 : 0);
