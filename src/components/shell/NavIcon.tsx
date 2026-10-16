import type { NavKey } from "@/lib/routes";
import styles from "./NavIcon.module.css";

/**
 * Íconos pixel (10×10) del menú. Cada letra es una capa que se anima por separado:
 * - Inicio: casa con humo que sube y puerta que se enciende.
 * - Nosotros: carita que parpadea y sonríe.
 * - Servicios: engranaje que gira por pasos.
 * - Proyectos: carpeta que se abre y asoma una hoja.
 * - Precios: moneda que da la vuelta.
 * - Blog: hoja con líneas que se escriben.
 * Se animan con :hover/:focus en el enlace que los contiene ([data-icon-hover]);
 * en el menú móvil se animan siempre (data-play).
 */
type Icon = { rows: string[]; fill: Record<string, string> };

const C = "var(--c)";
const FG = "currentColor";
const Y = "var(--yellow)";

const ICONS: Record<NavKey, Icon> = {
  home: {
    rows: [
      ".......S..",
      "......S...",
      "....RR.C..",
      "...RRRRC..",
      "..RRRRRR..",
      ".RRRRRRRR.",
      "..W....W..",
      "..W.DD.W..",
      "..W.DD.W..",
      "..WWWWWW..",
    ],
    fill: { R: C, C: FG, W: FG, D: Y, S: FG },
  },
  about: {
    rows: [
      "..FFFFFF..",
      ".F......F.",
      "F..E..E..F",
      "F..E..E..F",
      "F........F",
      "F.M....M.F",
      "F..MMMM..F",
      ".F......F.",
      "..FFFFFF..",
      "..........",
    ],
    fill: { F: C, E: FG, M: FG },
  },
  services: {
    rows: [
      "....GG....",
      ".G.GGGG.G.",
      "..GGGGGG..",
      ".GGG..GGG.",
      "GGG....GGG",
      "GGG....GGG",
      ".GGG..GGG.",
      "..GGGGGG..",
      ".G.GGGG.G.",
      "....GG....",
    ],
    fill: { G: C },
  },
  projects: {
    rows: [
      "..PPPPPP..",
      "BBBBP..P..",
      "BBBBPPPPBB",
      "B...P..P.B",
      "FFFFFFFFFF",
      "FFFFFFFFFF",
      "FFFFFFFFFF",
      "FFFFFFFFFF",
      "FFFFFFFFFF",
      "..........",
    ],
    fill: { B: FG, P: FG, F: C },
  },
  pricing: {
    rows: [
      "..CCCCCC..",
      ".CCCCKCCC.",
      "CCCKKKKCCC",
      "CCCKCKCCCC",
      "CCCKKKKCCC",
      "CCCCCKCKCC",
      "CCCKKKKCCC",
      ".CCCCKCCC.",
      "..CCCCCC..",
      "..........",
    ],
    fill: { C: C, K: "#0b0b0c" },
  },
  blog: {
    rows: [
      ".PPPPPP...",
      ".P....PP..",
      ".P.LLL.PP.",
      ".P......P.",
      ".P.MMMM.P.",
      ".P......P.",
      ".P.NNN..P.",
      ".P......P.",
      ".PPPPPPPP.",
      "..........",
    ],
    fill: { P: FG, L: C, M: C, N: C },
  },
};

const paths = (rows: string[]) => {
  const out: Record<string, string> = {};
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch !== ".") out[ch] = (out[ch] ?? "") + `M${x} ${y}h1v1h-1z`;
    }),
  );
  return out;
};
const PATHS = Object.fromEntries(Object.entries(ICONS).map(([k, v]) => [k, paths(v.rows)])) as Record<NavKey, Record<string, string>>;

/** `play`: anima siempre (p. ej. en el menú móvil abierto, donde no hay hover). */
export function NavIcon({ k, active, play, className }: { k: NavKey; active?: boolean; play?: boolean; className?: string }) {
  const icon = ICONS[k];
  return (
    <svg className={`${styles.icon} ${className ?? ""}`} data-icon={k} data-active={active ? "true" : undefined} data-play={play ? "true" : undefined} viewBox="0 0 10 10" shapeRendering="crispEdges" aria-hidden="true">
      <g className={styles.body}>
        {Object.entries(PATHS[k]).map(([l, d]) => (
          <path key={l} d={d} fill={icon.fill[l]} data-l={l} />
        ))}
      </g>
    </svg>
  );
}
