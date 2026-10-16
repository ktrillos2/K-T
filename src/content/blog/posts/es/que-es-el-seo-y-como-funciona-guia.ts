import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "El SEO (Search Engine Optimization) es el conjunto de técnicas para que tu web aparezca en los primeros resultados de Google cuando alguien busca lo que ofreces, sin pagar por cada clic.",
    "Tiene tres pilares: SEO técnico (que Google pueda leer tu sitio), SEO on-page (contenido que responde la búsqueda) y SEO off-page (autoridad y menciones).",
    "Los resultados sólidos suelen verse entre 3 y 6 meses de trabajo continuo, según la competencia.",
  ],
  md: `
El SEO es la forma de conseguir clientes de manera constante sin pagar por cada visita. En esta guía te explicamos qué es, cómo funciona Google y qué hace falta para posicionar tu negocio.

## Cómo funciona Google en tres pasos {#como-funciona}

1. **Rastreo:** robots de Google recorren la web siguiendo enlaces y sitemaps.
2. **Indexación:** Google guarda y entiende el contenido de cada página.
3. **Clasificación:** cuando alguien busca, ordena las páginas según relevancia, calidad, experiencia de usuario y autoridad.

## Los 3 pilares del SEO {#pilares}

### 1. SEO técnico: la base

Asegura que Google pueda rastrear e interpretar tu sitio sin obstáculos.

- Carga rápida, idealmente en menos de un segundo.
- Contenido entregado desde el servidor, sin depender de scripts pesados.
- Diseño adaptado a celulares.
- Datos estructurados (schema.org) y sitemap.xml.

### 2. SEO on-page: contenido y palabras clave

- Responde la intención de búsqueda: qué quiere saber o hacer quien busca.
- Usa un H1 por página y encabezados H2 y H3 ordenados.
- Escribe títulos y descripciones únicos.
- Enlaza tus páginas entre sí de forma lógica.

### 3. SEO off-page: autoridad y confianza

- Menciones de tu marca en otros sitios.
- Enlaces desde medios y directorios del sector.
- Reseñas en tu perfil de empresa de Google.

## SEO vs. SEM (Google Ads) {#seo-vs-sem}

Tabla: Diferencias entre posicionamiento orgánico y publicidad pagada.
| Criterio | SEO (orgánico) | SEM (Google Ads) |
|---|---|---|
| Costo por clic | Ninguno | Pagas cada clic |
| Velocidad | De 3 a 6 meses | Inmediato |
| Al dejar de invertir | El tráfico se mantiene un tiempo | El tráfico se detiene |
| Confianza del usuario | Alta | Media: se marca como anuncio |

Lo ideal suele ser combinarlos: anuncios para resultados inmediatos y SEO para construir un canal estable.

:::quiz
? ¿Cuál de estos es un factor de SEO técnico?
- Tener muchos seguidores en redes
- *Que la página cargue rápido y tenga datos estructurados
- Publicar anuncios en Google
= El SEO técnico se ocupa de que Google pueda leer y entender tu sitio: velocidad, estructura y datos estructurados.
? ¿Cuánto suele tardar el SEO en dar resultados sólidos?
- Una semana
- *Entre 3 y 6 meses
- Dos años como mínimo
= Depende de la competencia y de la autoridad del dominio, pero lo habitual son de 3 a 6 meses de trabajo continuo.
:::

## Sigue aprendiendo {#mas}

- [Cómo aparecer en Google paso a paso](/blog/como-aparecer-en-google-guia-paso-a-paso)
- [Por qué tu web no aparece en Google](/blog/por-que-mi-pagina-web-no-aparece-en-google)
- [GEO vs. SEO: cómo aparecer en motores de IA](/blog/geo-vs-seo-diferencias-motores-ia)
- [Por qué el SEO se planea desde la arquitectura](/blog/seo-desde-la-raiz-crear-pagina)

Construimos sitios con SEO desde la primera línea de código. Conoce nuestro servicio de [SEO técnico](/servicios/seo-tecnico).
`,
  faq: [
    { q: "¿Cuál es la diferencia entre SEO y SEM?", a: "Con SEM (Google Ads) pagas por cada clic y el tráfico se detiene al apagar la campaña. Con SEO construyes un activo que trae visitas gratuitas y constantes mes a mes." },
    { q: "¿Cuánto tiempo toma ver resultados con SEO?", a: "Normalmente entre 3 y 6 meses de trabajo continuo, según la competencia del sector y la autoridad inicial del dominio." },
  ],
  sources: [{ title: "Google Search Central: guía de optimización para motores de búsqueda", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" }],
};

export default post;
