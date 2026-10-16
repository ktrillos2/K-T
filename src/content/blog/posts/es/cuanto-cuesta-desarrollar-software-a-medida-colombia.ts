import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Un software a medida en Colombia parte de $4.500.000 COP para un panel interno o un MVP, y puede superar $45.000.000 COP para una plataforma SaaS completa.",
    "El presupuesto se compone de cuatro fases: diseño y arquitectura, interfaz, servidor y base de datos, y calidad y publicación.",
    "Lo que más mueve el precio: la complejidad de la lógica de negocio, las integraciones, los roles y la seguridad.",
  ],
  md: `
Un software a medida te permite automatizar tus operaciones críticas, dejar de pagar licencias mensuales y ser dueño de tus datos y de tu código. Pero ¿cuánto cuesta? Aquí los rangos reales y cómo se calcula el presupuesto.

## Rangos de precio según el tipo de software {#rangos}

Tabla: Rangos de referencia en Colombia (2026).
| Tipo de proyecto | Rango en COP | Rango en USD | Tiempo estimado |
|---|---|---|---|
| Panel administrativo o MVP interno | $4.500.000 – $9.000.000 | $1.200 – $2.300 | 3 a 5 semanas |
| Portal B2B o sistema para clientes | $9.000.000 – $18.000.000 | $2.300 – $4.500 | 6 a 10 semanas |
| Plataforma SaaS completa (varias empresas) | $18.000.000 – $45.000.000+ | $4.500 – $11.000+ | 12 a 20 semanas |

Estos valores son de referencia. Puedes ver nuestros [planes de software a medida](/precios/precio-software-a-medida).

## Las fases que componen el presupuesto {#fases}

1. **Arquitectura y diseño:** flujos de usuario, diseño de pantallas y validación antes de programar.
2. **Interfaz:** todo lo que el usuario ve y toca, rápido y adaptado a cualquier pantalla.
3. **Servidor y base de datos:** modelo de datos, autenticación segura, roles y permisos.
4. **Calidad y publicación:** pruebas de carga y de seguridad, y publicación continua.

## Qué determina el costo {#factores}

- **Complejidad de la lógica de negocio:** cálculos, reglas, aprobaciones.
- **Integraciones:** pasarelas de pago, ERP, facturación electrónica, APIs externas.
- **Modelo de datos:** cuántas entidades y relaciones maneja el sistema.
- **Seguridad y roles:** cuántos tipos de usuario y permisos.
- **Infraestructura:** volumen de usuarios, disponibilidad y respaldo.

:::checklist id="cotizar-software" title="Prepárate para cotizar tu software"
- Sé qué proceso quiero resolver primero
- Tengo claros los tipos de usuario y qué puede hacer cada uno
- Listé los sistemas con los que debe conectarse
- Sé cuántos usuarios lo usarán al inicio
- Tengo ejemplos de reportes o pantallas que necesito
:::

## ¿Se paga solo? {#roi}

Compara el costo con lo que hoy te cuestan las licencias, las horas manuales y los errores. Te lo explicamos en [cómo calcular el ROI de un software a medida](/blog/calcular-roi-automatizacion-software-ia) y en [software a medida vs. SaaS](/blog/software-a-medida-vs-saas-comparativa).

¿Tienes un proyecto en mente? Evaluamos tus requisitos y te enviamos una propuesta con alcance, arquitectura y precio. Conoce el servicio de [software a medida](/servicios/software-a-medida).
`,
  faq: [
    { q: "¿Cuál es el rango de precio de un software a medida en Colombia?", a: "Un producto inicial (panel administrativo, portal interno o MVP) suele estar entre $4.500.000 y $9.000.000 COP. Plataformas empresariales o SaaS completas van desde $18.000.000 COP en adelante, según el alcance." },
    { q: "¿Qué factores determinan el costo?", a: "La complejidad de la lógica de negocio, el número de integraciones, el modelo de datos, los niveles de seguridad y roles, y la infraestructura necesaria." },
    { q: "¿El código queda a nombre de mi empresa?", a: "Sí. En K&T Code entregamos el código fuente completo en un repositorio a nombre de tu empresa." },
  ],
};

export default post;
