# Auditoría de datos estructurados: kytcode.lat

Fecha: 2026-11-14. Alcance: 13 páginas, build local (localhost:3123) y comprobación del sitio real (misma cantidad de bloques JSON-LD en `/` y en el blog). Código revisado: `src/lib/schema.ts`, `src/lib/landing-page.tsx`, `src/lib/site.ts`.

## Puntaje: 76 / 100

| Área | Puntos |
|---|---|
| Validez técnica (JSON válido, @context https, URLs absolutas, @id coherentes) | 25/25 |
| Organization / entidad (sameAs, logo, alternateName) | 16/20 |
| LocalBusiness (dirección completa, teléfono) | 8/15 |
| Service / Offer | 10/15 |
| Article / Person (E-E-A-T) | 10/12 |
| Breadcrumb, WebSite | 7/8 |
| Oportunidades aprovechadas | 0/5 |

## Detección

- Solo JSON-LD, 2 bloques `application/ld+json` por página; no hay Microdata ni RDFa. Todos los bloques parsean como JSON válido.
- Bloque global `@graph`: LocalBusiness (`/#organization`), WebSite (`/#website`), Person (`/#keyner-trillos`) en las 13 páginas.
- Bloque por página:

| Página | Nodos |
|---|---|
| `/`, `/en` | FAQPage + ItemList (proyectos) |
| `/nosotros` | BreadcrumbList, AboutPage |
| `/servicios` | BreadcrumbList, ItemList (servicios) |
| `/servicios/landing-pages`, `/servicios/administracion-de-ads`, `/desarrollo-web-cucuta`, `/desarrollo-web-mexico` | BreadcrumbList, WebPage, Service, FAQPage |
| `/precios` | BreadcrumbList, FAQPage, OfferCatalog |
| `/proyectos/gmx-gaming` | BreadcrumbList, CreativeWork |
| `/blog/que-es-una-api-y-para-que-sirve` | BreadcrumbList, BlogPosting, FAQPage |
| `/autores/keyner-trillos` | BreadcrumbList, ProfilePage |
| `/preguntas-frecuentes` | BreadcrumbList, FAQPage |

- Review / AggregateRating: 0 apariciones en las 13 páginas. Sin riesgo de autovaloración.

## Qué funciona

- `@context` es `https://schema.org`; las URLs son absolutas y las fechas ISO 8601.
- Los @id son estables y coherentes entre páginas: Organization, WebSite y Person se referencian por `@id` (publisher, provider, founder, worksFor, author). En `/en` la Person sigue usando el mismo @id y apunta a la URL `/en/autores/...`.
- Organization: `alternateName` (6 variantes), `logo` (PNG 964x512, responde 200), `sameAs` (Instagram, TikTok, Facebook), `contactPoint`, `founder`, `knowsAbout`. `image` og.png 1200x630 válida.
- BlogPosting completo: headline, author (Person con url), datePublished, dateModified, image (PNG 1200x630, responde 200), publisher, `citation`, `wordCount`. Cumple lo exigido por Google.
- Service con `provider`, `areaServed` (City anidada para Cúcuta) y `offers`.
- BreadcrumbList correcto (position, name, item absoluto) en 12 de 13 páginas; la home no lo necesita.
- Person enlazada a ProfilePage (`/autores/...`), buena señal de autoría.
- Sin tipos obsoletos (HowTo, SpecialAnnouncement, etc.).

## Hallazgos

### Alto

**H1. LocalBusiness sin dirección de calle ni geo; el tipo no es el más preciso.** (`schema.ts` L17, L33-38)
Evidencia: `address` solo trae `addressLocality`, `addressRegion` y `addressCountry`. No hay `streetAddress`, `postalCode`, `geo`, `openingHoursSpecification` ni `hasMap`. Google marca `address` como requerida para LocalBusiness y, sin calle, no hay elegibilidad de negocio local fiable. Si el negocio es remoto o sin oficina abierta al público, es mejor declararlo.
Acción: o bien (a) añadir `streetAddress`/`postalCode`/`geo`/horario si existe oficina física verificable, o bien (b) usar `["Organization","ProfessionalService"]` y mantener solo ciudad, con `areaServed`. No inventar una dirección. Ver JSON-LD propuesto A.

**H2. Precio de la ciudad de Cúcuta incoherente con el contenido.** (`landing-page.tsx` L49-53)
Evidencia: `/desarrollo-web-cucuta` declara `offers.price: 2500000` (Sitio Corporativo) mientras su descripción dice "Landing desde $450.000 COP". Es un desajuste entre schema y contenido visible, que Google puede tratar como marcado engañoso.
Acción: `price`/`minPrice` debe coincidir con lo que dice la página (450000 si destaca la landing) o usar `AggregateOffer` con `lowPrice`/`highPrice`. Ver B.

### Medio

**H3. Ofertas "desde" tratadas como precio exacto.** Evidencia: `Offer.price: 450000` junto a `priceSpecification.minPrice` (redundante). El precio es un mínimo. Usar `price` + `priceSpecification` de tipo `UnitPriceSpecification` con `minPrice` o `AggregateOffer(lowPrice)`; mantener solo una forma. Faltan además `url` en las ofertas de Service y `priceValidUntil` es opcional. `availability: InStock` en un servicio es innecesario (inofensivo).

**H4. OfferCatalog en `/precios` con Offers sin `price` ni `itemOffered`.** Evidencia: cada Offer solo tiene `priceSpecification.minPrice`; sin `itemOffered` Service. Valor bajo para Google, pero parcial. Alinear con H3 y añadir `itemOffered` con `@id` al Service de cada página (`/servicios/...#service`).

**H5. FAQPage en 9 de 13 páginas (`/`, `/en`, 4 landings, `/precios`, blog, `/preguntas-frecuentes`).**
Evidencia: `faqPage()` en `schema.ts` L105 y `landing-page.tsx` L87. Desde el 7 de mayo de 2026 Google no muestra resultados enriquecidos de FAQ en ningún sitio (no solo gobierno/salud). No penaliza, así que es prioridad Info: sin beneficio en SERP; cualquier beneficio en IA/GEO no está confirmado. Mantener es opcional (coste bajo, el contenido FAQ visible sí sirve al usuario). No añadirlo a páginas nuevas por motivos de SERP. Si hay páginas con preguntas reales de usuarios, usar QAPage.

### Bajo

**H6. Person sin `sameAs`.** Evidencia: el nodo Person no tiene perfiles externos (LinkedIn, GitHub, Instagram personal). Es la mejora más barata para E-E-A-T y desambiguación de entidad. Ver C.

**H7. `dateModified` y `datePublished` solo con fecha (`2026-10-26`).** Válido, pero se recomienda fecha y hora con zona (`2026-10-26T09:00:00-05:00`). Para `CreativeWork`, `dateCreated: "2026-09"` es un ISO 8601 parcial; válido pero poco habitual.

**H8. Referencia a `Blog` (`/blog#blog`) sin definir.** `isPartOf` apunta a un `@id` que ningún nodo declara; inocuo, pero conviene emitir un nodo Blog (o quitar el tipo y dejar solo la URL).

**H9. Author duplica datos.** BlogPosting.author lleva `@id` más `name`/`url` en línea, y en `/autores/...` la Person aparece dos veces (en `ProfilePage.mainEntity` por referencia y en el grafo global). Mismo `@id`, sin conflicto; solo ruido.

**H10. Dos bloques JSON-LD por página** (global + página). Válido; unificar en un solo `@graph` simplifica la depuración. Prioridad baja.

**H11. `speakable` con `cssSelector` `h1`/`header p` genérico.** Google solo lo soporta en noticias (EN, EE. UU.); sin efecto. Mantener o retirar.

**H12. `foundingDate: "2025"`** es válido (ISO año). `priceRange: "$$"` es genérico; mejor un rango real ("COP 450.000 - 4.500.000+").

**H13. Org.`logo` es `logo-black.png` (PNG RGBA).** Si el fondo es transparente, en resultados con fondo oscuro puede perderse. Comprobar contraste; Google pide mínimo 112x112 (cumple).

## Oportunidades con mejor retorno

1. Resolver H1 (dirección real o ProfessionalService): impacto directo en entidad local.
2. Corregir H2/H3 (coherencia de precios) para evitar riesgo de marcado no coincidente.
3. `sameAs` en Person (H6) y, si existen, LinkedIn/GitHub/Google Business Profile en la Organization.
4. `WebSite` con `SearchAction` no aplica (no hay buscador): no añadir.
5. `Review`/`AggregateRating`: no añadir autoproclamadas. Solo con reseñas verificables de terceros (Google Business Profile, Clutch) y visibles en la página, y nunca sobre la propia Organization desde su sitio.
6. `Blog` / `CollectionPage` para `/blog` y `/proyectos`; `WebPage` para la home (hoy solo hay FAQPage+ItemList).
7. `ImageObject` para logo con `width`/`height` y `inLanguage` en la Organization de `/en`.

## JSON-LD propuesto

### A. Organization / ProfessionalService (versión sin dirección de calle, la segura)
Si hay oficina verificable, añadir `streetAddress`, `postalCode`, `geo` y `openingHoursSpecification` con datos reales.
```json
{
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://www.kytcode.lat/#organization",
  "name": "K&T Code",
  "url": "https://www.kytcode.lat",
  "logo": { "@type": "ImageObject", "url": "https://www.kytcode.lat/brand/logo-black.png", "width": 964, "height": 512 },
  "telephone": "+57-311-636-0057",
  "email": "contacto@kytcode.lat",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "San José de Cúcuta",
    "addressRegion": "Norte de Santander",
    "postalCode": "<CÓDIGO POSTAL REAL, solo si se muestra públicamente>",
    "addressCountry": "CO"
  },
  "priceRange": "COP 450.000 - 4.500.000+",
  "sameAs": [
    "https://www.instagram.com/kytcode/",
    "https://www.tiktok.com/@kytcode",
    "https://www.facebook.com/KTSolutionsWeb"
  ]
}
```
(Los demás campos actuales se conservan. Eliminar la línea `postalCode` si no hay un valor real; no usar marcadores.)

### B. Service de Cúcuta con oferta coherente
```json
{
  "@type": "Service",
  "@id": "https://www.kytcode.lat/desarrollo-web-cucuta#service",
  "name": "Desarrollo de páginas web en Cúcuta",
  "provider": { "@id": "https://www.kytcode.lat/#organization" },
  "areaServed": { "@type": "City", "name": "Cúcuta" },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "COP",
    "lowPrice": 450000,
    "highPrice": 4500000,
    "offerCount": 4,
    "url": "https://www.kytcode.lat/precios"
  }
}
```
`highPrice` es "desde" del plan más caro; si se prefiere no sugerir un tope, declarar solo `lowPrice` y mantenerlo igual al texto visible.

### C. Person con sameAs
```json
{
  "@type": "Person",
  "@id": "https://www.kytcode.lat/#keyner-trillos",
  "name": "Keyner Trillos",
  "sameAs": [
    "<URL REAL de LinkedIn>",
    "<URL REAL de GitHub>"
  ]
}
```
Rellenar solo con perfiles reales; si no existen, omitir el campo.

### D. Nodo Blog declarado
```json
{
  "@type": "Blog",
  "@id": "https://www.kytcode.lat/blog#blog",
  "url": "https://www.kytcode.lat/blog",
  "name": "Blog de K&T Code",
  "publisher": { "@id": "https://www.kytcode.lat/#organization" }
}
```

## Resumen de severidades
Crítico: 0. Alto: 2 (H1, H2). Medio: 3 (H3-H5, H5 como Info). Bajo: 8.
