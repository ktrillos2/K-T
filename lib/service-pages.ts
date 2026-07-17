import type { FaqItem } from "@/lib/seo"

export type ServicePageData = {
  slug: string
  title: string
  shortTitle: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  summary: string
  serviceType: string
  benefits: Array<{ title: string; description: string }>
  includes: string[]
  idealFor: string[]
  process: Array<{ title: string; description: string }>
  faqs: FaqItem[]
  relatedArticles: Array<{ title: string; href: string }>
}

export const servicePages: Record<string, ServicePageData> = {
  "desarrollo-web-a-medida": {
    slug: "desarrollo-web-a-medida",
    title: "Desarrollo web a medida para empresas",
    shortTitle: "Desarrollo web a medida",
    metaTitle: "Desarrollo Web a Medida en Colombia",
    metaDescription:
      "Creamos páginas y aplicaciones web personalizadas, rápidas y escalables para empresas en Colombia y Latinoamérica.",
    eyebrow: "// Soluciones sin plantillas genéricas",
    summary:
      "Diseñamos y desarrollamos sitios, plataformas y experiencias digitales adaptadas a los procesos, objetivos y necesidades reales de cada empresa. La arquitectura, el contenido y la medición se planifican desde el inicio.",
    serviceType: "Custom web development",
    benefits: [
      { title: "Arquitectura propia", description: "La solución se construye alrededor del negocio, no alrededor de las limitaciones de una plantilla." },
      { title: "Rendimiento medible", description: "Optimizamos imágenes, JavaScript, fuentes y renderizado para reducir fricción en dispositivos reales." },
      { title: "SEO desde el inicio", description: "Estructura semántica, metadatos, rastreo, enlazado y datos estructurados forman parte del desarrollo." },
      { title: "Preparado para crecer", description: "Componentes reutilizables e integraciones que permiten ampliar el proyecto sin rehacerlo por completo." },
    ],
    includes: [
      "Descubrimiento y definición de objetivos",
      "Arquitectura de información y experiencia de usuario",
      "Diseño visual personalizado",
      "Desarrollo frontend y, cuando se requiere, backend",
      "Integraciones con APIs, CMS, CRM o herramientas internas",
      "SEO técnico inicial, analítica y acompañamiento de lanzamiento",
    ],
    idealFor: [
      "Empresas con procesos o funcionalidades particulares",
      "Marcas que necesitan diferenciarse visualmente",
      "Proyectos que requieren integraciones o automatización",
      "Negocios que esperan crecer en tráfico, contenido o usuarios",
    ],
    process: [
      { title: "Diagnóstico", description: "Revisamos objetivos, usuarios, contenido, integraciones y restricciones." },
      { title: "Alcance", description: "Definimos entregables, prioridades, tiempos, responsables y criterios de aceptación." },
      { title: "Diseño", description: "Creamos la estructura y las interfaces antes de desarrollar los componentes." },
      { title: "Desarrollo y pruebas", description: "Construimos, validamos accesibilidad, rendimiento y funcionamiento en distintos dispositivos." },
      { title: "Lanzamiento", description: "Publicamos, medimos y dejamos una ruta clara de mantenimiento y evolución." },
    ],
    faqs: [
      { question: "¿Cuánto cuesta un desarrollo web a medida?", answer: "El valor depende del número de vistas, funcionalidades, integraciones, contenido y nivel de personalización. Después de una reunión inicial entregamos un alcance y una propuesta por etapas." },
      { question: "¿Cuánto tarda el proyecto?", answer: "Una web corporativa puede requerir varias semanas; una plataforma con usuarios, pagos o integraciones necesita más tiempo. El cronograma se define según entregables verificables." },
      { question: "¿La página será administrable?", answer: "Cuando el proyecto lo necesita, integramos un CMS o panel para que el equipo pueda administrar contenido sin modificar código." },
      { question: "¿Incluye SEO?", answer: "Incluye una base de SEO técnico: estructura semántica, metadatos, sitemap, robots, rendimiento y datos estructurados aplicables. El crecimiento orgánico continuo requiere contenido, autoridad y seguimiento." },
      { question: "¿Quién es propietario del proyecto?", answer: "La propuesta comercial define con claridad los entregables, accesos y propiedad del código o de los activos desarrollados." },
    ],
    relatedArticles: [
      { title: "Desarrollo a medida vs. plantillas", href: "/blog/desarrollo-web-medida-vs-plantillas" },
      { title: "Cómo crear una página web profesional", href: "/blog/como-crear-pagina-web-2026" },
    ],
  },
  "diseno-web-corporativo": {
    slug: "diseno-web-corporativo",
    title: "Diseño de páginas web corporativas",
    shortTitle: "Diseño web corporativo",
    metaTitle: "Diseño de Páginas Web Corporativas en Colombia",
    metaDescription:
      "Creamos páginas web corporativas claras, rápidas y adaptadas a móviles para presentar servicios y generar oportunidades comerciales.",
    eyebrow: "// Presencia digital para empresas",
    summary:
      "Creamos sitios corporativos que explican con claridad qué hace la empresa, a quién ayuda y cuál es el siguiente paso. El diseño se conecta con objetivos comerciales, contenido, confianza y medición.",
    serviceType: "Corporate website design",
    benefits: [
      { title: "Mensaje claro", description: "Jerarquía visual y contenido que permite entender la propuesta de valor rápidamente." },
      { title: "Confianza", description: "Portafolio, procesos, casos, testimonios y datos de contacto presentados con coherencia." },
      { title: "Conversión", description: "Llamados a la acción, formularios y rutas de navegación diseñadas para reducir dudas." },
      { title: "Adaptación móvil", description: "Interfaces pensadas para pantallas pequeñas, navegación táctil y conexiones variables." },
    ],
    includes: [
      "Mapa del sitio y estructura de contenidos",
      "Diseño personalizado alineado con la marca",
      "Páginas de servicios, empresa, portafolio y contacto",
      "Formularios e integración con WhatsApp",
      "Configuración de analítica y eventos principales",
      "SEO técnico inicial y publicación",
    ],
    idealFor: [
      "Empresas que necesitan renovar una web antigua",
      "Negocios que dependen de cotizaciones o reuniones",
      "Equipos que quieren presentar varios servicios",
      "Marcas que necesitan mejorar credibilidad digital",
    ],
    process: [
      { title: "Contenido", description: "Definimos páginas, mensajes, pruebas de confianza y preguntas frecuentes." },
      { title: "Wireframes", description: "Organizamos la información antes de trabajar el acabado visual." },
      { title: "Diseño visual", description: "Aplicamos identidad, tipografía, componentes y estados responsive." },
      { title: "Construcción", description: "Desarrollamos las páginas y conectamos formularios, analítica y contenidos." },
      { title: "Publicación", description: "Verificamos dominio, indexación, rendimiento, enlaces y conversiones." },
    ],
    faqs: [
      { question: "¿Qué páginas necesita un sitio corporativo?", answer: "Depende del negocio, pero normalmente incluye inicio, empresa, servicios, proyectos o casos, preguntas frecuentes y contacto. La estructura final se define por intención de búsqueda y necesidades del usuario." },
      { question: "¿Pueden trabajar con nuestra identidad visual?", answer: "Sí. Podemos aplicar una identidad existente o definir un sistema visual digital a partir del logo, colores y material disponible." },
      { question: "¿Incluye textos?", answer: "Podemos trabajar con contenido suministrado por el cliente o incluir la organización y redacción de textos dentro del alcance." },
      { question: "¿Se puede actualizar después?", answer: "Sí. Podemos integrar un gestor de contenidos o prestar mantenimiento para cambios, nuevas páginas y optimizaciones." },
      { question: "¿Funciona para campañas publicitarias?", answer: "El sitio puede recibir tráfico de campañas. Para una oferta específica también recomendamos landing pages con un mensaje y una conversión principal." },
    ],
    relatedArticles: [
      { title: "Guía de desarrollo web profesional", href: "/blog/como-crear-pagina-web-profesional" },
      { title: "Por qué planear el SEO desde el inicio", href: "/blog/seo-desde-la-raiz-crear-pagina" },
    ],
  },
  "tiendas-virtuales": {
    slug: "tiendas-virtuales",
    title: "Desarrollo de tiendas virtuales",
    shortTitle: "Tiendas virtuales",
    metaTitle: "Desarrollo de Tiendas Virtuales en Colombia",
    metaDescription:
      "Diseñamos tiendas virtuales con catálogo, pagos, pedidos, analítica y una experiencia de compra optimizada para móviles.",
    eyebrow: "// E-commerce preparado para vender",
    summary:
      "Construimos experiencias de comercio electrónico que conectan catálogo, contenido, pagos, pedidos y operación. La plataforma se elige según el modelo de negocio, el equipo y las integraciones necesarias.",
    serviceType: "E-commerce development",
    benefits: [
      { title: "Compra sencilla", description: "Navegación, búsqueda, fichas y carrito diseñados para reducir fricción." },
      { title: "Operación conectada", description: "Integración con pagos, envíos, inventario, CRM o procesos internos cuando aplica." },
      { title: "Contenido indexable", description: "Categorías, productos y guías organizados para usuarios y buscadores." },
      { title: "Medición comercial", description: "Eventos de producto, carrito, checkout y compra preparados para analítica." },
    ],
    includes: [
      "Arquitectura de categorías y catálogo",
      "Diseño responsive de la experiencia de compra",
      "Carrito, checkout y pasarela de pagos",
      "Gestión de pedidos y contenidos",
      "Configuración de analítica de comercio electrónico",
      "SEO técnico, pruebas y acompañamiento de lanzamiento",
    ],
    idealFor: [
      "Marcas que venden productos físicos",
      "Empresas con catálogos amplios o variables",
      "Negocios que necesitan integrar operación y marketing",
      "Proyectos que quieren mejorar una tienda existente",
    ],
    process: [
      { title: "Modelo de venta", description: "Definimos productos, variantes, precios, impuestos, pagos y envíos." },
      { title: "Arquitectura", description: "Organizamos categorías, filtros, fichas y rutas de compra." },
      { title: "Diseño", description: "Creamos una experiencia consistente con la marca y el comportamiento móvil." },
      { title: "Integraciones", description: "Conectamos servicios y probamos los escenarios críticos de compra." },
      { title: "Lanzamiento", description: "Validamos medición, indexación, velocidad y operación antes de abrir ventas." },
    ],
    faqs: [
      { question: "¿Qué plataforma utilizan?", answer: "La elección depende del catálogo, operación e integraciones. Podemos trabajar con arquitecturas headless, WooCommerce u otras soluciones cuando son adecuadas para el proyecto." },
      { question: "¿Qué pasarelas de pago pueden integrarse?", answer: "Se pueden integrar proveedores disponibles para el país y modelo de negocio, sujeto a sus requisitos técnicos y comerciales." },
      { question: "¿Puedo administrar productos y pedidos?", answer: "Sí. La tienda incluye una herramienta de gestión adecuada para el equipo y el alcance definido." },
      { question: "¿Incluye configuración de envíos?", answer: "Podemos configurar reglas, zonas, tarifas o integraciones logísticas según los proveedores disponibles." },
      { question: "¿La tienda queda optimizada para SEO?", answer: "Configuramos una base técnica para categorías y productos, pero el posicionamiento también depende de contenido original, demanda, autoridad, inventario y competencia." },
    ],
    relatedArticles: [
      { title: "El costo de una web lenta", href: "/blog/costo-oculto-pagina-web-lenta" },
      { title: "Desarrollo a medida vs. plantillas", href: "/blog/desarrollo-web-medida-vs-plantillas" },
    ],
  },
  "software-a-medida": {
    slug: "software-a-medida",
    title: "Software web a medida para empresas",
    shortTitle: "Software a medida",
    metaTitle: "Desarrollo de Software a Medida en Colombia",
    metaDescription:
      "Desarrollamos plataformas, paneles, portales y automatizaciones web adaptadas a los procesos de tu empresa.",
    eyebrow: "// Plataformas para procesos reales",
    summary:
      "Transformamos procesos manuales o dispersos en herramientas web accesibles, medibles y escalables. Empezamos por el problema, validamos prioridades y construimos por etapas.",
    serviceType: "Custom software development",
    benefits: [
      { title: "Procesos centralizados", description: "Información, tareas y permisos reunidos en una herramienta coherente." },
      { title: "Automatización", description: "Reducción de tareas repetitivas mediante reglas, integraciones y notificaciones." },
      { title: "Datos útiles", description: "Paneles e indicadores pensados para decisiones, no solo para almacenar información." },
      { title: "Evolución por etapas", description: "Primero se construye lo crítico y luego se amplía con aprendizaje real." },
    ],
    includes: [
      "Levantamiento de procesos y requerimientos",
      "Diseño de flujos, roles y permisos",
      "Frontend, backend y base de datos",
      "Autenticación e integraciones",
      "Pruebas funcionales y documentación",
      "Despliegue, monitoreo y plan de mantenimiento",
    ],
    idealFor: [
      "Empresas que dependen de hojas de cálculo o procesos manuales",
      "Equipos que necesitan portales internos o para clientes",
      "Negocios con integraciones entre varias herramientas",
      "Proyectos que requieren roles, permisos y trazabilidad",
    ],
    process: [
      { title: "Descubrimiento", description: "Mapeamos usuarios, tareas, reglas, datos y puntos de dolor." },
      { title: "Priorización", description: "Definimos un primer alcance que produzca valor sin intentar construir todo a la vez." },
      { title: "Prototipo", description: "Validamos flujos y pantallas antes de invertir en implementación completa." },
      { title: "Desarrollo iterativo", description: "Entregamos módulos verificables y ajustamos con retroalimentación." },
      { title: "Operación", description: "Configuramos ambientes, monitoreo, soporte y una ruta de evolución." },
    ],
    faqs: [
      { question: "¿Cómo se calcula el precio de un software a medida?", answer: "Se calcula según módulos, roles, integraciones, reglas, datos, seguridad y nivel de incertidumbre. Recomendamos dividir el proyecto en fases." },
      { question: "¿Es necesario definir todo antes de comenzar?", answer: "Es necesario definir objetivos y prioridades, pero los detalles pueden evolucionar mediante entregas iterativas y validación con usuarios." },
      { question: "¿Pueden integrar herramientas existentes?", answer: "Sí, siempre que los proveedores tengan APIs o mecanismos de integración adecuados." },
      { question: "¿Incluye soporte?", answer: "El lanzamiento puede incluir un periodo de estabilización y luego un plan de soporte y evolución acordado." },
      { question: "¿Cómo protegen la información?", answer: "La arquitectura contempla autenticación, permisos, validación, secretos en servidor y medidas acordes al tipo de información. Los requisitos específicos se definen en el alcance." },
    ],
    relatedArticles: [
      { title: "Guía de desarrollo web profesional", href: "/blog/como-crear-pagina-web-profesional" },
      { title: "Cómo planear una web desde el inicio", href: "/blog/seo-desde-la-raiz-crear-pagina" },
    ],
  },
  "seo-tecnico": {
    slug: "seo-tecnico",
    title: "SEO técnico para páginas web",
    shortTitle: "SEO técnico",
    metaTitle: "SEO Técnico para Páginas Web en Colombia",
    metaDescription:
      "Auditamos y mejoramos rastreo, indexación, rendimiento, arquitectura y datos estructurados para sitios web modernos.",
    eyebrow: "// Una base que los buscadores puedan entender",
    summary:
      "Revisamos la capacidad del sitio para ser rastreado, indexado, comprendido y utilizado por personas. El trabajo técnico se conecta con contenido, intención de búsqueda y medición.",
    serviceType: "Technical SEO",
    benefits: [
      { title: "Rastreo limpio", description: "Robots, sitemap, canonicals, redirecciones y códigos de respuesta coherentes." },
      { title: "Contenido comprensible", description: "HTML semántico, jerarquía de encabezados, enlazado y datos estructurados fieles." },
      { title: "Rendimiento", description: "Revisión de Core Web Vitals, JavaScript, imágenes, fuentes y terceros." },
      { title: "Medición", description: "Search Console, analítica y eventos para observar qué mejora y qué sigue pendiente." },
    ],
    includes: [
      "Inventario de URLs y problemas de indexación",
      "Revisión de metadatos, encabezados y canonicals",
      "Sitemap, robots y redirecciones",
      "Datos estructurados aplicables",
      "Auditoría de rendimiento y accesibilidad básica",
      "Mapa de prioridades y seguimiento",
    ],
    idealFor: [
      "Sitios que no aparecen para consultas relevantes",
      "Migraciones o rediseños",
      "Aplicaciones React o Next.js con problemas de indexación",
      "Empresas que quieren preparar una estrategia de contenidos",
    ],
    process: [
      { title: "Rastreo", description: "Inventariamos URLs, estados, duplicados y rutas de descubrimiento." },
      { title: "Diagnóstico", description: "Separamos problemas técnicos, editoriales y de autoridad." },
      { title: "Implementación", description: "Corregimos primero los bloqueos de mayor impacto y riesgo." },
      { title: "Validación", description: "Comprobamos HTML, sitemap, robots, schema, rendimiento y rutas." },
      { title: "Seguimiento", description: "Medimos indexación, consultas, clics y conversiones durante el tiempo." },
    ],
    faqs: [
      { question: "¿El SEO técnico garantiza la primera posición?", answer: "No. Corrige y mejora la base del sitio, pero las posiciones dependen también de relevancia, competencia, autoridad, contenido, experiencia y evolución del buscador." },
      { question: "¿Qué es GEO o posicionamiento en IA?", answer: "Es la preparación del contenido para ser descubierto, comprendido y citado en experiencias de búsqueda con IA. La base continúa siendo contenido útil, rastreable, original y respaldado por una entidad clara." },
      { question: "¿Cuánto tarda en verse un cambio?", answer: "Algunas correcciones pueden rastrearse rápidamente; los cambios de visibilidad y tráfico suelen requerir semanas o meses, según el sitio y la competencia." },
      { question: "¿Incluyen Search Console?", answer: "Podemos revisar o configurar Search Console y Bing Webmaster Tools cuando el cliente concede acceso." },
      { question: "¿Trabajan con sitios existentes?", answer: "Sí. Podemos auditar e implementar mejoras sin reconstruir todo el sitio, siempre que la arquitectura permita los cambios necesarios." },
    ],
    relatedArticles: [
      { title: "Por qué el SEO debe empezar con la web", href: "/blog/seo-desde-la-raiz-crear-pagina" },
      { title: "Cómo mejorar una página lenta", href: "/blog/costo-oculto-pagina-web-lenta" },
    ],
  },
  "mantenimiento-web": {
    slug: "mantenimiento-web",
    title: "Mantenimiento y mejora continua de páginas web",
    shortTitle: "Mantenimiento web",
    metaTitle: "Mantenimiento de Páginas Web en Colombia",
    metaDescription:
      "Mantenimiento, monitoreo, actualizaciones, soporte y mejoras continuas para páginas web y plataformas empresariales.",
    eyebrow: "// La publicación no es el final",
    summary:
      "Mantenemos el sitio estable, actualizado y alineado con las necesidades del negocio. El plan puede incluir soporte, contenido, monitoreo, seguridad, rendimiento y nuevas funcionalidades.",
    serviceType: "Website maintenance",
    benefits: [
      { title: "Continuidad", description: "Atención a errores, dependencias, formularios e integraciones críticas." },
      { title: "Evolución", description: "Nuevas páginas, contenido y mejoras priorizadas con el equipo." },
      { title: "Prevención", description: "Monitoreo y revisiones periódicas para detectar problemas antes de que escalen." },
      { title: "Medición", description: "Seguimiento de rendimiento, tráfico y conversiones para orientar cambios." },
    ],
    includes: [
      "Actualizaciones y correcciones acordadas",
      "Monitoreo de disponibilidad y errores",
      "Revisión de formularios e integraciones",
      "Optimización de contenido e imágenes",
      "Copias de seguridad según la infraestructura",
      "Reporte de trabajo y recomendaciones",
    ],
    idealFor: [
      "Empresas sin un equipo técnico interno",
      "Sitios que cambian contenido con frecuencia",
      "Tiendas o plataformas con integraciones",
      "Marcas que quieren mejorar de forma continua",
    ],
    process: [
      { title: "Revisión inicial", description: "Documentamos tecnología, accesos, riesgos y estado actual." },
      { title: "Plan", description: "Definimos alcance mensual, tiempos de respuesta y prioridades." },
      { title: "Monitoreo", description: "Observamos disponibilidad, errores y señales relevantes." },
      { title: "Mejoras", description: "Ejecutamos tareas priorizadas y verificamos su impacto." },
      { title: "Reporte", description: "Entregamos un registro claro de cambios, pendientes y recomendaciones." },
    ],
    faqs: [
      { question: "¿Qué incluye un plan de mantenimiento?", answer: "Depende de la tecnología y criticidad. Puede incluir soporte, actualizaciones, monitoreo, contenido, rendimiento, seguridad e integraciones." },
      { question: "¿Trabajan con páginas que no desarrollaron?", answer: "Sí, después de una revisión técnica para conocer el estado, accesos, dependencias y riesgos." },
      { question: "¿El hosting está incluido?", answer: "Puede administrarse dentro del servicio, pero los costos del proveedor se definen por separado cuando corresponda." },
      { question: "¿Hay permanencia mínima?", answer: "Las condiciones se establecen en la propuesta según el nivel de soporte y disponibilidad requerida." },
      { question: "¿Pueden agregar funcionalidades?", answer: "Sí. Las mejoras pequeñas pueden entrar en el plan; módulos grandes se cotizan como proyectos independientes." },
    ],
    relatedArticles: [
      { title: "El costo de una página lenta", href: "/blog/costo-oculto-pagina-web-lenta" },
      { title: "Guía para una web profesional", href: "/blog/como-crear-pagina-web-profesional" },
    ],
  },
}

export const servicePageList = Object.values(servicePages)
