export interface CityData {
  slug: string
  cityName: string
  region: string
  title: string
  metaDescription: string
  heroH1: string
  heroSubtitle: string
  introText: string
  marketHighlights: {
    title: string
    description: string
  }[]
  localFaqs: {
    question: string
    answer: string
  }[]
}

export const citiesData: Record<string, CityData> = {
  bogota: {
    slug: "desarrollo-web-bogota",
    cityName: "Bogotá",
    region: "Cundinamarca",
    title: "Desarrollo de Páginas Web en Bogotá | K&T Code",
    metaDescription: "Empresa de desarrollo web y software a medida en Bogotá. Páginas web corporativas en Next.js, tiendas virtuales e-commerce y SEO técnico para empresas.",
    heroH1: "Desarrollo de Páginas Web y Software a Medida en Bogotá",
    heroSubtitle: "// Ingeniería Web de Alto Rendimiento para Empresas y Startups en la Capital",
    introText: "En el ecosistema empresarial de Bogotá, la velocidad de carga, la indexación en Google y la conversión digital son factores determinantes. Desarrollamos sitios web y plataformas sobre Next.js y React 19 que superan el rendimiento de plantillas convencionales de WordPress o Wix, entregando cargas instantáneas en menos de 0.8 segundos.",
    marketHighlights: [
      {
        title: "Posicionamiento B2B en Bogotá",
        description: "Estructuramos SEO semántico y datos Schema para que tu empresa capture búsquedas corporativas de alta intención en Bogotá y toda la sabana."
      },
      {
        title: "Pasarelas de Pago Integradas",
        description: "Conexión directa con Wompi, Bold, PayU y PSE para procesar pagos seguros con liquidación directa a cuentas bancarias colombianas."
      },
      {
        title: "Propiedad Total del Código",
        description: "Entregamos el repositorio privado en GitHub con 100% de propiedad para tu empresa, sin tarifas de licenciamiento ocultas."
      }
    ],
    localFaqs: [
      {
        question: "¿Cuánto cuesta el desarrollo de una página web en Bogotá?",
        answer: "En K&T Code, una Landing Page de conversión inicia desde $450.000 COP, un Sitio Web Corporativo completo inicia desde $2.500.000 COP, y una Tienda Virtual Headless inicia desde $1.300.000 COP. Los proyectos de software a medida se cotizan según requerimientos técnicos."
      },
      {
        question: "¿Cuánto tarda la entrega de un proyecto web para empresas en Bogotá?",
        answer: "Una landing page toma de 7 a 12 días hábiles; un sitio web corporativo entre 15 y 25 días hábiles; y una tienda virtual entre 25 y 40 días hábiles."
      },
      {
        question: "¿Cómo se gestiona el trabajo remoto con clientes en Bogotá?",
        answer: "Trabajamos con sprints semanales, entregas visuales en Figma y prototipos interactivos en producción en Vercel, con comunicación constante vía WhatsApp Business y videollamadas de seguimiento."
      }
    ]
  },
  medellin: {
    slug: "desarrollo-web-medellin",
    cityName: "Medellín",
    region: "Antioquia",
    title: "Desarrollo de Páginas Web en Medellín | K&T Code",
    metaDescription: "Agencia de desarrollo web y software en Medellín. Creamos páginas web en Next.js, tiendas online headless y aplicaciones escalables para empresas en Antioquia.",
    heroH1: "Desarrollo de Páginas Web y Software a Medida en Medellín",
    heroSubtitle: "// Plataformas Digitales Rápidas y Escalables para Empresas en Antioquia",
    introText: "Medellín lidera la innovación tecnológica y empresarial en Colombia. En K&T Code construimos infraestructura web moderna en Next.js y Vercel Edge para marcas y empresas antioqueñas que buscan destacar frente a su competencia con velocidad extrema y diseño UI/UX de clase mundial.",
    marketHighlights: [
      {
        title: "E-commerce Headless para Marcas Paisas",
        description: "Tiendas virtuales con Slide Cart, pasarelas colombianas y optimización móvil pensada para compras ágiles desde WhatsApp e Instagram."
      },
      {
        title: "Arquitectura Serverless y Edge CDN",
        description: "Alojamiento global con costo de servidor $0 en la mayoría de sitios corporativos, reduciendo drásticamente tus costos fijos de hosting."
      },
      {
        title: "SEO Local y Nacional",
        description: "Estrategias de arquitectura de información para posicionar en Medellín, el Valle de Aburrá y a nivel nacional."
      }
    ],
    localFaqs: [
      {
        question: "¿Cuánto cuesta una página web profesional en Medellín?",
        answer: "Nuestros planes para empresas en Medellín inician desde $450.000 COP para landing pages, $2.500.000 COP para sitios web corporativos con CMS, y $1.300.000 COP para tiendas virtuales e-commerce."
      },
      {
        question: "¿Por qué elegir Next.js en lugar de WordPress en Medellín?",
        answer: "Next.js elimina la lentitud, las brechas de seguridad y las caídas constantes causadas por plugins desactualizados de WordPress. Tu página cargará en menos de 0.8s con puntajes de 95+ en Google Lighthouse."
      },
      {
        question: "¿Qué garantía ofrecen en el desarrollo web?",
        answer: "Ofrecemos 100% de garantía en la estabilidad del código, soporte post-lanzamiento y entrega de la totalidad del código fuente sin ataduras."
      }
    ]
  },
  cucuta: {
    slug: "desarrollo-web-cucuta",
    cityName: "San José de Cúcuta",
    region: "Norte de Santander",
    title: "Desarrollo de Páginas Web en Cúcuta | K&T Code",
    metaDescription: "Empresa de desarrollo web y programación en Cúcuta, Norte de Santander. Sitios corporativos, tiendas virtuales y software a la medida con soporte local.",
    heroH1: "Desarrollo de Páginas Web y Software a Medida en Cúcuta",
    heroSubtitle: "// Sede Principal en San José de Cúcuta con Alcance Nacional e Internacional",
    introText: "K&T Code nació y tiene su sede principal en San José de Cúcuta. Impulsamos la digitalización del comercio, la industria textil, calzado, salud y servicios profesionales de Norte de Santander con ingeniería web moderna y asesoría personalizada.",
    marketHighlights: [
      {
        title: "Soporte Directo y Cercano en Cúcuta",
        description: "Atención personalizada para empresarios y emprendedores de Norte de Santander con reuniones directas y soporte ágil."
      },
      {
        title: "Precios Claros y Accesibles en COP",
        description: "Tarifas transparentes desde $450.000 COP con pagos por etapas según hitos cumplidos de entrega."
      },
      {
        title: "Digitalización de Comercios e Industrias",
        description: "Casos de éxito reales en la región (textiles, clínicas, consultorías) operando con alta velocidad y captación de clientes."
      }
    ],
    localFaqs: [
      {
        question: "¿Dónde está ubicada la sede de K&T Code en Cúcuta?",
        answer: "Nuestra sede técnica está ubicada en San José de Cúcuta, Norte de Santander, desde donde atendemos proyectos locales, nacionales y de toda Latinoamérica."
      },
      {
        question: "¿Cuáles son los precios para empresas de Cúcuta?",
        answer: "Landing page desde $450.000 COP, Sitio corporativo desde $2.500.000 COP y Tienda virtual desde $1.300.000 COP, con facilidades de pago por etapas."
      },
      {
        question: "¿Incluye asesoría para el manejo de la página?",
        answer: "Sí. Entregamos capacitación en video y manual de gestión para que puedas actualizar textos, productos e imágenes fácilmente."
      }
    ]
  },
  cali: {
    slug: "desarrollo-web-cali",
    cityName: "Cali",
    region: "Valle del Cauca",
    title: "Desarrollo de Páginas Web en Cali | K&T Code",
    metaDescription: "Desarrollo de páginas web y aplicaciones en Cali, Valle del Cauca. Soluciones de alto impacto en Next.js, e-commerce y software empresarial.",
    heroH1: "Desarrollo de Páginas Web y Software a Medida en Cali",
    heroSubtitle: "// Tecnología Web de Alto Impacto para Empresas en el Valle del Cauca",
    introText: "Ayudamos a empresas, clínicas, consultoras y comercios en Cali a construir su presencia digital con tecnologías de alto rendimiento. Creamos plataformas diseñadas para vender, captar prospectos y automatizar procesos comerciales.",
    marketHighlights: [
      {
        title: "Optimización Móvil Superior",
        description: "Más del 80% del tráfico en Colombia proviene de celulares. Diseñamos con enfoque mobile-first y gestos táctiles nativos fluidos."
      },
      {
        title: "Integración con WhatsApp y CRM",
        description: "Tus visitantes se convierten en conversaciones directas de WhatsApp Business listas para cerrar ventas."
      },
      {
        title: "Velocidad y SEO Técnico",
        description: "Arquitectura que garantiza cumplimiento de Core Web Vitals para superar a tu competencia en Google."
      }
    ],
    localFaqs: [
      {
        question: "¿Cuánto cuesta una página web para un negocio en Cali?",
        answer: "Los planes inician en $450.000 COP para landing pages, $2.500.000 COP para sitios corporativos y $1.300.000 COP para tiendas virtuales con pasarelas de pago."
      },
      {
        question: "¿Qué tecnologías utilizan en K&T Code?",
        answer: "Utilizamos Next.js, React 19, TypeScript, Tailwind CSS, bases de datos PostgreSQL y despliegue en la red Edge de Vercel con SSL incluido."
      },
      {
        question: "¿Puedo recibir pagos en línea desde mi web en Cali?",
        answer: "Sí, integramos pasarelas colombianas oficiales como Wompi, Bold, PayU y Mercado Pago con soporte de PSE, Nequi, Daviplata y tarjetas."
      }
    ]
  },
  barranquilla: {
    slug: "desarrollo-web-barranquilla",
    cityName: "Barranquilla",
    region: "Atlántico",
    title: "Desarrollo de Páginas Web en Barranquilla | K&T Code",
    metaDescription: "Empresa de desarrollo web y software en Barranquilla y la Costa Caribe. Portales corporativos, e-commerce y sistemas a medida en Next.js.",
    heroH1: "Desarrollo de Páginas Web y Software a Medida en Barranquilla",
    heroSubtitle: "// Impulsando la Transformación Digital de la Costa Caribe Colombiana",
    introText: "Barranquilla es el nodo comercial y logístico clave del Caribe colombiano. En K&T Code desarrollamos plataformas web corporativas y tiendas online preparadas para escalar operaciones comerciales tanto en la región Caribe como en mercados internacionales.",
    marketHighlights: [
      {
        title: "Presencia Corporativa e Internacional",
        description: "Soporte multi-idioma (Español / Inglés) y multi-moneda para empresas con clientes en el Caribe, EE.UU. y LATAM."
      },
      {
        title: "Seguridad y Certificados SSL",
        description: "Infraestructura cloud serverless protegida contra ataques DDoS y con certificado de seguridad SSL incluido de por vida."
      },
      {
        title: "Entregas en Tiempo Récord",
        description: "Metodología ágil con entregas desde 7 días hábiles para landings y lanzamientos comerciales inmediatos."
      }
    ],
    localFaqs: [
      {
        question: "¿Cuánto vale crear una página web en Barranquilla?",
        answer: "Nuestros desarrollos para empresas en Barranquilla van desde $450.000 COP (Landing Page) hasta $2.500.000 COP (Sitio Web Corporativo Completo) y $1.300.000 COP (Tienda Virtual)."
      },
      {
        question: "¿Qué incluye el servicio de desarrollo web?",
        answer: "Incluye diseño exclusivo en Figma, programación en Next.js, optimización SEO semántica, conexión a WhatsApp, configuración de dominio y alojamiento en Edge CDN."
      },
      {
        question: "¿Cómo solicito una cotización para mi empresa en Barranquilla?",
        answer: "Puedes cotizar directamente a través de nuestro botón de WhatsApp o formulario web para recibir una propuesta técnica detallada en menos de 24 horas."
      }
    ]
  }
}
