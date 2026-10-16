import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Todos los rastreadores (buscadores y motores de IA como OAI-SearchBot, ClaudeBot,
 * PerplexityBot o Google-Extended) quedan cubiertos por "*": no hace falta listarlos.
 * Solo se excluye la API interna. No se bloquea /_next/: Google necesita el JS y el CSS
 * para renderizar la página igual que un visitante.
 *
 * Si algún día quieres bloquear a un bot concreto (p. ej. GPTBot, solo entrenamiento),
 * agrega una regla propia para él: un bot con regla específica ignora la de "*".
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.url.replace(/\/+$/, "");
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
