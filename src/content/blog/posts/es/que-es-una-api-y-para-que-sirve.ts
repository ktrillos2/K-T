import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Una API (interfaz de programación de aplicaciones) es la forma en que dos programas se comunican de manera segura.",
    "Funciona como un mesero: tú haces el pedido (solicitud), él lo lleva a la cocina (servidor) y te trae el plato (respuesta).",
    "En una web se usa para cobrar con pasarelas, mostrar mapas, enviar correos y WhatsApp, calcular envíos o iniciar sesión con Google.",
  ],
  md: `
Usas APIs todos los días sin saberlo: al comprar un tiquete, pagar en una tienda en línea o revisar el clima en el celular. Aquí te lo explicamos sin tecnicismos.

## Qué es una API en palabras simples {#que-es}

API viene del inglés *Application Programming Interface*. Imagina un restaurante: no entras a la cocina, le pides al mesero. Él lleva tu pedido, la cocina lo prepara y el mesero te trae el plato. La API es ese mesero entre dos programas.

## 3 ejemplos cotidianos {#ejemplos}

- **Pagos:** tu tienda no guarda los datos de la tarjeta. Le pide a la pasarela (Wompi, PayU) que autorice el cobro mediante una API segura.
- **Mapas:** tu web muestra la ubicación de tu sede usando la API de Google Maps, sin dibujar un mapa desde cero.
- **Mensajes:** los correos de confirmación y los mensajes de WhatsApp se envían con APIs de servicios especializados.

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
:::

Conectamos tu web con cualquier sistema o ERP. Conoce nuestro servicio de [software a medida](/servicios/software-a-medida) o lee [cómo integrar WhatsApp con CRM, inventario y facturación](/blog/integrar-whatsapp-crm-inventario-facturacion).
`,
  faq: [
    { q: "¿Qué es una API en palabras simples?", a: "Es el intermediario que permite que dos programas intercambien información de forma segura, como un mesero que lleva tu pedido a la cocina y te trae el plato." },
    { q: "¿Dónde se usan las APIs en una página web?", a: "En pagos (Wompi, PayU), cálculo de envíos, mapas, inicio de sesión con Google o Facebook, envío de correos y sincronización con bases de datos." },
  ],
};

export default post;
