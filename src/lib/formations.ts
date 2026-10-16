import { ABOUT, LOGO, NOTFOUND, PRICING, type Bitmap } from "./bitmaps";
import type { FormationKey } from "./store";

/** Total de vóxeles de la escena. Los que sobran en una formación flotan como polvo. */
export const VOXELS = 380;

export type Formation = {
  key: FormationKey;
  /** posiciones locales x,y,z por vóxel */
  pos: Float32Array;
  /** escala por vóxel (0 = oculto) */
  scale: Float32Array;
  /** 1 si el vóxel es parte del glifo, 0 si es polvo */
  solid: Uint8Array;
  /** posiciones de los tres puntos de la marca */
  dots: [number, number, number][];
  /** tamaño del glifo en celdas (incluye margen para los puntos) */
  w: number;
  h: number;
  /** sin ancla: la formación ocupa la escena entera */
  free: boolean;
};

function rand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const BITMAPS: Partial<Record<FormationKey, Bitmap>> = {
  logo: LOGO,
  about: ABOUT,
  pricing: PRICING,
  notfound: NOTFOUND,
};

export function buildFormation(key: FormationKey): Formation {
  const pos = new Float32Array(VOXELS * 3);
  const scale = new Float32Array(VOXELS);
  const solid = new Uint8Array(VOXELS);
  const r = rand(key.length * 977 + key.charCodeAt(0) * 31);
  const bmp = BITMAPS[key];

  // Formación libre: túnel de polvo para la vista de proyectos, blog y landings.
  // Para que los títulos se lean: el polvo vive detrás del plano del texto (z < -4),
  // un tercio de los vóxeles se oculta y los tamaños son más pequeños.
  if (!bmp) {
    for (let i = 0; i < VOXELS; i++) {
      const a = r() * Math.PI * 2;
      const rad = 8 + r() * 9;
      pos[i * 3] = Math.cos(a) * rad * 1.3;
      pos[i * 3 + 1] = Math.sin(a) * rad * 0.8;
      pos[i * 3 + 2] = -4 - r() * 66;
      scale[i] = i % 3 === 0 ? 0 : 0.14 + r() * 0.24;
    }
    return { key, pos, scale, solid, dots: dotsFor(0, 0, true), w: 30, h: 20, free: true };
  }

  const { w, h, cells } = bmp;
  let i = 0;
  // Dos capas de profundidad para que el glifo sea un bloque sólido.
  for (const layer of [0, -1]) {
    for (const [c, row] of cells) {
      if (i >= VOXELS) break;
      pos[i * 3] = c - w / 2 + 0.5;
      pos[i * 3 + 1] = -(row - h / 2 + 0.5);
      pos[i * 3 + 2] = layer;
      scale[i] = 1;
      solid[i] = 1;
      i++;
    }
  }
  // El resto: polvo orbitando alrededor del glifo.
  for (; i < VOXELS; i++) {
    const a = r() * Math.PI * 2;
    const rad = Math.max(w, h) * 0.75 + 4 + r() * 14;
    pos[i * 3] = Math.cos(a) * rad;
    pos[i * 3 + 1] = Math.sin(a) * rad * 0.7;
    pos[i * 3 + 2] = -4 - r() * 18;
    scale[i] = 0.12 + r() * 0.22;
  }

  let dots: [number, number, number][];
  if (bmp.dots) {
    dots = bmp.dots.map(([x, y]) => [x - w / 2, -(y - h / 2), 0.2] as [number, number, number]);
  } else {
    dots = dotsFor(w, h, false);
  }
  return { key, pos, scale, solid, dots, w: w + 2, h: h + 5, free: false };
}

function dotsFor(w: number, h: number, free: boolean): [number, number, number][] {
  if (free) return [-2.4, 0, 2.4].map((x) => [x, 7.5, -6] as [number, number, number]);
  const x0 = -w / 2 + 0.6;
  const y0 = h / 2 + 2.4;
  return [0, 1, 2].map((k) => [x0 + k * 2.15, y0, 0.2] as [number, number, number]);
}

const cache = new Map<FormationKey, Formation>();
export function getFormation(key: FormationKey) {
  let f = cache.get(key);
  if (!f) {
    f = buildFormation(key);
    cache.set(key, f);
  }
  return f;
}

/** Posición inicial: todo disperso, para que el loader "ensamble" la escena. */
export function chaos(): Float32Array {
  const r = rand(4242);
  const p = new Float32Array(VOXELS * 3);
  for (let i = 0; i < VOXELS; i++) {
    const a = r() * Math.PI * 2;
    const rad = 10 + r() * 30;
    p[i * 3] = Math.cos(a) * rad;
    p[i * 3 + 1] = Math.sin(a) * rad;
    p[i * 3 + 2] = -10 - r() * 40;
  }
  return p;
}
