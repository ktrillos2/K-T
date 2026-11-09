import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Un dominio es la dirección única con la que tus clientes llegan a tu web, como tuempresa.com o tuempresa.co.",
    "Elige un nombre corto, fácil de pronunciar y basado en tu marca; evita números y guiones.",
    "Un .com cuesta aproximadamente entre USD 12 y 18 al año; un .co o .com.co, entre USD 20 y 35.",
    "Regístralo siempre a nombre de tu empresa y en un registrador acreditado.",
    "El hosting es donde viven los archivos de tu web: uno tradicional básico cuesta entre USD 4 y 15 al mes; un sitio corporativo en una red global, entre USD 0 y 20.",
  ],
  md: `
El dominio es la dirección de tu negocio en internet. Elegirlo bien es una decisión de marca que te acompañará por años. Esta guía te ayuda a escoger el nombre y la extensión correctos, y a entender qué tipo de hosting necesitas.

## Qué es un dominio y cómo funciona {#que-es}

Cuando alguien escribe \`tuempresa.com\`, el sistema de nombres de dominio (DNS) traduce esa dirección al servidor donde está alojada tu web. El dominio es el nombre; el hosting es el lugar donde viven los archivos.

## Consejos para elegir tu dominio {#consejos}

- **Corto y fácil de pronunciar:** que puedas dictarlo por teléfono sin deletrear.
- **Sin números ni guiones:** generan confusión y errores al escribirlo.
- **Marca antes que palabras clave:** "tumarca.com" se recuerda mejor que "paginaswebbaratascolombia.com".
- **Protege tu marca:** si compras tuempresa.com, considera también tuempresa.co.
- **Usa un registrador acreditado por ICANN** con precios de renovación transparentes.

## ¿.com, .co o .com.co? {#extensiones}

Tabla: Extensiones más usadas en Colombia.
| Extensión | Ideal para | Precio aproximado al año |
|---|---|---|
| .com | Negocios con alcance internacional | USD 12 – 18 |
| .co | Marcas colombianas y startups | USD 20 – 35 |
| .com.co | Empresas que operan solo en Colombia | USD 20 – 35 |

Los precios cambian según el registrador y suelen ser más altos al renovar que en el primer año: revisa siempre el precio de renovación.

## Errores comunes {#errores}

1. Registrar el dominio a nombre del desarrollador o de la agencia, no de tu empresa.
2. Olvidar la renovación automática y perder el dominio.
3. Elegir un nombre muy parecido al de la competencia.
4. No configurar el correo corporativo con el mismo dominio.

:::checklist id="elegir-dominio" title="Antes de registrar tu dominio"
- El nombre es corto y fácil de pronunciar
- No tiene números ni guiones
- Revisé que no se parezca a otra marca
- Elegí la extensión según mis mercados
- Quedará registrado a nombre de mi empresa
- Activé la renovación automática
:::

## Qué hosting necesita tu web {#hosting}

Si el dominio es la dirección de tu negocio, el hosting es el local donde está la mercancía: el servicio que guarda los archivos, el código y la base de datos en servidores conectados a internet las 24 horas. El tipo que elijas define qué tan rápido y estable será tu sitio.

Tabla: Comparación de los tipos de alojamiento web.
| Tipo | Cómo funciona | Ideal para | Riesgo |
|---|---|---|---|
| Compartido | Cientos de sitios comparten un servidor | Sitios pequeños con poco tráfico | Lento e inestable en picos |
| VPS | Recursos reservados en un servidor virtual | Aplicaciones medianas | Requiere administración técnica |
| Dedicado | Un servidor físico completo para ti | Alta demanda empresarial | Costoso |
| Red global (edge) | Copias del sitio en centros de datos de todo el mundo | Sitios rápidos con tráfico variable | Requiere un sitio construido para ello |

### Por qué usamos redes globales

El hosting tradicional depende de un solo servidor: si llega mucho tráfico, se satura. En una red global, tu sitio se replica en muchos centros de datos y cada visitante lo recibe desde el más cercano, en milisegundos. Además escala solo cuando hay picos, por ejemplo en una campaña.

### Cuánto cuesta el hosting

- **Hosting compartido básico:** USD 4 a 15 al mes.
- **Sitio corporativo en red global:** USD 0 a 20 al mes, según el tráfico.
- **VPS o dedicado:** desde decenas hasta cientos de dólares al mes.

:::tip Lo barato puede salir caro
Un hosting lento afecta la velocidad, y la velocidad afecta tus ventas y tu posición en Google. Mira [el costo oculto de una web lenta](/blog/costo-oculto-pagina-web-lenta).
:::

En todos nuestros proyectos te asesoramos para elegir el dominio y configurar el DNS, el correo corporativo y el certificado SSL. Mira [cómo crear una web desde cero](/blog/como-crear-una-pagina-web-desde-cero-2026).
`,
  faq: [
    { q: "¿Cuánto cuesta registrar un dominio en Colombia?", a: "Un .com cuesta aproximadamente entre USD 12 y 18 al año. Un .co o .com.co, entre USD 20 y 35 al año, según el registrador." },
    { q: "¿Es mejor .com o .co?", a: "Si operas solo en Colombia, .co o .com.co refuerzan tu presencia local. Si vendes a otros países, .com sigue siendo el estándar más reconocido." },
    { q: "¿Qué es el hosting en red global (edge)?", a: "En lugar de un solo servidor, tu sitio se replica en muchos centros de datos del mundo y se entrega desde el más cercano al visitante, lo que lo hace más rápido y estable." },
    { q: "¿Cuánto cuesta el hosting de una página web?", a: "Un hosting tradicional básico cuesta entre USD 4 y 15 al mes. Un sitio corporativo en una red global puede costar entre USD 0 y 20 al mes." },
  ],
  sources: [{ title: "ICANN: registradores acreditados", url: "https://www.icann.org/registrar-reports/accredited-list.html" }],
};

export default post;
