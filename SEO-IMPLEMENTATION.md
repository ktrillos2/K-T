# Implementación SEO, GEO y rendimiento

Fecha de revisión técnica: 17 de julio de 2026.

## Implementado

### Rastreo e indexación

- `app/robots.ts` permite el contenido público, bloquea rutas técnicas y privadas, permite OAI-SearchBot y trata GPTBot de forma independiente.
- `app/sitemap.ts` genera URLs canónicas de páginas, servicios, artículos y proyectos.
- El sitemap utiliza fechas de archivo, fechas editoriales y `_updatedAt` de Sanity en lugar de asignar la fecha actual a todas las URLs.
- La antigua ruta `/politicas-de-privacidad` redirige permanentemente a `/politica-de-privacidad`.
- Login, administración, cotizaciones y páginas de prueba usan `noindex`.

### Arquitectura y contenido

- Hub `/servicios`.
- Páginas independientes para desarrollo web a medida, diseño web corporativo, tiendas virtuales, software a medida, SEO técnico y mantenimiento web.
- Página `/preguntas-frecuentes` con contenido visible y marcado consistente.
- Blog centralizado en `lib/blog-posts.ts`.
- Cada artículo incorpora fecha de actualización, preguntas relacionadas, fuentes primarias y enlaces a servicios.
- Portafolio con fallback a proyectos locales cuando Sanity no está disponible.

### Datos estructurados

- Organization y WebSite globales.
- WebPage e ItemList en inicio.
- Service y BreadcrumbList en servicios.
- BlogPosting, BreadcrumbList y FAQPage en artículos.
- CollectionPage, BreadcrumbList y FAQPage en precios.
- CreativeWork y BreadcrumbList en proyectos.

El marcado describe contenido visible. No debe presentarse como garantía de resultados enriquecidos.

### GEO y búsqueda con IA

- Contenido con respuestas directas, contexto, límites y preguntas frecuentes.
- Identidad empresarial consistente sin dirección física inventada.
- Fuentes primarias en artículos.
- `llms.txt` opcional como directorio informativo, sin tratarlo como factor de posicionamiento.
- OAI-SearchBot permitido para que el contenido público pueda participar en ChatGPT Search.

### Rendimiento

- El minijuego se carga de forma diferida cuando se aproxima al viewport.
- El iframe reserva altura y comunica su tamaño al componente padre.
- El juego limita el device pixel ratio, pausa cuando la pestaña se oculta y reduce efectos según el dispositivo.
- Imágenes de Next.js configuradas para AVIF y WebP.
- Cabeceras de caché para el juego.
- Cabeceras básicas de seguridad y compresión habilitada.
- Se eliminó `typescript.ignoreBuildErrors` para no ocultar errores en producción.

### Seguridad

- Las credenciales de correo y Resend se obtienen de variables de entorno.
- El código de descuento usa tokens HMAC firmados y expiración.
- El formulario valida el código y el token antes de marcar la recompensa como válida.
- El HTML de los correos escapa los datos enviados por el usuario.

## Decisiones que deben confirmarse

- Verificar que `contacto@kytcode.lat` recibe y envía correctamente.
- Configurar SPF, DKIM y DMARC para el dominio.
- Confirmar que las cifras y testimonios comerciales publicados son demostrables.
- Definir condiciones del descuento: proyecto mínimo, vencimiento, exclusiones, acumulación y consumo único.
- Decidir si GPTBot debe continuar bloqueado. OAI-SearchBot ya está separado.
- Confirmar nombres legales, perfiles sociales oficiales y teléfono antes del lanzamiento.

## Acciones externas

- Añadir y verificar el dominio en Google Search Console y Bing Webmaster Tools.
- Enviar `https://www.kytcode.lat/sitemap.xml` en ambos paneles.
- Revisar cobertura, canonicals elegidos y Core Web Vitals con datos reales.
- Configurar Google Business Profile solo si la empresa cumple los requisitos y puede representar una ubicación o área de servicio real.
- Solicitar reseñas y menciones legítimas de clientes.
- Publicar casos de estudio con métricas únicamente cuando existan datos verificables.
- Mantener una frecuencia editorial sostenible y actualizar artículos cuando cambie la información.

## Validaciones realizadas en este entorno

- Sintaxis JavaScript del minijuego validada con `node --check`.
- Sintaxis de 235 archivos TypeScript/TSX validada mediante el compilador de TypeScript en modo de transpilación.
- Búsqueda de claves conocidas y credenciales embebidas en el código fuente.

No fue posible reinstalar todas las dependencias ni ejecutar un build nuevo porque el registro de paquetes no respondió desde este entorno. Antes de publicar, ejecuta la lista de `DEPLOYMENT-CHECKLIST.md` en una máquina con acceso al registro de paquetes.
