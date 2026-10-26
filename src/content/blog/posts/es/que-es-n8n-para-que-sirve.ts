import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "n8n es una herramienta para automatizar tareas conectando aplicaciones (WhatsApp, Gmail, Google Sheets, CRM, bases de datos) con flujos visuales de bloques.",
    "Es gratis si la instalas en tu propio servidor (edición Community); la versión en la nube de n8n es de pago y se cobra según el número de ejecuciones.",
    "Desde 2025 incluye nodos de IA: puedes armar agentes que leen mensajes, consultan datos y responden solos.",
    "Sirve muy bien para prototipos y procesos internos. Cuando el flujo se vuelve crítico para vender o cobrar, conviene pasarlo a software a medida.",
  ],
  md: `
**n8n** (se pronuncia «n-eight-n») es una plataforma para automatizar procesos uniendo aplicaciones que normalmente no se hablan entre sí. En lugar de copiar datos a mano de WhatsApp a Excel o de un formulario a tu CRM, dibujas un flujo con bloques y n8n lo ejecuta solo, todos los días.

En Colombia se volvió tendencia en 2025 y 2026 porque permite crear **agentes de IA** sin escribir mucho código. Estas son las búsquedas más comunes: qué es, para qué sirve y si es gratis o se paga.

## ¿Para qué sirve n8n? {#para-que-sirve}

Cada flujo tiene un **disparador** (algo que pasa) y una serie de **acciones** (lo que haces con eso). Ejemplos reales en pymes:

- **Ventas:** llega un mensaje de WhatsApp → se crea el contacto en el CRM → se avisa al asesor por correo.
- **Facturación:** se aprueba un pago en Wompi → se genera la factura → se envía al cliente.
- **Inventario:** cada mañana se revisa el stock en una hoja de cálculo → si algo baja del mínimo, llega una alerta.
- **Atención con IA:** un agente lee la pregunta del cliente, consulta precios en tu base de datos y responde.
- **Marketing:** cada lead de Meta Ads se guarda en Google Sheets y recibe un mensaje de bienvenida.

## ¿n8n es gratis o se paga? {#es-gratis}

Depende de cómo lo uses:

Tabla: Formas de usar n8n y su costo.
| Opción | Costo de la herramienta | Lo que pagas aparte | Para quién |
|---|---|---|---|
| Community (autoalojado) | Gratis | Servidor (VPS) y quien lo mantenga | Equipos con alguien técnico |
| n8n Cloud | Plan mensual según ejecuciones | Nada de servidor | Quien quiere empezar rápido |
| Hosting con n8n preinstalado | Lo cobra el proveedor del VPS | Mantenimiento y copias | Pymes que quieren control sin instalar |
| Desarrollo a medida | Proyecto único | Hosting | Procesos críticos que no pueden fallar |

:::info La licencia
n8n usa una licencia «fair-code»: puedes usarlo gratis para automatizar tu propia empresa, pero no revenderlo como un servicio. Revisa siempre los precios vigentes en la página oficial, porque los planes de la nube cambian con frecuencia.
:::

## n8n y los agentes de IA {#agentes}

La gran novedad son los **nodos de IA**. Conectas un modelo (OpenAI, Anthropic, Gemini) y le das «herramientas»: leer una hoja de cálculo, consultar una API, enviar un mensaje. El agente decide cuál usar según lo que pide el cliente.

Es la forma más rápida de pasar de un [chatbot de reglas a un agente de IA](/blog/chatbot-vs-agente-ia). Para un prototipo, en una tarde tienes algo funcionando.

## n8n vs. Zapier vs. Make vs. software a medida {#comparativa}

Tabla: Comparativa rápida de herramientas de automatización.
| Criterio | n8n | Zapier | Make | A medida |
|---|---|---|---|---|
| Autoalojable | Sí | No | No | Sí |
| Costo al crecer | Bajo (si lo alojas) | Alto | Medio | Fijo, sin cobro por ejecución |
| Agentes de IA | Sí | Sí | Sí | Sí, sin límites |
| Curva de aprendizaje | Media | Baja | Media | La asume el proveedor |
| Control de datos | Total si es propio | Del proveedor | Del proveedor | Total |

## ¿Cuándo n8n se queda corto? {#limites}

n8n es excelente para empezar, pero tiene límites cuando el proceso crece:

- **Flujos enormes** con decenas de ramas se vuelven difíciles de mantener y de depurar.
- **Errores silenciosos:** si una API cambia, el flujo falla y nadie se entera hasta que un cliente se queja.
- **Interfaz para tu equipo:** n8n no es un panel bonito para que tus asesores trabajen; es el motor de atrás.
- **Seguridad y datos personales:** autoalojarlo bien (copias, actualizaciones, accesos) exige alguien que lo cuide.

:::checklist id="n8n-o-medida" title="¿Te conviene n8n o un desarrollo a medida?"
- Quiero probar una idea de automatización esta semana
- Tengo a alguien técnico que puede mantener un servidor
- Mis flujos tienen menos de 15 pasos
- Si el flujo falla un día, no pierdo ventas
- Necesito un panel propio para que mi equipo trabaje
- El proceso mueve pagos, facturas o datos sensibles
:::

Si marcaste más de las tres primeras, empieza con n8n. Si marcaste las dos últimas, lo más seguro es un [software a medida](/servicios/software-a-medida) que use n8n solo como apoyo, o que lo reemplace.

## Pon a prueba lo que aprendiste {#quiz}

:::quiz
? ¿n8n es gratis?
- No, siempre se paga
- *Sí, la edición Community es gratis si la alojas tú; la nube es de pago
- Solo es gratis para estudiantes
= La edición autoalojada no cobra licencia para uso interno; pagas el servidor y el mantenimiento.
? ¿Qué necesita un flujo de n8n para empezar?
- Un programador a tiempo completo
- *Un disparador, como un mensaje nuevo o un pago aprobado
- Una página web en WordPress
= Todo flujo arranca con un disparador y luego encadena acciones.
? ¿Cuándo conviene pasar de n8n a software a medida?
- Nunca
- Cuando el flujo tiene 3 pasos
- *Cuando el proceso es crítico (pagos, facturas) o tu equipo necesita un panel propio
= Lo crítico necesita monitoreo, pruebas y una interfaz pensada para tu operación.
:::

## ¿Cómo te ayuda K&T Code con la automatización? {#k-t-code}

Diseñamos automatizaciones y agentes de IA a la medida de tu operación: con n8n cuando basta, o con software propio cuando el proceso es crítico.

Tabla: Servicios relacionados y precios de partida en tu moneda.
| Necesitas | Servicio | Desde |
|---|---|---|
| Automatizar procesos, agentes de IA, integraciones | [Software a medida](/servicios/software-a-medida) | {{cop:4500000}} |
| Una web que capture leads y los envíe a tu CRM | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| Vender en línea con pagos y pedidos automáticos | [Tienda virtual](/servicios/tiendas-virtuales) | {{cop:1300000}} |

Mira todos los planes en [precios](/precios) o calcula tu proyecto con la [guía de precios de software a medida](/precios/precio-software-a-medida).

## Conclusión {#conclusion}

n8n es una de las mejores puertas de entrada a la automatización y a los agentes de IA: barato, flexible y rápido de probar. El paso siguiente, cuando el flujo ya vende o cobra, es darle una base sólida. Si quieres saber cuánto costaría automatizar tu proceso, revisa [cuánto cuesta automatizar con IA en Colombia](/blog/cuanto-cuesta-automatizar-procesos-ia-colombia) o [escríbenos](/#contacto).
`,
  faq: [
    { q: "¿Qué es n8n y para qué sirve?", a: "Es una plataforma para automatizar procesos conectando aplicaciones con flujos visuales: por ejemplo, guardar cada mensaje de WhatsApp en tu CRM o crear agentes de IA que responden a clientes." },
    { q: "¿n8n es gratis o se paga?", a: "La edición Community es gratis si la instalas en tu propio servidor para uso interno. La versión en la nube (n8n Cloud) tiene planes mensuales según el número de ejecuciones." },
    { q: "¿n8n sirve para crear agentes de IA?", a: "Sí. Sus nodos de IA conectan modelos como OpenAI, Anthropic o Gemini con herramientas (hojas de cálculo, APIs, mensajería) para que el agente decida qué hacer." },
    { q: "¿Qué es mejor, n8n o Zapier?", a: "Zapier es más fácil para empezar; n8n es más barato al crecer y se puede alojar en tu servidor con control total de los datos." },
  ],
  sources: [
    { title: "n8n: documentación oficial", url: "https://docs.n8n.io/" },
    { title: "n8n: licencia Sustainable Use", url: "https://docs.n8n.io/sustainable-use-license/" },
  ],
};

export default post;
