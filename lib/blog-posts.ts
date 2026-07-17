export const blogPosts = [
  {
    slug: "como-crear-pagina-web-2026",
    title: "Cómo crear una página web profesional: guía actualizada",
    excerpt:
      "Conoce el proceso para planificar, diseñar, desarrollar y publicar una página web preparada para crecer.",
    publishedAt: "2026-02-20",
    modifiedAt: "2026-07-17",
    readTime: "8 min de lectura",
  },
  {
    slug: "como-crear-pagina-web-profesional",
    title: "Desarrollo web profesional: guía para empresas",
    excerpt:
      "Cómo estructurar una plataforma empresarial con objetivos claros, experiencia de usuario, rendimiento y medición.",
    publishedAt: "2026-02-19",
    modifiedAt: "2026-07-17",
    readTime: "7 min de lectura",
  },
  {
    slug: "desarrollo-web-medida-vs-plantillas",
    title: "Desarrollo web a medida vs. plantillas: cómo elegir",
    excerpt:
      "Compara costos, tiempos, flexibilidad, mantenimiento y rendimiento antes de decidir cómo construir tu sitio.",
    publishedAt: "2026-02-18",
    modifiedAt: "2026-07-17",
    readTime: "6 min de lectura",
  },
  {
    slug: "seo-desde-la-raiz-crear-pagina",
    title: "Por qué el SEO debe planearse desde el inicio de una web",
    excerpt:
      "Arquitectura, contenido, rastreo, datos estructurados y rendimiento deben definirse antes del lanzamiento.",
    publishedAt: "2026-02-15",
    modifiedAt: "2026-07-17",
    readTime: "7 min de lectura",
  },
  {
    slug: "costo-oculto-pagina-web-lenta",
    title: "El costo de una página web lenta y cómo mejorarlo",
    excerpt:
      "Una guía para detectar problemas de carga, mejorar Core Web Vitals y reducir fricción en la conversión.",
    publishedAt: "2026-02-10",
    modifiedAt: "2026-07-17",
    readTime: "5 min de lectura",
  },
] as const

export type BlogPostSummary = (typeof blogPosts)[number]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
