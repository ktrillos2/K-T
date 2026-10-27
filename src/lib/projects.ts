import SHOT_MANIFEST from "./shots-manifest.json";
import { coverRatio, coverUrl } from "./covers";
import { testimonialFor } from "@/content/testimonials";
import type { BrandColor } from "./routes";

export type ProjectCategory = "corporativo" | "ecommerce" | "plataforma" | "landing";
export type CoverPattern = "stripes" | "dots" | "rings" | "grid";

export type Project = {
  name: string;
  slug: string;
  /** Sitio en producción (se usa para la captura y la vista en vivo). */
  site?: string;
  /** Año-mes de entrega, formato YYYY-MM. */
  date: string;
  sector: string;
  city?: string;
  country: string;
  category: ProjectCategory;
  /** Lo que se construyó, en lenguaje de negocio. */
  built: string[];
  /** Etiquetas cortas para tarjetas. */
  tags: string[];
  summary: string;
  pages?: number;
  weeks?: number;
  /** PageSpeed móvil antes y después, según el caso de estudio. */
  speed?: { before?: number; after: number };
  /** Largest Contentful Paint en milisegundos. */
  lcp?: number;
  results?: string[];
  testimonial?: { quote: string; author: string; role: string };
  featured?: 1 | 2 | 3;
};

export type ProjectView = Project & {
  index: number;
  color: Exclude<BrandColor, "fg">;
  pattern: CoverPattern;
  initials: string;
  /** Página interna del caso de estudio. */
  href: string;
  /** Captura en /public/shots (la genera `npm run screenshots`). */
  shot: string;
  shotMobile: string;
  /** true si ya existe la captura de página completa (lib/shots-manifest.json). */
  hasShot: boolean;
  /** Portada del portafolio anterior (Sanity) o copia local; ver lib/covers.ts. */
  cover?: string;
  /** Proporción ancho/alto de la portada (si se conoce), para que la tarjeta no la recorte. */
  coverRatio?: number;
  /** Mejor imagen disponible para escritorio: captura completa > portada. */
  image?: string;
  /** Mejor imagen para la vista móvil: captura móvil > portada. */
  imageMobile?: string;
  domain?: string;
  dateLabel: string;
  location: string;
};

const RAW: Project[] = [
  {
    name: "KAILAB", slug: "kailab", site: "https://kailab.com.co", date: "2026-10", sector: "Tienda de péptidos para investigación", country: "Colombia", category: "ecommerce",
    summary: "Tienda virtual bilingüe con catálogo por categorías, certificados de laboratorio verificables por lote y guías de preparación en cada producto.",
    built: ["Catálogo por categorías con presentaciones y buscador", "Certificados de análisis publicados por lote, con enlace para verificarlos", "Guía de preparación con video y calculadora de unidades por producto", "Carrito y pagos con Wompi y USDT", "Versión en español e inglés"],
    tags: ["E-commerce", "Bilingüe", "Pagos con Wompi"],
  },
  {
    name: "XIX Olimpiadas de Robótica", slug: "olimpiadas-robotica-up", site: "https://olimpiadasroboticaup.com", date: "2026-10", sector: "Evento académico de robótica (Universidad de Pamplona)", city: "Cúcuta", country: "Colombia", category: "plataforma",
    summary: "Plataforma del evento de robótica del Programa de Ingeniería Mecatrónica de la Universidad de Pamplona, con cuentas y preinscripción de equipos en línea.",
    built: ["Cuentas de usuario con verificación de correo", "Preinscripción de equipos y carga del comprobante de pago", "9 categorías con su reglamento", "Tarifas por etapa y calendario del evento", "Registro histórico de ediciones anteriores y patrocinadores", "Desarrollado en colaboración con el Ing. Jeisson Martínez"],
    tags: ["Plataforma a medida", "Inscripciones en línea", "Evento académico"],
  },
  {
    name: "GMX Gaming", slug: "gmx-gaming", site: "https://gmxgaming.com", date: "2026-09", sector: "Torneos de videojuegos", country: "México", category: "plataforma", featured: 1,
    summary: "Plataforma a medida para torneos de videojuegos que reemplazó un WordPress lento y automatizó las inscripciones.",
    built: ["Inscripción automática de jugadores y equipos", "Módulo de brackets para torneos", "Panel administrativo para gestionar competencias", "8 páginas con diseño inmersivo"],
    tags: ["Plataforma a medida", "Inscripciones automáticas", "Panel admin"],
    pages: 8, weeks: 4, speed: { before: 38, after: 98 }, lcp: 590,
    results: ["Inscripciones automatizadas +85%", "Carga de 4.9 s a 0.59 s"],
  },
  {
    name: "Repuestos Germana", slug: "repuestos-germana", site: "https://repuestosgermana.com", date: "2026-09", sector: "Repuestos y taller automotriz premium", city: "Bogotá", country: "Colombia", category: "ecommerce",
    summary: "Portal de repuestos y servicio automotriz especializado que reemplazó un sitio lento y desactualizado.",
    built: ["Catálogo estructurado de repuestos y servicios de taller", "Interfaz moderna y adaptada a cualquier pantalla", "Canal directo con asesores por WhatsApp Business", "Optimización de velocidad en móvil y escritorio", "Acompañamiento en marketing digital"],
    tags: ["Repuestos", "Catálogo", "WhatsApp"],
    pages: 6, weeks: 4, speed: { before: 34, after: 97 }, lcp: 630,
    results: ["Carga de 5,1 s a 0,63 s", "Solicitudes dirigidas a taller en Bogotá y repuestos a nivel nacional"],
  },
  {
    name: "CXellence Group", slug: "cxellence-group", site: "https://www.cxellence.co", date: "2026-05", sector: "Consultoría en experiencia del cliente", city: "Bogotá", country: "Colombia", category: "corporativo", featured: 3,
    summary: "Portal corporativo B2B que une las cuatro divisiones del grupo en una sola experiencia.",
    built: ["Portal que unifica Inspire, Insights, Improve e Institute", "Diseño oscuro con los colores institucionales", "Microinteracciones y transiciones suaves", "SEO semántico para palabras clave B2B", "Datos estructurados de programas y certificaciones"],
    tags: ["Portal B2B", "4 divisiones", "SEO B2B"],
    pages: 6, weeks: 4, speed: { after: 98 }, lcp: 680,
  },
  {
    name: "Motofox", slug: "motofox", site: "https://www.motofox.com.co", date: "2026-05", sector: "Accesorios para motociclistas", city: "Bogotá", country: "Colombia", category: "ecommerce",
    summary: "Tienda en línea con filtros instantáneos y un proceso de compra de pocos pasos, también en móvil.",
    built: ["Filtros de productos en tiempo real y búsqueda instantánea", "Proceso de compra rediseñado con menos pasos", "Galerías de imágenes optimizadas", "Datos estructurados de producto, precio y disponibilidad"],
    tags: ["E-commerce", "Búsqueda instantánea", "Checkout corto"],
    pages: 6, weeks: 4, speed: { after: 98 }, lcp: 680,
  },
  {
    name: "Aerolínea Santander", slug: "aerolinea-santander", site: "https://www.aerolineasantander.com", date: "2026-05", sector: "Transporte aéreo regional", city: "Bogotá", country: "Colombia", category: "landing",
    summary: "Landing inmersiva de una sola página que condensa la información clave de la aerolínea.",
    built: ["Landing de una página con animaciones ligadas al scroll", "Imágenes de flota y destinos en alta calidad", "Llamados a la acción hacia los canales de contacto", "Datos estructurados de negocio local y transporte"],
    tags: ["Landing inmersiva", "Animación al scroll", "SEO local"],
    pages: 6, weeks: 4, speed: { after: 98 }, lcp: 680,
  },
  {
    name: "Qvareli", slug: "qvareli", site: "https://qvareli.com", date: "2026-04", sector: "Consultoría y tecnología", city: "Bogotá", country: "Colombia", category: "corporativo",
    summary: "Plataforma corporativa B2B para captar clientes empresariales de consultoría tecnológica.",
    built: ["Experiencia corporativa inmersiva y de carga rápida", "Captación de leads empresariales", "Datos estructurados de organización y servicios", "Arquitectura sin plugins vulnerables"],
    tags: ["Sitio B2B", "Captación de leads"],
    pages: 6, weeks: 4, speed: { before: 48, after: 98 }, lcp: 680,
    results: ["LCP móvil de 3.9 s a 0.68 s"],
  },
  {
    name: "Traum Drop", slug: "traum-drop", site: "https://www.traumdrop.com", date: "2026-04", sector: "Moda streetwear", city: "Bogotá", country: "Colombia", category: "ecommerce",
    summary: "Tienda de la marca Traum pensada como galería de diseño, con páginas de pre-lanzamiento para cada drop.",
    built: ["Tienda tipo galería en lugar de catálogo masivo", "Páginas de pre-lanzamiento y compra rápida en cada drop", "Gestor de contenido para los lanzamientos", "Secciones de storytelling y animaciones tipográficas"],
    tags: ["E-commerce", "Drops", "Storytelling"],
    pages: 6, weeks: 4, speed: { after: 98 }, lcp: 680,
  },
  {
    name: "Eccodotaciones", slug: "eccodotaciones", site: "https://www.eccodotaciones.com", date: "2026-04", sector: "Seguridad industrial B2B", country: "Colombia", category: "ecommerce",
    summary: "Catálogo digital de equipos de protección personal organizado en cinco áreas estratégicas.",
    built: ["Catálogo de EPP en cinco áreas: protección, dotación, riesgos, emergencias y materiales", "Categorización por certificaciones y especificaciones técnicas", "Filtros para un catálogo grande y técnico", "Tienda con pasarela de pagos y gestor de inventario"],
    tags: ["Catálogo B2B", "Pasarela de pagos", "Filtros técnicos"],
  },
  {
    name: "Casa Medina", slug: "casa-medina", site: "https://www.casamedina.co", date: "2026-03", sector: "Inmobiliaria", city: "Villavicencio", country: "Colombia", category: "plataforma",
    summary: "Plataforma inmobiliaria premium con buscador dinámico y fichas de propiedad indexables.",
    built: ["Buscador dinámico en el encabezado", "Filtros por tipo, ubicación y operación con resultados instantáneos", "Fichas con área, habitaciones y baños", "Catálogo autogestionable y SEO por propiedad"],
    tags: ["Inmobiliaria", "Buscador", "Fichas indexables"],
    pages: 6, weeks: 4, speed: { after: 98 }, lcp: 680,
  },
  {
    name: "Eccocia", slug: "eccocia", site: "https://www.eccociasas.com", date: "2026-03", sector: "Ingeniería civil y cimentaciones", city: "Bogotá", country: "Colombia", category: "corporativo",
    summary: "Sitio corporativo e industrial para una firma de pilotes, caissons y micropilotes.",
    built: ["Gestor para actualizar la flota de maquinaria y los casos de éxito", "Catálogos visuales de maquinaria, servicios y proyectos", "Transiciones suaves para navegación técnica", "SEO B2B para palabras clave industriales"],
    tags: ["Corporativo industrial", "Autogestionable"],
    pages: 6, weeks: 4, speed: { after: 98 }, lcp: 680,
  },
  {
    name: "Academia SEA", slug: "academia-sea", site: "https://www.academiasea.com", date: "2026-03", sector: "Educación e idiomas", city: "Bogotá", country: "Colombia", category: "corporativo",
    summary: "Plataforma institucional para captar alumnos de inglés en todos los niveles y certificaciones.",
    built: ["Arquitectura para niños, jóvenes, adultos y certificaciones TOEFL y TOEIC", "Programas que la academia actualiza sola", "Inscripción por WhatsApp y formularios", "SEO local para instituciones educativas"],
    tags: ["Educación", "Inscripciones", "SEO local"],
    pages: 6, weeks: 4, speed: { after: 98 }, lcp: 680,
  },
  {
    name: "Psicowork", slug: "psicowork", site: "https://psicowork.com", date: "2026-02", sector: "Salud mental y bienestar", city: "Medellín", country: "Colombia", category: "corporativo",
    summary: "Portal de psicología clínica y organizacional con contacto directo por especialidad.",
    built: ["Servicios para personas y para empresas", "Contacto por WhatsApp con mensaje según la especialidad", "Cumplimiento de la ley de tratamiento de datos"],
    tags: ["Salud", "Citas por WhatsApp"],
    pages: 5, weeks: 4, speed: { before: 54, after: 99 }, lcp: 620,
  },
  {
    name: "Brambila's Inmobiliaria", slug: "brambila-inmobiliaria", site: "https://www.brambilasinmobiliaria.com", date: "2026-02", sector: "Inmobiliaria", city: "Bucaramanga", country: "Colombia", category: "plataforma",
    summary: "Plataforma inmobiliaria con gestión de propiedades y fichas que se comparten con vista previa en WhatsApp.",
    built: ["Sistema de gestión de propiedades", "Fichas técnicas generadas automáticamente", "Vista previa instantánea al compartir por WhatsApp", "Filtros que se actualizan sin recargar la página"],
    tags: ["Inmobiliaria", "Fichas dinámicas", "Filtros en vivo"],
    pages: 8, weeks: 4, speed: { before: 41, after: 96 }, lcp: 750,
  },
  {
    name: "Noskygroup", slug: "nosky-group", site: "https://noskygroup.com", date: "2026-02", sector: "Topografía digital y LiDAR", city: "Bogotá", country: "Colombia", category: "corporativo",
    summary: "Web corporativa para una firma de ingeniería que presenta servicios de LiDAR y fotogrametría para licitaciones.",
    built: ["Fichas de servicio para propuestas comerciales", "Presentación de LiDAR y fotogrametría", "Optimización de imágenes técnicas pesadas"],
    tags: ["Ingeniería", "Fichas de servicio"],
    pages: 5, weeks: 3, speed: { before: 50, after: 98 }, lcp: 700,
  },
  {
    name: "OCC Partes", slug: "occ-partes", site: "https://occpartes.com", date: "2026-01", sector: "Repuestos de maquinaria Volvo", city: "Bogotá", country: "Colombia", category: "ecommerce",
    summary: "Catálogo de repuestos para maquinaria amarilla Volvo con fichas técnicas indexables por número de parte.",
    built: ["Buscador por referencia de repuesto", "Fichas con especificaciones técnicas", "Flujo de cotización simplificado", "Páginas indexables por número de parte"],
    tags: ["Catálogo industrial", "Cotizaciones"],
    pages: 10, weeks: 4, speed: { before: 46, after: 98 }, lcp: 710,
  },
  {
    name: "Auto Saldo", slug: "autos-saldo", site: "https://autosaldo.com", date: "2026-01", sector: "Compraventa de vehículos", city: "Lima", country: "Perú", category: "plataforma",
    summary: "Marketplace de vehículos con filtros instantáneos que conecta compradores y vendedores por WhatsApp.",
    built: ["Interfaz tipo concesionario", "Filtros instantáneos y fichas detalladas de cada vehículo", "Conexión directa entre compradores y vendedores por WhatsApp"],
    tags: ["Marketplace", "Filtros en vivo"],
    pages: 5, weeks: 3, speed: { before: 49, after: 97 }, lcp: 670,
  },
  {
    name: "Causalidad Dinámica", slug: "causalidad-dinamica", site: "https://causalidaddinamica.com", date: "2026-01", sector: "Marca personal de escritor", city: "Bogotá", country: "Colombia", category: "landing",
    summary: "Landing inmersiva para un libro y la marca de su autor, con navegación narrativa.",
    built: ["Diseño pixel a pixel con paleta profunda", "Animaciones sutiles de constelaciones", "Navegación narrativa por secciones"],
    tags: ["Landing inmersiva", "Narrativa"],
    pages: 4, weeks: 3, speed: { before: 55, after: 99 }, lcp: 580,
    results: ["Tiempo promedio en página superior a 2.5 minutos"],
  },
  {
    name: "Telas Real", slug: "telas-real", site: "https://telasreal.com", date: "2025-12", sector: "Telas premium B2B", city: "Medellín", country: "Colombia", category: "ecommerce", featured: 2,
    summary: "Reconstrucción desde cero de un WordPress lento: catálogo mayorista con más de 850 referencias.",
    built: ["Catálogo B2B de más de 850 referencias textiles", "Filtros instantáneos por composición y color", "Cotizaciones automáticas por WhatsApp", "12 páginas más el catálogo"],
    tags: ["Catálogo B2B", "850+ referencias", "Cotización por WhatsApp"],
    pages: 12, weeks: 4, speed: { before: 32, after: 97 }, lcp: 780,
    results: ["Cotizaciones y transacciones de distribuidores +64%", "Cero caídas en campañas de alta demanda"],
  },
  {
    name: "Eklipse Home Textil", slug: "eklipse-home-textil", site: "https://www.eklipsehometextil.com", date: "2025-12", sector: "Cortinas y decoración", city: "Chía", country: "Colombia", category: "ecommerce",
    summary: "Catálogo visual de cortinas que lleva cada interesado directo a un asesor por WhatsApp.",
    built: ["Catálogo visual que resalta texturas y detalles", "Galerías de carga rápida", "Conversión directa a WhatsApp, sin carrito tradicional", "SEO de imágenes y datos de producto"],
    tags: ["Catálogo", "Ventas por WhatsApp"],
    pages: 6, weeks: 3, speed: { before: 52, after: 99 }, lcp: 610,
    results: ["Solicitudes de visita para toma de medidas +35%"],
  },
  {
    name: "Salón Brahneyker", slug: "brahneyker", site: "https://brahneyker.com", date: "2025-12", sector: "Salón de belleza", city: "Valledupar", country: "Colombia", category: "plataforma",
    summary: "Sitio y sistema de gestión para un salón: agenda en línea, inventario y facturación electrónica.",
    built: ["Agenda en línea disponible 24/7", "Sin citas duplicadas ni cruces de horario", "Control de inventario", "Facturación electrónica"],
    tags: ["Agenda en línea", "Inventario", "Facturación"],
    pages: 5, weeks: 4, speed: { before: 48, after: 98 }, lcp: 660,
  },
  {
    name: "Estrella de David", slug: "estrella-de-david", site: "https://estrelladedavid.pe", date: "2025-11", sector: "Transporte turístico", city: "Lima", country: "Perú", category: "corporativo",
    summary: "Rediseño completo como sitio de cotización para alquiler de buses turísticos.",
    built: ["Nueva imagen corporativa", "Flujo de cotización de servicios de transporte", "Arquitectura optimizada para buscadores"],
    tags: ["Rediseño", "Cotizaciones"],
    pages: 5, weeks: 3, speed: { before: 38, after: 98 }, lcp: 650,
    results: ["Carga en móvil más de 75% más rápida"],
  },
  {
    name: "San Roque", slug: "san-roqueros", site: "https://sanroqueros.com", date: "2025-10", sector: "Spa canino", city: "Bogotá", country: "Colombia", category: "corporativo",
    summary: "Sitio corporativo con reservas para un spa canino reconocido a nivel nacional.",
    built: ["Estructura que guía a la reserva de servicios", "Agendamiento automatizado", "Animaciones suaves y diseño limpio"],
    tags: ["Reservas", "SEO local"],
    pages: 6, weeks: 3, speed: { before: 45, after: 98 }, lcp: 640,
    results: ["Primeros resultados en búsquedas de spa canino en Bogotá"],
  },
  {
    name: "Chévere Bogotá Travel", slug: "chevere-bogota-travel", date: "2025-08", sector: "Turismo", city: "Bogotá", country: "Colombia", category: "corporativo",
    summary: "Experiencias turísticas en Colombia, en varios idiomas.",
    built: ["Sitio multi-idioma para turistas", "Catálogo de experiencias"],
    tags: ["Turismo", "Multi-idioma"],
  },
];

const COLORS = ["red", "yellow", "green"] as const;
const PATTERNS: CoverPattern[] = ["stripes", "dots", "rings", "grid"];
const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const MONTHS_LONG = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export const initialsOf = (name: string) =>
  name
    .replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const formatMonth = (yyyyMm: string, long = false) => {
  const [y, m] = yyyyMm.split("-");
  return `${(long ? MONTHS_LONG : MONTHS)[Number(m) - 1]} ${y}`;
};

export const domainOf = (url?: string) => (url ? url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "") : undefined);

/** Proyectos con captura de página completa ya generada (`npm run screenshots` actualiza la lista). */
const SHOTS = new Set<string>(SHOT_MANIFEST as string[]);

export const PROJECTS: ProjectView[] = RAW.map((p, i) => ({
  ...p,
  index: i,
  color: COLORS[i % 3],
  pattern: PATTERNS[(i * 3) % 4],
  initials: initialsOf(p.name),
  href: `/proyectos/${p.slug}`,
  shot: `/shots/${p.slug}.jpg`,
  shotMobile: `/shots/${p.slug}-m.jpg`,
  hasShot: SHOTS.has(p.slug),
  // Testimonio desde src/content/testimonials.ts (texto tal cual del sitio anterior)
  testimonial: (() => {
    const t = testimonialFor(p.slug);
    return t ? { quote: t.message, author: t.name, role: t.role ?? "" } : p.testimonial;
  })(),
  cover: coverUrl(p.slug),
  coverRatio: coverRatio(p.slug),
  image: SHOTS.has(p.slug) ? `/shots/${p.slug}.jpg` : coverUrl(p.slug),
  imageMobile: SHOTS.has(p.slug) ? `/shots/${p.slug}-m.jpg` : coverUrl(p.slug, 900),
  domain: domainOf(p.site),
  dateLabel: formatMonth(p.date),
  location: [p.city, p.country].filter(Boolean).join(", "),
}));

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export const FEATURED = PROJECTS.filter((p) => p.featured).sort((a, b) => (a.featured ?? 9) - (b.featured ?? 9));

export const CATEGORIES: { key: ProjectCategory | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "corporativo", label: "Sitios corporativos" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "plataforma", label: "Plataformas y software" },
  { key: "landing", label: "Landing pages" },
];

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  corporativo: "Sitio corporativo",
  ecommerce: "E-commerce",
  plataforma: "Plataforma a medida",
  landing: "Landing page",
};

/** Promedio de PageSpeed final de los proyectos con dato publicado. */
export const AVG_SPEED = Math.round(
  PROJECTS.filter((p) => p.speed).reduce((a, p) => a + (p.speed?.after ?? 0), 0) / PROJECTS.filter((p) => p.speed).length,
);
