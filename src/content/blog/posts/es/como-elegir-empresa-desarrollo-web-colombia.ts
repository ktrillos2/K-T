import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Cinco criterios para elegir una empresa de desarrollo web en Colombia: código a la medida, precios transparentes, portafolio verificable, SEO técnico desde el inicio y propiedad del código.",
    "Pide ver proyectos en producción, no capturas. Ábrelos en tu celular y mide su velocidad.",
    "Exige que el código, el dominio y las cuentas queden a nombre de tu empresa.",
  ],
  md: `
Contratar mal a tu proveedor web puede costarte meses de retraso, ventas perdidas y un sitio lento que nadie encuentra. Estos son los criterios para elegir bien.

## 1. Código a la medida vs. plantillas infladas {#codigo}

Una plantilla con muchos plugins sale barata al inicio, pero acumula código que no usas, parches de seguridad y lentitud en el celular. Un desarrollo a la medida se diseña para tu negocio, carga más rápido y tiene menos puntos vulnerables. Lee la comparación en [desarrollo a la medida vs. plantillas](/blog/desarrollo-web-medida-vs-plantillas).

## 2. Precios transparentes {#precios}

Un proveedor serio te da rangos claros y una propuesta con alcance, tiempos y lo que no incluye.

Tabla: Rangos de referencia en Colombia (K&T Code).
| Solución | Desde | Alcance típico |
|---|---|---|
| Landing page | $450.000 COP | Campañas y captación rápida |
| Tienda virtual | $1.300.000 COP | Catálogo, pagos e inventario |
| Sitio corporativo | $2.500.000 COP | Presencia completa de la empresa |
| Software a medida | Desde $4.500.000 COP | Paneles, CRMs y sistemas propios |

## 3. Portafolio real y verificable {#portafolio}

No te quedes con capturas o maquetas. Pide enlaces a proyectos en producción y revisa:

- Que naveguen fluido en celular y computador.
- Que no haya elementos que se muevan o se salgan de la pantalla.
- Que los llamados a la acción (WhatsApp, formularios, compra) sean claros.

Puedes ver los nuestros en [proyectos](/proyectos), con su caso de estudio y el sitio en vivo.

## 4. SEO técnico desde el primer día {#seo}

- Un solo H1 por página y encabezados ordenados.
- Datos estructurados de organización, sitio, productos y migas de pan.
- Imágenes ligeras en formatos modernos.
- Buenas métricas de velocidad (Core Web Vitals) medidas antes del lanzamiento.

## 5. Propiedad del código y soporte {#propiedad}

Asegúrate de recibir el código fuente, el repositorio y el acceso a la infraestructura. Pregunta qué pasa después del lanzamiento: soporte, mantenimiento y tiempos de respuesta.

:::checklist id="elegir-empresa-web" title="Checklist para elegir proveedor"
- Me mostró proyectos reales en producción
- La propuesta detalla alcance, precio y tiempos
- Diseña a la medida, no con plantillas compradas
- Incluye SEO técnico y datos estructurados
- El código y el dominio quedan a mi nombre
- Emite factura electrónica y firma contrato
- Está claro el soporte después del lanzamiento
:::

¿Quieres una propuesta? Cuéntanos tu proyecto en el [formulario de contacto](#contacto) o revisa los [precios](/precios).
`,
  faq: [
    { q: "¿Qué debo pedirle a una empresa de desarrollo web antes de contratar?", a: "Proyectos reales en producción, una propuesta con alcance, precio y tiempos, la garantía de que el código y el dominio quedarán a tu nombre, y las condiciones de soporte después del lanzamiento." },
    { q: "¿Cuánto cuesta una página web profesional en Colombia?", a: "Con K&T Code, una landing page parte de $450.000 COP, una tienda virtual de $1.300.000 COP y un sitio corporativo de $2.500.000 COP." },
  ],
};

export default post;
