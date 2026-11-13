import localFont from "next/font/local";
import { Inter } from "next/font/google";

/** Fuente principal (pixel). Subconjunto WOFF con latín, español, flechas y bloques. */
export const ari = localFont({
  src: [{ path: "./font-files/ari-w9500-bold.woff", weight: "700", style: "normal" }],
  variable: "--font-ari",
  display: "swap",
  preload: true,
  fallback: ["Courier New", "ui-monospace", "monospace"],
  adjustFontFallback: false,
});

/** Fuente de lectura: textos, botones y UI. Limpia y cercana; la pixel queda solo para títulos. */
export const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});
