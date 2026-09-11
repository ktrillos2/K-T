export interface BlogCluster {
  id: "desarrollo-web" | "ecommerce" | "seo-geo" | "software"
  name: string
  shortName: string
  badge: string
  description: string
  pillarSlug: string
  pillarTitle: string
  posts: Array<{
    slug: string
    title: string
    shortRole: string
  }>
}

export const blogClusters: Record<string, BlogCluster> = {
  "desarrollo-web": {
    id: "desarrollo-web",
    name: "Desarrollo Web & Arquitectura",
    shortName: "Desarrollo Web",
    badge: "🌐 Desarrollo Web",
    description:
      "Guías de arquitectura, costos, hosting, dominios y buenas prácticas para construir plataformas web modernas y ultra rápidas.",
    pillarSlug: "como-crear-pagina-web-2026",
    pillarTitle: "Cómo Crear una Página Web en 2026: Guía Completa de Arquitectura",
    posts: [
      {
        slug: "como-crear-pagina-web-2026",
        title: "Cómo Crear una Página Web en 2026: Guía Completa de Arquitectura",
        shortRole: "Guía Pilar",
      },
      {
        slug: "cuanto-cuesta-una-pagina-web-en-colombia",
        title: "¿Cuánto Cuesta una Página Web en Colombia? Factores y Costos Ocultos",
        shortRole: "Costos & Factores",
      },
      {
        slug: "que-es-un-dominio-web-como-elegir",
        title: "Qué es un Dominio Web y Cómo Elegir el Mejor para tu Negocio",
        shortRole: "Dominios & DNS",
      },
      {
        slug: "que-es-un-hosting-web-y-como-funciona",
        title: "Qué es un Hosting Web y Cómo Funciona: Servidores y Edge CDN",
        shortRole: "Hosting & Servidores",
      },
      {
        slug: "cuanto-cuesta-mantenimiento-pagina-web-colombia",
        title: "¿Cuánto Cuesta el Mantenimiento de una Página Web en Colombia?",
        shortRole: "Mantenimiento & SLAs",
      },
      {
        slug: "como-crear-una-pagina-web-desde-cero-2026",
        title: "Checklist y Hoja de Ruta: Cómo Crear una Web Desde Cero Paso a Paso",
        shortRole: "Checklist Principiantes",
      },
      {
        slug: "como-crear-pagina-web-profesional",
        title: "Página Web Corporativa Profesional: Estándares Técnicos y Requisitos B2B",
        shortRole: "Estándares B2B",
      },
      {
        slug: "como-crear-una-pagina-web-gratis-limitaciones",
        title: "Cómo Crear una Página Web Gratis: Opciones, Limitaciones y Alternativas",
        shortRole: "Constructores Gratis",
      },
      {
        slug: "nextjs-vs-wordpress",
        title: "Next.js vs. WordPress: Comparativa Técnica y Costos",
        shortRole: "Tecnologías",
      },
      {
        slug: "desarrollo-web-medida-vs-plantillas",
        title: "Desarrollo Web a Medida vs. Plantillas CMS Genéricas",
        shortRole: "Medida vs Plantilla",
      },
    ],
  },

  ecommerce: {
    id: "ecommerce",
    name: "E-Commerce & Ventas Online",
    shortName: "E-Commerce",
    badge: "🛒 E-Commerce",
    description:
      "Estrategias para vender en internet en Colombia: pasarelas bancarias locales, plataformas e-commerce y arquitectura headless.",
    pillarSlug: "como-crear-una-tienda-online-desde-cero",
    pillarTitle: "Cómo Crear una Tienda Online Desde Cero: Guía Completa de E-commerce",
    posts: [
      {
        slug: "como-crear-una-tienda-online-desde-cero",
        title: "Cómo Crear una Tienda Online Desde Cero: Guía Completa de E-commerce",
        shortRole: "Guía Pilar",
      },
      {
        slug: "cuanto-cuesta-una-tienda-virtual-en-colombia-2026",
        title: "¿Cuánto Cuesta una Tienda Virtual en Colombia? Comisiones y Gastos Ocultos",
        shortRole: "Costos de E-commerce",
      },
      {
        slug: "shopify-vs-woocommerce-colombia",
        title: "Shopify vs. WooCommerce en Colombia: Costos Reales y Pasarelas",
        shortRole: "Comparativa Plataformas",
      },
      {
        slug: "wompi-vs-mercado-pago-vs-payu-colombia",
        title: "Wompi vs. Mercado Pago vs. PayU en Colombia: Tarifas y Comisiones",
        shortRole: "Pasarelas Colombia",
      },
      {
        slug: "que-es-un-ecommerce-headless-ventajas",
        title: "¿Qué es un E-commerce Headless y Cuándo Conviene Utilizarlo?",
        shortRole: "Headless Commerce",
      },
      {
        slug: "wordpress-vs-shopify-comparativa",
        title: "WordPress vs. Shopify: ¿Cuál es Mejor para Vender Online?",
        shortRole: "WordPress vs Shopify",
      },
      {
        slug: "shopify-vs-wix-comparativa-ecommerce",
        title: "Shopify vs. Wix: ¿Cuál es Mejor para Vender Online en 2026?",
        shortRole: "Shopify vs Wix",
      },
      {
        slug: "pagina-web-vs-tienda-virtual",
        title: "Página Web vs. Tienda Virtual: Diferencias y Cuándo Elegir",
        shortRole: "Web vs Tienda",
      },
    ],
  },

  "seo-geo": {
    id: "seo-geo",
    name: "SEO & Posicionamiento en IA (GEO)",
    shortName: "SEO & GEO",
    badge: "🔍 SEO & GEO",
    description:
      "Técnicas de posicionamiento en Google, optimización técnica y estrategias GEO para ser citado por ChatGPT, Gemini y Perplexity.",
    pillarSlug: "que-es-el-seo-y-como-funciona-guia",
    pillarTitle: "Qué es el SEO y Cómo Funciona: Guía Completa de Posicionamiento",
    posts: [
      {
        slug: "que-es-el-seo-y-como-funciona-guia",
        title: "Qué es el SEO y Cómo Funciona: Guía Completa de Posicionamiento",
        shortRole: "Guía Pilar",
      },
      {
        slug: "como-aparecer-en-google-guia-paso-a-paso",
        title: "Cómo Aparecer en Google: Indexación en Search Console y Sitemaps",
        shortRole: "Indexación en Google",
      },
      {
        slug: "por-que-mi-pagina-web-no-aparece-en-google",
        title: "Por Qué tu Web no Aparece en Google: Diagnóstico y Errores Técnicos",
        shortRole: "Diagnóstico de Errores",
      },
      {
        slug: "geo-vs-seo-diferencias-motores-ia",
        title: "GEO vs. SEO: Diferencias Clave y Cómo Preparar tu Web para Motores de IA",
        shortRole: "GEO vs SEO",
      },
      {
        slug: "como-aparecer-en-chatgpt-2026",
        title: "Cómo Aparecer en ChatGPT Search: Rastreo de GPTBot, Robots.txt y Citas IA",
        shortRole: "Rastreo GPTBot",
      },
      {
        slug: "seo-para-chatgpt-optimizacion-ia",
        title: "Optimización GEO: Cómo Lograr que los Modelos de IA Citen tu Marca",
        shortRole: "Citas & Autoridad IA",
      },
      {
        slug: "seo-desde-la-raiz-crear-pagina",
        title: "¿Por qué el SEO debe Planificarse desde la Arquitectura Inicial?",
        shortRole: "Arquitectura SEO",
      },
      {
        slug: "google-ai-overviews-ai-mode-seo",
        title: "Google AI Overviews y AI Mode: Cómo Adaptar tu Estrategia SEO",
        shortRole: "AI Overviews",
      },
      {
        slug: "llms-txt-2026",
        title: "Estándar llms.txt: La Guía Definitiva para Indexación con Agentes",
        shortRole: "Estándar llms.txt",
      },
    ],
  },

  software: {
    id: "software",
    name: "Software a Medida, APIs & SaaS",
    shortName: "Software & APIs",
    badge: "💻 Software & APIs",
    description:
      "Ingeniería de software empresarial, desarrollo a medida, arquitecturas en la nube, APIs y automatización inteligente.",
    pillarSlug: "cuanto-cuesta-desarrollar-software-a-medida-colombia",
    pillarTitle: "Cuánto Cuesta Desarrollar Software a Medida: Modelos y Horas",
    posts: [
      {
        slug: "cuanto-cuesta-desarrollar-software-a-medida-colombia",
        title: "Cuánto Cuesta Desarrollar Software a Medida: Modelos y Horas",
        shortRole: "Guía Pilar",
      },
      {
        slug: "software-a-medida-vs-saas-comparativa",
        title: "Software a Medida vs. SaaS: Costos, Ventajas y Cuándo Elegir Cada Uno",
        shortRole: "Custom vs SaaS",
      },
      {
        slug: "excel-vs-erp-vs-software-a-medida",
        title: "Excel vs. ERP vs. Software a Medida: Cuándo Migrar la Operación",
        shortRole: "Migración de Excel",
      },
      {
        slug: "que-es-una-api-y-para-que-sirve",
        title: "Qué es una API y Para Qué Sirve: Explicado Fácil con Ejemplos",
        shortRole: "Fundamentos APIs",
      },
      {
        slug: "cuanto-cuesta-automatizar-procesos-ia-colombia",
        title: "¿Cuánto Cuesta Automatizar Procesos con IA en Colombia?",
        shortRole: "Automatización con IA",
      },
      {
        slug: "calcular-roi-automatizacion-software-ia",
        title: "Cómo Calcular el Retorno de Inversión (ROI) en Software y Automatizaciones",
        shortRole: "Cálculo de ROI",
      },
    ],
  },
}

export function getClusterForPost(slug: string): BlogCluster | undefined {
  return Object.values(blogClusters).find((cluster) =>
    cluster.posts.some((p) => p.slug === slug)
  )
}

export function getClusterById(id: string): BlogCluster | undefined {
  return blogClusters[id]
}

export function getAllClusters(): BlogCluster[] {
  return Object.values(blogClusters)
}
