import { Metadata } from "next"
import Footer from "@/components/layout/footer"
import PricingHero from "@/components/sections/precios/pricing-hero"
import PricingCards from "@/components/sections/precios/pricing-cards"
import AdditionalServices from "@/components/sections/precios/additional-services"
import HowWeWork from "@/components/sections/precios/how-we-work"
import ComparisonTable from "@/components/sections/precios/comparison-table"
import PricingFAQ from "@/components/sections/precios/pricing-faq"
import PricingCTA from "@/components/sections/precios/pricing-cta"

export const metadata: Metadata = {
  title: "Precios de Páginas Web y Desarrollo Web en Colombia",
  description: "Consulta planes y precios para landing pages, sitios web corporativos, tiendas virtuales y software a medida en Colombia.",
  keywords: [
    "cuanto cuesta una pagina web colombia",
    "precios desarrollo web",
    "costo tienda virtual colombia",
    "tarifas diseño web bogota",
    "planes paginas web medellin",
    "cotizacion software a medida",
    "desarrollo web planes y precios",
    "K&T Code precios",
  ],
  alternates: {
    canonical: "https://www.kytcode.lat/precios",
    languages: {
      "es-CO": "https://www.kytcode.lat/precios",
      es: "https://www.kytcode.lat/precios",
      en: "https://www.kytcode.lat/en/pricing",
      "x-default": "https://www.kytcode.lat/precios",
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
    title: "Precios de Páginas Web y Software a Medida | K&T Code",
    description: "Consulta planes y precios para landing pages, sitios corporativos, tiendas virtuales y software a medida en Colombia.",
    url: "https://www.kytcode.lat/precios",
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿El precio incluye dominio y hosting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La configuración puede estar incluida, pero el pago anual del dominio y hosting depende del proveedor y del plan seleccionado."
      }
    },
    {
      "@type": "Question",
      "name": "¿Debo pagar todo antes de comenzar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. El proyecto puede manejarse mediante pagos por etapas definidos en la propuesta comercial."
      }
    },
    {
      "@type": "Question",
      "name": "¿Los precios son definitivos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Son precios iniciales. El valor final depende del alcance, funcionalidades e integraciones requeridas."
      }
    },
    {
      "@type": "Question",
      "name": "¿Pueden rediseñar una página que ya existe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Primero se realiza una revisión técnica y visual para definir el alcance del rediseño."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tarda el desarrollo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El tiempo depende del tipo de proyecto. Una landing page puede tomar entre 7 y 12 días, mientras que proyectos más avanzados requieren un plazo mayor."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajan con clientes fuera de Colombia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. K&T Code puede trabajar con empresas y emprendedores de diferentes países de manera remota."
      }
    },
    {
      "@type": "Question",
      "name": "¿La página quedará adaptada para celulares?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Todos los proyectos se desarrollan para funcionar correctamente en computadores, tablets y dispositivos móviles."
      }
    },
    {
      "@type": "Question",
      "name": "¿Ofrecen mantenimiento después de publicar la web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Se pueden contratar planes de mantenimiento, soporte y mejoras continuas."
      }
    }
  ]
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="min-h-screen pt-32 pb-16 relative overflow-hidden bg-black">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-24 lg:gap-32">
          <PricingHero />
          <PricingCards />
          <AdditionalServices />
          <HowWeWork />
          <ComparisonTable />
          <PricingFAQ />
          <PricingCTA />
        </div>
      </main>
      <Footer />
    </>
  )
}
