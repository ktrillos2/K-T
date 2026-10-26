import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "El remarketing (o retargeting) es volver a mostrar tus anuncios a personas que ya visitaron tu web, vieron un producto o te escribieron, pero no compraron.",
    "Funciona con el píxel de Meta o la etiqueta de Google: marcan a los visitantes para crear públicos y mostrarles anuncios después en Facebook, Instagram o Google.",
    "Suele ser de las campañas más rentables porque le habla a gente que ya te conoce.",
    "En K&T Code configuramos y manejamos tu remarketing dentro de la administración de Ads, desde {{cop:450000,usd:200}} al mes.",
  ],
  md: `
¿Te ha pasado que miras unos zapatos en una tienda en línea y luego te aparecen en Instagram? Eso es **remarketing**. Aquí te explicamos qué es, cómo funciona y cómo usarlo en tu negocio sin molestar a tus clientes.

## Qué es el remarketing {#que-es}

El remarketing es mostrar anuncios **a personas que ya interactuaron con tu negocio**: visitaron tu web, agregaron algo al carrito, vieron un video o te escribieron por WhatsApp o Instagram. Como ya te conocen, es más probable que regresen y compren.

## Cómo funciona, paso a paso {#como-funciona}

1. **Instalas el píxel:** el [píxel de Meta](https://www.facebook.com/business/help/742478679120153) o la etiqueta de Google en tu web.
2. **Se crean públicos:** por ejemplo, "visitó la página de precios" o "agregó al carrito y no pagó".
3. **Muestras anuncios a esos públicos** en Facebook, Instagram o Google, con un mensaje pensado para ellos.
4. **Mides y ajustas:** cuántos regresaron y compraron, y cuánto costó cada venta.

## Tipos de remarketing {#tipos}

Tabla: Públicos de remarketing más usados.
| Público | Ejemplo de anuncio |
|---|---|
| Visitó tu web | "¿Sigues buscando tu página web? Cotiza en 2 minutos" |
| Vio un producto | El mismo producto con su precio y botón de compra |
| Abandonó el carrito | Recordatorio con envío o forma de pago |
| Te escribió y no compró | Testimonio de un cliente o una pregunta frecuente resuelta |
| Interactuó en Instagram | Tu oferta principal con un llamado claro |

## Buenas prácticas {#buenas-practicas}

- **Limita la frecuencia:** ver el mismo anuncio diez veces al día cansa.
- **Cambia el mensaje según la etapa:** no le muestres "conócenos" a quien ya casi compra.
- **Excluye a quien ya compró** (o muéstrale otro producto).
- **Respeta la privacidad:** informa en tu política que usas cookies y píxeles. Google explica sus reglas en su [política de publicidad personalizada](https://support.google.com/adspolicy/answer/143465).

:::quiz
? ¿A quién se le muestran los anuncios de remarketing?
- A cualquier persona de tu ciudad
- *A personas que ya visitaron tu web o interactuaron con tu negocio
- Solo a tus clientes actuales
= El remarketing le habla a quien ya te conoce pero todavía no compró.
? ¿Qué se necesita para hacer remarketing en Facebook e Instagram?
- Solo una página de Facebook
- *El píxel de Meta instalado en tu web
- Un dominio .com
= El píxel registra las visitas y permite crear los públicos.
? ¿Qué es una buena práctica?
- Mostrar el mismo anuncio todo el día
- *Excluir a quienes ya compraron
= Así no gastas en quien ya es tu cliente y no lo molestas.
:::

## ¿Cómo te ayuda K&T Code? {#k-t-code}

Instalamos el píxel, creamos tus públicos de remarketing y manejamos las campañas cada mes según tu objetivo. Si tu web no está lista para medir, también la construimos.

Tabla: Servicios relacionados y precios de partida en tu moneda.
| Necesitas | Servicio | Desde |
|---|---|---|
| Remarketing y campañas manejadas cada mes | [Administración de Ads](/servicios/administracion-de-ads) | {{cop:450000,usd:200}} / mes |
| Una página rápida lista para medir conversiones | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| Una tienda con catálogo para anuncios de productos | [Tienda virtual](/servicios/tiendas-virtuales) | {{cop:1300000}} |

Lee también [cuánto cuesta administrar Facebook Ads](/blog/cuanto-cuesta-administrar-facebook-ads-colombia) o mira todos los [precios](/precios).

## Conclusión {#conclusion}

El remarketing recupera clientes que ya estuvieron cerca de comprarte. Con el píxel bien instalado, públicos claros y mensajes por etapa, suele ser de lo más rentable de tu publicidad. Si quieres que lo manejemos por ti, [escríbenos](/#contacto).
`,
  faq: [
    { q: "¿Qué es el remarketing en palabras simples?", a: "Es volver a mostrar tus anuncios a personas que ya visitaron tu web o interactuaron con tu negocio, para que regresen y compren." },
    { q: "¿Remarketing y retargeting son lo mismo?", a: "En la práctica sí. Los dos nombres se usan para mostrar anuncios a quienes ya interactuaron contigo." },
    { q: "¿Qué necesito para hacer remarketing?", a: "El píxel de Meta o la etiqueta de Google instalados en tu web, y una cuenta publicitaria activa." },
    { q: "¿Cuánto cuesta que manejen mi remarketing?", a: "En K&T Code va dentro de la administración de Ads, desde $450.000 COP al mes (200 USD en otros países), sin contar la inversión en pauta." },
  ],
  sources: [
    { title: "Meta Business: acerca del píxel de Meta", url: "https://www.facebook.com/business/help/742478679120153" },
    { title: "Google Ads: política de publicidad personalizada", url: "https://support.google.com/adspolicy/answer/143465" },
  ],
};

export default post;
