import type { PostBody } from "../types";

const es: PostBody = {
  tldr: [
    "GEO (optimización para motores generativos) busca que asistentes como ChatGPT, Gemini, Perplexity o los resúmenes con IA de Google citen tu negocio en sus respuestas.",
    "El SEO sigue siendo la base: los motores de IA se apoyan en índices de búsqueda y en páginas bien estructuradas.",
    "Un estudio académico de 2023 encontró que agregar citas, fuentes y estadísticas al contenido puede aumentar hasta 40% su visibilidad en respuestas generativas.",
    "Lo práctico: respuestas directas, datos concretos, datos estructurados, información consistente y permitir el acceso de los rastreadores de IA.",
  ],
  blocks: [
    { type: "p", text: "Cada vez más personas preguntan a un asistente de IA en vez de buscar en Google: “¿qué empresa hace páginas web en Cúcuta?”. La IA no muestra diez enlaces: **responde y cita unas pocas fuentes**. Si tu negocio no está entre ellas, no existe para esa persona." },
    { type: "h2", id: "que-es", text: "Qué es GEO y en qué se diferencia del SEO" },
    {
      type: "table",
      caption: "SEO tradicional frente a GEO.",
      head: ["", "SEO", "GEO"],
      rows: [
        ["Objetivo", "Posicionar enlaces en los resultados", "Ser citado dentro de la respuesta"],
        ["Dónde ocurre", "Buscadores (Google, Bing)", "ChatGPT, Gemini, Perplexity, resúmenes con IA"],
        ["Qué premia", "Relevancia, autoridad, experiencia", "Claridad, datos verificables y fuentes"],
        ["Formato ideal", "Páginas completas y bien enlazadas", "Respuestas directas y fáciles de citar"],
        ["Medición", "Posiciones, clics, impresiones", "Menciones y citas en respuestas"],
      ],
    },
    { type: "callout", tone: "info", title: "No es uno u otro", text: "GEO no reemplaza al SEO. Los asistentes consultan índices de búsqueda y páginas rastreables; sin una base técnica sólida, no tienen de dónde citarte." },
    { type: "h2", id: "como-eligen", text: "Cómo deciden las IA a quién citar" },
    { type: "p", text: "Ningún motor publica su receta completa, pero la investigación y la práctica coinciden en algunos patrones. El artículo *GEO: Generative Engine Optimization* (Aggarwal y colaboradores, 2023) probó distintas técnicas y encontró que **citar fuentes, incluir citas textuales y agregar estadísticas** mejoraba de forma notable la visibilidad del contenido en respuestas generativas." },
    {
      type: "ul",
      items: [
        "**Respuestas directas al inicio.** Una IA cita con más facilidad una frase que responde la pregunta sin rodeos.",
        "**Datos concretos.** Precios, tiempos, ciudades, cifras con su fuente.",
        "**Entidades claras.** Quién eres, dónde estás, qué haces y para quién, dicho igual en todas partes.",
        "**Estructura.** Encabezados, listas, tablas y preguntas frecuentes.",
        "**Señales de confianza.** Autor, fecha de actualización, casos reales y reseñas.",
      ],
    },
    { type: "h2", id: "checklist", text: "Lista GEO para tu sitio" },
    { type: "p", text: "Marca lo que ya tienes. Tu avance se guarda en este navegador para que vuelvas cuando quieras." },
    {
      type: "widget",
      name: "checklist",
      id: "lista-geo",
      title: "Lista de verificación GEO",
      items: [
        "Cada página responde su pregunta principal en las primeras líneas",
        "Precios, tiempos y ciudades aparecen escritos, no solo en imágenes",
        "Hay datos estructurados de organización, servicios y preguntas frecuentes",
        "El nombre, la dirección y el teléfono son iguales en todo internet",
        "Los artículos tienen autor y fecha de actualización visibles",
        "Las cifras citan su fuente",
        "El archivo robots.txt permite rastreadores de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)",
        "El sitio publica un archivo llms.txt con un resumen del negocio",
        "Hay una página por servicio y por ciudad o mercado importante",
        "El perfil de Google Business está completo y con reseñas",
      ],
    },
    { type: "h2", id: "llms-txt", text: "¿Qué es llms.txt?" },
    { type: "p", text: "Es una propuesta de 2024 para que los sitios publiquen en `/llms.txt` un resumen en texto plano pensado para modelos de lenguaje: quién eres, qué ofreces y enlaces a lo más importante. No es un estándar oficial ni garantiza nada, pero es barato de mantener y ayuda a que la información correcta esté a mano. Este sitio tiene el suyo en [/llms.txt](/llms.txt)." },
    { type: "h2", id: "como-lo-aplicamos", text: "Cómo lo aplicamos en nuestros proyectos" },
    { type: "p", text: "Cada sitio que entregamos sale con datos estructurados, jerarquía semántica, carga rápida y textos que responden preguntas reales. En [CXellence Group](/proyectos/cxellence-group), por ejemplo, estructuramos el SEO semántico desde la raíz y en pocas semanas empezaron a llegar leads B2B calificados." },
    {
      type: "widget",
      name: "quiz",
      questions: [
        { q: "¿Qué busca el GEO?", options: ["Más enlaces en la primera página de Google", "Que la IA cite tu negocio en sus respuestas", "Reemplazar por completo el SEO"], answer: 1, why: "GEO optimiza para ser citado dentro de respuestas generadas; el SEO sigue siendo la base." },
        { q: "Según el estudio de 2023, ¿qué aumentó la visibilidad en respuestas generativas?", options: ["Repetir palabras clave", "Agregar fuentes, citas y estadísticas", "Textos más largos"], answer: 1, why: "Citar fuentes y sumar estadísticas y citas textuales mostró mejoras de hasta 40%." },
        { q: "¿Qué archivo indica qué rastreadores pueden entrar a tu sitio?", options: ["robots.txt", "llms.txt", "sitemap.xml"], answer: 0, why: "robots.txt controla el acceso; llms.txt es un resumen para modelos; sitemap.xml lista tus páginas." },
      ],
    },
  ],
  faq: [
    { q: "¿GEO reemplaza al SEO?", a: "No. Los asistentes de IA se apoyan en índices de búsqueda y en páginas rastreables, así que el SEO técnico sigue siendo la base. GEO suma claridad, datos y fuentes para que te citen." },
    { q: "¿Cómo sé si una IA menciona mi negocio?", a: "Haz las preguntas que haría tu cliente en ChatGPT, Gemini y Perplexity, revisa si apareces y qué fuente citan, y repite la prueba cada mes." },
  ],
  sources: [
    { title: "Aggarwal et al. (2023). GEO: Generative Engine Optimization. arXiv:2311.09735", url: "https://arxiv.org/abs/2311.09735" },
    { title: "Propuesta llms.txt", url: "https://llmstxt.org/" },
    { title: "Google Search Central: AI features and your website", url: "https://developers.google.com/search/docs/appearance/ai-features" },
  ],
};

const en: PostBody = {
  tldr: [
    "GEO (generative engine optimization) aims to get assistants like ChatGPT, Gemini, Perplexity or Google's AI summaries to cite your business in their answers.",
    "SEO is still the foundation: AI engines rely on search indexes and well-structured pages.",
    "A 2023 academic study found that adding citations, sources and statistics to content can increase its visibility in generative answers by up to 40%.",
    "In practice: direct answers, concrete data, structured data, consistent information and letting AI crawlers in.",
  ],
  blocks: [
    { type: "p", text: "More and more people ask an AI assistant instead of searching on Google: “which company builds websites in Cúcuta?”. The AI doesn't show ten links: **it answers and cites a few sources**. If your business isn't among them, it doesn't exist for that person." },
    { type: "h2", id: "what-is", text: "What GEO is and how it differs from SEO" },
    {
      type: "table",
      caption: "Traditional SEO vs. GEO.",
      head: ["", "SEO", "GEO"],
      rows: [
        ["Goal", "Rank links in the results", "Be cited inside the answer"],
        ["Where it happens", "Search engines (Google, Bing)", "ChatGPT, Gemini, Perplexity, AI summaries"],
        ["What it rewards", "Relevance, authority, experience", "Clarity, verifiable data and sources"],
        ["Ideal format", "Complete, well-linked pages", "Direct, easy-to-quote answers"],
        ["Measurement", "Rankings, clicks, impressions", "Mentions and citations in answers"],
      ],
    },
    { type: "callout", tone: "info", title: "It's not either-or", text: "GEO doesn't replace SEO. Assistants query search indexes and crawlable pages; without a solid technical base, they have nothing to cite you from." },
    { type: "h2", id: "how-they-choose", text: "How AI engines decide whom to cite" },
    { type: "p", text: "No engine publishes its full recipe, but research and practice agree on some patterns. The paper *GEO: Generative Engine Optimization* (Aggarwal et al., 2023) tested different techniques and found that **citing sources, including quotations and adding statistics** noticeably improved content visibility in generative answers." },
    {
      type: "ul",
      items: [
        "**Direct answers up front.** An AI quotes a sentence that answers the question plainly more easily.",
        "**Concrete data.** Prices, timelines, cities, figures with their source.",
        "**Clear entities.** Who you are, where you are, what you do and for whom, said the same way everywhere.",
        "**Structure.** Headings, lists, tables and FAQs.",
        "**Trust signals.** Author, last-updated date, real cases and reviews.",
      ],
    },
    { type: "h2", id: "checklist", text: "GEO checklist for your site" },
    { type: "p", text: "Tick what you already have. Your progress is saved in this browser so you can come back anytime." },
    {
      type: "widget",
      name: "checklist",
      id: "geo-checklist",
      title: "GEO checklist",
      items: [
        "Each page answers its main question in the first lines",
        "Prices, timelines and cities are written out, not only in images",
        "There's structured data for organization, services and FAQs",
        "Name, address and phone are identical across the internet",
        "Articles show an author and a last-updated date",
        "Figures cite their source",
        "robots.txt allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)",
        "The site publishes an llms.txt file summarizing the business",
        "There's a page for each service and for each key city or market",
        "The Google Business profile is complete and has reviews",
      ],
    },
    { type: "h2", id: "llms-txt", text: "What is llms.txt?" },
    { type: "p", text: "It's a 2024 proposal for websites to publish a plain-text summary at `/llms.txt` aimed at language models: who you are, what you offer and links to what matters most. It's not an official standard and guarantees nothing, but it's cheap to maintain and helps keep the right information at hand. This site has its own at [/llms.txt](/llms.txt)." },
    { type: "h2", id: "how-we-apply-it", text: "How we apply it in our projects" },
    { type: "p", text: "Every site we deliver ships with structured data, semantic hierarchy, fast loading and copy that answers real questions. At [CXellence Group](/proyectos/cxellence-group), for example, we built semantic SEO from the ground up and qualified B2B leads started arriving within weeks." },
    {
      type: "widget",
      name: "quiz",
      questions: [
        { q: "What does GEO aim for?", options: ["More links on Google's first page", "Getting AI to cite your business in its answers", "Replacing SEO entirely"], answer: 1, why: "GEO optimizes for being cited inside generated answers; SEO remains the foundation." },
        { q: "According to the 2023 study, what increased visibility in generative answers?", options: ["Repeating keywords", "Adding sources, quotations and statistics", "Longer texts"], answer: 1, why: "Citing sources and adding statistics and quotations showed improvements of up to 40%." },
        { q: "Which file tells crawlers what they can access on your site?", options: ["robots.txt", "llms.txt", "sitemap.xml"], answer: 0, why: "robots.txt controls access; llms.txt is a summary for models; sitemap.xml lists your pages." },
      ],
    },
  ],
  faq: [
    { q: "Does GEO replace SEO?", a: "No. AI assistants rely on search indexes and crawlable pages, so technical SEO is still the foundation. GEO adds clarity, data and sources so they cite you." },
    { q: "How do I know if an AI mentions my business?", a: "Ask the questions your customer would ask in ChatGPT, Gemini and Perplexity, check whether you appear and which source is cited, and repeat every month." },
  ],
  sources: es.sources,
};

export default { es, en };
