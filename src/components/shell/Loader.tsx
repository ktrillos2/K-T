"use client";

import { useEffect } from "react";
import { store } from "@/lib/store";

/** Inicializa las entradas sin superponer una intro ni retrasar el contenido. */
export function Loader() {
  useEffect(() => {
    document.documentElement.classList.add("ready");
    if (!store.get().loaded) {
      store.set({ loaded: true });
      store.enter();
    }
  }, []);

  return null;
}
