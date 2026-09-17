export interface BlogPostItem {
  slug: string
  title: string
  excerpt: string
  category: "Comparativas" | "Precios & Guías" | "Ingeniería & SEO"
  publishedAt: string
  modifiedAt?: string
  readTime: string
}

export const blogPosts: BlogPostItem[] = [
  // ─── ARTÍCULOS RECIENTES (ÚLTIMO TRIMESTRE 2026) ─────────────
  {
    slug: "como-aparecer-en-chatgpt-2026",
    title: "Cómo Aparecer en ChatGPT Search: OAI-SearchBot, Robots.txt y Citas IA",
    excerpt:
      "Aprende la diferencia técnica entre OAI-SearchBot (ChatGPT Search) y GPTBot (entrenamiento), cómo configurar tu robots.txt para ganar citas y optimizar para GEO.",
    category: "Ingeniería & SEO",
    publishedAt: "2026-08-19",
    modifiedAt: "2026-08-19",
    readTime: "8 min de lectura",
  },
  {
    slug: "como-crear-una-pagina-web-desde-cero-2026",
    title: "Checklist y Hoja de Ruta: Cómo Crear una Web Desde Cero Paso a Paso",
    excerpt:
      "Hoja de ruta cronológica paso a paso para crear un sitio web desde cero: selección de dominio, configuración de hosting, prototipado y lanzamiento.",
    category: "Precios & Guías",
    publishedAt: "2026-08-18",
    modifiedAt: "2026-08-19",
    readTime: "12 min de lectura",
  },
  {
    slug: "seo-para-chatgpt-optimizacion-ia",
    title: "Optimización GEO: Cómo Lograr que los Modelos de IA Citen tu Marca",
    excerpt:
      "Estrategia GEO (Generative Engine Optimization): optimiza tu marca para ChatGPT, Perplexity y Gemini mediante autoridad de entidad, co-ocurrencia semántica y Schema.",
    category: "Ingeniería & SEO",
    publishedAt: "2026-08-16",
    modifiedAt: "2026-08-19",
    readTime: "9 min de lectura",
  },
  {
    slug: "como-crear-una-pagina-web-gratis-limitaciones",
    title: "Cómo Crear una Página Web Gratis: Opciones, Limitaciones y Alternativas",
    excerpt:
      "Análisis honesto sobre creadores gratuitos de páginas web: dominios con publicidad, falta de SEO, lentitud y cuándo dar el salto a una web profesional.",
    category: "Precios & Guías",
    publishedAt: "2026-08-14",
    modifiedAt: "2026-08-19",
    readTime: "8 min de lectura",
  },
  {
    slug: "geo-vs-seo-diferencias-motores-ia",
    title: "GEO vs. SEO: Diferencias Clave y Cómo Preparar tu Web para Motores de IA",
    excerpt:
      "De Search Engine Optimization a Generative Engine Optimization: qué cambia en la búsqueda generativa, cómo evalúan los LLMs la relevancia y cómo adaptar tu web.",
    category: "Ingeniería & SEO",
    publishedAt: "2026-08-12",
    modifiedAt: "2026-08-19",
    readTime: "7 min de lectura",
  },
  {
    slug: "que-es-el-seo-y-como-funciona-guia",
    title: "Qué es el SEO y Cómo Funciona: Guía Definitiva para Principiantes",
    excerpt:
      "Aprende cómo funciona el posicionamiento en buscadores: SEO On-page, SEO técnico, palabras clave, enlaces de autoridad y cómo posicionar en Google.",
    category: "Ingeniería & SEO",
    publishedAt: "2026-08-10",
    modifiedAt: "2026-08-19",
    readTime: "10 min de lectura",
  },
  {
    slug: "por-que-mi-pagina-web-no-aparece-en-google",
    title: "Por Qué tu Web no Aparece en Google: Diagnóstico y Errores Técnicos",
    excerpt:
      "Checklist técnico para diagnosticar y solucionar problemas de indexación: noindex accidental, canonicals rotos, bloqueo en robots.txt y desindexación en Search Console.",
    category: "Ingeniería & SEO",
    publishedAt: "2026-08-08",
    modifiedAt: "2026-08-19",
    readTime: "10 min de lectura",
  },
  {
    slug: "como-aparecer-en-google-guia-paso-a-paso",
    title: "Cómo Aparecer en Google: Indexación en Search Console y Sitemaps",
    excerpt:
      "Aprende paso a paso cómo indexar tu sitio web en Google Search Console, enviar tu sitemap XML y conseguir tus primeros rankings orgánicos.",
    category: "Ingeniería & SEO",
    publishedAt: "2026-08-06",
    modifiedAt: "2026-08-19",
    readTime: "9 min de lectura",
  },
  {
    slug: "cuanto-cuesta-desarrollar-software-a-medida-colombia",
    title: "¿Cuánto Cuesta Desarrollar Software a Medida en Colombia en 2026?",
    excerpt:
      "Precios reales en COP/USD, desglose de costos por fases (arquitectura, backend, frontend, bases de datos en la nube), modelos de contratación y tiempos de desarrollo.",
    category: "Precios & Guías",
    publishedAt: "2026-08-03",
    modifiedAt: "2026-08-19",
    readTime: "11 min de lectura",
  },
  {
    slug: "que-es-un-dominio-web-como-elegir",
    title: "Qué es un Dominio Web y Cómo Elegir el Mejor para tu Negocio",
    excerpt:
      "Todo lo que necesitas saber sobre dominios web (.com, .co, .com.co), registradores confiables, precios y cómo elegir un nombre de marca memorable.",
    category: "Precios & Guías",
    publishedAt: "2026-08-01",
    modifiedAt: "2026-08-19",
    readTime: "7 min de lectura",
  },
  {
    slug: "software-a-medida-vs-saas-comparativa",
    title: "Software a Medida vs. SaaS: Costos, Ventajas y Cuándo Elegir Cada Uno",
    excerpt:
      "Comparativa entre contratar un SaaS comercial por suscripción vs. construir software propietario a medida: retorno de inversión (ROI), propiedad del código y escalabilidad.",
    category: "Comparativas",
    publishedAt: "2026-07-29",
    modifiedAt: "2026-08-19",
    readTime: "8 min de lectura",
  },
  {
    slug: "que-es-un-hosting-web-y-como-funciona",
    title: "Qué es un Hosting Web y Cómo Funciona: Servidores, Tipos y Guía",
    excerpt:
      "Explicación clara y accesible sobre el alojamiento web: hosting compartido, VPS, servidores dedicados y arquitectura Edge Serverless en la nube.",
    category: "Precios & Guías",
    publishedAt: "2026-07-27",
    modifiedAt: "2026-08-19",
    readTime: "8 min de lectura",
  },
  {
    slug: "cuanto-cuesta-una-tienda-virtual-en-colombia-2026",
    title: "¿Cuánto Cuesta una Tienda Virtual en Colombia en 2026? Guía de Costos",
    excerpt:
      "Costos reales para montar un e-commerce en Colombia: pasarelas locales (Wompi, Bold, PayU), comisiones por transacción, hosting, catálogo y costos ocultos.",
    category: "Precios & Guías",
    publishedAt: "2026-07-25",
    modifiedAt: "2026-08-19",
    readTime: "9 min de lectura",
  },
  {
    slug: "wordpress-vs-shopify-comparativa",
    title: "WordPress vs. Shopify: ¿Cuál es Mejor para Crear una Web o Tienda Online?",
    excerpt:
      "Comparativa a fondo entre WordPress (WooCommerce) y Shopify: costos mensuales, comisiones por venta, flexibilidad de diseño y facilidad de gestión.",
    category: "Comparativas",
    publishedAt: "2026-07-22",
    modifiedAt: "2026-08-19",
    readTime: "9 min de lectura",
  },
  {
    slug: "wompi-vs-mercado-pago-vs-payu-colombia",
    title: "Wompi vs. Mercado Pago vs. PayU en Colombia: Costos y Comparativa",
    excerpt:
      "Análisis comparativo de pasarelas de pago en Colombia: comisiones por tarjeta, PSE, transferencias Nequi/Daviplata, tiempos de desembolso y facilidad de integración técnica.",
    category: "Comparativas",
    publishedAt: "2026-07-20",
    modifiedAt: "2026-08-19",
    readTime: "8 min de lectura",
  },
  {
    slug: "wix-vs-wordpress-diferencias-precios",
    title: "Wix vs. WordPress: Diferencias, Precios Reales y Cuál Elegir en 2026",
    excerpt:
      "Analizamos facilidad de uso, propiedad del código, rendimiento de carga, costos de renovación anual y capacidades SEO entre Wix y WordPress.",
    category: "Comparativas",
    publishedAt: "2026-07-18",
    modifiedAt: "2026-08-19",
    readTime: "8 min de lectura",
  },
  {
    slug: "que-es-un-ecommerce-headless-ventajas",
    title: "¿Qué es un E-commerce Headless y Cuándo Conviene Utilizarlo?",
    excerpt:
      "Arquitectura de comercio desacoplado: frontend ultrarrápido en Next.js conectado a Shopify o WooCommerce por API. Beneficios de conversión, velocidad y diseño a medida.",
    category: "Ingeniería & SEO",
    publishedAt: "2026-07-16",
    modifiedAt: "2026-08-19",
    readTime: "7 min de lectura",
  },
  {
    slug: "shopify-vs-wix-comparativa-ecommerce",
    title: "Shopify vs. Wix: ¿Cuál es Mejor para Vender Online en 2026?",
    excerpt:
      "Comparativa de plataformas de comercio electrónico: catálogo, pasarelas de pago, procesamiento de pedidos, comisiones y escalabilidad de ventas.",
    category: "Comparativas",
    publishedAt: "2026-07-14",
    modifiedAt: "2026-08-19",
    readTime: "8 min de lectura",
  },
  {
    slug: "cuanto-cuesta-mantenimiento-pagina-web-colombia",
    title: "¿Cuánto Cuesta el Mantenimiento de una Página Web en Colombia?",
    excerpt:
      "Tarifas mensuales y anuales de soporte web en Colombia: actualizaciones de seguridad, backups en la nube, optimización de velocidad, parches técnicos y soporte continuo.",
    category: "Precios & Guías",
    publishedAt: "2026-07-12",
    modifiedAt: "2026-08-19",
    readTime: "7 min de lectura",
  },
  {
    slug: "como-crear-una-tienda-online-desde-cero",
    title: "Cómo Crear una Tienda Online Desde Cero: Guía Completa de E-commerce",
    excerpt:
      "Aprende paso a paso cómo montar una tienda online exitosa: elección de plataforma, configuración de catálogo, pasarelas de pago y logística de envíos.",
    category: "Precios & Guías",
    publishedAt: "2026-07-09",
    modifiedAt: "2026-08-19",
    readTime: "11 min de lectura",
  },
  {
    slug: "como-usar-chatgpt-para-crear-pagina-web",
    title: "Cómo Usar ChatGPT para Crear una Página Web: Prompts, Código y Estrategia",
    excerpt:
      "Guía práctica para utilizar ChatGPT en la creación de páginas web: redacción de copys de venta, generación de esquemas HTML/CSS y diseño de estructura.",
    category: "Ingeniería & SEO",
    publishedAt: "2026-07-04",
    modifiedAt: "2026-08-19",
    readTime: "9 min de lectura",
  },
  {
    slug: "mejores-herramientas-ia-crear-paginas-web-2026",
    title: "Las Mejores Herramientas de IA para Crear Páginas Web en 2026",
    excerpt:
      "Revisión de las herramientas de inteligencia artificial líderes en desarrollo y diseño web: generadores de código, asistentes de UI/UX y optimizadores de contenido.",
    category: "Ingeniería & SEO",
    publishedAt: "2026-06-28",
    modifiedAt: "2026-08-19",
    readTime: "9 min de lectura",
  },
  {
    slug: "que-es-una-api-y-para-que-sirve",
    title: "Qué es una API y Para Qué Sirve: Explicado Fácil con Ejemplos",
    excerpt:
      "Comprende qué es una API (Application Programming Interface), cómo conecta aplicaciones y por qué es la base de las plataformas web y pasarelas de pago modernas.",
    category: "Ingeniería & SEO",
    publishedAt: "2026-06-22",
    modifiedAt: "2026-08-19",
    readTime: "7 min de lectura",
  },

  // ─── COMPARATIVAS TÉCNICAS Y COMERCIALES ───────────────────────
  {
    slug: "nextjs-vs-wordpress",
    title: "Next.js vs. WordPress en 2026: Comparativa Técnica, Costos y Cuándo Elegir Cada Uno",
    excerpt:
      "Tabla comparativa objetiva entre Next.js y WordPress: precios iniciales, administración, plugins, seguridad, Core Web Vitals y casos de uso recomendados.",
    category: "Comparativas",
    publishedAt: "2026-03-01",
    modifiedAt: "2026-08-19",
    readTime: "8 min de lectura",
  },
  {
    slug: "shopify-vs-woocommerce-colombia",
    title: "Shopify vs. WooCommerce en Colombia (2026): Costos Reales, Pasarelas y Cuál Elegir",
    excerpt:
      "Comparativa para tiendas virtuales en Colombia: costos mensuales en COP/USD, comisiones ocultas, pasarelas locales (Wompi, Bold, PayU) y escalabilidad.",
    category: "Comparativas",
    publishedAt: "2026-03-02",
    modifiedAt: "2026-08-19",
    readTime: "9 min de lectura",
  },
  {
    slug: "agencia-vs-freelance-desarrollo-web",
    title: "Agencia vs. Freelance para Desarrollo Web en Colombia: Pros, Contras y Costos Reales",
    excerpt:
      "Analizamos costos, garantías legales, contratos formales, soporte continuo y calidad técnica entre programadores freelance y agencias en Colombia.",
    category: "Comparativas",
    publishedAt: "2026-03-03",
    modifiedAt: "2026-08-19",
    readTime: "8 min de lectura",
  },
  {
    slug: "nextjs-vs-react",
    title: "Next.js vs. React: Diferencias de Arquitectura, Renderizado y Cuándo Usar Cada Uno",
    excerpt:
      "Explicación técnica entre React puro (SPA/CSR) y Next.js (SSR/SSG): Server Components, indexación en motores de búsqueda, velocidad y cuándo conviene cada uno.",
    category: "Comparativas",
    publishedAt: "2026-03-04",
    modifiedAt: "2026-08-19",
    readTime: "7 min de lectura",
  },
  {
    slug: "pagina-web-vs-tienda-virtual",
    title: "Página Web vs. Tienda Virtual en Colombia: Diferencias, Funcionalidades y Precios",
    excerpt:
      "Diferencias clave entre un sitio web corporativo de captación y una tienda online transaccional con pasarelas de pago y gestión de inventario en Colombia.",
    category: "Comparativas",
    publishedAt: "2026-03-05",
    modifiedAt: "2026-08-19",
    readTime: "8 min de lectura",
  },
  {
    slug: "desarrollo-web-medida-vs-plantillas",
    title: "Desarrollo Web a Medida vs. Plantillas CMS Genéricas: Análisis Técnico",
    excerpt:
      "Compara costos, tiempos, flexibilidad, mantenimiento preventivo y rendimiento antes de decidir cómo construir tu plataforma digital.",
    category: "Comparativas",
    publishedAt: "2026-02-18",
    modifiedAt: "2026-08-19",
    readTime: "6 min de lectura",
  },

  // ─── PRECIOS Y GUÍAS DE CONTRATACIÓN ──────────────────────────
  {
    slug: "cuanto-cuesta-una-pagina-web-en-colombia",
    title: "¿Cuánto Cuesta una Página Web en Colombia en 2026? Precios Reales y Guía",
    excerpt:
      "Tabla de precios reales en COP, desglose de costos de hosting, dominio, pasarelas de pago colombianas y diferencias entre freelance vs agencia.",
    category: "Precios & Guías",
    publishedAt: "2026-02-21",
    modifiedAt: "2026-08-19",
    readTime: "9 min de lectura",
  },
  {
    slug: "como-elegir-empresa-desarrollo-web-colombia",
    title: "Cómo Elegir una Empresa de Desarrollo Web en Colombia en 2026",
    excerpt:
      "Guía completa para contratar una empresa de desarrollo web en Colombia: código a medida vs plantillas, precios, SEO técnico, portafolio y garantías.",
    category: "Precios & Guías",
    publishedAt: "2026-02-25",
    modifiedAt: "2026-08-19",
    readTime: "10 min de lectura",
  },
  {
    slug: "como-crear-pagina-web-2026",
    title: "Cómo Crear una Página Web en 2026: Guía Completa de Arquitectura y Tecnologías",
    excerpt:
      "Guía pilar sobre la arquitectura web moderna en 2026: Server Components, Edge Computing, Core Web Vitals y comparación técnica entre Next.js y CMS tradicionales.",
    category: "Precios & Guías",
    publishedAt: "2026-02-20",
    modifiedAt: "2026-08-19",
    readTime: "8 min de lectura",
  },
  {
    slug: "como-crear-pagina-web-profesional",
    title: "Página Web Corporativa Profesional: Estándares Técnicos y Requisitos B2B",
    excerpt:
      "Estándares de ingeniería indispensables para sitios corporativos y B2B: accesibilidad WCAG, seguridad SSL/HSTS, SLAs de disponibilidad y rendimiento Lighthouse 95+.",
    category: "Precios & Guías",
    publishedAt: "2026-02-19",
    modifiedAt: "2026-08-19",
    readTime: "7 min de lectura",
  },

  // ─── INGENIERÍA Y SEO ─────────────────────────────────────────
  {
    slug: "seo-desde-la-raiz-crear-pagina",
    title: "¿Por qué el SEO debe Planificarse desde la Arquitectura Inicial de una Web?",
    excerpt:
      "El posicionamiento orgánico depende de una base técnica sólida: renderizado eficiente, jerarquía semántica, tiempos de respuesta y Schema JSON-LD.",
    category: "Ingeniería & SEO",
    publishedAt: "2026-02-15",
    modifiedAt: "2026-08-19",
    readTime: "7 min de lectura",
  },
  {
    slug: "costo-oculto-pagina-web-lenta",
    title: "El Costo Oculto de una Página Web Lenta y Cómo Optimizar su Rendimiento",
    excerpt:
      "Conoce cómo la velocidad de carga y las métricas de Core Web Vitals influyen en la retención, tasa de conversión y señales de calidad en Google.",
    category: "Ingeniería & SEO",
    publishedAt: "2026-02-10",
    modifiedAt: "2026-08-19",
    readTime: "5 min de lectura",
  },
]

export function getBlogPost(slug: string): BlogPostItem | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
