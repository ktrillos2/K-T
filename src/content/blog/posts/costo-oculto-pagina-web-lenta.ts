import type { PostBody } from "../types";

const es: PostBody = {
  tldr: [
    "Según Google, cuando la carga pasa de 1 a 3 segundos la probabilidad de que el visitante se vaya sube 32%; de 1 a 5 segundos, sube 90%.",
    "Un estudio de Deloitte encontró que mejorar la velocidad móvil en solo 0,1 s aumentó las conversiones de comercio minorista en 8,4%.",
    "Google considera buena una web con LCP de hasta 2,5 s, INP de hasta 200 ms y CLS de hasta 0,1.",
    "Las causas más comunes son plantillas pesadas, plugins, imágenes sin optimizar y hosting lento.",
  ],
  blocks: [
    { type: "p", text: "Una página lenta no avisa. No hay un error en pantalla ni un correo que diga “perdiste un cliente”. La gente simplemente cierra la pestaña y busca al siguiente resultado. Por eso la lentitud es el costo más caro que **no aparece en ningún reporte**." },
    { type: "h2", id: "datos", text: "Lo que dicen los datos" },
    { type: "stat", value: "+32%", label: "más probabilidad de rebote cuando la carga pasa de 1 a 3 segundos", source: "Google / SOASTA, 2017" },
    { type: "stat", value: "+90%", label: "más probabilidad de rebote cuando la carga pasa de 1 a 5 segundos", source: "Google / SOASTA, 2017" },
    { type: "stat", value: "+8,4%", label: "conversiones en comercio minorista al mejorar 0,1 s la velocidad móvil", source: "Deloitte, Milliseconds Make Millions, 2020" },
    { type: "h2", id: "simulador", text: "Simula cuánto te cuesta la lentitud" },
    { type: "p", text: "Pon tus números reales: visitas al mes, tasa de conversión y lo que vale en promedio un cliente. Luego mueve el tiempo de carga y mira cuántas ventas se quedan en el camino." },
    { type: "widget", name: "speed-simulator" },
    { type: "callout", tone: "warn", title: "Es un modelo, no una promesa", text: "El simulador usa las curvas publicadas por Google sobre rebote y tiempo de carga. Cada sitio es distinto, pero el orden de magnitud suele sorprender." },
    { type: "h2", id: "por-que", text: "Por qué una web se vuelve lenta" },
    {
      type: "ul",
      items: [
        "**Plantillas multipropósito.** Traen código para cien funciones aunque uses tres.",
        "**Plugins acumulados.** Cada uno suma scripts y consultas a la base de datos.",
        "**Imágenes sin optimizar.** Fotos de varios megas servidas igual al móvil y al escritorio.",
        "**Hosting compartido barato.** Muchos sitios peleando por el mismo servidor.",
        "**Scripts de terceros.** Chats, píxeles y widgets que bloquean la carga.",
      ],
    },
    { type: "h2", id: "medir", text: "Cómo medir tu sitio hoy (en 5 minutos)" },
    {
      type: "ol",
      items: [
        "Entra a PageSpeed Insights y escribe la dirección de tu sitio.",
        "Mira primero la pestaña **Móvil**: es donde está la mayoría de tus visitas.",
        "Revisa los datos de usuarios reales (si aparecen): LCP, INP y CLS.",
        "Fíjate cuál es el elemento LCP: casi siempre es la imagen o el título principal.",
        "Repite la prueba con tu página de producto o de servicio más visitada.",
      ],
    },
    {
      type: "table",
      caption: "Umbrales de Core Web Vitals que Google considera “buenos”.",
      head: ["Métrica", "Qué mide", "Bueno"],
      rows: [
        ["LCP", "Cuánto tarda en verse el contenido principal", "≤ 2,5 s"],
        ["INP", "Qué tan rápido responde al tocar o hacer clic", "≤ 200 ms"],
        ["CLS", "Cuánto “salta” el diseño mientras carga", "≤ 0,1"],
      ],
    },
    { type: "h2", id: "como-lo-hacemos", text: "Cómo logramos cargar en menos de un segundo" },
    { type: "p", text: "En nuestros proyectos el PageSpeed móvil pasa en promedio de 46 a 98 sobre 100. No hay truco: es una suma de decisiones a la medida." },
    {
      type: "ul",
      items: [
        "Código propio, sin constructores visuales ni plugins que no necesitas.",
        "Imágenes en formatos modernos y en el tamaño exacto de cada pantalla.",
        "Páginas generadas de antemano y servidas desde servidores cerca de tu cliente.",
        "Carga diferida de todo lo que no se ve al abrir la página.",
        "Medición antes de publicar, no después.",
      ],
    },
    { type: "p", text: "Un ejemplo: [GMX Gaming](/proyectos/gmx-gaming) pasó de 4,9 s a 0,59 s de carga al dejar un WordPress limitado por una plataforma a la medida, y automatizó sus inscripciones." },
    {
      type: "widget",
      name: "quiz",
      questions: [
        { q: "Si tu página pasa de cargar en 1 s a 3 s, ¿cuánto sube la probabilidad de rebote según Google?", options: ["5%", "32%", "90%"], answer: 1, why: "Google reportó +32% de 1 a 3 s y +90% de 1 a 5 s." },
        { q: "¿Qué métrica mide cuánto tarda en aparecer el contenido principal?", options: ["CLS", "INP", "LCP"], answer: 2, why: "LCP (Largest Contentful Paint) mide cuándo se pinta el elemento más grande visible." },
        { q: "¿Dónde conviene medir primero?", options: ["En escritorio", "En móvil", "Da igual"], answer: 1, why: "La mayoría del tráfico es móvil y ahí las redes y los equipos son más lentos." },
      ],
    },
  ],
  faq: [
    { q: "¿Cuánto debe tardar en cargar una página web?", a: "Lo ideal es que el contenido principal aparezca en menos de 2,5 segundos en móvil (LCP). Nuestros sitios suelen cargarlo en menos de un segundo." },
    { q: "¿La velocidad influye en Google?", a: "Sí. Las Core Web Vitals forman parte de las señales de experiencia de página, y un sitio rápido además retiene más visitas, lo que mejora la conversión." },
  ],
  sources: [
    { title: "Think with Google: Find out how you stack up to new industry benchmarks for mobile page speed", url: "https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/" },
    { title: "Deloitte: Milliseconds Make Millions", url: "https://www2.deloitte.com/ie/en/pages/consulting/articles/milliseconds-make-millions.html" },
    { title: "web.dev: Web Vitals", url: "https://web.dev/articles/vitals" },
  ],
};

const en: PostBody = {
  tldr: [
    "According to Google, when load time goes from 1 to 3 seconds the probability of a visitor bouncing rises 32%; from 1 to 5 seconds, it rises 90%.",
    "A Deloitte study found that improving mobile speed by just 0.1 s increased retail conversions by 8.4%.",
    "Google considers a site good with an LCP up to 2.5 s, INP up to 200 ms and CLS up to 0.1.",
    "The most common causes are heavy templates, plugins, unoptimized images and slow hosting.",
  ],
  blocks: [
    { type: "p", text: "A slow page never warns you. There's no error on screen and no email saying “you lost a customer”. People just close the tab and go to the next result. That's why slowness is the most expensive cost that **doesn't show up in any report**." },
    { type: "h2", id: "data", text: "What the data says" },
    { type: "stat", value: "+32%", label: "higher bounce probability when load time goes from 1 to 3 seconds", source: "Google / SOASTA, 2017" },
    { type: "stat", value: "+90%", label: "higher bounce probability when load time goes from 1 to 5 seconds", source: "Google / SOASTA, 2017" },
    { type: "stat", value: "+8.4%", label: "retail conversions after a 0.1 s mobile speed improvement", source: "Deloitte, Milliseconds Make Millions, 2020" },
    { type: "h2", id: "simulator", text: "Simulate what slowness costs you" },
    { type: "p", text: "Enter your real numbers: monthly visits, conversion rate and the average value of a customer. Then move the load time and see how many sales get lost on the way." },
    { type: "widget", name: "speed-simulator" },
    { type: "callout", tone: "warn", title: "It's a model, not a promise", text: "The simulator uses Google's published curves on bounce rate and load time. Every site is different, but the order of magnitude is usually surprising." },
    { type: "h2", id: "why", text: "Why websites get slow" },
    {
      type: "ul",
      items: [
        "**Multipurpose templates.** They ship code for a hundred features even if you use three.",
        "**Piled-up plugins.** Each one adds scripts and database queries.",
        "**Unoptimized images.** Multi-megabyte photos served the same to phones and desktops.",
        "**Cheap shared hosting.** Many sites fighting over the same server.",
        "**Third-party scripts.** Chats, pixels and widgets that block loading.",
      ],
    },
    { type: "h2", id: "measure", text: "How to measure your site today (in 5 minutes)" },
    {
      type: "ol",
      items: [
        "Go to PageSpeed Insights and type your site's address.",
        "Look at the **Mobile** tab first: that's where most of your visits are.",
        "Check the real-user data (if shown): LCP, INP and CLS.",
        "Find the LCP element: it's almost always the main image or headline.",
        "Repeat the test with your most visited product or service page.",
      ],
    },
    {
      type: "table",
      caption: "Core Web Vitals thresholds Google considers “good”.",
      head: ["Metric", "What it measures", "Good"],
      rows: [
        ["LCP", "How long the main content takes to appear", "≤ 2.5 s"],
        ["INP", "How fast the page responds to taps and clicks", "≤ 200 ms"],
        ["CLS", "How much the layout jumps while loading", "≤ 0.1"],
      ],
    },
    { type: "h2", id: "how-we-do-it", text: "How we load in under a second" },
    { type: "p", text: "On our projects, mobile PageSpeed goes from an average of 46 to 98 out of 100. There's no trick: it's a sum of custom decisions." },
    {
      type: "ul",
      items: [
        "Original code, with no visual builders or plugins you don't need.",
        "Images in modern formats and at the exact size of each screen.",
        "Pages generated ahead of time and served from servers close to your customer.",
        "Deferred loading of everything that isn't visible when the page opens.",
        "Measuring before launch, not after.",
      ],
    },
    { type: "p", text: "One example: [GMX Gaming](/proyectos/gmx-gaming) went from 4.9 s to 0.59 s by replacing a limited WordPress site with a custom platform, and automated its registrations." },
    {
      type: "widget",
      name: "quiz",
      questions: [
        { q: "If your page goes from loading in 1 s to 3 s, how much does bounce probability rise according to Google?", options: ["5%", "32%", "90%"], answer: 1, why: "Google reported +32% from 1 to 3 s and +90% from 1 to 5 s." },
        { q: "Which metric measures how long the main content takes to appear?", options: ["CLS", "INP", "LCP"], answer: 2, why: "LCP (Largest Contentful Paint) measures when the largest visible element is painted." },
        { q: "Where should you measure first?", options: ["On desktop", "On mobile", "It doesn't matter"], answer: 1, why: "Most traffic is mobile, and networks and devices are slower there." },
      ],
    },
  ],
  faq: [
    { q: "How long should a web page take to load?", a: "Ideally the main content appears in under 2.5 seconds on mobile (LCP). Our sites usually load it in under one second." },
    { q: "Does speed affect Google rankings?", a: "Yes. Core Web Vitals are part of the page experience signals, and a fast site also keeps more visitors, which improves conversion." },
  ],
  sources: es.sources,
};

export default { es, en };
