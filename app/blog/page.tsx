import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, CalendarDays, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
    title: "Blog de Desarrollo Web y Software",
    description: "Recursos técnicos, guías y casos de estudio sobre ingeniería web, SEO y arquitectura de software de alto rendimiento impulsada por Next.js y Vercel.",
    keywords: ["blog desarrollo web", "guías SEO técnico", "arquitectura next.js", "rendimiento web", "core web vitals", "K&T blog"],
    alternates: {
        canonical: "https://www.kytcode.lat/blog",
        languages: {
            "es-CO": "https://www.kytcode.lat/blog",
            "es": "https://www.kytcode.lat/blog",
            "x-default": "https://www.kytcode.lat/blog",
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: "Blog K&T | Desarrollo Web y Estrategia Digital",
        description: "Artículos técnicos sobre arquitectura web, SEO, Core Web Vitals y ecosistemas digitales escalables.",
        type: "website",
        url: "https://www.kytcode.lat/blog",
        siteName: "K&T Code",
    },
}

const posts = [
    {
        slug: "como-elegir-empresa-desarrollo-web-colombia",
        title: "Cómo Elegir una Empresa de Desarrollo Web en Colombia (2026)",
        excerpt: "Criterios técnicos y comerciales para contratar desarrollo web a medida, tiempos, costos, garantías y SEO en Colombia.",
        date: "Feb 25, 2026",
        readTime: "10 min de lectura",
    },
    {
        slug: "como-crear-pagina-web-2026",
        title: "Cómo crear una página web en 2026: La guía definitiva",
        excerpt: "Descubre el proceso técnico para construir un proyecto web que realmente convierta, ignorando plantillas.",
        date: "Feb 20, 2026",
        readTime: "8 min de lectura",
    },
    {
        slug: "como-crear-pagina-web-profesional",
        title: "Desarrollo Web Profesional: Guía Definitiva Empresarial",
        excerpt: "Cómo estructurar una plataforma web empresarial que convierta. Fundamentos de arquitectura, UX y Next.js.",
        date: "Feb 19, 2026",
        readTime: "7 min de lectura",
    },
    {
        slug: "desarrollo-web-medida-vs-plantillas",
        title: "Desarrollo web a la medida vs. Plantillas genéricas: ¿Qué necesita tu negocio?",
        excerpt: "Análisis técnico de por qué el código a medida vende más y supera a los CMS genéricos en Core Web Vitals.",
        date: "Feb 18, 2026",
        readTime: "6 min de lectura",
    },
    {
        slug: "seo-desde-la-raiz-crear-pagina",
        title: "¿Por qué el SEO debe ir desde la raíz al crear una página?",
        excerpt: "El error de hacer SEO después del lanzamiento. Conoce por qué la estructura en Next.js garantiza tu visibilidad.",
        date: "Feb 15, 2026",
        readTime: "7 min de lectura",
    },
    {
        slug: "costo-oculto-pagina-web-lenta",
        title: "El costo oculto de una página web lenta y cómo solucionarlo",
        excerpt: "Cada segundo de carga que pierdes, pierdes clientes. Descubre por qué alojar en Vercel es la solución definitiva.",
        date: "Feb 10, 2026",
        readTime: "5 min de lectura",
    }
]

import { BlogClient } from "./blog-client"

export default function BlogIndex() {
    return <BlogClient posts={posts} />
}
