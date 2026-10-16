"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, type ComponentProps, type FocusEvent, type MouseEvent, type PointerEvent } from "react";
import { useNavigate } from "./TransitionProvider";
import { useI18n } from "@/i18n/I18nProvider";
import { scrollToEl } from "@/lib/lenis";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Ruta sin idioma ("/precios"); se localiza sola. */
  href: string;
  /** true si href ya es una URL pública final (p. ej. el cambio de idioma). */
  raw?: boolean;
};

/**
 * Enlace interno con transición. Respeta ⌘/Ctrl+clic.
 * Prefetch por intención (hover, foco o toque) en lugar de "al aparecer en pantalla":
 * en listas largas (blog, proyectos) el prefetch por viewport descargaba decenas de páginas
 * mientras hacías scroll y eso trababa el desplazamiento.
 */
export function TLink({ href, raw, onClick, onPointerEnter, onFocus, prefetch, children, ...rest }: Props) {
  const navigate = useNavigate();
  const router = useRouter();
  const { href: localize } = useI18n();
  const done = useRef(false);
  const finalHref = raw || href.startsWith("#") || /^https?:/.test(href) ? href : localize(href);
  const internal = finalHref.startsWith("/");

  const warm = () => {
    if (done.current || !internal) return;
    done.current = true;
    router.prefetch(finalHref.split("#")[0] || "/");
  };

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (finalHref.startsWith("#")) {
      scrollToEl(finalHref);
      return;
    }
    navigate(finalHref, { x: e.clientX || undefined, y: e.clientY || undefined });
  };

  return (
    <Link
      href={finalHref}
      prefetch={prefetch ?? false}
      onClick={handle}
      onPointerEnter={(e: PointerEvent<HTMLAnchorElement>) => {
        onPointerEnter?.(e);
        warm();
      }}
      onFocus={(e: FocusEvent<HTMLAnchorElement>) => {
        onFocus?.(e);
        warm();
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
