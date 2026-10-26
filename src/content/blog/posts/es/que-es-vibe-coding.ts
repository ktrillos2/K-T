import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Vibe coding es crear software describiendo lo que quieres en lenguaje natural y dejando que una IA escriba el código, sin revisarlo línea por línea.",
    "El término lo popularizó Andrej Karpathy en 2025; herramientas como Lovable, Google AI Studio, Bolt o v0 lo hicieron masivo.",
    "Es ideal para prototipos, maquetas y herramientas internas pequeñas.",
    "Para la web de una empresa (que debe vender, posicionar en Google y manejar datos de clientes) hace falta revisión profesional: seguridad, velocidad, SEO y mantenimiento.",
  ],
  md: `
**Vibe coding** es programar «por intuición»: le describes a una inteligencia artificial lo que quieres («una página para mi panadería con menú y botón de WhatsApp») y ella genera el código. Tú ves el resultado, pides cambios en lenguaje natural y repites. No lees el código: te guías por cómo se ve y cómo se siente.

El término lo usó Andrej Karpathy (cofundador de OpenAI) a inicios de 2025 y se volvió tendencia. Hoy en Colombia se busca como «qué es vibe coding», «vibe coding en español», «Lovable» o «Google AI Studio».

## ¿Cómo funciona el vibe coding? {#como-funciona}

1. **Describes** la idea en una frase o un párrafo.
2. **La IA genera** la aplicación completa: diseño, textos y código.
3. **Pruebas** el resultado en el navegador.
4. **Pides ajustes** («pon el botón en verde», «agrega un formulario»).
5. **Publicas** con un clic en el hosting de la herramienta.

## Herramientas más usadas {#herramientas}

Tabla: Herramientas populares de vibe coding en 2026.
| Herramienta | Para qué es buena | Ojo con |
|---|---|---|
| Lovable | Apps web completas con base de datos | El código queda atado a su ecosistema si no lo exportas |
| Google AI Studio | Prototipos rápidos con Gemini | Pensado para experimentar, no para producción |
| Bolt | Proyectos web en el navegador | Proyectos grandes se vuelven inestables |
| v0 (Vercel) | Interfaces y componentes React | Genera piezas, no el negocio completo |
| Cursor / Claude Code | Programadores que aceleran su trabajo | Requieren saber revisar código |

## ¿El vibe coding es malo? {#es-malo}

No es malo: es una herramienta. El problema aparece cuando se usa para algo que no está hecho para eso. Estos son los riesgos más comunes en sitios hechos 100% «a vibra»:

- **Seguridad:** claves de API expuestas, formularios sin validación o bases de datos abiertas.
- **Velocidad:** código pesado que carga lento en celulares y baja tus ventas (mira [el costo oculto de una web lenta](/blog/costo-oculto-pagina-web-lenta)).
- **SEO:** páginas que Google no entiende bien, sin datos estructurados ni jerarquía de títulos.
- **Mantenimiento:** cuando algo falla, nadie entiende el código y cada arreglo rompe otra cosa.
- **Dependencia:** si la plataforma sube precios o cierra, tu negocio queda atrapado.

:::warn Vibe coding vs. agentic coding
No es lo mismo. En el **agentic coding**, un programador usa agentes de IA para escribir código más rápido, pero revisa, prueba y decide la arquitectura. Así trabajamos en K&T Code: la IA acelera y la persona responde por la calidad.
:::

## ¿Sirve para la página web de tu empresa? {#empresa}

:::checklist id="vibe-coding-empresa" title="¿Tu proyecto es apto para vibe coding?"
- Es un prototipo para mostrar una idea a socios o inversionistas
- Es una herramienta interna que usan pocas personas
- No maneja pagos ni datos personales de clientes
- No necesito aparecer en Google con esa página
- Si se cae un día, no pierdo ventas
- Puedo rehacerlo desde cero si crece
:::

Si marcaste casi todo, adelante con el vibe coding. Si tu página debe vender, posicionar y crecer, lo mejor es un [desarrollo web a medida](/servicios/desarrollo-web-a-medida), donde la IA sí se usa, pero con revisión profesional.

## Pon a prueba lo que aprendiste {#quiz}

:::quiz
? ¿Qué es el vibe coding?
- Un lenguaje de programación nuevo
- *Crear software describiendo lo que quieres a una IA, sin revisar el código
- Una plantilla de WordPress
= La IA escribe el código y la persona se guía por el resultado visible.
? ¿Cuál es el mayor riesgo de una tienda hecha solo con vibe coding?
- Que tenga colores feos
- *Fallas de seguridad y pagos o datos de clientes expuestos
- Que cargue demasiado rápido
= Sin revisión, es fácil dejar claves o datos expuestos sin darse cuenta.
? ¿En qué se diferencia el agentic coding?
- No usa IA
- *Un programador dirige la IA, revisa y prueba el código
- Solo sirve para videojuegos
= La IA acelera, pero una persona experta decide y responde por la calidad.
:::

## ¿Cómo te ayuda K&T Code? {#k-t-code}

Usamos IA para trabajar más rápido, pero cada proyecto pasa por diseño, revisión de código, pruebas de velocidad y SEO técnico. Si ya tienes un prototipo hecho con vibe coding, también podemos revisarlo y llevarlo a producción.

Tabla: Servicios relacionados y precios de partida en tu moneda.
| Necesitas | Servicio | Desde |
|---|---|---|
| Una página para campañas o lanzamientos | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| La web completa de tu empresa | [Sitio corporativo](/servicios/diseno-web-corporativo) | {{cop:2500000}} |
| Una web a medida, rápida y lista para Google | [Desarrollo web a medida](/servicios/desarrollo-web-a-medida) | {{cop:2500000}} |
| Mejorar el posicionamiento de un sitio existente | [SEO técnico](/servicios/seo-tecnico) | Según alcance |

Compara planes en [precios](/precios) o revisa [cuánto cuesta una página web en Colombia](/precios/precio-pagina-web-colombia).

## Conclusión {#conclusion}

El vibe coding democratizó la creación de software y es perfecto para validar ideas rápido. Para lo que sostiene tu negocio (tu web, tu tienda, tu sistema), la combinación ganadora es IA + criterio profesional. Si quieres comparar opciones, mira las [mejores herramientas de IA para crear páginas web](/blog/mejores-herramientas-ia-crear-paginas-web-2026) o [cuéntanos tu proyecto](/#contacto).
`,
  faq: [
    { q: "¿Qué es vibe coding en español?", a: "Es programar describiendo lo que quieres a una inteligencia artificial y dejando que ella escriba el código, guiándote por el resultado y no por el código." },
    { q: "¿Quién inventó el término vibe coding?", a: "Lo popularizó Andrej Karpathy, cofundador de OpenAI, a inicios de 2025." },
    { q: "¿El vibe coding es malo?", a: "No, pero tiene riesgos de seguridad, velocidad, SEO y mantenimiento cuando se usa para sitios que venden o manejan datos de clientes sin revisión profesional." },
    { q: "¿Puedo hacer la web de mi empresa con Lovable?", a: "Sirve para un prototipo. Para una web que debe vender y posicionar en Google, conviene que un equipo profesional revise seguridad, velocidad y SEO o la desarrolle a medida." },
  ],
  sources: [
    { title: "Andrej Karpathy: publicación original sobre vibe coding (X, 2025)", url: "https://x.com/karpathy/status/1886192184808149383" },
    { title: "Google AI Studio", url: "https://aistudio.google.com/" },
  ],
};

export default post;
