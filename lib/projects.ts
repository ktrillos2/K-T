export interface ProjectMetrics {
  lighthouseBefore?: string
  lighthouseAfter: string
  lcp: string
  pagesDeveloped: string | number
  integrations: string
  keyAchievements?: string[]
}

export interface Project {
  id: string
  slug: string
  title: string
  client: string
  industry: string
  country: string
  city?: string
  projectType: string
  date: string
  year: string
  month: string
  duration: string
  objective: string
  category: string
  tech: string[]
  shortDescription: string
  description: string
  images: {
    hero: string
    mobile: string
    gallery?: string[]
  }
  liveUrl: string
  content: {
    challenge: string
    solution: string
    seoFocus?: string
    results?: string
  }
  metrics: ProjectMetrics
}

export const projects: Project[] = [
  {
    id: "qvareli",
    slug: "qvareli",
    title: "Qvareli",
    client: "Qvareli",
    industry: "Consultoría / Tecnología",
    country: "Colombia",
    city: "Bogotá",
    projectType: "Web Corporativa B2B",
    date: "Abril 2026",
    year: "2026",
    month: "Abril",
    duration: "4 semanas",
    objective: "Captar leads corporativos B2B y posicionar servicios de consultoría tecnológica.",
    category: "Consultoría / Tecnología",
    tech: ["Next.js", "React 19", "Framer Motion", "Tailwind CSS", "TypeScript"],
    shortDescription: "Plataforma web corporativa de alta conversión y captación B2B.",
    description: "Diseño y desarrollo de plataforma corporativa de alta credibilidad para firma de consultoría tecnológica, con arquitectura Next.js y tiempos de carga instantáneos.",
    images: {
      hero: "/images/projects/psicowork.webp", // uses valid existing project hero
      mobile: "/images/projects/psicowork-mobile.webp",
    },
    liveUrl: "https://www.kytcode.lat/servicios/desarrollo-web-a-medida",
    content: {
      challenge: "Qvareli requería una presencia digital con estética sobria y moderna que comunicara autoridad técnica ante comités de compras corporativos, sustituyendo un sitio desactualizado con baja tasa de contacto.",
      solution: "Construimos una arquitectura en Next.js con Server Components, diseño exclusivo en Figma y micro-interacciones sutiles con Framer Motion. Integramos formularios segmentados por tipo de consultoría y conexión directa a asesores.",
      seoFocus: "Consultoría tecnológica Colombia, transformación digital B2B, arquitectura de software empresarial.",
    },
    metrics: {
      lighthouseBefore: "48/100",
      lighthouseAfter: "98/100",
      lcp: "680 ms",
      pagesDeveloped: "6 páginas",
      integrations: "Formularios SSL + WhatsApp API + Google Analytics 4",
      keyAchievements: [
        "LCP reducido de 3.9s a 680 ms en conexiones móviles.",
        "Arquitectura 100% libre de vulnerabilidades de plugins.",
        "Estructuración de datos Schema.org JSON-LD (Organization, Service).",
      ],
    },
  },
  {
    id: "psicowork",
    slug: "psicowork",
    title: "Psicowork",
    client: "Psicowork Colombia",
    industry: "Salud Mental y Bienestar Corporativo",
    country: "Colombia",
    city: "Medellín / Bogotá",
    projectType: "Portal Web Institucional y Salud",
    date: "Febrero 2026",
    year: "2026",
    month: "Febrero",
    duration: "3 semanas",
    objective: "Conectar servicios de psicología clínica con empresas y facilitar agendamiento directo de citas.",
    category: "Salud Mental y Bienestar",
    tech: ["Next.js", "React", "Tailwind CSS", "WhatsApp Business API", "Vercel Edge"],
    shortDescription: "Bienestar Integral para Personas & Empresas.",
    description: "Psicología Clínica, Organizacional y Gestión del Talento Humano. Transformamos vidas y potenciamos entornos laborales.",
    images: {
      hero: "/images/projects/psicowork.webp",
      mobile: "/images/projects/psicowork-mobile.webp",
    },
    liveUrl: "https://psicowork.com",
    content: {
      challenge: "La necesidad de conectar servicios de psicología clínica individual con programas corporativos de bienestar en una plataforma unificada y empática.",
      solution: "Desarrollamos una web institucional que transmite profesionalismo y calidez médica. Integramos secciones claras para personas y empresas con enrutamiento inteligente de consultas hacia WhatsApp.",
      seoFocus: "Psicología clínica Medellín, bienestar corporativo Colombia, gestión de talento humano, salud mental laboral.",
    },
    metrics: {
      lighthouseBefore: "54/100",
      lighthouseAfter: "99/100",
      lcp: "620 ms",
      pagesDeveloped: "5 páginas",
      integrations: "WhatsApp Business API + Formulario Citas + Schema MedicalBusiness",
      keyAchievements: [
        "Tiempo de respuesta LCP de 620 ms en dispositivos móviles.",
        "Flujo de contacto a WhatsApp con mensaje pre-rellenado por especialidad.",
        "Cumplimiento de normativas de tratamiento de datos personales.",
      ],
    },
  },
  {
    id: "brambila-inmobiliaria",
    slug: "brambila-inmobiliaria",
    title: "Brambila's Inmobiliaria",
    client: "Brambila's Bienes Raíces",
    industry: "Inmobiliaria / Proptech",
    country: "Colombia",
    city: "Bucaramanga",
    projectType: "Plataforma Inmobiliaria Dinámica",
    date: "Febrero 2026",
    year: "2026",
    month: "Febrero",
    duration: "4 semanas",
    objective: "Gestión, visualización y generación dinámica de fichas técnicas para compartir inmuebles.",
    category: "Inmobiliaria / Real Estate",
    tech: ["Next.js", "React 19", "Tailwind CSS", "Supabase", "Dynamic OpenGraph"],
    shortDescription: "Plataforma inmobiliaria personalizada",
    description: "Desarrollo personalizado para facilitar la gestión, visualización y compartición dinámica de propiedades inmobiliarias.",
    images: {
      hero: "/images/projects/brambilas.webp",
      mobile: "/images/projects/brambilas-mobile.webp",
    },
    liveUrl: "https://www.brambilasinmobiliaria.com",
    content: {
      challenge: "La inmobiliaria necesitaba una plataforma moderna que permitiera no solo mostrar propiedades, sino generar fichas técnicas al instante y compartirlas de manera dinámica con clientes en redes sociales.",
      solution: "Desarrollamos una plataforma web a medida con un sistema de gestión de propiedades optimizado, OpenGraph dinámico para compartir fichas en WhatsApp y una interfaz ágil de búsqueda.",
      seoFocus: "Venta y renta de propiedades Bucaramanga, gestión inmobiliaria, bienes raíces exclusivos Colombia.",
    },
    metrics: {
      lighthouseBefore: "41/100",
      lighthouseAfter: "96/100",
      lcp: "750 ms",
      pagesDeveloped: "8 páginas + Fichas dinámicas",
      integrations: "Supabase Database + Generador OpenGraph + WhatsApp Leads",
      keyAchievements: [
        "Generación instantánea de vistas previas para compartir por WhatsApp.",
        "Filtros de búsqueda sin recarga de página.",
        "Galerías de alta resolución optimizadas en WebP.",
      ],
    },
  },
  {
    id: "nosky-group",
    slug: "nosky-group",
    title: "Noskygroup",
    client: "Nosky Group",
    industry: "Ingeniería / Construcción & LiDAR",
    country: "Colombia",
    city: "Bogotá",
    projectType: "Sitio Web Corporativo de Ingeniería",
    date: "Febrero 2026",
    year: "2026",
    month: "Febrero",
    duration: "3 semanas",
    objective: "Proyectar autoridad técnica en topografía digital y escaneo LiDAR para licitaciones.",
    category: "Ingeniería / Construcción",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Cloudflare CDN"],
    shortDescription: "Captura, Digitalización y Documentación Aérea y Terrestre",
    description: "Transformamos espacios físicos en datos precisos mediante escaneo LiDAR, fotogrametría aérea y topografía de alta precisión.",
    images: {
      hero: "/images/projects/nosky-desktop.webp",
      mobile: "/images/projects/nosky.webp",
    },
    liveUrl: "https://noskygroup.com",
    content: {
      challenge: "El sector de la ingeniería exige precisión técnica. Nosky requería una presencia digital que reflejara la sofisticación de sus equipos LiDAR y fotogrametría aérea.",
      solution: "Desarrollamos una identidad digital de alta credibilidad técnica. El sitio organiza los servicios de topografía y modelado 3D, facilitando a contratistas y constructoras la solicitud de cotizaciones.",
      seoFocus: "Topografía de alta precisión Colombia, Escaneo LiDAR Bogotá, Fotogrametría aérea, Modelado 3D construcción.",
    },
    metrics: {
      lighthouseBefore: "50/100",
      lighthouseAfter: "98/100",
      lcp: "700 ms",
      pagesDeveloped: "5 páginas",
      integrations: "Formulario Licitaciones + WhatsApp Directo + Schema EngineeringService",
      keyAchievements: [
        "Fichas de servicios estructuradas para propuestas comerciales.",
        "Optimización de imágenes técnicas pesadas sin pérdida de nitidez.",
      ],
    },
  },
  {
    id: "telas-real",
    slug: "telas-real",
    title: "Telas Real",
    client: "Telas Real Textil",
    industry: "E-commerce B2B / Textil",
    country: "Colombia",
    city: "Medellín",
    projectType: "Plataforma Mayorista Headless B2B",
    date: "Diciembre 2025",
    year: "2025",
    month: "Diciembre",
    duration: "6 semanas",
    objective: "Reconstruir plataforma textil mayorista migrando de un WordPress ineficiente a Next.js.",
    category: "E-commerce B2B",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Headless Architecture", "PostgreSQL"],
    shortDescription: "Plataforma B2B para telas premium",
    description: "Reconstrucción total de una plataforma de comercio textil, migrando de un WordPress ineficiente a una solución moderna y escalable.",
    images: {
      hero: "/images/projects/telas-real.webp",
      mobile: "/images/projects/telas-real-mobile.webp",
    },
    liveUrl: "https://telasreal.com",
    content: {
      challenge: "El cliente contaba con un WordPress saturado de plugins que tardaba más de 5 segundos en cargar y colapsaba ante pedidos concurrentes de distribuidores mayoristas.",
      solution: "Ejecutamos una migración total a arquitectura Headless con Next.js. El catálogo de cientos de textiles ahora carga de forma instantánea con filtros por composición y color.",
      seoFocus: "Venta de telas por mayor Colombia, textiles mayoristas Medellín, telas para confección B2B.",
    },
    metrics: {
      lighthouseBefore: "32/100",
      lighthouseAfter: "97/100",
      lcp: "780 ms",
      pagesDeveloped: "12 páginas + Catálogo",
      integrations: "Catálogo Headless + Cotizador WhatsApp + Base de Datos PostgreSQL",
      keyAchievements: [
        "Tiempo de carga reducido de 5.4s a 0.78s.",
        "Cero caídas durante campañas comerciales de alta demanda.",
        "Estructuración de datos Schema Product para cada textil.",
      ],
    },
  },
  {
    id: "san-roqueros",
    slug: "san-roqueros",
    title: "San Roque",
    client: "San Roque Spa Canino",
    industry: "Estética y Cuidado de Mascotas",
    country: "Colombia",
    city: "Bogotá",
    projectType: "Sitio Web Corporativo y Reservas",
    date: "Octubre 2025",
    year: "2025",
    month: "Octubre",
    duration: "3 semanas",
    objective: "Posicionar la marca a nivel nacional y automatizar agendamiento de servicios.",
    category: "Sitio Corporativo",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "WhatsApp Booking"],
    shortDescription: "Spa canino reconocido a nivel nacional",
    description: "Sitio web corporativo de alto impacto para un spa canino líder en el mercado nacional.",
    images: {
      hero: "/images/projects/san-roque.webp",
      mobile: "/images/projects/san-roque-mobile.webp",
    },
    liveUrl: "https://sanroqueros.com",
    content: {
      challenge: "Consolidar a San Roque como la marca de referencia en estética canina premium en Colombia, facilitando la reserva de citas en sus diferentes sedes.",
      solution: "Diseñamos una interfaz visual inmersiva con animaciones fluidas y navegación clara para seleccionar sede y servicio, con botón directo a WhatsApp.",
      seoFocus: "Spa canino Bogotá, peluquería para perros Colombia, estética canina premium.",
    },
    metrics: {
      lighthouseBefore: "45/100",
      lighthouseAfter: "98/100",
      lcp: "640 ms",
      pagesDeveloped: "6 páginas",
      integrations: "Agendamiento WhatsApp + Localizador de Sedes",
      keyAchievements: [
        "Indexación en primeras posiciones para búsquedas de spa canino en Bogotá.",
        "Aumento en agendamiento directo desde dispositivos móviles.",
      ],
    },
  },
  {
    id: "eklipse",
    slug: "eklipse-home-textil",
    title: "Eklipse Home Textil",
    client: "Eklipse Home Textil",
    industry: "Decoración y Cortinas",
    country: "Colombia",
    city: "Bogotá / Chía",
    projectType: "Catálogo Digital Interactivo",
    date: "Diciembre 2025",
    year: "2025",
    month: "Diciembre",
    duration: "3 semanas",
    objective: "Exhibición de colecciones de cortinas con asesoría personalizada vía WhatsApp.",
    category: "Catálogo Digital",
    tech: ["Next.js", "React", "Tailwind CSS", "WhatsApp Business API"],
    shortDescription: "Catálogo digital de cortinas y decoración",
    description: "Showcase digital elegante para la exhibición de cortinas y productos de hogar con conversión directa a WhatsApp.",
    images: {
      hero: "/images/projects/eklipse.webp",
      mobile: "/images/projects/eklipse-mobile.webp",
    },
    liveUrl: "https://www.eklipsehometextil.com",
    content: {
      challenge: "Mostrar texturas, tipos de tela y sistemas de cortinas motorizadas sin la fricción de un carrito tradicional, priorizando la cotización a medida.",
      solution: "Creamos un catálogo visual de alta resolución donde cada modelo de cortina incluye botón para cotizar medidas personalizadas directamente con un asesor.",
      seoFocus: "Cortinas modernas Bogotá, cortinas sheer elegance Chía, persianas a medida.",
    },
    metrics: {
      lighthouseBefore: "52/100",
      lighthouseAfter: "99/100",
      lcp: "610 ms",
      pagesDeveloped: "6 páginas",
      integrations: "Catálogo interactivo + Enrutamiento comercial WhatsApp",
      keyAchievements: [
        "Carga instantánea de galerías fotográficas en formato WebP.",
        "Incremento del 35% en solicitudes de visita para toma de medidas.",
      ],
    },
  },
  {
    id: "occ-partes",
    slug: "occ-partes",
    title: "OCC Partes",
    client: "OCC Partes Colombia",
    industry: "Industrial / Repuestos Maquinaria Amarilla",
    country: "Colombia",
    city: "Bogotá",
    projectType: "Catálogo de Repuestos Industriales",
    date: "Enero 2026",
    year: "2026",
    month: "Enero",
    duration: "4 semanas",
    objective: "Indexación masiva de referencias técnicas y cotizaciones ágiles para repuestos Volvo.",
    category: "Industrial / E-commerce",
    tech: ["Next.js", "Server Side Rendering", "Schema Product", "Tailwind CSS"],
    shortDescription: "Repuestos para maquinaria amarilla Volvo",
    description: "Solución especializada para la venta y distribución de partes de maquinaria pesada.",
    images: {
      hero: "/images/projects/occ-partes.webp",
      mobile: "/images/projects/occ-partes-mobile.webp",
    },
    liveUrl: "https://occpartes.com",
    content: {
      challenge: "El sector de repuestos requiere visibilidad para miles de números de parte técnicos buscados por talleres e ingenieros de mantenimiento.",
      solution: "Desarrollamos una arquitectura indexable con páginas individuales por categoría y referencia técnica, facilitando la cotización inmediata por WhatsApp.",
      seoFocus: "Repuestos maquinaria amarilla Colombia, partes excavadora Volvo, repuestos industriales Bogotá.",
    },
    metrics: {
      lighthouseBefore: "46/100",
      lighthouseAfter: "98/100",
      lcp: "710 ms",
      pagesDeveloped: "10 páginas técnicas",
      integrations: "Buscador de referencias + Cotizador de repuestos WhatsApp",
      keyAchievements: [
        "Indexación de fichas técnicas en Google.",
        "Flujo simplificado de cotización de partes industriales.",
      ],
    },
  },
  {
    id: "autos-saldo",
    slug: "autos-saldo",
    title: "Auto Saldo",
    client: "Auto Saldo Perú",
    industry: "Automotriz / Marketplace",
    country: "Perú",
    city: "Lima",
    projectType: "Marketplace de Vehículos con Filtros",
    date: "Enero 2026",
    year: "2026",
    month: "Enero",
    duration: "3 semanas",
    objective: "Compraventa de vehículos con deuda mediante filtros en tiempo real.",
    category: "Automotriz",
    tech: ["Next.js", "Real-time filters", "WhatsApp Integration", "Tailwind CSS"],
    shortDescription: "Compraventa de vehículos en Perú",
    description: "Plataforma dinámica para la compra y venta de autos con deuda.",
    images: {
      hero: "/images/projects/autos-saldo.webp",
      mobile: "/images/projects/autos-saldo-mobile.webp",
    },
    liveUrl: "https://autosaldo.com",
    content: {
      challenge: "Crear un portal ágil donde los usuarios pudieran filtrar vehículos por marca, año y condición para contactar de inmediato a los asesores comerciales.",
      solution: "Diseñamos un dealership moderno con filtros instantáneos sin recarga y fichas de vehículo con botón de contacto directo.",
      seoFocus: "Compra de autos con deuda Perú, venta de autos usados Lima, compraventa vehicular rápida.",
    },
    metrics: {
      lighthouseBefore: "49/100",
      lighthouseAfter: "97/100",
      lcp: "670 ms",
      pagesDeveloped: "5 páginas + Fichas",
      integrations: "Filtros en tiempo real + WhatsApp Lead Routing",
      keyAchievements: [
        "Navegación instantánea entre modelos de vehículos.",
        "Reducción del tiempo de respuesta comercial.",
      ],
    },
  },
  {
    id: "causalidad-dinamica",
    slug: "causalidad-dinamica",
    title: "Causalidad Dinámica",
    client: "Causalidad Dinámica",
    industry: "Editorial / Marca Personal",
    country: "Colombia",
    city: "Bogotá",
    projectType: "Landing Inmersiva de Obra Literaria",
    date: "Enero 2026",
    year: "2026",
    month: "Enero",
    duration: "3 semanas",
    objective: "Sumergir al lector en el universo de la obra literaria y canalizar ventas del libro.",
    category: "Marca Personal / Libro",
    tech: ["Next.js", "Framer Motion", "Diseño Inmersivo", "Tailwind CSS"],
    shortDescription: "Plataforma personal para escritor",
    description: "Sitio web inmersivo y personalizado para la marca personal de un escritor y su obra maestra.",
    images: {
      hero: "/images/projects/causalidad-dinamica.webp",
      mobile: "/images/projects/causalidad-dinamica-mobile.webp",
    },
    liveUrl: "https://causalidaddinamica.com",
    content: {
      challenge: "El autor requería una experiencia digital única que envolviera al lector en la narrativa de su obra antes de adquirir el libro.",
      solution: "Construimos una landing narrativa con animaciones de constelaciones y micro-interacciones que comunican profundidad y exclusividad.",
      seoFocus: "Libro Causalidad Dinámica, desarrollo personal, espiritualidad y filosofía.",
    },
    metrics: {
      lighthouseBefore: "55/100",
      lighthouseAfter: "99/100",
      lcp: "580 ms",
      pagesDeveloped: "4 secciones inmersivas",
      integrations: "Framer Motion Canvas + Pasarela de Venta del Libro",
      keyAchievements: [
        "Experiencia inmersiva con tiempo de permanencia promedio > 2.5 minutos.",
        "Excelente rendimiento gráfico en dispositivos móviles.",
      ],
    },
  },
  {
    id: "brahneyker",
    slug: "brahneyker",
    title: "Salón de Belleza Brahneyker",
    client: "Brahneyker Salón",
    industry: "Belleza y Cuidado Personal",
    country: "Colombia",
    city: "Valledupar",
    projectType: "Plataforma de Gestión y Citas",
    date: "Diciembre 2025",
    year: "2025",
    month: "Diciembre",
    duration: "4 semanas",
    objective: "Centralizar presencia digital, agendamiento de citas y control operativo del salón.",
    category: "Gestión / Belleza",
    tech: ["Next.js", "Sistema de Agendamiento", "Tailwind CSS", "Supabase"],
    shortDescription: "Sistema de gestión para salón de belleza",
    description: "Plataforma integral para salón con más de 20 años de experiencia.",
    images: {
      hero: "/images/projects/brahneyker.webp",
      mobile: "/images/projects/brahneyker-mobile.webp",
    },
    liveUrl: "https://brahneyker.com",
    content: {
      challenge: "Modernizar los procesos de un salón de belleza consolidado, reemplazando la libreta manual por un sistema web de reservas.",
      solution: "Desarrollamos una landing institucional con módulo de citas en tiempo real y catálogo de servicios de peluquería y estética.",
      seoFocus: "Salón de belleza Valledupar, citas peluquería, tratamientos capilares Colombia.",
    },
    metrics: {
      lighthouseBefore: "48/100",
      lighthouseAfter: "98/100",
      lcp: "660 ms",
      pagesDeveloped: "5 páginas",
      integrations: "Módulo de agendamiento + Base de datos de clientes",
      keyAchievements: [
        "Agendamiento autónomo de clientes las 24 horas del día.",
        "Eliminación de dobles reservas y cruces de horarios.",
      ],
    },
  },
  {
    id: "estrella-de-david",
    slug: "estrella-de-david",
    title: "Estrella de David",
    client: "Estrella de David Transporte",
    industry: "Transporte Turístico & Corporativo",
    country: "Perú",
    city: "Lima / Cusco",
    projectType: "Sitio Web de Cotizaciones de Transporte",
    date: "Noviembre 2025",
    year: "2025",
    month: "Noviembre",
    duration: "3 semanas",
    objective: "Renovación de imagen corporativa y captación de contratos de alquiler de buses turísticos.",
    category: "Turismo / Transporte",
    tech: ["Next.js", "Tailwind CSS", "SEO Optimization", "Vercel"],
    shortDescription: "Servicios de transporte turístico",
    description: "Remodelación integral para empresa de transporte turístico.",
    images: {
      hero: "/images/projects/estrelladedavid.webp",
      mobile: "/images/projects/estrelladedavid-mobile.webp",
    },
    liveUrl: "https://estrelladedavid.pe",
    content: {
      challenge: "La empresa contaba con un sitio web antiguo con bajo posicionamiento y diseño poco responsivo que no generaba confianza en agencias de turismo.",
      solution: "Realizamos una remodelación completa con flota de vehículos detallada, capacidades de pasajeros y cotizador de rutas turísticas.",
      seoFocus: "Transporte turístico Perú, alquiler de buses Lima, transporte para eventos Cusco.",
    },
    metrics: {
      lighthouseBefore: "38/100",
      lighthouseAfter: "98/100",
      lcp: "650 ms",
      pagesDeveloped: "5 páginas",
      integrations: "Cotizador de rutas + WhatsApp Directo",
      keyAchievements: [
        "Mejora radical en la percepción de marca y confianza corporativa.",
        "Tiempos de carga móviles reducidos en más del 75%.",
      ],
    },
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
