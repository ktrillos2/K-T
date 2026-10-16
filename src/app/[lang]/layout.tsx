import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { ari, fira } from "../fonts";
import { LOCALES, isLang, type Lang } from "@/i18n/config";
import { getDict } from "@/i18n";
import { GOOGLE_VERIFICATION, SITE } from "@/lib/site";
import { DEFAULT_OG, ROBOTS_INDEX } from "@/lib/seo";
import { graph, organization, person, website } from "@/lib/schema";
import { AppShell } from "@/components/shell/AppShell";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "es";
  const t = getDict(lang);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t.meta.siteTitle, template: `%s · ${SITE.name}` },
    description: t.meta.siteDescription,
    applicationName: SITE.name,
    authors: [{ name: SITE.founder.name, url: `${SITE.url}/autores/keyner-trillos` }],
    creator: SITE.name,
    publisher: SITE.name,
    category: "technology",
    formatDetection: { telephone: false, email: false, address: false },
    robots: ROBOTS_INDEX,
    // Íconos con las mismas URLs del sitio anterior (/favicon.ico, /icon.png, /apple-icon.png)
    // para que Google y los navegadores conserven el favicon que ya tenían en caché.
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    appleWebApp: { capable: true, title: SITE.name, statusBarStyle: "black-translucent" },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: lang === "en" ? "en_US" : "es_CO",
      images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: t.meta.ogTitle }],
    },
    twitter: { card: "summary_large_image", images: [DEFAULT_OG] },
    // Códigos de verificación de Google Search Console y Bing Webmaster Tools (ver .env.local).
    // El de Google por defecto es el que ya tenía el sitio anterior, para no perder la propiedad verificada.
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || GOOGLE_VERIFICATION,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
    },
    other: {
      "geo.region": "CO-NSA",
      "geo.placename": "San José de Cúcuta",
      "geo.position": "7.8939;-72.5078",
      ICBM: "7.8939, -72.5078",
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#0b0b0c",
      "msapplication-TileImage": "/mstile-150.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4f0" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Se ejecuta antes del primer pintado: tema guardado, visita repetida y detección de bots.
 * Los buscadores y crawlers de IA ven el contenido completo sin loader ni animaciones de entrada.
 */
const bootScript = `(function(){var d=document.documentElement;var bot=/bot|crawl|spider|slurp|lighthouse|headless|bingpreview|facebookexternalhit|embedly|whatsapp|telegram|gptbot|claude|perplexity|google-extended/i.test(navigator.userAgent);try{var t=localStorage.getItem('kt-theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t)}catch(e){}if(bot){d.classList.add('bot');return}d.classList.add('js');try{if(sessionStorage.getItem('kt-booted'))d.classList.add('booted')}catch(e){}setTimeout(function(){if(!d.classList.contains('ready'))d.classList.add('intro-failsafe')},9000)})();`;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang === "en" ? "en" : "es-CO"} data-theme="dark" className={`${ari.variable} ${fira.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLMs-full.txt" />
      </head>
      <body>
        <AppShell lang={lang}>{children}</AppShell>
        <JsonLd data={graph(organization(lang), website(lang), person(lang))} />
      </body>
    </html>
  );
}
