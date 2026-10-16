import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Cinco pasos para lanzar una tienda online en Colombia: catálogo, pasarelas de pago, envíos, un checkout rápido y tráfico.",
    "Para conectar pasarelas como Wompi o Mercado Pago necesitas RUT actualizado, certificación bancaria y documento de identidad.",
    "Los envíos se pueden automatizar con transportadoras como Coordinadora, Servientrega, Envía o 99minutos.",
    "Una tienda a la medida con K&T Code parte de $1.300.000 COP.",
  ],
  md: `
Vender en línea en Colombia es más accesible que nunca, pero una tienda que vende de verdad requiere más que subir productos. Esta guía te lleva paso a paso.

## Los 5 pasos para lanzar tu tienda {#pasos}

1. **Estructura del catálogo:** categorías lógicas, fotos en buena resolución y formatos ligeros, y descripciones claras con medidas, materiales y garantías.
2. **Pasarelas de pago:** conecta Wompi, Bold o PayU para aceptar PSE, Nequi y tarjetas. Compáralas en [Wompi vs. Mercado Pago vs. PayU](/blog/wompi-vs-mercado-pago-vs-payu-colombia).
3. **Zonas y costos de envío:** define tarifas locales y nacionales con transportadoras oficiales.
4. **Velocidad y checkout corto:** cada paso de más en el proceso de compra cuesta ventas.
5. **Tráfico:** anuncios segmentados en Instagram y Facebook, SEO y WhatsApp.

## Documentos para vender en línea {#documentos}

- RUT actualizado con la actividad comercial correspondiente.
- Certificación bancaria a nombre del titular.
- Documento de identidad (o los documentos de la empresa si eres persona jurídica).
- Facturación electrónica habilitada ante la DIAN.

:::checklist id="tienda-online" title="Checklist para lanzar tu tienda"
- Organicé el catálogo en categorías claras
- Tengo fotos y descripciones de cada producto
- Tengo RUT y certificación bancaria
- Elegí y conecté la pasarela de pagos
- Definí tarifas de envío local y nacional
- Probé una compra completa desde el celular
- Tengo política de cambios, devoluciones y privacidad
- Configuré la factura electrónica
:::

## Cuánto cuesta {#costo}

::widget price-calculator

Mira el desglose completo en [cuánto cuesta una tienda virtual en Colombia](/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026) o conoce nuestro servicio de [tiendas virtuales](/servicios/tiendas-virtuales).
`,
  faq: [
    { q: "¿Qué documentos necesito para vender en línea con pasarelas de pago en Colombia?", a: "RUT actualizado con la actividad comercial, certificación bancaria a nombre del titular y documento de identidad. Aplica para personas naturales y jurídicas." },
    { q: "¿Cómo se gestionan los envíos en Colombia?", a: "Puedes integrar calculadoras de flete o plataformas logísticas que generan las guías automáticamente con transportadoras como Coordinadora, Servientrega, Envía o 99minutos." },
  ],
};

export default post;
