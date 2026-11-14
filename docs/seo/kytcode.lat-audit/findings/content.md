# Calidad de contenido: www.kytcode.lat

Fecha: 14 de noviembre de 2026. Las páginas se leyeron en el build de producción local (http://localhost:3123), que tiene el mismo código desplegado, y se cruzaron con el código fuente en `src/`. Las redirecciones se comprobaron también en el sitio real. Marco usado: Quality Rater Guidelines de Google (versión del 11 de septiembre de 2025).

## Puntaje

| Métrica | Puntaje |
|---|---|
| **Calidad de contenido (global)** | **60 / 100** |
| E-E-A-T ponderado | 55 / 100 |
| Preparación para citas de IA | 72 / 100 |
| Legibilidad (Fernández-Huerta) | 61-80: fácil o bastante fácil (bien) |
| Metadatos plantillados (heurística) | `site_risk: low`, `templated_ratio: 0.0`, `shared_cta_phrases: {}` |

### Desglose E-E-A-T (pesos internos de esta skill, no de Google)

| Factor | Peso | Puntaje | Motivo |
|---|---|---|---|
| Experiencia | 20% | 55 | Hay 25 proyectos reales con nombre, sitio en vivo y PageSpeed antes y después, y un caso local (Olimpiadas de Robótica UP). Pero el texto "El reto" de los casos es plantilla, no se muestra ningún resultado de negocio y los "casos de uso reales" del blog son genéricos. |
| Pericia | 25% | 55 | Hay página de autor y Person en el schema. Pero no hay credenciales, años de experiencia ni `sameAs` (LinkedIn o GitHub), y un solo autor firma 49 artículos sobre temas muy distintos (IA, pagos, impuestos, Ads). Además hay errores de hecho en las franjas horarias. |
| Autoridad | 25% | 40 | Empresa fundada en 2025, sin menciones externas, sin perfil de Google o Clutch enlazado y sin `aggregateRating` verificable. Sí cita fuentes oficiales en los artículos. |
| Confianza | 30% | 68 | Precios públicos, teléfono, correo, ciudad, reseñas con nombre y cargo, y fechas de publicación y actualización visibles. Pero no hay razón social ni NIT, la política de privacidad tiene 148 palabras y en inglés se afirma "incorporated company" sin probarlo. |

Cálculo: 0,20×55 + 0,25×55 + 0,25×40 + 0,30×68 = **55**.

## Qué funciona

- **Precios transparentes y coherentes** en el inicio, /precios, los servicios, las ciudades y el blog (landing desde $450.000, tienda desde $1.300.000, corporativo desde $2.500.000, software desde $4.500.000 COP, Ads desde $450.000 al mes). Incluye un cotizador y moneda por país. Es una señal fuerte de confianza.
- **Formato listo para que la IA lo cite.** Cada artículo abre con un bloque "En resumen" de 3 o 4 frases que se pueden citar, tiene tablas con `<caption>`, preguntas frecuentes, un bloque de "Fuentes" con enlaces oficiales (wompi.com, mercadopago.com.co, corporate.payu.com, dian.gov.co, sic.gov.co, developer.mozilla.org) y fechas `<time>` de publicación y actualización.
  - Ejemplo: /blog/wompi-vs-mercado-pago-vs-payu-colombia dice "Tarifas revisadas el 9 de noviembre de 2026", y los cálculos de la tabla sobre una venta de $200.000 son correctos.
- **Legibilidad buena**: entre 8 y 12 palabras por frase y un índice Fernández-Huerta de 61 a 80, adecuado para dueños de pymes.
- **Autoría visible**: "Por Keyner Trillos" con enlace a /autores/keyner-trillos, Person con `jobTitle`/`worksFor`/`knowsAbout`, y una página de autor que lista sus artículos y proyectos.
- **Prueba social real**: 6 reseñas con nombre, cargo y empresa enlazadas a su caso; 25 casos en /proyectos con el sitio en vivo; métricas medibles ("Carga de 4.9 s a 0.59 s", "PageSpeed 32 → 97").
- **Las ciudades no son clones puros**: la similitud entre páginas (5-gramas) es de 0,21 a 0,40, salvo Bogotá–Medellín. Cúcuta tiene un caso local con su descargo ("no implica un aval institucional").
- **Canibalización ya corregida**: varios artículos que competían entre sí se fusionaron con redirecciones 308. /blog/chatbot-vs-agente-ia → /blog/agentes-ia-empresas-colombia (comprobado en producción). Se retiraron más de 40 URL /en sin demanda.

## Hallazgos

### ALTA

**C1. Los casos de estudio usan un texto plantilla y no muestran resultados de negocio** (afecta a Experiencia)
- Evidencia: el bloque "El reto" es idéntico en los casos revisados; solo cambian el nombre y el sector.
  - /proyectos/telas-real: "Telas Real necesitaba una presencia digital propia para su negocio de telas premium b2b: rápida, fácil de administrar y pensada para convertir visitas en clientes. Una plantilla no iba a reflejar su marca…"
  - El mismo texto aparece en /proyectos/gmx-gaming, /casa-medina, /motofox, /qvareli y /kailab.
- Evidencia: "Resultados" solo trae PageSpeed, LCP, número de páginas y semanas. Casa Medina, Motofox y KAILAB no tienen ni eso. Ningún caso muestra leads, ventas, conversión, CPA ni ROAS.
- Por qué importa: es la marca de "estructura repetitiva entre páginas" que las QRG asocian a contenido de bajo esfuerzo. Además, un sitio que critica las plantillas tiene casos escritos con plantilla.
- Arreglo:
  - Reescribir "El reto" de cada caso con el problema concreto del cliente. Ejemplo para Telas Real: "WordPress tardaba X s, los vendedores cotizaban 850 referencias a mano por WhatsApp".
  - Añadir 1 o 2 métricas de negocio con el periodo medido: solicitudes de cotización por mes antes y después, pedidos, ventas en campaña.
  - Si el cliente no autoriza cifras, usar rangos o porcentajes.
  - Prioridad: Telas Real, GMX Gaming y Olimpiadas UP, que se enlazan desde el inicio y desde Cúcuta.

**C2. Errores de hecho en las franjas horarias de México y EE. UU.** (afecta a Confianza; QRG: inexactitudes)
- Evidencia en /desarrollo-web-mexico (fuente: `src/content/landings/countries.ts:39`): "Ciudad de México y Colombia comparten la hora (UTC−6 y UTC−5) la mayor parte del año".
  - Es falso. México eliminó el horario de verano en 2022, así que CDMX está todo el año en UTC−6 y Colombia en UTC−5: siempre hay 1 hora de diferencia. El propio texto da dos UTC distintos.
- Evidencia en `countries.ts:66` (página de EE. UU.): "Colombia (UTC−5) coincide con la hora de Miami y Nueva York gran parte del año, y está a una o dos horas de Chicago y Houston".
  - Colombia solo coincide con Nueva York en invierno (noviembre a marzo, unos 4 meses). Con Chicago y Houston la diferencia es de 0 a 1 hora, no de 1 a 2.
- Arreglo:
  - México: "Colombia va una hora adelante de Ciudad de México todo el año; nuestra jornada cubre tu horario laboral".
  - EE. UU.: "Misma hora que Nueva York y Miami de noviembre a marzo y una hora menos el resto del año; misma hora que Chicago y Houston de marzo a noviembre".
  - Corregir también la versión `en`.

**C3. La guía principal de precios solo muestra la tarifa propia y no el mercado** (afecta a la utilidad y al CTR bajo)
- Evidencia: /blog/cuanto-cuesta-una-pagina-web-en-colombia (8 min, destacada, con muchas impresiones). Los cuatro rangos son los de K&T: "Estos son los valores de partida con los que trabajamos en 2026".
  - No compara con el mercado (freelance, agencia, constructores como Wix o Shopify).
  - No da cifras de los costos extra: "Dominio: se renueva cada año. Un .com o un .co tienen precios distintos", sin ningún valor.
- Por qué importa: quien busca "cuánto cuesta una página web en Colombia" quiere un rango del mercado. Encuentra una lista de precios de un proveedor, y eso explica en parte el CTR y la satisfacción bajos frente a guías neutrales.
- Arreglo:
  - Añadir una tabla de "rangos del mercado colombiano 2026" por tipo de proveedor (constructor, freelance, agencia, a medida), con su fuente o metodología: "cotizaciones revisadas", "N proyectos propios".
  - Dar cifras para el dominio (.co, .com.co, .com), el hosting, el correo y el mantenimiento en COP.
  - Mostrar la distribución real de lo que pagaron sus clientes. Ejemplo: "el 70% de nuestras landings 2025-2026 costaron entre X e Y".
  - Ver también C9, sobre un enlace con texto engañoso en esta página.

**C4. Los artículos del blog se quedan cortos y prometen más de lo que dan** (contenido delgado)
- Evidencia: el contador del propio sitio da 548 palabras al artículo de Wompi, 612 al de remarketing, 891 al de API, 999 al de precios Colombia, 1.109 al de agentes de IA y 475 al de /en/blog/agencia-vs-freelance-desarrollo-web. Todos están por debajo de 1.500.
- Evidencia en Wompi: el título promete "tiempos de abono y retenciones", pero la sección de retenciones son 2 frases ("Consulta con tu contador"). Recomienda Bold sin compararlo en la tabla.
- Evidencia en remarketing: no menciona el tamaño mínimo de públicos, las ventanas de días, iOS/ATT ni el Consent Mode, ni las listas de clientes (Customer Match). Afirma "Suele ser de las campañas más rentables" sin dato. Tiene 3 bloques promocionales en 612 palabras.
- Evidencia en agentes de IA: la sección "Casos de uso reales en Colombia" solo describe capacidades genéricas ("Calificación y cierre de ventas en WhatsApp…"), sin ningún cliente ni cifra.
- Contexto: el antiguo /blog/chatbot-vs-agente-ia, que quedó "rastreada sin indexar", ya redirige aquí. Si la página de destino sigue sin un caso real, puede repetir el problema.
- Arreglo:
  - Ampliar cada artículo con datos propios (un caso de K&T, una captura o una cifra), no con relleno.
  - Wompi: tabla de retenciones (porcentajes de ReteFuente, ReteICA y ReteIVA y cuándo aplican), tiempos reales de abono por pasarela y una columna para Bold.
  - Agentes: cambiar el H2 a "Casos de uso típicos" o añadir un caso real implementado con resultados.
  - Remarketing: añadir requisitos técnicos y legales (Ley 1581 y cookies) y una campaña de ejemplo con métricas.

**C5. Las páginas /en tienen poca razón para indexarse** (Search Console: "rastreadas sin indexar")
- Evidencia: /en/blog/agencia-vs-freelance-desarrollo-web tiene 475 palabras. Es una traducción con intención colombiana ("Freelancer vs. agency in Colombia"), su tabla comparativa se titula "Agency (K&T Code)" y no cita fuentes.
- Evidencia: sus enlaces "Bogotá / Medellín / Cúcuta" van a /en/desarrollo-web-bogota, que redirige con 308 a /en/servicios. El lector y Google llegan a una página genérica.
- Evidencia: los slugs están en español en las URL en inglés.
- Arreglo:
  - Mantener en /en solo los temas con demanda en inglés (nearshore, pequeño negocio en EE. UU., costos Colombia/LatAm para compradores de EE. UU.) y ampliarlos con contenido pensado para ese lector: contratos en USD, impuestos W-8BEN, horarios, casos con clientes de EE. UU. o México.
  - Para las traducciones de temas locales colombianos (agencia vs. freelance, Excel vs. ERP), poner `noindex` o redirigir a la versión en español.
  - Quitar los enlaces internos que apuntan a URL redirigidas.

### MEDIA

**C6. La autoría tiene poca profundidad**
- Evidencia: /autores/keyner-trillos tiene una biografía de 2 frases ("Dirige la arquitectura de cada proyecto, la estrategia de SEO y GEO y las campañas…"), sin formación, años de experiencia, certificaciones (Meta Blueprint, Google Ads), foto con contexto ni enlaces externos.
- Evidencia: en el JSON-LD, Person no tiene `sameAs`. Se lo presenta como "Cofundador", pero el otro cofundador ("K&T") no aparece en ningún sitio.
- Evidencia: firma 49 artículos sobre impuestos, pagos, IA y Ads. Los temas con matiz YMYL (retenciones DIAN, Ley 1581) no tienen revisor.
- Arreglo:
  - Biografía de 150 a 250 palabras con trayectoria, proyectos dirigidos y certificaciones verificables.
  - `sameAs` hacia LinkedIn y GitHub.
  - Nombrar al segundo socio o dejar de decir "cofundador".
  - En artículos fiscales o legales, añadir "Revisado por [contador/abogado]" con su página.

**C7. Faltan la identidad legal y una política de datos completa**
- Evidencia: /politica-de-privacidad tiene 148 palabras y no dice quién es el responsable del tratamiento (razón social, NIT, dirección), algo que exige la Ley 1581.
- Evidencia: el pie de página tiene correo, teléfono y ciudad, pero no NIT ni términos.
- Evidencia: en inglés se afirma "We are an incorporated company: contract, electronic invoicing" sin dato que lo respalde. /nosotros muestra a una sola persona, mientras el texto promete "a design, development and SEO team".
- Arreglo:
  - Publicar la razón social y el NIT (pie de página y /nosotros), una política de tratamiento de datos completa y términos del servicio.
  - Poner `legalName`/`taxID` en el schema Organization.
  - Mostrar al equipo real (aunque sean 2 o 3 personas) o ajustar el texto.

**C8. Las páginas de servicio se quedan cortas y una tiene un proceso equivocado**
- Evidencia: /servicios/software-a-medida tiene unas 510 palabras en el contenido principal, /landing-pages unas 530 y /tiendas-virtuales unas 545, frente al mínimo orientativo de 800.
- Evidencia: /servicios/administracion-de-ads muestra el bloque "Cómo trabajamos: Descubrimiento, Diseño, Desarrollo, Calidad y velocidad, Lanzamiento", que es el proceso de desarrollo web, no el de pauta. Tampoco tiene ningún caso de Ads con resultados (CPA, mensajes, ROAS).
- Arreglo:
  - Sustituir el proceso genérico en Ads por el suyo propio (diagnóstico, estrategia, lanzamiento, optimización semanal, reporte), que ya aparece en el cuerpo de la página.
  - Añadir un caso de pauta con cifras.
  - En cada servicio, sumar un mini caso con resultado y una sección de "qué no incluye y cuándo no te conviene".

**C9. 12 de 21 meta descripciones se cortan con "…" y pierden el gancho de precio** (afecta al CTR)
- Evidencia: `src/lib/seo.ts:20` corta a 158 caracteres.
  - /servicios/landing-pages: "…WhatsApp integrado. Desde $450.000…"
  - /blog/cuanto-cuesta-una-pagina-web-en-colombia: "…una calculadora en tu…"
  - Ciudades: "…SEO local. Landing…"
  - Además, las descripciones de ciudad son una sola frase plantilla con la variable de ciudad (`cities.ts:167`).
- Evidencia: títulos genéricos sin propuesta de valor: "Precios · K&T Code" (18 caracteres), "Nosotros · K&T Code", "Blog · K&T Code".
- La heurística `metadata_template.py` no detecta un CTA compartido (riesgo bajo), así que esto es un tema de CTR, no de spam.
- Arreglo:
  - Escribir descripciones de 140 a 155 caracteres que no necesiten corte, con el precio al principio. Ejemplo: "Landing pages desde $450.000 COP, entrega en 7-12 días…".
  - Darle a cada ciudad un dato propio en la descripción (un caso local o un sector).
  - Títulos con intención: "Precios de páginas web en Colombia 2026: desde $450.000 COP | K&T Code".

**C10. Bogotá y Medellín se parecen demasiado; México no tiene casos propios**
- Evidencia: la similitud (5-gramas, con el nombre de la ciudad neutralizado) es 0,58 entre Bogotá y Medellín, frente a 0,21 a 0,40 en los demás pares.
- Evidencia: Bogotá lista 6 proyectos solo por nombre y no tiene una sección de caso como Cúcuta. México solo cita GMX Gaming.
- Arreglo:
  - Añadir a Bogotá y Medellín un bloque "Un proyecto en [ciudad]" con reto, solución y resultado (CXellence Group, Telas Real) y una pregunta frecuente local de verdad (por ejemplo, ICA de Bogotá en la facturación).
  - En México: precios en MXN dentro del texto, CFDI y facturación, y cómo funciona el contrato transfronterizo.

### BAJA

- **C11. Tiempos de lectura inflados.** Wompi dice "6 min de lectura · 548 palabras" y /en agency "6 min read · 475 words". A unas 200 palabras por minuto serían 3 minutos. Arreglo: calcular `minutes` a partir del conteo de palabras en lugar de fijarlo en `meta.ts`.
- **C12. Enlace con texto engañoso.** En la guía de precios Colombia, "revisa la guía de precio de una página web en Colombia" enlaza a /precios (`cuanto-cuesta-una-pagina-web-en-colombia.ts:88`), que es el resto de la fusión anterior. Arreglo: quitar la frase o enlazar a /blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026 con un texto exacto.
- **C13. El carrusel de reseñas se repite 3 o 4 veces en el DOM** del inicio y de /nosotros. Infla el texto rastreable con fragmentos truncados ("todo lo que i…"). Un testimonio arrastra un asterisco suelto ("un plus: *todo lo que imaginas"). Arreglo: renderizar la cinta duplicada con `aria-hidden` y sin texto (CSS), y limpiar el asterisco. Dejar las faltas de ortografía de los clientes es aceptable y suma autenticidad.
- **C14. Contadores decorativos** como "♥ 8472 +1 cliente nuevo" en las tarjetas del blog. Están `aria-hidden`, pero los extractores de texto los leen como métricas. Arreglo: dibujarlos con CSS o canvas, o marcarlos `data-nosnippet`.
- **C15. Vertical sensible en el portafolio.** KAILAB ("tienda de péptidos para investigación") se usa dos veces como ejemplo de pagos con Wompi. Conviene revisar que el caso no comprometa la reputación ni el cumplimiento de la pasarela.

## Preparación para citas de IA: 72/100

- A favor:
  - Resúmenes iniciales autocontenidos.
  - Preguntas frecuentes con respuestas de 1 a 2 frases y cifras (precio, plazo).
  - Tablas con caption.
  - Fecha de actualización explícita.
  - Fuentes oficiales.
  - Entidades consistentes (K&T Code, Cúcuta, precios).
- En contra:
  - Pocos datos propios y únicos que valga la pena citar: no hay estadísticas de clientes, benchmarks ni encuestas.
  - Afirmaciones sin fuente ("de las campañas más rentables").
  - Errores de hecho (C2) que un motor de IA podría reproducir.
  - Un solo autor sin presencia externa, lo que reduce la probabilidad de ser elegido como fuente.
- Palanca principal: publicar 1 o 2 activos de datos propios (por ejemplo, "Velocidad media de 25 sitios de pymes colombianas antes y después" usando los PageSpeed que ya miden) y citarlos desde los casos y los artículos.

## Mínimos de palabras (piso orientativo, no factor de ranking)

| Página | Palabras (contenido principal aprox.) | Piso | Estado |
|---|---|---|---|
| Inicio | ~1.300 (incluye la cinta de reseñas duplicada) | 500 | OK |
| /servicios/software-a-medida · /landing-pages · /tiendas-virtuales | 510 a 545 | 800 | Corto |
| /servicios/administracion-de-ads | ~775 | 800 | Límite |
| /desarrollo-web-cucuta · bogota · mexico | 900 · 600 · 670 | 500-600 | OK |
| Blog (6 artículos ES y 2 EN) | 475 a 1.109 | 1.500 | Corto en todos |

## Datos estructurados para audit-data.json (Content Quality)

```json
{
  "category": "Content Quality",
  "score": 60,
  "eeat": {"experience": 55, "expertise": 55, "authoritativeness": 40, "trustworthiness": 68, "weighted": 55},
  "ai_citation_readiness": 72,
  "metadata_template": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {}},
  "findings": [
    {"id": "C1", "severity": "high", "title": "Casos de estudio con texto plantilla y sin resultados de negocio", "url": "/proyectos/telas-real"},
    {"id": "C2", "severity": "high", "title": "Errores de hecho en franjas horarias México/EE. UU.", "url": "/desarrollo-web-mexico"},
    {"id": "C3", "severity": "high", "title": "Guía de precios con solo tarifa propia, sin rangos de mercado", "url": "/blog/cuanto-cuesta-una-pagina-web-en-colombia"},
    {"id": "C4", "severity": "high", "title": "Artículos cortos que no cumplen lo que promete el título", "url": "/blog/wompi-vs-mercado-pago-vs-payu-colombia"},
    {"id": "C5", "severity": "high", "title": "Páginas /en con poco valor propio (rastreadas sin indexar)", "url": "/en/blog/agencia-vs-freelance-desarrollo-web"},
    {"id": "C6", "severity": "medium", "title": "Página de autor sin credenciales ni sameAs", "url": "/autores/keyner-trillos"},
    {"id": "C7", "severity": "medium", "title": "Sin razón social/NIT; política de privacidad de 148 palabras", "url": "/politica-de-privacidad"},
    {"id": "C8", "severity": "medium", "title": "Servicios cortos; Ads con proceso de desarrollo web", "url": "/servicios/administracion-de-ads"},
    {"id": "C9", "severity": "medium", "title": "12/21 meta descripciones cortadas con '…'; títulos genéricos", "url": "/precios"},
    {"id": "C10", "severity": "medium", "title": "Bogotá y Medellín con similitud de 0,58; sin caso local", "url": "/desarrollo-web-bogota"},
    {"id": "C11", "severity": "low", "title": "Tiempos de lectura inflados", "url": "/blog/wompi-vs-mercado-pago-vs-payu-colombia"},
    {"id": "C12", "severity": "low", "title": "Enlace 'guía de precio' apunta a /precios", "url": "/blog/cuanto-cuesta-una-pagina-web-en-colombia"},
    {"id": "C13", "severity": "low", "title": "Reseñas duplicadas en el DOM", "url": "/"},
    {"id": "C14", "severity": "low", "title": "Contadores decorativos leídos como métricas", "url": "/blog"},
    {"id": "C15", "severity": "low", "title": "Vertical sensible (péptidos) usado como ejemplo", "url": "/proyectos/kailab"}
  ]
}
```
