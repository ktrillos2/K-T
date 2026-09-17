import { Metadata } from "next"
import Footer from "@/components/layout/footer"
import TestimoniosClient from "@/components/sections/testimonios-client"
import { getApprovedTestimonials } from "@/sanity/lib/queries"
import { fallbackTestimonials } from "@/lib/testimonials-fallback"
import { absoluteUrl } from "@/lib/site-config"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Testimonios y Reseñas de Clientes | K&T Code",
  description:
    "Opiniones y testimonios reales de clientes que han contratado desarrollo web a medida, e-commerce y software con K&T Code. Comparte tu experiencia o verifica nuestros casos de éxito.",
  keywords: [
    "testimonios K&T Code",
    "opiniones K&T desarrollo web",
    "resenas clientes software a medida",
    "casos de exito kytcode",
    "calificacion agencia web colombia",
    "desarrollo web sin plantillas testimonios",
  ],
  alternates: {
    canonical: absoluteUrl("/testimonios"),
    languages: {
      "es-CO": absoluteUrl("/testimonios"),
      es: absoluteUrl("/testimonios"),
      "x-default": absoluteUrl("/testimonios"),
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
    title: "Testimonios y Reseñas de Clientes | K&T Code",
    description:
      "Descubre lo que opinan las empresas que desarrollan sus plataformas y automatizaciones desde cero con K&T Code.",
    url: absoluteUrl("/testimonios"),
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Testimonios y Casos de Éxito K&T Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonios y Reseñas de Clientes | K&T Code",
    description:
      "Opiniones y calificaciones reales de clientes que han transformado su presencia digital con K&T Code.",
    images: ["/opengraph-image.png"],
  },
}

export default async function TestimoniosPage() {
  let sanityTestimonials: any[] = []
  try {
    sanityTestimonials = await getApprovedTestimonials()
  } catch {
    sanityTestimonials = []
  }

  // Si hay testimonios aprobados en Sanity se priorizan y complementan con los verificados locales
  const combinedTestimonials =
    sanityTestimonials && sanityTestimonials.length > 0
      ? [
          ...sanityTestimonials,
          ...fallbackTestimonials.filter(
            (fb) => !sanityTestimonials.some((st) => st.project === fb.project)
          ),
        ]
      : fallbackTestimonials

  const testimonialsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "K&T Code",
    "url": "https://www.kytcode.lat",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": combinedTestimonials.length.toString(),
      "bestRating": "5",
      "worstRating": "1",
    },
    "review": combinedTestimonials.map((t) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name,
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": (t.rating || 5).toString(),
        "bestRating": "5",
      },
      "reviewBody": t.content,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialsSchema) }}
      />
      <main className="min-h-screen bg-black text-white relative selection:bg-amber-500 selection:text-black">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <TestimoniosClient initialTestimonials={combinedTestimonials} />
      </main>
      <Footer />
    </>
  )
}
