import type { Lang } from "@/i18n/config";
import type { BlogCategory, PostCard, PostMeta } from "./types";
import { EN_META } from "./meta.en";

export const CATEGORY_LABELS: Record<Lang, Record<BlogCategory, string>> = {
  es: { precios: "Precios y guías", "desarrollo-web": "Desarrollo web", "seo-geo": "SEO y GEO", ia: "IA y automatización", ecommerce: "E-commerce", software: "Software a medida", comparativas: "Comparativas", estrategia: "Estrategia" },
  en: { precios: "Pricing & guides", "desarrollo-web": "Web development", "seo-geo": "SEO & GEO", ia: "AI & automation", ecommerce: "E-commerce", software: "Custom software", comparativas: "Comparisons", estrategia: "Strategy" },
};

const COLOR: Record<BlogCategory, PostMeta["color"]> = { precios: "green", "desarrollo-web": "yellow", "seo-geo": "yellow", ia: "red", ecommerce: "yellow", software: "red", comparativas: "green", estrategia: "red" };

type Seed = [slug: string, category: BlogCategory, date: string, minutes: number, title: string, description: string, tags: string[], interactive?: boolean];

/** Artículos migrados del blog anterior (en español; la versión en inglés está en ./meta.en.ts y ./posts/en) (mismos slugs para conservar el posicionamiento). */
const ES_ONLY: Seed[] = [
  ["cuanto-cuesta-una-pagina-web-latinoamerica", "precios", "2026-10-26", 7, "¿Cuánto Cuesta una Página Web en Latinoamérica? México, Colombia, Perú y Argentina (2026)", "Qué cambia el precio de una página web en cada país, costos únicos y mensuales, tipos de sitio y cómo cotizar en tu moneda con un estudio remoto.", ["precio página web", "Latinoamérica", "México"], true],
  ["nearshore-desarrollo-web-latinoamerica", "estrategia", "2026-10-24", 7, "Desarrollo Web Nearshore en Latinoamérica: Qué Es, Costos y Cómo Contratar desde EE. UU.", "Qué es el nearshore, cómo se compara con el offshore, por qué las empresas de Estados Unidos contratan en Latinoamérica y cómo elegir un buen equipo.", ["nearshore", "Estados Unidos", "desarrollo web"], true],
  ["como-vender-por-whatsapp-business", "ecommerce", "2026-10-20", 7, "Cómo Vender por WhatsApp Business Paso a Paso: Estrategias, Plantillas y Frases (2026)", "Guía práctica para vender por WhatsApp en Colombia: configuración, plantillas de mensajes listas para copiar, frases que cierran ventas y cuándo dar el salto a la API con IA.", ["WhatsApp Business", "ventas", "plantillas"], true],
  ["mejor-inteligencia-artificial-para-empresas", "ia", "2026-10-14", 7, "¿Cuál es la Mejor Inteligencia Artificial para Empresas? Herramientas y Cómo Elegir (2026)", "Qué IA usar según cada necesidad de tu empresa, beneficios reales, planes gratis vs. de pago y un test rápido para saber por dónde empezar.", ["inteligencia artificial", "herramientas de IA", "empresas"], true],
  ["que-es-un-servidor-mcp", "ia", "2026-10-08", 6, "¿Qué es un Servidor MCP y Para Qué Sirve? Guía Clara para Empresas (2026)", "Qué es el Model Context Protocol, cómo un servidor MCP conecta la IA con Power BI, GitHub o tu base de datos, cómo se crea y cómo usarlo con seguridad.", ["MCP", "servidor MCP", "agentes de IA"], true],
  ["que-es-vibe-coding", "desarrollo-web", "2026-10-03", 6, "¿Qué es el Vibe Coding? Lovable, Google AI Studio y lo que Significa para la Web de tu Empresa", "Qué es el vibe coding, las herramientas más usadas, sus riesgos reales y cuándo sirve (o no) para crear la página web de tu negocio.", ["vibe coding", "Lovable", "IA"], true],
  ["que-es-n8n-para-que-sirve", "ia", "2026-09-29", 7, "¿Qué es n8n y Para Qué Sirve? ¿Es Gratis o se Paga? Guía para Empresas (2026)", "Qué es n8n, ejemplos de automatización en pymes, si es gratis o de pago, cómo crear agentes de IA y cuándo pasar a un desarrollo a medida.", ["n8n", "automatización", "agentes de IA"], true],
  ["calcular-roi-automatizacion-software-ia", "software", "2026-09-25", 6, "Cómo Calcular el ROI de un Software a Medida o Automatización con IA en Colombia", "Fórmula de ROI, periodo de recuperación y un caso real con cifras en pesos para saber cuándo se paga un software a medida o una automatización con IA.", ["ROI", "software a medida", "automatización"], true],
  ["seo-agentico-2026", "seo-geo", "2026-09-23", 6, "SEO Agéntico en 2026: Estrategia Integral para Ser la Fuente Oficial de los Modelos de IA", "Qué es el SEO agéntico y los cuatro pilares para que los agentes de IA entiendan, citen y recomienden tu empresa: entidad, respuestas directas, datos estructurados y velocidad.", ["SEO agéntico", "agentes de IA", "datos estructurados"], true],
  ["llms-txt-2026", "seo-geo", "2026-09-21", 6, "Guía Definitiva de llms.txt en 2026: Qué Es, Cómo Implementarlo y Ejemplos Reales", "Qué es el archivo llms.txt, en qué se diferencia de robots.txt y sitemap.xml, cómo estructurarlo y cómo publicarlo en tu sitio, con un ejemplo real.", ["llms.txt", "GEO", "IA"], true],
  ["agentic-commerce-ecommerce-ia", "ia", "2026-09-18", 6, "Agentic Commerce: Cómo Preparar tu Tienda Virtual para Compradores y Agentes de IA en 2026", "Cómo cambia el comercio electrónico cuando los asistentes de IA compran por el cliente y los cuatro pilares técnicos para que tu tienda sea elegida.", ["agentic commerce", "e-commerce", "IA"], true],
  ["landing-page-vs-tienda-virtual", "comparativas", "2026-09-17", 9, "Landing Page vs. Tienda Virtual: Diferencias Clave, Cuál Elegir y Costos (2026)", "Comparamos landing page y tienda virtual en objetivo, embudo, pagos, mantenimiento y precio en Colombia, con el modelo híbrido que mejor convierte.", ["landing page", "tienda virtual", "conversión"], true],
  ["que-es-una-landing-page-y-para-que-sirve", "desarrollo-web", "2026-09-17", 9, "¿Qué es una Landing Page y Para Qué Sirve? Guía Definitiva de Conversión (2026)", "Qué es una landing page, su anatomía de alta conversión, cinco usos clave, diferencias con un sitio corporativo, precios en Colombia y errores a evitar.", ["landing page", "conversión", "Meta Ads"], true],
  ["mejores-agencias-software-a-medida-cucuta-2026", "estrategia", "2026-09-16", 9, "Mejores Agencias de Software a Medida en Cúcuta (2026): Ranking, Precios y Criterios", "Cómo elegir una empresa de software a medida en Cúcuta y Norte de Santander: criterios, tipos de proveedor, comparativa, proyectos típicos y precios.", ["Cúcuta", "software a medida", "agencias"], true],
  ["que-es-kyt", "estrategia", "2026-09-16", 5, "¿Qué es K&T? Nuestra Historia, Filosofía y Software a Medida sin Plantillas", "Quiénes somos en K&T Code, por qué construimos todo desde cero, qué automatizamos, dónde trabajamos y cómo comprobar que somos una empresa real.", ["K&T Code", "a la medida", "empresa"]],
  ["integrar-whatsapp-crm-inventario-facturacion", "ia", "2026-09-16", 5, "Cómo Integrar WhatsApp con CRM, Inventario y Facturación Electrónica DIAN en Colombia", "Arquitectura para que un pedido por WhatsApp valide inventario, cobre, emita la factura electrónica DIAN y la entregue en el mismo chat.", ["WhatsApp", "DIAN", "integraciones"]],
  ["chatbot-vs-agente-ia", "ia", "2026-09-14", 5, "Chatbot vs. Agente de IA: Diferencias y Cuál Necesita tu Negocio (2026)", "Un chatbot responde con reglas; un agente de IA consulta tus sistemas y actúa. Diferencias, un ejemplo real y cuándo conviene cada uno.", ["chatbot", "agente de IA", "WhatsApp"], true],
  ["google-ai-overviews-ai-mode-seo", "seo-geo", "2026-09-11", 5, "Google AI Overviews y AI Mode: Impacto en el Tráfico Orgánico y Estrategia SEO 2026", "Cómo afectan AI Overviews y AI Mode al tráfico orgánico según el tipo de búsqueda y las cinco reglas para que Google te cite como fuente.", ["AI Overviews", "AI Mode", "SEO"], true],
  ["excel-vs-erp-vs-software-a-medida", "software", "2026-09-09", 6, "Excel vs. ERP vs. Software a Medida: Cuál Elegir para Escalar tu Empresa en Colombia", "Comparativa de costos, riesgos y flexibilidad entre Excel, un ERP genérico y un software a medida, con un cuadro para decidir según tu etapa.", ["Excel", "ERP", "software a medida"], true],
  ["cuanto-cuesta-automatizar-procesos-ia-colombia", "precios", "2026-09-07", 6, "¿Cuánto Cuesta Automatizar con IA? Precios Reales en Colombia (2026)", "Rangos de precio por complejidad, costos mensuales de tokens e infraestructura, costos ocultos y cómo calcular si la automatización con IA se paga sola.", ["automatización", "IA", "precios"], true],
  ["medir-visibilidad-chatgpt-gemini-google-ai-mode", "seo-geo", "2026-09-04", 7, "Cómo Medir y Auditar la Visibilidad de tu Empresa en ChatGPT, Gemini y Google AI Mode", "Marco de auditoría GEO en cuatro fases, métricas de visibilidad en IA, batería de prompts de prueba y configuración de rastreadores.", ["GEO", "auditoría", "ChatGPT"], true],
  ["automatizar-whatsapp-business-con-ia", "ia", "2026-09-02", 8, "Cómo Automatizar WhatsApp Business con IA en Colombia: Guía Técnica y Estratégica 2026", "API oficial vs. bots no oficiales, arquitectura paso a paso, cobros con Wompi y Bold, costos de operación y buenas prácticas legales.", ["WhatsApp Business", "IA", "automatización"], true],
  ["agentes-ia-empresas-colombia", "ia", "2026-08-31", 9, "Agentes de IA para Empresas en Colombia: Qué Son, Cómo Funcionan y Cuándo Implementarlos", "Qué es un agente de IA empresarial, en qué se diferencia de un chatbot, casos de uso reales, cuándo implementarlo, costos y seguridad.", ["agentes de IA", "empresas", "Colombia"], true],
  ["como-aparecer-en-chatgpt-2026", "seo-geo", "2026-08-19", 8, "Cómo Aparecer en ChatGPT Search: OAI-SearchBot, Robots.txt y Citas IA", "La diferencia entre OAI-SearchBot y GPTBot, cómo configurar robots.txt, datos estructurados y la jerarquía real de factores para que ChatGPT te cite.", ["ChatGPT", "OAI-SearchBot", "robots.txt"], true],
  ["como-crear-una-pagina-web-desde-cero-2026", "desarrollo-web", "2026-08-18", 7, "Checklist y Hoja de Ruta: Cómo Crear una Web Desde Cero Paso a Paso", "Los seis pasos en orden para lanzar una página web sin olvidar nada: objetivo, dominio, diseño, desarrollo, SEO técnico y publicación.", ["crear página web", "checklist", "paso a paso"], true],
  ["seo-para-chatgpt-optimizacion-ia", "seo-geo", "2026-08-16", 6, "Optimización GEO: Cómo Lograr que los Modelos de IA Citen tu Marca", "Los cuatro pilares para que ChatGPT, Perplexity y Gemini recomienden tu marca: entidad, claridad, respaldo de terceros y velocidad.", ["GEO", "marca", "IA"], true],
  ["como-crear-una-pagina-web-gratis-limitaciones", "desarrollo-web", "2026-08-14", 5, "Cómo Crear una Página Web Gratis: Opciones, Limitaciones y Alternativas", "Qué ofrecen las plataformas gratuitas, sus cuatro grandes limitaciones y cuándo vale la pena invertir en una web propia.", ["web gratis", "Wix", "limitaciones"]],
  ["que-es-el-seo-y-como-funciona-guia", "seo-geo", "2026-08-10", 7, "Qué es el SEO y Cómo Funciona: Guía Definitiva para Principiantes", "Qué es el SEO, cómo funciona Google y sus tres pilares: técnico, on-page y off-page, con diferencias frente a SEM y plazos reales.", ["SEO", "Google", "principiantes"], true],
  ["por-que-mi-pagina-web-no-aparece-en-google", "seo-geo", "2026-08-08", 8, "Por Qué tu Web no Aparece en Google: Diagnóstico y Errores Técnicos", "Las doce causas más comunes por las que una web no aparece en Google y cómo diagnosticarlas y corregirlas paso a paso.", ["indexación", "Google", "errores SEO"], true],
  ["como-aparecer-en-google-guia-paso-a-paso", "seo-geo", "2026-08-06", 6, "Cómo Aparecer en Google: Indexación en Search Console y Sitemaps", "Guía paso a paso para indexar una web nueva: Search Console, sitemap, títulos, perfil de empresa en Google y cómo verificar que ya apareces.", ["Search Console", "sitemap", "Google"], true],
  ["cuanto-cuesta-desarrollar-software-a-medida-colombia", "precios", "2026-08-03", 7, "¿Cuánto Cuesta un Software a Medida en Colombia? Precios 2026", "Cuánto cuesta desarrollar un software a medida en Colombia: rangos por tipo de proyecto, fases del presupuesto, factores de costo y formas de contratar.", ["software a medida", "precios", "Colombia"], true],
  ["que-es-un-dominio-web-como-elegir", "desarrollo-web", "2026-08-01", 5, "Qué es un Dominio Web y Cómo Elegir el Mejor para tu Negocio", "Qué es un dominio, cómo elegir el nombre y la extensión (.com, .co, .com.co), cuánto cuesta en Colombia y errores comunes.", ["dominio", ".co", ".com"], true],
  ["software-a-medida-vs-saas-comparativa", "software", "2026-07-29", 5, "Software a Medida vs. SaaS: Costos, Ventajas y Cuándo Elegir Cada Uno", "Comparamos suscripciones SaaS y software propio en costo a largo plazo, propiedad, personalización y el punto en que conviene construir.", ["SaaS", "software a medida", "costos"], true],
  ["que-es-un-hosting-web-y-como-funciona", "desarrollo-web", "2026-07-27", 5, "¿Qué es un Web Hosting? Tipos, Precios y Cuál Elegir (2026)", "Qué es un web hosting, cómo funciona, tipos (compartido, VPS, dedicado y edge), cuánto cuesta alojar una página web y cuál conviene a tu negocio.", ["hosting", "servidores", "CDN"]],
  ["cuanto-cuesta-una-tienda-virtual-en-colombia-2026", "precios", "2026-07-25", 7, "¿Cuánto Cuesta una Tienda Virtual en Colombia en 2026? Guía de Costos", "Costos reales de una tienda virtual en Colombia: desarrollo, dominio, comisiones de Wompi y Bold, requisitos DIAN y comparación con Shopify.", ["tienda virtual", "precios", "comisiones"], true],
  ["wordpress-vs-shopify-comparativa", "comparativas", "2026-07-22", 5, "WordPress vs. Shopify: ¿Cuál es Mejor para Crear una Web o Tienda Online?", "WordPress con WooCommerce frente a Shopify en costos mensuales, comisiones, propiedad de datos y pasarelas disponibles en Colombia.", ["WordPress", "Shopify", "e-commerce"], true],
  ["wompi-vs-mercado-pago-vs-payu-colombia", "ecommerce", "2026-07-20", 6, "Wompi vs. Mercado Pago vs. PayU (2026): Comisiones y Cuál Conviene en Colombia", "Comparamos comisiones, medios de pago (PSE, Nequi, tarjetas), tiempos de abono y retenciones de Wompi, Mercado Pago y PayU para que elijas sin errores.", ["Wompi", "Mercado Pago", "PayU"], true],
  ["wix-vs-wordpress-diferencias-precios", "comparativas", "2026-07-18", 5, "Wix vs. WordPress: Diferencias, Precios Reales y Cuál Elegir en 2026", "Wix frente a WordPress en facilidad, propiedad del sitio, velocidad, costos de renovación y qué pasa cuando tu negocio crece.", ["Wix", "WordPress", "comparativa"], true],
  ["que-es-un-ecommerce-headless-ventajas", "ecommerce", "2026-07-16", 5, "¿Qué es un E-commerce Headless y Cuándo Conviene Utilizarlo?", "Qué significa una tienda headless, sus cuatro ventajas, cómo se administra y cuándo conviene frente a una tienda tradicional.", ["headless", "e-commerce", "velocidad"]],
  ["shopify-vs-wix-comparativa-ecommerce", "comparativas", "2026-07-14", 5, "Shopify vs. Wix: ¿Cuál es Mejor para Vender Online en 2026?", "Shopify frente a Wix para vender en línea: checkout, inventario, escalabilidad, pasarelas en Colombia y cuándo conviene una tienda a medida.", ["Shopify", "Wix", "vender online"], true],
  ["cuanto-cuesta-mantenimiento-pagina-web-colombia", "precios", "2026-07-12", 5, "¿Cuánto Cuesta el Mantenimiento de una Página Web en Colombia?", "Precios de planes de mantenimiento web en Colombia, qué debe incluir un buen soporte y qué pasa si no mantienes tu sitio.", ["mantenimiento web", "soporte", "precios"], true],
  ["como-crear-una-tienda-online-desde-cero", "ecommerce", "2026-07-09", 7, "Cómo Crear una Tienda Online Desde Cero: Guía Completa de E-commerce", "Los cinco pasos para lanzar una tienda online en Colombia: catálogo, pasarelas, envíos, checkout y tráfico, con requisitos y documentos.", ["tienda online", "e-commerce", "paso a paso"], true],
  ["como-usar-chatgpt-para-crear-pagina-web", "ia", "2026-07-04", 5, "Cómo Usar ChatGPT para Crear una Página Web: Prompts, Código y Estrategia", "En qué tareas ayuda ChatGPT para crear una web, ejemplos de prompts útiles y qué no puede hacer sin un equipo técnico.", ["ChatGPT", "prompts", "páginas web"]],
  ["mejores-herramientas-ia-crear-paginas-web-2026", "ia", "2026-06-28", 5, "Las Mejores Herramientas de IA para Crear Páginas Web en 2026", "Las herramientas de IA más útiles para diseñar, programar y optimizar páginas web, para qué sirve cada una y sus límites.", ["herramientas IA", "desarrollo web", "2026"]],
  ["que-es-una-api-y-para-que-sirve", "software", "2026-06-22", 5, "¿Qué es una API? Qué Significa, Para Qué Sirve y Ejemplos (2026)", "Una API es el puente que permite que dos programas se comuniquen. Qué significa, cómo funciona, tipos (REST, GraphQL, webhooks) y ejemplos reales.", ["API", "integraciones", "explicación"], true],
  ["pagina-web-vs-tienda-virtual", "comparativas", "2026-03-05", 6, "Página Web vs. Tienda Virtual en Colombia: Diferencias, Funcionalidades y Precios", "Diferencias entre una página web corporativa y una tienda virtual en objetivo, pagos, inventario, precio y tiempos, y cuál elegir.", ["página web", "tienda virtual", "precios"], true],
  ["nextjs-vs-react", "comparativas", "2026-03-04", 6, "Next.js vs. React: Diferencias y Cuál Elegir en 2026", "React es una librería y Next.js un framework sobre React. Diferencias en renderizado, SEO y enrutamiento, y cuándo conviene cada uno para tu proyecto.", ["Next.js", "React", "renderizado"]],
  ["agencia-vs-freelance-desarrollo-web", "estrategia", "2026-03-03", 6, "Agencia vs. Freelance para Desarrollo Web en Colombia: Pros, Contras y Costos Reales", "Cuándo conviene un freelance y cuándo una agencia para tu página web en Colombia: precios, garantías, equipo y continuidad.", ["agencia", "freelance", "contratación"], true],
  ["shopify-vs-woocommerce-colombia", "ecommerce", "2026-03-02", 7, "Shopify vs. WooCommerce en Colombia (2026): Costos Reales, Pasarelas y Cuál Elegir", "Shopify frente a WooCommerce en Colombia: costos mensuales, comisiones extra, pasarelas locales, propiedad de datos y opción headless.", ["Shopify", "WooCommerce", "Colombia"], true],
  ["nextjs-vs-wordpress", "comparativas", "2026-03-01", 7, "Next.js vs. WordPress en 2026: Comparativa Técnica, Costos y Cuándo Elegir Cada Uno", "WordPress frente a Next.js en precio, administración, velocidad, seguridad y escalabilidad, con datos de rendimiento y casos de uso.", ["Next.js", "WordPress", "velocidad"], true],
  ["como-elegir-empresa-desarrollo-web-colombia", "estrategia", "2026-02-25", 7, "Cómo Elegir una Empresa de Desarrollo Web en Colombia en 2026", "Cinco criterios para contratar bien tu página web en Colombia: código, precios claros, portafolio real, SEO técnico y propiedad del código.", ["empresa desarrollo web", "contratación", "Colombia"], true],
  ["como-crear-pagina-web-2026", "desarrollo-web", "2026-02-20", 6, "Cómo Crear una Página Web en 2026: Guía Completa de Arquitectura y Tecnologías", "El estándar técnico de una página web profesional en 2026: constructores vs. código, infraestructura edge, arquitectura headless y SEO desde la raíz.", ["crear página web", "arquitectura", "2026"]],
  ["como-crear-pagina-web-profesional", "desarrollo-web", "2026-02-19", 6, "Página Web Corporativa Profesional: Estándares Técnicos y Requisitos B2B", "Los estándares que separan una web corporativa profesional de una amateur: infraestructura, arquitectura, Core Web Vitals, seguridad y accesibilidad.", ["web corporativa", "B2B", "estándares"], true],
  ["seo-desde-la-raiz-crear-pagina", "seo-geo", "2026-02-15", 5, "¿Por qué el SEO debe Planificarse desde la Arquitectura Inicial de una Web?", "Por qué el SEO técnico se decide al diseñar la arquitectura: renderizado, jerarquía, datos estructurados y velocidad, y cuánto cuesta corregirlo después.", ["SEO técnico", "arquitectura", "desarrollo"], true],
];

/**
 * Fecha de la última actualización de contenido de los artículos de ES_ONLY (slug → yyyy-mm-dd).
 * La usa la skill actualizar-blog: el artículo muestra "Actualizado" con esta fecha y el sitemap la toma.
 */
const REFRESHED: Record<string, string> = {
  "que-es-una-api-y-para-que-sirve": "2026-10-26",
};

const BASE: PostMeta[] = ES_ONLY.map(([slug, category, date, minutes, title, description, tags, interactive]) => {
  const en = EN_META[slug];
  return {
    slug,
    category,
    date,
    // La revisión nunca puede ser anterior a la publicación.
    updated: [date, en ? "2026-10-16" : "2026-10-14", REFRESHED[slug] ?? ""].sort().pop()!,
    minutes,
    interactive: !!interactive,
    color: COLOR[category],
    langs: en ? ["es", "en"] : ["es"],
    title: en ? { es: title, en: en[0] } : { es: title },
    description: en ? { es: description, en: en[1] } : { es: description },
    tags: en ? { es: tags, en: en[2] } : { es: tags },
  };
});

/** Artículos con versión en español e inglés. */
const BILINGUAL: PostMeta[] = [
  {
    slug: "cuanto-cuesta-una-pagina-web-en-colombia",
    category: "precios",
    date: "2026-02-21",
    updated: "2026-10-14",
    minutes: 8,
    interactive: true,
    featured: true,
    color: "green",
    langs: ["es", "en"],
    title: { es: "¿Cuánto Cuesta una Página Web en Colombia en 2026? Precios Reales y Guía", en: "How much does a website cost in Colombia in 2026? Real prices and guide" },
    description: {
      es: "Precios reales de landing pages, tiendas virtuales, sitios corporativos y software a la medida en Colombia, qué cambia el valor y una calculadora en tu moneda.",
      en: "Real prices for landing pages, online stores, corporate sites and custom software in Colombia, what changes the cost, and a calculator in your currency.",
    },
    tags: { es: ["precios", "presupuesto", "landing page", "tienda virtual"], en: ["pricing", "budget", "landing page", "online store"] },
  },
  {
    slug: "costo-oculto-pagina-web-lenta",
    category: "desarrollo-web",
    date: "2026-02-10",
    updated: "2026-10-14",
    minutes: 6,
    interactive: true,
    color: "red",
    langs: ["es", "en"],
    title: { es: "El Costo Oculto de una Página Web Lenta y Cómo Optimizar su Rendimiento", en: "The hidden cost of a slow website and how to optimize its performance" },
    description: {
      es: "Cada segundo de carga se lleva visitas y ventas. Simula cuánto pierde tu negocio por la lentitud y qué hacer para que tu sitio cargue en menos de un segundo.",
      en: "Every second of load time takes visits and sales with it. Simulate how much your business loses to slowness and what to do so your site loads in under a second.",
    },
    tags: { es: ["velocidad", "conversión", "Core Web Vitals"], en: ["speed", "conversion", "Core Web Vitals"] },
  },
  {
    slug: "desarrollo-web-medida-vs-plantillas",
    category: "comparativas",
    date: "2026-02-18",
    updated: "2026-10-14",
    minutes: 7,
    interactive: true,
    color: "green",
    langs: ["es", "en"],
    title: { es: "Desarrollo Web a Medida vs. Plantillas CMS Genéricas: Análisis Técnico", en: "Custom web development vs. generic CMS templates: a technical analysis" },
    description: {
      es: "Comparamos una web hecha a la medida con una plantilla de WordPress o un constructor visual en diseño, velocidad, SEO, costos a tres años y propiedad del código.",
      en: "We compare a custom-built website with a WordPress theme or a visual builder on design, speed, SEO, three-year cost and code ownership.",
    },
    tags: { es: ["a la medida", "plantillas", "WordPress", "diseño único"], en: ["custom", "templates", "WordPress", "unique design"] },
  },
  {
    slug: "geo-vs-seo-diferencias-motores-ia",
    category: "seo-geo",
    date: "2026-08-12",
    updated: "2026-10-14",
    minutes: 7,
    interactive: true,
    color: "yellow",
    langs: ["es", "en"],
    title: { es: "GEO vs. SEO: Diferencias Clave y Cómo Preparar tu Web para Motores de IA", en: "GEO vs. SEO: key differences and how to prepare your website for AI engines" },
    description: {
      es: "Qué es la optimización para motores generativos (GEO), en qué se diferencia del SEO y una lista de verificación para que ChatGPT, Gemini y Perplexity citen tu negocio.",
      en: "What generative engine optimization (GEO) is, how it differs from SEO, and a checklist so ChatGPT, Gemini and Perplexity cite your business.",
    },
    tags: { es: ["GEO", "SEO", "inteligencia artificial", "ChatGPT"], en: ["GEO", "SEO", "artificial intelligence", "ChatGPT"] },
  },
];

/**
 * Todos los artículos. Para agregar uno nuevo: su ficha aquí y su contenido en ./posts
 * (registrado en ./index.ts).
 */
export const POSTS: PostMeta[] = [...BILINGUAL, ...BASE];

export const POST_META = POSTS;

const toCard = (p: PostMeta, lang: Lang): PostCard => {
  const has = p.langs.includes(lang);
  const l: Lang = has ? lang : "es";
  return {
    ...p,
    title: p.title[l] ?? p.title.es,
    description: p.description[l] ?? p.description.es,
    tags: p.tags[l] ?? p.tags.es,
    href: `/blog/${p.slug}`,
    lang: l,
    fallback: !has,
  };
};

/** Artículos en el idioma pedido, del más reciente al más antiguo. */
export const postsFor = (lang: Lang): PostCard[] =>
  POSTS.slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => toCard(p, lang));

export const getPostCard = (slug: string, lang: Lang) => {
  const p = POSTS.find((x) => x.slug === slug);
  return p ? toCard(p, lang) : undefined;
};

export const formatDate = (iso: string, lang: Lang) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === "en" ? "en-US" : "es-CO", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
