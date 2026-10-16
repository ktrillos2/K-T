import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Aparecer en Google es gratis: no se paga por la indexación ni por los primeros lugares orgánicos.",
    "Cuatro pasos para una web nueva: verificar el dominio en Google Search Console, enviar el sitemap.xml, escribir títulos y descripciones únicos y crear el Perfil de Empresa en Google.",
    "Search Console es la herramienta oficial y gratuita para ver qué páginas están indexadas y corregir errores.",
  ],
  md: `
Lanzaste tu web y quieres que tus clientes la encuentren. Estos son los pasos para que Google la descubra, la entienda y la muestre.

## Paso 1: verifica tu dominio en Google Search Console {#search-console}

1. Entra a Google Search Console con la cuenta de tu empresa.
2. Agrega una propiedad de tipo **dominio**.
3. Copia el registro TXT que te da Google y agrégalo en el DNS de tu dominio.
4. Pulsa **verificar**. Puede tardar unos minutos.

## Paso 2: envía tu sitemap.xml {#sitemap}

El sitemap es el mapa que le dice a Google qué páginas existen y cuándo cambiaron. En un sitio bien hecho se genera solo en \`tudominio.com/sitemap.xml\`. En Search Console, ve a **Sitemaps**, escribe la dirección y envíala.

:::tip Pide indexar tus páginas clave
Con la herramienta de inspección de URL de Search Console puedes solicitar la indexación de tu página de inicio y de tus servicios principales.
:::

## Paso 3: títulos y descripciones únicos {#titulos}

Tabla: Ejemplos de títulos para SEO local.
| Página | Título débil | Título optimizado |
|---|---|---|
| Inicio | Inicio | Diseño web a la medida en Cúcuta · Mi Empresa |
| Servicio | Servicios | Tiendas virtuales con pagos PSE y Nequi · Mi Empresa |
| Contacto | Contacto | Cotiza tu página web en Colombia · Mi Empresa |

- Incluye el servicio principal y la ciudad cuando aplique.
- La descripción debe invitar al clic: qué ofreces y por qué elegirte.

## Paso 4: crea tu Perfil de Empresa en Google {#perfil}

Si atiendes clientes en ciudades como Bogotá, Medellín, Cali o Cúcuta, el Perfil de Empresa en Google (antes Google My Business) te hace aparecer en Google Maps y en las búsquedas locales. Verifícalo, agrega fotos, horario, sitio web y pide reseñas a tus clientes.

:::checklist id="aparecer-google" title="Checklist para aparecer en Google"
- Verifiqué mi dominio en Search Console
- Envié el sitemap.xml
- Solicité la indexación de mis páginas principales
- Cada página tiene título y descripción únicos
- Creé y verifiqué el Perfil de Empresa en Google
- Pedí reseñas a mis clientes
:::

## ¿Cómo sé si ya aparezco? {#verificar}

Busca \`site:tudominio.com\`. Si no aparece nada después de unas semanas, revisa [por qué tu web no aparece en Google](/blog/por-que-mi-pagina-web-no-aparece-en-google).

En K&T Code entregamos cada sitio con Search Console configurado, sitemap automático y datos estructurados. Conoce el servicio de [SEO técnico](/servicios/seo-tecnico) o los [precios de una página web](/precios/precio-pagina-web-colombia).
`,
  faq: [
    { q: "¿Es gratis aparecer en Google?", a: "Sí. Google no cobra por indexar tu sitio ni por los primeros lugares orgánicos; el posicionamiento depende de la calidad técnica y del contenido." },
    { q: "¿Qué herramienta necesito para indexar mi web?", a: "Google Search Console, la herramienta oficial y gratuita para enviar el sitemap, ver el estado de indexación y corregir errores de rastreo." },
  ],
  sources: [
    { title: "Google Search Console", url: "https://search.google.com/search-console/about" },
    { title: "Google Search Central: crear y enviar un sitemap", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap" },
    { title: "Perfil de Empresa en Google", url: "https://www.google.com/business/" },
  ],
};

export default post;
