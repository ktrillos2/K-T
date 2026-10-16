import type { NextConfig } from "next";

/** URLs del sitio anterior → nuevas rutas (301/308 permanentes para conservar el posicionamiento). */
const LEGACY: [string, string][] = [
  ["/projects/aerolinea-Santander", "/proyectos/aerolinea-santander"],
  ["/projects", "/proyectos"],
  ["/projects/:slug", "/proyectos/:slug"],
  ["/portafolio", "/proyectos"],
  ["/portfolio", "/proyectos"],
  ["/about", "/nosotros"],
  ["/sobre-nosotros", "/nosotros"],
  ["/pricing", "/precios"],
  ["/services", "/servicios"],
  ["/industries", "/industrias"],
  ["/faq", "/preguntas-frecuentes"],
  ["/testimonials", "/testimonios"],
  ["/planes", "/precios"],
  ["/contacto", "/#contacto"],
  ["/contact", "/#contacto"],
  ["/privacy", "/politica-de-privacidad"],
  ["/privacy-policy", "/politica-de-privacidad"],
  ["/politica-privacidad", "/politica-de-privacidad"],
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // three.js se transpila para que el tree-shaking funcione con el App Router.
  transpilePackages: ["three"],
  async redirects() {
    return LEGACY.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `/en${source}`, destination: `/en${destination === "/#contacto" ? "#contacto" : destination}`, permanent: true },
    ]);
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/shots/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
