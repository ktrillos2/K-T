export interface Author {
  slug: string
  name: string
  role: string
  company: string
  bio: string
  shortBio: string
  avatar: string
  location: string
  instagram: string
  facebook: string
  tiktok: string
  articlesCount: number
  skills: string[]
}

export const authors: Record<string, Author> = {
  "keyner-trillos": {
    slug: "keyner-trillos",
    name: "Keyner Trillos",
    role: "Co-Fundador & Lead Software Engineer",
    company: "K&T Code",
    location: "San José de Cúcuta, Colombia",
    shortBio:
      "Ingeniero de software y estratega digital especializado en arquitecturas web con Next.js, React 19, TypeScript, Core Web Vitals y gestión avanzada de Meta Ads enfocada en conversión y crecimiento de marca según necesidades de negocio.",
    bio:
      "Keyner Trillos es Co-Fundador y Lead Software Engineer en K&T Code. Cuenta con amplia experiencia diseñando arquitecturas frontend y fullstack para empresas en Colombia, Latinoamérica y Estados Unidos. Su especialidad técnica abarca Server-Side Rendering (SSR), Server Components, tipado estricto con TypeScript, modelado de bases de datos relacionales en PostgreSQL / Supabase y optimización de Core Web Vitals para garantizar tiempos de carga inferiores a 1 segundo. Adicionalmente, cuenta con sólida trayectoria en la planificación y gestión de campañas publicitarias en Meta Ads (Facebook & Instagram Ads), estructurando estrategias de marketing digital y embudos de conversión a la medida de los objetivos comerciales y necesidades específicas de cada cliente.",
    avatar: "/perfil.png",
    instagram: "https://www.instagram.com/ktweb_/",
    facebook: "https://www.facebook.com/KTSolutionsWeb",
    tiktok: "https://www.tiktok.com/@kytweb",
    articlesCount: 26,
    skills: [
      "Next.js App Router",
      "React 19 & Server Components",
      "TypeScript 5",
      "Gestión de Meta Ads (Facebook & Instagram)",
      "Estrategias de Marketing & Conversión",
      "Core Web Vitals & WPO",
      "SEO Técnico & Schema JSON-LD",
      "Supabase & PostgreSQL",
      "Vercel Edge Network",
    ],
  },
}

export function getAuthor(slug: string): Author | undefined {
  return authors[slug]
}
