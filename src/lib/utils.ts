import type { CSSProperties } from "react";

/** Une clases condicionales. */
export const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

/** Variables CSS tipadas para el atributo style. */
export const vars = (o: Record<string, string | number>) => o as unknown as CSSProperties;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Hash corto y estable tipo git (para los commits del método). */
export function shortHash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}
