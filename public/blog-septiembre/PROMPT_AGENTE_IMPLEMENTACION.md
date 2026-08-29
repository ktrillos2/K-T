
Trabaja directamente sobre el repositorio actual .

Te entrego una carpeta:

```text
/content/blog/
```

que contiene 12 artículos `.mdx` completos y un `README.md`.

## OBJETIVO

Integra estos 12 artículos en el sistema de blog existente y deja la publicación **100 % automática** según `publishedAt`, sin tener que hacer nuevos commits o deploys manuales en cada fecha.

La programación es:

- lunes, miércoles y viernes;
- 08:00 hora de Colombia (`America/Bogota`, UTC-5);
- fechas exactas definidas en cada frontmatter.

No generes artículos nuevos y no reescribas el contenido suministrado salvo que sea estrictamente necesario para corregir un error de sintaxis MDX.

---

# 1. INSPECCIONA EL PROYECTO ANTES DE CAMBIAR NADA

Primero analiza:

- versión de Next.js;
- App Router o Pages Router;
- cómo está implementado actualmente `/blog`;
- dónde están los blogs actuales;
- parser Markdown/MDX existente;
- forma actual de generar metadata;
- sitemap;
- robots;
- RSS/feed si existe;
- JSON-LD;
- componentes visuales del blog;
- paquete gestor (`npm`, `pnpm`, `yarn`, `bun`);
- configuración de Vercel;
- estrategia de caché / SSG / ISR.

NO reemplaces una implementación que ya funciona solo por preferencia personal.

Preserva:
- todas las URLs actuales;
- artículos existentes;
- estilos;
- autor;
- navegación;
- componentes;
- analítica;
- Search Console;
- funcionalidades existentes.

Adapta los nuevos MDX al sistema actual con los mínimos cambios necesarios.

---

# 2. SOPORTE MDX

Los archivos entregados están en:

```text
/content/blog/*.mdx
```

Cada archivo tiene frontmatter con campos como:

```yaml
title:
slug:
description:
excerpt:
publishedAt:
updatedAt:
author:
authorRole:
locale:
draft:
category:
primaryKeyword:
secondaryKeywords:
searchIntent:
geoTarget:
tags:
canonical:
ogImageAlt:
imagePrompt:
sources:
```

Implementa un loader tipado y seguro.

Preferencia:
- reutiliza el parser/loader actual;
- si no existe, utiliza una solución mínima compatible con la versión actual de Next.js;
- valida frontmatter con Zod o el mecanismo de validación ya utilizado por el proyecto;
- un error en un archivo debe detectarse en build, no silenciosamente en producción.

No expongas `imagePrompt` al usuario.

No uses `primaryKeyword`/`secondaryKeywords` para crear spam ni keyword stuffing.

---

# 3. PUBLICACIÓN PROGRAMADA

Define como publicado únicamente:

```ts
post.draft === false &&
new Date(post.publishedAt).getTime() <= Date.now()
```

Crea una única función reutilizable, por ejemplo:

```ts
isPostPublished(post, now)
```

y úsala en todos los lugares.

Un artículo futuro NO debe aparecer en:

- `/blog`;
- categorías;
- búsqueda interna;
- posts relacionados;
- sitemap;
- RSS/feed;
- cards de homepage;
- JSON-LD de listados;
- navegación;
- APIs públicas de posts.

Si alguien entra directamente a:

```text
/blog/<slug-futuro>
```

antes de `publishedAt`, debe obtener `404` mediante `notFound()` o el mecanismo equivalente del router actual.

NO publiques el HTML futuro con CSS ocultándolo.
NO uses `visibility:hidden`.
NO envíes el contenido futuro al cliente.

---

# 4. CACHE / ISR / RENDERING: ASEGURA QUE LA FECHA REALMENTE PUBLIQUE

Este punto es CRÍTICO.

No asumas que comparar `publishedAt` es suficiente. Si `/blog` o los posts se prerenderizan en build, una página puede quedar congelada hasta el siguiente deploy.

Implementa una estrategia compatible con el proyecto para que los posts cambien de “programado” a “publicado” sin rebuild manual.

Preferencia:
- ISR/revalidación controlada;
- Vercel Cron para forzar revalidación;
- fallback temporal de `revalidate` razonable.

El contenido MDX forma parte del deployment. El Cron **NO debe crear ni modificar archivos en Vercel**.

Si el loader actual solo puede leer archivos en build y no funciona durante revalidación:
- NO escribas al filesystem de Vercel;
- ajusta la arquitectura para que el contenido/metadata entregado pueda resolverse durante la regeneración;
- puedes generar un registry/manifest durante build, usar imports de MDX o adaptar el sistema actual;
- conserva las URLs y el diseño.

Haz una prueba real de publicación futura antes de dar por terminado el trabajo.

---

# 5. VERCEL CRON

Configura un endpoint protegido, por ejemplo:

```text
/app/api/cron/publish-blogs/route.ts
```

o su equivalente según la estructura real.

El endpoint debe:

1. validar `Authorization`;
2. fallar con `401` si falta o no coincide `CRON_SECRET`;
3. obtener los posts que ya estén publicados por fecha;
4. revalidar `/blog`;
5. revalidar las páginas de posts publicables;
6. revalidar sitemap;
7. revalidar RSS/feed si existe;
8. devolver JSON con `ok`, hora de ejecución y slugs revalidados;
9. ser idempotente: ejecutarlo varias veces no debe duplicar ni modificar contenido.

Protección:

```ts
const authHeader = request.headers.get("authorization")

if (
  !process.env.CRON_SECRET ||
  authHeader !== `Bearer ${process.env.CRON_SECRET}`
) {
  return new Response("Unauthorized", { status: 401 })
}
```

Nunca hardcodees el secreto.

Añade/documenta:

```text
CRON_SECRET=
```

en `.env.example`, sin valor real.

Configura Vercel para ejecutar el cron los lunes, miércoles y viernes a las 13:00 UTC, equivalentes a las 08:00 en Colombia:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "crons": [
    {
      "path": "/api/cron/publish-blogs",
      "schedule": "0 13 * * 1,3,5"
    }
  ]
}
```

Si `vercel.json` ya existe, fusiona la propiedad `crons`; no borres configuraciones actuales.

Vercel usa UTC.

Ten en cuenta:
- en Vercel Hobby la precisión del cron puede variar dentro de la hora;
- en Pro/Enterprise la precisión es por minuto;
- el sistema debe seguir funcionando aunque el cron se retrase, gracias al fallback ISR/dynamic que implementes;
- no dependas exclusivamente del Cron para seguridad de contenido futuro.

---

# 6. SEO DE CADA ARTÍCULO

Implementa `generateMetadata` o el mecanismo equivalente para cada post usando el frontmatter.

Debe incluir correctamente:

- `<title>`;
- meta description;
- canonical absoluto;
- `robots: index, follow` SOLO si el post ya está publicado;
- Open Graph:
  - title;
  - description;
  - canonical URL;
  - type `article`;
  - published time;
  - modified time;
  - author cuando aplique;
  - locale `es_CO`;
- Twitter card;
- imagen OG existente o fallback válido.

No dejes imágenes 404.

Si no hay imagen individual:
- conserva el OG fallback de K&T Code;
- o crea una `opengraph-image.tsx` dinámica consistente con el diseño;
- NO generes imágenes externas automáticamente.

No uses `<meta name="keywords">` como supuesto factor de ranking. Los campos de keywords son editoriales.

---

# 7. JSON-LD

Para cada artículo publicado genera JSON-LD válido basado únicamente en contenido visible.

Implementa:

### Article / BlogPosting

Como mínimo:
- `@context`;
- `@type`;
- `headline`;
- `description`;
- `datePublished`;
- `dateModified`;
- `inLanguage: "es-CO"`;
- `mainEntityOfPage`;
- `author`;
- `publisher`;
- `url`;
- `image` solo si existe una imagen válida.

### BreadcrumbList

Ruta:

```text
Inicio > Blog > Artículo
```

Si ya existe un JSON-LD global de `Organization`, reutiliza la misma identidad; no crees datos contradictorios.

No inventes:
- ratings;
- reviews;
- premios;
- precios;
- direcciones;
- perfiles sociales;
- estadísticas.

No crees un supuesto “GEO Schema”. Google no exige schema especial para AI Overviews/AI Mode.

FAQPage solo si encaja con la arquitectura actual y TODO el contenido FAQ está visible; no lo añadas simplemente por SEO.

---

# 8. FUENTES VISIBLES

Cada MDX tiene:

```yaml
sources:
```

Renderiza al final del artículo una sección visual:

```text
Fuentes consultadas
```

Cada fuente debe:
- mostrar el título;
- enlazar a la URL real;
- usar `rel="noopener noreferrer"` cuando corresponda;
- no usar `nofollow` por defecto en fuentes editoriales legítimas.

No muestres URLs crudas si el diseño actual utiliza títulos de enlace.

Estas fuentes son importantes para la verificabilidad del contenido y para SEO/GEO.

---

# 9. ENLACES INTERNOS

Los MDX ya contienen enlaces internos a servicios de K&T Code.

Valida que todos existan.

Mantén enlaces como:

```text
/servicios/software-a-medida
/servicios/desarrollo-web-a-medida
/servicios/woocommerce-headless
```

No cambies slugs de servicios.

Añade un bloque de “Artículos relacionados” usando similitud por:
1. tags;
2. categoría;
3. keywords.

Debe excluir:
- el post actual;
- drafts;
- posts futuros.

Máximo 3 o 4 relacionados.

---

# 10. SITEMAP

Audita el sitemap actual.

Incluye únicamente posts publicados:

```ts
!draft && publishedAt <= now
```

Para cada URL usa:
- canonical correcta;
- `lastModified` = `updatedAt`.

No uses `changeFrequency` o `priority` de forma arbitraria si el proyecto no los necesita.

Los posts futuros no pueden aparecer en sitemap.

Revalida el sitemap después del Cron.

---

# 11. ROBOTS Y VISIBILIDAD EN IA

Audita `robots.txt` o `app/robots.ts`.

Preserva reglas existentes que sean necesarias.

Para las páginas públicas del blog:
- Googlebot debe poder rastrear;
- Bingbot debe poder rastrear;
- **OAI-SearchBot no debe quedar bloqueado** si el objetivo es que K&T Code pueda ser descubierto/citado en ChatGPT Search.

IMPORTANTE:
- OAI-SearchBot es el crawler relevante para búsqueda de OpenAI;
- GPTBot tiene un propósito distinto y su política debe mantenerse separada;
- no fuerces a permitir GPTBot como requisito de ChatGPT Search.

No bloquees accidentalmente `/_next/` necesario para renderizar recursos.

---

# 12. GEO / AI SEARCH SIN “HACKS”

No implementes tácticas falsas.

Prioriza:
- contenido textual rastreable;
- HTML semántico;
- respuestas directas;
- entidad/autor consistente;
- fuentes visibles;
- canonical;
- links internos;
- Article JSON-LD;
- sitemap;
- robots;
- rendimiento;
- accesibilidad.

No crees `llms.txt` como requisito.

Si el proyecto ya tiene `llms.txt`, no lo elimines: audítalo y asegúrate de que no incluya drafts/futuros.

Si decides mantener/generar uno experimentalmente:
- debe generarse desde posts publicados;
- no debe contener contenido futuro;
- no debe presentarse como factor garantizado de ranking.

---

# 13. PERFORMANCE

No conviertas el blog en client-rendered solo para comprobar fechas.

Preserva Server Components donde existan.

Evita:
- hidratar todo el artículo;
- JS innecesario;
- librerías pesadas;
- peticiones client-side para cargar el cuerpo del post.

MDX debe renderizarse en servidor / build / ISR según la arquitectura seleccionada.

Mantén Core Web Vitals y accesibilidad.

---

# 14. FECHAS

Las fechas vienen con offset:

```text
2026-09-02T08:00:00-05:00
```

No elimines el offset.

La comparación debe realizarse con timestamps reales:

```ts
new Date(publishedAt).getTime()
```

No compares strings de fecha.

En UI, muestra la fecha en español de Colombia con una función centralizada, no con formatos inconsistentes.

---

# 15. RSS / FEED

Si existe RSS:
- incluir solo publicados;
- canonical real;
- fecha real;
- descripción;
- no incluir futuros.

Si no existe RSS, no es obligatorio crearlo salvo que encaje limpiamente con el proyecto.

---

# 16. INDEXACIÓN

No utilices Google Indexing API para artículos normales.

Asegura:
- sitemap correcto;
- enlaces internos;
- robots;
- canonical;
- HTTP 200 al publicarse.

No intentes “forzar indexación” mediante técnicas no soportadas.

---

# 17. PRUEBAS OBLIGATORIAS

Antes de finalizar:

### Test A — futuro
Toma temporalmente un post de prueba con fecha futura:
- no aparece en `/blog`;
- no aparece en sitemap;
- no aparece en relacionados;
- URL directa devuelve 404.

### Test B — publicado
Cambia temporalmente esa fecha a pasado:
- aparece en `/blog`;
- URL devuelve 200;
- metadata correcta;
- Article JSON-LD válido;
- aparece en sitemap.

### Test C — Cron
- sin `Authorization` => 401;
- token incorrecto => 401;
- token correcto => 200;
- revalidación idempotente.

### Test D — build
Ejecuta el comando correcto según package manager:
- typecheck si existe;
- lint si existe;
- build de producción.

Corrige todos los errores introducidos por esta implementación.

No desactives TypeScript, ESLint ni validaciones para “hacer pasar” el build.

---

# 18. ENTREGA FINAL DEL AGENTE

Cuando termines, dame un resumen concreto con:

1. archivos creados;
2. archivos modificados;
3. estrategia de publicación elegida;
4. cómo funciona `publishedAt`;
5. cron configurado;
6. variable que debo añadir en Vercel:
   - `CRON_SECRET`;
7. cómo probar el endpoint manualmente;
8. confirmación de sitemap;
9. confirmación de robots / OAI-SearchBot;
10. confirmación de metadata y JSON-LD;
11. resultado de build/lint/typecheck;
12. cualquier decisión específica que hayas tenido que tomar por la arquitectura actual.

NO digas que quedó funcionando si no verificaste el build y los tests posibles localmente.
