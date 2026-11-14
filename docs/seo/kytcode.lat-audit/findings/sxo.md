# Análisis SXO (experiencia de búsqueda): www.kytcode.lat

Fecha: 2026-11-14. Build analizado: `http://localhost:3123` (idéntico a producción; redirecciones confirmadas con curl contra https://www.kytcode.lat).
Objetivo del negocio: cotizaciones por WhatsApp desde Colombia, Latinoamérica y EE. UU.
Search Console (28 días a oct 2026): 44 clics, 7.869 impresiones, CTR 0,56 %, posición media 11.

> El **SXO Gap Score** mide qué tan bien encajan las páginas con lo que premia la búsqueda y con lo que necesita quien busca. Es un puntaje distinto del SEO Health Score.

## SXO Gap Score: 65 / 100

| Dimensión | Puntos | Evidencia |
|---|---|---|
| Tipo de página | 10/15 | Los artículos de precios, API y pasarelas son del mismo tipo que lo que posiciona (guía o comparativa). El inicio no encaja con "agencia desarrollo web colombia", donde dominan directorios y listados (ver H1). |
| Profundidad de contenido | 9/15 | La guía de precios solo muestra los precios de K&T. La comparativa de pasarelas tiene 548 palabras y 3 pasarelas, frente a guías de 11 a 18 pasarelas en la SERP. El artículo de API tiene 891 palabras y compite con AWS, Oracle, Cloudflare y Xataka. |
| Señales de UX | 11/15 | Hay CTA de WhatsApp con mensaje prellenado en el primer pantallazo, y precio y plazo visibles en las páginas de servicio. En contra: cada página carga en el HTML una paleta de búsqueda con más de 100 enlaces, un juego ("Rompe el logo") y un carrusel de reseñas duplicado 3 veces. En inglés no hay forma de agendar una llamada. |
| Schema | 11/15 | Hay LocalBusiness, Service, Offer, FAQPage, BlogPosting, BreadcrumbList y Speakable. Faltan `streetAddress`/`geo`/`hasMap`, `aggregateRating`/`Review`, y en `sameAs` no están el perfil de Google, LinkedIn ni Clutch. |
| Medios | 9/15 | Hay mockups y capturas de proyectos, con mejoras de velocidad (GMX 4,9 s a 0,59 s). No hay video, fotos del equipo ni capturas de landings con resultados de conversión. |
| Autoridad | 6/15 | 23+ proyectos y 6 testimonios propios. No hay reseñas de terceros (Google, Clutch, GoodFirms) ni presencia en los directorios que ocupan la SERP de "agencia". El cliente de EE. UU. (ECG Construction) está oculto. |
| Frescura | 9/10 | Artículos actualizados el 9-nov-2026 y tarifas de pasarelas "revisadas el 9 de noviembre de 2026". |
| **Total** | **65/100** | |

---

## 1. Desajustes de tipo de página e intención (hallazgo principal)

| Consulta | Qué posiciona (SERP observada) | Tipo dominante y consenso | Página de kytcode | Tipo kytcode | Severidad |
|---|---|---|---|---|---|
| agencia desarrollo web colombia | Clutch, GoodFirms (2 URLs), Semrush Agencies (varias versiones), TechBehemoths (2), N-iX ("web development company Colombia"), Behance, Colombia Move | **Directorio o listado de agencias**, ~80 % | `/` (inicio) | Landing o servicio de un solo proveedor | **CRÍTICA** |
| que es una api | Xataka (5 variantes de URL), AWS, Oracle, IEBS, Salesforce, Brave, Wrike, Cloudflare, glosarios | **Artículo informativo o glosario** de marcas tecnológicas grandes, ~100 % | `/blog/que-es-una-api-y-para-que-sirve` | Artículo informativo | **ALINEADA en tipo, ALTA en intención de negocio**: no lleva a cotizar |
| cuanto cuesta una pagina web en colombia | GoDaddy, Tiendanube (2), RTVC Noticias (2), DreamHost (2), Neolo, Valora Analitik, Cangrejo Digital, Crehana (2), Portafolio | **Guía de precios o artículo de blog** con rangos de mercado, ~90 % | `/blog/cuanto-cuesta-una-pagina-web-en-colombia` (la URL `/precios/precio-pagina-web-colombia` ya hace 308 a esta) | Guía de blog | **ALINEADA en tipo, MEDIA en contenido** (solo precios propios) |
| wompi vs mercado pago | Con la consulta literal: páginas de comparación automática (paymentproviders.io, stackshare, rfp.wiki, Capterra). Con la variante en español: guías de pasarelas en Colombia (guiadesoftware, Rebill, Tiendanube "18 alternativas", Platzi, Portafolio) | **Comparativa o guía de pasarelas**, ~85 % | `/blog/wompi-vs-mercado-pago-vs-payu-colombia` | Comparativa | **ALINEADA** (es la página que más clics trae) |
| diseño de paginas web cucuta | El motor de búsqueda devolvió sobre todo tesis (UFPS, UNAD, UNAM), Hostinger/Wix, Colombia Move, D&B y LinkedIn de ModularCodes. **No se pudo ver el paquete local de Google Maps.** | Inconcluso. En Google, para "servicio + ciudad", suele dominar el paquete local más páginas locales de agencias | `/desarrollo-web-cucuta` | Página local | **ALINEADA (sin verificar)**. Brecha en las señales locales |
| gmx gaming (GSC, pos. 5) | Búsqueda de marca o navegacional: la gente quiere gmxgaming.com | Navegacional | `/proyectos/gmx-gaming` | Caso de estudio | **BAJA**: que tenga 0 clics es lo normal y no vale la pena optimizarla |
| web hosting (GSC, pos. ~9) | Proveedores de hosting (comercial o transaccional) | Página de producto o precios de un proveedor | `/en/blog/que-es-un-hosting-web-y-como-funciona` ahora hace **308 a `/en/blog`** | — | **BAJA**: ya no es una página propia. Revisar que la redirección vaya a algo relevante y no al índice del blog |

### H1 · CRÍTICA · El inicio no puede ganar "agencia desarrollo web colombia" porque la SERP la ocupan directorios
- **Evidencia:** 12 de 15 resultados son directorios o listados (Clutch, GoodFirms, Semrush Agencies, TechBehemoths) o guías del tipo "las mejores empresas". Kytcode no aparece en ninguno. El inicio es de un solo proveedor y su H1 ("Tu negocio en internet, listo para vender.") no menciona "agencia", "desarrollo web" ni "Colombia". La intención solo aparece en el title ("Desarrollo web a la medida en Colombia") y en el texto previo ("Agencia de páginas web · Cúcuta, Colombia").
- **Arreglo:**
  1. **Fuera del sitio (la medida que más rinde):** crear y completar perfiles en Clutch, GoodFirms, TechBehemoths y el directorio de Semrush Agencies, con los 23 casos, rango de tarifas en USD por hora y reseñas verificadas de 3 a 5 clientes (Casa Medina, OCC Partes, Telas Real, ECG Construction). Así la marca entra en las páginas que Google ya premia.
  2. **En el sitio:** publicar `/blog/agencias-desarrollo-web-colombia-2026` (listado honesto con criterios, tabla comparativa de 8 a 10 agencias incluida K&T y metodología), siguiendo el formato de `/blog/mejores-agencias-software-a-medida-cucuta-2026` que ya existe.
  3. Cambiar el H1 del inicio a algo como «Agencia de desarrollo web en Colombia: páginas, tiendas y software a tu medida» y dejar el texto actual como subtítulo.

### H2 · ALTA · "que es una api": 2.666 impresiones y 1 clic, con un tráfico que no compra
- **Evidencia:** posición ~8 frente a AWS, Oracle, Cloudflare, Xataka e IBM/Salesforce. Esta SERP es de definición rápida y casi seguro tiene AI Overview y fragmento destacado (no se pudo verificar). El artículo sí está bien hecho (resumen, analogía del mesero, tabla REST/GraphQL/webhooks, JSON de ejemplo), pero quien busca un concepto no busca agencia.
- **Arreglo:** no invertir más en ganar la consulta principal. En cambio:
  - Reorientar el title hacia la variante de negocio, donde K&T sí aporta: «¿Qué es una API y para qué sirve en tu negocio? Ejemplos con Wompi, WhatsApp y DIAN».
  - Crear piezas de cola larga con intención comercial que enlacen a `/servicios/software-a-medida`: «integrar API de Wompi en mi página», «API de WhatsApp Business: precio y cómo conectarla», «conectar facturación electrónica DIAN por API».
  - Poner arriba del todo un bloque con la definición en 40 a 50 palabras, para pelear el fragmento destacado y las citas en IA.
  - Añadir un CTA contextual («¿Necesitas conectar tu web con Wompi, tu CRM o la DIAN? Cotiza por WhatsApp») justo después de "Dónde se usan en una página web típica".

### H3 · MEDIA · La guía "cuánto cuesta" responde con el catálogo propio, no con el mercado
- **Evidencia:** la SERP premia rangos de mercado. Cangrejo Digital pone landing a $1,5–3 M y corporativo a $4–8 M; GoDaddy, Tiendanube y RTVC dan rangos por tipo de proveedor. El resumen de kytcode empieza con «En K&T Code una landing page a la medida parte de $450.000…». No hay comparación entre hacerlo uno mismo (Wix/Hostinger), contratar un freelance, una agencia local o una agencia grande. Esa es la pregunta real de quien busca, y por eso el snippet no destaca (posición ~8, 0 clics en la consulta exacta).
- **Arreglo:**
  - Abrir con una tabla «Precio de una página web en Colombia en 2026 según quién la hace»: hazlo tú (Wix/Hostinger, ~$0–$100.000 al mes), plantilla con freelance, agencia local, agencia grande. Después, «Dónde estamos nosotros» con la tabla actual.
  - Añadir un title con un dato: «¿Cuánto cuesta una página web en Colombia? Desde $450.000 (precios 2026)».
  - Mantener la redirección 308 de `/precios/precio-pagina-web-colombia` (ya existe en `next.config.ts`). Si queda algún enlace interno que apunte a la URL vieja, cambiarlo por la URL final. El documento `docs/seo/gsc-2026-10.md` todavía dice que el blog «enlaza a /precios/precio-pagina-web-colombia».
  - La canibalización en GSC debería desaparecer en 4 a 6 semanas. Medirlo en diciembre.

### H4 · MEDIA · La comparativa de pasarelas (la que más clics trae) es delgada y convierte poco
- **Evidencia:** tiene 548 palabras y solo 3 pasarelas. La SERP en español premia guías de 11 a 18 pasarelas (Rebill, Tiendanube) que incluyen Bold, ePayco, Addi y tarifa por medio de pago (PSE ~1,49 % en Wompi según la SERP). La página ya tiene la mejor pieza diferencial de su SERP: la tabla «Recibes aprox.» sobre una venta de $200.000.
- **Arreglo:**
  - Agregar Bold y ePayco a la tabla, y una columna de tarifa PSE, Nequi y tarjeta por separado.
  - Convertir la tabla de $200.000 en una calculadora (monto + mezcla de medios de pago), ya que el sitio tiene componente de calculadora en la guía de precios.
  - Agregar una caja «¿Ya elegiste pasarela? Te la integramos en tu tienda» que lleve a `/servicios/tiendas-virtuales` con WhatsApp prellenado. Hoy solo hay un CTA intermedio.
  - Ampliar el title con «Bold» para captar variantes («wompi vs bold»).

### H5 · ALTA · El perfil nearshore de EE. UU. no encuentra lo que necesita para confiar
- **Evidencia:** `/en` y `/en/servicios/landing-pages` no mencionan nearshore, zona horaria (Colombia = UTC-5, igual a EST en invierno), contratos, facturación en USD ni forma de agendar una llamada. Los únicos canales son WhatsApp y correo. El único cliente de EE. UU., **ECG Construction (Snohomish, WA)**, solo aparece en la paleta de búsqueda: no figura en el bloque "Nuestro trabajo" del inicio (GMX, Telas Real, CXellence) ni en `/desarrollo-web-estados-unidos`. Además, la landing en inglés dice «From 200 USD», que para un comprador corporativo de EE. UU. suena a freelance de bajo costo. Las URLs en inglés usan slugs en español (`/en/servicios/landing-pages`, `/en/desarrollo-web-estados-unidos`).
- **Arreglo:**
  - En el hero de `/en`, cambiar el texto previo a «Nearshore web development team in Colombia · Same time zone as New York».
  - Añadir un botón secundario «Book a 20-min call» (Cal.com o Calendly) al lado de WhatsApp.
  - Destacar ECG Construction como primer caso en `/en` y en `/en/desarrollo-web-estados-unidos`, con métricas y un testimonio en inglés.
  - En `/en/servicios/landing-pages`, mostrar paquetes en USD con un nivel "Business" (por ejemplo, desde 600–900 USD) y dejar 200 USD como "Starter".
  - Agregar un bloque de confianza: contrato en inglés, factura en USD (Wise o Payoneer), NDA y propiedad del código.

### H6 · MEDIA · Faltan señales locales en Cúcuta
- **Evidencia:** `/desarrollo-web-cucuta` está bien hecha: H1 local, precios, «Pago 50% / 50%», sectores de la región y un caso. Pero no tiene dirección física (`streetAddress` ausente en el schema), mapa (0 enlaces a Google Maps), enlace al perfil de Google ni reseñas con calificación. El title y el H1 dicen «Desarrollo de páginas web en Cúcuta», mientras que la consulta objetivo es «**diseño** de páginas web cúcuta». El caso local («Un proyecto en Cúcuta») es de la Universidad de Pamplona: hay que verificar que el evento se hizo en Cúcuta, porque si no, ese titular le resta credibilidad.
- **Arreglo:**
  - Title: «Diseño y desarrollo de páginas web en Cúcuta | K&T Code».
  - Añadir la dirección o la zona de servicio, un mapa embebido, un enlace al perfil de Google con botón «Ver reseñas en Google», y `hasMap`/`geo`/`sameAs` en el schema.
  - Sumar 1 o 2 casos de empresas con sede en Cúcuta o el área metropolitana.
  - Revisar el perfil de Google con `/seo local`.

### H7 · BAJA · El ruido del HTML diluye todas las páginas
- **Evidencia:** cada página trae en el HTML que entrega el servidor (SSR) la paleta de búsqueda (todos los servicios, industrias, 25 proyectos y 50 artículos), el juego «Rompe el logo» con H2 propio y el carrusel de reseñas repetido 3 veces. Por eso el parser cuenta ~2.000–2.600 palabras en páginas cuyo contenido real es de 548 a 999 palabras (contador del propio artículo), y el H2 «Rompe el logo» aparece en todas las páginas.
- **Arreglo:** cargar la paleta solo cuando el usuario la abra (render en cliente), bajar el título del juego de `h2` a `p` o `div` y renderizar el carrusel una sola vez en el DOM (duplicándolo por CSS si hace falta para la animación).

### H8 · BAJA · "gmx gaming" y "web hosting" son tráfico que no corresponde a la intención
- **Evidencia:** "gmx gaming" es navegacional hacia la marca del cliente. El caso ya enlaza a gmxgaming.com y es correcto que no reciba clics. "web hosting" apuntaba a un artículo en inglés que ahora hace 308 a `/en/blog`.
- **Arreglo:** no optimizar. Para hosting, redirigir a la página temática más cercana (por ejemplo, `/en/blog/que-es-un-dominio-web-como-elegir` o mantenimiento) en vez de al índice del blog, o devolver 410 si no hay equivalente. Una redirección a un índice suele tratarse como soft 404.

---

## 2. Historias de usuario (derivadas de señales de la SERP)

1. **Consideración:** «Como dueño de pyme, quiero ver rangos de precio según quién hace la página (yo, un freelance, una agencia) para saber si $450.000 es barato o caro». *Señal:* rangos de mercado en Cangrejo Digital, GoDaddy y RTVC, y la advertencia «las cifras varían bastante entre fuentes».
2. **Decisión:** «Como comprador que evalúa agencias, quiero ver reseñas verificadas de terceros y un portafolio comparable antes de escribir». *Señal:* la SERP de "agencia desarrollo web colombia" son directorios con reseñas (Clutch, GoodFirms) y tarifas de 25 a 99 USD por hora.
3. **Consideración:** «Como tienda en línea en Colombia, quiero saber cuánto recibo neto por venta con cada pasarela y cuál me sirve para PSE y Nequi». *Señal:* la SERP en español compara la tarifa PSE (1,49 % frente a 1,89–2 %) y el costo efectivo según la mezcla de medios de pago.
4. **Conocimiento:** «Como persona no técnica, quiero una definición de API en una frase y un ejemplo cotidiano». *Señal:* SERP de glosarios; la variante del ejemplo de pago con tarjeta aparece en el resumen de la búsqueda.
5. **Decisión (local):** «Como empresa de Cúcuta, quiero confirmar que la agencia está en mi ciudad y ver reseñas en Google antes de cotizar». *Señal:* la búsqueda recomienda revisar Google Maps y perfiles de Google para "diseño web Cúcuta"; no hay agencias locales claras en los resultados orgánicos.

---

## 3. Puntuación por perfil: inicio y /servicios/landing-pages

Escala: Relevancia, Claridad, Confianza y Acción, 25 puntos cada una (total 100). Ordenado del perfil más débil al más fuerte.

### Perfil A: empresa de EE. UU. que busca nearshore (evaluada en `/en` y `/en/servicios/landing-pages`)
| Página | Relev. | Clar. | Conf. | Acción | Total |
|---|---|---|---|---|---|
| Inicio (`/en`) | 12 | 14 | 10 | 10 | **46** |
| Landing pages (`/en/servicios/landing-pages`) | 13 | 18 | 8 | 10 | **49** |

- **Relevancia:** no aparecen "nearshore", "time zone", "English-speaking team" ni "contract". El blog nearshore existe, pero GSC lo reportaba como «descubierta sin indexar» y no está enlazado desde el hero.
- **Confianza:** el caso de EE. UU. (ECG Construction) no se muestra. No hay reseñas en inglés ni perfil de Clutch. «From 200 USD» transmite poco valor.
- **Acción:** solo hay WhatsApp y correo. Falta un botón para agendar llamada y un formulario con presupuesto o plazo.
- **Arreglos:** los descritos en H5. Prioridad máxima porque es el mercado con el ticket más alto.

### Perfil B: emprendedor con poco presupuesto
| Página | Relev. | Clar. | Conf. | Acción | Total |
|---|---|---|---|---|---|
| Inicio | 18 | 20 | 14 | 22 | **74** |
| Landing pages | 22 | 21 | 12 | 21 | **76** |

- **Relevancia:** «Landing desde $450.000 COP» se ve en el primer bloque de servicios y en el hero de la landing. Bien.
- **Confianza:** la landing no muestra testimonios. Los «Proyectos relacionados» (Aerolínea Santander, Causalidad Dinámica, GMX) no son landings de bajo presupuesto, y GMX es una plataforma. No queda claro quién paga el hosting y el dominio cada año («Configuración de dominio y hosting»).
- **Claridad:** la forma de pago (50 % / 50 %) solo aparece en la página de Cúcuta, no en la landing ni en el inicio.
- **Arreglos:**
  - Añadir a la landing una línea «Pago: 50 % al iniciar, 50 % al entregar».
  - Añadir «Costos anuales aparte: dominio ~$60.000–$150.000, hosting ~$X» (cifras propias).
  - Añadir 2 testimonios de clientes pequeños (Salón Brahneyker, Causalidad Dinámica).
  - Añadir 1 o 2 capturas de landings reales con el resultado obtenido (por ejemplo, «X consultas por WhatsApp en la primera semana»).

### Perfil C: dueño de pyme en Colombia
| Página | Relev. | Clar. | Conf. | Acción | Total |
|---|---|---|---|---|---|
| Inicio | 20 | 20 | 15 | 22 | **77** |
| Landing pages | 22 | 22 | 13 | 22 | **79** |

- **Fortalezas:** CTA de WhatsApp con mensaje prellenado por servicio, precios en COP, plazos (7 a 12 días) y lista de lo que incluye en el primer pantallazo. «Respuesta el mismo día» y «Todo a tu nombre» responden a objeciones reales.
- **Confianza:** son 6 testimonios propios sin enlace verificable (Google o Clutch). En schema no hay `aggregateRating`. Las cifras «23+ proyectos / 15+ empresas / 4+ países» no tienen respaldo visible.
- **Claridad del inicio:** el H1 («Tu negocio en internet, listo para vender.») no dice qué ni dónde. El dato concreto llega en el texto previo y en el subtítulo.
- **Arreglos:**
  - Añadir un bloque «4,9 ★ en Google (N reseñas)» con enlace al perfil de Google.
  - Poner los logos de los clientes junto a las cifras.
  - Cambiar el H1 como se indica en H1.
  - En la landing, sustituir GMX por una landing real en «Proyectos relacionados».

---

## 4. Wireframe SOLL resumido (solo prioridades; no se pidió wireframe completo)

**`/en` (perfil nearshore):**
- Texto previo: «Nearshore web development · Colombia · EST time zone».
- H1: «Custom websites and software, built by a nearshore team in Colombia».
- CTAs: [Book a 20-min call] [Chat on WhatsApp].
- Franja de confianza: ECG Construction (WA, USA) + GMX (México) + «Contracts & invoicing in USD».
- Paquetes en USD (Starter / Business / Custom), FAQ nearshore (zona horaria, idioma, pagos, propiedad del código).

**`/servicios/landing-pages`:**
- Debajo del hero: «Pago 50/50 · Dominio y hosting: lo que pagas cada año».
- Nuevo bloque «Landings que hicimos» (2 o 3 capturas con resultado).
- 2 testimonios antes de las preguntas frecuentes.

---

## 5. Prioridades (impacto / esfuerzo)

1. **(H1, CRÍTICA)** Perfiles en Clutch, GoodFirms, TechBehemoths y Semrush Agencies con reseñas, más un listado propio de agencias en Colombia. Impacto alto, esfuerzo medio.
2. **(H5, ALTA)** Paquete de confianza nearshore en `/en`: caso ECG, botón para agendar llamada, USD, zona horaria. Impacto alto, esfuerzo bajo.
3. **(H3, MEDIA)** Guía de precios con tabla de mercado (hazlo tú, freelance, agencia) y title con dato. Impacto medio-alto, esfuerzo bajo.
4. **(H6, MEDIA)** Señales locales en Cúcuta: «Diseño» en el title, mapa y dirección, reseñas de Google, schema `geo`/`hasMap`. Impacto medio, esfuerzo bajo.
5. **(H4, MEDIA)** Ampliar la comparativa de pasarelas (Bold, ePayco, tarifa por medio, calculadora y CTA a tienda). Impacto medio, esfuerzo medio.
6. **(H2, ALTA en volumen, baja en negocio)** Reorientar el artículo de API hacia el negocio y crear piezas de integración. Esfuerzo bajo.
7. **(H7, BAJA)** Sacar la paleta y el juego del HTML que entrega el servidor. Esfuerzo medio.

Habilidades relacionadas: `/seo local` (perfil de Google y Cúcuta), `/seo schema` (`aggregateRating`, `geo`, `hasMap`, `sameAs`), `/seo content` (E-E-A-T en la guía de precios y la de API).

---

## 6. Datos estructurados para audit-data.json (categoría Search Experience)

```json
{
  "category": "Search Experience",
  "sxo_gap_score": 65,
  "dimensions": {"page_type": 10, "content_depth": 9, "ux_signals": 11, "schema": 11, "media": 9, "authority": 6, "freshness": 9},
  "findings": [
    {"id": "SXO-1", "severity": "critical", "keyword": "agencia desarrollo web colombia", "url": "/", "issue": "SERP dominada por directorios (Clutch, GoodFirms, Semrush, TechBehemoths); el inicio es de un solo proveedor y no está listado en ellos", "fix": "Perfiles en directorios con reseñas, listado propio de agencias y H1 con la intención"},
    {"id": "SXO-2", "severity": "high", "keyword": "que es una api", "url": "/blog/que-es-una-api-y-para-que-sirve", "issue": "Intención informativa dominada por AWS/Oracle/Cloudflare/Xataka; 2.666 impresiones y 1 clic sin valor comercial", "fix": "Reorientar hacia la API en el negocio y crear piezas de integración (Wompi, WhatsApp, DIAN)"},
    {"id": "SXO-3", "severity": "medium", "keyword": "cuanto cuesta una pagina web en colombia", "url": "/blog/cuanto-cuesta-una-pagina-web-en-colombia", "issue": "Solo precios propios; la SERP premia rangos de mercado. La canibalización ya está resuelta con un 308", "fix": "Tabla de mercado por tipo de proveedor y title con dato de precio"},
    {"id": "SXO-4", "severity": "medium", "keyword": "wompi vs mercado pago", "url": "/blog/wompi-vs-mercado-pago-vs-payu-colombia", "issue": "548 palabras y 3 pasarelas frente a guías de 11 a 18", "fix": "Bold y ePayco, tarifa por medio de pago, calculadora y CTA a tienda virtual"},
    {"id": "SXO-5", "severity": "high", "persona": "nearshore EE. UU.", "url": "/en, /en/servicios/landing-pages", "issue": "Sin nearshore, zona horaria, agenda de llamada ni caso de EE. UU. visible; 'From 200 USD' resta credibilidad", "fix": "Hero nearshore, Cal.com, caso ECG Construction, paquetes en USD"},
    {"id": "SXO-6", "severity": "medium", "keyword": "diseño de paginas web cucuta", "url": "/desarrollo-web-cucuta", "issue": "Sin dirección, mapa, reseñas de Google ni 'diseño' en el title; el caso local es de la Universidad de Pamplona", "fix": "Title, mapa, perfil de Google, geo/hasMap y casos de Cúcuta"},
    {"id": "SXO-7", "severity": "low", "url": "todas", "issue": "Paleta de búsqueda, juego (H2) y carrusel triplicado en el HTML del servidor", "fix": "Cargarlos en cliente o sin encabezados"},
    {"id": "SXO-8", "severity": "low", "keyword": "gmx gaming / web hosting", "issue": "Tráfico navegacional o de proveedores; el hosting en inglés redirige al índice del blog", "fix": "No optimizar; redirigir a una página temática o devolver 410"}
  ],
  "personas": {
    "pyme_colombia": {"home": 77, "landing_pages": 79},
    "emprendedor_bajo_presupuesto": {"home": 74, "landing_pages": 76},
    "nearshore_eeuu": {"home_en": 46, "landing_pages_en": 49}
  }
}
```

---

## 7. Limitaciones

- **La SERP no es de Google.** La herramienta WebSearch usa otro índice, de EE. UU. No muestra el paquete local, anuncios, la sección "Otras preguntas de los usuarios" (PAA), AI Overview ni fragmentos destacados. Para "diseño de paginas web cucuta" devolvió sobre todo tesis académicas, así que el tipo dominante en Google para esa consulta no se pudo verificar. Para "wompi vs mercado pago" la consulta literal dio comparadores automáticos, por lo que se usó también una variante en español.
- **Render:** Playwright falló contra `localhost:3123` (`net::ERR_FAILED`). Se analizó el HTML del servidor (`raw_content`). El sitio no es una SPA (`is_spa: false`), así que el contenido es representativo, pero no se evaluó el primer pantallazo visual, el comportamiento en móvil ni los Core Web Vitals.
- El conteo de palabras del parser incluye la paleta de búsqueda y el pie de página. Para la profundidad se usó el contador del propio artículo.
- No hay datos de GSC posteriores al 2026-10-24 ni de conversiones (clics en WhatsApp). Tampoco se pudieron revisar el perfil de Google, las reseñas externas ni las posiciones reales por país.
- El precio del hosting y la ubicación del evento de la Universidad de Pamplona deben confirmarse con el negocio.

¿Quieres un informe en PDF? Usa `/seo google report`.
