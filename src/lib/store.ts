"use client";

import { useSyncExternalStore } from "react";
import type { RouteKey } from "./routes";

export type Theme = "dark" | "light";
export type FormationKey = "logo" | "about" | "projects" | "pricing" | "notfound";

/** Estado de UI que dispara renders. Solo valores primitivos para que los selectores sean estables. */
export type UIState = {
  route: RouteKey;
  loaded: boolean;
  /** Se incrementa cada vez que una página debe reproducir su animación de entrada. */
  enterKey: number;
  transitioning: boolean;
  theme: Theme;
  menuOpen: boolean;
  paletteOpen: boolean;
  sceneReady: boolean;
  /** Texto que muestra el cursor (p. ej. "Ver") cuando está sobre un objeto 3D. */
  cursorLabel: string | null;
  formation: FormationKey;
};

const state: UIState = {
  route: "inicio",
  loaded: false,
  enterKey: 0,
  transitioning: false,
  theme: "dark",
  menuOpen: false,
  paletteOpen: false,
  sceneReady: false,
  cursorLabel: null,
  formation: "logo",
};

const listeners = new Set<() => void>();

export const store = {
  get: (): UIState => state,
  set(patch: Partial<UIState>) {
    let changed = false;
    for (const k in patch) {
      const key = k as keyof UIState;
      if (state[key] !== patch[key]) {
        (state as Record<string, unknown>)[key] = patch[key];
        changed = true;
      }
    }
    if (changed) listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  /** Pide a la página actual que reproduzca su entrada. */
  enter() {
    store.set({ enterKey: state.enterKey + 1 });
  },
};

export function useUI<T extends string | number | boolean | null>(selector: (s: UIState) => T): T {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(state),
    () => selector(state),
  );
}

/**
 * Valores que cambian en cada frame (scroll, puntero, túnel). No disparan renders:
 * los leen el loop de three.js y los tickers de GSAP.
 */
export const live = {
  scroll: 0,
  velocity: 0,
  progress: 0,
  /** Elemento del DOM sobre el que se posiciona la formación de vóxeles. */
  anchor: null as HTMLElement | null,
  /** Progreso 0–1 del túnel de proyectos y su visibilidad 0–1. */
  tunnel: 0,
  tunnelVis: 0,
  tunnelIndex: 0,
  fps: 60,
  /** 0–1: cuánto se atenúa la escena 3D para que el texto encima se lea bien. */
  dim: 0,
  dimSources: new Map<object, number>(),
  /** 0–1: visibilidad del hero de inicio (controla el campo de píxeles). */
  heroVis: 0,
  /** Ondas del campo de píxeles: cada clic agrega una (x, y en coordenadas de pantalla −1..1, tiempo). */
  ripples: [] as { x: number; y: number; t: number }[],
};
