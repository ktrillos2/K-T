/**
 * Imágenes de los proyectos del portafolio anterior (kytcode.lat/portafolio).
 * Están en el CDN de Sanity, así que siguen disponibles aunque el dominio pase al sitio nuevo.
 *
 * - Por defecto se cargan desde cdn.sanity.io con el tamaño y formato que pide cada vista.
 * - `npm run covers` las descarga a public/projects/<slug>.webp. Si luego defines
 *   NEXT_PUBLIC_LOCAL_COVERS=1, el sitio usa esas copias locales y no depende de Sanity.
 * - Repuestos Germana estaba alojada en el dominio viejo (/images/projects/repuestos.webp):
 *   solo existe en local, así que ejecuta `npm run covers` ANTES de publicar el sitio nuevo.
 */
const SANITY = "https://cdn.sanity.io/images/bc3zxc91/production/";

export const COVERS: Record<string, string> = {
  "gmx-gaming": `${SANITY}640ab2285d001d0a52a10539c50b4d09bc6d6469-2948x1726.png`,
  "aerolinea-santander": `${SANITY}e1f9ff7fc5938b5007d14b2df5312082f3ce13d8-1912x867.png`,
  "cxellence-group": `${SANITY}9c476825de069b7328f7e8992c0b032d698177cd-1702x858.png`,
  motofox: `${SANITY}fee9d20717aa9d967bd7fc6525623c44cd4f883f-1897x867.png`,
  qvareli: `${SANITY}f5025bb346fab4f4e8b2f2639700b95537cb7360-3378x1798.png`,
  "traum-drop": `${SANITY}0c6acc41e17259d96390736c9ee3038e35832e5e-1898x868.png`,
  eccodotaciones: `${SANITY}912428f810721c5ab824bd0ff5a3e242101ab944-1910x866.png`,
  "casa-medina": `${SANITY}d3d31caec8d96b92e8423d59bdb98f54786bfe74-1892x863.png`,
  eccocia: `${SANITY}78755f3cb454cac93bdfb74d620b0577c86e5049-1860x781.png`,
  "academia-sea": `${SANITY}8bc71d938d80b2d607a4fb51153ee0fcbbfd2036-1896x872.png`,
  psicowork: `${SANITY}39162def48cdc05c881e33427bcbae935d75ed37-3356x1830.png`,
  "brambila-inmobiliaria": `${SANITY}edc6fd93e6354d85fbb27bd0bc11987162056f31-3384x1820.png`,
  "nosky-group": `${SANITY}230c9845ceb53d04f556e0ea33d119fa9947a2f3-1024x555.png`,
  "occ-partes": `${SANITY}9b80b5beafeeb67c2010146ab9e696e2e0696bba-1024x553.png`,
  "autos-saldo": `${SANITY}3da5e2e83e9a4e01c725008eed72ed96abda7b3c-1024x557.png`,
  "causalidad-dinamica": `${SANITY}c85c56dbecb27e004c9aa485f0e1ad455b061aae-1024x558.png`,
  "telas-real": `${SANITY}1b7ebfdbb83859339810f880d21965291f38c795-1024x552.png`,
  "eklipse-home-textil": `${SANITY}44dfc5c2d87175910a90c0f109cef80483cc986a-1024x555.png`,
  brahneyker: `${SANITY}3c1573cfaf6b6d3995254efca1190428db0cf50d-1024x556.png`,
  "estrella-de-david": `${SANITY}97d2c128d8adb1d22c3ece9ed0d95981315d02e7-1024x553.png`,
  "san-roqueros": `${SANITY}ffdaf821106ef8e89ea0f4451c51963669e4ef73-1024x558.png`,
  "repuestos-germana": `${SANITY}437bd1f2654a9252252e9a4a98d618c46f9ca2f4-1024x1024.jpg`,
};

/** Portadas legacy con fallback si fuera necesario. */
export const LEGACY_COVERS: Record<string, string> = {};

const LOCAL = process.env.NEXT_PUBLIC_LOCAL_COVERS === "1";

/** Proporción ancho/alto de la portada (Sanity la trae en el nombre: …-1912x867.png). */
export function coverRatio(slug: string): number | undefined {
  const m = COVERS[slug]?.match(/-(\d+)x(\d+)\.\w+$/);
  return m ? Number(m[1]) / Number(m[2]) : undefined;
}

/** URL de la imagen de portada de un proyecto optimizada por Sanity CDN (o undefined si no tiene). */
export function coverUrl(slug: string, width = 1600): string | undefined {
  if (LOCAL && COVERS[slug]) return `/projects/${slug}.webp`;
  const base = COVERS[slug];
  if (!base) return undefined;
  return `${base}?auto=format&fit=max&q=82&w=${width}`;
}

