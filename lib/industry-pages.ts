import type { FaqItem } from "@/lib/seo"

export type FeaturedProjectInIndustry = {
  client: string
  slug: string
  role: string
  metrics: string
  description: string
  tech: string[]
}

export type IndustryPageData = {
  slug: string
  title: string
  shortTitle: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  summary: string
  industryName: string
  industryChallenges: Array<{ title: string; description: string }>
  keyFeatures: Array<{ title: string; description: string }>
  techStack: Array<{ name: string; tag: string }>
  process: Array<{ title: string; description: string }>
  featuredProjects: FeaturedProjectInIndustry[]
  faqs: FaqItem[]
  relatedServiceSlug: string
  relatedServiceTitle: string
}

export const industryPages: Record<string, IndustryPageData> = {
  // ─── 1. INMOBILIARIA ──────────────────────────────────────────
  "desarrollo-web-inmobiliarias": {
    slug: "desarrollo-web-inmobiliarias",
    title: "Desarrollo de Páginas Web para Inmobiliarias y Empresas Proptech en Colombia",
    shortTitle: "Desarrollo web inmobiliarias",
    metaTitle: "Páginas Web para Inmobiliarias en Colombia | Next.js & CRM | K&T Code",
    metaDescription:
      "Desarrollo de páginas web y portales para inmobiliarias en Colombia. Buscadores avanzados de inmuebles, mapas interactivos, integración con WhatsApp y CRM.",
    eyebrow: "// Soluciones Digitales para el Sector Inmobiliario",
    summary:
      "Diseñamos y desarrollamos portales inmobiliarios de alto rendimiento en Colombia con Next.js. Filtros inteligentes por ciudad, estrato, precio y tipo de inmueble, galerías multimedia ultra rápidas y conexión directa a WhatsApp para captar compradores y arrendatarios calificados.",
    industryName: "Inmobiliario y Proptech",
    industryChallenges: [
      { title: "Carga lenta de galerías de fotos", description: "Los portales tradicionales tardan más de 5 segundos en cargar fotos pesadas, espantando a compradores potenciales." },
      { title: "Pérdida de leads y contactos", description: "Formularios engorrosos sin integración directa a WhatsApp ni enrutamiento por asesor comercial." },
      { title: "Buscadores poco intuitivos", description: "Filtros rígidos que dificultan encontrar propiedades por barrio, estrato, canon o amenidades." },
    ],
    keyFeatures: [
      { title: "Buscador Predictivo y Filtros Avanzados", description: "Búsqueda instantánea por ubicación, estrato, rango de precio, habitaciones y tipo de inmueble." },
      { title: "Mapas Interactivos (Mapbox / Google Maps)", description: "Visualización geoespacial de propiedades y puntos de interés cercanos (colegios, vías, comercio)." },
      { title: "Galerías Optimizadas en WebP/AVIF", description: "Carga instantánea de fotos de alta resolución y recorridos virtuales 360°." },
      { title: "Enrutamiento de Leads por WhatsApp", description: "Botón directo que asigna automáticamente el inmueble al asesor comercial responsable con mensaje pre-rellenado." },
      { title: "Sincronización con Software Inmobiliario", description: "Integración vía API con sistemas CRM (Wasi, Tokko Broker, EasyBroker o paneles custom)." },
      { title: "SEO Local para Proyectos Inmobiliarios", description: "Páginas dedicadas para proyectos sobre planos con marcado Schema para posicionar en búsquedas locales." },
    ],
    techStack: [
      { name: "Next.js (App Router)", tag: "Frontend & SSR" },
      { name: "PostgreSQL / Supabase", tag: "Base de Datos Inmuebles" },
      { name: "Mapbox GL / Google Maps API", tag: "Geolocalización" },
      { name: "AWS S3 / Cloudflare R2", tag: "Almacenamiento Multimedia" },
    ],
    process: [
      { title: "Estructura de Catálogo y Filtros", description: "Definimos categorías (Venta, Arriendo, Proyectos Nuevos) y atributos clave de búsqueda." },
      { title: "Diseño UI/UX Inmobiliario", description: "Creamos la interfaz de fichas de propiedad, galería móvil y llamados a la acción de contacto." },
      { title: "Desarrollo Frontend y Base de Datos", description: "Programamos el buscador instantáneo y panel para publicación ágil de nuevos inmuebles." },
      { title: "Integración de Mapas y WhatsApp", description: "Conectamos geolocalización precisa y botones inteligentes de contacto." },
      { title: "SEO Local y Lanzamiento", description: "Configuramos datos estructurados y sitemaps para posicionar inmuebles en Google." },
    ],
    featuredProjects: [
      {
        client: "Brambila's Inmobiliaria",
        slug: "brambila-inmobiliaria",
        role: "Portal Inmobiliario & Gestión de Propiedades",
        metrics: "Lighthouse 98/100 • LCP 580 ms • Catálogo de Inmuebles Dinámico",
        description: "Plataforma de bienes raíces con catálogo de inmuebles en venta y arriendo, fichas interactivas y contacto instantáneo con asesores.",
        tech: ["Next.js", "React", "Tailwind CSS", "WhatsApp API"],
      },
    ],
    faqs: [
      { question: "¿La inmobiliaria puede subir y actualizar inmuebles fácilmente?", answer: "Sí. Diseñamos un panel intuitivo donde tu equipo puede subir fotos, cambiar precios, marcar propiedades como vendidas o destacadas y gestionar agentes en minutos." },
      { question: "¿Se puede integrar con plataformas como Wasi o Tokko?", answer: "Sí. Podemos conectar la web con tu software inmobiliario actual mediante APIs para que el inventario se actualice automáticamente." },
      { question: "¿Cómo ayuda Next.js a posicionar las propiedades en Google?", answer: "Next.js genera páginas estáticas optimizadas para cada inmueble, permitiendo que Google indexe fichas completas con precios, fotos y ubicación en las primeras posiciones." },
    ],
    relatedServiceSlug: "desarrollo-web-a-medida",
    relatedServiceTitle: "Desarrollo Web a Medida",
  },

  // ─── 2. SALUD MENTAL Y BIENESTAR ─────────────────────────────
  "desarrollo-web-salud": {
    slug: "desarrollo-web-salud",
    title: "Desarrollo Web para Clínicas, Médicos y Centros de Salud Mental en Colombia",
    shortTitle: "Desarrollo web salud y médicos",
    metaTitle: "Páginas Web para Clínicas y Psicólogos en Colombia | K&T Code",
    metaDescription:
      "Diseño y desarrollo web médico para consultorios, psicólogos y clínicas en Colombia. Agendamiento online, telemedicina, SEO médico local y cumplimiento de privacidad.",
    eyebrow: "// Presencia Digital para el Sector Salud",
    summary:
      "Desarrollamos páginas web para psicólogos, médicos especialistas, clínicas y centros de rehabilitación en Colombia. Transmite confianza médica, facilita el agendamiento de citas presenciales o virtuales y posiciona en Google con SEO especializado en salud.",
    industryName: "Salud, Psicología y Medicina",
    industryChallenges: [
      { title: "Falta de confianza visual del paciente", description: "Diseños poco profesionales que no comunican el rigor científico ni la calidez humana requerida en salud." },
      { title: "Dificultad para agendar citas médicas", description: "Procesos manuales por teléfono que colapsan la recepción y aumentan el ausentismo de pacientes." },
      { title: "Poco posicionamiento en búsquedas médicas", description: "No aparecer cuando pacientes locales buscan tratamientos o especialistas en su ciudad." },
    ],
    keyFeatures: [
      { title: "Sistema de Agendamiento Online", description: "Integración con calendarios (Google Calendar, Calendly o software médico) para reservas 24/7." },
      { title: "Directorio de Especialistas y Perfiles Médicos", description: "Hojas de vida con formación, registro médico, áreas de experiencia y testimonios." },
      { title: "Sección de Tratamientos y Procedimientos", description: "Páginas detalladas para cada patología o servicio con explicaciones claras y botón de consulta." },
      { title: "Cumplimiento de Privacidad y Consentimiento", description: "Manejo seguro de datos conforme a la Ley Habeas Data y normatividad de salud en Colombia." },
      { title: "SEO Médico Local y Schema MedicalBusiness", description: "Marcado semántico estructurado para destacar en Google Maps y búsquedas especializadas." },
    ],
    techStack: [
      { name: "Next.js", tag: "Frontend & SSR" },
      { name: "Tailwind CSS", tag: "Diseño & Accesibilidad" },
      { name: "WhatsApp Business API", tag: "Atención al Paciente" },
      { name: "Vercel Edge", tag: "Velocidad Global" },
    ],
    process: [
      { title: "Definición de Servicios y Especialidades", description: "Estructuramos la oferta de consultas presenciales, telemedicina y tratamientos." },
      { title: "Diseño Empático y Accesible", description: "Colores y tipografías que transmiten calma, bienestar y autoridad profesional." },
      { title: "Integración de Agendamiento y WhatsApp", description: "Configuramos los canales de cita directa con confirmaciones automáticas." },
      { title: "Optimización SEO y Lanzamiento", description: "Indexamos fichas de tratamientos y credenciales médicas en Google." },
    ],
    featuredProjects: [
      {
        client: "Psicowork Colombia",
        slug: "psicowork",
        role: "Portal Institucional y Salud Mental",
        metrics: "Lighthouse 99/100 • LCP 620 ms • Agendamiento de Citas",
        description: "Plataforma de psicología clínica y bienestar corporativo con agendamiento directo y segmentación de servicios para personas y empresas.",
        tech: ["Next.js", "React", "Tailwind CSS", "WhatsApp API"],
      },
    ],
    faqs: [
      { question: "¿Puedo recibir pagos de consultas virtuales online?", answer: "Sí. Integramos pasarelas de pago seguras como Wompi o Bold para cobrar consultas antes de la videollamada." },
      { question: "¿Cómo se protege la información sensible de los pacientes?", answer: "Implementamos certificados SSL de alta seguridad y formularios que no almacenan historiales clínicos en servidores no certificados." },
    ],
    relatedServiceSlug: "desarrollo-web-a-medida",
    relatedServiceTitle: "Desarrollo Web a Medida",
  },

  // ─── 3. INGENIERÍA Y CONSTRUCCIÓN ────────────────────────────
  "desarrollo-web-ingenieria": {
    slug: "desarrollo-web-ingenieria",
    title: "Desarrollo Web para Empresas de Ingeniería, Construcción y Arquitectura",
    shortTitle: "Desarrollo web ingeniería y construcción",
    metaTitle: "Páginas Web para Empresas de Ingeniería y Construcción | K&T Code",
    metaDescription:
      "Páginas web corporativas para firmas de ingeniería, constructoras y arquitectura en Colombia. Fichas técnicas, portafolio de obras, licitaciones y velocidad Next.js.",
    eyebrow: "// Presencia Digital para Firmas de Ingeniería",
    summary:
      "Construimos sitios web corporativos de alta credibilidad para firmas de ingeniería civil, eléctrica, ambiental y constructoras en Colombia. Presenta portafolios de mega-obras, fichas técnicas descargables y credenciales corporativas para ganar licitaciones y clientes B2B.",
    industryName: "Ingeniería, Construcción e Infraestructura",
    industryChallenges: [
      { title: "Sitios desactualizados que no transmiten solidez", description: "Páginas antiguas que no reflejan la capacidad técnica ni el volumen real de obras ejecutadas." },
      { title: "Dificultad para presentar proyectos y licitaciones", description: "Falta de fichas de proyecto estructuradas con métricas, clientes y certificaciones ISO." },
      { title: "Navegación lenta en propuestas corporativas", description: "Tiempos de carga lentos que generan una primera impresión deficiente ante comités de compras." },
    ],
    keyFeatures: [
      { title: "Portafolio de Obras y Proyectos Ejecutados", description: "Fichas interactivas con fotografías antes/después, especificaciones técnicas y cliente final." },
      { title: "Centro de Descargas Técnicas y Certificaciones", description: "Sección para catálogos, certificados de calidad ISO, RUP y hojas de vida corporativas." },
      { title: "Líneas de Negocio y Servicios de Ingeniería", description: "Páginas dedicadas para cada especialidad técnica (obras civiles, consultoría, interventoría)." },
      { title: "Formularios de Licitaciones y Proveedores", description: "Módulos de registro para proveedores, cotizaciones de proyectos y reclutamiento de ingenieros." },
      { title: "Diseño Corporativo sobrio y elegante", description: "Estética visual de alto nivel que transmite rigor técnico, solidez financiera y experiencia." },
    ],
    techStack: [
      { name: "Next.js", tag: "Frontend Corporativo" },
      { name: "Tailwind CSS", tag: "Diseño & UI" },
      { name: "Sanity CMS", tag: "Gestión de Portafolio de Obras" },
      { name: "Cloudflare Edge", tag: "Seguridad & CDN" },
    ],
    process: [
      { title: "Levantamiento de Obras y Servicios", description: "Categorizamos las áreas de especialidad técnica y seleccionamos los proyectos más representativos." },
      { title: "Diseño Visual de Autoridad B2B", description: "Estructuramos la jerarquía visual para destacar cifras clave (m² construidos, años de experiencia, clientes)." },
      { title: "Desarrollo en Next.js", description: "Programamos un sitio ultra rápido y seguro, sin vulnerabilidades de plugins." },
      { title: "Publicación de Documentación y SEO", description: "Optimizamos metadatos para posicionar la firma en licitaciones y contrataciones privadas." },
    ],
    featuredProjects: [
      {
        client: "Nosky Group",
        slug: "nosky-group",
        role: "Portal Corporativo & Proyectos de Ingeniería",
        metrics: "Lighthouse 98/100 • LCP 610 ms • Presentación de Obras",
        description: "Plataforma empresarial para firma de ingeniería y construcción con catálogo de proyectos de infraestructura y captación B2B.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      },
    ],
    faqs: [
      { question: "¿Podemos actualizar nuestro portafolio de obras sin depender de un programador?", answer: "Sí. Entregamos un CMS intuitivo donde puedes añadir nuevos proyectos con sus fotos, ubicación y descripción en segundos." },
      { question: "¿Cómo ayuda la web en licitaciones públicas y privadas?", answer: "Una web rápida, moderna y con fichas técnicas descargables genera confianza inmediata en los evaluadores de compras y comités técnicos." },
    ],
    relatedServiceSlug: "desarrollo-web-a-medida",
    relatedServiceTitle: "Desarrollo Web a Medida",
  },

  // ─── 4. E-COMMERCE B2B Y DISTRIBUIDORES ──────────────────────
  "ecommerce-b2b": {
    slug: "ecommerce-b2b",
    title: "Desarrollo de Plataformas E-commerce B2B y Portales Mayoristas en Colombia",
    shortTitle: "E-commerce B2B y mayoristas",
    metaTitle: "E-commerce B2B y Portales Mayoristas en Colombia | Next.js | K&T Code",
    metaDescription:
      "Desarrollo de tiendas virtuales B2B en Colombia. Precios por volumen, cotizadores automáticos, integración ERP y pasarelas de pago para empresas mayoristas.",
    eyebrow: "// Comercio Electrónico Mayorista y B2B",
    summary:
      "Desarrollamos tiendas virtuales y portales B2B para mayoristas, fabricantes y distribuidores en Colombia. Habilita listas de precios personalizadas por cliente, pedidos por volumen, facturación electrónica y pasarelas de pago corporativas con arquitectura Next.js.",
    industryName: "Comercio Mayorista, Fabricantes y B2B",
    industryChallenges: [
      { title: "Gestión manual de pedidos por WhatsApp y PDF", description: "Procesar órdenes por chat genera errores en despachos, pérdida de cotizaciones y sobrecarga del equipo comercial." },
      { title: "Diferentes listas de precios y condiciones de crédito", description: "Los carritos estándar de compras no soportan precios por volumen ni cupos a 30/60 días." },
      { title: "Catálogos pesados y lentos", description: "Plataformas tradicionales que colapsan al manejar miles de SKUs con variantes de color, talla o peso." },
    ],
    keyFeatures: [
      { title: "Precios Diferenciados por Nivel de Cliente", description: "Precios mayoristas visibles solo para distribuidores registrados y aprobados." },
      { title: "Generador Instantáneo de Cotizaciones en PDF", description: "Los clientes empresariales pueden armar su carrito y exportar una cotización formal con validez comercial." },
      { title: "Mínimos de Compra y Descuentos por Volumen", description: "Reglas automáticas de compra mínima por caja, docena o monto total." },
      { title: "Sincronización con ERP / Facturación DIAN", description: "Conexión vía API con sistemas de inventario (Siigo, World Office, SAP) para stock en tiempo real." },
      { title: "Pasarelas de Pago B2B (PSE, Transferencia y Wompi)", description: "Cobros instantáneos con conciliación bancaria automática." },
    ],
    techStack: [
      { name: "Next.js (Headless E-commerce)", tag: "Frontend" },
      { name: "PostgreSQL / Medusa / Shopify API", tag: "Motor B2B" },
      { name: "Wompi / Bold / PSE", tag: "Pasarelas Colombia" },
      { name: "Vercel Serverless", tag: "Escalabilidad" },
    ],
    process: [
      { title: "Estructuración de Reglas Comerciales B2B", description: "Definimos categorías, listas de precios, políticas de crédito y mínimos de orden." },
      { title: "Diseño UX Enfocado en Pedidos Rápidos", description: "Creamos interfaces de pedido masivo por SKU para clientes recurrentes." },
      { title: "Desarrollo del Motor E-commerce", description: "Programamos la lógica de precios, pasarelas de pago y sincronización de stock." },
      { title: "Pruebas de Carga y Lanzamiento", description: "Validamos transacciones seguras bajo alto tráfico de pedidos corporativos." },
    ],
    featuredProjects: [
      {
        client: "Telas Real",
        slug: "telas-real",
        role: "Catálogo E-commerce Textil B2B",
        metrics: "Lighthouse 98/100 • LCP 590 ms • Catálogo Mayorista",
        description: "Catálogo digital de textiles y telas al por mayor con cálculo de metraje y cotizador directo para talleres y diseñadores.",
        tech: ["Next.js", "React", "Tailwind CSS", "WhatsApp API"],
      },
      {
        client: "Eklipse Home Textil",
        slug: "eklipse-home-textil",
        role: "Tienda Virtual & Catálogo de Blancos",
        metrics: "Lighthouse 97/100 • LCP 640 ms • Alta Conversión",
        description: "E-commerce de productos textiles para el hogar y hotelería con filtrado por medidas y variantes.",
        tech: ["Next.js", "Tailwind CSS", "E-commerce"],
      },
    ],
    faqs: [
      { question: "¿Puedo ocultar los precios al público general y mostrarlos solo a empresas?", answer: "Sí. Configuramos un sistema de registro donde el distribuidor inicia sesión para ver sus tarifas exclusivas." },
      { question: "¿Cómo se conecta la tienda con nuestro inventario actual?", answer: "Mediante webhooks y REST APIs podemos sincronizar stock con tu software contable o actualizar mediante archivos Excel automáticos." },
    ],
    relatedServiceSlug: "tiendas-virtuales",
    relatedServiceTitle: "Desarrollo de Tiendas Virtuales",
  },

  // ─── 5. TURISMO, HOTELES Y GASTRONOMÍA ────────────────────────
  "desarrollo-web-turismo": {
    slug: "desarrollo-web-turismo",
    title: "Desarrollo Web para Hoteles, Agencias de Turismo y Restaurantes en Colombia",
    shortTitle: "Desarrollo web turismo y hoteles",
    metaTitle: "Páginas Web para Hoteles y Turismo en Colombia | K&T Code",
    metaDescription:
      "Desarrollo de páginas web para hoteles, agencias de viajes y glampings en Colombia. Motores de reserva directa, cero comisiones de OTAs y velocidad Next.js.",
    eyebrow: "// Soluciones Digitales para Turismo y Hospitalidad",
    summary:
      "Construimos plataformas web para hoteles, glampings, agencias de turismo y restaurantes en Colombia. Reduce comisiones de plataformas intermediarias (Booking, Airbnb) con un motor de reservas directas, galerías inmersivas y pasarelas de pago locales.",
    industryName: "Turismo, Hotelería y Experiencias",
    industryChallenges: [
      { title: "Altas comisiones de intermediarios (OTAs)", description: "Pagar entre 15% y 25% a Booking o Airbnb reduce drásticamente el margen neto del hotel." },
      { title: "Sitios lentos que no transmiten la belleza del destino", description: "Fotos comprimidas de baja calidad y tiempos de carga largos que hacen perder al viajero." },
      { title: "Falta de motor de reserva multimoneda", description: "Dificultad para cobrar en COP a colombianos con PSE y en USD a turistas extranjeros con tarjeta." },
    ],
    keyFeatures: [
      { title: "Motor de Reserva Directa (Cero Comisiones)", description: "Calendario en tiempo real de disponibilidad por habitación o tour con pago online." },
      { title: "Galerías Inmersivas y Recorridos Visuales", description: "Exhibición de habitaciones, amenidades y paisajes con carga en milisegundos." },
      { title: "Cobro Multimoneda (COP / USD)", description: "Integración con Wompi, Bold y Stripe para recibir pagos locales e internacionales." },
      { title: "Sincronización con Channel Managers", description: "Conexión iCal / API para evitar sobreventas entre Booking, Airbnb y tu web directa." },
      { title: "SEO Turístico y Guías de Destino", description: "Artículos y páginas optimizadas para captar viajeros que buscan qué hacer en tu región." },
    ],
    techStack: [
      { name: "Next.js", tag: "Frontend Visual" },
      { name: "Wompi / Bold / Stripe", tag: "Pagos Multimoneda" },
      { name: "Cloudflare CDN", tag: "Entrega Global" },
      { name: "Framer Motion", tag: "Micro-animaciones" },
    ],
    process: [
      { title: "Estructuración de Habitaciones y Paquetes", description: "Definimos temporadas, tarifas, políticas de cancelación y extras." },
      { title: "Diseño Visual Inmersivo", description: "Creamos una experiencia estética que enamora al turista desde el primer clic." },
      { title: "Integración del Motor de Reservas", description: "Configuramos calendarios, pasarelas de pago y confirmaciones por email/WhatsApp." },
      { title: "Optimización SEO Multilingüe", description: "Preparamos la plataforma para indexarse en español e inglés." },
    ],
    featuredProjects: [
      {
        client: "Casa Medina",
        slug: "casa-medina",
        role: "Portal Hotelero & Reservas de Hospedaje",
        metrics: "Lighthouse 98/100 • LCP 540 ms • Motor de Reservas",
        description: "Plataforma web para hotel y hospedaje con presentación de habitaciones, tarifas y contacto directo.",
        tech: ["Next.js", "Tailwind CSS", "Vercel Edge"],
      },
      {
        client: "San Roqueros",
        slug: "san-roqueros",
        role: "Portal Gastronómico y Experiencias",
        metrics: "Lighthouse 99/100 • LCP 520 ms • Menú Digital",
        description: "Sitio web para establecimiento gastronómico y eventos con menú interactivo y geolocalización.",
        tech: ["Next.js", "React", "Framer Motion"],
      },
    ],
    faqs: [
      { question: "¿Cómo evitamos que se dupliquen reservas con Booking o Airbnb?", answer: "Sincronizamos el calendario de la web mediante enlaces iCal estándar o API directa con tu Channel Manager para que las fechas ocupadas se bloqueen automáticamente." },
      { question: "¿Puedo recibir pagos en dólares de turistas extranjeros?", answer: "Sí. Integramos pasarelas internacionales para que clientes de EE. UU., Europa o Latinoamérica paguen en su moneda local." },
    ],
    relatedServiceSlug: "desarrollo-web-a-medida",
    relatedServiceTitle: "Desarrollo Web a Medida",
  },

  // ─── 6. SECTOR AUTOMOTRIZ Y AUTOPARTES ────────────────────────
  "desarrollo-web-automotriz": {
    slug: "desarrollo-web-automotriz",
    title: "Desarrollo Web para Concesionarios, Autopartes y Talleres en Colombia",
    shortTitle: "Desarrollo web automotriz",
    metaTitle: "Páginas Web para Concesionarios y Autopartes en Colombia | K&T Code",
    metaDescription:
      "Desarrollo de páginas web y catálogos de repuestos para el sector automotriz en Colombia. Buscador de repuestos por marca/modelo, cotizador y velocidad Next.js.",
    eyebrow: "// Presencia Digital para el Sector Automotriz",
    summary:
      "Desarrollamos sitios web y catálogos interactivos para concesionarios de vehículos, distribuidores de repuestos y talleres especializados en Colombia. Búsqueda ágil por marca, modelo y año, fichas técnicas y conexión directa con asesores de venta.",
    industryName: "Automotriz, Repuestos y Concesionarios",
    industryChallenges: [
      { title: "Catálogos de repuestos difíciles de buscar", description: "Clientes que no encuentran la pieza exacta por falta de filtros por modelo, año y número de parte (OEM)." },
      { title: "Fichas de vehículos sin impacto visual", description: "Fotografías lentas y formularios largos que desmotivan al comprador de vehículos nuevos o usados." },
      { title: "Desconexión con el inventario físico", description: "Publicación desactualizada de unidades ya vendidas que frustra a los prospectos." },
    ],
    keyFeatures: [
      { title: "Buscador de Repuestos por Marca / Modelo / Año", description: "Filtrado predictivo de piezas compatibles en milisegundos." },
      { title: "Showroom Virtual de Vehículos", description: "Fichas con especificaciones técnicas, kilometraje, simulador de crédito y botón de prueba de manejo (Test Drive)." },
      { title: "Cotizador Automático por WhatsApp", description: "Mensaje directo con la referencia exacta del repuesto o vehículo consultado." },
      { title: "Módulo de Agendamiento de Citas de Taller", description: "Reservas online para mantenimiento preventivo, cambio de aceite o peritajes." },
    ],
    techStack: [
      { name: "Next.js", tag: "Frontend Ultra Rápido" },
      { name: "PostgreSQL / Supabase", tag: "Base de Datos de Repuestos" },
      { name: "Tailwind CSS", tag: "Diseño & UI" },
      { name: "WhatsApp Business API", tag: "Asesoría Inmediata" },
    ],
    process: [
      { title: "Estructuración de Marcas y Modelos", description: "Jerarquizamos las líneas de repuestos o inventario de vehículos disponibles." },
      { title: "Diseño de Showroom y Fichas Técnicas", description: "Diseñamos interfaces de alta conversión orientadas a generar cotizaciones." },
      { title: "Programación del Buscador", description: "Desarrollamos el motor de filtrado instantáneo en Next.js." },
      { title: "Lanzamiento y SEO Automotriz", description: "Optimizamos fichas para posicionar repuestos y marcas en Google." },
    ],
    featuredProjects: [
      {
        client: "OCC Partes",
        slug: "occ-partes",
        role: "Catálogo Digital de Autopartes & Repuestos",
        metrics: "Lighthouse 98/100 • LCP 560 ms • Catálogo por Marca",
        description: "Plataforma de autopartes y repuestos industriales con buscador de piezas y cotización directa para talleres mecánicos.",
        tech: ["Next.js", "React", "Tailwind CSS", "WhatsApp API"],
      },
      {
        client: "Autos Saldo",
        slug: "autos-saldo",
        role: "Portal Comercial de Vehículos",
        metrics: "Lighthouse 99/100 • LCP 510 ms • Showroom Digital",
        description: "Catálogo de vehículos con fichas técnicas completas, cálculo de financiamiento y contacto directo por asesor.",
        tech: ["Next.js", "React 19", "Vercel"],
      },
    ],
    faqs: [
      { question: "¿Se puede integrar un cotizador de crédito vehicular?", answer: "Sí. Podemos añadir una calculadora donde el cliente elija cuota inicial y plazo, enviando la solicitud pre-aprobada a tus asesores." },
      { question: "¿Cómo se gestionan miles de referencias de repuestos?", answer: "Diseñamos bases de datos optimizadas en PostgreSQL capaces de responder búsquedas entre decenas de miles de referencias en menos de 100 ms." },
    ],
    relatedServiceSlug: "desarrollo-web-a-medida",
    relatedServiceTitle: "Desarrollo Web a Medida",
  },

  // ─── 7. ESTÉTICA, BELLEZA Y DERMATOLOGÍA ──────────────────────
  "desarrollo-web-estetica": {
    slug: "desarrollo-web-estetica",
    title: "Desarrollo Web para Centros de Estética, Spas y Dermatología en Colombia",
    shortTitle: "Desarrollo web estética y spas",
    metaTitle: "Páginas Web para Centros de Estética y Spas en Colombia | K&T Code",
    metaDescription:
      "Páginas web para centros de estética, clínicas dermatológicas y spas en Colombia. Galerías de resultados antes/después, agendamiento y venta de tratamientos.",
    eyebrow: "// Presencia Digital para Estética y Belleza",
    summary:
      "Creamos páginas web sofisticadas para centros de estética, clínicas dermatológicas, spas y salones de belleza en Colombia. Exhibe tratamientos, resultados clínicos reales antes/después y agenda citas online con diseño premium.",
    industryName: "Estética, Dermatología y Spas",
    industryChallenges: [
      { title: "Sitios genéricos que no transmiten exclusividad", description: "Plantillas prediseñadas que restan prestigio a tratamientos de alta gama." },
      { title: "Dificultad para explicar procedimientos complejos", description: "Falta de páginas dedicadas que aclaren beneficios, cuidados previos y testimonios de pacientes." },
      { title: "Agendamiento manual ineficiente", description: "Pérdida de clientas por demoras en responder disponibilidad de citas y terapeutas." },
    ],
    keyFeatures: [
      { title: "Galería Interactiva de Casos Antes / Después", description: "Slider interactivo de comparación visual de tratamientos faciales y corporales." },
      { title: "Catálogo de Tratamientos y Bonos de Regalo", description: "Venta de paquetes de spa y tarjetas de regalo digitales con pago por Wompi/Bold." },
      { title: "Agendamiento por Especialista y Cabina", description: "Selección de profesional, fecha y hora disponible con confirmación automática." },
      { title: "Diseño Elegante con Tipografías Premium", description: "Estética refinada que inspira confianza, higiene y bienestar absoluto." },
    ],
    techStack: [
      { name: "Next.js", tag: "Frontend Visual" },
      { name: "Framer Motion", tag: "Animaciones Sutiles" },
      { name: "Wompi / Bold", tag: "Pasarelas Locales" },
      { name: "Vercel Edge", tag: "Velocidad Global" },
    ],
    process: [
      { title: "Definición del Menú de Tratamientos", description: "Categorizamos faciales, corporales, aparatología y medicina estética." },
      { title: "Diseño de Marca y Experiencia Visual", description: "Creamos un ambiente digital armónico y sofisticado." },
      { title: "Desarrollo y Conexión de Citas", description: "Configuramos el sistema de reservas y pagos online." },
      { title: "SEO Local en Google", description: "Posicionamos tratamientos clave en tu ciudad (limpiezas, toxina, masajes)." },
    ],
    featuredProjects: [
      {
        client: "Causalidad Dinámica",
        slug: "causalidad-dinamica",
        role: "Portal de Terapias & Bienestar Integral",
        metrics: "Lighthouse 98/100 • LCP 540 ms • Agendamiento Directo",
        description: "Plataforma de bienestar y terapias con diseño armónico y agendamiento personalizado.",
        tech: ["Next.js", "React", "Tailwind CSS"],
      },
      {
        client: "Estrella de David",
        slug: "estrella-de-david",
        role: "Web Institucional & Servicios de Cuidado",
        metrics: "Lighthouse 99/100 • LCP 520 ms • Experiencia Móvil",
        description: "Sitio web para centro de atención con enfoque en calidez humana y presentación de servicios.",
        tech: ["Next.js", "Tailwind CSS", "Vercel"],
      },
    ],
    faqs: [
      { question: "¿Se pueden vender bonos de regalo o gift cards digitales?", answer: "Sí. El cliente puede comprar una tarjeta de regalo online, ingresar el nombre del destinatario y recibir el bono por correo o WhatsApp con un código único." },
      { question: "¿Cómo se muestran los resultados antes y después de forma ética?", answer: "Implementamos componentes interactivos de comparación con consentimientos informados de pacientes." },
    ],
    relatedServiceSlug: "desarrollo-web-a-medida",
    relatedServiceTitle: "Desarrollo Web a Medida",
  },

  // ─── 8. EDITORIAL, CONSULTORÍA Y MEDIOS ──────────────────────
  "desarrollo-web-editorial": {
    slug: "desarrollo-web-editorial",
    title: "Desarrollo Web para Editoriales, Medios de Comunicación y Consultoras B2B",
    shortTitle: "Desarrollo web editorial y medios",
    metaTitle: "Páginas Web para Editoriales y Medios en Colombia | K&T Code",
    metaDescription:
      "Desarrollo de portales editoriales, revistas digitales y medios de comunicación en Colombia. Carga instantánea de artículos, monetización y Next.js.",
    eyebrow: "// Plataformas Digitales para Contenido y Medios",
    summary:
      "Construimos portales de noticias, revistas digitales, editoriales y plataformas de contenidos para consultoras en Colombia. Tiempos de carga ultra rápidos para millones de lectores, optimización para Google News y monetización por suscripciones o pauta.",
    industryName: "Editorial, Medios y Publicaciones B2B",
    industryChallenges: [
      { title: "Caídas del servidor ante picos virales de tráfico", description: "Servidores compartidos tradicionales que colapsan cuando una noticia o publicación se vuelve viral." },
      { title: "Pésimo rendimiento de Core Web Vitals por publicidad", description: "Scripts de anuncios pesados que bloquean el renderizado y degradan el posicionamiento en Google." },
      { title: "Gestión compleja de múltiples autores y editores", description: "Flujos de publicación desordenados sin control de roles ni versionado de contenido." },
    ],
    keyFeatures: [
      { title: "Arquitectura Jamstack / Serverless Resistente a Picos", description: "Capacidad para absorber cientos de miles de visitas concurrentes sin caídas ni costos excesivos de servidor." },
      { title: "Optimización Automática para Google News y Discover", description: "Marcado NewsArticle y RSS feeds dinámicos para indexación en segundos." },
      { title: "Panel Editorial Multiautor (Headless CMS)", description: "Editor colaborativo tipo Notion para redactores y correctores de estilo." },
      { title: "Muro de Pago (Paywall) y Suscripciones", description: "Monetización de artículos exclusivos con cobro recurrente vía Wompi/Bold." },
    ],
    techStack: [
      { name: "Next.js (ISR)", tag: "Frontend Editorial" },
      { name: "Sanity / Strapi CMS", tag: "Gestión de Redacción" },
      { name: "Vercel Edge Network", tag: "Caché Global" },
      { name: "Algolia / Meilisearch", tag: "Buscador de Artículos" },
    ],
    process: [
      { title: "Diseño de la Jerarquía Editorial", description: "Definimos secciones, columnas de opinión, categorías y perfiles de autores." },
      { title: "Diseño Tipográfico de Lectura Cómoda", description: "Optimizamos contraste, interlineado y tiempos de lectura en móviles." },
      { title: "Desarrollo del Frontend en Next.js", description: "Configuramos Incremental Static Regeneration (ISR) para entrega instantánea." },
      { title: "Lanzamiento y Conexión con Google News", description: "Validamos sitemaps de noticias y structured data de artículos." },
    ],
    featuredProjects: [
      {
        client: "Qvareli",
        slug: "qvareli",
        role: "Portal de Consultoría & Contenido B2B",
        metrics: "Lighthouse 98/100 • LCP 680 ms • Captación Corporativa",
        description: "Plataforma de consultoría estratégica y publicaciones corporativas con arquitectura de alto rendimiento y captación de leads.",
        tech: ["Next.js", "React 19", "Framer Motion", "Tailwind CSS"],
      },
      {
        client: "Brahneyker",
        slug: "brahneyker",
        role: "Web de Marca Personal & Publicaciones",
        metrics: "Lighthouse 99/100 • LCP 530 ms • Portafolio de Contenidos",
        description: "Plataforma de divulgación profesional con diseño minimalista y optimización para lectura.",
        tech: ["Next.js", "React", "Tailwind CSS"],
      },
    ],
    faqs: [
      { question: "¿Cómo soporta Next.js millones de visitas en noticias virales?", answer: "Mediante la tecnología Incremental Static Regeneration (ISR), cada artículo se pre-renderiza como un archivo HTML estático en la red CDN de borde de Vercel, sirviendo contenido en milisegundos sin sobrecargar la base de datos." },
      { question: "¿Puedo tener múltiples redactores con permisos diferentes?", answer: "Sí. Configuramos roles específicos (Redactor, Editor, Administrador) para que cada miembro del equipo trabaje de forma segura." },
    ],
    relatedServiceSlug: "desarrollo-web-a-medida",
    relatedServiceTitle: "Desarrollo Web a Medida",
  },
}

export const industryPageList: IndustryPageData[] = Object.values(industryPages)

export function getIndustryPage(slug: string): IndustryPageData | undefined {
  return industryPages[slug]
}
