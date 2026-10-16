import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "React es una librería para construir interfaces; Next.js es un framework construido sobre React que agrega servidor, rutas, optimización de imágenes y renderizado en el servidor.",
    "No son rivales: Next.js usa React por dentro.",
    "React puro (SPA) conviene para paneles privados con inicio de sesión; Next.js conviene para sitios públicos, tiendas y todo lo que deba posicionarse en Google y en motores de IA.",
  ],
  md: `
"¿React o Next.js?" es una pregunta frecuente, pero parte de una confusión: no compiten. React es la base y Next.js es el marco de producción que se construye sobre ella.

## Tabla comparativa {#comparativa}

Tabla: React puro frente a Next.js.
| Característica | React puro (SPA) | Next.js |
|---|---|---|
| Tipo de herramienta | Librería de interfaces | Framework completo |
| Renderizado | En el navegador (CSR) | En el servidor, estático o incremental |
| SEO y motores de IA | Difícil: el HTML inicial llega casi vacío | Nativo: el HTML llega completo |
| Rutas | Requiere librerías externas | Integradas por carpetas |
| Imágenes | Optimización manual | Optimización automática |
| Lógica de servidor | Requiere un servidor aparte | Integrada |
| Ideal para | Paneles privados, CRMs, herramientas internas | Sitios web, e-commerce, plataformas públicas |

## Cuándo usar React puro {#react}

- **Paneles privados y CRMs** con inicio de sesión, donde el contenido no necesita aparecer en Google.
- **Herramientas muy interactivas:** editores gráficos, lienzos, tableros en tiempo real.
- **Despliegues estáticos simples** con costo mínimo.

## Cuándo usar Next.js {#nextjs}

- **Sitios corporativos y captación de clientes**, donde el SEO y la velocidad influyen en la conversión.
- **Tiendas virtuales** con catálogos grandes.
- **Lógica sensible en el servidor** sin exponer claves al navegador.

:::quiz
? ¿Next.js reemplaza a React?
- Sí, son tecnologías rivales
- *No, Next.js está construido sobre React
- Solo en aplicaciones móviles
= Next.js usa React para los componentes y agrega servidor, rutas y renderizado.
? ¿Por qué una SPA de React puro puede tener problemas de SEO?
- Porque React es lento
- *Porque el HTML inicial llega casi vacío y el contenido aparece después de ejecutar JavaScript
- Porque no permite títulos
= Los rastreadores deben ejecutar el JavaScript para ver el contenido, lo que retrasa o dificulta la indexación.
:::

Profundiza en [Next.js vs. WordPress](/blog/nextjs-vs-wordpress) o mira nuestro servicio de [desarrollo con Next.js](/servicios/desarrollo-nextjs).
`,
  faq: [
    { q: "¿Next.js reemplaza a React?", a: "No. Next.js está construido sobre React: React define los componentes y la interactividad; Next.js agrega servidor, rutas, optimización y renderizado en el servidor." },
    { q: "¿Por qué una SPA de React puro tiene problemas de SEO?", a: "Porque entrega un HTML casi vacío y el contenido aparece después de ejecutar JavaScript en el navegador, lo que retrasa o perjudica la indexación." },
    { q: "¿Cuándo basta con React puro?", a: "En paneles administrativos privados, tableros internos y aplicaciones con inicio de sesión, donde el contenido no necesita aparecer en buscadores." },
  ],
  sources: [
    { title: "React", url: "https://react.dev/" },
    { title: "Next.js", url: "https://nextjs.org/docs" },
  ],
};

export default post;
