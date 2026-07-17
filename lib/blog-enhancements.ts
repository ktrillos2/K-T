import type { FaqItem } from "@/lib/seo"

export const blogEnhancements: Record<string, {
  servicePath: string
  serviceLabel: string
  faqs: FaqItem[]
  sources: Array<{ label: string; href: string }>
}> = {
  "como-crear-pagina-web-2026": {
    servicePath: "/servicios/diseno-web-corporativo",
    serviceLabel: "Diseño web corporativo",
    faqs: [
      { question: "¿Qué se necesita antes de crear una página web?", answer: "Conviene definir el objetivo, el público, las secciones, las funciones, el contenido disponible, el presupuesto y la fecha esperada. Un brief claro reduce cambios y permite comparar propuestas con el mismo alcance." },
      { question: "¿Es mejor una plantilla o un desarrollo personalizado?", answer: "Depende del proyecto. Una plantilla puede ser suficiente para una necesidad sencilla y con poca diferenciación. Un desarrollo personalizado resulta más apropiado cuando se necesitan integraciones, rendimiento, identidad visual propia o evolución a largo plazo." },
      { question: "¿Cuánto tarda en publicarse una web profesional?", answer: "El plazo depende del alcance, la entrega de contenido, las revisiones y las integraciones. Una landing page suele requerir menos tiempo que un sitio corporativo, una tienda virtual o una aplicación a medida." },
    ],
    sources: [
      { label: "Google Search Essentials", href: "https://developers.google.com/search/docs/essentials" },
      { label: "Core Web Vitals", href: "https://web.dev/articles/vitals" },
      { label: "Next.js: optimización", href: "https://nextjs.org/docs/app/building-your-application/optimizing" },
    ],
  },
  "como-crear-pagina-web-profesional": {
    servicePath: "/servicios/desarrollo-web-a-medida",
    serviceLabel: "Desarrollo web a medida",
    faqs: [
      { question: "¿Qué hace que una página web sea profesional?", answer: "Una web profesional combina objetivos claros, contenido comprensible, diseño coherente, navegación accesible, buen rendimiento, seguridad, medición y un proceso de mantenimiento posterior al lanzamiento." },
      { question: "¿Next.js es obligatorio para una web empresarial?", answer: "No. Next.js es una opción sólida para muchos proyectos, pero la tecnología debe elegirse según el alcance, el equipo, el contenido, las integraciones y el mantenimiento. No existe una plataforma única para todos los casos." },
      { question: "¿Cómo se mide si una web funciona?", answer: "Se deben definir conversiones y métricas como solicitudes, ventas, llamadas, formularios, calidad del tráfico, velocidad, errores y comportamiento del usuario. Las visitas por sí solas no demuestran resultados comerciales." },
    ],
    sources: [
      { label: "W3C Web Accessibility Initiative", href: "https://www.w3.org/WAI/" },
      { label: "Google: fundamentos de SEO", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
      { label: "Next.js App Router", href: "https://nextjs.org/docs/app" },
    ],
  },
  "desarrollo-web-medida-vs-plantillas": {
    servicePath: "/servicios/desarrollo-web-a-medida",
    serviceLabel: "Desarrollo web a medida",
    faqs: [
      { question: "¿Una plantilla siempre es más lenta?", answer: "No. Una plantilla bien configurada puede funcionar correctamente. Los problemas aparecen cuando se acumulan funciones, scripts, plugins o estilos innecesarios. La evaluación debe hacerse sobre la implementación real y no solo sobre la plataforma." },
      { question: "¿Cuándo conviene desarrollar a medida?", answer: "Conviene cuando el negocio necesita procesos propios, integraciones, permisos, automatizaciones, una experiencia diferenciada o una evolución que una plantilla no puede cubrir de forma sostenible." },
      { question: "¿Cuál opción cuesta menos a largo plazo?", answer: "Depende del mantenimiento y la evolución. Una plantilla puede reducir el costo inicial, mientras que una solución a medida puede evitar limitaciones futuras. La comparación debe incluir licencias, soporte, migraciones y cambios previstos." },
    ],
    sources: [
      { label: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/" },
      { label: "Chrome DevTools Performance", href: "https://developer.chrome.com/docs/devtools/performance" },
      { label: "Web performance", href: "https://web.dev/learn/performance" },
    ],
  },
  "seo-desde-la-raiz-crear-pagina": {
    servicePath: "/servicios/seo-tecnico",
    serviceLabel: "SEO técnico",
    faqs: [
      { question: "¿El SEO se puede agregar después de publicar?", answer: "Sí, pero algunas decisiones son más fáciles de resolver desde el inicio: arquitectura, URLs, renderizado, jerarquía, rendimiento, datos estructurados y migraciones. Corregirlas después puede requerir más trabajo y redirecciones." },
      { question: "¿Los datos estructurados garantizan resultados enriquecidos?", answer: "No. Ayudan a describir el contenido, pero deben coincidir con lo visible y cumplir las políticas del buscador. La presencia de marcado válido no garantiza que se muestre un resultado enriquecido." },
      { question: "¿Un sitemap hace que Google posicione una web?", answer: "No. El sitemap facilita descubrir URLs canónicas, pero no sustituye el contenido útil, el enlazado interno, la autoridad ni la calidad técnica. Tampoco garantiza la indexación de todas las páginas." },
    ],
    sources: [
      { label: "Google Search Central", href: "https://developers.google.com/search" },
      { label: "Políticas de datos estructurados", href: "https://developers.google.com/search/docs/appearance/structured-data/sd-policies" },
      { label: "Sitemaps", href: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview" },
    ],
  },
  "costo-oculto-pagina-web-lenta": {
    servicePath: "/servicios/mantenimiento-web",
    serviceLabel: "Mantenimiento y rendimiento web",
    faqs: [
      { question: "¿Qué hace que una página web cargue lento?", answer: "Las causas frecuentes incluyen imágenes demasiado grandes, JavaScript excesivo, fuentes, scripts externos, consultas lentas, falta de caché y componentes que bloquean el renderizado. La solución comienza midiendo cada URL y dispositivo." },
      { question: "¿Lighthouse y Core Web Vitals son lo mismo?", answer: "No. Lighthouse ofrece una medición de laboratorio en condiciones simuladas. Core Web Vitals también puede evaluarse con datos reales de usuarios. Ambos son útiles, pero deben interpretarse en conjunto." },
      { question: "¿Cambiar de hosting soluciona todos los problemas?", answer: "No. Un servidor más rápido puede mejorar el tiempo de respuesta, pero no corrige imágenes pesadas, JavaScript innecesario, terceros, errores de caché o una arquitectura deficiente. Se necesita una auditoría completa." },
    ],
    sources: [
      { label: "PageSpeed Insights", href: "https://pagespeed.web.dev/" },
      { label: "Core Web Vitals", href: "https://web.dev/articles/vitals" },
      { label: "Optimización de imágenes en Next.js", href: "https://nextjs.org/docs/app/api-reference/components/image" },
    ],
  },
}
