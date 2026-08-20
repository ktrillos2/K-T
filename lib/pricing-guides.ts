import type { FaqItem } from "@/lib/seo"

export type PricingGuideData = {
  slug: string
  title: string
  shortTitle: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  summary: string
  averagePriceRange: string
  ktPricingTable?: Array<{
    type: string
    priceStarting: string
    timeline: string
    includes: string
    notIncludes: string
    bestFor: string
  }>
  priceTiers: Array<{
    name: string
    priceRange: string
    timeline: string
    features: string[]
    bestFor: string
  }>
  costFactors: Array<{
    title: string
    description: string
    impact: "Alto" | "Medio" | "Bajo"
  }>
  providerComparison?: Array<{
    provider: string
    priceRange: string
    pros: string
    cons: string
    verdict: string
  }>
  techComparison?: Array<{
    aspect: string
    nextjs: string
    wordpress: string
    builders: string
  }>
  gatewaysColombia?: Array<{
    name: string
    commission: string
    methods: string
    payout: string
  }>
  recurringCosts: Array<{
    item: string
    estimatedCost: string
    frequency: string
    description: string
  }>
  howToChoose: Array<{
    title: string
    description: string
  }>
  faqs: FaqItem[]
  relatedServiceSlug: string
  relatedServiceTitle: string
}

export const pricingGuides: Record<string, PricingGuideData> = {
  "precio-pagina-web-colombia": {
    slug: "precio-pagina-web-colombia",
    title: "¿Cuánto Cuesta una Página Web en Colombia en 2026? Precios Reales y Guía de Cotización",
    shortTitle: "Cuánto cuesta una página web en Colombia",
    metaTitle: "¿Cuánto Cuesta una Página Web en Colombia en 2026? | Precios y Tarifas | K&T Code",
    metaDescription:
      "Descubre cuánto cuesta una página web en Colombia en 2026. Tabla de precios reales desde $450.000 COP para landing pages, $2.500.000 COP para sitios corporativos y $1.300.000 COP para tiendas virtuales.",
    eyebrow: "// Tarifas Transparentes Colombia 2026",
    summary:
      "En Colombia, el precio de una página web profesional oscila desde $450.000 COP para una landing page de alta conversión, desde $2.500.000 COP para un sitio web corporativo completo con CMS autogestionable, y desde $1.300.000 COP para tiendas virtuales con pasarelas de pago. En esta guía detallamos qué incluye cada proyecto, costos de hosting, dominio, mantenimiento y diferencias entre tecnologías.",
    averagePriceRange: "$450.000 - $4.500.000+ COP",
    ktPricingTable: [
      {
        type: "Landing Page de Conversión",
        priceStarting: "Desde $450.000 COP",
        timeline: "7 a 12 días hábiles",
        includes: "Diseño personalizado, hasta 5 secciones, desarrollo frontend ultra rápido en Next.js, formulario WhatsApp, SEO inicial, SSL.",
        notIncludes: "Múltiples páginas internas, carrito de compras ni pasarelas de pago.",
        bestFor: "Campañas de Google Ads, Meta Ads, captación de leads y lanzamientos de productos.",
      },
      {
        type: "Sitio Web Corporativo",
        priceStarting: "Desde $2.500.000 COP",
        timeline: "15 a 25 días hábiles",
        includes: "Hasta 8 páginas internas (Inicio, Empresa, Servicios, Casos, Contacto, Blog), diseño exclusivo en Figma, CMS autogestionable, SEO técnico avanzado, Google Analytics.",
        notIncludes: "Pasarela de pagos con carrito de compras e-commerce.",
        bestFor: "Empresas consolidadas, firmas de consultoría, ingeniería, constructoras y marcas B2B.",
      },
      {
        type: "Tienda Virtual / E-commerce",
        priceStarting: "Desde $1.300.000 COP",
        timeline: "25 a 40 días hábiles",
        includes: "Catálogo autogestionable de productos, carrito de compras, pasarelas de pago colombianas (Wompi, PayU, Bold, PSE, Nequi), cálculo de envíos, panel de pedidos.",
        notIncludes: "Reglas mayoristas complejas con cupos de crédito B2B o integración ERP avanzada.",
        bestFor: "Marcas y comercios que venden productos físicos o digitales a nivel nacional.",
      },
      {
        type: "Software Web a Medida",
        priceStarting: "Cotización según alcance",
        timeline: "4 a 12 semanas (por sprints)",
        includes: "Arquitectura a medida en Next.js y Supabase, base de datos PostgreSQL, roles de usuario, APIs, automatizaciones, facturación DIAN.",
        notIncludes: "Módulos o requerimientos no contemplados en la fase de descubrimiento inicial.",
        bestFor: "Startups, plataformas SaaS, portales privados para clientes y empresas con procesos internos únicos.",
      },
    ],
    priceTiers: [
      {
        name: "Landing Page",
        priceRange: "Desde $450.000 COP",
        timeline: "7 a 12 días hábiles",
        features: [
          "Diseño visual adaptado a tu marca",
          "Desarrollo frontend en Next.js (carga ultra rápida)",
          "Hasta 5 secciones optimizadas para conversión",
          "Formulario conectado a WhatsApp y correo corporativo",
          "Optimización SEO semántica inicial",
          "Configuración de dominio y certificado SSL",
        ],
        bestFor: "Campañas publicitarias, captación de leads, servicios puntuales y profesionales independientes.",
      },
      {
        name: "Sitio Web Corporativo",
        priceRange: "Desde $2.500.000 COP",
        timeline: "15 a 25 días hábiles",
        features: [
          "Diseño exclusivo en Figma sin plantillas repetitivas",
          "Hasta 8 páginas internas estructuradas por intención",
          "Gestor de contenidos (CMS) para publicar artículos y editar textos",
          "SEO técnico integral y datos estructurados Schema.org",
          "Integración con Google Analytics 4 y Google Search Console",
          "Adaptación móvil total y tiempos de carga inferiores a 1 segundo",
        ],
        bestFor: "Empresas que buscan transmitir máxima autoridad, generar cotizaciones B2B y liderar en Google.",
      },
      {
        name: "Tienda Virtual",
        priceRange: "Desde $1.300.000 COP",
        timeline: "25 a 40 días hábiles",
        features: [
          "Catálogo de productos con categorías y variantes",
          "Carrito de compras interactivo y checkout simplificado",
          "Integración de pasarelas de pago colombianas (Wompi, PayU, Bold)",
          "Soporte para pagos por PSE, tarjetas y transferencias Nequi",
          "Cálculo de tarifas de envío por ciudades de Colombia",
          "Panel administrativo para control de stock y pedidos",
        ],
        bestFor: "Comercios, marcas de moda, distribuidores y tiendas de productos físicos o digitales.",
      },
    ],
    providerComparison: [
      {
        provider: "Freelance Económico / Principiante",
        priceRange: "$200.000 - $500.000 COP",
        pros: "Costo inicial muy bajo.",
        cons: "Suelen usar plantillas piratas de WordPress/Elementor lentas, sin optimización móvil ni SEO real. Alto riesgo de abandono del proyecto y nulo soporte posterior.",
        verdict: "Riesgoso para empresas serias; útil solo para pruebas no comerciales.",
      },
      {
        provider: "Plataformas Do It Yourself (Wix, Shopify, Canva)",
        priceRange: "$80.000 - $250.000 COP / mes (en dólares)",
        pros: "Fácil de iniciar por cuenta propia.",
        cons: "Costos mensuales crecientes en dólares que nunca terminan. El código no te pertenece, no puedes migrarlo y las páginas son lentas para el SEO en Colombia.",
        verdict: "Caro a mediano plazo y sin propiedad del software.",
      },
      {
        provider: "Agencia de Ingeniería y Desarrollo (K&T Code)",
        priceRange: "Desde $450.000 COP (Planes claros)",
        pros: "Código propio en Next.js, Core Web Vitals 100/100, diseño exclusivo en Figma, SEO semántico, soporte técnico garantizado y propiedad total del código.",
        cons: "Requiere una definición clara de objetivos de negocio.",
        verdict: "La mejor relación calidad-precio-rendimiento para empresas en Colombia.",
      },
    ],
    techComparison: [
      {
        aspect: "Velocidad Core Web Vitals",
        nextjs: "Sobresaliente (optimización de LCP, CLS e INP)",
        wordpress: "35-65/100 (tiempos degradados por plugins pesados)",
        builders: "40-60/100 (código DOM inflado)",
      },
      {
        aspect: "Seguridad y Vulnerabilidades",
        nextjs: "Inquebrantable (código estático, 0 plugins vulnerables)",
        wordpress: "Vulnerable a hackeos frecuentes por plugins desactualizados",
        builders: "Cerrada pero dependiente de la plataforma",
      },
      {
        aspect: "Posicionamiento SEO en Google",
        nextjs: "HTML5 puro renderizado en servidor (SSR/SSG) con Schema nativo",
        wordpress: "Requiere plugins de SEO que recargan el sitio",
        builders: "Control SEO limitado y estructuras rígidas",
      },
      {
        aspect: "Propiedad del Código",
        nextjs: "100% tuyo en repositorio de GitHub",
        wordpress: "Depende de temas comerciales y licencias",
        builders: "No puedes exportar el código",
      },
    ],
    gatewaysColombia: [
      {
        name: "Wompi (Bancolombia)",
        commission: "2.65% + $700 COP por transacción PSE/Tarjeta",
        methods: "PSE, Bancolombia, Tarjetas Crédito/Débito, Nequi",
        payout: "Transferencia automática a cuenta Bancolombia en 1 día hábil",
      },
      {
        name: "Bold",
        commission: "2.99% + $900 COP + IVA",
        methods: "Datafonos virtuales, PSE, Tarjetas, Link de pago",
        payout: "Transferencia rápida a cualquier banco colombiano",
      },
      {
        name: "PayU Latam",
        commission: "3.29% + $900 COP + IVA",
        methods: "PSE, Tarjetas internacionales, Efecty, SuRed",
        payout: "Programable semanal o mensual a cuenta bancaria",
      },
      {
        name: "ePayco (Davivienda)",
        commission: "2.68% + $900 COP por PSE",
        methods: "PSE, Daviplata, Tarjetas, Efectivo",
        payout: "Abono directo a Daviplata o cuenta bancaria",
      },
    ],
    costFactors: [
      {
        title: "Tecnología de Desarrollo (Next.js vs. WordPress)",
        description: "El desarrollo en código puro con Next.js y React requiere ingeniería especializada pero entrega sitios 10 veces más rápidos, seguros y sin costos de renovación de plugins frente a constructores visuales lentos.",
        impact: "Alto",
      },
      {
        title: "Diseño UI/UX Exclusivo vs. Plantillas Precompradas",
        description: "Diseñar interfaces a medida en Figma adaptadas al manual de marca e identidad de tu empresa multiplica la tasa de conversión en comparación con plantillas recicladas que usan cientos de competidores.",
        impact: "Alto",
      },
      {
        title: "Número de Páginas e Intenciones de Búsqueda",
        description: "Un sitio con páginas dedicadas por cada servicio (/servicios/desarrollo-nextjs, /servicios/tiendas-virtuales) requiere mayor trabajo de redacción y arquitectura, pero domina múltiples palabras clave en Google.",
        impact: "Alto",
      },
      {
        title: "Integraciones de Pasarelas, CRM y WhatsApp",
        description: "Conectar formularios con WhatsApp Business, sistemas CRM o pasarelas de pago automatizadas añade valor operativo al negocio.",
        impact: "Medio",
      },
    ],
    recurringCosts: [
      {
        item: "Dominio (.com o .co)",
        estimatedCost: "$60.000 - $160.000 COP / año",
        frequency: "Anual",
        description: "El nombre web de tu empresa (.com, .co o .com.co) registrado en proveedores oficiales.",
      },
      {
        item: "Hosting Global en el Edge (Vercel / Cloudflare)",
        estimatedCost: "$0 - $90.000 COP / mes",
        frequency: "Mensual",
        description: "Servidores en red CDN global con SSL gratuito, almacenamiento ultrarrápido y disponibilidad del 99.99%.",
      },
      {
        item: "Mantenimiento y Soporte Técnico Continuo",
        estimatedCost: "$250.000 - $600.000 COP / mes",
        frequency: "Opcional mensual",
        description: "Monitoreo de caídas, respaldos de seguridad periódicos, actualización de dependencias y bolsa de horas para mejoras.",
      },
    ],
    howToChoose: [
      {
        title: "Evita presupuestos irreales de $150.000 a $300.000 COP",
        description: "Ningún desarrollo profesional puede cubrir diseño, maquetación, SEO técnico y seguridad por ese valor; terminarás con una web rota que nadie visitará.",
      },
      {
        title: "Exige propiedad absoluta del código y accesos",
        description: "Asegúrate de que el repositorio de código en GitHub, el dominio y los accesos de hosting queden a nombre de tu empresa desde el primer día.",
      },
      {
        title: "Comprueba las métricas de Core Web Vitals en móviles",
        description: "Pide a la agencia demostraciones de velocidad real en Google PageSpeed. Si sus propios sitios marcan en rojo (<50 puntos), tu web tampoco será rápida.",
      },
    ],
    faqs: [
      { question: "¿Cuánto cobra K&T Code por una página web en Colombia?", answer: "Nuestros planes inician desde $450.000 COP para landing pages de alta conversión, desde $2.500.000 COP para sitios web corporativos con CMS autogestionable, y desde $1.300.000 COP para tiendas virtuales completas con pasarelas de pago integradas." },
      { question: "¿El precio incluye dominio y alojamiento web (hosting)?", answer: "Te asesoramos en la compra del dominio a tu nombre y configuramos la infraestructura en redes CDN globales (Vercel / Cloudflare) con certificado SSL gratuito de por vida." },
      { question: "¿Cómo se divide el pago del proyecto?", answer: "Manejamos un esquema seguro por etapas: 50% de anticipo para iniciar la fase de estrategia y diseño UI/UX, y 50% restante contra entrega y verificación en ambiente de pruebas antes de la publicación oficial." },
      { question: "¿Qué pasarelas de pago recomiendan para e-commerce en Colombia?", answer: "Recomendamos principalmente Wompi (por sus transferencias automáticas a cuentas Bancolombia y soporte PSE/Nequi) y Bold por su facilidad de uso y tarifas competitivas (~2.65% a 2.99% por transacción)." },
      { question: "¿Puedo actualizar los contenidos de la página después del lanzamiento?", answer: "Sí. Entregamos la web con un gestor de contenido (CMS Headless) intuitivo para que puedas editar textos, agregar fotos, publicar artículos de blog y cambiar precios sin depender de nadie." },
    ],
    relatedServiceSlug: "desarrollo-web-a-medida",
    relatedServiceTitle: "Desarrollo Web a Medida en Next.js",
  },

  "precio-tienda-virtual-colombia": {
    slug: "precio-tienda-virtual-colombia",
    title: "¿Cuánto Cuesta una Tienda Virtual en Colombia en 2026? Guía de Precios E-commerce",
    shortTitle: "Precio de tiendas virtuales en Colombia",
    metaTitle: "¿Cuánto Cuesta una Tienda Virtual en Colombia? (Precios 2026) | K&T Code",
    metaDescription:
      "Precios reales para crear una tienda virtual en Colombia en 2026. Costos de integración con pasarelas Wompi, PayU, Bold, envíos y desarrollo headless Next.js.",
    eyebrow: "// E-commerce & Pasarelas de Pago Colombia",
    summary:
      "El desarrollo de una tienda virtual profesional en Colombia oscila entre $2.800.000 COP para tiendas estándar hasta más de $7.000.000 COP para plataformas headless de alto rendimiento con miles de productos. En esta guía detallamos los costos de pasarelas, envíos y tecnología.",
    averagePriceRange: "$2.800.000 - $6.500.000 COP",
    priceTiers: [
      {
        name: "Tienda Virtual Starter (Hasta 50 productos)",
        priceRange: "$2.800.000 - $3.800.000 COP",
        timeline: "2 a 3 semanas",
        features: [
          "Catálogo autogestionable de productos con variantes",
          "Integración de pasarela de pagos colombiana (Wompi, PayU o Bold)",
          "Botón de compra directa y pedidos por WhatsApp",
          "Cálculo de tarifas de envíos por ciudades principales",
          "Diseño móvil responsive y certificado de seguridad SSL",
        ],
        bestFor: "Marcas y emprendimientos que comienzan a vender productos físicos a nivel nacional.",
      },
      {
        name: "E-commerce Headless Next.js (Alto Rendimiento)",
        priceRange: "$4.500.000 - $7.000.000 COP",
        timeline: "3 a 6 semanas",
        features: [
          "Frontend desacoplado en Next.js con carga en < 0.8s",
          "Backend en WooCommerce o Shopify con panel administrativo completo",
          "Slide Cart interactivo y checkout sin fricción",
          "Integración múltiple de pasarelas (Wompi, PSE, tarjetas, Nequi)",
          "SEO avanzado para fichas de producto (Schema Product)",
        ],
        bestFor: "Marcas consolidadas, tiendas con alto tráfico en Cyberlunes/Black Friday y negocios que buscan maximizar conversión.",
      },
      {
        name: "Plataforma E-commerce a Medida / B2B",
        priceRange: "$8.000.000+ COP",
        timeline: "6 a 10 semanas",
        features: [
          "Catálogo mayorista con listas de precios personalizadas por cliente",
          "Integración con software ERP, inventario físico y facturación DIAN",
          "Roles de compra corporativa, cotizaciones y pedidos a crédito",
          "Arquitectura cloud escalable de alta disponibilidad",
        ],
        bestFor: "Empresas distribuidoras, importadores y comercio mayorista B2B en Colombia.",
      },
    ],
    costFactors: [
      {
        title: "Comisiones de Pasarelas de Pago en Colombia",
        description: "Pasarelas como Wompi, PayU, Bold o ePayco cobran entre 2.6% y 3.2% + $900 COP por transacción exitosa. No es un costo de desarrollo pero influye en la rentabilidad.",
        impact: "Alto",
      },
      {
        title: "Complejidad del Catálogo y Variantes",
        description: "Un catálogo con miles de SKUs, tallas, colores e inventarios por bodega física requiere mayor trabajo de modelado de datos.",
        impact: "Alto",
      },
      {
        title: "Integraciones Logísticas y Envíos",
        description: "Conexión automática con transportadoras (Coordinadora, Servientrega, Envia) para cotización de fletes en tiempo real.",
        impact: "Medio",
      },
    ],
    recurringCosts: [
      {
        item: "Comisión por Venta (Wompi / PayU / Bold)",
        estimatedCost: "2.6% - 3.2% + $900 COP / venta",
        frequency: "Por transacción",
        description: "Costo cobrado directamente por la pasarela de pagos bancaria.",
      },
      {
        item: "Hosting y CDN para E-commerce",
        estimatedCost: "$40.000 - $150.000 COP / mes",
        frequency: "Mensual",
        description: "Servidores seguros para procesar pagos y catálogos con tráfico concurrente.",
      },
    ],
    howToChoose: [
      {
        title: "Prioriza la velocidad del checkout móvil",
        description: "Cada segundo adicional de carga en el carrito reduce las ventas en un 20%. Exige una tienda que cargue en menos de 1 segundo.",
      },
      {
        title: "Verifica que soporte pagos con PSE y Nequi",
        description: "En Colombia más del 65% de las compras online se realizan por PSE o billeteras digitales, no con tarjetas de crédito.",
      },
    ],
    faqs: [
      { question: "¿Cuánto cobra Wompi o Bold por recibir pagos en Colombia?", answer: "Wompi cobra alrededor de 2.65% + $700 COP por pagos con PSE o tarjetas de crédito Bancolombia. Bold y PayU manejan tarifas similares entre 2.8% a 3.19% + IVA." },
      { question: "¿Puedo subir los productos yo mismo?", answer: "Sí. Te entregamos la tienda con capacitación completa para que puedas crear productos, modificar precios, agregar fotos y despachar pedidos." },
      { question: "¿Es mejor una tienda en Shopify o con Next.js + WooCommerce?", answer: "Shopify es excelente para iniciar pero cobra mensualidades en dólares y comisiones adicionales. Next.js + WooCommerce ofrece propiedad total, sin mensualidades obligatorias y velocidad superior." },
    ],
    relatedServiceSlug: "tiendas-virtuales",
    relatedServiceTitle: "Servicio de Desarrollo de Tiendas Virtuales",
  },
  "precio-software-a-medida": {
    slug: "precio-software-a-medida",
    title: "¿Cuánto Cuesta un Software a Medida en Colombia en 2026? Guía de Cotización",
    shortTitle: "Precio de software a medida en Colombia",
    metaTitle: "¿Cuánto Cuesta un Software a Medida en Colombia? (Precios 2026) | K&T Code",
    metaDescription:
      "Guía de precios y costos de desarrollo de software a medida en Colombia 2026. Tarifas para SaaS, paneles administrativos, portales web y bases de datos.",
    eyebrow: "// Desarrollo de Software & SaaS Corporativo",
    summary:
      "El costo de un software web a medida en Colombia inicia desde $5.000.000 COP para MVPs o módulos funcionales básicos, y puede superar los $20.000.000 COP en plataformas empresariales complejas. Conoce cómo se presupuesta un software por fases y evita desviaciones de alcance.",
    averagePriceRange: "$5.000.000 - $25.000.000+ COP",
    priceTiers: [
      {
        name: "MVP Funcional / Módulo Específico",
        priceRange: "$5.000.000 - $9.000.000 COP",
        timeline: "4 a 6 semanas",
        features: [
          "Levantamiento de procesos y modelado de base de datos relacional",
          "Autenticación segura de usuarios y roles básicos",
          "Panel administrativo con CRUD de información clave",
          "Desarrollo fullstack con Next.js, TypeScript y Supabase",
          "Despliegue en servidores cloud escalables",
        ],
        bestFor: "Startups que necesitan validar un producto con clientes reales o empresas que buscan automatizar un proceso manual crítico.",
      },
      {
        name: "Plataforma SaaS o Portal Corporativo",
        priceRange: "$10.000.000 - $18.000.000 COP",
        timeline: "6 a 10 semanas",
        features: [
          "Múltiples roles de usuario con permisos avanzados y auditoría",
          "Integración con pasarelas de pago recurrentes (suscripciones)",
          "Generación automática de reportes, PDFs y analítica en tiempo real",
          "Conexión con APIs de facturación electrónica DIAN o WhatsApp",
          "Pruebas de estrés, seguridad y concurrencia",
        ],
        bestFor: "Empresas en crecimiento que requieren un sistema centralizado para coordinar clientes, proveedores o equipos internos.",
      },
      {
        name: "Sistema Empresarial Complejo / ERP a Medida",
        priceRange: "$20.000.000+ COP",
        timeline: "10 a 16 semanas por sprints",
        features: [
          "Arquitectura distribuida con microservicios o Server Actions de alto rendimiento",
          "Sincronización bidireccional con bases de datos legadas y ERPs",
          "Cumplimiento de estándares de seguridad corporativa y cifrado de datos",
          "Plan de soporte dedicado, SLAs y mantenimiento continuo",
        ],
        bestFor: "Corporaciones con operaciones masivas que no pueden adaptarse a las restricciones de software enlatado genérico.",
      },
    ],
    costFactors: [
      {
        title: "Complejidad de la Lógica de Negocio",
        description: "El número de reglas, cálculos automáticos, validaciones y flujos condicionales determina directamente las horas de ingeniería.",
        impact: "Alto",
      },
      {
        title: "Integraciones con Sistemas Externos",
        description: "Conectar el software con la DIAN, pasarelas de pago, CRMs o servicios bancarios requiere manejo de webhooks y seguridad rigurosa.",
        impact: "Alto",
      },
      {
        title: "Seguridad y Roles de Usuario",
        description: "Control de accesos por roles (RBAC), autenticación en dos pasos (2FA) y registros de auditoría.",
        impact: "Medio",
      },
    ],
    recurringCosts: [
      {
        item: "Infraestructura Cloud (Supabase / PostgreSQL / Vercel)",
        estimatedCost: "$100.000 - $350.000 COP / mes",
        frequency: "Mensual",
        description: "Bases de datos gestionadas, backups diarios automatizados y cómputo serverless.",
      },
      {
        item: "SLA de Soporte y Evolución Continua",
        estimatedCost: "$600.000 - $1.800.000 COP / mes",
        frequency: "Opcional",
        description: "Mantenimiento preventivo, resolución de incidencias prioritarias y bolsa de horas de desarrollo.",
      },
    ],
    howToChoose: [
      {
        title: "Desarrolla por fases (Metodología Ágil)",
        description: "No intentes construir el 100% de tus ideas desde el día uno. Lanza un MVP funcional, pruébalo con usuarios reales y amplía módulos con datos ciertos.",
      },
      {
        title: "Exige tecnologías modernas y libres de licencias atadas",
        description: "Trabajar con Next.js, React, TypeScript y PostgreSQL garantiza que puedas contratar nuevos desarrolladores en el futuro sin quedar atrapado.",
      },
    ],
    faqs: [
      { question: "¿Cómo se cotiza un desarrollo de software a medida?", answer: "En K&T realizamos una sesión inicial de levantamiento de requerimientos para desglosar el software en épicas y tareas con estimación de horas y costo cerrado por etapas verificables." },
      { question: "¿Quién es el dueño del código fuente?", answer: "Tu empresa es 100% propietaria del código fuente, repositorio, esquemas de bases de datos y propiedad intelectual del software desarrollado." },
      { question: "¿Pueden integrar el software con facturación electrónica DIAN?", answer: "Sí. Realizamos integraciones con proveedores autorizados por la DIAN para emisión automática de facturas electrónicas, notas crédito y nómina electrónica." },
    ],
    relatedServiceSlug: "software-a-medida",
    relatedServiceTitle: "Servicio de Desarrollo de Software a Medida",
  },
}

export const pricingGuideList = Object.values(pricingGuides)
