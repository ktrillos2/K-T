import type { PlanId } from "@/lib/pricing";
import styles from "./PlanArt.module.css";

/**
 * Mini ilustración pixel de cada plan. Se anima al pasar el puntero por la tarjeta
 * (o cuando es la tarjeta activa en el carrusel del celular):
 * - Landing: el cursor hace clic en el botón y aparece el "✓ lead".
 * - Tienda: los productos vuelan al carrito y el contador sube.
 * - Corporativo: las páginas se abren en abanico.
 * - Software: el panel grafica y la terminal escribe.
 */
export function PlanArt({ id }: { id: PlanId }) {
  return (
    <svg className={styles.art} data-plan={id} viewBox="0 0 160 84" shapeRendering="crispEdges" aria-hidden="true">
      {/* Marco de navegador */}
      <rect className={styles.screen} x="0.5" y="0.5" width="159" height="83" rx="6" />
      <rect className={styles.chrome} x="0.5" y="0.5" width="159" height="11" />
      <rect x="6" y="4" width="3" height="3" fill="var(--red)" />
      <rect x="11" y="4" width="3" height="3" fill="var(--yellow)" />
      <rect x="16" y="4" width="3" height="3" fill="var(--green)" />
      {id === "landing" && <Landing />}
      {id === "tienda" && <Store />}
      {id === "corporativo" && <Corporate />}
      {id === "software" && <Software />}
    </svg>
  );
}

function Landing() {
  return (
    <g>
      <rect className={styles.ink} x="14" y="22" width="70" height="7" />
      <rect className={styles.ink} x="14" y="32" width="52" height="7" />
      <rect className={styles.soft} x="14" y="44" width="60" height="3" />
      <rect className={styles.soft} x="14" y="50" width="46" height="3" />
      <g className={styles.cta}>
        <rect x="14" y="60" width="36" height="11" fill="var(--c)" />
        <rect x="19" y="64" width="20" height="3" fill="#0b0b0c" />
      </g>
      <g className={styles.lead}>
        <rect x="56" y="60" width="38" height="11" fill="#62c453" />
        <rect x="60" y="64" width="4" height="3" fill="#0b0b0c" />
        <rect x="67" y="64" width="22" height="3" fill="#0b0b0c" />
      </g>
      <rect className={styles.hero} x="100" y="20" width="46" height="52" fill="var(--c)" />
      <rect x="112" y="32" width="22" height="22" fill="#0b0b0c" opacity="0.25" />
      <g className={styles.cursor}>
        <path d="M0 0h1v1h1v1h1v1h1v1h1v1h-2v1h1v1h-1v-1h-1v1h-1z" transform="scale(2)" fill="currentColor" />
      </g>
    </g>
  );
}

function Store() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} className={styles.product} style={{ ["--i" as string]: i }}>
          <rect className={styles.tile} x={12 + i * 34} y="20" width="28" height="28" />
          <rect x={18 + i * 34} y="26" width="16" height="16" fill={i === 1 ? "var(--c)" : i === 0 ? "var(--red)" : "var(--green)"} />
          <rect className={styles.soft} x={12 + i * 34} y="52" width="20" height="3" />
          <rect className={styles.ink} x={12 + i * 34} y="58" width="12" height="3" />
        </g>
      ))}
      {/* Carrito */}
      <g className={styles.cart}>
        <rect className={styles.ink} x="120" y="40" width="26" height="16" />
        <rect x="123" y="43" width="20" height="10" className={styles.screenFill} />
        <rect className={styles.ink} x="116" y="36" width="6" height="3" />
        <rect className={styles.ink} x="122" y="58" width="5" height="5" />
        <rect className={styles.ink} x="139" y="58" width="5" height="5" />
      </g>
      <g className={styles.count}>
        <rect x="140" y="28" width="12" height="11" fill="var(--c)" />
        <text x="146" y="36.5" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="700" fill="#0b0b0c">
          <tspan className={styles.n0}>0</tspan>
          <tspan className={styles.n3} x="146">3</tspan>
        </text>
      </g>
      <rect className={styles.soft} x="12" y="70" width="100" height="3" />
    </g>
  );
}

function Corporate() {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className={styles.page} style={{ ["--i" as string]: i }}>
          <rect className={styles.tile} x="58" y="18" width="44" height="58" />
          <rect className={styles.ink} x="64" y="25" width="26" height="4" />
          <rect className={styles.soft} x="64" y="33" width="32" height="2" />
          <rect className={styles.soft} x="64" y="38" width="28" height="2" />
          <rect x="64" y="46" width="32" height="18" fill={["var(--red)", "var(--yellow)", "var(--green)", "var(--c)"][i]} />
        </g>
      ))}
    </g>
  );
}

function Software() {
  return (
    <g>
      <rect className={styles.tile} x="10" y="18" width="78" height="58" />
      {[16, 26, 20, 34, 30, 44].map((h, i) => (
        <rect key={i} className={styles.bar} style={{ ["--i" as string]: i }} x={18 + i * 11} y={70 - h} width="7" height={h} fill={i === 5 ? "var(--c)" : "currentColor"} opacity={i === 5 ? 1 : 0.35} />
      ))}
      <rect className={styles.term} x="94" y="18" width="56" height="58" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} className={styles.line} style={{ ["--i" as string]: i }} x="100" y={26 + i * 9} width={[38, 26, 42, 20, 30][i]} height="3" fill={i === 4 ? "#62c453" : "#f2f2ee"} />
      ))}
      <rect className={styles.caret} x="100" y="70" width="5" height="3" fill="#f2f2ee" />
    </g>
  );
}
