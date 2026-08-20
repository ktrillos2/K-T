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
  showTechStack?: boolean
  showPerformanceComparison?: boolean
  whatWeDevelop?: Array<{ title: string; description: string }>
  whenWeRecommend?: string[]
  whenWeDoNotRecommend?: string[]
  estimatedTimeline?: string
  priceRangeCOP?: string
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
    title: "Desarrollo Web con Next.js y React en Colombia",
    shortTitle: "Desarrollo web a medida",
    metaTitle: "Desarrollo Web a Medida en Colombia | Next.js & React | K&T Code",
    metaDescription:
      "Desarrollo web a medida con Next.js y React en Colombia. Sitios de alto rendimiento, optimización de Core Web Vitals, arquitectura headless y SEO técnico estructurado.",
    eyebrow: "// Ingeniería Web y Arquitectura de Software",
    summary:
      "K&T Code diseña y desarrolla plataformas web a medida utilizando Next.js, React 19 y TypeScript. Implementamos arquitecturas modernas orientadas a optimizar los Core Web Vitals, la seguridad y la indexación orgánica para empresas en Colombia y Latinoamérica.",
    serviceType: "Custom web development Next.js React",
    showTechStack: true,
    showPerformanceComparison: true,
    benefits: [
      { title: "Optimización Core Web Vitals", description: "Arquitectura Next.js App Router y Server Components para cumplir los umbrales recomendados por Google en LCP, CLS e INP." },
      { title: "SEO Semántico Integrado", description: "Estructura HTML5 nativa, renderizado del lado del servidor (SSR/SSG) y datos estructurados Schema.org para facilitar el rastreo e indexación." },
      { title: "Diseño UI/UX Personalizado", description: "Interfaces diseñadas desde cero en Figma adaptadas a la identidad de tu empresa, enfocadas en retención y conversión comercial." },
      { title: "Seguridad y Escalabilidad", description: "Arquitectura modular sin dependencias vulnerables de plugins. Código tipado en TypeScript, Server Actions y despliegue en CDN global." },
    ],
    includes: [
      "Auditoría técnica de arquitectura e intención de búsqueda",
      "Diseño UI/UX a medida en Figma (versión móvil y escritorio)",
      "Desarrollo frontend en Next.js (App Router, React 19, TypeScript)",
      "Optimización integral de Core Web Vitals y rendimiento web",
      "Estructuración de SEO técnico, metadatos dinámicos y JSON-LD",
      "Integración con CMS Headless (Sanity, Strapi o panel a medida)",
      "Conexión con pasarelas de pago, CRM, APIs y WhatsApp Business",
      "Despliegue en servidores globales (Vercel / Cloudflare) con SSL",
    ],
    idealFor: [
      "Empresas y marcas que necesitan superar a sus competidores en Google y velocidad",
      "Negocios que sufren caídas de tráfico o lentitud por WordPress/Elementor sobrecargados",
      "Startups y corporaciones que buscan una presencia digital premium y escalable",
      "Proyectos que requieren integraciones complejas con APIs, bases de datos o paneles internos",
    ],
    process: [
      { title: "Estrategia y Arquitectura", description: "Definimos la estructura de URLs, intención de búsqueda, flujo de usuario y requerimientos funcionales." },
      { title: "Diseño Visual UI/UX", description: "Creamos prototipos interactivos de alta fidelidad centrados en la conversión y la experiencia móvil." },
      { title: "Desarrollo en Next.js", description: "Programamos componentes modulares, limpios y optimizados con Server Components y estilos modernos." },
      { title: "Pruebas y Core Web Vitals", description: "Auditamos velocidad en dispositivos móviles reales, accesibilidad, seguridad y datos estructurados." },
      { title: "Lanzamiento y Monitoreo", description: "Configuramos DNS, Google Search Console, sitemap XML y analítica de eventos para medir resultados." },
    ],
    faqs: [
      { question: "¿Por qué elegir desarrollo en Next.js sobre WordPress o plantillas?", answer: "Next.js permite generar páginas con Server-Side Rendering (SSR) y Static Site Generation (SSG), lo que reduce el tiempo de carga a menos de 1 segundo, elimina el riesgo de hackeos por plugins vulnerables y proporciona el código HTML más limpio posible para que Google indexe tu contenido con máxima prioridad." },
      { question: "¿Cuánto cuesta desarrollar una página web a medida en Colombia?", answer: "El costo depende del número de vistas, diseño personalizado, integraciones y funcionalidades interactivas. En K&T ofrecemos propuestas transparentes por etapas con entregables verificables. Puedes consultar nuestras tarifas base en la sección de precios." },
      { question: "¿La página web desarrollada en Next.js será administrable?", answer: "Sí. Integramos paneles CMS Headless modernos (como Sanity, Supabase o paneles a medida) para que tu equipo pueda actualizar textos, blogs, imágenes y productos sin tocar una sola línea de código." },
      { question: "¿Incluye optimización para posicionamiento SEO en Colombia?", answer: "Totalmente. Entregamos la web con arquitectura semántica H1-H6, sitemap dinámico, robots.txt optimizado, etiquetas Open Graph y datos estructurados Schema.org (Organization, WebSite, Service, BreadcrumbList y FAQPage)." },
      { question: "¿Quién es dueño del código fuente y los accesos?", answer: "Tu empresa es 100% propietaria del código fuente, repositorio en GitHub, accesos de despliegue y activos visuales generados para el proyecto sin dependencias ocultas." },
    ],
    relatedArticles: [
      { title: "Desarrollo a medida vs. plantillas: cómo elegir en 2026", href: "/blog/desarrollo-web-medida-vs-plantillas" },
      { title: "El costo oculto de una página web lenta", href: "/blog/costo-oculto-pagina-web-lenta" },
      { title: "Por qué el SEO debe planearse desde el inicio", href: "/blog/seo-desde-la-raiz-crear-pagina" },
    ],
  },
  "tiendas-virtuales": {
    slug: "tiendas-virtuales",
    title: "Desarrollo de Tiendas Virtuales & E-commerce Headless",
    shortTitle: "Tiendas virtuales",
    metaTitle: "Agencia Desarrollo E-commerce Headless Colombia | WooCommerce & Shopify | K&T Code",
    metaDescription:
      "Desarrollo de tiendas virtuales headless en Colombia con Next.js, WooCommerce y Shopify. Catálogos ultra rápidos, pasarelas de pago Wompi, PayU, Bold y checkout optimizado.",
    eyebrow: "// Comercio Electrónico de Alto Rendimiento",
    summary:
      "Construimos tiendas virtuales y plataformas de comercio electrónico headless en Colombia combinando la potencia de Next.js en el frontend con motores robustos como WooCommerce, Shopify o Medusa en el backend. Logramos compras sin fricción, navegación instantánea y compatibilidad total con pasarelas de pago colombianas.",
    serviceType: "Headless E-commerce development Next.js WooCommerce Shopify",
    showTechStack: true,
    showPerformanceComparison: true,
    benefits: [
      { title: "Checkout en Menos de 1 Segundo", description: "Eliminamos las esperas del carrito y checkout para maximizar la tasa de conversión y reducir carritos abandonados." },
      { title: "Pasarelas de Pago Colombianas", description: "Integración nativa con Wompi (Bancolombia), Bold, PayU, ePayco, PSE, tarjetas de crédito y transferencias Nequi/Daviplata." },
      { title: "Catálogo Escalable sin Caídas", description: "Soporta miles de visitas simultáneas durante campañas de Cyberlunes o Black Friday gracias a la infraestructura CDN." },
      { title: "SEO para Productos y Categorías", description: "Datos estructurados Product, Offer y AggregateRating para mostrar precios, stock y estrellas en los resultados de Google." },
    ],
    includes: [
      "Arquitectura headless (Frontend en Next.js + Backend WooCommerce/Shopify/Custom)",
      "Diseño UI/UX móvil enfocado en navegación táctil y compra rápida",
      "Filtros avanzados por categoría, atributos, tallas, colores y precio",
      "Carrito interactivo deslizable (Slide Cart) y checkout simplificado",
      "Integración de pasarelas de pago (Wompi, PayU, Bold, ePayco, PSE)",
      "Cálculo de envíos por ciudades de Colombia y tracking de pedidos",
      "Configuración de Google Analytics 4 (eventos de e-commerce) y Meta Pixel",
      "Optimización de imágenes WebP/AVIF y catálogo indexable en Google",
    ],
    idealFor: [
      "Marcas y empresas en Colombia que venden productos físicos o digitales a nivel nacional",
      "Tiendas en WooCommerce o Shopify tradicional que son lentas y pierden ventas por tiempo de carga",
      "Negocios que buscan unificar su inventario con sucursales físicas o software ERP",
      "Empresas que necesitan una experiencia de compra móvil fluida y moderna",
    ],
    process: [
      { title: "Modelo Comercial y Catálogo", description: "Estructuramos productos, variantes, tarifas de envío, impuestos colombianos y pasarelas de pago." },
      { title: "Diseño de la Experiencia de Compra", description: "Creamos la interfaz de fichas de producto, carrito y checkout optimizados para pantallas móviles." },
      { title: "Integración Headless & APIs", description: "Conectamos el frontend de Next.js con el backend y las pasarelas de pago mediante APIs seguras." },
      { title: "Pruebas de Compra Reales", description: "Validamos flujos de pago con PSE, tarjetas, cálculo de envíos y notificaciones automáticas por correo/WhatsApp." },
      { title: "Lanzamiento y Capacitación", description: "Publicamos la tienda, verificamos eventos de analítica y capacitamos al equipo en la gestión de pedidos." },
    ],
    faqs: [
      { question: "¿Qué es una tienda virtual Headless y qué ventajas tiene?", answer: "En una tienda Headless, el frontend (lo que ve el cliente) está desarrollado en Next.js de forma desacoplada del backend (donde gestionas el inventario, como WooCommerce o Shopify). Esto permite que la tienda cargue de forma instantánea (<0.5 segundos), ofreciendo una experiencia idéntica a una aplicación nativa y multiplicando las conversiones." },
      { question: "¿Puedo mantener mi tienda WooCommerce existente y mejorar la velocidad con Headless?", answer: "Sí. Podemos conectar un frontend nuevo y ultra rápido en Next.js a tu backend actual de WooCommerce mediante la REST API, conservando tus productos, clientes e historial de pedidos intactos." },
      { question: "¿Qué pasarelas de pago colombianas pueden integrarse?", answer: "Integramos las principales pasarelas disponibles en Colombia: Wompi (Bancolombia), Bold, PayU Latam, ePayco, Mercado Pago, pagos PSE, tarjetas de crédito/débito y botones directos de WhatsApp para pedidos asistidos." },
      { question: "¿La tienda virtual incluye panel para gestionar pedidos y stock?", answer: "Sí. Tendrás un panel administrativo intuitivo para agregar nuevos productos, cambiar precios, gestionar el inventario, ver estados de pago y despachar pedidos fácilmente." },
      { question: "¿Cómo se posicionan los productos en Google?", answer: "Implementamos datos estructurados Schema.org para productos, URLs amigables, jerarquía semántica y optimización de velocidad para que tus productos aparezcan destacados en Google Shopping y búsquedas orgánicas." },
    ],
    relatedArticles: [
      { title: "El costo oculto de una página web lenta", href: "/blog/costo-oculto-pagina-web-lenta" },
      { title: "Desarrollo a medida vs. plantillas", href: "/blog/desarrollo-web-medida-vs-plantillas" },
      { title: "Por qué el SEO debe planearse desde el inicio", href: "/blog/seo-desde-la-raiz-crear-pagina" },
    ],
  },
  "software-a-medida": {
    slug: "software-a-medida",
    title: "Desarrollo de Software Web a Medida y Plataformas SaaS",
    shortTitle: "Software a medida",
    metaTitle: "Desarrollo de Software a Medida en Colombia | Next.js & React | K&T Code",
    metaDescription:
      "Desarrollamos software web a medida, paneles administrativos, portales de clientes y SaaS con Next.js, React, Node.js y Supabase en Colombia.",
    eyebrow: "// Soluciones Digitales Corporativas",
    summary:
      "Automatizamos y digitalizamos las operaciones críticas de tu empresa mediante aplicaciones web y software a medida. Creamos paneles de administración, portales corporativos, plataformas SaaS y sistemas de gestión interna con arquitectura moderna en Next.js, React, Supabase y bases de datos PostgreSQL.",
    serviceType: "Custom software web development Next.js React SaaS",
    showTechStack: true,
    showPerformanceComparison: false,
    benefits: [
      { title: "Automatización de Procesos", description: "Eliminamos las hojas de cálculo dispersas y el trabajo manual repetitivo con flujos automatizados." },
      { title: "Arquitectura Fullstack Moderna", description: "Desarrollo con Next.js App Router, Server Actions, TypeScript y bases de datos PostgreSQL de alto rendimiento." },
      { title: "Seguridad y Roles de Usuario", description: "Autenticación robusta (OAuth, JWT, 2FA), control de permisos granulares por rol y cifrado de datos." },
      { title: "Integración de Sistemas (APIs)", description: "Conectamos tu software con pasarelas de pago, facturación electrónica DIAN, CRMs, WhatsApp y ERPs." },
    ],
    includes: [
      "Levantamiento de requerimientos y modelado de base de datos",
      "Diseño de flujos de usuario, wireframes y arquitectura de interfaz",
      "Desarrollo frontend interactivo con Next.js y React",
      "Desarrollo backend con Server Actions, APIs RESTful y Webhooks",
      "Configuración de base de datos relacional (PostgreSQL / Supabase)",
      "Sistema de autenticación, control de accesos y perfiles de usuario",
      "Pruebas de seguridad, carga, validación de datos y consistencia",
      "Despliegue en la nube, configuración de entornos y plan de soporte",
    ],
    idealFor: [
      "Empresas que han superado los límites de Excel o software genérico y necesitan una solución propia",
      "Negocios que requieren un portal privado para clientes, distribuidores o proveedores",
      "Emprendedores que buscan desarrollar un MVP o producto SaaS escalable",
      "Corporaciones que necesitan unificar herramientas dispersas en una sola plataforma central",
    ],
    process: [
      { title: "Diagnóstico y Alcance", description: "Entendemos la lógica del negocio, los roles de usuario, las reglas operativas y definimos el roadmap del proyecto." },
      { title: "Diseño de UX y Prototipado", description: "Diseñamos las pantallas y flujos de trabajo antes de iniciar el código para validar la usabilidad con el equipo." },
      { title: "Desarrollo por Módulos (Sprints)", description: "Programamos entregables funcionales en Next.js y base de datos con revisiones periódicas del avance." },
      { title: "Seguridad y Pruebas de Estrés", description: "Comprobamos permisos, validación de entradas, integridad referencial y rendimiento bajo concurrencia." },
      { title: "Puesta en Marcha y Soporte", description: "Desplegamos en infraestructura escalable, capacitamos a los usuarios y brindamos soporte continuo." },
    ],
    faqs: [
      { question: "¿Cómo se calcula el costo de un software a medida en Colombia?", answer: "El precio se define en función del número de módulos, tipos de usuarios/roles, complejidad de la lógica de negocio, integraciones con terceros y requerimientos de seguridad. Desarrollamos propuestas modulares por etapas para que puedas comenzar con un MVP funcional y escalarlo." },
      { question: "¿Qué tecnologías utilizan para el desarrollo de software web?", answer: "Utilizamos un stack moderno y probado en producción: Next.js, React 19, TypeScript, Tailwind CSS, Supabase / PostgreSQL, Node.js y despliegues serverless de alta disponibilidad." },
      { question: "¿Es posible integrar el software con facturación electrónica o la DIAN?", answer: "Sí. Podemos integrar el software con proveedores tecnológicos de facturación electrónica autorizados por la DIAN en Colombia, así como con ERPs, CRMs y pasarelas de pago." },
      { question: "¿Quién es propietario del software y de la base de datos?", answer: "Tu empresa conserva el 100% de la propiedad intelectual, el código fuente y el control absoluto de las bases de datos y credenciales del sistema." },
      { question: "¿Ofrecen mantenimiento y soporte tras el lanzamiento?", answer: "Sí. Todos nuestros proyectos incluyen un periodo de garantía y soporte post-lanzamiento, además de planes mensuales de mantenimiento, monitoreo y evolución continua." },
    ],
    relatedArticles: [
      { title: "Guía de desarrollo web profesional para empresas", href: "/blog/como-crear-pagina-web-profesional" },
      { title: "Por qué el SEO y la arquitectura deben planearse desde el inicio", href: "/blog/seo-desde-la-raiz-crear-pagina" },
    ],
  },
  "diseno-web-corporativo": {
    slug: "diseno-web-corporativo",
    title: "Diseño de Páginas Web Corporativas en Colombia",
    shortTitle: "Diseño web corporativo",
    metaTitle: "Diseño de Páginas Web Corporativas en Colombia | K&T Code",
    metaDescription:
      "Diseñamos páginas web corporativas profesionales para empresas en Colombia. Diseño exclusivo, velocidad Next.js, enfoque en conversión B2B y posicionamiento SEO.",
    eyebrow: "// Presencia Digital y Autoridad de Marca",
    summary:
      "Tu página web es la carta de presentación de tu empresa ante clientes e inversores. Diseñamos sitios web corporativos modernos, rápidos y elegantes en Colombia, construidos con Next.js para transmitir máxima confianza, comunicar tu propuesta de valor y captar clientes potenciales calificados.",
    serviceType: "Corporate website design Next.js Colombia",
    showTechStack: true,
    showPerformanceComparison: true,
    benefits: [
      { title: "Imagen Corporativa Premium", description: "Diseño visual exclusivo alineado con la identidad y valores de tu empresa, destacándote de la competencia." },
      { title: "Generación de Oportunidades B2B", description: "Formularios interactivos, llamados a la acción estratégicos e integración directa con WhatsApp Business y CRM." },
      { title: "Velocidad y Adaptación Móvil", description: "Carga instantánea en cualquier celular o conexión móvil gracias al renderizado estático de Next.js." },
      { title: "Estructura Semántica para Google", description: "Jerarquía de contenidos y metadatos optimizados para posicionar los servicios de tu empresa en Colombia." },
    ],
    includes: [
      "Estructura de páginas corporativas (Inicio, Nosotros, Servicios, Casos de Éxito, Contacto)",
      "Diseño UI/UX responsive personalizado sin plantillas genéricas",
      "Desarrollo frontend en Next.js con animaciones fluidas y micro-interacciones",
      "Formularios de contacto protegidos con anti-spam y notificaciones por correo/WhatsApp",
      "Configuración de analítica web (Google Analytics 4) y eventos de conversión",
      "SEO técnico on-page, sitemap dinámico y datos estructurados Organization",
      "Optimización de imágenes y recursos para carga ultra rápida",
      "Acompañamiento, configuración de dominio corporativo y despliegue con SSL",
    ],
    idealFor: [
      "Empresas de servicios, consultorías y firmas corporativas que necesitan renovar su imagen digital",
      "Negocios B2B que buscan generar cotizaciones y reuniones comerciales cualificadas",
      "Compañías que quieren presentar un portafolio de proyectos y clientes con máxima elegancia",
      "Empresas que valoran la velocidad y la seguridad frente a sitios web lentos y vulnerables",
    ],
    process: [
      { title: "Arquitectura y Mensajes Clave", description: "Definimos la propuesta de valor, estructura de navegación, servicios a destacar y pruebas de confianza." },
      { title: "Prototipado Visual UI", description: "Diseñamos las pantallas con estética contemporánea, tipografía cuidada y coherencia con la identidad de marca." },
      { title: "Programación en Next.js", description: "Convertimos el diseño en código limpio y eficiente con animaciones sutiles y rendimiento de primer nivel." },
      { title: "Integraciones y Medición", description: "Conectamos formularios, analítica, botones de contacto y validamos la correcta visualización en móviles." },
      { title: "Publicación y Verificación", description: "Configuramos DNS, certificado SSL, indexación en Google y entregamos los accesos del sitio." },
    ],
    faqs: [
      { question: "¿Qué secciones debe incluir una página web corporativa efectiva?", answer: "Normalmente incluye: Página de Inicio con propuesta clara, Quiénes Somos / Autoridad, Páginas dedicadas por cada Servicio, Casos de Estudio o Portafolio, Preguntas Frecuentes y Sección de Contacto interactiva con WhatsApp y formulario." },
      { question: "¿Podemos actualizar el contenido nosotros mismos?", answer: "Sí. Podemos conectar un gestor de contenido (CMS Headless) intuitivo para que tu equipo pueda publicar artículos en el blog, actualizar servicios o editar datos de contacto sin complicaciones." },
      { question: "¿Cuánto tiempo toma diseñar y desarrollar la web corporativa?", answer: "Un sitio web corporativo profesional suele completarse en un plazo de entre 2 a 4 semanas, dependiendo de la cantidad de páginas, contenido disponible y revisiones visuales." },
      { question: "¿Incluye correo corporativo y configuración del dominio?", answer: "Te asesoramos en la configuración de correos corporativos (Google Workspace, Microsoft 365 o proveedor de tu preferencia) y enlazamos tu dominio con servidores globales de alto rendimiento." },
      { question: "¿Funciona bien en dispositivos móviles?", answer: "Diseñamos bajo una metodología Mobile-First, lo que garantiza que la navegación, botones y textos se adapten a la perfección a teléfonos y tablets." },
    ],
    relatedArticles: [
      { title: "Desarrollo web profesional: guía para empresas", href: "/blog/como-crear-pagina-web-profesional" },
      { title: "Por qué el SEO debe planearse desde el inicio de una web", href: "/blog/seo-desde-la-raiz-crear-pagina" },
      { title: "Desarrollo a medida vs. plantillas", href: "/blog/desarrollo-web-medida-vs-plantillas" },
    ],
  },
  "seo-tecnico": {
    slug: "seo-tecnico",
    title: "Servicios de SEO Técnico & Optimización Web en Colombia",
    shortTitle: "SEO técnico",
    metaTitle: "Servicios de SEO Técnico en Colombia | Core Web Vitals & Schema | K&T Code",
    metaDescription:
      "Auditoría y optimización de SEO técnico en Colombia. Mejoramos rastreo, indexación, optimización de Core Web Vitals y rendimiento Lighthouse, datos estructurados JSON-LD y arquitectura para Next.js y React.",
    eyebrow: "// Visibilidad Orgánica y Rendimiento en Buscadores",
    summary:
      "El SEO técnico es la base imprescindible para que Google comprenda, indexe y premie a tu sitio web en los primeros resultados. Auditamos y corregimos problemas de rastreo, jerarquía semántica, canonicidad, datos estructurados Schema.org y Core Web Vitals para sitios web modernos en Colombia.",
    serviceType: "Technical SEO optimization Next.js React Colombia",
    showTechStack: false,
    showPerformanceComparison: false,
    benefits: [
      { title: "Rastreo e Indexación Limpia", description: "Configuración precisa de robots.txt, sitemaps dinámicos, canonicals y redirecciones 301 sin enlaces rotos." },
      { title: "Core Web Vitals Impecables", description: "Optimización de LCP, INP y CLS para cumplir las métricas de rendimiento exigidas por los algoritmos de Google." },
      { title: "Datos Estructurados Ricos (JSON-LD)", description: "Implementación de Schema.org (Organization, Service, FAQPage, Product, BreadcrumbList) para fragmentos enriquecidos." },
      { title: "Preparación para Búsqueda con IA (GEO)", description: "Contenido semánticamente estructurado para ser citado por motores generativos como ChatGPT Search y Google Gemini." },
    ],
    includes: [
      "Auditoría técnica exhaustiva de indexación, rastreo y estado HTTP",
      "Revisión y corrección de etiquetas canónicas, robots.txt y sitemap XML",
      "Optimización de jerarquía semántica H1-H6 y metadatos por intención",
      "Implementación de datos estructurados JSON-LD según directrices de Google",
      "Auditoría y remediación de Core Web Vitals (JavaScript, fuentes, imágenes)",
      "Optimización de la estructura de enlazado interno (Topic Clusters)",
      "Configuración y auditoría de Google Search Console y Bing Webmaster Tools",
      "Reporte técnico con plan de acción prioritario y seguimiento de mejoras",
    ],
    idealFor: [
      "Sitios web que han perdido posiciones en Google o sufren caídas de tráfico orgánico",
      "Empresas que van a realizar una migración o rediseño y no quieren perder su autoridad SEO",
      "Aplicaciones en React o Next.js con problemas de renderizado o indexación en buscadores",
      "Proyectos que buscan posicionar páginas de servicio y productos en mercados competitivos",
    ],
    process: [
      { title: "Rastreo y Diagnóstico", description: "Analizamos todas las URLs del sitio para detectar bloqueos, contenido duplicado, errores 404 y demoras en carga." },
      { title: "Matriz de Prioridades", description: "Separamos los problemas críticos que frenan la indexación de las optimizaciones de rendimiento y contenido." },
      { title: "Implementación Técnica", description: "Corregimos código, metadatos, datos estructurados, renderizado y recursos estáticos directamente en el proyecto." },
      { title: "Validación en Search Console", description: "Enviamos las URLs corregidas a Google, verificamos las pruebas de datos estructurados y medimos Core Web Vitals." },
      { title: "Monitoreo y Evolución", description: "Hacemos seguimiento al crecimiento en impresiones, clics, palabras clave posicionadas y conversiones." },
    ],
    faqs: [
      { question: "¿Qué diferencia al SEO técnico del SEO de contenidos?", answer: "El SEO técnico se enfoca en la infraestructura y la salud del código (velocidad, rastreo, indexación, datos estructurados, arquitectura), mientras que el SEO de contenidos se enfoca en la redacción y palabras clave. Sin un buen SEO técnico, los mejores contenidos no logran posicionarse en Google." },
      { question: "¿Cómo influyen los Core Web Vitals en el posicionamiento?", answer: "Google utiliza las métricas de Core Web Vitals (LCP, INP, CLS) como un factor oficial de ranking y experiencia de usuario. Las páginas rápidas obtienen mejor tasa de retención, menor rebote y mayor preferencia en los resultados de búsqueda." },
      { question: "¿Pueden auditar sitios construidos en otras tecnologías además de Next.js?", answer: "Sí. Auditamos sitios web en WordPress, Shopify, React, Vue, Webflow o código a medida, identificando las limitaciones técnicas y proponiendo la solución más eficiente." },
      { question: "¿Cuánto tiempo toma ver resultados tras una optimización técnica?", answer: "Las correcciones de indexación y errores de rastreo suelen reflejarse en Google Search Console en cuestión de días. El impacto en rankings y tráfico orgánico se consolida progresivamente a lo largo de las siguientes semanas." },
      { question: "¿Qué es GEO (Generative Engine Optimization)?", answer: "Es la optimización para que la información y servicios de tu marca sean reconocidos y citados en respuestas de Inteligencias Artificiales de búsqueda (como ChatGPT Search, Perplexity o Google AI Overviews), mediante entidades claras, datos estructurados y contenido fáctico de alta autoridad." },
    ],
    relatedArticles: [
      { title: "Por qué el SEO debe planearse desde el inicio de una web", href: "/blog/seo-desde-la-raiz-crear-pagina" },
      { title: "El costo oculto de una página web lenta y cómo mejorarlo", href: "/blog/costo-oculto-pagina-web-lenta" },
      { title: "Desarrollo web a medida vs. plantillas", href: "/blog/desarrollo-web-medida-vs-plantillas" },
    ],
  },
  "mantenimiento-web": {
    slug: "mantenimiento-web",
    title: "Mantenimiento Web, Soporte y Optimización Continua",
    shortTitle: "Mantenimiento web",
    metaTitle: "Mantenimiento de Páginas Web en Colombia | Soporte y Seguridad | K&T Code",
    metaDescription:
      "Planes de mantenimiento web y soporte técnico para empresas en Colombia. Actualizaciones, monitoreo 24/7, copias de seguridad, velocidad y mejoras continuas.",
    eyebrow: "// Rendimiento, Estabilidad y Soporte Continuo",
    summary:
      "Una página web exitosa requiere atención, seguridad y evolución permanente. En K&T Code cuidamos de tu plataforma digital mediante mantenimiento preventivo, monitoreo de disponibilidad, optimización de velocidad, copias de seguridad y desarrollo de nuevas funcionalidades para que tu negocio nunca se detenga.",
    serviceType: "Website maintenance and technical support Colombia",
    showTechStack: false,
    showPerformanceComparison: false,
    benefits: [
      { title: "Disponibilidad y Monitoreo", description: "Monitoreamos el estado de tu web para detectar y resolver incidencias antes de que afecten a tus clientes." },
      { title: "Actualizaciones y Seguridad", description: "Mantenemos librerías, dependencias, frameworks y certificados SSL al día contra vulnerabilidades." },
      { title: "Copias de Seguridad Periódicas", description: "Backups automatizados de código y base de datos con protocolos de restauración rápida ante emergencias." },
      { title: "Bolsa de Horas para Mejoras", description: "Tiempo dedicado cada mes para crear nuevas secciones, actualizar contenidos o integrar herramientas." },
    ],
    includes: [
      "Monitoreo continuo de uptime (disponibilidad) y alertas en tiempo real",
      "Actualización periódica de dependencias, seguridad y librerías frontend/backend",
      "Copias de seguridad programadas de base de datos y archivos",
      "Optimización continua de velocidad, compresión de imágenes y base de datos",
      "Revisión y pruebas periódicas de formularios de contacto y pasarelas de pago",
      "Soporte técnico prioritario por canal directo (WhatsApp / Correo)",
      "Desarrollo de cambios visuales, nuevos banners o ajustes de contenido",
      "Informe mensual de estado, tareas realizadas y recomendaciones técnicas",
    ],
    idealFor: [
      "Empresas que no cuentan con un departamento técnico interno y necesitan respaldo profesional",
      "Tiendas virtuales y plataformas transaccionales donde una caída significa pérdida directa de dinero",
      "Marcas que actualizan promociones, catálogo o artículos de blog con frecuencia",
      "Proyectos que buscan mejorar continuamente su conversión y métricas de SEO",
    ],
    process: [
      { title: "Auditoría Inicial del Sitio", description: "Revisamos el estado actual del código, servidor, dependencias, seguridad y respaldos existentes." },
      { title: "Plan a Medida", description: "Definimos la frecuencia de monitoreo, bolsa de horas mensuales y canales de atención según tus requerimientos." },
      { title: "Puesta en Marcha y Monitoreo", description: "Configuramos herramientas de alerta automática y realizamos el primer ciclo de optimización y respaldo." },
      { title: "Mantenimiento y Evolución", description: "Ejecutamos tareas preventivas y atendemos solicitudes de cambios o mejoras solicitadas por tu equipo." },
      { title: "Informe y Asesoría Mensual", description: "Te entregamos un reporte claro con el trabajo ejecutado, métricas de rendimiento y sugerencias de mejora." },
    ],
    faqs: [
      { question: "¿Qué incluye exactamente un plan de mantenimiento web?", answer: "Incluye soporte técnico, monitoreo de disponibilidad, actualizaciones de seguridad, respaldos periódicos, optimización de velocidad, revisión de formularios e integraciones, y una bolsa de horas mensuales para modificaciones de diseño, contenido o nuevas funciones." },
      { question: "¿Pueden mantener una página web que no fue desarrollada por K&T Code?", answer: "Sí. Realizamos una auditoría técnica previa para evaluar el estado del código, stack tecnológico, dependencias y accesos antes de asumir la administración del sitio." },
      { question: "¿Qué pasa si mi página sufre una caída de servidor o un fallo crítico?", answer: "Nuestros sistemas de monitoreo nos alertan de inmediato para intervenir con máxima prioridad y restaurar el servicio en el menor tiempo posible utilizando los respaldos de seguridad." },
      { question: "¿Hay un contrato con permanencia obligatoria?", answer: "No exigimos cláusulas de permanencia abusivas. Nuestros planes de mantenimiento mensual se renuevan según la satisfacción y continuidad acordada con el cliente." },
      { question: "¿Las horas no utilizadas se pueden acumular?", answer: "Las condiciones de uso de horas se especifican en el plan seleccionado, permitiendo flexibilidad para proyectos de mejora puntuales durante el año." },
    ],
    relatedArticles: [
      { title: "El costo oculto de una página web lenta", href: "/blog/costo-oculto-pagina-web-lenta" },
      { title: "Desarrollo web profesional: guía para empresas", href: "/blog/como-crear-pagina-web-profesional" },
      { title: "Por qué el SEO debe planearse desde el inicio", href: "/blog/seo-desde-la-raiz-crear-pagina" },
    ],
  },
  "desarrollo-nextjs": {
    slug: "desarrollo-nextjs",
    title: "Desarrollo Next.js para Empresas en Colombia",
    shortTitle: "Desarrollo Next.js",
    metaTitle: "Desarrollo Next.js en Colombia | Expertos en React & Server Components | K&T Code",
    metaDescription:
      "Desarrollo web especializado en Next.js, React 19 y TypeScript para empresas en Colombia. Optimización de Core Web Vitals y rendimiento Lighthouse, arquitectura headless, SaaS y e-commerce.",
    eyebrow: "// Ingeniería Next.js & Server Components",
    summary:
      "K&T Code diseña sitios corporativos, plataformas web y e-commerce utilizando Next.js, React y TypeScript para empresas que necesitan rendimiento, escalabilidad e integraciones personalizadas.",
    serviceType: "Next.js web development agency Colombia",
    showTechStack: true,
    showPerformanceComparison: true,
    whatWeDevelop: [
      { title: "Sitios Web Corporativos de Alta Velocidad", description: "Páginas empresariales con Server-Side Rendering (SSR) y Static Generation (SSG) para máxima velocidad y SEO orgánico." },
      { title: "Plataformas Web y Aplicaciones SaaS", description: "Sistemas fullstack con Next.js App Router, Server Actions, TypeScript y bases de datos PostgreSQL / Supabase." },
      { title: "E-commerce Headless de Alto Rendimiento", description: "Frontends desacoplados conectados a Shopify, WooCommerce o APIs a medida con checkout ultra rápido." },
      { title: "Portales y Paneles Administrativos", description: "Dashboards interactivos con gestión de roles, analítica en tiempo real y autenticación segura." },
    ],
    whenWeRecommend: [
      "Cuando el posicionamiento orgánico en Google (SEO) y la optimización rigurosa de Core Web Vitals son factores críticos para la rentabilidad de tu negocio.",
      "Empresas que esperan alto tráfico concurrente y requieren escalabilidad en la nube (Edge CDN) sin caídas de servidor.",
      "Plataformas interactivas que necesitan renderizado instantáneo, estados dinámicos e integraciones con APIs externas.",
      "Proyectos corporativos que exigen robustez en seguridad, control granular de accesos y reducción de dependencias externas vulnerables.",
    ],
    whenWeDoNotRecommend: [
      "Landing pages de un solo evento o campañas de 1 o 2 días que no requieren posicionamiento orgánico a largo plazo.",
      "Proyectos con presupuestos extremadamente reducidos donde un constructor no-code básico cubra la etapa inicial de validación.",
    ],
    estimatedTimeline: "Entre 2 a 4 semanas para sitios web corporativos; 4 a 8 semanas para plataformas SaaS o tiendas headless.",
    priceRangeCOP: "Planes transparentes por etapas desde $2.500.000 COP según alcance, vistas y módulos requeridos.",
    benefits: [
      { title: "Rendimiento y Velocidad Superior", description: "Server Components y optimización de recursos orientados a alcanzar puntuaciones líderes en Google PageSpeed." },
      { title: "SEO Semántico Nativo", description: "Renderizado en servidor que entrega HTML5 puro a los rastreadores de Google con metadatos dinámicos." },
      { title: "Seguridad y Buenas Prácticas", description: "Arquitectura moderna con reducción de dependencias, validación estricta de esquemas y protección de endpoints." },
      { title: "Escalabilidad Serverless", description: "Despliegues globales en Edge CDN (Vercel / Cloudflare) con alta disponibilidad y SSL." },
    ],
    includes: [
      "Arquitectura de software y modelado de datos en Next.js y TypeScript",
      "Diseño UI/UX exclusivo en Figma con enfoque en conversión y retención",
      "Desarrollo frontend con Server Components y Server Actions",
      "Integración de CMS Headless (Sanity, Supabase o Strapi) para autogestión",
      "Optimización avanzada de Core Web Vitals (LCP, INP, CLS)",
      "Marcado de datos estructurados JSON-LD (Service, Organization, FAQPage)",
      "Integración de analítica de eventos (GA4, Pixel) y WhatsApp Business",
      "Configuración de dominios, SSL y despliegue continuo en la nube",
    ],
    idealFor: [
      "Empresas en Colombia y Latinoamérica que buscan liderar su sector en Google y velocidad",
      "Negocios con sitios web lentos en WordPress/Elementor que sufren altas tasas de rebote",
      "Startups y empresas de tecnología que requieren plataformas web escalables y mantenibles",
      "Equipos corporativos que necesitan portales interactivos y aplicaciones web a medida",
    ],
    process: [
      { title: "Diagnóstico y Arquitectura", description: "Analizamos objetivos de negocio, requerimientos técnicos, flujo de usuarios y estructura de URLs." },
      { title: "Diseño Visual UI/UX", description: "Diseñamos interfaces exclusivas en Figma enfocadas en la experiencia móvil y conversión comercial." },
      { title: "Desarrollo en Next.js", description: "Programamos componentes modulares con TypeScript, Tailwind CSS y Server Components." },
      { title: "Auditoría Core Web Vitals", description: "Validamos tiempos de carga en dispositivos móviles reales, accesibilidad y datos estructurados." },
      { title: "Despliegue y Analítica", description: "Publicamos en CDN global, conectamos Google Search Console y configuramos medición de eventos." },
    ],
    faqs: [
      { question: "¿Por qué Next.js es superior a WordPress para empresas en Colombia?", answer: "Next.js renderiza el código desde el servidor y genera páginas estáticas optimizadas, logrando que tu web cargue en menos de 0.8 segundos. Esto mejora drásticamente el posicionamiento en Google, reduce el abandono de usuarios y elimina por completo los problemas de seguridad derivados de plugins vulnerables." },
      { question: "¿Qué empresas utilizan Next.js a nivel mundial y en Colombia?", answer: "Empresas líderes como TikTok, Twitch, Hulu, Nike, Target y las startups más exitosas de Latinoamérica utilizan Next.js por su rendimiento incomparable y escalabilidad." },
      { question: "¿Puedo editar los textos e imágenes de mi web en Next.js sin saber programar?", answer: "Sí. Integramos paneles CMS Headless modernos (como Sanity, Supabase o paneles a medida) para que cualquier persona del equipo pueda editar contenidos, crear artículos y subir imágenes de forma intuitiva." },
      { question: "¿Cuánto cuesta un proyecto de desarrollo en Next.js en Colombia?", answer: "Nuestros proyectos en Next.js inician desde $2.500.000 COP para sitios corporativos de alto rendimiento, escalando según la complejidad de integraciones, base de datos y módulos interactivos." },
      { question: "¿Cuál es el tiempo promedio de entrega?", answer: "Un sitio web corporativo en Next.js suele desarrollarse en 2 a 4 semanas. Plataformas complejas o aplicaciones SaaS requieren entre 4 a 8 semanas con entregables quincenales verificables." },
    ],
    relatedArticles: [
      { title: "Desarrollo a medida vs. plantillas: cómo elegir en 2026", href: "/blog/desarrollo-web-medida-vs-plantillas" },
      { title: "El costo oculto de una página web lenta", href: "/blog/costo-oculto-pagina-web-lenta" },
      { title: "Por qué el SEO debe planearse desde el inicio", href: "/blog/seo-desde-la-raiz-crear-pagina" },
    ],
  },
  "woocommerce-headless": {
    slug: "woocommerce-headless",
    title: "Desarrollo WooCommerce Headless con Next.js en Colombia",
    shortTitle: "WooCommerce Headless",
    metaTitle: "Desarrollo WooCommerce Headless en Colombia | Next.js E-commerce | K&T Code",
    metaDescription:
      "Agencia experta en WooCommerce Headless y Next.js en Colombia. Acelera tu tienda online con checkout en < 1s, pasarelas Wompi, PayU, Bold y SEO de productos.",
    eyebrow: "// E-commerce Desacoplado de Alto Rendimiento",
    summary:
      "Transformamos tiendas WooCommerce lentas en plataformas headless de alta velocidad con frontend en Next.js. Conservas tu panel de productos y clientes de WooCommerce mientras tus usuarios disfrutan de una experiencia de compra instantánea compatible con pasarelas de pago colombianas.",
    serviceType: "Headless WooCommerce Next.js development Colombia",
    showTechStack: true,
    showPerformanceComparison: true,
    whatWeDevelop: [
      { title: "Frontend Desacoplado en Next.js", description: "Interfaz de catálogo ultra rápida que consulta tu base de datos WooCommerce mediante REST API o GraphQL." },
      { title: "Slide Cart y Checkout Optimizado", description: "Carrito de compras instantáneo con cálculo automático de tarifas de envío por ciudad en Colombia." },
      { title: "Integración de Pasarelas Colombianas", description: "Conexión con Wompi (Bancolombia), Bold, PayU Latam, ePayco, PSE, tarjetas y transferencias Nequi." },
      { title: "SEO para Catálogos y Fichas de Producto", description: "Datos estructurados Product y Offer para mostrar precios, stock y estrellas en Google." },
    ],
    whenWeRecommend: [
      "Tiendas WooCommerce con catálogos medianos o grandes que sufren lentitud por acumulación de plugins.",
      "Marcas que realizan campañas de marketing digital o Cyberlunes y necesitan soportar picos de tráfico masivo sin caídas.",
      "Empresas que buscan una experiencia de compra móvil fluida y moderna tipo aplicación.",
      "Negocios que quieren mejorar su tasa de conversión eliminando las fricciones del checkout tradicional de WordPress.",
    ],
    whenWeDoNotRecommend: [
      "Emprendimientos pequeños con menos de 10 productos que aún no cuentan con tráfico recurrente.",
      "Proyectos que dependen estrictamente de constructores visuales monolíticos dentro del administrador de WordPress.",
    ],
    estimatedTimeline: "3 a 5 semanas para arquitectura, migración y despliegue del frontend headless.",
    priceRangeCOP: "Planes desde $3.800.000 COP según el tamaño del catálogo, variantes y pasarelas de pago requeridas.",
    benefits: [
      { title: "Carga en Menos de 0.5s", description: "Navegación instantánea entre categorías y productos que reduce el rebote y multiplica ventas." },
      { title: "Panel WooCommerce Intacto", description: "Tu equipo sigue gestionando inventario, pedidos y promociones en el panel de WordPress que ya conoce." },
      { title: "Checkout con Pasarelas Locales", description: "Soporte para Wompi, PSE, tarjetas de crédito, Bold y PayU con alta tasa de aprobación." },
      { title: "Seguridad y Cero Caídas", description: "El frontend desacoplado protege el servidor de WordPress contra ataques DDoS y vulnerabilidades." },
    ],
    includes: [
      "Configuración de WooCommerce REST API / WPGraphQL",
      "Desarrollo frontend a medida en Next.js, React y TypeScript",
      "Diseño UI/UX móvil con filtros dinámicos y búsqueda predictiva",
      "Carrito interactivo deslizable y checkout en 1 solo paso",
      "Integración de pasarelas de pago colombianas (Wompi, PayU, Bold, ePayco)",
      "Cálculo de envíos por ciudades colombianas y notificaciones WhatsApp",
      "Configuración de Google Analytics 4 (eventos de e-commerce) y Meta Pixel",
      "Despliegue en Edge CDN y pruebas de estrés de compra",
    ],
    idealFor: [
      "Marcas de e-commerce en Colombia que venden productos físicos a nivel nacional",
      "Tiendas WooCommerce existentes que pierden ventas por tiempos de carga mayores a 3 segundos",
      "Empresas que quieren diferenciarse con una experiencia de compra premium y veloz",
      "Negocios que buscan unificar sus ventas online con software ERP o sucursales físicas",
    ],
    process: [
      { title: "Auditoría de WooCommerce", description: "Revisamos la base de datos de productos, pasarelas actuales, variantes y plugins activos." },
      { title: "Diseño de la Experiencia Móvil", description: "Diseñamos las fichas de producto, filtros rápidos y checkout sin fricción." },
      { title: "Desarrollo Frontend Next.js", description: "Programamos el storefront desacoplado conectando las APIs seguras de WooCommerce." },
      { title: "Pruebas de Pasarelas y Envíos", description: "Validamos compras reales con PSE, tarjetas, cálculo de fletes y confirmaciones automáticas." },
      { title: "Lanzamiento y Monitoreo", description: "Desplegamos en servidores globales y verificamos la medición analítica de conversiones." },
    ],
    faqs: [
      { question: "¿Pierdo mis productos o pedidos actuales al migrar a WooCommerce Headless?", answer: "No. Tu base de datos de WooCommerce, historial de clientes, pedidos y configuración de productos se mantienen 100% intactos. Solo reemplazamos la capa visual por un frontend moderno en Next.js." },
      { question: "¿Cómo se procesan los pagos en una tienda Headless?", answer: "Integramos los SDKs y APIs seguras de pasarelas como Wompi, PayU o Bold para procesar transacciones directamente con confirmaciones webhook en tiempo real hacia tu WooCommerce." },
      { question: "¿Cuánto mejora la velocidad de la tienda?", answer: "Una tienda WooCommerce tradicional suele tardar entre 3.5 a 6 segundos en cargar; con arquitectura Headless en Next.js el tiempo se reduce a menos de 0.8 segundos, generando un aumento inmediato en la tasa de conversión." },
      { question: "¿Qué costo tiene el desarrollo de WooCommerce Headless en Colombia?", answer: "Nuestros proyectos de e-commerce headless inician desde $3.800.000 COP, dependiendo de la cantidad de productos, variantes, cálculo de envíos y pasarelas de pago requeridas." },
      { question: "¿Incluye optimización SEO para los productos?", answer: "Sí. Generamos metadatos dinámicos, marcado de datos estructurados Schema.org para productos (precio, disponibilidad, reseñas) y sitemaps automáticos para que tus productos aparezcan en Google Shopping y búsquedas orgánicas." },
    ],
    relatedArticles: [
      { title: "El costo oculto de una página web lenta", href: "/blog/costo-oculto-pagina-web-lenta" },
      { title: "Desarrollo a medida vs. plantillas", href: "/blog/desarrollo-web-medida-vs-plantillas" },
      { title: "Por qué el SEO debe planearse desde el inicio", href: "/blog/seo-desde-la-raiz-crear-pagina" },
    ],
  },
}

export const servicePageList = Object.values(servicePages)


