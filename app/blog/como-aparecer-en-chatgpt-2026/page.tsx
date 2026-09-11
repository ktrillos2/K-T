import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Bot, Sparkles, HelpCircle, ArrowRight, ShieldCheck, Zap } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

import BlogClusterNav from "@/components/blog/blog-cluster-nav"

export const metadata: Metadata = {
  title: "Cómo Aparecer en ChatGPT Search: OAI-SearchBot, Robots.txt y Citas IA (2026)",
  description:
    "Guía técnica para aparecer en ChatGPT Search: por qué OAI-SearchBot es el crawler clave para ser citado, cómo separarlo de GPTBot en robots.txt y optimizar para GEO.",
  keywords: [
    "como aparecer en chatgpt search",
    "oai searchbot indexacion",
    "diferencia gptbot y oai searchbot",
    "robots txt chatgpt search",
    "geo chatgpt search 2026",
    "citar web en chatgpt",
    "optimizacion motores ia",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/como-aparecer-en-chatgpt-2026"),
  },
  openGraph: {
    title: "Cómo Aparecer en ChatGPT Search: OAI-SearchBot, Robots.txt y Citas IA (2026)",
    description:
      "Aprende la diferencia técnica entre OAI-SearchBot y GPTBot, cómo configurar robots.txt y posicionar tu marca en ChatGPT Search.",
    type: "article",
    url: absoluteUrl("/blog/como-aparecer-en-chatgpt-2026"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Qué rastreador utiliza ChatGPT Search para descubrir y citar mi página web?",
    answer:
      "Para ChatGPT Search, el rastreador oficial es OAI-SearchBot. OpenAI especifica que este crawler se encarga exclusivamente de indexar, descubrir y enlazar páginas como fuentes citadas en respuestas en tiempo real, sin usar el contenido para entrenar modelos de IA. Por otro lado, GPTBot es el bot de recolección de datos para entrenamiento.",
  },
  {
    question: "¿Debo permitir GPTBot para aparecer en ChatGPT Search?",
    answer:
      "No es obligatorio. Si solo deseas que tu contenido sea descubierto y citado en búsquedas de ChatGPT sin que se use para entrenar modelos futuros, puedes permitir OAI-SearchBot y denegar GPTBot en tu robots.txt. Si buscas máxima visibilidad y conocimiento fundacional de tu marca, puedes permitir ambos.",
  },
  {
    question: "¿Qué es GEO (Generative Engine Optimization)?",
    answer:
      "GEO es el conjunto de prácticas de ingeniería web, arquitectura semántica y datos estructurados diseñadas para que los motores de IA (ChatGPT Search, Perplexity, Gemini) reconozcan tu empresa como entidad de máxima autoridad y la recomienden como fuente oficial.",
  },
  {
    question: "¿Los datos estructurados Schema.org ayudan a ser citado por la IA?",
    answer:
      "Sí, de forma determinante. Los formatos JSON-LD (Organization, Service, Product, FAQPage) proporcionan entidades inequívocas y relaciones de confianza que los modelos procesan con máxima prioridad al sintetizar respuestas para los usuarios.",
  },
]

export default function ComoAparecerEnChatGptPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Cómo Aparecer en ChatGPT Search: OAI-SearchBot, Robots.txt y Citas IA (2026)",
            description:
              "Guía técnica de rastreo e indexación para ChatGPT Search: OAI-SearchBot vs GPTBot, robots.txt y optimización GEO.",
            path: "/blog/como-aparecer-en-chatgpt-2026",
            datePublished: "2026-08-19",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Aparecer en ChatGPT", path: "/blog/como-aparecer-en-chatgpt-2026" },
          ]),
          buildFaqJsonLd(faqs),
        ]}
      />

      <main className="min-h-screen bg-black pt-32 pb-24 px-4 sm:px-6 text-white">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white font-mono text-sm mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Blog
          </Link>

          <article className="prose prose-invert prose-lg max-w-none prose-headings:font-title prose-a:text-white hover:prose-a:text-neutral-300">
            {/* Header */}
            <header className="mb-14 not-prose">
              <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 mb-4 uppercase tracking-wider">
                <span className="text-emerald-400 font-bold">Ingeniería & SEO IA</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>8 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>19 de agosto de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Cómo Aparecer en ChatGPT Search: OAI-SearchBot, Robots.txt y Citas con IA
              </h1>

              {/* Author Byline */}
              <div className="flex items-center gap-3 py-4 border-t border-b border-white/10 my-6 font-mono text-xs text-neutral-400">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0 bg-neutral-800">
                  <Image
                    src="/perfil.png"
                    alt="Keyner Trillos"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span>Escrito por </span>
                  <Link href="/autores/keyner-trillos" className="text-white font-bold hover:underline">
                    Keyner Trillos
                  </Link>
                  <span className="text-neutral-400"> • Co-Fundador & Lead Software Engineer</span>
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 19 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-sans text-lg leading-relaxed text-neutral-200">
                En 2026, la búsqueda de información ha evolucionado radicalmente. Los usuarios ya no solo hacen clic en los 10 enlaces azules de Google; consultan directamente a <strong>ChatGPT Search, Perplexity y Gemini</strong> para tomar decisiones de compra y contratación de servicios. Descubre cómo optimizar la arquitectura técnica de tu sitio web y configurar adecuadamente tus rastreadores para que los modelos generativos citen tu empresa como fuente oficial.
              </p>
            </header>

            <h2>1. La Diferencia Fundamental: OAI-SearchBot vs. GPTBot en ChatGPT</h2>
            <p>
              Uno de los errores más críticos y extendidos en la optimización para motores generativos (GEO) es confundir el rastreador de búsquedas de OpenAI con el crawler de entrenamiento masivo. Bloquear el bot equivocado en tu archivo <code>robots.txt</code> puede dejar a tu empresa completamente excluida de los resultados de <strong>ChatGPT Search</strong>.
            </p>
            <p>
              OpenAI opera agentes claramente diferenciados con finalidades técnicas distintas:
            </p>

            <ul>
              <li>
                <strong>OAI-SearchBot (Prioridad Crítica para GEO):</strong> Es el crawler oficial destinado a <strong>ChatGPT Search</strong>. Su único objetivo es descubrir, indexar y presentar contenido actualizado con enlaces citados directamente a los usuarios en sus respuestas de búsqueda en vivo. OpenAI indica explícitamente que <em>el contenido rastreado por OAI-SearchBot NO se utiliza para entrenar sus modelos de IA fundacionales</em>. Si bloqueas este bot, ChatGPT jamás podrá enlazar tu sitio web en una consulta de búsqueda.
              </li>
              <li>
                <strong>GPTBot (Entrenamiento de Modelos):</strong> Es el crawler general que recolecta corpus de datos web para entrenar y mejorar los modelos de inteligencia artificial de OpenAI. Permitir o bloquear este agente depende exclusivamente de la política de propiedad intelectual de tu empresa: no afecta tu capacidad de ser citado en ChatGPT Search si mantienes abierto <code>OAI-SearchBot</code>.
              </li>
              <li>
                <strong>ChatGPT-User:</strong> Se utiliza cuando un usuario final introduce manualmente un enlace o solicita a ChatGPT que examine una URL específica en medio de una conversación activa.
              </li>
            </ul>

            <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-left font-sans text-xs md:text-sm text-neutral-300">
                <thead className="bg-white/10 text-white font-bold uppercase tracking-wider text-xs border-b border-white/10">
                  <tr>
                    <th className="p-4">User-Agent Oficial</th>
                    <th className="p-4">Propósito Técnico</th>
                    <th className="p-4">¿Entrena Modelos?</th>
                    <th className="p-4">Impacto en Búsquedas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="p-4 font-mono font-bold text-emerald-400">OAI-SearchBot</td>
                    <td className="p-4">ChatGPT Search en tiempo real y enlaces citados</td>
                    <td className="p-4 text-emerald-400 font-bold">No</td>
                    <td className="p-4 text-white font-bold">Indispensable (Prioridad Alta)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-bold text-white">GPTBot</td>
                    <td className="p-4">Recolección de datos para entrenamiento de IA</td>
                    <td className="p-4 text-amber-400 font-bold">Sí</td>
                    <td className="p-4 text-neutral-400">Opcional según tu política</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-bold text-white">ChatGPT-User</td>
                    <td className="p-4">Navegación reactiva cuando un usuario comparte un link</td>
                    <td className="p-4 text-emerald-400 font-bold">No</td>
                    <td className="p-4 text-neutral-300">Recomendado para navegación</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Configuraciones de robots.txt según la política de tu empresa</h3>
            <p>
              Dependiendo de si tu empresa desea únicamente figurar en las respuestas de búsqueda o también contribuir a la base de conocimiento general de OpenAI, puedes adoptar una de estas dos arquitecturas en tu archivo <code>robots.txt</code>:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-neutral-900 border border-emerald-500/30 rounded-2xl p-6 font-mono text-xs text-neutral-300 shadow-xl">
                <p className="text-emerald-400 font-bold mb-2">// Opción 1: Máxima Visibilidad (Recomendada K&T Code)</p>
                <p className="text-neutral-400 text-[11px] mb-4 font-sans">
                  Permite indexación en ChatGPT Search y también presencia en datasets de entrenamiento para máximo reconocimiento de entidad.
                </p>
                <pre className="text-neutral-200 leading-relaxed bg-black/50 p-3 rounded-lg border border-white/5">
{`# Permitir a ChatGPT Search
User-agent: OAI-SearchBot
Allow: /

# Permitir a GPTBot
User-agent: GPTBot
Allow: /

# Permitir navegación de usuario
User-agent: ChatGPT-User
Allow: /

# Proteger rutas privadas
User-agent: *
Disallow: /admin/
Disallow: /api/`}
                </pre>
              </div>

              <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 font-mono text-xs text-neutral-300 shadow-xl">
                <p className="text-white font-bold mb-2">// Opción 2: Solo Búsqueda (Sin Entrenamiento)</p>
                <p className="text-neutral-400 text-[11px] mb-4 font-sans">
                  Tu sitio aparece en los resultados y citas de ChatGPT Search, pero OpenAI no puede usar tu contenido para entrenar modelos.
                </p>
                <pre className="text-neutral-200 leading-relaxed bg-black/50 p-3 rounded-lg border border-white/5">
{`# Permitir a ChatGPT Search
User-agent: OAI-SearchBot
Allow: /

# Bloquear crawler de entrenamiento
User-agent: GPTBot
Disallow: /

# Permitir navegación de usuario
User-agent: ChatGPT-User
Allow: /

# Proteger rutas privadas
User-agent: *
Disallow: /admin/
Disallow: /api/`}
                </pre>
              </div>
            </div>

            <h2>2. Implementación de Datos Estructurados (Schema.org JSON-LD)</h2>
            <p>
              Los modelos de lenguaje procesan con mayor precisión la información estructurada que el texto desordenado. Implementar <strong>Schema.org JSON-LD</strong> le proporciona a la IA relaciones de entidad claras sobre qué ofrece tu empresa, quiénes son sus fundadores, sus precios oficiales y su ubicación geográfica.
            </p>

            <h3>Entidades esenciales que debes declarar:</h3>
            <ul>
              <li><strong>Organization / LocalBusiness:</strong> Nombre oficial de la empresa, logotipo corporativo, fundadores, ubicación física (dirección, ciudad, código postal en Colombia) y perfiles verificados en redes sociales (<code>sameAs</code>).</li>
              <li><strong>Service & Product:</strong> Precios exactos, monedas locales (<code>COP</code>, <code>USD</code>), tiempos de entrega y características técnicas sin ambigüedades.</li>
              <li><strong>FAQPage:</strong> Respuestas directas a preguntas frecuentes estructuradas en pares pregunta-respuesta, ideales para extracción de fragmentos directos.</li>
              <li><strong>BreadcrumbList:</strong> Jerarquía de navegación que ayuda a los agentes a comprender la taxonomía del sitio.</li>
            </ul>

            <h2>3. Arquitectura de Contenido Directo: Estructura Piramidal Invertida</h2>
            <p>
              ChatGPT y los motores de IA extraen fragmentos que responden de forma precisa y objetiva a las intenciones del usuario. Para maximizar las probabilidades de ser citado:
            </p>

            <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-left font-sans text-xs md:text-sm text-neutral-300">
                <thead className="bg-white/10 text-white font-bold uppercase tracking-wider text-xs border-b border-white/10">
                  <tr>
                    <th className="p-4">Estrategia GEO</th>
                    <th className="p-4">Por qué funciona para LLMs</th>
                    <th className="p-4">Ejemplo Práctico en K&T Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="p-4 font-bold text-white">Definición en las primeras 40 palabras</td>
                    <td className="p-4">Permite al modelo extraer un snippet directo sin gastar tokens de contexto.</td>
                    <td className="p-4 text-emerald-400">"Un agente de IA es un sistema autónomo que..."</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Tablas semánticas en HTML puro</td>
                    <td className="p-4">Los LLMs procesan tablas `&lt;table&gt;` con mayor facilidad que listas desordenadas.</td>
                    <td className="p-4 text-emerald-400">Comparativas de precios COP y tiempos de entrega.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Cifras y métricas verificables</td>
                    <td className="p-4">Los modelos premian datos numéricos específicos frente a adjetivos genéricos.</td>
                    <td className="p-4 text-emerald-400">"Páginas web desde $450.000 COP con LCP &lt; 1.2s".</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>4. La Verdadera Jerarquía Técnica de GEO: Los Fundamentos vs. "Soluciones Mágicas"</h2>
            <p>
              En el mercado del marketing digital y el posicionamiento en inteligencia artificial, muchas agencias han comenzado a promocionar archivos como <code>llms.txt</code>, <code>AI.txt</code> o <code>chatgpt.txt</code> como si fueran fórmulas mágicas para aparecer en las respuestas de los modelos generativos. <strong>Esto es un error conceptual grave.</strong>
            </p>
            <p>
              La documentación técnica oficial de OpenAI para <strong>ChatGPT Search</strong>, así como los equipos de ingeniería de Perplexity y Google, dejan muy claro cómo funciona el ecosistema: los modelos descubren y citan páginas web mediante <strong>rastreo HTTP tradicional de OAI-SearchBot + robots.txt permisivo + servidores de alta disponibilidad/CDN + contenido HTML limpio e indexable</strong>.
            </p>
            <p>
              Para lograr una presencia sólida y sostenible en ChatGPT, debes abordar el trabajo de ingeniería siguiendo este orden estricto de prioridades técnicas:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-title font-bold text-white text-base mb-1">
                    Crawlability & Accesibilidad de Servidor (Prioridad Crítica)
                  </h3>
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                    Asegurar que <code>OAI-SearchBot</code> y <code>PerplexityBot</code> tengan acceso <code>Allow: /</code> en <code>robots.txt</code>. Tu infraestructura o CDN (Cloudflare, Vercel Edge) no debe bloquear las IPs de los crawlers con desafíos WAF o códigos HTTP 403. Renderizado en servidor (SSR/SSG) para que el bot reciba HTML completo en menos de 800ms.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-title font-bold text-white text-base mb-1">
                    Autoridad de Entidad y Gráfico de Conocimiento (Entity Authority)
                  </h3>
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                    Unificar el nombre oficial de la marca, los fundadores y los servicios en todas las plataformas digitales. Uso de la propiedad <code>sameAs</code> en JSON-LD apuntando a registros mercantiles, perfiles de GitHub, LinkedIn y directorios verificados para eliminar ambigüedades.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-title font-bold text-white text-base mb-1">
                    Estructura Semántica y Datos Estructurados Schema.org
                  </h3>
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                    Implementar esquemas de <code>Organization</code>, <code>Service</code>, <code>Product</code>, <code>FAQPage</code> y <code>BreadcrumbList</code>. Las monedas locales (COP, USD) y rangos de precio claros permiten a ChatGPT responder preguntas sobre tarifas sin alucinar.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-title font-bold text-white text-base mb-1">
                    Contenido Directo, Sin Humo y con Datos Verificables
                  </h3>
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                    Modelo "Respuesta Primero": redactar definiciones claras en las primeras 40 palabras de cada sección. Emplear tablas HTML puras (<code>&lt;table&gt;</code>) y cifras objetivas. Los modelos premian datos concretos y descartan el texto publicitario inflado.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                  5
                </div>
                <div>
                  <h3 className="font-title font-bold text-white text-base mb-1">
                    Citas Externas, Reseñas Verificadas y Backlinks de Autoridad
                  </h3>
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                    Los motores de IA ponderan fuertemente la co-ocurrencia semántica: si tu empresa es mencionada en artículos de terceros, reseñas de clientes reales, directorios tecnológicos y prensa del sector, la confianza del algoritmo en tu marca se multiplica.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                  6
                </div>
                <div>
                  <h3 className="font-title font-bold text-white text-base mb-1">
                    Consistencia Multicanal de la Información
                  </h3>
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                    Cero discrepancias entre los datos publicados en tu web, perfiles de redes sociales y directorios locales. Si en tu web figura un precio y en tus redes otro contradictorio, los modelos de IA penalizan la fiabilidad de la fuente.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-400 font-mono font-bold flex items-center justify-center shrink-0 text-sm">
                  7
                </div>
                <div>
                  <h3 className="font-title font-bold text-white text-base mb-1">
                    Archivos Auxiliares (llms.txt) — Complemento Opcional
                  </h3>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                    Una vez que los 6 niveles fundamentales anteriores están implementados con rigor técnico, puedes publicar un archivo <code>/llms.txt</code> en texto plano para facilitarle la vida a agentes que consumen Markdown. Sin embargo, <strong>llms.txt nunca compensará una web lenta, un Schema inexistente o una mala configuración de robots.txt</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Topic Cluster Navigation */}
            <BlogClusterNav currentSlug="como-aparecer-en-chatgpt-2026" />

            <div className="not-prose my-14 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black shadow-2xl">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Sparkles className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Posicionamiento IA en K&T Code</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-title text-white mb-3">
                ¿Quieres que tu empresa sea recomendada por ChatGPT?
              </h3>
              <p className="font-sans text-sm text-neutral-300 mb-6 leading-relaxed">
                Diseñamos arquitecturas web de alto rendimiento en Next.js con optimización GEO, configuración limpia para OAI-SearchBot, datos estructurados Schema completos y entrega instantánea en Edge CDN.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/servicios/seo-tecnico"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
                >
                  Conocer Nuestro Servicio de SEO Técnico <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/servicios/agentes-ia"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white font-mono font-bold text-xs hover:bg-white/10 transition-all"
                >
                  Ver Soluciones con Agentes IA
                </Link>
              </div>
            </div>

            <h2>Preguntas Frecuentes sobre Posicionamiento en ChatGPT</h2>
            <div className="not-prose space-y-4 my-8">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h3 className="font-title font-bold text-lg text-white mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  )
}
