import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "En Cúcuta, el comercio fronterizo, la manufactura (calzado, marroquinería y confección) y la salud impulsan la demanda de software a medida.",
    "Evalúa a un proveedor por cuatro criterios: tecnología moderna y rápida, código propio sin plantillas, capacidad de integración (DIAN, pagos, WhatsApp) y presencia y soporte local.",
    "Hay cuatro tipos de proveedor: estudios de desarrollo a la medida, casas de software contable, consultoras de TI e independientes.",
    "Precios de referencia en K&T Code: landing desde $450.000, tienda desde $1.300.000, sitio corporativo desde $2.500.000 y software desde $4.500.000.",
  ],
  md: `
Cúcuta y el área metropolitana viven un momento de digitalización acelerada. Muchas empresas ya superaron el Excel y los programas empaquetados y buscan **software hecho para su forma de trabajar**. Esta guía te ayuda a elegir bien.

## Por qué crece el software a medida en Norte de Santander {#contexto}

- **Comercio fronterizo:** mayoristas que necesitan inventario, cotizaciones en pesos o dólares y despachos.
- **Manufactura:** fábricas de calzado, marroquinería y confección (La Cero, El Callejón, la zona industrial) que requieren costo por lote, materiales y tiempos de producción.
- **Salud:** clínicas, odontologías y laboratorios con historias clínicas seguras, agenda en línea y facturación electrónica.

El software empaquetado obliga a cambiar los procesos, cobra por usuario y rara vez trae lo que tu negocio necesita.

## Criterios para evaluar a una empresa de software {#criterios}

### A. Tecnología moderna y rendimiento

Pide aplicaciones web rápidas, que funcionen en celular y computador, alojadas en infraestructura de nube confiable. Desconfía de sistemas de escritorio que solo funcionan en un equipo o de sitios armados con decenas de plugins.

### B. Código propio y cero plantillas

El contrato debe decir que **el código fuente y la propiedad intelectual son 100% tuyos**, sin licencias cautivas.

### C. Capacidad de integración

- Facturación electrónica y nómina ante la DIAN.
- Pasarelas como Wompi, Bold, Mercado Pago o Stripe.
- API oficial de WhatsApp Business.
- Inventario, logística y el CRM que ya usas.

### D. Presencia local y soporte

Reuniones presenciales para levantar requerimientos y un canal claro de soporte después del lanzamiento.

## Tipos de proveedor en Cúcuta {#tipos}

Tabla: Comparativa de opciones.
| Criterio | Estudio a la medida (como K&T Code) | Software contable empaquetado | Freelance |
|---|---|---|---|
| Adaptación al negocio | Total, a tu flujo | Rígida: tú te adaptas | Variable |
| Integración con WhatsApp y APIs | Nativa | Limitada o con costo extra | Posible, con riesgo de soporte |
| Propiedad del código | 100% del cliente | Alquiler permanente | Suele quedar en el desarrollador |
| Reuniones en Cúcuta | Sí | Ventas o teléfono | Ocasional |
| Garantía y soporte | Contrato y entregas por etapas | Tickets estándar | Informal |

Las **consultoras de TI** suelen enfocarse en redes, cableado, cámaras y licencias, y subcontratan el desarrollo web. Los **freelancers** son una buena opción para proyectos pequeños, con el riesgo de no tener respaldo de un equipo.

## Proyectos típicos en la región {#proyectos}

- **Producción y pedidos para calzado y confección:** inventario de cuero, suela y tela, tareas de planta, costo real por unidad y remisiones automáticas.
- **Portales B2B para distribuidores:** precios por cliente, stock por bodega, órdenes de compra y facturas en PDF.
- **Agenda y gestión clínica:** citas en línea, recordatorios por WhatsApp e historias clínicas con respaldo en la nube.
- **Paneles con WhatsApp centralizado:** todos los mensajes en un tablero para varios asesores, con seguimiento de cotizaciones.

## Precios de referencia (2026) {#precios}

Tabla: Precios de partida en K&T Code.
| Solución | Desde | Entrega |
|---|---|---|
| Landing page | $450.000 | 7 a 12 días |
| Sitio corporativo | $2.500.000 | 15 a 25 días |
| Tienda virtual | $1.300.000 | 25 a 40 días |
| Software a medida | $4.500.000 | Según alcance |

:::checklist id="elegir-proveedor-cucuta" title="Antes de firmar con un proveedor"
- Vi proyectos suyos funcionando en producción
- El contrato dice que el código es mío
- Hay entregas por etapas con fechas
- Puede integrar DIAN, pagos y WhatsApp
- Hay un canal de soporte después del lanzamiento
- Puedo reunirme en persona si lo necesito
:::

Somos de Cúcuta y trabajamos con empresas de toda Colombia. Mira nuestros [casos de estudio](/proyectos) o el servicio de [software a medida](/servicios/software-a-medida).
`,
  faq: [
    { q: "¿Por qué elegir una empresa local en Cúcuta y no una de Bogotá o Medellín?", a: "Porque puedes tener diagnóstico presencial y alguien que conoce el contexto de Norte de Santander, con el mismo nivel técnico que una empresa de cualquier ciudad." },
    { q: "¿El código y la base de datos quedan a nuestro nombre?", a: "En K&T Code sí: al aprobar cada etapa entregamos el repositorio, los accesos a la infraestructura y la documentación, sin mantenimiento obligatorio." },
    { q: "¿Hacen reuniones presenciales?", a: "Sí, en Cúcuta, Los Patios, Villa del Rosario y el área metropolitana, además de seguimiento virtual semanal." },
  ],
  sources: [{ title: "K&T Code: precios", url: "https://www.kytcode.lat/precios" }],
};

export default post;
