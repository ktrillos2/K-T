import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Una API (del inglés Application Programming Interface, «interfaz de programación de aplicaciones») es la forma en que dos programas se comunican de manera segura.",
    "Funciona como un mesero: tú haces el pedido (solicitud), él lo lleva a la cocina (servidor) y te trae el plato (respuesta).",
    "Los tipos más comunes en la web son REST, GraphQL y los webhooks.",
    "En una página web se usa para cobrar con pasarelas, mostrar mapas, enviar correos y WhatsApp, calcular envíos o iniciar sesión con Google.",
  ],
  md: `
Usas APIs todos los días sin saberlo: al comprar un tiquete, pagar en una tienda en línea o revisar el clima en el celular. Aquí te explicamos qué es una API, qué significa, para qué sirve y cómo funciona, sin tecnicismos.

## Qué es una API en palabras simples {#que-es}

Una API es un **puente que permite que dos programas se hablen**. Imagina un restaurante: no entras a la cocina, le pides al mesero. Él lleva tu pedido, la cocina lo prepara y el mesero te trae el plato. La API es ese mesero entre dos programas: recibe una solicitud, la lleva al sistema que tiene la información y devuelve la respuesta.

## ¿Qué significa API? {#significado}

API son las siglas en inglés de ***Application Programming Interface***, que en español es **interfaz de programación de aplicaciones**:

- **Interfaz:** el punto de contacto entre dos sistemas.
- **De programación:** la usan los programas (no las personas) mediante código.
- **De aplicaciones:** conecta aplicaciones, sitios web y servicios.

## Cómo funciona una API, paso a paso {#como-funciona}

1. **Solicitud:** una aplicación pide algo a una dirección web llamada *endpoint* (por ejemplo, «dame el precio del producto 123»).
2. **Autorización:** la API revisa que quien pregunta tenga permiso, normalmente con una clave o un token.
3. **Proceso:** el servidor busca la información o ejecuta la acción (cobrar, guardar, enviar).
4. **Respuesta:** la API devuelve el resultado, casi siempre en formato JSON, que los programas leen fácilmente.

Así se ve una respuesta típica:

\`{ "producto": "Camiseta", "precio": 59900, "stock": 12 }\`

## 3 ejemplos cotidianos {#ejemplos}

- **Pagos:** tu tienda no guarda los datos de la tarjeta. Le pide a la pasarela (Wompi, PayU) que autorice el cobro mediante una API segura.
- **Mapas:** tu web muestra la ubicación de tu sede usando la API de Google Maps, sin dibujar un mapa desde cero.
- **Mensajes:** los correos de confirmación y los mensajes de WhatsApp se envían con APIs de servicios especializados.

## Tipos de API: REST, GraphQL y webhooks {#tipos}

Tabla: Los tipos de API más usados en la web.
| Tipo | Cómo funciona | Cuándo se usa |
|---|---|---|
| REST (API REST) | Cada recurso tiene su dirección y se consulta con métodos como GET o POST | La mayoría de servicios: pagos, tiendas, CRM |
| GraphQL | Una sola dirección; pides exactamente los datos que necesitas | Apps con muchos datos relacionados |
| Webhooks | El servicio te avisa cuando pasa algo (al revés de una consulta) | Confirmar pagos, pedidos o mensajes nuevos |
| SOAP | Formato antiguo y estricto basado en XML | Sistemas bancarios y gubernamentales |

## Dónde se usan en una página web típica {#usos}

Tabla: APIs comunes en un sitio web.
| Función | Ejemplo de API |
|---|---|
| Cobrar | Wompi, Bold, PayU |
| Calcular envíos | Transportadoras y agregadores logísticos |
| Mostrar mapas | Google Maps |
| Iniciar sesión | Google, Facebook |
| Enviar correos | Servicios de correo transaccional |
| Facturar | Proveedores de facturación electrónica DIAN |

## ¿Para qué sirve una API en tu negocio? {#negocio}

- **Ahorrar trabajo manual:** el pedido de la web llega solo al inventario y a la facturación.
- **Vender más:** cobros en línea, envíos calculados al instante y WhatsApp conectado.
- **Crecer sin rehacer:** conectas nuevas herramientas sin cambiar todo el sistema.
- **Usar IA con tus datos:** los agentes de IA consultan tus sistemas a través de APIs (y de [servidores MCP](/blog/que-es-un-servidor-mcp)).

:::quiz
? En la analogía del restaurante, ¿qué papel cumple la API?
- La cocina
- *El mesero que lleva el pedido y trae la respuesta
- El cliente
= La API es el intermediario: recibe la solicitud, la lleva al servidor y devuelve la respuesta.
? ¿Por qué una tienda en línea usa la API de una pasarela de pagos?
- Para guardar las tarjetas de sus clientes
- *Para autorizar el cobro sin manejar los datos de la tarjeta
- Para mostrar los productos
= La pasarela procesa el pago de forma segura; la tienda solo recibe la confirmación.
? ¿Qué tipo de API te avisa cuando ocurre algo, como un pago aprobado?
- REST
- *Webhook
- SOAP
= Un webhook envía la información a tu sistema apenas ocurre el evento, sin que tengas que preguntar.
:::

## ¿Cómo te ayuda K&T Code? {#k-t-code}

Conectamos tu página web o tienda con pasarelas de pago, WhatsApp, inventario, CRM y facturación electrónica mediante APIs, y desarrollamos APIs propias cuando tu negocio las necesita.

Tabla: Servicios relacionados y precios de partida en tu moneda.
| Necesitas | Servicio | Desde |
|---|---|---|
| Integrar tu web con tu ERP, CRM o facturación | [Software a medida](/servicios/software-a-medida) | {{cop:4500000}} |
| Una tienda con pagos y envíos conectados | [Tienda virtual](/servicios/tiendas-virtuales) | {{cop:1300000}} |
| Un sitio rápido con formularios y WhatsApp integrados | [Desarrollo web a medida](/servicios/desarrollo-web-a-medida) | {{cop:2500000}} |

Mira todos los [planes y precios](/precios) o la [guía de precios de software a medida](/precios/precio-software-a-medida).

## Conclusión {#conclusion}

Una API es el puente que hace que tus sistemas trabajen juntos. Si hoy copias datos a mano entre tu web, WhatsApp y tu facturación, una integración puede ahorrarte horas cada semana. Lee [cómo integrar WhatsApp con CRM, inventario y facturación](/blog/integrar-whatsapp-crm-inventario-facturacion) o [escríbenos](/#contacto).
`,
  faq: [
    { q: "¿Qué es una API en palabras simples?", a: "Es el intermediario que permite que dos programas intercambien información de forma segura, como un mesero que lleva tu pedido a la cocina y te trae el plato." },
    { q: "¿Qué significa API?", a: "Son las siglas en inglés de Application Programming Interface, en español interfaz de programación de aplicaciones." },
    { q: "¿Qué es una API REST?", a: "Es el tipo de API más común en la web: cada recurso tiene su propia dirección y se consulta con métodos como GET (leer) o POST (crear)." },
    { q: "¿Qué diferencia hay entre REST y GraphQL?", a: "En REST cada recurso tiene su dirección; en GraphQL hay una sola dirección y pides exactamente los datos que necesitas en una consulta." },
    { q: "¿Dónde se usan las APIs en una página web?", a: "En pagos (Wompi, PayU), cálculo de envíos, mapas, inicio de sesión con Google o Facebook, envío de correos y sincronización con bases de datos." },
  ],
  sources: [
    { title: "MDN Web Docs: Introducción a las APIs web", url: "https://developer.mozilla.org/es/docs/Learn/JavaScript/Client-side_web_APIs/Introduction" },
    { title: "GraphQL: documentación oficial", url: "https://graphql.org/learn/" },
  ],
};

export default post;
