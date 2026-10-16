import type { PostBody } from "../types";

const es: PostBody = {
  tldr: [
    "Una plantilla (WordPress, Wix, Shopify con tema comprado) es más barata y rápida de lanzar, pero compartes diseño con miles de sitios y heredas su peso.",
    "Un desarrollo a la medida cuesta más al inicio, pero carga más rápido, se adapta a tus procesos y el código es 100% tuyo.",
    "A tres años, las licencias, plugins y rediseños de una plantilla suelen acercar o superar el costo de hacerlo a la medida.",
    "Si tu web vende, capta clientes o diferencia tu marca, conviene a la medida; si es una prueba rápida, una plantilla puede bastar.",
  ],
  blocks: [
    { type: "p", text: "Hoy cualquiera puede tener una página en una tarde con un constructor visual. Entonces, ¿por qué pagar por un desarrollo a la medida? La respuesta depende de **qué esperas que haga tu sitio**. Aquí la comparación sin rodeos." },
    { type: "h2", id: "diferencia", text: "La diferencia en una frase" },
    { type: "quote", text: "Una plantilla es un traje de talla única. A la medida es un traje hecho con tus medidas: cuesta más, pero te queda." },
    { type: "h2", id: "comparador", text: "Compáralos punto por punto" },
    { type: "p", text: "Toca cada criterio para ver cómo se comporta cada opción y cuál gana según lo que más te importa." },
    { type: "widget", name: "template-vs-custom" },
    {
      type: "table",
      caption: "Comparación general entre una plantilla y un desarrollo a la medida.",
      head: ["Criterio", "Plantilla", "A la medida"],
      rows: [
        ["Diseño", "Compartido con miles de sitios", "Único, nace de tu marca"],
        ["Velocidad", "Pesada: código para funciones que no usas", "Ligera: solo lo que necesitas"],
        ["SEO", "Limitado por el tema y los plugins", "Estructura pensada desde la raíz"],
        ["Funciones especiales", "Plugins que pueden chocar entre sí", "Programadas para tu proceso"],
        ["Seguridad", "Depende de actualizaciones de terceros", "Superficie mínima de ataque"],
        ["Costo inicial", "Bajo", "Medio o alto"],
        ["Costo a 3 años", "Licencias, plugins y rediseños", "Mantenimiento predecible"],
        ["Propiedad", "Atada a la plataforma o al tema", "El código es tuyo"],
      ],
    },
    { type: "h2", id: "cuando-plantilla", text: "Cuándo una plantilla sí tiene sentido" },
    {
      type: "ul",
      items: [
        "Estás validando una idea y necesitas algo en línea esta semana.",
        "Es un blog personal o una página informativa que casi no cambia.",
        "Tu presupuesto es muy limitado y la web no es tu canal principal de ventas.",
      ],
    },
    { type: "h2", id: "cuando-medida", text: "Cuándo conviene a la medida" },
    {
      type: "ul",
      items: [
        "Tu web vende o capta clientes y cada segundo de carga cuenta.",
        "Tienes procesos propios: cotizaciones, catálogos grandes, reservas, inventario.",
        "Tu marca necesita verse distinta a la competencia.",
        "Quieres aparecer en Google y en asistentes de IA con una estructura sólida.",
        "No quieres depender de licencias ni de una plataforma para siempre.",
      ],
    },
    { type: "callout", tone: "info", title: "Un caso real", text: "Telas Real tenía un WordPress lento con más de 850 referencias. Lo reconstruimos a la medida con filtros instantáneos y cotización por WhatsApp: sus cotizaciones y transacciones de distribuidores subieron 64%." },
    { type: "p", text: "Puedes ver el caso completo de [Telas Real](/proyectos/telas-real) y el de [GMX Gaming](/proyectos/gmx-gaming), que también dejó atrás un WordPress limitado." },
    { type: "h2", id: "test", text: "¿Qué te conviene a ti?" },
    { type: "p", text: "Marca las afirmaciones que se cumplen en tu negocio. Si marcas tres o más, un desarrollo a la medida probablemente te dará mejor retorno." },
    {
      type: "widget",
      name: "checklist",
      id: "necesito-a-la-medida",
      title: "Señales de que necesitas a la medida",
      items: [
        "Mi web es (o debería ser) un canal de ventas",
        "Tengo un proceso que ninguna plantilla resuelve bien",
        "Mi competencia tiene webs muy parecidas entre sí",
        "Mi sitio actual tarda más de 3 segundos en móvil",
        "Pago licencias o plugins cada año",
        "Quiero que el código y los datos sean de mi empresa",
      ],
    },
  ],
  faq: [
    { q: "¿Una web a la medida es mucho más cara?", a: "Al inicio sí cuesta más que una plantilla, pero a tres años las licencias, plugins y rediseños de una plantilla suelen acercar la diferencia. Nuestras landing a la medida parten de $450.000 COP." },
    { q: "¿Puedo administrar el contenido yo mismo?", a: "Sí. Cuando el proyecto lo necesita, incluimos un panel para que actualices productos, textos o proyectos sin depender de nosotros." },
  ],
};

const en: PostBody = {
  tldr: [
    "A template (WordPress, Wix, Shopify with a purchased theme) is cheaper and faster to launch, but you share the design with thousands of sites and inherit their weight.",
    "Custom development costs more up front, but it loads faster, adapts to your processes and the code is 100% yours.",
    "Over three years, template licenses, plugins and redesigns often approach or exceed the cost of going custom.",
    "If your website sells, captures leads or differentiates your brand, go custom; if it's a quick test, a template may be enough.",
  ],
  blocks: [
    { type: "p", text: "Today anyone can have a page up in an afternoon with a visual builder. So why pay for custom development? The answer depends on **what you expect your site to do**. Here's the straight comparison." },
    { type: "h2", id: "difference", text: "The difference in one sentence" },
    { type: "quote", text: "A template is a one-size-fits-all suit. Custom is a suit made to your measurements: it costs more, but it fits." },
    { type: "h2", id: "comparator", text: "Compare them point by point" },
    { type: "p", text: "Tap each criterion to see how each option behaves and which one wins depending on what matters most to you." },
    { type: "widget", name: "template-vs-custom" },
    {
      type: "table",
      caption: "General comparison between a template and custom development.",
      head: ["Criterion", "Template", "Custom"],
      rows: [
        ["Design", "Shared with thousands of sites", "Unique, born from your brand"],
        ["Speed", "Heavy: code for features you don't use", "Light: only what you need"],
        ["SEO", "Limited by the theme and plugins", "Structure planned from the ground up"],
        ["Special features", "Plugins that may clash", "Built for your process"],
        ["Security", "Depends on third-party updates", "Minimal attack surface"],
        ["Upfront cost", "Low", "Medium or high"],
        ["3-year cost", "Licenses, plugins and redesigns", "Predictable maintenance"],
        ["Ownership", "Tied to the platform or theme", "The code is yours"],
      ],
    },
    { type: "h2", id: "when-template", text: "When a template does make sense" },
    {
      type: "ul",
      items: [
        "You're validating an idea and need something online this week.",
        "It's a personal blog or an informational page that rarely changes.",
        "Your budget is very tight and the website isn't your main sales channel.",
      ],
    },
    { type: "h2", id: "when-custom", text: "When custom is the better choice" },
    {
      type: "ul",
      items: [
        "Your website sells or captures leads and every second of load time counts.",
        "You have your own processes: quotes, large catalogs, bookings, inventory.",
        "Your brand needs to look different from the competition.",
        "You want to show up on Google and in AI assistants with a solid structure.",
        "You don't want to depend on licenses or a platform forever.",
      ],
    },
    { type: "callout", tone: "info", title: "A real case", text: "Telas Real had a slow WordPress site with more than 850 products. We rebuilt it custom with instant filters and WhatsApp quotes: distributor quotes and transactions grew 64%." },
    { type: "p", text: "See the full [Telas Real](/proyectos/telas-real) case study, and [GMX Gaming](/proyectos/gmx-gaming), which also left a limited WordPress site behind." },
    { type: "h2", id: "test", text: "What fits you?" },
    { type: "p", text: "Tick the statements that are true for your business. If you tick three or more, custom development will probably give you a better return." },
    {
      type: "widget",
      name: "checklist",
      id: "need-custom",
      title: "Signs you need custom",
      items: [
        "My website is (or should be) a sales channel",
        "I have a process no template handles well",
        "My competitors' websites all look alike",
        "My current site takes more than 3 seconds on mobile",
        "I pay for licenses or plugins every year",
        "I want the code and the data to belong to my company",
      ],
    },
  ],
  faq: [
    { q: "Is a custom website much more expensive?", a: "It costs more than a template up front, but over three years template licenses, plugins and redesigns tend to close the gap. Our custom landing pages start at 450,000 COP." },
    { q: "Can I manage the content myself?", a: "Yes. When the project needs it, we include an admin panel so you can update products, copy or projects without depending on us." },
  ],
};

export default { es, en };
