import { splitLang } from "@/i18n/config";

export type RouteKey = "inicio" | "nosotros" | "servicios" | "servicio" | "proyectos" | "proyecto" | "precios" | "guia" | "blog" | "articulo" | "pagina" | "legal" | "404";
export type BrandColor = "red" | "yellow" | "green" | "fg";
export type Variant = "iris" | "up" | "side";
export type NavKey = "home" | "about" | "services" | "projects" | "pricing" | "blog";

export type RouteMeta = {
  key: RouteKey;
  nav: NavKey;
  /** Ruta sin prefijo de idioma. */
  href: string;
  /** Archivo que muestra la pestaña del editor. */
  file: string;
  color: BrandColor;
  variant: Variant;
};

/** Rutas principales (las que aparecen en la navegación). */
export const ROUTES: readonly RouteMeta[] = [
  { key: "inicio", nav: "home", href: "/", file: "page.tsx", color: "fg", variant: "iris" },
  { key: "nosotros", nav: "about", href: "/nosotros", file: "nosotros.tsx", color: "red", variant: "up" },
  { key: "servicios", nav: "services", href: "/servicios", file: "servicios.tsx", color: "green", variant: "up" },
  { key: "proyectos", nav: "projects", href: "/proyectos", file: "proyectos.tsx", color: "yellow", variant: "up" },
  { key: "precios", nav: "pricing", href: "/precios", file: "precios.tsx", color: "green", variant: "side" },
  { key: "blog", nav: "blog", href: "/blog", file: "blog.md", color: "fg", variant: "side" },
];

export const COLOR_VAR: Record<BrandColor, string> = {
  red: "var(--red)",
  yellow: "var(--yellow)",
  green: "var(--green)",
  fg: "var(--fg)",
};

export function normalizePath(href: string): string {
  const clean = href.split("#")[0].split("?")[0] || "/";
  if (clean.length > 1 && clean.endsWith("/")) return clean.slice(0, -1);
  return clean;
}

/** Clave de ruta a partir de una URL pública (con o sin /en). */
export function routeFromPath(pathname: string): RouteKey {
  const { path } = splitLang(normalizePath(pathname));
  const hit = ROUTES.find((r) => r.href === path);
  if (hit) return hit.key;
  if (path.startsWith("/proyectos/")) return "proyecto";
  if (path.startsWith("/servicios/") || path.startsWith("/industrias") || path.startsWith("/desarrollo-web-")) return "servicio";
  if (path.startsWith("/precios/")) return "guia";
  if (["/testimonios", "/preguntas-frecuentes"].includes(path) || path.startsWith("/autores/")) return "pagina";
  if (path.startsWith("/blog/")) return "articulo";
  if (path === "/politica-de-privacidad") return "legal";
  return "404";
}

/** Metadatos de transición para cualquier ruta, incluidas las de detalle. */
export function metaFor(pathname: string): RouteMeta | null {
  const key = routeFromPath(pathname);
  const direct = ROUTES.find((r) => r.key === key);
  if (direct) return direct;
  if (key === "proyecto") return { ...ROUTES.find((r) => r.key === "proyectos")!, key };
  const by = (k: RouteKey) => ROUTES.find((r) => r.key === k)!;
  if (key === "articulo") return { ...by("blog"), key };
  if (key === "servicio") return { ...by("servicios"), key };
  if (key === "guia") return { ...by("precios"), key };
  if (key === "pagina") return { ...by("nosotros"), key };
  return null;
}

/** Pestaña de navegación activa para una ruta. */
export function navKeyFor(key: RouteKey): NavKey | null {
  switch (key) {
    case "inicio":
      return "home";
    case "nosotros":
      return "about";
    case "proyectos":
    case "proyecto":
      return "projects";
    case "precios":
    case "guia":
      return "pricing";
    case "servicios":
    case "servicio":
      return "services";
    case "pagina":
      return "about";
    case "blog":
    case "articulo":
      return "blog";
    default:
      return null;
  }
}

/** Ruta del archivo fuente que se muestra en la barra de estado. */
export function sourceFile(key: RouteKey): string {
  switch (key) {
    case "inicio":
      return "src/app/page.tsx";
    case "proyecto":
      return "src/app/proyectos/[slug]/page.tsx";
    case "articulo":
      return "content/blog/[slug].md";
    case "legal":
      return "src/app/politica-de-privacidad/page.tsx";
    case "404":
      return "src/app/not-found.tsx";
    default:
      return `src/app/${key}/page.tsx`;
  }
}
