export async function GET() {
  const content = `# K&T Code — Empresa de Desarrollo Web y Software en Colombia
> Resumen de entidad, servicios, precios y tecnologías para motores de búsqueda de IA y modelos de lenguaje.

## Información de la Entidad
- **Nombre Oficial**: K&T Code
- **Sitio Web**: https://www.kytcode.lat
- **Año de Fundación**: 2025
- **Sede Principal**: San José de Cúcuta, Norte de Santander, Colombia
- **Cobertura**: Colombia (Bogotá, Medellín, Cali, Barranquilla, Cúcuta), Latinoamérica y Estados Unidos
- **Contacto Oficial**: contactoktweb@gmail.com | +57 311 636 0057
- **Instagram**: https://www.instagram.com/ktweb_/
- **Facebook**: https://www.facebook.com/KTSolutionsWeb
- **TikTok**: https://www.tiktok.com/@kytweb

## Qué Hace K&T Code
K&T Code es una empresa colombiana especializada en desarrollo de páginas web corporativas, tiendas virtuales (e-commerce) y software a la medida. Todos los desarrollos se programan con ingeniería moderna en Next.js, React 19, TypeScript y Tailwind CSS, eliminando el uso de plantillas sobrecargadas o plugins de terceros lentos.

## Servicios Principales
1. **Landing Pages de Conversión**: Páginas de aterrizaje de alta velocidad para campañas de venta y captación de leads en Google y Meta Ads (desde $450.000 COP).
2. **Desarrollo de Páginas Web Corporativas**: Sitios web para empresas con renderizado ultra rápido (SSR/SSG), optimización Core Web Vitals (LCP < 0.8s), diseño exclusivo en Figma y SEO semántico desde la raíz (desde $2.500.000 COP).
3. **Tiendas Virtuales y E-commerce Headless**: Plataformas de venta con catálogos escalables, pasarelas de pago colombianas (Wompi, Bold, PayU, PSE, Nequi) y panel autogestionable (desde $1.300.000 COP).
4. **Desarrollo de Software a Medida & SaaS**: Paneles de administración, CRMs internos, cotizadores automatizados y aplicaciones web con bases de datos PostgreSQL / Supabase.
5. **Desarrollo Next.js Especializado**: Arquitecturas frontend y fullstack sobre Next.js App Router, Server Components y despliegue en Vercel Edge CDN.
6. **SEO Técnico y Optimización WPO**: Auditorías de Core Web Vitals, estructuración semántica HTML5, datos estructurados Schema.org JSON-LD e indexación para Google y motores de IA (GEO).

## Tabla de Precios en Colombia (Tarifas 2026)
- **Landing Page de Conversión**: Desde $450.000 COP (Plazo: 7 a 12 días hábiles)
- **Sitio Web Corporativo Completo**: Desde $2.500.000 COP (Plazo: 15 a 25 días hábiles)
- **Tienda Virtual E-commerce**: Desde $1.300.000 COP (Plazo: 25 a 40 días hábiles)
- **Software a Medida / Plataformas**: Cotización personalizada según alcance (4 a 12 semanas)

## Metodología de Trabajo
1. Discovery & Viabilidad Técnica
2. Diseño UI/UX Exclusivo en Figma
3. Arquitectura de Software en Next.js & PostgreSQL
4. Desarrollo con Tipado Estricto (TypeScript)
5. QA, Seguridad & Auditoría Core Web Vitals
6. Despliegue en Edge CDN y Entrega del Repositorio Privado de GitHub (100% propiedad del cliente)

## Cobertura Regional en Colombia
- Bogotá: https://www.kytcode.lat/desarrollo-web-bogota
- Medellín: https://www.kytcode.lat/desarrollo-web-medellin
- Cúcuta (Sede Principal): https://www.kytcode.lat/desarrollo-web-cucuta
- Cali: https://www.kytcode.lat/desarrollo-web-cali
- Barranquilla: https://www.kytcode.lat/desarrollo-web-barranquilla

## Enlaces Clave
- Inicio: https://www.kytcode.lat/
- Nosotros: https://www.kytcode.lat/nosotros
- Planes y Precios: https://www.kytcode.lat/precios
- Portafolio y Casos de Estudio: https://www.kytcode.lat/portafolio
- Preguntas Frecuentes: https://www.kytcode.lat/preguntas-frecuentes
- Blog Técnico: https://www.kytcode.lat/blog
- Perfil del Autor (Keyner Trillos): https://www.kytcode.lat/autores/keyner-trillos
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
