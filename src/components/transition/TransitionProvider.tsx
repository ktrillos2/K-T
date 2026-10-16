"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, EASE_INOUT, SCRAMBLE_CHARS, prefersReducedMotion } from "@/lib/gsap";
import { COLOR_VAR, metaFor, normalizePath, routeFromPath, type Variant } from "@/lib/routes";
import { pageLabel } from "@/lib/page-label";
import { live, store } from "@/lib/store";
import { lenisRef, scrollToTop, scrollToEl } from "@/lib/lenis";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Transition.module.css";

type NavOpts = { x?: number; y?: number };
type Ctx = { navigate: (href: string, opts?: NavOpts) => void };
type Pending = { href: string; t0: number; variant: Variant; label: string; back: boolean };

const TransitionCtx = createContext<Ctx>({ navigate: () => {} });
export const useNavigate = () => useContext(TransitionCtx).navigate;

/* ---------- Posición de scroll por página (para volver donde estabas con "atrás") ---------- */
const SCROLL_KEY = "kt-scroll";
function readScroll(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(SCROLL_KEY) || "{}") as Record<string, number>;
  } catch {
    return {};
  }
}
function saveScroll(path: string | null, y: number) {
  if (!path) return;
  try {
    const m = readScroll();
    m[path] = Math.max(0, Math.round(y));
    sessionStorage.setItem(SCROLL_KEY, JSON.stringify(m));
  } catch {
    /* sin sessionStorage */
  }
}
function restoreScroll(y: number) {
  const l = lenisRef.current;
  if (l) l.scrollTo(y, { immediate: true, force: true });
  window.scrollTo(0, y);
  ScrollTrigger.update();
}

/**
 * Transiciones entre rutas del App Router.
 * 1) Cubre la pantalla con los paneles de color (variante según la ruta destino) y muestra
 *    "Compilando <nombre de la página>".
 * 2) Navega (router.push, o el popstate original si fue el botón atrás/adelante del navegador)
 *    y mide lo que tarda en montar la nueva página.
 * 3) Descubre la página y avisa al store para que la escena 3D y la página animen su entrada.
 *
 * Atrás/adelante: el popstate se intercepta en fase de captura (antes que el router de Next),
 * se reproduce la animación en sentido inverso y al terminar se re-emite el mismo popstate
 * para que Next haga su navegación normal. Al volver se recupera la posición de scroll.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const pending = useRef<Pending | null>(null);
  const lastPath = useRef<string | null>(null);
  const failsafe = useRef<number>(0);
  const replaying = useRef(false);
  const traversal = useRef(false);
  const { t } = useI18n();
  const tRef = useRef(t);
  tRef.current = t;

  const els = () => {
    const r = root.current!;
    return {
      root: r,
      panels: Array.from(r.querySelectorAll<HTMLElement>("[data-panel]")),
      verb: r.querySelector<HTMLElement>("[data-verb]")!,
      name: r.querySelector<HTMLElement>("[data-name]")!,
      line2: r.querySelector<HTMLElement>("[data-line2]")!,
      bar: r.querySelector<HTMLElement>("[data-bar]")!,
      term: r.querySelector<HTMLElement>("[data-term]")!,
    };
  };

  const finish = useCallback(() => {
    busy.current = false;
    store.set({ transitioning: false });
  }, []);

  /** Coloca la página nueva en su posición (arriba, o donde estabas si vuelves con atrás). */
  const place = useCallback((p: { href: string; back: boolean }) => {
    scrollToTop(true);
    ScrollTrigger.refresh();
    if (p.back) {
      const y = readScroll()[normalizePath(p.href)] ?? 0;
      if (y > 0) restoreScroll(y);
    }
  }, []);

  const reveal = useCallback(() => {
    const p = pending.current;
    if (!p) return;
    pending.current = null;
    window.clearTimeout(failsafe.current);
    const ms = Math.max(1, Math.round(performance.now() - p.t0));

    if (prefersReducedMotion() || !root.current) {
      place(p);
      finish();
      store.enter();
      return;
    }

    const { root: r, panels, line2, bar, term, name } = els();

    // Dos frames para que la nueva página pinte antes de descubrirla.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        place(p);
        line2.textContent = tRef.current.transition.compiled(p.label, ms);
        // Al volver, los paneles salen hacia el lado contrario.
        const dir = p.back ? -1 : 1;
        const out = p.variant === "side" ? { xPercent: 100 * dir } : { yPercent: -100 * dir };
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(panels, { clearProps: "all" });
            gsap.set([term, bar, name], { clearProps: "all" });
            line2.textContent = "";
            r.dataset.active = "false";
            finish();
          },
        });
        tl.to(bar, { scaleX: 1, duration: 0.25, ease: "power2.out" })
          .fromTo(line2, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.25 }, "<")
          .to(term, { autoAlpha: 0, y: -24, duration: 0.35, ease: "power2.in" }, "+=0.18")
          .add(() => {
            // La escena 3D y la página empiezan su entrada mientras los paneles salen.
            store.enter();
          }, "<0.1")
          .to([...panels].reverse(), { ...out, duration: 0.75, ease: EASE_INOUT, stagger: 0.07 }, "<");
      }),
    );
  }, [finish, place]);

  /** Cubre la pantalla y escribe "Compilando <página>". Llama a `done` cuando está cubierta. */
  const cover = useCallback((target: string, opts: NavOpts & { back?: boolean }, done: () => void) => {
    const meta = metaFor(target);
    const variant: Variant = meta?.variant ?? "up";
    const label = pageLabel(target);
    const back = !!opts.back;
    busy.current = true;
    store.set({ transitioning: true, menuOpen: false, paletteOpen: false });

    const start = () => {
      pending.current = { href: target, t0: performance.now(), variant, label, back };
      done();
      // Si por alguna razón la ruta no cambia, no dejamos la pantalla cubierta.
      failsafe.current = window.setTimeout(() => {
        if (pending.current) reveal();
        else finish();
      }, 8000);
    };

    if (prefersReducedMotion() || !root.current) {
      start();
      return;
    }

    const { root: r, panels, verb, name, line2, bar, term } = els();
    const dest = meta?.color ?? "fg";
    const order = (["red", "yellow", "green"] as const).filter((c) => c !== dest);
    const colors = dest === "fg" ? ["red", "yellow", "green"] : [...order, dest];
    panels.slice(0, 3).forEach((p, i) => (p.style.background = COLOR_VAR[colors[i] as keyof typeof COLOR_VAR]));
    verb.textContent = tRef.current.transition.compiling;
    name.textContent = label;
    name.dataset.long = String(label.length > 28);
    line2.textContent = "";
    r.dataset.active = "true";

    const x = opts.x ?? window.innerWidth / 2;
    const y = opts.y ?? window.innerHeight / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const dir = back ? -1 : 1;

    const tl = gsap.timeline({ onComplete: start });
    gsap.set(panels, { visibility: "visible", x: 0, y: 0, xPercent: 0, yPercent: 0, clipPath: "none" });
    if (variant === "iris") {
      tl.fromTo(
        panels,
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { clipPath: `circle(${radius}px at ${x}px ${y}px)`, duration: 0.8, ease: EASE_INOUT, stagger: 0.08 },
      );
    } else if (variant === "side") {
      tl.fromTo(panels, { xPercent: -100 * dir, yPercent: 0 }, { xPercent: 0, duration: 0.7, ease: EASE_INOUT, stagger: 0.07 });
    } else {
      tl.fromTo(panels, { yPercent: 100 * dir }, { yPercent: 0, duration: 0.7, ease: EASE_INOUT, stagger: 0.07 });
    }
    tl.fromTo(term, { autoAlpha: 0, y: 24 * dir }, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.35")
      .fromTo(bar, { scaleX: 0 }, { scaleX: 0.7, duration: 0.5, ease: "power1.inOut" }, "<")
      .to(name, { duration: 0.55, scrambleText: { text: label, chars: SCRAMBLE_CHARS, speed: 0.9, revealDelay: 0.1 } }, "<");
  }, [finish, reveal]);

  const navigate = useCallback(
    (href: string, opts: NavOpts = {}) => {
      const target = normalizePath(href);
      const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
      if (busy.current) return;
      store.set({ menuOpen: false, paletteOpen: false });

      if (target === normalizePath(pathname)) {
        if (hash) scrollToEl(hash);
        else scrollToTop(false);
        return;
      }

      saveScroll(lastPath.current, live.scroll);
      router.prefetch(target);
      cover(target, opts, () => router.push(target, { scroll: false }));
    },
    [pathname, router, cover],
  );

  // Atrás / adelante del navegador con la misma animación (en sentido inverso).
  useEffect(() => {
    try {
      if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    } catch {
      /* navegadores antiguos */
    }
    const onPop = (e: PopStateEvent) => {
      if (replaying.current) {
        // Es el popstate que re-emitimos nosotros: que lo procese el router de Next.
        replaying.current = false;
        return;
      }
      const target = normalizePath(window.location.pathname);
      if (target === lastPath.current) return; // solo cambió el #hash
      saveScroll(lastPath.current, live.scroll);
      if (busy.current || !store.get().loaded || prefersReducedMotion() || !root.current) {
        traversal.current = true;
        return; // navegación normal de Next, sin cortina
      }
      e.stopImmediatePropagation();
      const state = e.state;
      cover(target, { back: true }, () => {
        replaying.current = true;
        window.dispatchEvent(new PopStateEvent("popstate", { state }));
      });
    };
    // Captura: se ejecuta antes que el listener del router de Next en window.
    window.addEventListener("popstate", onPop, true);
    return () => window.removeEventListener("popstate", onPop, true);
  }, [cover]);

  // Cada cambio de ruta: sincroniza el store y descubre la página.
  useEffect(() => {
    const path = normalizePath(pathname);
    if (lastPath.current === path) return;
    const first = lastPath.current === null;
    lastPath.current = path;
    store.set({ route: routeFromPath(path) });
    if (first) return; // en la primera carga entra el Loader
    if (pending.current) {
      reveal();
    } else if (store.get().loaded) {
      // atrás / adelante sin cortina (movimiento reducido o durante otra transición)
      place({ href: path, back: traversal.current });
      traversal.current = false;
      store.enter();
    }
  }, [pathname, reveal, place]);

  // Intercepta los enlaces internos que no usan <TLink> (p. ej. contenido del CMS).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.native !== undefined) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Archivos (sitemap.xml, llms.txt, feed.xml…) se abren normal.
      if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return;
      e.preventDefault();
      navigate(url.pathname + url.hash, { x: e.clientX, y: e.clientY });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <TransitionCtx.Provider value={value}>
      {children}
      <div ref={root} className={styles.root} data-active="false" aria-hidden="true">
        <div className={styles.panel} data-panel />
        <div className={styles.panel} data-panel />
        <div className={styles.panel} data-panel />
        <div className={`${styles.panel} ${styles.bg}`} data-panel>
          <div className={styles.term} data-term>
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <p className={styles.l1}>
              <span className={styles.verb} data-verb />
              <span className={styles.name} data-name />
              <span className={styles.caret} aria-hidden="true" />
            </p>
            <div className={styles.barWrap}>
              <span className={styles.bar} data-bar />
            </div>
            <p className={styles.l2} data-line2 />
          </div>
        </div>
      </div>
    </TransitionCtx.Provider>
  );
}
