import { StaticImageData } from "next/image"

export interface Project {
    id: string
    slug: string
    title: string
    description: string
    shortDescription: string
    year: string
    month: string
    category: string // e.g., "E-commerce", "Corporate", "Landing Page"
    tech: string[]
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
}

export const projects: Project[] = [
    {
        id: "nosky-group",
        slug: "nosky-group",
        title: "Noskygroup",
        shortDescription: "Captura, Digitalización y Documentación Aérea y Terrestre",
        description: "Transformamos espacios físicos en datos precisos mediante escaneo LiDAR, fotogrametría aérea y topografía de alta precisión. Soluciones integrales para ingeniería, arquitectura y construcción.",
        year: "2026",
        month: "Febrero",
        category: "Ingeniería / Construcción",
        tech: ["Next.js", "Topografía Digital", "LiDAR", "React"],
        images: {
            hero: "/images/projects/nosky-desktop.png",
            mobile: "/images/projects/nosky.png",
        },
        liveUrl: "https://noskygroup.com",
        content: {
            challenge: "El sector de la ingeniería y construcción demanda precisión milimétrica y tiempos de respuesta rápidos. Nosky necesitaba una presencia digital que reflejara su capacidad técnica y la sofisticación de sus equipos de medición.",
            solution: "Desarrollamos una identidad digital que proyecta autoridad técnica y modernidad. El sitio estructura claramente los servicios especializados como LiDAR y fotogrametría, facilitando a los clientes entender el valor de la digitalización de espacios.",
            seoFocus: "Topografía de alta precisión, Escaneo LiDAR, Fotogrametría aérea, Modelado 3D para construcción.",
        },
    },
    {
        id: "telas-real",
        slug: "telas-real",
        title: "Telas Real",
        shortDescription: "Plataforma B2B para telas premium",
        description: "Reconstrucción total de una plataforma de comercio textil, migrando de un WordPress ineficiente a una solución moderna y escalable.",
        year: "2025",
        month: "Diciembre",
        category: "E-commerce B2B",
        tech: ["Next.js", "Tailwind CSS", "TypeScript", "Headless Architecture"],
        images: {
            hero: "/images/projects/telas-real.png",
            mobile: "/images/projects/telas-real-mobile.png",
        },
        liveUrl: "https://telasreal.com",
        content: {
            challenge: "El cliente contaba con un sitio en WordPress mal implementado que sufría de problemas de rendimiento, seguridad y usabilidad. La estructura antigua impedía el crecimiento del negocio y frustraba a los clientes mayoristas.",
            solution: "Realizamos una remodelación completa desde cero (Greenfield). Diseñamos una arquitectura Headless utilizando Next.js para el frontend, garantizando una carga instantánea y una experiencia de usuario fluida. Se implementó un diseño personalizado que refleja la calidad de los textiles, alejándonos de plantillas genéricas.",
            seoFocus: "Optimización técnica masiva para indexación de catálogo extenso y tiempos de carga Core Web Vitals optimizados.",
        },
    },
    {
        id: "san-roqueros",
        slug: "san-roqueros",
        title: "San Roque",
        shortDescription: "Spa canino reconocido a nivel nacional",
        description: "Sitio web corporativo de alto impacto para un spa canino líder en el mercado nacional.",
        year: "2025",
        month: "Octubre",
        category: "Sitio Corporativo",
        tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
        images: {
            hero: "/images/projects/san-roque.png",
            mobile: "/images/projects/san-roque-mobile.png",
        },
        liveUrl: "https://sanroqueros.com",
        content: {
            challenge: "Posicionar digitalmente a 'San Roque' como el spa canino referente a nivel nacional. Se requería un sitio que transmitiera confianza, profesionalismo y el amor por las mascotas, diferenciándose de la competencia local.",
            solution: "Desarrollamos una experiencia web inmersiva con animaciones suaves y un diseño visual limpio y amigable. La estructura de la información fue diseñada para guiar al usuario hacia la reserva de servicios, destacando la cobertura nacional y la reputación de la marca.",
            seoFocus: "Estrategia de posicionamiento local y nacional para términos relacionados con cuidado y estética canina premium.",
        },
    },
    {
        id: "eklipse",
        slug: "eklipse-home-textil",
        title: "Eklipse Home Textil",
        shortDescription: "Catálogo digital de cortinas y decoración",
        description: "Showcase digital elegante para la exhibición de cortinas y productos de hogar con conversión directa a WhatsApp.",
        year: "2025",
        month: "Diciembre",
        category: "Catálogo Digital",
        tech: ["Next.js", "React", "WhatsApp Business API"],
        images: {
            hero: "/images/projects/eklipse.png",
            mobile: "/images/projects/eklipse-mobile.png",
        },
        liveUrl: "https://www.eklipsehometextil.com",
        content: {
            challenge: "La marca necesitaba una forma ágil de mostrar sus colecciones de cortinas sin la complejidad de un carrito de compras tradicional, fomentando el trato personalizado.",
            solution: "Creamos un catálogo visual de alto impacto donde cada producto está optimizado para mostrar texturas y detalles. Implementamos un flujo de conversión directo a WhatsApp, permitiendo que los asesores cierren las ventas de manera personalizada. Todo codificado desde cero para asegurar unicidad visual.",
            seoFocus: "SEO de imágenes y estructurado de productos para captar búsquedas específicas de decoración de interiores.",
        },
    },
    {
        id: "chevere-bogota",
        slug: "chevere-bogota-travel",
        title: "Chévere Bogotá Travel",
        shortDescription: "Experiencias turísticas en Colombia",
        description: "Plataforma de turismo receptivo enfocada en tours por Bogotá y destinos nacionales.",
        year: "2025",
        month: "Agosto", // Assumed based on chronology
        category: "Turismo / Travel",
        tech: ["Next.js", "Edge Caching", "I18n"],
        images: {
            hero: "/images/projects/chevere-bogota.png",
            mobile: "/images/projects/chevere-bogota-mobile.png",
        },
        liveUrl: "https://cheverebogotatravel.com",
        content: {
            challenge: "Competir en el saturado mercado turístico de Bogotá requería una web extremadamente rápida y visualmente cautivadora para turistas internacionales.",
            solution: "Implementamos un sitio multi-idioma con Next.js, enfocado en la velocidad de carga (WPO) para conexiones móviles de turistas. El diseño destaca la vibrante cultura colombiana a través de una interfaz moderna y colorida, facilitando la reserva de tours.",
            seoFocus: "SEO internacional y local optimizado para 'Tours en Bogotá' y experiencias culturales.",
        },
    },
    {
        id: "occ-partes",
        slug: "occ-partes",
        title: "OCC Partes",
        shortDescription: "Repuestos para maquinaria amarilla Volvo",
        description: "Solución especializada para la venta y distribución de partes de maquinaria pesada.",
        year: "2026",
        month: "Enero",
        category: "Industrial / E-commerce",
        tech: ["Next.js", "Server Side Rendering", "SEO Avanzado"],
        images: {
            hero: "/images/projects/occ-partes.png", // Need to verify/create placeholder if not exists
            mobile: "/images/projects/occ-partes-mobile.png",
        },
        liveUrl: "https://occpartes.com",
        content: {
            challenge: "El sector de repuestos industriales requiere precisión técnica y visibilidad en un nicho muy específico. El reto era posicionar la marca para búsquedas de referencias Volvo específicas.",
            solution: "Desarrollamos una plataforma robusta con un buscador optimizado y páginas de producto ricas en especificaciones técnicas. La arquitectura está diseñada 100% para SEO, asegurando que cada número de parte sea indexable.",
            seoFocus: "Implementación agresiva de SEO técnico, Schema Markup para productos industriales y optimización de Long-tail keywords para referencias de maquinaria.",
        },
    },
    {
        id: "autos-saldo",
        slug: "autos-saldo",
        title: "Auto Saldo",
        shortDescription: "Compraventa de vehículos en Perú",
        description: "Plataforma dinámica para la compra y venta de autos con deuda.",
        year: "2026",
        month: "Enero",
        category: "Automotriz",
        tech: ["Next.js", "Real-time filters", "WhatsApp Integration"],
        images: {
            hero: "/images/projects/autos-saldo.png",
            mobile: "/images/projects/autos-saldo-mobile.png",
        },
        liveUrl: "https://autosaldo.com",
        content: {
            challenge: "Crear un marketplace de autos confiable y ágil para el mercado peruano, donde la comunicación rápida es clave. El cliente necesitaba una solución para comprar autos con deuda al instante.",
            solution: "Diseñamos una interfaz de 'dealership' moderno con filtros instantáneos y fichas de vehículo detalladas. La característica central es la integración profunda con WhatsApp para conectar compradores y vendedores instantáneamente.",
            seoFocus: "Optimización para búsquedas locales de vehículos en Perú y generación de leads cualificados.",
        },
    },
    {
        id: "causalidad-dinamica",
        slug: "causalidad-dinamica",
        title: "Causalidad Dinámica",
        shortDescription: "Plataforma personal para escritor",
        description: "Sitio web inmersivo y personalizado para la marca personal de un escritor y su obra maestra.",
        year: "2026",
        month: "Enero",
        category: "Marca Personal / Libro",
        tech: ["Next.js", "Framer Motion", "Diseño Inmersivo"],
        images: {
            hero: "/images/projects/causalidad-dinamica.png",
            mobile: "/images/projects/causalidad-dinamica-mobile.png",
        },
        liveUrl: "https://causalidaddinamica.com",
        content: {
            challenge: "El autor necesitaba un espacio digital que no solo vendiera un libro, sino que sumergiera al lector en el universo de 'Causalidad Dinámica'. Las plantillas estándar no podían capturar la esencia mística y profunda de la obra.",
            solution: "Creamos una experiencia web totalmente personalizada, diseñada pixel a pixel para reflejar la identidad del escritor. Utilizamos animaciones sutiles de constelaciones y una paleta de colores profundos para evocar misterio y sabiduría. La navegación es fluida y narrativa, llevando al usuario a descubrir el 'sistema oculto' detrás del libro.",
            seoFocus: "Posicionamiento de marca personal para el autor y palabras clave relacionadas con desarrollo personal y espiritualidad.",
        },
    },
    {
        id: "caro-pady",
        slug: "caro-pady",
        title: "Caro Pady",
        shortDescription: "Tienda Oficial de Artista",
        description: "E-commerce personalizado de merchandising para la artista Caro Pady.",
        year: "2025",
        month: "Noviembre",
        category: "E-commerce / Merch",
        tech: ["Shopify Integration"],
        images: {
            hero: "/images/projects/caro-pady.png",
            mobile: "/images/projects/caro-pady-mobile.png",
        },
        liveUrl: "https://caropady.com",
        content: {
            challenge: "La artista necesitaba una tienda online que reflejara su estética visual única (dorado y rojo oscuro) y permitiera a los fans comprar merchandising exclusivo de manera intuitiva.",
            solution: "Diseñamos una interfaz elegante y moderna con Next.js, integrando animaciones fluidas y una experiencia de compra sin fricciones. La paleta de colores y la tipografía fueron cuidadosamente seleccionadas para alinearse con la marca personal de la artista.",
            seoFocus: "Posicionamiento de marca personal y venta de merchandising exclusivo.",
        },
    },
    {
        id: "brahneyker",
        slug: "brahneyker",
        title: "Salón de Belleza Brahneyker",
        shortDescription: "Sistema de gestión para salón de belleza",
        description: "Plataforma integral para salón con más de 20 años de experiencia. Incluye landing page, agendamiento de citas, inventario y facturación.",
        year: "2025", // Assuming recent distinct development, user didn't specify year but context implies portfolio item.
        month: "Diciembre", // Placeholder recent month
        category: "Gestión / Belleza",
        tech: ["Next.js", "Sistema de Agendamiento", "Facturación", "Inventario"],
        images: {
            hero: "/images/projects/brahneyker.png",
            mobile: "/images/projects/brahneyker-mobile.png",
        },
        liveUrl: "https://brahneyker.com", // Assuming url based on name or placeholder
        content: {
            challenge: "Modernizar la gestión de un salón de belleza con 20 años de trayectoria, centralizando citas, inventario y facturación en una sola plataforma.",
            solution: "Desarrollamos una solución completa que no solo sirve como presencia digital (landing page) sino como herramienta administrativa potente. El sistema permite agendar citas en tiempo real, controlar stock de productos y generar facturas electrónicas.",
            seoFocus: "Posicionamiento local para salón de belleza y optimización de servicios estéticos.",
        },
    },
    {
        id: "estrella-de-david",
        slug: "estrella-de-david",
        title: "Estrella de David",
        shortDescription: "Servicios de transporte turístico",
        description: "Remodelación integral para empresa de transporte turístico. Rediseño moderno y optimización de posicionamiento.",
        year: "2025",
        month: "Noviembre",
        category: "Turismo / Transporte",
        tech: ["Next.js", "Tailwind CSS", "SEO Optimization"],
        images: {
            hero: "/images/projects/estrelladedavid.png",
            mobile: "/images/projects/estrelladedavid-mobile.png",
        },
        liveUrl: "https://estrelladedavid.pe",
        content: {
            challenge: "La empresa tenía un sitio web existente pero con deficiente posicionamiento en buscadores y un diseño que no satisfacía sus expectativas estéticas ni funcionales.",
            solution: "Ejecutamos una remodelación completa del sitio web, enfocándonos en un diseño visual impactante y una arquitectura optimizada para mejorar su visibilidad en motores de búsqueda. El cliente quedó muy satisfecho con el resultado final.",
            seoFocus: "Posicionamiento para servicios de transporte turístico y alquiler de buses a nivel nacional.",
        },
    },
]
