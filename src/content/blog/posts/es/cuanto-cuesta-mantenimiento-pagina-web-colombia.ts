import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Un plan básico de mantenimiento web en Colombia cuesta entre $180.000 y $350.000 COP al mes; uno para tiendas virtuales, entre $450.000 y $850.000 COP.",
    "Un buen mantenimiento incluye copias de seguridad, monitoreo de caídas, renovación de SSL, parches de seguridad y pruebas de formularios y pagos.",
    "No es obligatorio por ley, pero sin mantenimiento el sitio acumula vulnerabilidades, se vuelve lento y pierde posiciones en Google.",
  ],
  md: `
Tu web o tienda en línea necesita supervisión constante: que los formularios funcionen, que el certificado de seguridad se renueve, que la base de datos esté protegida. Estos son los precios y lo que debe incluir un plan profesional.

## Planes de mantenimiento en Colombia {#planes}

Tabla: Rangos de precio de mantenimiento web (2026).
| Nivel | Costo mensual (COP) | Incluye |
|---|---|---|
| Preventivo básico | $180.000 – $350.000 | Copias semanales, monitoreo de caídas 24/7, renovación SSL, parches de seguridad |
| Comercial / e-commerce | $450.000 – $850.000 | Soporte de pasarelas, copias diarias, bloque de 4 horas de cambios, auditoría mensual de velocidad |
| Empresarial dedicado | $1.200.000 – $2.500.000+ | Ingeniero asignado, respuesta en menos de 2 horas, bloque de 12 horas de desarrollo |

## Qué debe incluir un buen mantenimiento {#incluye}

- **Monitoreo de disponibilidad:** alertas inmediatas si el sitio deja de responder.
- **Copias de seguridad automáticas:** de la base de datos y los archivos, guardadas fuera del servidor principal.
- **Velocidad:** compresión de nuevas imágenes y control de scripts de terceros.
- **Pruebas de formularios y pagos:** para no perder ningún contacto ni venta.
- **Actualizaciones de seguridad:** del sistema y sus dependencias.

:::checklist id="mantenimiento-web" title="¿Tu web está bien mantenida?"
- Tengo copias de seguridad recientes fuera del servidor
- Recibo alertas si el sitio se cae
- El certificado SSL se renueva solo
- Probé el formulario de contacto este mes
- Probé un pago de prueba este mes
- Mi sitio carga en menos de 3 segundos en móvil
:::

## ¿Qué pasa si no lo mantienes? {#riesgos}

Vulnerabilidades acumuladas, caídas que nadie detecta, formularios rotos que no avisan y una web cada vez más lenta. Todo eso termina en clientes perdidos y en peor posicionamiento.

En K&T Code el mantenimiento es opcional y se ajusta a lo que necesita tu sitio. Mira nuestro servicio de [mantenimiento web](/servicios/mantenimiento-web).
`,
  faq: [
    { q: "¿Es obligatorio pagar mantenimiento mensual por una página web?", a: "No es obligatorio por ley, pero es clave para la continuidad: sin mantenimiento el sitio acumula vulnerabilidades, sufre caídas sin detectar, se vuelve lento y pierde posiciones en Google." },
    { q: "¿Cuánto cuesta un plan de soporte web en Colombia?", a: "Un plan básico cuesta entre $180.000 y $350.000 COP al mes. Los planes para tiendas virtuales, entre $450.000 y $850.000 COP, y los empresariales desde $1.200.000 COP." },
  ],
};

export default post;
