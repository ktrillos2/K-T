import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Un chatbot para agendar citas por WhatsApp muestra horarios libres, reserva en tu calendario, confirma y envía recordatorios sin que nadie del equipo tenga que contestar a mano.",
    "La app gratuita de WhatsApp Business solo da respuestas automáticas: para agendar de verdad necesitas la API oficial (WhatsApp Business Platform) conectada a tu agenda.",
    "Puedes empezar con una herramienta de reservas enlazada desde WhatsApp y una landing (desde {{cop:450000}}); si quieres un bot propio integrado a tu sistema, es software a medida (desde {{cop:4500000}}).",
    "Si agendas citas médicas, trata los datos como sensibles: pide solo lo necesario y usa siempre canales oficiales.",
  ],
  md: `
Un **chatbot para agendar citas** por WhatsApp es de las automatizaciones que más rápido se notan en consultorios, clínicas, centros de estética, talleres y despachos. En las búsquedas de México y Argentina se repiten «chatbot para agendar citas médicas», «bot de WhatsApp para agendar citas», «agendar turnos por WhatsApp» y «app para agendar, confirmar y recordar citas por WhatsApp». Aquí ves cómo funciona, qué opciones hay y cuánto invertir.

## Qué hace un chatbot de citas por WhatsApp {#que-hace}

1. **Saluda y pregunta el servicio** (consulta general, limpieza dental, revisión del auto…).
2. **Muestra horarios libres** leyendo tu calendario en tiempo real.
3. **Reserva** el espacio y bloquea ese horario para que nadie más lo tome.
4. **Confirma** con un mensaje que incluye fecha, hora, dirección y cómo llegar.
5. **Recuerda** la cita antes (por ejemplo, el día anterior) y permite confirmar, cambiar o cancelar.
6. **Pasa a una persona** cuando la pregunta se sale del guion.

:::info ¿Chatbot o agente de IA?
Un chatbot de citas puede ser un flujo de botones (elige servicio, día y hora) o un agente con IA que entiende mensajes libres como «¿tienes algo el jueves en la tarde?». El flujo es más barato y predecible; la IA es más cómoda para el paciente. Lo explicamos en [agentes de IA para empresas](/blog/agentes-ia-empresas-colombia).
:::

## Las 3 formas de agendar por WhatsApp {#opciones}

Tabla: Opciones para agendar citas por WhatsApp.
| Opción | Cómo funciona | Para quién |
|---|---|---|
| App WhatsApp Business + respuestas rápidas | Mensaje de bienvenida automático y una persona agenda a mano | Negocios con pocas citas al día |
| Enlace a una herramienta de reservas | El bot o el mensaje de bienvenida envía un enlace a tu agenda en línea | Quien quiere automatizar sin desarrollo grande |
| Bot con la API oficial conectado a tu calendario | Todo ocurre dentro del chat: horarios, reserva, recordatorios | Clínicas, cadenas y negocios con muchas citas |

La app gratuita de WhatsApp Business permite mensajes de bienvenida, de ausencia y respuestas rápidas, pero **no consulta tu calendario**. Para un bot que reserve por sí solo se usa la **WhatsApp Business Platform** (la API oficial de Meta), directamente o a través de un proveedor.

:::warn Evita los bots no oficiales
Las extensiones que «automatizan» WhatsApp Web o la app normal van contra las condiciones de WhatsApp y pueden terminar con tu número bloqueado. Para un canal del que depende tu agenda, usa la API oficial.
:::

## Cuánto cuesta operar el bot {#costos}

Además del desarrollo, ten en cuenta:

- **Mensajes de WhatsApp:** Meta cobra ciertos mensajes de plantilla (como los recordatorios que envías tú primero) según el país y la categoría. Revisa la tarifa vigente en la página oficial de precios de la plataforma.
- **Calendario o sistema de agenda:** Google Calendar, una herramienta de reservas o tu propio software.
- **IA (opcional):** si el bot entiende texto libre, hay un costo por uso del modelo.
- **Hosting y mantenimiento** del bot y de las integraciones.

Si lo quieres armar con herramientas de automatización, [n8n](/blog/que-es-n8n-para-que-sirve) es una buena base. Tienes la arquitectura completa en [automatizar WhatsApp Business con IA](/blog/automatizar-whatsapp-business-con-ia).

## Datos de salud y privacidad {#privacidad}

Si agendas citas médicas, odontológicas o psicológicas, los datos de salud son **datos sensibles**: en México lo establece la ley de protección de datos personales en posesión de particulares y en Argentina la Ley 25.326. En la práctica:

- Pide por chat solo lo necesario para agendar (nombre, servicio, horario). El historial clínico va en tu sistema, no en WhatsApp.
- Informa tu aviso de privacidad en el primer mensaje.
- Limita quién del equipo ve las conversaciones.

:::checklist id="bot-citas" title="Antes de lanzar tu bot de citas"
- Tengo un número exclusivo para WhatsApp Business
- Uso la API oficial o un proveedor autorizado
- El bot lee mi calendario en tiempo real
- Envía confirmación con dirección y hora
- Manda recordatorio y permite cancelar o reprogramar
- Hay un paso claro para hablar con una persona
- Pido solo los datos necesarios y aviso de privacidad
- Mido cuántas citas se agendan y cuántas se cancelan
:::

## Pon a prueba lo que aprendiste {#quiz}

:::quiz
? ¿La app gratuita de WhatsApp Business agenda citas en tu calendario por sí sola?
- Sí, trae agenda integrada con Google Calendar
- *No, solo da respuestas automáticas; para agendar se necesita la API o una herramienta externa
- Sí, si activas el mensaje de ausencia
= La app ofrece bienvenida, ausencia y respuestas rápidas, pero no consulta ni reserva en tu calendario.
? ¿Qué riesgo tienen los bots no oficiales de WhatsApp?
- Ninguno, son iguales a la API
- *Pueden bloquear tu número por ir contra las condiciones de WhatsApp
- Solo funcionan de noche
= Automatizar la app normal o WhatsApp Web incumple las condiciones del servicio y pone en riesgo el número.
? Si agendas citas médicas, ¿qué datos conviene pedir por chat?
- El historial clínico completo
- *Solo lo necesario para la cita: nombre, servicio y horario
- Fotos de exámenes y documentos
= Los datos de salud son sensibles; por chat pide lo mínimo y guarda lo clínico en tu sistema.
:::

## ¿Cómo te ayuda K&T Code con tu bot de citas? {#k-t-code}

Trabajamos en remoto con negocios de México, Argentina y toda la región. Conectamos WhatsApp con tu agenda y tu web para que las citas lleguen solas.

Tabla: Servicios relacionados y precios de partida en tu moneda.
| Necesitas | Servicio | Desde |
|---|---|---|
| Página con reservas en línea y botón de WhatsApp | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| Sitio con agenda, servicios y sedes | [Desarrollo web a medida](/servicios/desarrollo-web-a-medida) | {{cop:2500000}} |
| Bot de WhatsApp con la API oficial integrado a tu sistema | [Software a medida](/servicios/software-a-medida) | {{cop:4500000}} |
| Llenar la agenda con anuncios | [Administración de Ads](/servicios/administracion-de-ads) | {{cop:450000,usd:200}} / mes |

Mira todo en [precios](/precios) (eliges país y moneda: MXN, ARS y más), la guía de [cuánto cuesta un software a medida](/blog/cuanto-cuesta-desarrollar-software-a-medida-colombia) y nuestra página de [desarrollo web para salud](/industrias/desarrollo-web-salud).

## Conclusión {#conclusion}

Un chatbot para agendar citas por WhatsApp te quita horas de mensajes repetidos y reduce las citas olvidadas con recordatorios automáticos. Si recibes pocas citas, empieza con la app y un enlace de reservas; si tu agenda es el centro del negocio, vale la pena un bot con la API oficial conectado a tu calendario. Si quieres que lo armemos contigo, [escríbenos](/#contacto).
`,
  faq: [
    { q: "¿Cómo hacer un chatbot de WhatsApp para agendar citas?", a: "Se conecta la API oficial de WhatsApp (WhatsApp Business Platform) con tu calendario o sistema de agenda. El bot pregunta el servicio, muestra horarios libres, reserva, confirma y envía recordatorios." },
    { q: "¿Se pueden agendar citas por WhatsApp gratis?", a: "Con la app gratuita de WhatsApp Business puedes enviar un mensaje de bienvenida con un enlace a tu agenda en línea, pero la reserva automática dentro del chat requiere la API oficial, que tiene costos por ciertos mensajes." },
    { q: "¿Cuánto cuesta un chatbot para agendar citas?", a: "Depende del alcance. En K&T Code una landing con reservas en línea parte desde $450.000 COP y un bot propio con la API oficial integrado a tu sistema, como software a medida, desde $4.500.000 COP; en la página de precios los ves en tu moneda." },
    { q: "¿Es seguro agendar citas médicas por WhatsApp?", a: "Sí, si usas la API oficial, pides solo los datos necesarios para la cita, informas tu aviso de privacidad y guardas la información clínica en tu sistema, no en el chat." },
  ],
  sources: [
    { title: "Meta for Developers: WhatsApp Business Platform", url: "https://developers.facebook.com/docs/whatsapp" },
    { title: "Meta for Developers: precios de la WhatsApp Business Platform", url: "https://developers.facebook.com/docs/whatsapp/pricing" },
    { title: "WhatsApp Business: funciones de la app", url: "https://business.whatsapp.com/products/business-app" },
    { title: "Google for Developers: Google Calendar API", url: "https://developers.google.com/calendar/api" },
    { title: "Argentina.gob.ar: Ley 25.326 de protección de los datos personales", url: "https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790" },
    { title: "Cámara de Diputados: Ley Federal de Protección de Datos Personales en Posesión de los Particulares", url: "https://www.diputados.gob.mx/LeyesBiblio/ref/lfpdppp.htm" },
  ],
};

export default post;
