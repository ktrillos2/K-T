import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Wix es más fácil para empezar (arrastrar y soltar), pero es un sistema cerrado: no puedes exportar tu sitio si decides irte.",
    "WordPress tiene curva de aprendizaje, pero el código es libre y puedes moverlo a otro hosting.",
    "Con hosting propio, WordPress suele costar menos que los planes premium de Wix, que además suben al renovar.",
  ],
  md: `
Wix y WordPress son dos de las formas más populares de tener una web sin programar desde cero. Elegir mal puede obligarte a rehacer todo cuando tu negocio crezca.

## Comparativa de aspectos clave {#comparativa}

Tabla: Wix frente a WordPress.
| Criterio | Wix | WordPress |
|---|---|---|
| Facilidad para empezar | Muy alta: arrastrar y soltar | Media: requiere aprender |
| Propiedad y portabilidad | No puedes exportar el sitio | Código libre, lo mueves a otro hosting |
| Velocidad | Moderada: muchos scripts | Buena si se optimiza bien |
| Flexibilidad | Limitada a lo que ofrece Wix | Alta con plugins, pero cada plugin pesa |
| Costo | Plan mensual que sube al renovar | Hosting y dominio, más plugins premium |

## Qué pasa cuando tu negocio crece {#crecer}

Con Wix, migrar significa reconstruir el sitio desde cero porque no hay forma de llevarte el código ni la base de datos. Con WordPress puedes cambiar de hosting, pero a medida que sumas plugins el sitio se vuelve más lento y más vulnerable.

## ¿Hay una tercera opción? {#a-la-medida}

Un sitio a la medida no depende de ninguna plataforma: el código es tuyo, carga en menos de un segundo y no pagas licencias. Compáralo con nuestro [análisis de desarrollo a la medida vs. plantillas](/blog/desarrollo-web-medida-vs-plantillas).

::widget template-vs-custom
`,
  faq: [
    { q: "¿Puedo migrar de Wix a otra plataforma?", a: "Wix es un sistema cerrado que no permite exportar el código ni la base de datos, así que migrar implica reconstruir el sitio desde cero." },
    { q: "¿Cuál es más económico para un negocio en Colombia?", a: "WordPress con hosting propio suele costar menos que los planes premium de Wix y evita los aumentos al renovar, aunque requiere más mantenimiento técnico." },
  ],
};

export default post;
