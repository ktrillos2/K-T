"use client";

import type { Lang } from "@/i18n/config";
import type { ShellLinks } from "@/lib/shellLinks";
import { I18nProvider } from "@/i18n/I18nProvider";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { DeferredEffects } from "@/components/shell/DeferredEffects";
import { Loader } from "@/components/shell/Loader";
import { Nav } from "@/components/shell/Nav";
import { StatusBar } from "@/components/shell/StatusBar";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { Footer } from "@/components/shell/Footer";
import { ThemeSync } from "@/components/shell/ThemeSync";
import { WhatsAppFloat } from "@/components/shell/WhatsAppFloat";

export function AppShell({ lang, links, children }: { lang: Lang; links: ShellLinks; children: React.ReactNode }) {
  return (
    <I18nProvider lang={lang}>
      <TransitionProvider>
        <ThemeSync />
        <DeferredEffects />
        <Nav />
        <main id="main" className="main">
          {children}
        </main>
        <Footer links={links} />
        <StatusBar />
        <WhatsAppFloat />
        <CommandPalette links={links} />
        <Loader />
      </TransitionProvider>
    </I18nProvider>
  );
}
