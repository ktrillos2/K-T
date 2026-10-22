import { LOGO_DOTS, LOGO_DOT_R, LOGO_PATH, LOGO_VIEWBOX } from "@/lib/logo-path";

const DOT_COLORS = ["var(--red)", "var(--yellow)", "var(--green)"];

/**
 * Logo pixel de K&T Code en SVG: nítido a cualquier tamaño y con el color del tema.
 * Con `title=""` es decorativo y queda fuera del árbol de accesibilidad.
 */
export function Logo({ className, title = "K&T Code" }: { className?: string; title?: string }) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} {...a11y} shapeRendering="crispEdges">
      <path d={LOGO_PATH} fill="currentColor" />
      {LOGO_DOTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={LOGO_DOT_R} fill={DOT_COLORS[i]} shapeRendering="geometricPrecision" />
      ))}
    </svg>
  );
}
