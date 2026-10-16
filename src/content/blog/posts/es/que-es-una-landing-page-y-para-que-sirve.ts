import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Una landing page es una página con un solo objetivo —un contacto, una llamada o una venta— que recibe tráfico de campañas o correo.",
    "Elimina menús y enlaces de salida: el visitante solo tiene una acción posible.",
    "Su anatomía: encabezado mínimo, propuesta clara arriba, dolor y solución, beneficios, prueba social, oferta, preguntas y un llamado final corto.",
    "En K&T Code una landing a la medida parte de $450.000 con pago único y se entrega en 7 a 12 días.",
  ],
  md: `
Una **landing page** (página de aterrizaje) es una página diseñada para que el visitante haga **una sola cosa**: dejar sus datos, escribir por WhatsApp, agendar o comprar. Recibe el tráfico de tus anuncios o correos y lo convierte en clientes.

Mandar tráfico pago a la página de inicio de un sitio corporativo es caro: el visitante encuentra menús, enlaces y distracciones, y se va.

## Anatomía de una landing de alta conversión {#anatomia}

1. **Encabezado mínimo:** logo y, si acaso, un sello de confianza o el teléfono. Sin menú.
2. **Hero (lo primero que se ve):** titular con el beneficio, subtítulo medible y el botón principal.
3. **Dolor vs. solución:** el problema del cliente y cómo lo resuelves.
4. **Beneficios:** 3 o 4 pilares tangibles.
5. **Prueba social:** testimonios con nombre, cifras, logos y casos.
6. **La oferta:** qué incluye exactamente.
7. **Preguntas frecuentes:** las últimas 4 o 5 objeciones.
8. **Llamado final:** formulario de máximo 3 campos o botón de WhatsApp.

:::tip Botones que convierten
Usa verbos de resultado: «Cotizar mi proyecto», «Agendar diagnóstico gratis», «Comprar con 20% de descuento». Evita «Enviar» o «Clic aquí».
:::

## 5 usos clave {#usos}

- **Campañas en Meta Ads:** una página móvil que repite las palabras del anuncio.
- **Google Ads:** responde búsquedas de alta intención y mejora el nivel de calidad del anuncio.
- **Captación B2B:** diagnóstico gratis, cotización formal o una guía a cambio del contacto.
- **Lanzamientos:** mide registros y preventas antes de invertir en grande.
- **Temporadas:** Black Friday, días sin IVA u ofertas con cuenta regresiva, separadas del sitio principal.

## Landing page vs. sitio corporativo {#vs-corporativo}

Tabla: Diferencias principales.
| Parámetro | Sitio corporativo | Landing page |
|---|---|---|
| Objetivo | Informar y mostrar todos los servicios | Una acción concreta |
| Puntos de salida | Muchos (menús, redes, blog) | Ninguno |
| Audiencia | General | Segmentada desde una campaña |
| Extensión | 5 a 15 páginas | Una página |
| Tráfico ideal | SEO y tráfico directo | Pauta, correo y redes |

## La velocidad es parte de la conversión {#velocidad}

La mayoría de los clics de anuncios en Latinoamérica llegan desde celulares con conexiones móviles. Una landing que tarda en cargar pierde a la gente antes de que vea la oferta: estás pagando clics que nunca ven tu página. Simula cuánto te cuesta:

::widget speed-simulator

## Precios en Colombia (2026) {#precios}

Tabla: Opciones habituales.
| Opción | Precio aproximado | Lo que debes saber |
|---|---|---|
| Plantilla comprada | $150.000 – $350.000 | Genérica, lenta y compartida con miles de sitios |
| Landing a la medida (K&T Code) | Desde $450.000, pago único | Diseño propio, carga rápida, WhatsApp o formulario con aviso inmediato |
| Landing con automatizaciones | $900.000 – $2.500.000 | Pruebas A/B, pasarelas de pago, conexión a CRM |

## Errores que matan la conversión {#errores}

:::checklist id="landing-errores" title="Revisa tu landing"
- No tiene menú que saque al visitante
- El titular repite la promesa del anuncio
- El formulario pide máximo 3 datos
- Se diseñó primero para celular
- Tiene medición instalada (Meta Pixel, Google Tag Manager)
- Carga en menos de 2 segundos en móvil
:::

¿Lista para lanzar la tuya? Mira el servicio de [landing pages](/servicios/landing-pages) o compara [landing vs. tienda virtual](/blog/landing-page-vs-tienda-virtual).
`,
  faq: [
    { q: "¿Puedo tener una landing page sin sitio web?", a: "Sí. Una landing con dominio propio es suficiente para empezar a vender y validar tu oferta." },
    { q: "¿Una landing page sirve para SEO?", a: "Puede posicionar para búsquedas locales específicas si tiene buen contenido, datos estructurados y velocidad, pero su fuerte es el tráfico pago." },
    { q: "¿Cuánto tarda K&T Code en entregar una landing?", a: "Entre 7 y 12 días, incluyendo diseño a la medida, desarrollo, analítica y pruebas en celular." },
  ],
  sources: [
    { title: "Unbounce: Conversion Benchmark Report", url: "https://unbounce.com/conversion-benchmark-report/" },
    { title: "web.dev: Core Web Vitals", url: "https://web.dev/articles/vitals" },
  ],
};

export default post;
