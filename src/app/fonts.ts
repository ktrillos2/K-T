import localFont from "next/font/local";
import { Fira_Code } from "next/font/google";

/** Fuente principal (pixel). Subconjunto WOFF con latín, español, flechas y bloques. */
export const ari = localFont({
  src: [{ path: "./font-files/ari-w9500-bold.woff", weight: "700", style: "normal" }],
  variable: "--font-ari",
  display: "swap",
  preload: true,
  fallback: ["Courier New", "ui-monospace", "monospace"],
  adjustFontFallback: false,
});

/** Fuente secundaria: textos, código y UI pequeña. */
export const fira = Fira_Code({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-fira",
  display: "swap",
});
