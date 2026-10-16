import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Que ChatGPT, Perplexity o Gemini citen tu marca depende de la autoridad de tu entidad y de la claridad de tu información, no de repetir palabras clave.",
    "Cuatro pilares: una identidad de marca única y consistente, textos precisos y verificables, respaldo de terceros (reseñas y casos) y un sitio rápido que entrega todo su contenido desde el servidor.",
    "Un blog con comparativas y respuestas claras le da a los modelos el material que necesitan para citarte.",
  ],
  md: `
Optimizar para la inteligencia artificial no consiste en llenar tu web de palabras clave. Los modelos de lenguaje recomiendan a las empresas que **entienden con claridad** y que **otras fuentes confirman**. Esto es lo que hace la diferencia.

## Pilar 1: construye tu entidad {#entidad}

Para un modelo de IA, tu empresa es una *entidad*: un nombre asociado a un tipo de negocio, un lugar, unas personas y unos servicios. Si esos datos cambian de un sitio a otro, la entidad se vuelve borrosa.

- Usa **exactamente el mismo nombre comercial** en tu web, redes, directorios y facturas.
- Describe cada servicio sin ambigüedad: qué es, para quién, cuánto cuesta, cuánto tarda.
- Enlaza tus perfiles oficiales con \`sameAs\` en los datos estructurados.

## Pilar 2: claridad sobre promesas {#claridad}

"Somos líderes en soluciones integrales" no le dice nada a un modelo. "Estudio de desarrollo web a la medida en Cúcuta, Colombia; landing pages desde $450.000 COP; entrega en 7 a 12 días" sí.

Tabla: Del texto promocional al texto citable.
| Texto vago | Texto citable |
|---|---|
| Soluciones web innovadoras | Sitios web, tiendas virtuales y software a la medida |
| Precios competitivos | Landing page desde $450.000 COP |
| Webs rápidas | El contenido principal carga en menos de un segundo |
| Amplia experiencia | Más de 20 proyectos en producción en Colombia, México y Perú |

## Pilar 3: respaldo de terceros {#respaldo}

Los asistentes contrastan lo que dices con lo que otros dicen de ti: reseñas verificadas, perfiles de empresa, directorios del sector, prensa y casos de éxito documentados. Publica [casos de estudio](/proyectos) con datos reales y pide reseñas a tus clientes.

## Pilar 4: velocidad y HTML completo {#velocidad}

Los rastreadores de IA tienen poco tiempo por página. Si tu contenido depende de scripts pesados que se ejecutan en el navegador, puede que el bot no lo vea. Un sitio que entrega el HTML completo desde el servidor, y rápido, se lee entero.

:::checklist id="geo-marca" title="¿La IA puede entender tu marca?"
- Uso el mismo nombre comercial en todos mis canales
- Cada servicio tiene precio, plazo y descripción concreta
- Tengo datos estructurados con mis perfiles oficiales
- Publico casos de éxito con cifras reales
- Tengo reseñas recientes de clientes
- Mi sitio carga rápido y su contenido está en el HTML
:::

## Sigue aprendiendo {#mas}

- [Cómo aparecer en ChatGPT Search](/blog/como-aparecer-en-chatgpt-2026)
- [GEO vs. SEO](/blog/geo-vs-seo-diferencias-motores-ia)
- [SEO agéntico en 2026](/blog/seo-agentico-2026)
- [Guía de llms.txt](/blog/llms-txt-2026)

¿Quieres una auditoría de tu sitio? Conoce nuestro servicio de [SEO técnico](/servicios/seo-tecnico).
`,
  faq: [
    { q: "¿Cómo decide ChatGPT qué empresa recomendar?", a: "Evalúa la consistencia de la marca en fuentes confiables: datos estructurados oficiales, menciones en artículos, perfiles verificados y reseñas reales de clientes." },
    { q: "¿Necesito un blog para aparecer en ChatGPT?", a: "Ayuda mucho. Un blog con comparativas y respuestas claras le da a los modelos el material que necesitan para citarte como referencia del sector." },
    { q: "¿El SEO tradicional sigue sirviendo para la IA?", a: "Sí. La jerarquía de encabezados, la velocidad, los datos estructurados y un sitemap limpio son las señales que usan los rastreadores de IA para evaluar un sitio." },
  ],
};

export default post;
