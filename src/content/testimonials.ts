/**
 * Testimonios de clientes, copiados TAL CUAL de https://www.kytcode.lat/testimonios
 * (texto, nombre y cargo sin corregir). Los marcados como "sanity" están además en el
 * CMS del sitio anterior con estado "approved".
 *
 * Para agregar una reseña a mano: copia un bloque y cambia project (slug del proyecto en
 * src/lib/projects.ts), name, role (opcional) y message. Las que llegan por el formulario
 * de /testimonios quedan "pending" en Sanity y aparecen solas en el sitio al aprobarlas.
 */
export type Testimonial = {
  id: string;
  /** Slug del proyecto (src/lib/projects.ts). Vacío si no corresponde a un proyecto del portafolio. */
  project: string;
  /** Nombre del proyecto o empresa tal como se muestra en la tarjeta. */
  projectName: string;
  name: string;
  role?: string;
  message: string;
  /** Fecha de publicación (ISO), si se conoce. */
  date?: string;
  source: "web" | "sanity";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "telas-real-stefanny-robayo",
    project: "telas-real",
    projectName: "Telas Real",
    name: "Stefanny Robayo",
    role: "Coordinadora E-commerce",
    message: "Su trabajo es excelente, puntual con las entregas y un plus: *todo lo que imaginas en tu sitio web, K&T lo hace posible; la experiencia ha sido muy buena. Muchas gracias por apoyarnos en nuestro crecimiento digital.",
    date: "2026-07-03",
    source: "sanity",
  },
  {
    id: "casa-medina-gonzalo-medina",
    project: "casa-medina",
    projectName: "Casa Medina",
    name: "Gonzalo Medina",
    role: "Gerente",
    message: "Totalmente satisfecho, superaron todas mis expectativas. Completamente feliz con mi página. A demás, el servicio postventa a sido muy eficiente. Recomendados 100%",
    date: "2026-06-13",
    source: "sanity",
  },
  {
    id: "brambila-inmobiliaria-gerardo",
    project: "brambila-inmobiliaria",
    projectName: "Brambila's Inmobiliaria",
    name: "Gerardo",
    role: "Dueño",
    message: "Excelente servicio, muy contento con el gran trabajo que realizan y siempre atentos a mis dudas",
    date: "2026-02-12",
    source: "sanity",
  },
  {
    id: "occ-partes-diego-gonzalez",
    project: "occ-partes",
    projectName: "OCC Partes",
    name: "Diego González",
    role: "Director comercial",
    message: "El proceso de implementación fue muy dinámica, la propuesta gráfica por parte de k&t muy acertada y son muy receptivos en las modificaciones, recomendamos",
    date: "2026-01-28",
    source: "sanity",
  },
  {
    id: "estrella-de-david-ruby-mendoza",
    project: "estrella-de-david",
    projectName: "Estrella de David",
    name: "Ruby Mendoza",
    role: "Encargada de Comunicación",
    message: "Muy satisfecha con la atención y el servicio. Ponen mucha atención a los detalles y siempre están atentos ante cualquier duda o gestión, muy eficientes con el trabajo. Altamente recomendable.",
    date: "2026-01-28",
    source: "sanity",
  },
  {
    id: "brahneyker-stella",
    project: "brahneyker",
    projectName: "Salón de Belleza Brahneyker",
    name: "Stella",
    role: "Dueña del salón",
    message: "Estoy contenta con el producto ya que pude realizar mi gestionamiento de inventario y poder tener un sitio web donde la gente pueda identificar mi negocio",
    date: "2026-01-28",
    source: "sanity",
  },
  {
    id: "gmx-gaming-equipo-directivo",
    project: "gmx-gaming",
    projectName: "GMX Gaming",
    name: "Equipo Directivo",
    role: "Dirección Operativa — GMX Gaming",
    message: "Veníamos de un WordPress limitado que ralentizaba la experiencia y nos obligaba a gestionar torneos manualmente. Con K&T creamos una plataforma a la medida: ultrarrápida, con diseño inmersivo y procesos de inscripción 100% automatizados.",
    source: "web",
  },
  {
    id: "san-roque-marcela-gomez",
    project: "san-roqueros",
    projectName: "San Roque",
    name: "Dra. Marcela Gómez",
    role: "Gerente Administrativa — San Roque Salud",
    message: "Desarrollaron el portal médico y sistema de citas con un diseño impecable en Figma y una arquitectura rápida y segura. Nuestros pacientes agendan citas en segundos desde su celular.",
    source: "web",
  },
  {
    id: "cxellence-group-andres-restrepo",
    project: "cxellence-group",
    projectName: "CXellence Group",
    name: "Andrés Restrepo",
    role: "CEO & Co-Fundador — CXellence Group",
    message: "K&T Code estructuró nuestra plataforma web corporativa con SEO semántico desde la raíz. En pocas semanas empezamos a captar leads B2B calificados en Bogotá y Medellín.",
    source: "web",
  },
  {
    id: "nosky-group-santiago-silva",
    project: "nosky-group",
    projectName: "Noskygroup",
    name: "Santiago Silva",
    role: "Director de Tecnología — Noskygroup",
    message: "La entrega del código fue puntual, con estándares de arquitectura rigurosos y repositorio privado 100% nuestro. Sin duda la mejor agencia técnica con la que hemos trabajado en Colombia.",
    source: "web",
  },
  {
    id: "psicowork-laura-martinez",
    project: "psicowork",
    projectName: "Psicowork",
    name: "Laura Martínez",
    role: "Directora de Talento & Bienestar — Psicowork",
    message: "Buscábamos una plataforma intuitiva para empresas y empleados. K&T diseñó una interfaz moderna con una experiencia de usuario que nuestros clientes corporativos elogian a diario.",
    source: "web",
  },
];

/** Primera reseña de un proyecto (para su caso de estudio). */
export const testimonialFor = (slug: string) => TESTIMONIALS.find((t) => t.project === slug);
