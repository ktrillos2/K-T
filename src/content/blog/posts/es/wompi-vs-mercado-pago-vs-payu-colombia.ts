import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Wompi (Bancolombia) cobra aprox. 2,65% + $700 COP por transacción y abona automáticamente a cuentas Bancolombia.",
    "Mercado Pago cobra aprox. 2,99% + $900 COP; el dinero queda en tu cuenta Mercado Pago y pasa a bancos en 24 a 48 horas.",
    "PayU cobra aprox. 3,49% + $900 COP y es fuerte en tarjetas internacionales.",
    "Para ventas 100% colombianas recomendamos Wompi; para cobros internacionales, complementar con otra pasarela. Verifica siempre las tarifas vigentes.",
  ],
  md: `
La pasarela de pagos afecta directamente tu conversión y tu margen. Una comisión un punto más alta, en miles de ventas, es mucho dinero. Comparamos las tres opciones más usadas en Colombia.

## Cómo pagan los colombianos en línea {#contexto}

PSE y las transferencias móviles (Nequi, Daviplata) están entre los medios favoritos, junto con las tarjetas. Tu pasarela debe ofrecer el botón PSE con verificación automática del pago para no perder ventas.

## Comisiones y métodos de pago {#comparativa}

Tabla: Comparativa de pasarelas en Colombia (tarifas de referencia).
| Pasarela | Comisión estándar | Métodos principales | Abono de fondos |
|---|---|---|---|
| Wompi (Bancolombia) | 2,65% + $700 COP | Botón Bancolombia, Nequi, PSE, tarjetas | Automático a cuentas Bancolombia |
| Mercado Pago | 2,99% + $900 COP | Saldo Mercado Pago, tarjetas, PSE, efectivo | Inmediato en la cuenta; 24 a 48 h a bancos |
| PayU | 3,49% + $900 COP | Tarjetas internacionales, PSE, efectivo | Retiro por solicitud |

:::warn Las tarifas cambian
Estas cifras son de referencia. Antes de integrar, revisa las tarifas vigentes en la página oficial de cada pasarela y pregunta por planes para tu volumen.
:::

## Retenciones tributarias {#impuestos}

Si eres persona jurídica o responsable de IVA, las pasarelas pueden aplicar retenciones en la fuente (ReteFuente, ReteICA y ReteIVA) sobre los valores cobrados. Consulta con tu contador cómo afectan tu flujo de caja.

## Cuánto te cuesta cada una {#simulacion}

Tabla: Comisión estimada sobre una venta de $200.000 COP.
| Pasarela | Comisión | Recibes aprox. |
|---|---|---|
| Wompi | $6.000 | $194.000 |
| Mercado Pago | $6.880 | $193.120 |
| PayU | $7.880 | $192.120 |

*Antes de retenciones e impuestos.*

## Nuestra recomendación {#recomendacion}

- **Comercio 100% colombiano:** Wompi, por su integración con Bancolombia, Nequi y PSE y el abono automático.
- **Pequeños comercios que empiezan:** Bold o Mercado Pago, por lo fácil que es abrir la cuenta.
- **Ventas internacionales:** complementa con una pasarela fuerte en tarjetas extranjeras y cobros en dólares.

En una tienda a la medida puedes tener más de una pasarela a la vez y dejar que el cliente elija. Mira [cuánto cuesta una tienda virtual en Colombia](/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026).
`,
  faq: [
    { q: "¿Cuál es la mejor pasarela para tiendas virtuales en Colombia?", a: "Para ventas nacionales, Wompi es de las más convenientes por el botón Bancolombia, Nequi y PSE y su comisión de referencia de 2,65% + $700 COP. Bold y Mercado Pago destacan por lo fácil que es empezar." },
    { q: "¿Cuánto tardan en llegar las ventas a mi cuenta?", a: "Wompi abona automáticamente a cuentas Bancolombia; Mercado Pago deja el dinero disponible en tu cuenta de inmediato y lo transfiere a bancos en 24 a 48 horas." },
  ],
  sources: [
    { title: "Wompi: tarifas", url: "https://wompi.com/es/co/tarifas" },
    { title: "Mercado Pago: costos por cobrar en línea", url: "https://www.mercadopago.com.co/ayuda/costo-cobrar-online_328" },
    { title: "PayU Colombia: tarifas", url: "https://colombia.payu.com/tarifas/" },
    { title: "DIAN", url: "https://www.dian.gov.co/" },
  ],
};

export default post;
