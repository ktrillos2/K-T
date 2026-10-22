"use client";

import { useSyncExternalStore } from "react";
import type { RouteKey } from "./routes";

export type Theme = "dark" | "light";

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
};

const state: UIState = {
  route: "inicio",
  loaded: false,
  enterKey: 0,
  transitioning: false,
  theme: "dark",
  menuOpen: false,
  paletteOpen: false,
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
 * Valores que cambian en cada frame (scroll, fps). No disparan renders:
 * los leen los tickers de GSAP.
 */
export const live = {
  scroll: 0,
  velocity: 0,
  progress: 0,
  fps: 60,
};
