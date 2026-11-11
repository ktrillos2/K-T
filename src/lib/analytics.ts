import { SITE } from "@/lib/site";

export type AnalyticsEvent = "whatsapp_click" | "quote_form_start" | "generate_lead";
type EventParams = { service?: string; location?: string; method?: string };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const WHATSAPP_LINK_SELECTOR = `a[href^="https://wa.me/${SITE.phoneRaw}"]`;

const GUIDE_SERVICE: Record<string, string> = {
  "wompi-vs-mercado-pago-vs-payu-colombia": "tiendas-virtuales",
  "cuanto-cuesta-administrar-facebook-ads-colombia": "administracion-de-ads",
  "cuanto-cuesta-una-pagina-web-en-colombia": "paginas-web",
};

/** Servicio al que apunta una ruta del sitio; sin relación clara queda como general. */
export function serviceFromPath(pathname: string): string {
  const [section, slug] = pathname.replace(/^\/en(?=\/|$)/, "").split("/").filter(Boolean);
  if (section === "servicios" && slug) return slug;
  if (section?.startsWith("desarrollo-web-")) return "desarrollo-web-a-medida";
  if (section === "blog" && slug) return GUIDE_SERVICE[slug] ?? "general";
  return "general";
}

/** Envía un evento a Analytics. Nunca incluye nombres, correos, teléfonos ni texto escrito por la persona. */
export function trackEvent(name: AnalyticsEvent, params: EventParams = {}) {
  window.gtag?.("event", name, { page_path: window.location.pathname, service: serviceFromPath(window.location.pathname), ...params });
}
