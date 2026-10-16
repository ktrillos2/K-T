import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "ROI (%) = ((beneficio neto total − inversión total) ÷ inversión total) × 100.",
    "El beneficio neto suma dos cosas: el ahorro en horas y costos operativos, y los ingresos nuevos que llegan por responder más rápido o atender 24/7.",
    "En pymes colombianas, un software a medida bien planteado suele recuperar la inversión entre 2 y 8 meses, según cuánto trabajo manual reemplace.",
    "En el caso de una distribuidora con 16 horas diarias de trabajo manual, la inversión de $9.500.000 se recuperó en menos de dos meses.",
  ],
  md: `
Antes de invertir en un software a medida o en una automatización con inteligencia artificial, la pregunta correcta no es *cuánto cuesta*, sino **en cuánto tiempo se paga**. La buena noticia: se puede calcular con datos que ya tienes.

## La fórmula del ROI {#formula}

El retorno de la inversión compara lo que ganas con lo que pagas:

> ROI (%) = ((beneficio neto total − inversión total) ÷ inversión total) × 100

El **beneficio neto** tiene dos fuentes:

- **Ahorro operativo:** horas de trabajo manual que desaparecen (cotizar, validar inventario, copiar datos entre WhatsApp y Excel) multiplicadas por lo que cuesta cada hora de tu equipo.
- **Ingresos adicionales:** ventas que hoy se pierden por responder tarde, por no atender de noche o porque un cliente se cansó de esperar.

## El modelo de cálculo en 4 pasos {#modelo}

1. **Cuantifica tu línea base:** horas de tareas manuales al mes × costo por hora del personal.
2. **Estima el costo total de propiedad:** desarrollo inicial + infraestructura + servicios externos (mensajería, modelos de IA).
3. **Proyecta ingresos y eficiencias:** ventas fuera de horario, menos pedidos cancelados, menos errores.
4. **Calcula el ROI anual y el periodo de recuperación:** el mes exacto en que el ahorro acumulado supera la inversión.

## Calcula el tuyo {#calculadora}

Pon tus propios números. El resultado se muestra en la moneda del país que tengas seleccionado.

::widget roi-calculator

## Caso práctico: una distribuidora en Colombia {#caso}

### Datos del escenario

- Equipo de 3 asesores comerciales y 1 auxiliar de bodega.
- Cotizar y validar stock a mano les toma 4 horas al día por persona: **16 horas diarias, unas 352 horas al mes**.
- Costo promedio por hora (con prestaciones): **$15.000**.
- Costo operativo manual mensual: 352 × $15.000 = **$5.280.000**.

### La solución a medida

- Inversión única en desarrollo: **$9.500.000**.
- Costo mensual recurrente (servidores, mensajería y servicios de IA): **$250.000**.
- Se automatiza el 75% de las tareas manuales: ahorro de **$3.960.000 al mes**.
- El asistente atiende de noche y captura ventas con un margen neto de **$2.400.000 al mes**.

### Resultados

Tabla: Resultados financieros del caso (valores en pesos colombianos).
| Indicador | Cálculo | Resultado |
|---|---|---|
| Beneficio neto mensual | $3.960.000 + $2.400.000 − $250.000 | $6.110.000 |
| Periodo de recuperación | $9.500.000 ÷ $6.110.000 | 1,6 meses |
| Beneficio neto del primer año | (12 × $6.110.000) − $9.500.000 | $63.820.000 |
| ROI del primer año | $63.820.000 ÷ $9.500.000 | ≈ 672% |

:::info ¿Por qué tan rápido?
Este caso tenía mucho trabajo manual repetitivo y ventas perdidas de noche. Cuando la operación es más pequeña o el proceso ya está parcialmente automatizado, lo normal es recuperar la inversión entre 3 y 8 meses. Por eso conviene medir la línea base antes de cotizar.
:::

## Errores comunes al calcular el ROI {#errores}

- **Olvidar los costos recurrentes:** servidores, mensajería oficial de WhatsApp y consumo de modelos de IA.
- **Contar solo el ahorro de horas:** las ventas que hoy se pierden suelen pesar más.
- **Suponer 100% de automatización:** siempre queda trabajo humano; trabaja con 60–80%.
- **No medir después:** define desde el inicio qué indicador vas a revisar cada mes.

¿Quieres el cálculo para tu empresa? Cuéntanos tu proceso en el [formulario de contacto](#contacto) o revisa el servicio de [software a medida](/servicios/software-a-medida).
`,
  faq: [
    { q: "¿Cuánto tarda en pagarse un software a medida?", a: "Depende del trabajo manual que reemplace y de las ventas que recupere. En pymes colombianas lo habitual es entre 2 y 8 meses; en procesos muy manuales puede ser menos." },
    { q: "¿Qué datos necesito para calcular el ROI?", a: "Las horas al mes que dedica tu equipo a la tarea, el costo por hora, las ventas que se pierden hoy, el costo de desarrollo y los costos mensuales de operación." },
  ],
  sources: [
    { title: "K&T Code: precios de software a medida", url: "https://www.kytcode.lat/precios" },
    { title: "Harvard Business Review: artículos sobre retorno de inversión en IA", url: "https://hbr.org/topic/subject/ai-and-machine-learning" },
  ],
};

export default post;
