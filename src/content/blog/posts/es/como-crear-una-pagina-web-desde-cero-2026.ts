import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Crear una web sin hoja de ruta lleva a retrasos, costos inesperados y sitios lentos. Hay seis pasos que conviene seguir en orden.",
    "1) Objetivo y mapa del sitio, 2) dominio y DNS, 3) diseño, 4) desarrollo, 5) SEO técnico y datos estructurados, 6) publicación y pruebas.",
    "Un sitio corporativo a la medida toma entre 2 y 4 semanas; una landing, entre 7 y 12 días.",
  ],
  md: `
Lanzar una página web sin un plan claro es la receta para cambios de última hora, sobrecostos y un sitio que nadie encuentra. Esta hoja de ruta ordena el proceso en seis pasos para que no se te escape nada.

## Los 6 pasos para crear una web desde cero {#pasos}

### Paso 1: objetivo y arquitectura de contenidos

Antes de diseñar, define para qué existe tu web: ¿generar contactos por WhatsApp?, ¿vender productos con carrito?, ¿mostrar autoridad corporativa? Luego dibuja el **mapa del sitio**: qué páginas habrá y cómo se conectan.

### Paso 2: dominio y DNS

Elige un nombre corto y fácil de recordar. En Colombia, \`.com\` y \`.co\` son las extensiones más usadas para posicionarse local e internacionalmente. Te lo explicamos en [qué es un dominio y cómo elegirlo](/blog/que-es-un-dominio-web-como-elegir).

### Paso 3: diseño de la interfaz

Diseña primero para el celular, con buen contraste y llamados a la acción visibles. Un diseño único, pensado para tu marca, te diferencia de los sitios hechos con plantilla.

### Paso 4: desarrollo

El código determina la velocidad, la seguridad y qué tan fácil será crecer. Un sitio a la medida, sin constructores pesados, puede cargar el contenido principal en menos de un segundo.

La primera decisión de esta etapa es cómo construir. Las plataformas de arrastrar y soltar publican rápido y sirven para proyectos personales o para validar una idea, pero suelen cargar código que no se usa, y eso vuelve la página más pesada y lenta.

Tabla: Constructor visual frente a desarrollo a la medida.
| Criterio | Constructor visual | Desarrollo a la medida |
|---|---|---|
| Tiempo de publicación | Muy rápido | De 1 a 4 semanas |
| Velocidad | Media o baja | Alta |
| Diseño | Basado en plantillas | Único |
| Integraciones | Las que ofrezca la plataforma | Las que necesites |
| Propiedad | De la plataforma | Tuya |

Si el proyecto va a integrarse con otros sistemas, conviene una arquitectura **headless**: la interfaz queda separada de los datos y los consume por APIs, así que el sitio es más modular y se puede rediseñar sin tocar la información.

Para saber si el resultado es bueno, mide las tres métricas de experiencia de Core Web Vitals:

- **LCP (Largest Contentful Paint):** lo que tarda en aparecer el bloque principal, imagen o título. La meta es menos de 2,5 segundos.
- **CLS (Cumulative Layout Shift):** la estabilidad visual mientras carga; los botones no deben moverse cuando el usuario va a tocarlos.
- **INP (Interaction to Next Paint):** qué tan rápido responde la página a un toque o clic. La meta es menos de 200 ms.

### Paso 5: SEO técnico y datos estructurados

- Títulos y descripciones únicas por página.
- Encabezados H1 a H3 en orden lógico.
- Datos estructurados (schema.org).
- Un sitemap.xml para que Google descubra tus páginas.

Conviene resolverlo al construir y no después del lanzamiento, porque buena parte del SEO no se agrega: se construye.

Tabla: Qué se decide al construir y qué pasa si se corrige después.
| Decisión | Si se planea desde el inicio | Si se corrige después |
|---|---|---|
| Renderizado (servidor o navegador) | Contenido completo en el HTML | Puede exigir rehacer el sitio |
| Jerarquía de encabezados | Ordenada en cada plantilla | Revisar página por página |
| URLs y estructura | Limpias y lógicas | Redirecciones y pérdida de posiciones |
| Datos estructurados | Generados automáticamente | Agregados a mano |
| Velocidad | Diseñada para cargar en menos de 1 s | Optimizaciones parciales |

Entre los datos estructurados, Organization, Service y FAQPage son los que describen tu negocio sin ambigüedad para buscadores y asistentes de IA.

### Paso 6: publicación y pruebas

Publica en servidores globales con certificado SSL, prueba en distintos dispositivos, mide la velocidad y monitorea la disponibilidad. En una red global, cada visitante recibe el sitio desde el punto más cercano: responde igual de rápido en Bogotá, Ciudad de México o Miami y aguanta los picos de tráfico.

:::checklist id="crear-web-desde-cero" title="Checklist para lanzar tu web"
- Tengo claro el objetivo principal del sitio
- Hice el mapa de páginas
- Registré el dominio a nombre de mi empresa
- El diseño está aprobado en celular y escritorio
- Cada página tiene título, descripción y H1 únicos
- Configuré datos estructurados y sitemap.xml
- El sitio tiene SSL y carga rápido en móvil
- Probé formularios, botones de WhatsApp y enlaces
:::

## Si es una web corporativa, súmale esto {#web-corporativa}

Una página corporativa es la carta de presentación de tu empresa ante clientes, aliados e inversionistas. Además de lo anterior, debería cumplir con estos requisitos:

- Correo corporativo con el nombre de la empresa.
- Política de privacidad publicada.
- Páginas de servicios, casos de éxito y contacto.
- Datos estructurados de la organización.
- Accesibilidad: contraste, textos alternativos y navegación con teclado.
- Formularios conectados a correo y CRM.
- Analítica configurada.

## Sigue la ruta de aprendizaje {#ruta}

1. [Cuánto cuesta una página web en Colombia](/blog/cuanto-cuesta-una-pagina-web-en-colombia)
2. [Qué son el dominio y el hosting](/blog/que-es-un-dominio-web-como-elegir)
3. [Cuánto cuesta el mantenimiento de una web](/blog/cuanto-cuesta-mantenimiento-pagina-web-colombia)
4. [Cómo crear una página web gratis: limitaciones](/blog/como-crear-una-pagina-web-gratis-limitaciones)
5. [Desarrollo a la medida vs. plantillas](/blog/desarrollo-web-medida-vs-plantillas)

## ¿Prefieres que lo hagamos por ti? {#k-t}

En K&T Code diseñamos y desarrollamos tu web desde cero, lista para Google y para captar clientes, desde $450.000 COP. Mira los [precios de una página web](/precios/precio-pagina-web-colombia) o nuestro servicio de [desarrollo web a la medida](/servicios/desarrollo-web-a-medida).
`,
  faq: [
    { q: "¿Cuánto tiempo toma crear una página web profesional desde cero?", a: "Un sitio corporativo a la medida toma de 2 a 4 semanas, incluyendo diseño, desarrollo, optimización de velocidad y SEO técnico. Una landing page, de 7 a 12 días." },
    { q: "¿Qué se necesita para empezar a crear una web?", a: "Definir el objetivo del sitio, registrar un dominio propio, elegir dónde se alojará y organizar el contenido en un mapa de páginas." },
    { q: "¿Sirven los constructores visuales para una empresa?", a: "Sirven para validar ideas o proyectos pequeños. Para competir en buscadores y convertir visitas en clientes, una base técnica a la medida da mejores resultados." },
    { q: "¿Se puede agregar el SEO después de lanzar la web?", a: "Parte sí (contenido, enlaces), pero lo técnico, como el renderizado, la estructura de URLs y la velocidad, se decide al construir y corregirlo después suele implicar rehacer partes del sitio." },
    { q: "¿Cuánto cuesta un sitio corporativo en Colombia?", a: "Con K&T Code, un sitio corporativo a la medida parte de $2.500.000 COP y se entrega en 15 a 25 días." },
  ],
  sources: [{ title: "web.dev: Web Vitals", url: "https://web.dev/articles/vitals" }],
};

export default post;
