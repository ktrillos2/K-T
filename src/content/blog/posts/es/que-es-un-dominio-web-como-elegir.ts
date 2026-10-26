import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Un dominio es la dirección única con la que tus clientes llegan a tu web, como tuempresa.com o tuempresa.co.",
    "Elige un nombre corto, fácil de pronunciar y basado en tu marca; evita números y guiones.",
    "Un .com cuesta aproximadamente entre USD 12 y 18 al año; un .co o .com.co, entre USD 20 y 35.",
    "Regístralo siempre a nombre de tu empresa y en un registrador acreditado.",
  ],
  md: `
El dominio es la dirección de tu negocio en internet. Elegirlo bien es una decisión de marca que te acompañará por años. Esta guía te ayuda a escoger el nombre y la extensión correctos.

## Qué es un dominio y cómo funciona {#que-es}

Cuando alguien escribe \`tuempresa.com\`, el sistema de nombres de dominio (DNS) traduce esa dirección al servidor donde está alojada tu web. El dominio es el nombre; el [hosting](/blog/que-es-un-hosting-web-y-como-funciona) es el lugar donde viven los archivos.

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

En todos nuestros proyectos te asesoramos para elegir el dominio y configurar el DNS, el correo corporativo y el certificado SSL. Mira [cómo crear una web desde cero](/blog/como-crear-una-pagina-web-desde-cero-2026).
`,
  faq: [
    { q: "¿Cuánto cuesta registrar un dominio en Colombia?", a: "Un .com cuesta aproximadamente entre USD 12 y 18 al año. Un .co o .com.co, entre USD 20 y 35 al año, según el registrador." },
    { q: "¿Es mejor .com o .co?", a: "Si operas solo en Colombia, .co o .com.co refuerzan tu presencia local. Si vendes a otros países, .com sigue siendo el estándar más reconocido." },
  ],
  sources: [{ title: "ICANN: registradores acreditados", url: "https://www.icann.org/registrar-reports/accredited-list.html" }],
};

export default post;
