import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "WordPress es más barato al inicio y práctico para blogs y sitios editoriales; Next.js (código a la medida) es más rápido, más seguro y más flexible para empresas, tiendas y aplicaciones.",
    "Los sitios con constructores visuales pesados suelen tener tiempos de carga del contenido principal por encima de 2,5 s en móvil; un sitio bien hecho en Next.js suele estar por debajo de 1 s.",
    "Se pueden combinar: WordPress como administrador de contenido y Next.js como sitio público (WordPress headless).",
  ],
  md: `
WordPress y Next.js representan dos filosofías distintas: un sistema todo en uno con plugins frente a un sitio construido a la medida con código. Aquí sus fortalezas, límites y cuándo conviene cada uno.

## Tabla comparativa {#comparativa}

Tabla: WordPress frente a Next.js.
| Criterio | WordPress | Next.js |
|---|---|---|
| Precio inicial | Generalmente menor | Inversión media o alta |
| Administración | Panel nativo sencillo | Panel a la medida o gestor de contenido conectado |
| Personalización visual | Alta, limitada por tema y plugins | Total |
| Ecosistema | Decenas de miles de plugins | Paquetes y APIs modulares |
| Velocidad | Moderada; depende de plugins y hosting | Optimizada; páginas prerenderizadas |
| Seguridad | Requiere parches constantes | Menor superficie de ataque |
| Escalabilidad | Limitada por servidor y base de datos | Muy elástica en redes globales |
| Ideal para | Blogs y sitios editoriales | Empresas B2B, e-commerce y aplicaciones |

## Cuándo WordPress es la mejor opción {#wordpress}

WordPress impulsa más del 40% de los sitios web del mundo. Conviene cuando:

- El presupuesto inicial es ajustado.
- El sitio es puramente editorial o un blog de noticias.
- Quieres total independencia para instalar funciones sin tocar código.

## Cuándo Next.js es la mejor opción {#nextjs}

- **Velocidad:** el HTML se entrega prerenderizado en milisegundos.
- **Seguridad:** no depende de plugins de terceros desactualizados.
- **Experiencia tipo aplicación:** transiciones casi instantáneas entre páginas.
- **Integraciones:** CRMs, pasarelas colombianas (Wompi, Bold) y APIs propias.

## Rendimiento comparado {#rendimiento}

Según el capítulo de CMS del Web Almanac de HTTP Archive, los sitios en CMS monolíticos con constructores visuales pesados tienen dificultades para aprobar las tres Core Web Vitals en móvil.

Tabla: Rangos típicos en pruebas móviles (referencia).
| Métrica | WordPress con constructor visual | Next.js en nuestros proyectos |
|---|---|---|
| Puntaje de rendimiento | 40 – 75 / 100 | 95 – 100 / 100 |
| LCP | 2,5 – 5,0 s | 0,4 – 0,9 s |
| Peso de la página | 2,8 – 6 MB | Menos de 450 KB |

*Los rangos de Next.js corresponden a mediciones de nuestros proyectos; cada sitio varía.*

::widget speed-simulator

## ¿Se pueden combinar? {#headless}

Sí. Con WordPress headless, el contenido se administra en el panel de WordPress y el sitio público se construye a la medida, consumiendo ese contenido por API.

Lee [desarrollo a la medida vs. plantillas](/blog/desarrollo-web-medida-vs-plantillas) o mira nuestros [planes y precios](/precios).
`,
  faq: [
    { q: "¿Es mejor Next.js que WordPress para una página web?", a: "Next.js rinde mejor en velocidad, tiene menor superficie de ataque y más flexibilidad. WordPress sigue siendo práctico para blogs personales y sitios informativos con poco presupuesto inicial." },
    { q: "¿WordPress puede ser el administrador y Next.js el sitio público?", a: "Sí. Se llama WordPress headless: el contenido se gestiona en WordPress y el sitio público lo consume por API para mostrarlo rápido." },
    { q: "¿Cuál tiene mayor costo de mantenimiento?", a: "WordPress suele requerir más mantenimiento preventivo: actualizaciones de plugins, parches de seguridad y optimización de la base de datos." },
  ],
  sources: [
    { title: "HTTP Archive: Web Almanac 2024, capítulo CMS", url: "https://almanac.httparchive.org/en/2024/cms" },
    { title: "web.dev: Web Vitals", url: "https://web.dev/articles/vitals" },
    { title: "Chrome for Developers: Lighthouse", url: "https://developer.chrome.com/docs/lighthouse/overview" },
  ],
};

export default post;
