# Registro de mejoras de www.kytcode.lat

Lo más nuevo arriba. Formato: fecha · mejora · archivos · cómo se verificó · resultado (antes → después si hay medición).

## 2026-11-19 · H1 del inicio con los servicios (páginas web y publicidad)

- Qué: el H1 del inicio pasa a ser «Agencia de páginas web y publicidad digital · Cúcuta, Colombia» (antes el lema «Tu negocio en internet, listo para vender.», que se sigue viendo igual como párrafo). Título «K&T Code · Páginas web y publicidad digital en Colombia», descripción con la pauta en Meta, Google y TikTok, y H2 de servicios «Páginas web, software y publicidad». Igual en /en.
- Verificación: un solo H1; capturas en 1440 y 390 px sin errores; Lighthouse inicio accesibilidad/SEO 100 y agentes 3/3. En vivo, el clic en «Cotizar por WhatsApp» llega a GA4 como `whatsapp_click`.
- Pendiente del dueño: píxel de Meta (`NEXT_PUBLIC_META_PIXEL_ID` en Vercel) y marcar `generate_lead` y `whatsapp_click` como eventos clave en GA4.

## 2026-11-19 · Auditoría SEO, GEO y AEO

- Qué: 4 enlaces internos en inglés que redirigían, texto en español en /en de EE. UU. y Perú (medios de pago), 34 títulos recortados, 21 descripciones completas (ninguna con «…»), «#» fuera del texto de los H2 del blog, monto aleatorio de las portadas fuera del HTML legible (`data-nosnippet`), h2 de planes en /precios y nombres accesibles con el texto visible (selector de país, WhatsApp, A−/A+).
- Archivos: `src/content/landings/{countries,cities,services,industries}.ts`, `src/content/blog/meta*.ts`, `src/lib/seo.ts`, componentes del blog, precios y shell. Detalle en `docs/seo/auditoria-2026-11-19.md`.
- Verificación: typecheck y build limpios; rastreo de las 157 URL del sitemap (200, 0 redirecciones internas, JSON-LD válido); Lighthouse móvil en 9 páginas; capturas en 1440 y 390 px.
- Resultado: accesibilidad de /precios 98 → 100; `label-content-name-mismatch` 9 páginas → 0; títulos de más de 65 caracteres 58 → 26; descripciones cortadas 19 → 0; inicio 88 → 88 (sin regresión); agentes 3/3 en todas.

## 2026-11-16 · Página de servicio «Chatbot de WhatsApp con IA»

- Qué: nueva página `/servicios/chatbot-whatsapp` (es/en) para posicionar «chatbot whatsapp» (720 búsquedas/mes en Colombia, dificultad SEO 11, CPC 8,35 USD según Ubersuggest). Sin precio: «según tu negocio» y demo gratis, mientras llega la aprobación de Meta. Enlazada desde los artículos de chatbot para citas (es/en) y automatizar WhatsApp con IA.
- Archivos: `src/content/landings/services.ts`, `src/components/landing/LandingView.tsx`, 3 artículos del blog.
- Verificación: typecheck y build limpios; 200 en es/en; en el sitemap y en /servicios; schema Service + FAQPage; capturas en 1440 y 390 px sin errores de consola; revisor de texto OK.

## 2026-11-14 · Correcciones de la auditoría SEO

Ver `docs/seo/kytcode.lat-audit/APLICADO-2026-11-14.md` (horarios, schema, títulos, casos, guía de precios, rendimiento del inicio 41 → 67–76).
