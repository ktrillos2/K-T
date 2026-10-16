import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "El hosting es el servicio que guarda los archivos, el código y la base de datos de tu web en servidores conectados a internet las 24 horas.",
    "Hay cuatro tipos: compartido, VPS, dedicado y red global (edge), que sirve tu sitio desde el servidor más cercano a cada visitante.",
    "Un hosting tradicional básico cuesta entre USD 4 y 15 al mes; un sitio corporativo en una red global puede costar entre USD 0 y 20 al mes.",
  ],
  md: `
Si el dominio es la dirección de tu negocio, el hosting es el local donde está la mercancía. Elegir bien el tipo de alojamiento define qué tan rápido y estable será tu sitio.

## Tipos de hosting {#tipos}

Tabla: Comparación de los tipos de alojamiento web.
| Tipo | Cómo funciona | Ideal para | Riesgo |
|---|---|---|---|
| Compartido | Cientos de sitios comparten un servidor | Sitios pequeños con poco tráfico | Lento e inestable en picos |
| VPS | Recursos reservados en un servidor virtual | Aplicaciones medianas | Requiere administración técnica |
| Dedicado | Un servidor físico completo para ti | Alta demanda empresarial | Costoso |
| Red global (edge) | Copias del sitio en centros de datos de todo el mundo | Sitios rápidos con tráfico variable | Requiere un sitio construido para ello |

## Por qué usamos redes globales {#edge}

El hosting tradicional depende de un solo servidor: si llega mucho tráfico, se satura. En una red global, tu sitio se replica en muchos centros de datos y cada visitante lo recibe desde el más cercano, en milisegundos. Además escala solo cuando hay picos, por ejemplo en una campaña.

## Cuánto cuesta {#precios}

- **Hosting compartido básico:** USD 4 a 15 al mes.
- **Sitio corporativo en red global:** USD 0 a 20 al mes, según el tráfico.
- **VPS o dedicado:** desde decenas hasta cientos de dólares al mes.

:::tip Lo barato puede salir caro
Un hosting lento afecta la velocidad, y la velocidad afecta tus ventas y tu posición en Google. Mira [el costo oculto de una web lenta](/blog/costo-oculto-pagina-web-lenta).
:::

Sigue con [qué es un dominio y cómo elegirlo](/blog/que-es-un-dominio-web-como-elegir) o [cuánto cuesta el mantenimiento de una web](/blog/cuanto-cuesta-mantenimiento-pagina-web-colombia).
`,
  faq: [
    { q: "¿Qué es el hosting en red global (edge)?", a: "En lugar de un solo servidor, tu sitio se replica en muchos centros de datos del mundo y se entrega desde el más cercano al visitante, lo que lo hace más rápido y estable." },
    { q: "¿Cuánto cuesta el hosting de una página web?", a: "Un hosting tradicional básico cuesta entre USD 4 y 15 al mes. Un sitio corporativo en una red global puede costar entre USD 0 y 20 al mes." },
  ],
};

export default post;
