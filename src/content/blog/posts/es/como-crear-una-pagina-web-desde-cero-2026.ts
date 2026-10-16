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

### Paso 5: SEO técnico y datos estructurados

- Títulos y descripciones únicas por página.
- Encabezados H1 a H3 en orden lógico.
- Datos estructurados (schema.org).
- Un sitemap.xml para que Google descubra tus páginas.

Profundiza en [por qué el SEO se planea desde la arquitectura](/blog/seo-desde-la-raiz-crear-pagina).

### Paso 6: publicación y pruebas

Publica en servidores globales con certificado SSL, prueba en distintos dispositivos, mide la velocidad y monitorea la disponibilidad.

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

## Sigue la ruta de aprendizaje {#ruta}

1. [Cómo crear una página web en 2026: guía de arquitectura](/blog/como-crear-pagina-web-2026)
2. [Cuánto cuesta una página web en Colombia](/blog/cuanto-cuesta-una-pagina-web-en-colombia)
3. [Qué es un hosting y cómo funciona](/blog/que-es-un-hosting-web-y-como-funciona)
4. [Cuánto cuesta el mantenimiento de una web](/blog/cuanto-cuesta-mantenimiento-pagina-web-colombia)
5. [Página web corporativa profesional: estándares](/blog/como-crear-pagina-web-profesional)
6. [Cómo crear una página web gratis: limitaciones](/blog/como-crear-una-pagina-web-gratis-limitaciones)
7. [Desarrollo a la medida vs. plantillas](/blog/desarrollo-web-medida-vs-plantillas)

## ¿Prefieres que lo hagamos por ti? {#k-t}

En K&T Code diseñamos y desarrollamos tu web desde cero, lista para Google y para captar clientes, desde $450.000 COP. Mira los [precios de una página web](/precios/precio-pagina-web-colombia) o nuestro servicio de [desarrollo web a la medida](/servicios/desarrollo-web-a-medida).
`,
  faq: [
    { q: "¿Cuánto tiempo toma crear una página web profesional desde cero?", a: "Un sitio corporativo a la medida toma de 2 a 4 semanas, incluyendo diseño, desarrollo, optimización de velocidad y SEO técnico. Una landing page, de 7 a 12 días." },
    { q: "¿Qué se necesita para empezar a crear una web?", a: "Definir el objetivo del sitio, registrar un dominio propio, elegir dónde se alojará y organizar el contenido en un mapa de páginas." },
  ],
};

export default post;
