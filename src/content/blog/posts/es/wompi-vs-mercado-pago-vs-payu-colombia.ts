import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Wompi (Bancolombia) publica 2,65% + $700 + IVA por transacción exitosa en su plan avanzado y abona automáticamente a cuentas Bancolombia.",
    "En su checkout, Mercado Pago publica 3,29% + $800 + IVA si quieres el dinero al momento, 2,99% a 7 días y 2,79% a 14 días.",
    "PayU publica 3,29% + $300 + IVA, con mínimos para PSE, Nequi y efectivo, y es fuerte en tarjetas internacionales.",
    "Para ventas 100% colombianas recomendamos Wompi; para cobros internacionales, complementar con otra pasarela. Tarifas revisadas el 9 de noviembre de 2026.",
  ],
  md: `
La pasarela de pagos afecta directamente tu conversión y tu margen. Una comisión un punto más alta, en miles de ventas, es mucho dinero. Comparamos las tres opciones más usadas en Colombia.

## Cómo pagan los colombianos en línea {#contexto}

PSE y las transferencias móviles (Nequi, Daviplata) están entre los medios favoritos, junto con las tarjetas. Tu pasarela debe ofrecer el botón PSE con verificación automática del pago para no perder ventas.

## Comisiones y métodos de pago {#comparativa}

Tabla: Comparativa de pasarelas en Colombia (tarifas publicadas, revisadas el 9 de noviembre de 2026; no incluyen IVA).
| Pasarela | Comisión estándar | Métodos principales | Abono de fondos |
|---|---|---|---|
| Wompi (Bancolombia) | 2,65% + $700 COP + IVA | Botón Bancolombia, Nequi, PSE, tarjetas | Automático a cuentas Bancolombia |
| Mercado Pago | 3,29% + $800 COP + IVA al momento; 2,99% a 7 días; 2,79% a 14 días | Saldo Mercado Pago, tarjetas, PSE, efectivo | Inmediato en la cuenta; 24 a 48 h a bancos |
| PayU | 3,29% + $300 COP + IVA | Tarjetas internacionales, PSE, efectivo | Retiro por solicitud |

:::warn Las tarifas cambian
Estas cifras salen de las páginas oficiales enlazadas al final y pueden cambiar. Antes de integrar, confírmalas con la pasarela y pregunta por planes para tu volumen.
:::

::cta Cotizar mi tienda con pagos en línea | Hola K&T Code, leí la guía de Wompi, Mercado Pago y PayU y quiero cotizar una tienda con pagos en línea. | tiendas-virtuales

## Retenciones tributarias {#impuestos}

Si eres persona jurídica o responsable de IVA, las pasarelas pueden aplicar retenciones en la fuente (ReteFuente, ReteICA y ReteIVA) sobre los valores cobrados. Consulta con tu contador cómo afectan tu flujo de caja.

## Cuánto te cuesta cada una {#simulacion}

Tabla: Costo estimado sobre una venta de $200.000 COP, con IVA del 19% sobre la comisión.
| Pasarela | Comisión | Con IVA | Recibes aprox. |
|---|---|---|---|
| Wompi | $6.000 | $7.140 | $192.860 |
| Mercado Pago (dinero al momento) | $7.380 | $8.782 | $191.218 |
| Mercado Pago (a 14 días) | $6.380 | $7.592 | $192.408 |
| PayU | $6.880 | $8.187 | $191.813 |

*Antes de retenciones tributarias.*

## Nuestra recomendación {#recomendacion}

- **Comercio 100% colombiano:** Wompi, por su integración con Bancolombia, Nequi y PSE y el abono automático.
- **Pequeños comercios que empiezan:** Bold o Mercado Pago, por lo fácil que es abrir la cuenta.
- **Ventas internacionales:** complementa con una pasarela fuerte en tarjetas extranjeras y cobros en dólares.

Un ejemplo real: [KAILAB](/proyectos/kailab) es una tienda virtual bilingüe que construimos con catálogo por categorías y pagos con Wompi. En una tienda a la medida puedes tener más de una pasarela a la vez y dejar que el cliente elija. Mira [cuánto cuesta una tienda virtual en Colombia](/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026).
`,
  faq: [
    { q: "¿Cuál es la mejor pasarela para tiendas virtuales en Colombia?", a: "Para ventas nacionales, Wompi es de las más convenientes por el botón Bancolombia, Nequi y PSE y su comisión publicada de 2,65% + $700 COP + IVA. Bold y Mercado Pago destacan por lo fácil que es empezar." },
    { q: "¿Cuánto tardan en llegar las ventas a mi cuenta?", a: "Wompi abona automáticamente a cuentas Bancolombia; Mercado Pago deja el dinero disponible en tu cuenta de inmediato y lo transfiere a bancos en 24 a 48 horas." },
  ],
  sources: [
    { title: "Wompi: planes y tarifas", url: "https://wompi.com/es/co/planes-tarifas/" },
    { title: "Mercado Pago: checkout y comisiones", url: "https://www.mercadopago.com.co/herramientas-para-vender/check-out" },
    { title: "PayU: tarifas por país", url: "https://corporate.payu.com/payu-fees-by-country/" },
    { title: "DIAN", url: "https://www.dian.gov.co/" },
  ],
};

export default post;
