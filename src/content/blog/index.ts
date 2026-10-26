import type { Lang } from "@/i18n/config";
import type { PostBody } from "./types";
import { getPostCard } from "./meta";
import cuanto from "./posts/cuanto-cuesta-una-pagina-web-en-colombia";
import lenta from "./posts/costo-oculto-pagina-web-lenta";
import medida from "./posts/desarrollo-web-medida-vs-plantillas";
import geo from "./posts/geo-vs-seo-diferencias-motores-ia";
import { fromMarkdown } from "./markdown";
import { formatCOP } from "@/lib/money";
import md_cuanto_cuesta_administrar_facebook_ads_colombia from "./posts/es/cuanto-cuesta-administrar-facebook-ads-colombia";
import en_cuanto_cuesta_administrar_facebook_ads_colombia from "./posts/en/cuanto-cuesta-administrar-facebook-ads-colombia";
import md_que_es_el_remarketing_y_como_funciona from "./posts/es/que-es-el-remarketing-y-como-funciona";
import en_que_es_el_remarketing_y_como_funciona from "./posts/en/que-es-el-remarketing-y-como-funciona";
import md_cuanto_cuesta_una_tienda_online_argentina from "./posts/es/cuanto-cuesta-una-tienda-online-argentina";
import en_cuanto_cuesta_una_tienda_online_argentina from "./posts/en/cuanto-cuesta-una-tienda-online-argentina";
import md_pagina_web_pequeno_negocio_estados_unidos from "./posts/es/pagina-web-pequeno-negocio-estados-unidos";
import en_pagina_web_pequeno_negocio_estados_unidos from "./posts/en/pagina-web-pequeno-negocio-estados-unidos";
import md_cuanto_cuesta_una_pagina_web_latinoamerica from "./posts/es/cuanto-cuesta-una-pagina-web-latinoamerica";
import en_cuanto_cuesta_una_pagina_web_latinoamerica from "./posts/en/cuanto-cuesta-una-pagina-web-latinoamerica";
import md_nearshore_desarrollo_web_latinoamerica from "./posts/es/nearshore-desarrollo-web-latinoamerica";
import en_nearshore_desarrollo_web_latinoamerica from "./posts/en/nearshore-desarrollo-web-latinoamerica";
import md_que_es_n8n_para_que_sirve from "./posts/es/que-es-n8n-para-que-sirve";
import md_que_es_vibe_coding from "./posts/es/que-es-vibe-coding";
import md_que_es_un_servidor_mcp from "./posts/es/que-es-un-servidor-mcp";
import md_mejor_inteligencia_artificial_para_empresas from "./posts/es/mejor-inteligencia-artificial-para-empresas";
import md_como_vender_por_whatsapp_business from "./posts/es/como-vender-por-whatsapp-business";
import en_que_es_n8n_para_que_sirve from "./posts/en/que-es-n8n-para-que-sirve";
import en_que_es_vibe_coding from "./posts/en/que-es-vibe-coding";
import en_que_es_un_servidor_mcp from "./posts/en/que-es-un-servidor-mcp";
import en_mejor_inteligencia_artificial_para_empresas from "./posts/en/mejor-inteligencia-artificial-para-empresas";
import en_como_vender_por_whatsapp_business from "./posts/en/como-vender-por-whatsapp-business";
import md_agencia_vs_freelance_desarrollo_web from "./posts/es/agencia-vs-freelance-desarrollo-web";
import md_agentes_ia_empresas_colombia from "./posts/es/agentes-ia-empresas-colombia";
import md_agentic_commerce_ecommerce_ia from "./posts/es/agentic-commerce-ecommerce-ia";
import md_automatizar_whatsapp_business_con_ia from "./posts/es/automatizar-whatsapp-business-con-ia";
import md_calcular_roi_automatizacion_software_ia from "./posts/es/calcular-roi-automatizacion-software-ia";
import md_chatbot_vs_agente_ia from "./posts/es/chatbot-vs-agente-ia";
import md_como_aparecer_en_chatgpt_2026 from "./posts/es/como-aparecer-en-chatgpt-2026";
import md_como_aparecer_en_google_guia_paso_a_paso from "./posts/es/como-aparecer-en-google-guia-paso-a-paso";
import md_como_crear_pagina_web_2026 from "./posts/es/como-crear-pagina-web-2026";
import md_como_crear_pagina_web_profesional from "./posts/es/como-crear-pagina-web-profesional";
import md_como_crear_una_pagina_web_desde_cero_2026 from "./posts/es/como-crear-una-pagina-web-desde-cero-2026";
import md_como_crear_una_pagina_web_gratis_limitaciones from "./posts/es/como-crear-una-pagina-web-gratis-limitaciones";
import md_como_crear_una_tienda_online_desde_cero from "./posts/es/como-crear-una-tienda-online-desde-cero";
import md_como_elegir_empresa_desarrollo_web_colombia from "./posts/es/como-elegir-empresa-desarrollo-web-colombia";
import md_como_usar_chatgpt_para_crear_pagina_web from "./posts/es/como-usar-chatgpt-para-crear-pagina-web";
import md_cuanto_cuesta_automatizar_procesos_ia_colombia from "./posts/es/cuanto-cuesta-automatizar-procesos-ia-colombia";
import md_cuanto_cuesta_desarrollar_software_a_medida_colombia from "./posts/es/cuanto-cuesta-desarrollar-software-a-medida-colombia";
import md_cuanto_cuesta_mantenimiento_pagina_web_colombia from "./posts/es/cuanto-cuesta-mantenimiento-pagina-web-colombia";
import md_cuanto_cuesta_una_tienda_virtual_en_colombia_2026 from "./posts/es/cuanto-cuesta-una-tienda-virtual-en-colombia-2026";
import md_excel_vs_erp_vs_software_a_medida from "./posts/es/excel-vs-erp-vs-software-a-medida";
import md_google_ai_overviews_ai_mode_seo from "./posts/es/google-ai-overviews-ai-mode-seo";
import md_integrar_whatsapp_crm_inventario_facturacion from "./posts/es/integrar-whatsapp-crm-inventario-facturacion";
import md_landing_page_vs_tienda_virtual from "./posts/es/landing-page-vs-tienda-virtual";
import md_llms_txt_2026 from "./posts/es/llms-txt-2026";
import md_medir_visibilidad_chatgpt_gemini_google_ai_mode from "./posts/es/medir-visibilidad-chatgpt-gemini-google-ai-mode";
import md_mejores_agencias_software_a_medida_cucuta_2026 from "./posts/es/mejores-agencias-software-a-medida-cucuta-2026";
import md_mejores_herramientas_ia_crear_paginas_web_2026 from "./posts/es/mejores-herramientas-ia-crear-paginas-web-2026";
import md_nextjs_vs_react from "./posts/es/nextjs-vs-react";
import md_nextjs_vs_wordpress from "./posts/es/nextjs-vs-wordpress";
import md_pagina_web_vs_tienda_virtual from "./posts/es/pagina-web-vs-tienda-virtual";
import md_por_que_mi_pagina_web_no_aparece_en_google from "./posts/es/por-que-mi-pagina-web-no-aparece-en-google";
import md_que_es_el_seo_y_como_funciona_guia from "./posts/es/que-es-el-seo-y-como-funciona-guia";
import md_que_es_k_t_code from "./posts/es/que-es-k-t-code";
import md_que_es_un_dominio_web_como_elegir from "./posts/es/que-es-un-dominio-web-como-elegir";
import md_que_es_un_ecommerce_headless_ventajas from "./posts/es/que-es-un-ecommerce-headless-ventajas";
import md_que_es_un_hosting_web_y_como_funciona from "./posts/es/que-es-un-hosting-web-y-como-funciona";
import md_que_es_una_api_y_para_que_sirve from "./posts/es/que-es-una-api-y-para-que-sirve";
import md_que_es_una_landing_page_y_para_que_sirve from "./posts/es/que-es-una-landing-page-y-para-que-sirve";
import md_seo_agentico_2026 from "./posts/es/seo-agentico-2026";
import md_seo_desde_la_raiz_crear_pagina from "./posts/es/seo-desde-la-raiz-crear-pagina";
import md_seo_para_chatgpt_optimizacion_ia from "./posts/es/seo-para-chatgpt-optimizacion-ia";
import md_shopify_vs_wix_comparativa_ecommerce from "./posts/es/shopify-vs-wix-comparativa-ecommerce";
import md_shopify_vs_woocommerce_colombia from "./posts/es/shopify-vs-woocommerce-colombia";
import md_software_a_medida_vs_saas_comparativa from "./posts/es/software-a-medida-vs-saas-comparativa";
import md_wix_vs_wordpress_diferencias_precios from "./posts/es/wix-vs-wordpress-diferencias-precios";
import md_wompi_vs_mercado_pago_vs_payu_colombia from "./posts/es/wompi-vs-mercado-pago-vs-payu-colombia";
import md_wordpress_vs_shopify_comparativa from "./posts/es/wordpress-vs-shopify-comparativa";
import en_agencia_vs_freelance_desarrollo_web from "./posts/en/agencia-vs-freelance-desarrollo-web";
import en_agentes_ia_empresas_colombia from "./posts/en/agentes-ia-empresas-colombia";
import en_agentic_commerce_ecommerce_ia from "./posts/en/agentic-commerce-ecommerce-ia";
import en_automatizar_whatsapp_business_con_ia from "./posts/en/automatizar-whatsapp-business-con-ia";
import en_calcular_roi_automatizacion_software_ia from "./posts/en/calcular-roi-automatizacion-software-ia";
import en_chatbot_vs_agente_ia from "./posts/en/chatbot-vs-agente-ia";
import en_como_aparecer_en_chatgpt_2026 from "./posts/en/como-aparecer-en-chatgpt-2026";
import en_como_aparecer_en_google_guia_paso_a_paso from "./posts/en/como-aparecer-en-google-guia-paso-a-paso";
import en_como_crear_pagina_web_2026 from "./posts/en/como-crear-pagina-web-2026";
import en_como_crear_pagina_web_profesional from "./posts/en/como-crear-pagina-web-profesional";
import en_como_crear_una_pagina_web_desde_cero_2026 from "./posts/en/como-crear-una-pagina-web-desde-cero-2026";
import en_como_crear_una_pagina_web_gratis_limitaciones from "./posts/en/como-crear-una-pagina-web-gratis-limitaciones";
import en_como_crear_una_tienda_online_desde_cero from "./posts/en/como-crear-una-tienda-online-desde-cero";
import en_como_elegir_empresa_desarrollo_web_colombia from "./posts/en/como-elegir-empresa-desarrollo-web-colombia";
import en_como_usar_chatgpt_para_crear_pagina_web from "./posts/en/como-usar-chatgpt-para-crear-pagina-web";
import en_cuanto_cuesta_automatizar_procesos_ia_colombia from "./posts/en/cuanto-cuesta-automatizar-procesos-ia-colombia";
import en_cuanto_cuesta_desarrollar_software_a_medida_colombia from "./posts/en/cuanto-cuesta-desarrollar-software-a-medida-colombia";
import en_cuanto_cuesta_mantenimiento_pagina_web_colombia from "./posts/en/cuanto-cuesta-mantenimiento-pagina-web-colombia";
import en_cuanto_cuesta_una_tienda_virtual_en_colombia_2026 from "./posts/en/cuanto-cuesta-una-tienda-virtual-en-colombia-2026";
import en_excel_vs_erp_vs_software_a_medida from "./posts/en/excel-vs-erp-vs-software-a-medida";
import en_google_ai_overviews_ai_mode_seo from "./posts/en/google-ai-overviews-ai-mode-seo";
import en_integrar_whatsapp_crm_inventario_facturacion from "./posts/en/integrar-whatsapp-crm-inventario-facturacion";
import en_landing_page_vs_tienda_virtual from "./posts/en/landing-page-vs-tienda-virtual";
import en_llms_txt_2026 from "./posts/en/llms-txt-2026";
import en_medir_visibilidad_chatgpt_gemini_google_ai_mode from "./posts/en/medir-visibilidad-chatgpt-gemini-google-ai-mode";
import en_mejores_agencias_software_a_medida_cucuta_2026 from "./posts/en/mejores-agencias-software-a-medida-cucuta-2026";
import en_mejores_herramientas_ia_crear_paginas_web_2026 from "./posts/en/mejores-herramientas-ia-crear-paginas-web-2026";
import en_nextjs_vs_react from "./posts/en/nextjs-vs-react";
import en_nextjs_vs_wordpress from "./posts/en/nextjs-vs-wordpress";
import en_pagina_web_vs_tienda_virtual from "./posts/en/pagina-web-vs-tienda-virtual";
import en_por_que_mi_pagina_web_no_aparece_en_google from "./posts/en/por-que-mi-pagina-web-no-aparece-en-google";
import en_que_es_el_seo_y_como_funciona_guia from "./posts/en/que-es-el-seo-y-como-funciona-guia";
import en_que_es_k_t_code from "./posts/en/que-es-k-t-code";
import en_que_es_un_dominio_web_como_elegir from "./posts/en/que-es-un-dominio-web-como-elegir";
import en_que_es_un_ecommerce_headless_ventajas from "./posts/en/que-es-un-ecommerce-headless-ventajas";
import en_que_es_un_hosting_web_y_como_funciona from "./posts/en/que-es-un-hosting-web-y-como-funciona";
import en_que_es_una_api_y_para_que_sirve from "./posts/en/que-es-una-api-y-para-que-sirve";
import en_que_es_una_landing_page_y_para_que_sirve from "./posts/en/que-es-una-landing-page-y-para-que-sirve";
import en_seo_agentico_2026 from "./posts/en/seo-agentico-2026";
import en_seo_desde_la_raiz_crear_pagina from "./posts/en/seo-desde-la-raiz-crear-pagina";
import en_seo_para_chatgpt_optimizacion_ia from "./posts/en/seo-para-chatgpt-optimizacion-ia";
import en_shopify_vs_wix_comparativa_ecommerce from "./posts/en/shopify-vs-wix-comparativa-ecommerce";
import en_shopify_vs_woocommerce_colombia from "./posts/en/shopify-vs-woocommerce-colombia";
import en_software_a_medida_vs_saas_comparativa from "./posts/en/software-a-medida-vs-saas-comparativa";
import en_wix_vs_wordpress_diferencias_precios from "./posts/en/wix-vs-wordpress-diferencias-precios";
import en_wompi_vs_mercado_pago_vs_payu_colombia from "./posts/en/wompi-vs-mercado-pago-vs-payu-colombia";
import en_wordpress_vs_shopify_comparativa from "./posts/en/wordpress-vs-shopify-comparativa";

const BODIES: Record<string, Partial<Record<Lang, PostBody>> & { es: PostBody }> = {
  "cuanto-cuesta-una-pagina-web-en-colombia": cuanto,
  "costo-oculto-pagina-web-lenta": lenta,
  "desarrollo-web-medida-vs-plantillas": medida,
  "geo-vs-seo-diferencias-motores-ia": geo,
  // Tendencias de búsqueda (es + en), generadas con la skill blog-tendencias.
  "cuanto-cuesta-administrar-facebook-ads-colombia": { es: fromMarkdown(md_cuanto_cuesta_administrar_facebook_ads_colombia), en: fromMarkdown(en_cuanto_cuesta_administrar_facebook_ads_colombia) },
  "que-es-el-remarketing-y-como-funciona": { es: fromMarkdown(md_que_es_el_remarketing_y_como_funciona), en: fromMarkdown(en_que_es_el_remarketing_y_como_funciona) },
  "cuanto-cuesta-una-tienda-online-argentina": { es: fromMarkdown(md_cuanto_cuesta_una_tienda_online_argentina), en: fromMarkdown(en_cuanto_cuesta_una_tienda_online_argentina) },
  "pagina-web-pequeno-negocio-estados-unidos": { es: fromMarkdown(md_pagina_web_pequeno_negocio_estados_unidos), en: fromMarkdown(en_pagina_web_pequeno_negocio_estados_unidos) },
  "cuanto-cuesta-una-pagina-web-latinoamerica": { es: fromMarkdown(md_cuanto_cuesta_una_pagina_web_latinoamerica), en: fromMarkdown(en_cuanto_cuesta_una_pagina_web_latinoamerica) },
  "nearshore-desarrollo-web-latinoamerica": { es: fromMarkdown(md_nearshore_desarrollo_web_latinoamerica), en: fromMarkdown(en_nearshore_desarrollo_web_latinoamerica) },
  "que-es-n8n-para-que-sirve": { es: fromMarkdown(md_que_es_n8n_para_que_sirve), en: fromMarkdown(en_que_es_n8n_para_que_sirve) },
  "que-es-vibe-coding": { es: fromMarkdown(md_que_es_vibe_coding), en: fromMarkdown(en_que_es_vibe_coding) },
  "que-es-un-servidor-mcp": { es: fromMarkdown(md_que_es_un_servidor_mcp), en: fromMarkdown(en_que_es_un_servidor_mcp) },
  "mejor-inteligencia-artificial-para-empresas": { es: fromMarkdown(md_mejor_inteligencia_artificial_para_empresas), en: fromMarkdown(en_mejor_inteligencia_artificial_para_empresas) },
  "como-vender-por-whatsapp-business": { es: fromMarkdown(md_como_vender_por_whatsapp_business), en: fromMarkdown(en_como_vender_por_whatsapp_business) },
  // Artículos migrados del blog anterior, escritos en markdown (es + en).
  "agencia-vs-freelance-desarrollo-web": { es: fromMarkdown(md_agencia_vs_freelance_desarrollo_web), en: fromMarkdown(en_agencia_vs_freelance_desarrollo_web) },
  "agentes-ia-empresas-colombia": { es: fromMarkdown(md_agentes_ia_empresas_colombia), en: fromMarkdown(en_agentes_ia_empresas_colombia) },
  "agentic-commerce-ecommerce-ia": { es: fromMarkdown(md_agentic_commerce_ecommerce_ia), en: fromMarkdown(en_agentic_commerce_ecommerce_ia) },
  "automatizar-whatsapp-business-con-ia": { es: fromMarkdown(md_automatizar_whatsapp_business_con_ia), en: fromMarkdown(en_automatizar_whatsapp_business_con_ia) },
  "calcular-roi-automatizacion-software-ia": { es: fromMarkdown(md_calcular_roi_automatizacion_software_ia), en: fromMarkdown(en_calcular_roi_automatizacion_software_ia) },
  "chatbot-vs-agente-ia": { es: fromMarkdown(md_chatbot_vs_agente_ia), en: fromMarkdown(en_chatbot_vs_agente_ia) },
  "como-aparecer-en-chatgpt-2026": { es: fromMarkdown(md_como_aparecer_en_chatgpt_2026), en: fromMarkdown(en_como_aparecer_en_chatgpt_2026) },
  "como-aparecer-en-google-guia-paso-a-paso": { es: fromMarkdown(md_como_aparecer_en_google_guia_paso_a_paso), en: fromMarkdown(en_como_aparecer_en_google_guia_paso_a_paso) },
  "como-crear-pagina-web-2026": { es: fromMarkdown(md_como_crear_pagina_web_2026), en: fromMarkdown(en_como_crear_pagina_web_2026) },
  "como-crear-pagina-web-profesional": { es: fromMarkdown(md_como_crear_pagina_web_profesional), en: fromMarkdown(en_como_crear_pagina_web_profesional) },
  "como-crear-una-pagina-web-desde-cero-2026": { es: fromMarkdown(md_como_crear_una_pagina_web_desde_cero_2026), en: fromMarkdown(en_como_crear_una_pagina_web_desde_cero_2026) },
  "como-crear-una-pagina-web-gratis-limitaciones": { es: fromMarkdown(md_como_crear_una_pagina_web_gratis_limitaciones), en: fromMarkdown(en_como_crear_una_pagina_web_gratis_limitaciones) },
  "como-crear-una-tienda-online-desde-cero": { es: fromMarkdown(md_como_crear_una_tienda_online_desde_cero), en: fromMarkdown(en_como_crear_una_tienda_online_desde_cero) },
  "como-elegir-empresa-desarrollo-web-colombia": { es: fromMarkdown(md_como_elegir_empresa_desarrollo_web_colombia), en: fromMarkdown(en_como_elegir_empresa_desarrollo_web_colombia) },
  "como-usar-chatgpt-para-crear-pagina-web": { es: fromMarkdown(md_como_usar_chatgpt_para_crear_pagina_web), en: fromMarkdown(en_como_usar_chatgpt_para_crear_pagina_web) },
  "cuanto-cuesta-automatizar-procesos-ia-colombia": { es: fromMarkdown(md_cuanto_cuesta_automatizar_procesos_ia_colombia), en: fromMarkdown(en_cuanto_cuesta_automatizar_procesos_ia_colombia) },
  "cuanto-cuesta-desarrollar-software-a-medida-colombia": { es: fromMarkdown(md_cuanto_cuesta_desarrollar_software_a_medida_colombia), en: fromMarkdown(en_cuanto_cuesta_desarrollar_software_a_medida_colombia) },
  "cuanto-cuesta-mantenimiento-pagina-web-colombia": { es: fromMarkdown(md_cuanto_cuesta_mantenimiento_pagina_web_colombia), en: fromMarkdown(en_cuanto_cuesta_mantenimiento_pagina_web_colombia) },
  "cuanto-cuesta-una-tienda-virtual-en-colombia-2026": { es: fromMarkdown(md_cuanto_cuesta_una_tienda_virtual_en_colombia_2026), en: fromMarkdown(en_cuanto_cuesta_una_tienda_virtual_en_colombia_2026) },
  "excel-vs-erp-vs-software-a-medida": { es: fromMarkdown(md_excel_vs_erp_vs_software_a_medida), en: fromMarkdown(en_excel_vs_erp_vs_software_a_medida) },
  "google-ai-overviews-ai-mode-seo": { es: fromMarkdown(md_google_ai_overviews_ai_mode_seo), en: fromMarkdown(en_google_ai_overviews_ai_mode_seo) },
  "integrar-whatsapp-crm-inventario-facturacion": { es: fromMarkdown(md_integrar_whatsapp_crm_inventario_facturacion), en: fromMarkdown(en_integrar_whatsapp_crm_inventario_facturacion) },
  "landing-page-vs-tienda-virtual": { es: fromMarkdown(md_landing_page_vs_tienda_virtual), en: fromMarkdown(en_landing_page_vs_tienda_virtual) },
  "llms-txt-2026": { es: fromMarkdown(md_llms_txt_2026), en: fromMarkdown(en_llms_txt_2026) },
  "medir-visibilidad-chatgpt-gemini-google-ai-mode": { es: fromMarkdown(md_medir_visibilidad_chatgpt_gemini_google_ai_mode), en: fromMarkdown(en_medir_visibilidad_chatgpt_gemini_google_ai_mode) },
  "mejores-agencias-software-a-medida-cucuta-2026": { es: fromMarkdown(md_mejores_agencias_software_a_medida_cucuta_2026), en: fromMarkdown(en_mejores_agencias_software_a_medida_cucuta_2026) },
  "mejores-herramientas-ia-crear-paginas-web-2026": { es: fromMarkdown(md_mejores_herramientas_ia_crear_paginas_web_2026), en: fromMarkdown(en_mejores_herramientas_ia_crear_paginas_web_2026) },
  "nextjs-vs-react": { es: fromMarkdown(md_nextjs_vs_react), en: fromMarkdown(en_nextjs_vs_react) },
  "nextjs-vs-wordpress": { es: fromMarkdown(md_nextjs_vs_wordpress), en: fromMarkdown(en_nextjs_vs_wordpress) },
  "pagina-web-vs-tienda-virtual": { es: fromMarkdown(md_pagina_web_vs_tienda_virtual), en: fromMarkdown(en_pagina_web_vs_tienda_virtual) },
  "por-que-mi-pagina-web-no-aparece-en-google": { es: fromMarkdown(md_por_que_mi_pagina_web_no_aparece_en_google), en: fromMarkdown(en_por_que_mi_pagina_web_no_aparece_en_google) },
  "que-es-el-seo-y-como-funciona-guia": { es: fromMarkdown(md_que_es_el_seo_y_como_funciona_guia), en: fromMarkdown(en_que_es_el_seo_y_como_funciona_guia) },
  "que-es-k-t-code": { es: fromMarkdown(md_que_es_k_t_code), en: fromMarkdown(en_que_es_k_t_code) },
  "que-es-un-dominio-web-como-elegir": { es: fromMarkdown(md_que_es_un_dominio_web_como_elegir), en: fromMarkdown(en_que_es_un_dominio_web_como_elegir) },
  "que-es-un-ecommerce-headless-ventajas": { es: fromMarkdown(md_que_es_un_ecommerce_headless_ventajas), en: fromMarkdown(en_que_es_un_ecommerce_headless_ventajas) },
  "que-es-un-hosting-web-y-como-funciona": { es: fromMarkdown(md_que_es_un_hosting_web_y_como_funciona), en: fromMarkdown(en_que_es_un_hosting_web_y_como_funciona) },
  "que-es-una-api-y-para-que-sirve": { es: fromMarkdown(md_que_es_una_api_y_para_que_sirve), en: fromMarkdown(en_que_es_una_api_y_para_que_sirve) },
  "que-es-una-landing-page-y-para-que-sirve": { es: fromMarkdown(md_que_es_una_landing_page_y_para_que_sirve), en: fromMarkdown(en_que_es_una_landing_page_y_para_que_sirve) },
  "seo-agentico-2026": { es: fromMarkdown(md_seo_agentico_2026), en: fromMarkdown(en_seo_agentico_2026) },
  "seo-desde-la-raiz-crear-pagina": { es: fromMarkdown(md_seo_desde_la_raiz_crear_pagina), en: fromMarkdown(en_seo_desde_la_raiz_crear_pagina) },
  "seo-para-chatgpt-optimizacion-ia": { es: fromMarkdown(md_seo_para_chatgpt_optimizacion_ia), en: fromMarkdown(en_seo_para_chatgpt_optimizacion_ia) },
  "shopify-vs-wix-comparativa-ecommerce": { es: fromMarkdown(md_shopify_vs_wix_comparativa_ecommerce), en: fromMarkdown(en_shopify_vs_wix_comparativa_ecommerce) },
  "shopify-vs-woocommerce-colombia": { es: fromMarkdown(md_shopify_vs_woocommerce_colombia), en: fromMarkdown(en_shopify_vs_woocommerce_colombia) },
  "software-a-medida-vs-saas-comparativa": { es: fromMarkdown(md_software_a_medida_vs_saas_comparativa), en: fromMarkdown(en_software_a_medida_vs_saas_comparativa) },
  "wix-vs-wordpress-diferencias-precios": { es: fromMarkdown(md_wix_vs_wordpress_diferencias_precios), en: fromMarkdown(en_wix_vs_wordpress_diferencias_precios) },
  "wompi-vs-mercado-pago-vs-payu-colombia": { es: fromMarkdown(md_wompi_vs_mercado_pago_vs_payu_colombia), en: fromMarkdown(en_wompi_vs_mercado_pago_vs_payu_colombia) },
  "wordpress-vs-shopify-comparativa": { es: fromMarkdown(md_wordpress_vs_shopify_comparativa), en: fromMarkdown(en_wordpress_vs_shopify_comparativa) },
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
