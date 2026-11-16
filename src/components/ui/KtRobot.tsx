import { cx } from "@/lib/utils";
import styles from "./KtRobot.module.css";

/** Robot de K&T en pixel art: cabeza de terminal con antena verde y «K&T» en el pecho. Decorativo. */

// Pixeles del pecho: «K&T» (X = pixel)
const GLYPHS = [
  ["X..X", "X.X.", "XX..", "X.X.", "X..X"],
  [".X..", "X.X.", ".X..", "X.XX", ".XXX"],
  ["XXX", ".X.", ".X.", ".X.", ".X."],
];
const LETTER_PX = 1.6;
const LETTERS = (() => {
  const out: { x: number; y: number }[] = [];
  let ox = 0;
  for (const g of GLYPHS) {
    g.forEach((row, y) => [...row].forEach((c, x) => c === "X" && out.push({ x: ox + x, y })));
    ox += g[0].length + 1;
  }
  const width = ox - 1;
  return { px: out, width };
})();
// Ojo «>» y cursor «_» de la pantalla
const CHEVRON = [
  [0, 0],
  [1, 1],
  [2, 2],
  [1, 3],
  [0, 4],
];

export function KtRobot({ talking = false, className }: { talking?: boolean; className?: string }) {
  return (
  <svg className={cx(styles.robot, talking && styles.talking, className)} aria-hidden="true" viewBox="0 0 44 58" shapeRendering="crispEdges">
    {/* antena */}
    <rect x={21.5} y={4} width={1} height={6} className={styles.stem} />
    <rect x={20} y={0.5} width={4} height={4} className={styles.bulb} />
    {/* cabeza: monitor con los tres puntos de ventana */}
    <rect x={3} y={10} width={38} height={27} className={styles.case} />
    <rect x={3} y={10} width={38} height={1} className={styles.edge} />
    <rect x={5.5} y={12.2} width={2.4} height={2.4} className={styles.dr} />
    <rect x={9} y={12.2} width={2.4} height={2.4} className={styles.dy} />
    <rect x={12.5} y={12.2} width={2.4} height={2.4} className={styles.dg} />
    <rect x={6} y={16} width={32} height={18.5} className={styles.screen} />
    {/* ojo > */}
    <g className={styles.eye}>
      {CHEVRON.map(([x, y]) => (
        <rect key={`c${x}${y}`} x={10 + x * 1.8} y={18 + y * 1.8} width={1.6} height={1.6} className={styles.led} />
      ))}
    </g>
    {/* cursor _ */}
    <g className={styles.cursor}>
      {[0, 1, 2, 3].map((i) => (
        <rect key={`u${i}`} x={24.5 + i * 1.8} y={23.4} width={1.6} height={1.6} className={styles.led} />
      ))}
    </g>
    {/* boca: línea (callado) o bloque (hablando) */}
    <g className={styles.mouthClosed}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={`m${i}`} x={13.7 + i * 1.8} y={29.4} width={1.6} height={1.6} className={styles.led} />
      ))}
    </g>
    <g className={styles.mouthOpen}>
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={`o${r}${i}`} x={13.7 + i * 1.8} y={27.6 + r * 1.8} width={1.6} height={1.6} className={styles.led} />),
      )}
    </g>
    {/* cuello y cuerpo con «K&T» */}
    <rect x={18} y={37} width={8} height={2} className={styles.edge} />
    <rect x={7} y={39} width={30} height={19} className={styles.case} />
    <g>
      {LETTERS.px.map(({ x, y }) => (
        <rect
          key={`l${x}-${y}`}
          x={22 - (LETTERS.width * LETTER_PX) / 2 + x * LETTER_PX}
          y={43 + y * LETTER_PX}
          width={LETTER_PX * 0.88}
          height={LETTER_PX * 0.88}
          className={styles.cream}
        />
      ))}
    </g>
    {/* manos */}
    <rect x={1} y={45} width={6.5} height={6.5} className={styles.hand} />
    <rect x={36.5} y={45} width={6.5} height={6.5} className={cx(styles.hand, styles.wave)} />
  </svg>
  );
}
