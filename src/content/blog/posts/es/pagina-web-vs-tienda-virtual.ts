import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Una página web corporativa genera confianza y capta contactos; una tienda virtual vende productos las 24 horas con pagos en línea.",
    "Elige página web si vendes servicios o tus precios dependen del alcance; elige tienda si vendes productos con precio fijo y stock.",
    "Con K&T Code: landing desde $450.000, sitio corporativo desde $2.500.000 y tienda virtual desde $1.300.000 COP.",
    "Si la web está bien construida, puedes empezar con un sitio y agregarle la tienda después sin rehacerlo.",
  ],
  md: `
Elegir entre una página web y una tienda virtual depende de tu modelo de negocio, tu presupuesto y cómo compran tus clientes. Esta comparación te ayuda a decidir.

## Comparativa rápida {#comparativa}

Tabla: Página web corporativa frente a tienda virtual.
| Característica | Página web corporativa | Tienda virtual |
|---|---|---|
| Objetivo | Credibilidad, contactos y citas | Vender en línea 24/7 |
| Pagos | No son necesarios (formulario y WhatsApp) | Indispensables (Wompi, Bold, PayU, PSE) |
| Inventario | No aplica | Stock, tallas, variantes y envíos |
| Precio K&T desde | $450.000 (landing) / $2.500.000 COP (corporativo) | $1.300.000 COP |
| Entrega | 7 a 25 días | 25 a 40 días |
| Ideal para | Servicios, consultoría, salud, inmobiliarias | Retail, moda, productos físicos, B2B |

## Cuándo elegir una página web corporativa {#web}

- Vendes servicios o consultorías y el precio depende del alcance.
- Eres una empresa B2B o industrial que busca reuniones y cotizaciones.
- No necesitas inventario en tiempo real, transportadoras ni comisiones por venta.

## Cuándo elegir una tienda virtual {#tienda}

- Vendes productos físicos con precio fijo y stock definido.
- Quieres cobrar y despachar automáticamente con PSE, tarjeta o Nequi.
- Quieres vender a todo el país sin intermediarios.

::widget price-calculator

Lee también [landing page vs. tienda virtual](/blog/landing-page-vs-tienda-virtual) y [cuánto cuesta una página web en Colombia](/blog/cuanto-cuesta-una-pagina-web-en-colombia).
`,
  faq: [
    { q: "¿Puedo empezar con una página web y luego convertirla en tienda?", a: "Sí. Si el sitio está construido con código propio y bien estructurado, se pueden agregar carrito y pasarelas como Wompi o Bold sin rehacerlo desde cero." },
    { q: "¿Qué pasarelas necesito para una tienda virtual en Colombia?", a: "Las más usadas son Wompi, Bold, PayU y Mercado Pago, que procesan PSE, tarjetas, Nequi y Daviplata." },
    { q: "¿Cuál es la diferencia de precio?", a: "Con K&T Code, un sitio corporativo completo parte de $2.500.000 COP y una tienda virtual de $1.300.000 COP; una landing page, de $450.000 COP." },
  ],
  sources: [
    { title: "Wompi: tarifas", url: "https://wompi.com/es/co/tarifas" },
    { title: "Cámara Colombiana de Comercio Electrónico", url: "https://www.ccce.org.co/" },
  ],
};

export default post;
