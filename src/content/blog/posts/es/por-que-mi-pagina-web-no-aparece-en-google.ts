import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Si pagaste por una web y no aparece en Google, casi siempre hay un error técnico evitable detrás.",
    "Las causas más comunes: una etiqueta noindex olvidada, robots.txt bloqueando el sitio, no haber enviado el sitemap a Search Console y un sitio demasiado lento.",
    "Para saber si estás indexado, busca site:tudominio.com en Google. Una web nueva suele tardar de 4 días a 3 semanas en indexarse si todo está bien configurado.",
  ],
  md: `
Pagar por una página web y no encontrarla en Google es una de las frustraciones más comunes de los empresarios en Colombia. La buena noticia: la mayoría de las veces es un error técnico que se puede corregir. Usa esta guía como diagnóstico, de lo más frecuente a lo menos frecuente.

## Primero: ¿tu web está indexada? {#diagnostico}

Escribe en Google \`site:tudominio.com\`. Si aparecen páginas, están indexadas y el problema es de posicionamiento. Si no aparece nada, Google no ha podido o no ha querido guardar tu sitio. Luego revisa el informe de indexación de [Google Search Console](/blog/como-aparecer-en-google-guia-paso-a-paso).

## Las 12 causas más comunes {#causas}

### 1. Etiqueta noindex olvidada

Durante el desarrollo se suele marcar el sitio con \`noindex\` para que Google no indexe la versión de prueba. Si nadie la quita al publicar, Google obedece y no indexa nada.

### 2. robots.txt bloqueando todo

Una línea \`Disallow: /\` en el archivo robots.txt le prohíbe a Google rastrear cualquier página.

### 3. No enviaste el sitio a Search Console

Sin verificar el dominio ni enviar el sitemap.xml, Google puede tardar mucho en descubrir tus páginas.

### 4. El sitio es demasiado lento

Las plantillas pesadas que tardan más de 4 segundos en responder consumen el tiempo que Google dedica a rastrear tu sitio. Puede irse antes de leerlo todo. Mira [el costo oculto de una web lenta](/blog/costo-oculto-pagina-web-lenta).

### 5. Contenido duplicado o canibalización

Varias páginas compitiendo por la misma búsqueda, o textos copiados de otros sitios, hacen que Google no sepa cuál mostrar o que las relegue.

### 6. Encabezados desordenados

Varios H1 o ningún H2 confunden sobre el tema principal de la página.

### 7. Etiqueta canonical mal configurada

Si todas tus páginas declaran como "versión principal" la página de inicio, Google ignora las demás.

### 8. Contenido que solo aparece con JavaScript

Si el texto se dibuja en el navegador después de cargar scripts pesados, el rastreador puede ver una página casi vacía. Lo ideal es entregar el HTML completo desde el servidor.

### 9. Páginas huérfanas

Páginas a las que no llega ningún enlace interno ni aparecen en el sitemap: Google difícilmente las encuentra.

### 10. Errores de servidor y redirecciones en cadena

Errores 404 y 500 frecuentes, o redirecciones que saltan varias veces antes de llegar a la página final, hacen que Google desconfíe.

### 11. Contenido escaso o poco útil

Páginas con dos líneas de texto o descripciones genéricas no responden ninguna búsqueda. Google prioriza contenido que resuelve una necesidad real.

### 12. Acciones manuales o sitio comprometido

Si tu sitio fue hackeado o infringió las políticas de Google, puede recibir una acción manual. Search Console te lo avisa en la sección de seguridad.

:::checklist id="diagnostico-indexacion" title="Diagnóstico rápido de indexación"
- Busqué site:midominio.com y revisé qué aparece
- Ninguna página tiene la etiqueta noindex por error
- robots.txt no bloquea el sitio
- Verifiqué el dominio y envié el sitemap en Search Console
- Mi web carga en menos de 3 segundos en móvil
- Cada página tiene un solo H1 y un tema claro
- Las canonical apuntan a la propia página
- El contenido aparece en el HTML sin depender de scripts
- Todas las páginas importantes tienen enlaces internos
- No hay acciones manuales ni problemas de seguridad
:::

## ¿Necesitas ayuda? {#auditoria}

Hacemos una auditoría técnica de tu dominio, encontramos los errores de indexación y, si hace falta, reconstruimos la web sobre una base rápida y bien estructurada. Conoce el servicio de [SEO técnico](/servicios/seo-tecnico).

## Sigue aprendiendo {#mas}

- [Qué es el SEO y cómo funciona](/blog/que-es-el-seo-y-como-funciona-guia)
- [Cómo aparecer en Google paso a paso](/blog/como-aparecer-en-google-guia-paso-a-paso)
- [Por qué el SEO se planea desde la arquitectura](/blog/seo-desde-la-raiz-crear-pagina)
`,
  faq: [
    { q: "¿Cuánto tarda una web nueva en aparecer en Google?", a: "Normalmente entre 4 días y 3 semanas para las páginas principales, si se envió el sitemap en Search Console y no hay bloqueos como noindex." },
    { q: "¿Cómo sé si mi web está indexada?", a: "Busca site:tudominio.com en Google. Si aparecen páginas, están indexadas; si no aparece nada, hay un problema de rastreo o indexación." },
  ],
  sources: [
    { title: "Google Search Central: bloquear la indexación con noindex", url: "https://developers.google.com/search/docs/crawling-indexing/block-indexing" },
    { title: "Google Search Console", url: "https://search.google.com/search-console/about" },
  ],
};

export default post;
