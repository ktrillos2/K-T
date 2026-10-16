"use client";

import dynamic from "next/dynamic";
import type { Lang } from "@/i18n/config";
import { I18nProvider } from "@/i18n/I18nProvider";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { Loader } from "@/components/shell/Loader";
import { Nav } from "@/components/shell/Nav";
import { StatusBar } from "@/components/shell/StatusBar";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { Footer } from "@/components/shell/Footer";
import { ThemeSync } from "@/components/shell/ThemeSync";
import { WhatsAppFloat } from "@/components/shell/WhatsAppFloat";

// La escena 3D se carga solo en el cliente y en paralelo al loader.
const Experience = dynamic(() => import("@/components/three/Experience"), { ssr: false });

export function AppShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <I18nProvider lang={lang}>
      <TransitionProvider>
        <ThemeSync />
        <SmoothScroll />
        <Experience />
        <Nav />
        <main id="main" className="main">
          {children}
        </main>
        <Footer />
        <StatusBar />
        <WhatsAppFloat />
        <div className="crt" aria-hidden="true" />
        <CommandPalette />
        <Cursor />
        <Loader />
      </TransitionProvider>
    </I18nProvider>
  );
}
