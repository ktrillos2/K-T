export interface TestimonialItem {
  _id: string
  name: string
  role: string
  content: string
  rating: number
  project: string
  projectUrl?: string
  image?: any
}

export const fallbackTestimonials: TestimonialItem[] = [
  {
    _id: "test-telas-real",
    name: "Camilo Rodríguez",
    role: "Director de Operaciones — Telas Real",
    content: "Migramos nuestra plataforma de e-commerce a Next.js con K&T Code. La velocidad de carga bajó a menos de un segundo y la tasa de conversión en compras con Wompi y PSE aumentó significativamente. Excelente ingeniería.",
    rating: 5,
    project: "Telas Real",
    projectUrl: "https://telasreal.com"
  },
  {
    _id: "test-san-roque",
    name: "Dra. Marcela Gómez",
    role: "Gerente Administrativa — San Roque Salud",
    content: "Desarrollaron el portal médico y sistema de citas con un diseño impecable en Figma y una arquitectura rápida y segura. Nuestros pacientes agendan citas en segundos desde su celular.",
    rating: 5,
    project: "San Roque",
    projectUrl: "https://sanroquesalud.com"
  },
  {
    _id: "test-cxellence",
    name: "Andrés Restrepo",
    role: "CEO & Co-Fundador — CXellence",
    content: "K&T Code estructuró nuestra plataforma web corporativa con SEO semántico desde la raíz. En pocas semanas empezamos a captar leads B2B calificados en Bogotá y Medellín.",
    rating: 5,
    project: "CXellence",
    projectUrl: "https://cxellence.co"
  },
  {
    _id: "test-noskygroup",
    name: "Santiago Silva",
    role: "Director de Tecnología — Noskygroup",
    content: "La entrega del código fue puntual, con tipado estricto en TypeScript y repositorio privado 100% nuestro. Sin duda la mejor agencia técnica con la que hemos trabajado en Colombia.",
    rating: 5,
    project: "Noskygroup",
    projectUrl: "https://noskygroup.com"
  },
  {
    _id: "test-psicowork",
    name: "Laura Martínez",
    role: "Directora de Talento & Bienestar — Psicowork",
    content: "Buscábamos una plataforma intuitiva para empresas y empleados. K&T diseñó una interfaz moderna con una experiencia de usuario que nuestros clientes corporativos elogian a diario.",
    rating: 5,
    project: "Psicowork",
    projectUrl: "https://psicowork.com"
  }
]
