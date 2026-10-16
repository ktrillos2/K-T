import type { Metadata, Viewport } from "next";
import { ari, fira } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Administración de Reseñas · Sanity CMS · K&T Code",
  description: "Panel de administración para gestionar reseñas de clientes con Sanity CDN.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${ari.variable} ${fira.variable}`} style={{ colorScheme: "dark" }}>
      <body
        style={{
          margin: 0,
          background: "#0b0b0c",
          color: "#f2f2ee",
          fontFamily: "var(--font-ari, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </body>
    </html>
  );
}
