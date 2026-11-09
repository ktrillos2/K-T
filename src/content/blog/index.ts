import type { Lang } from "@/i18n/config";
import type { PostBody } from "./types";
import { getPostCard } from "./meta";
import cuanto from "./posts/cuanto-cuesta-una-pagina-web-en-colombia";
import lenta from "./posts/costo-oculto-pagina-web-lenta";
import medida from "./posts/desarrollo-web-medida-vs-plantillas";
import geo from "./posts/geo-vs-seo-diferencias-motores-ia";
import { fromMarkdown } from "./markdown";
import { formatCOP } from "@/lib/money";
import md_pagina_web_para_restaurante_mexico from "./posts/es/pagina-web-para-restaurante-mexico";
import md_precio_pagina_web_chile from "./posts/es/precio-pagina-web-chile";
import md_cuanto_cuesta_administrar_facebook_ads_colombia from "./posts/es/cuanto-cuesta-administrar-facebook-ads-colombia";
import md_que_es_el_remarketing_y_como_funciona from "./posts/es/que-es-el-remarketing-y-como-funciona";
import md_cuanto_cuesta_una_tienda_online_argentina from "./posts/es/cuanto-cuesta-una-tienda-online-argentina";
import md_pagina_web_pequeno_negocio_estados_unidos from "./posts/es/pagina-web-pequeno-negocio-estados-unidos";
import en_pagina_web_pequeno_negocio_estados_unidos from "./posts/en/pagina-web-pequeno-negocio-estados-unidos";
import md_cuanto_cuesta_una_pagina_web_latinoamerica from "./posts/es/cuanto-cuesta-una-pagina-web-latinoamerica";
import md_nearshore_desarrollo_web_latinoamerica from "./posts/es/nearshore-desarrollo-web-latinoamerica";
import en_nearshore_desarrollo_web_latinoamerica from "./posts/en/nearshore-desarrollo-web-latinoamerica";
import md_que_es_n8n_para_que_sirve from "./posts/es/que-es-n8n-para-que-sirve";
import md_que_es_vibe_coding from "./posts/es/que-es-vibe-coding";
import md_que_es_un_servidor_mcp from "./posts/es/que-es-un-servidor-mcp";
import md_mejor_inteligencia_artificial_para_empresas from "./posts/es/mejor-inteligencia-artificial-para-empresas";
import md_como_vender_por_whatsapp_business from "./posts/es/como-vender-por-whatsapp-business";
import md_agencia_vs_freelance_desarrollo_web from "./posts/es/agencia-vs-freelance-desarrollo-web";
import md_agentes_ia_empresas_colombia from "./posts/es/agentes-ia-empresas-colombia";
import md_automatizar_whatsapp_business_con_ia from "./posts/es/automatizar-whatsapp-business-con-ia";
import md_calcular_roi_automatizacion_software_ia from "./posts/es/calcular-roi-automatizacion-software-ia";
import md_como_aparecer_en_chatgpt_2026 from "./posts/es/como-aparecer-en-chatgpt-2026";
import md_como_crear_una_pagina_web_desde_cero_2026 from "./posts/es/como-crear-una-pagina-web-desde-cero-2026";
import md_como_crear_una_pagina_web_gratis_limitaciones from "./posts/es/como-crear-una-pagina-web-gratis-limitaciones";
import md_como_crear_una_tienda_online_desde_cero from "./posts/es/como-crear-una-tienda-online-desde-cero";
import md_como_elegir_empresa_desarrollo_web_colombia from "./posts/es/como-elegir-empresa-desarrollo-web-colombia";
import md_cuanto_cuesta_automatizar_procesos_ia_colombia from "./posts/es/cuanto-cuesta-automatizar-procesos-ia-colombia";
import md_cuanto_cuesta_desarrollar_software_a_medida_colombia from "./posts/es/cuanto-cuesta-desarrollar-software-a-medida-colombia";
import md_cuanto_cuesta_mantenimiento_pagina_web_colombia from "./posts/es/cuanto-cuesta-mantenimiento-pagina-web-colombia";
import md_cuanto_cuesta_una_tienda_virtual_en_colombia_2026 from "./posts/es/cuanto-cuesta-una-tienda-virtual-en-colombia-2026";
import md_excel_vs_erp_vs_software_a_medida from "./posts/es/excel-vs-erp-vs-software-a-medida";
import md_landing_page_vs_tienda_virtual from "./posts/es/landing-page-vs-tienda-virtual";
import md_medir_visibilidad_chatgpt_gemini_google_ai_mode from "./posts/es/medir-visibilidad-chatgpt-gemini-google-ai-mode";
import md_mejores_agencias_software_a_medida_cucuta_2026 from "./posts/es/mejores-agencias-software-a-medida-cucuta-2026";
import md_nextjs_vs_wordpress from "./posts/es/nextjs-vs-wordpress";
import md_por_que_mi_pagina_web_no_aparece_en_google from "./posts/es/por-que-mi-pagina-web-no-aparece-en-google";
import md_que_es_k_t_code from "./posts/es/que-es-k-t-code";
import md_que_es_un_dominio_web_como_elegir from "./posts/es/que-es-un-dominio-web-como-elegir";
import md_que_es_una_api_y_para_que_sirve from "./posts/es/que-es-una-api-y-para-que-sirve";
import md_que_es_una_landing_page_y_para_que_sirve from "./posts/es/que-es-una-landing-page-y-para-que-sirve";
import md_shopify_vs_wix_comparativa_ecommerce from "./posts/es/shopify-vs-wix-comparativa-ecommerce";
import md_shopify_vs_woocommerce_colombia from "./posts/es/shopify-vs-woocommerce-colombia";
import md_software_a_medida_vs_saas_comparativa from "./posts/es/software-a-medida-vs-saas-comparativa";
import md_wompi_vs_mercado_pago_vs_payu_colombia from "./posts/es/wompi-vs-mercado-pago-vs-payu-colombia";
import en_agencia_vs_freelance_desarrollo_web from "./posts/en/agencia-vs-freelance-desarrollo-web";
import en_como_aparecer_en_chatgpt_2026 from "./posts/en/como-aparecer-en-chatgpt-2026";
import en_excel_vs_erp_vs_software_a_medida from "./posts/en/excel-vs-erp-vs-software-a-medida";
import en_nextjs_vs_wordpress from "./posts/en/nextjs-vs-wordpress";
import en_que_es_k_t_code from "./posts/en/que-es-k-t-code";
import en_software_a_medida_vs_saas_comparativa from "./posts/en/software-a-medida-vs-saas-comparativa";

const BODIES: Record<string, Partial<Record<Lang, PostBody>> & { es: PostBody }> = {
  "cuanto-cuesta-una-pagina-web-en-colombia": cuanto,
  "costo-oculto-pagina-web-lenta": lenta,
  "desarrollo-web-medida-vs-plantillas": medida,
  "geo-vs-seo-diferencias-motores-ia": geo,
  // Tendencias de búsqueda (es + en), generadas con la skill blog-tendencias.
  "pagina-web-para-restaurante-mexico": { es: fromMarkdown(md_pagina_web_para_restaurante_mexico) },
  "precio-pagina-web-chile": { es: fromMarkdown(md_precio_pagina_web_chile) },
  "cuanto-cuesta-administrar-facebook-ads-colombia": { es: fromMarkdown(md_cuanto_cuesta_administrar_facebook_ads_colombia) },
  "que-es-el-remarketing-y-como-funciona": { es: fromMarkdown(md_que_es_el_remarketing_y_como_funciona) },
  "cuanto-cuesta-una-tienda-online-argentina": { es: fromMarkdown(md_cuanto_cuesta_una_tienda_online_argentina) },
  "pagina-web-pequeno-negocio-estados-unidos": { es: fromMarkdown(md_pagina_web_pequeno_negocio_estados_unidos), en: fromMarkdown(en_pagina_web_pequeno_negocio_estados_unidos) },
  "cuanto-cuesta-una-pagina-web-latinoamerica": { es: fromMarkdown(md_cuanto_cuesta_una_pagina_web_latinoamerica) },
  "nearshore-desarrollo-web-latinoamerica": { es: fromMarkdown(md_nearshore_desarrollo_web_latinoamerica), en: fromMarkdown(en_nearshore_desarrollo_web_latinoamerica) },
  "que-es-n8n-para-que-sirve": { es: fromMarkdown(md_que_es_n8n_para_que_sirve) },
  "que-es-vibe-coding": { es: fromMarkdown(md_que_es_vibe_coding) },
  "que-es-un-servidor-mcp": { es: fromMarkdown(md_que_es_un_servidor_mcp) },
  "mejor-inteligencia-artificial-para-empresas": { es: fromMarkdown(md_mejor_inteligencia_artificial_para_empresas) },
  "como-vender-por-whatsapp-business": { es: fromMarkdown(md_como_vender_por_whatsapp_business) },
  // Artículos migrados del blog anterior, escritos en markdown (es + en).
  "agencia-vs-freelance-desarrollo-web": { es: fromMarkdown(md_agencia_vs_freelance_desarrollo_web), en: fromMarkdown(en_agencia_vs_freelance_desarrollo_web) },
  "agentes-ia-empresas-colombia": { es: fromMarkdown(md_agentes_ia_empresas_colombia) },
  "automatizar-whatsapp-business-con-ia": { es: fromMarkdown(md_automatizar_whatsapp_business_con_ia) },
  "calcular-roi-automatizacion-software-ia": { es: fromMarkdown(md_calcular_roi_automatizacion_software_ia) },
  "como-aparecer-en-chatgpt-2026": { es: fromMarkdown(md_como_aparecer_en_chatgpt_2026), en: fromMarkdown(en_como_aparecer_en_chatgpt_2026) },
  "como-crear-una-pagina-web-desde-cero-2026": { es: fromMarkdown(md_como_crear_una_pagina_web_desde_cero_2026) },
  "como-crear-una-pagina-web-gratis-limitaciones": { es: fromMarkdown(md_como_crear_una_pagina_web_gratis_limitaciones) },
  "como-crear-una-tienda-online-desde-cero": { es: fromMarkdown(md_como_crear_una_tienda_online_desde_cero) },
  "como-elegir-empresa-desarrollo-web-colombia": { es: fromMarkdown(md_como_elegir_empresa_desarrollo_web_colombia) },
  "cuanto-cuesta-automatizar-procesos-ia-colombia": { es: fromMarkdown(md_cuanto_cuesta_automatizar_procesos_ia_colombia) },
  "cuanto-cuesta-desarrollar-software-a-medida-colombia": { es: fromMarkdown(md_cuanto_cuesta_desarrollar_software_a_medida_colombia) },
  "cuanto-cuesta-mantenimiento-pagina-web-colombia": { es: fromMarkdown(md_cuanto_cuesta_mantenimiento_pagina_web_colombia) },
  "cuanto-cuesta-una-tienda-virtual-en-colombia-2026": { es: fromMarkdown(md_cuanto_cuesta_una_tienda_virtual_en_colombia_2026) },
  "excel-vs-erp-vs-software-a-medida": { es: fromMarkdown(md_excel_vs_erp_vs_software_a_medida), en: fromMarkdown(en_excel_vs_erp_vs_software_a_medida) },
  "landing-page-vs-tienda-virtual": { es: fromMarkdown(md_landing_page_vs_tienda_virtual) },
  "medir-visibilidad-chatgpt-gemini-google-ai-mode": { es: fromMarkdown(md_medir_visibilidad_chatgpt_gemini_google_ai_mode) },
  "mejores-agencias-software-a-medida-cucuta-2026": { es: fromMarkdown(md_mejores_agencias_software_a_medida_cucuta_2026) },
  "nextjs-vs-wordpress": { es: fromMarkdown(md_nextjs_vs_wordpress), en: fromMarkdown(en_nextjs_vs_wordpress) },
  "por-que-mi-pagina-web-no-aparece-en-google": { es: fromMarkdown(md_por_que_mi_pagina_web_no_aparece_en_google) },
  "que-es-k-t-code": { es: fromMarkdown(md_que_es_k_t_code), en: fromMarkdown(en_que_es_k_t_code) },
  "que-es-un-dominio-web-como-elegir": { es: fromMarkdown(md_que_es_un_dominio_web_como_elegir) },
  "que-es-una-api-y-para-que-sirve": { es: fromMarkdown(md_que_es_una_api_y_para_que_sirve) },
  "que-es-una-landing-page-y-para-que-sirve": { es: fromMarkdown(md_que_es_una_landing_page_y_para_que_sirve) },
  "shopify-vs-wix-comparativa-ecommerce": { es: fromMarkdown(md_shopify_vs_wix_comparativa_ecommerce) },
  "shopify-vs-woocommerce-colombia": { es: fromMarkdown(md_shopify_vs_woocommerce_colombia) },
  "software-a-medida-vs-saas-comparativa": { es: fromMarkdown(md_software_a_medida_vs_saas_comparativa), en: fromMarkdown(en_software_a_medida_vs_saas_comparativa) },
  "wompi-vs-mercado-pago-vs-payu-colombia": { es: fromMarkdown(md_wompi_vs_mercado_pago_vs_payu_colombia) },
};

/** Artículo completo (ficha + contenido) en el idioma pedido, con respaldo en español. */
export function getPost(slug: string, lang: Lang) {
  const card = getPostCard(slug, lang);
  const bodies = BODIES[slug];
  if (!card || !bodies) return undefined;
  const body = bodies[card.lang] ?? bodies.es;
  return { ...card, body };
}

/** Texto plano del artículo (para conteo de palabras, llms-full.txt y búsqueda). */
export function plainText(body: PostBody): string {
  const strip = (s: string) =>
    s
      .replace(/\{\{cop:(\d+),usd:(\d+)\}\}/g, (_, n, u) => `${formatCOP(Number(n))} COP (${u} USD)`)
      .replace(/\{\{cop:(\d+)\}\}/g, (_, n) => `${formatCOP(Number(n))} COP`)
      .replace(/\*\*|\*|`/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const parts: string[] = [...body.tldr];
  for (const b of body.blocks) {
    switch (b.type) {
      case "p":
      case "h2":
      case "h3":
      case "quote":
        parts.push(b.text);
        break;
      case "callout":
        parts.push([b.title, b.text].filter(Boolean).join(": "));
        break;
      case "ul":
      case "ol":
        parts.push(...b.items);
        break;
      case "table":
        parts.push(b.head.join(" | "), ...b.rows.map((r) => r.join(" | ")));
        break;
      case "stat":
        parts.push(`${b.value} ${b.label}`);
        break;
      case "widget":
        if (b.name === "checklist") parts.push(b.title, ...b.items);
        break;
    }
  }
  (body.faq ?? []).forEach((f) => parts.push(f.q, f.a));
  return parts.map(strip).join("\n");
}

export const wordCount = (body: PostBody) => plainText(body).split(/\s+/).filter(Boolean).length;
