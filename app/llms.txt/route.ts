import { blogPosts } from "@/lib/blog-posts"
import { siteConfig } from "@/lib/site-config"

export function GET() {
  const articles = blogPosts
    .map((post) => `- ${post.title}: ${siteConfig.url}/blog/${post.slug}`)
    .join("\n")

  const body = `# ${siteConfig.organizationName}\n\n${siteConfig.description}\n\n## Servicios principales\n- Desarrollo web a medida: ${siteConfig.url}/servicios/desarrollo-web-a-medida\n- Diseño web corporativo: ${siteConfig.url}/servicios/diseno-web-corporativo\n- Tiendas virtuales: ${siteConfig.url}/servicios/tiendas-virtuales\n- Software a medida: ${siteConfig.url}/servicios/software-a-medida\n- SEO técnico: ${siteConfig.url}/servicios/seo-tecnico\n- Mantenimiento web: ${siteConfig.url}/servicios/mantenimiento-web\n\n## Recursos\n- Precios: ${siteConfig.url}/precios\n- Portafolio: ${siteConfig.url}/portafolio\n- Preguntas frecuentes: ${siteConfig.url}/preguntas-frecuentes\n- Contacto: ${siteConfig.url}/#contact\n\n## Artículos\n${articles}\n\n## Contacto\n- Correo: ${siteConfig.email}\n- Teléfono: ${siteConfig.phone}\n`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
