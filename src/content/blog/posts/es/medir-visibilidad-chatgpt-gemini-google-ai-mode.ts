import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "La visibilidad en IA no se mide con clics: se mide con menciones, citas enlazadas, acceso de los rastreadores y precisión de los datos que la IA dice de ti.",
    "Audita en cuatro fases: acceso técnico, datos estructurados, batería de prompts y análisis de fuentes citadas.",
    "Permite OAI-SearchBot (ChatGPT Search) y PerplexityBot; decidir sobre GPTBot (entrenamiento) es una política de tu empresa.",
  ],
  md: `
Search Console te dice cuántos clics recibiste de Google, pero no si ChatGPT te recomienda. Para eso hay que medir distinto: **¿la IA te menciona, te enlaza y dice cosas correctas de ti?**

## El marco de auditoría GEO en 4 fases {#fases}

1. **Acceso técnico:** confirma que los rastreadores de IA no reciben bloqueos (errores 403 o desafíos del firewall).
2. **Entidad y datos estructurados:** organización, negocio local, servicios y preguntas frecuentes.
3. **Batería de prompts:** preguntas comerciales, comparativas y técnicas, en sesiones limpias.
4. **Atribución:** cuántas respuestas enlazan a tu sitio y si tu llms.txt está disponible.

## Métricas clave {#metricas}

Tabla: Métricas de visibilidad en IA.
| Métrica | Qué mide | Cálculo | Meta orientativa |
|---|---|---|---|
| Cuota de voz en el modelo | Respuestas que te recomiendan frente a la competencia | Menciones ÷ respuestas × 100 | Crecer mes a mes en tu ciudad y sector |
| Tasa de citas | Respuestas que enlazan a tu sitio | Respuestas con enlace ÷ menciones × 100 | La mayoría de tus menciones |
| Precisión de entidad | Si la IA dice bien tus precios, ciudad y servicios | Revisión de errores en las respuestas | Cero contradicciones |
| Salud del rastreo | Respuestas 200 a los bots de IA | Registros del servidor o del CDN | 100% sin bloqueos |

## La batería de prompts {#prompts}

Haz las pruebas en ventana privada, sin historial y con ubicación en Colombia. Repite cada mes.

### Tipo A: intención comercial

*«Mejores empresas de desarrollo web en Cúcuta»*, *«agencia colombiana de tiendas virtuales rápidas»*. ¿Apareces entre las tres primeras? ¿Describe bien lo que haces?

### Tipo B: comparativas y precios

*«Cuánto cuesta una página web corporativa en Colombia en 2026»*. ¿Cita tus rangos oficiales?

### Tipo C: técnicos

*«Empresas en Colombia que integran WhatsApp con Wompi y Bold»*. ¿Te reconoce como referencia en el tema?

:::checklist id="auditoria-geo" title="Registro de la auditoría mensual"
- Probé 5 prompts comerciales en ChatGPT
- Probé los mismos en Gemini y en Perplexity
- Anoté si aparezco, en qué posición y con qué enlace
- Revisé si los precios y la ciudad que dice la IA son correctos
- Revisé en los registros que los bots de IA reciben respuesta 200
:::

## Rastreadores: búsqueda vs. entrenamiento {#bots}

- **OAI-SearchBot:** el rastreador de ChatGPT Search. Permítelo para que puedan citarte; OpenAI indica que no usa lo que rastrea para entrenar modelos.
- **GPTBot:** recolecta datos para entrenamiento. Permitirlo o no es una decisión de política de tu empresa.
- **PerplexityBot** y **Google-Extended** siguen la misma lógica en sus plataformas.

## Cómo mejorar para ser citado {#mejorar}

1. Responde en las primeras 40–45 palabras de cada sección.
2. Usa tablas comparativas en HTML.
3. Publica un [llms.txt](/blog/llms-txt-2026) con tus servicios y precios.
4. Implementa datos estructurados de organización, servicios y migas de pan sin errores.

¿Quieres que lo auditemos por ti? Mira el servicio de [SEO técnico](/servicios/seo-tecnico).
`,
  faq: [
    { q: "¿Cómo sé si ChatGPT recomienda mi empresa?", a: "Haz las preguntas que haría tu cliente en sesiones limpias, anota si apareces, en qué posición y con qué enlace, y repite cada mes en ChatGPT, Gemini y Perplexity." },
    { q: "¿Debo bloquear GPTBot?", a: "Es una decisión de tu empresa. Para aparecer en ChatGPT Search lo importante es permitir OAI-SearchBot, que no se usa para entrenar modelos." },
  ],
  sources: [
    { title: "OpenAI: Overview of OpenAI crawlers", url: "https://platform.openai.com/docs/bots" },
    { title: "Google Search Central: AI features and your website", url: "https://developers.google.com/search/docs/appearance/ai-features" },
  ],
};

export default post;
