import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Una landing page es una sola página con un objetivo: cerrar una venta o captar un contacto. Una tienda virtual es una plataforma con catálogo, carrito, pagos, inventario y envíos.",
    "Elige landing si vendes servicios, tienes uno o dos productos estrella o vas a pautar en Meta o Google. Elige tienda si tienes un catálogo amplio con variantes y quieres vender 24/7.",
    "En K&T Code una landing parte de $450.000 (7 a 12 días) y una tienda virtual de $1.300.000 (25 a 40 días).",
    "El modelo híbrido —tienda principal más landings satélite para campañas— suele dar el mejor resultado.",
  ],
  md: `
Elegir mal sale caro: una tienda compleja para vender un solo servicio confunde al comprador y encarece el proyecto; una landing para cientos de productos se vuelve inmanejable. Aquí está la diferencia, punto por punto.

## Comparativa completa {#comparativa}

Tabla: Landing page frente a tienda virtual.
| Criterio | Landing page | Tienda virtual |
|---|---|---|
| Propósito | Cerrar una venta o captar un contacto calificado | Mostrar, organizar y vender muchos productos sin atención manual |
| Volumen de productos | Una oferta (máx. 2–3 variantes) | De decenas a miles de referencias con tallas o colores |
| Navegación | Una página, sin menú de salida | Buscador, categorías, filtros, ficha, carrito |
| Cierre | Botón de WhatsApp o enlace de pago directo | Carrito, envío y pasarela con varios medios |
| Tráfico ideal | Pauta en Meta, TikTok y Google Ads | SEO, Google Shopping, correo y remarketing |
| Mantenimiento | Bajo: optimizar la oferta | Medio-alto: stock, envíos, devoluciones y pagos |
| Inversión con K&T | Desde $450.000 · 7 a 12 días | Desde $1.300.000 · 25 a 40 días |

## El embudo: cada paso extra cuesta ventas {#embudo}

- **Landing (3–4 pasos):** clic en el anuncio → página enfocada → botón → asesor por WhatsApp o pago en un clic.
- **Tienda (7–9 pasos):** búsqueda → inicio o categoría → listado con filtros → ficha (talla, color) → agregar al carrito → ver carrito → datos, envío y pago.

Cada paso adicional es una oportunidad de abandono. Por eso, para campañas pagas con una sola oferta, la landing suele convertir mucho mejor.

## Cuándo elegir una landing page {#landing}

1. **Servicios profesionales o consultoría:** abogados, médicos, ingenieros, inmobiliarias. Vendes confianza y necesitas el contacto.
2. **Un producto estrella** que vas a pautar en TikTok o Instagram.
3. **Validar una idea** antes de invertir en inventario y en una tienda completa.
4. **Cursos, talleres o eventos** con una sola inscripción.
5. **Venta asesorada por WhatsApp**, muy común en Colombia y Latinoamérica.

## Cuándo elegir una tienda virtual {#tienda}

1. **Más de 5–10 productos físicos** que necesitan categorías y buscador.
2. **Variantes** de talla, color, peso o medida.
3. **Ventas automáticas 24/7** con Wompi, Bold, PSE o tarjetas.
4. **Control de inventario y envíos** con transportadoras como Envía, Coordinadora o Interrapidísimo.
5. **Recompra y venta cruzada:** recomendaciones y cupones.

## El modelo híbrido {#hibrido}

Mantén la **tienda como catálogo maestro** y motor de SEO, y para cada campaña paga envía el tráfico a una **landing satélite** con una sola oferta. Después de la compra, invitas al cliente a conocer el resto del catálogo. Así combinas la conversión de la landing con el alcance de la tienda.

::widget price-calculator

:::quiz
? Vendes un curso con una sola fecha de inicio y vas a pautar en Instagram. ¿Qué te conviene?
- Tienda virtual
- *Landing page
- Las dos desde el inicio
= Una sola oferta con tráfico pago convierte mejor en una página enfocada sin distracciones.
? Tienes 120 productos con tallas y colores. ¿Qué necesitas?
- *Tienda virtual
- Landing page
- Un catálogo en PDF
= Con variantes y volumen necesitas categorías, filtros, carrito e inventario.
:::

Compara también [página web vs. tienda virtual](/blog/pagina-web-vs-tienda-virtual) o revisa los planes en [precios](/precios).
`,
  faq: [
    { q: "¿Puedo empezar con una landing y luego pasar a una tienda?", a: "Sí, y es lo recomendable para negocios nuevos: la landing valida la demanda. Cuando superes 20–30 pedidos por semana y WhatsApp se vuelva inmanejable, conviene la tienda." },
    { q: "¿Una landing page puede recibir pagos?", a: "Sí. Puede tener un botón de pago directo (Wompi, Bold o Stripe) por un valor fijo sin carrito tradicional." },
    { q: "¿Cuál posiciona mejor en Google?", a: "La tienda tiene más potencial orgánico a largo plazo porque genera muchas URLs indexables (categorías y productos). La landing brilla con tráfico pago." },
  ],
  sources: [
    { title: "Baymard Institute: Checkout usability", url: "https://baymard.com/research/checkout-usability" },
    { title: "Shopify: Commerce trends", url: "https://www.shopify.com/enterprise/commerce-trends" },
  ],
};

export default post;
