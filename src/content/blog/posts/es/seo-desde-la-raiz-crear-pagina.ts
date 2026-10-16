import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "El posicionamiento depende de una base técnica que se decide al construir la web: cómo se renderiza, la jerarquía de encabezados, la velocidad y los datos estructurados.",
    "Dejar el SEO técnico para después del lanzamiento suele obligar a rehacer partes del sitio.",
    "Los datos estructurados (Organization, Service, FAQPage) ayudan a buscadores y asistentes de IA a entender tu negocio.",
  ],
  md: `
Muchas empresas lanzan su web y después contratan "el SEO". El problema es que buena parte del SEO no se agrega: se construye. Estas son las decisiones que se toman en la arquitectura.

## Por qué el SEO técnico va en la fase de desarrollo {#desarrollo}

Tabla: Qué se decide al construir y cuánto cuesta corregirlo después.
| Decisión | Si se planea desde el inicio | Si se corrige después |
|---|---|---|
| Renderizado (servidor o navegador) | Contenido completo en el HTML | Puede exigir rehacer el sitio |
| Jerarquía de encabezados | Ordenada en cada plantilla | Revisar página por página |
| URLs y estructura | Limpias y lógicas | Redirecciones y pérdida de posiciones |
| Datos estructurados | Generados automáticamente | Agregados a mano |
| Velocidad | Diseñada para cargar en menos de 1 s | Optimizaciones parciales |

## Componentes fundamentales {#componentes}

- **Generación estática y renderizado híbrido:** el contenido prerenderizado reduce la latencia y hace el rastreo más predecible.
- **Datos estructurados en JSON-LD:** Organization, Service y FAQPage describen tu negocio sin ambigüedad para buscadores y asistentes de IA.
- **Metadatos y enlaces internos:** títulos únicos, descripciones claras y enlaces que conectan los temas.
- **Accesibilidad:** buenas prácticas que también ayudan a los rastreadores a entender la página.

:::quiz
? ¿Cuándo conviene planear el SEO técnico de una web?
- Después de lanzar, cuando llegue el tráfico
- *Desde el diseño de la arquitectura
- Solo si se va a pagar publicidad
= Decisiones como el renderizado, las URLs y la jerarquía se toman al construir; corregirlas después cuesta más.
:::

En K&T Code el SEO técnico no es un costo oculto: viene integrado en cada proyecto. Conoce el servicio de [SEO técnico](/servicios/seo-tecnico) y lee [qué es el SEO y cómo funciona](/blog/que-es-el-seo-y-como-funciona-guia).
`,
  faq: [
    { q: "¿Se puede agregar el SEO después de lanzar la web?", a: "Parte sí (contenido, enlaces), pero lo técnico, como el renderizado, la estructura de URLs y la velocidad, se decide al construir y corregirlo después suele implicar rehacer partes del sitio." },
    { q: "¿Los datos estructurados ayudan con la IA?", a: "Sí. Describen de forma explícita quién eres y qué ofreces, lo que ayuda a buscadores y asistentes de IA a entender y citar tu negocio." },
  ],
};

export default post;
