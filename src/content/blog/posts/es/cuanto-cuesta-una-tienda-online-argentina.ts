import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "El costo de una tienda online en Argentina tiene cuatro partes: la plataforma (Tiendanube, Shopify o desarrollo propio), el diseño, las comisiones de cobro y el mantenimiento.",
    "Tiendanube y Shopify son la vía más rápida para empezar con suscripción mensual; una tienda a medida cuesta más al inicio pero no te ata a comisiones ni a plantillas.",
    "Con Mercado Pago, transferencias y cuotas puedes cobrar como se acostumbra en Argentina; revisa siempre la comisión vigente antes de fijar tus precios.",
    "En K&T Code una tienda virtual parte desde {{cop:1300000}} (puedes verlo en pesos argentinos en la página de precios) y trabajamos en remoto desde Colombia.",
  ],
  md: `
Si buscas **cuánto cuesta una tienda online en Argentina**, la respuesta honesta es: depende de la plataforma, de cuánto quieras personalizar y de cuánto vendas. Aquí tienes los costos que debes mirar, cómo se comparan las opciones más usadas y cómo decidir sin sorpresas. No inventamos cifras de mercado: los precios de las suscripciones cambian (y en pesos, más seguido), así que te mostramos **qué comparar** y dónde ver el valor actual.

## Los cuatro costos de una tienda online {#costos}

1. **Plataforma:** suscripción mensual (Tiendanube, Shopify) o desarrollo propio (pago inicial y luego hosting).
2. **Diseño y puesta en marcha:** plantilla personalizada o diseño desde cero, fotos, textos y carga del catálogo.
3. **Cobros:** comisión de la pasarela (por ejemplo Mercado Pago) y, en algunas plataformas, comisión adicional por usar un medio de pago externo.
4. **Operación:** dominio, mantenimiento, envíos, facturación y publicidad.

Tabla: Qué incluye cada opción para montar tu tienda.
| Opción | Pago inicial | Costo recurrente | Control del diseño | Ideal para |
|---|---|---|---|---|
| Tiendanube | Bajo | Suscripción mensual | Medio (plantillas) | Empezar rápido |
| Shopify | Bajo | Suscripción + apps | Medio (temas) | Vender en varios países |
| WooCommerce | Medio | Hosting + plugins | Alto | Quien ya usa WordPress |
| Tienda a medida | Más alto | Hosting y mantenimiento | Total | Marcas que quieren diferenciarse |

:::info Dónde ver el precio de hoy
Los planes y comisiones se actualizan con frecuencia. Mira siempre las páginas oficiales de [Tiendanube](https://www.tiendanube.com/) y [Shopify](https://www.shopify.com/pricing) antes de decidir.
:::

## Tiendanube, Shopify o tienda a medida {#comparar}

- **Tiendanube:** pensada para Latinoamérica, con integraciones locales de pago y envío. Buena para lanzar en pocos días.
- **Shopify:** más apps y herramientas para vender fuera del país; suma costos por apps y puede cobrar comisión extra si usas una pasarela que no sea la suya.
- **A medida (por ejemplo con Next.js):** carga muy rápida, diseño sin límites y sin atarte a comisiones de plataforma. Requiere una inversión inicial mayor.

Si quieres profundizar, lee [Shopify vs. WooCommerce](/blog/shopify-vs-woocommerce-colombia), [WordPress vs. Shopify](/blog/wordpress-vs-shopify-comparativa) y [qué es un e-commerce headless](/blog/que-es-un-ecommerce-headless-ventajas).

## Cobrar en Argentina: Mercado Pago, transferencias y cuotas {#cobros}

En Argentina, el cliente espera pagar con **Mercado Pago, tarjeta en cuotas o transferencia**. Tu tienda debería ofrecer al menos esas tres opciones. Revisa en la [documentación de Mercado Pago](https://www.mercadopago.com.ar/developers/es) las comisiones y plazos de acreditación vigentes, y calcula tu margen **después** de comisiones, no antes. Para comparar pasarelas, mira nuestra guía de [Wompi vs. Mercado Pago vs. PayU](/blog/wompi-vs-mercado-pago-vs-payu-colombia) (está pensada para Colombia, pero el método de comparar comisiones es el mismo).

## Qué más debes tener en cuenta {#detalles}

- **Facturación:** según tu régimen (monotributo o responsable inscripto), consulta cómo facturar tus ventas en [ARCA](https://www.arca.gob.ar/).
- **Envíos:** conecta un correo o logística que cubra tus zonas y deja claros los plazos y costos en la tienda.
- **Pesos y precios:** actualiza tus precios con un proceso claro; una tienda que muestra precios viejos genera reclamos.
- **Confianza:** política de cambios y devoluciones visible, datos de contacto y opiniones de clientes.

:::checklist id="tienda-argentina" title="Antes de lanzar tu tienda online en Argentina"
- Elegí la plataforma según mi presupuesto mensual y mi plan de crecimiento
- Calculé mi margen después de comisiones y cuotas
- Ofrezco Mercado Pago, tarjeta y transferencia
- Definí cómo voy a facturar mis ventas
- Tengo envíos con plazos y costos claros
- Mi política de cambios y devoluciones está visible
- Las fotos y descripciones de cada producto son propias
- Mi tienda carga rápido en el celular
:::

## Pon a prueba lo que aprendiste {#quiz}

:::quiz
? ¿Qué debes calcular antes de fijar el precio de un producto?
- Solo el costo del producto
- *El margen después de comisiones de cobro, envío y plataforma
- El precio de la competencia más barata
= Sin descontar comisiones y costos de operación, puedes vender mucho y ganar poco.
? ¿Cuál es la ventaja principal de una tienda a medida?
- Es siempre más barata al inicio
- *Control total del diseño y de la velocidad, sin depender de plantillas
- No necesita mantenimiento
= La inversión inicial es mayor, pero ganas libertad y propiedad del código.
? ¿Dónde conviene verificar el precio de un plan de Tiendanube o Shopify?
- En un foro de hace dos años
- *En su página oficial de precios
- No hace falta, nunca cambian
= Los planes y comisiones cambian; la fuente oficial es la única confiable.
:::

## ¿Cómo te ayuda K&T Code a montar tu tienda online? {#k-t-code}

Somos un estudio de desarrollo web en Colombia que trabaja en remoto con negocios de toda Latinoamérica y Estados Unidos. Diseñamos cada proyecto desde cero y te entregamos el código a tu nombre.

Tabla: Servicios relacionados y precios de partida en tu moneda.
| Necesitas | Servicio | Desde |
|---|---|---|
| Probar un producto con una página que venda | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| Una tienda con catálogo, carrito y pagos | [Tienda virtual](/servicios/tiendas-virtuales) | {{cop:1300000}} |
| Una tienda conectada a WooCommerce con velocidad extra | [WooCommerce headless](/servicios/woocommerce-headless) | Según alcance |
| Que tu tienda aparezca en Google | [SEO técnico](/servicios/seo-tecnico) | Según alcance |
| Atraer clientes con publicidad en Facebook, Instagram, TikTok y Google | [Administración de Ads](/servicios/administracion-de-ads) | {{cop:450000,usd:200}} / mes |

En [precios](/precios) puedes elegir Argentina y ver cada plan en pesos argentinos. También te sirve la [guía de precio de una tienda virtual](/precios/precio-tienda-virtual-colombia) y [cuánto cuesta una página web en Latinoamérica](/blog/cuanto-cuesta-una-pagina-web-latinoamerica).

## Conclusión {#conclusion}

Una tienda online en Argentina puede arrancar con una suscripción mensual o crecer como proyecto propio. Lo importante es comparar el costo total (plataforma, comisiones y operación) y no solo el precio del plan. Si quieres una tienda rápida, con tu marca y sin ataduras, [escríbenos](/#contacto) y te cotizamos.
`,
  faq: [
    { q: "¿Cuánto cuesta una tienda online en Argentina?", a: "Depende de la plataforma y del nivel de personalización. Suma la plataforma (suscripción o desarrollo), el diseño, las comisiones de cobro y el mantenimiento. En K&T Code una tienda virtual parte desde $1.300.000 COP, equivalente en pesos argentinos en la página de precios." },
    { q: "¿Es mejor Tiendanube, Shopify o una tienda a medida?", a: "Tiendanube y Shopify permiten empezar rápido con suscripción mensual. Una tienda a medida exige más inversión inicial, pero da control total del diseño, mejor velocidad y no depende de comisiones de plataforma." },
    { q: "¿Qué medios de pago debe aceptar mi tienda en Argentina?", a: "Lo habitual es ofrecer Mercado Pago, tarjetas en cuotas y transferencia. Revisa las comisiones vigentes en la documentación oficial de cada pasarela." },
    { q: "¿Una empresa de otro país puede hacer mi tienda online?", a: "Sí. K&T Code trabaja en remoto desde Colombia con negocios de toda Latinoamérica y Estados Unidos, con reuniones por videollamada y entrega del código a tu nombre." },
  ],
  sources: [
    { title: "Shopify: planes y precios", url: "https://www.shopify.com/pricing" },
    { title: "Tiendanube", url: "https://www.tiendanube.com/" },
    { title: "Mercado Pago Argentina: documentación para desarrolladores", url: "https://www.mercadopago.com.ar/developers/es" },
    { title: "ARCA (Agencia de Recaudación y Control Aduanero)", url: "https://www.arca.gob.ar/" },
  ],
};

export default post;
