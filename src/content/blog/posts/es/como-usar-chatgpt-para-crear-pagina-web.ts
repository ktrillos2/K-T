import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "ChatGPT acelera la creación de una web: redacta textos, propone estructuras, genera datos estructurados y fragmentos de código.",
    "No reemplaza la infraestructura, la seguridad, las integraciones de pago ni la optimización en producción: eso requiere criterio técnico.",
    "Úsalo con instrucciones concretas: quién es tu cliente, qué vendes, en qué ciudad y qué acción quieres que tome.",
  ],
  md: `
La inteligencia artificial cambió la velocidad con la que se piensa y se construye un sitio web. Bien usada, te ahorra horas. Mal usada, te deja textos genéricos y código frágil. Así sacarle provecho.

## 4 usos reales de ChatGPT al crear una web {#usos}

1. **Textos que venden:** propuestas de valor para la portada, beneficios y llamados a la acción adaptados a tu cliente ideal.
2. **Datos estructurados:** borradores de schema.org para productos, preguntas frecuentes y negocio local.
3. **Componentes de interfaz:** primeros borradores de tarjetas, carruseles o formularios.
4. **Consultas y lógica:** ayuda con consultas a bases de datos o con la estructura de una integración.

## Prompts útiles {#prompts}

Tabla: Ejemplos de instrucciones para ChatGPT.
| Objetivo | Prompt de ejemplo |
|---|---|
| Portada | "Escribe 3 versiones del título y subtítulo de la portada de una clínica dental en Cúcuta para pacientes de 25 a 45 años. Tono cercano, máximo 12 palabras por título." |
| Preguntas frecuentes | "Lista las 8 preguntas que más hace un cliente antes de comprar una cortina a la medida, con respuestas de máximo 40 palabras." |
| Datos estructurados | "Genera el JSON-LD de tipo LocalBusiness para esta empresa: [nombre, dirección, horario, teléfono]." |
| Descripción para Google | "Escribe 5 descripciones de menos de 155 caracteres para la página de servicios de [empresa], que incluyan [ciudad] y una invitación a cotizar." |

:::tip Dale contexto
Cuanto más específico seas (cliente, ciudad, tono, extensión, objetivo), más útil será el resultado. Revisa siempre los datos: la IA puede inventar cifras.
:::

## Lo que ChatGPT no puede hacer solo {#limites}

- Configurar la infraestructura, el dominio y la seguridad de la base de datos.
- Integrar pagos y facturación de forma confiable.
- Garantizar velocidad y SEO técnico en producción.
- Entender tu negocio mejor que tú.

Mira también [las mejores herramientas de IA para crear páginas web](/blog/mejores-herramientas-ia-crear-paginas-web-2026). En K&T Code combinamos IA con ingeniería y diseño a la medida: conoce nuestro [desarrollo web a la medida](/servicios/desarrollo-web-a-medida).
`,
  faq: [
    { q: "¿Puede ChatGPT crear una página web completa por sí solo?", a: "Puede generar fragmentos de código y textos, pero no configurar la infraestructura, gestionar la seguridad ni optimizar el rendimiento en producción sin supervisión de un equipo técnico." },
    { q: "¿En qué tareas es más útil ChatGPT para una web?", a: "Para redactar borradores de contenido, estructurar datos estructurados, proponer estructuras de página y acelerar componentes repetitivos." },
  ],
};

export default post;
