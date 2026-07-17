import type { Metadata } from "next"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Canales digitales y proyectos",
  description: "Conoce los canales oficiales de K&T Code y una selección de proyectos digitales.",
  alternates: { canonical: absoluteUrl("/redes") },
  openGraph: {
    title: "Canales digitales y proyectos | K&T Code",
    description: "Enlaces oficiales, contacto y una selección de experiencias digitales desarrolladas por K&T Code.",
    url: absoluteUrl("/redes"),
    type: "website",
  },
}

export default function SocialLinksLayout({ children }: { children: React.ReactNode }) {
  return children
}
