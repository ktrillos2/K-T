import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Un SaaS (software por suscripción) es barato al inicio, pero su costo crece con cada usuario y nunca deja de pagarse.",
    "Un software a medida exige una inversión inicial, pero a tres años suele costar menos y el código y los datos son tuyos.",
    "Conviene construir cuando pagas más de USD 500 a 1.000 al mes en licencias o cuando necesitas procesos e integraciones que ningún SaaS ofrece.",
  ],
  md: `
Muchas empresas arrancan con plataformas por suscripción para resolver rápido. Pero cuando el equipo crece, las cuotas mensuales por usuario se vuelven pesadas. ¿Cuándo conviene construir tu propio software?

## Comparativa estratégica {#comparativa}

Tabla: SaaS frente a software a medida.
| Criterio | SaaS | Software a medida |
|---|---|---|
| Costo inicial | Bajo: pago mensual inmediato | Inversión de desarrollo |
| Costo a 3 años o más | Alto y crece con cada usuario | Bajo: solo infraestructura y mantenimiento |
| Propiedad del código y los datos | Del proveedor | 100% de tu empresa |
| Personalización | Limitada a lo que ofrece la plataforma | Total, a la medida de tus procesos |
| Integraciones locales | Dependen del proveedor | DIAN, pasarelas colombianas, sistemas propios |

## Cuándo elegir software a medida {#cuando}

- Tus procesos son únicos y las herramientas genéricas no los cubren.
- Pagas miles de dólares al año en licencias pero usas una fracción de sus funciones.
- Necesitas integrarte con sistemas antiguos, facturación electrónica DIAN o pasarelas colombianas.
- Quieres convertir tu plataforma en un producto que también puedas vender.

## Cuándo seguir con un SaaS {#cuando-saas}

- Tu operación es estándar y el SaaS la cubre bien.
- Tienes pocos usuarios y el costo mensual es bajo.
- Necesitas algo funcionando esta semana.

:::checklist id="saas-o-medida" title="¿Es momento de construir tu software?"
- Pago más de USD 500 al mes en licencias
- Uso menos de la mitad de las funciones que pago
- Hago tareas manuales porque el SaaS no las resuelve
- Necesito integrarme con DIAN o pasarelas colombianas
- Quiero ser dueño de mis datos
:::

Para hacer la cuenta con tus números, usa nuestra guía para [calcular el ROI](/blog/calcular-roi-automatizacion-software-ia) y revisa [cuánto cuesta un software a medida](/blog/cuanto-cuesta-desarrollar-software-a-medida-colombia).
`,
  faq: [
    { q: "¿Cuándo es más rentable el software a medida que un SaaS?", a: "Cuando las licencias superan aproximadamente USD 500 a 1.000 al mes, o cuando tu operación necesita personalizaciones que ningún SaaS permite." },
    { q: "¿Quién es el dueño del código en un desarrollo a medida?", a: "En K&T Code el cliente es dueño del 100% del código fuente, la base de datos y la propiedad intelectual, sin licencias ocultas." },
  ],
};

export default post;
