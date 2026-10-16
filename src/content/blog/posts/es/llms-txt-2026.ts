import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "llms.txt es una propuesta para publicar en la raíz del dominio un resumen en Markdown de tu empresa pensado para modelos de lenguaje.",
    "No es una solución mágica: lo que más pesa para aparecer en buscadores con IA es dejar entrar a los rastreadores, tener HTML limpio, datos estructurados y una entidad clara.",
    "Bien hecho, permite que un agente obtenga tu contexto en una sola petición de pocos kilobytes en lugar de leer decenas de páginas.",
  ],
  md: `
**/llms.txt** es un estándar propuesto en 2024 para que los sitios web ofrezcan a los modelos de lenguaje un resumen estructurado en Markdown: quiénes son, qué venden, precios oficiales y enlaces a lo importante.

:::warn Pon llms.txt en su lugar
No es el factor principal para aparecer en ChatGPT Search o en los resúmenes con IA de Google. Lo primero es permitir rastreadores como OAI-SearchBot, que el servidor responda, tener datos estructurados y una entidad clara. llms.txt es un complemento útil, no un atajo.
:::

## ¿Para qué sirve si ya existen robots.txt y sitemap.xml? {#por-que}

Tabla: Cada archivo cumple una función distinta.
| Estándar | Propósito |
|---|---|
| robots.txt | Qué pueden rastrear los bots |
| sitemap.xml | Qué URLs existen y cuándo cambiaron |
| Datos estructurados | Relaciones semánticas dentro del HTML |
| llms.txt | Resumen en texto plano para modelos de lenguaje |

Un agente que tiene que descargar 50 páginas llenas de menús y scripts gasta miles de *tokens*. Con llms.txt obtiene el contexto esencial en **una sola petición de menos de 5 KB**.

## Estructura recomendada {#estructura}

1. **Título (H1):** nombre de la empresa y qué hace.
2. **Cita (>):** la propuesta de valor en una o dos frases, con cobertura geográfica.
3. **Información corporativa:** nombre oficial, sitio, año de fundación, sede y contacto.
4. **Servicios principales:** cada uno con su precio de partida.
5. **Enlaces clave:** precios, servicios, casos de estudio y blog.

Por ejemplo, el nuestro empieza así:

> # K&T Code
> Estudio colombiano que diseña y desarrolla sitios web, tiendas virtuales y software a la medida. Desde Cúcuta para Colombia, Latinoamérica y Estados Unidos.

Puedes ver el archivo completo en [/llms.txt](/llms.txt) y una versión extendida con todos nuestros casos y artículos en [/llms-full.txt](/llms-full.txt).

## Cómo publicarlo {#publicar}

- Sírvelo en la raíz: https://tudominio.com/llms.txt, como texto plano en UTF-8.
- Genéralo desde los mismos datos de tu sitio (precios, servicios, casos) para que **nunca se contradiga** con la web.
- Ponle caché de un día y regenéralo cuando cambien tus precios.
- Permite el acceso en robots.txt a los rastreadores de IA que te interesen.

:::checklist id="llms-txt" title="Antes de publicar tu llms.txt"
- Responde en la raíz con código 200 y texto plano
- Incluye nombre, ciudad, contacto y año de fundación
- Lista servicios con precio de partida y moneda
- Enlaza precios, casos de estudio y blog
- Coincide exactamente con lo que dice la web
- robots.txt no bloquea a los rastreadores de IA
:::

¿Quieres que lo implementemos con el resto de tu SEO técnico? Mira el servicio de [SEO técnico](/servicios/seo-tecnico) o la guía de [GEO vs. SEO](/blog/geo-vs-seo-diferencias-motores-ia).
`,
  faq: [
    { q: "¿llms.txt es obligatorio para aparecer en ChatGPT?", a: "No. Es una propuesta voluntaria. Lo determinante es que los rastreadores puedan acceder, que el HTML tenga el contenido y que la información de tu empresa sea clara y consistente." },
    { q: "¿Qué diferencia hay entre llms.txt y llms-full.txt?", a: "llms.txt es un resumen con enlaces; llms-full.txt incluye el contenido completo (casos, artículos) en texto plano para que un modelo no tenga que visitar cada página." },
  ],
  sources: [
    { title: "Propuesta del estándar llms.txt", url: "https://llmstxt.org/" },
    { title: "K&T Code: llms.txt", url: "https://www.kytcode.lat/llms.txt" },
  ],
};

export default post;
