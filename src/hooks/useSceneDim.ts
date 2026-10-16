"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { live } from "@/lib/store";

const recompute = () => {
  let max = 0;
  live.dimSources.forEach((v) => (max = Math.max(max, v)));
  live.dim = max;
};

/**
 * Atenúa la escena 3D mientras el elemento está en pantalla, para que el texto
 * que vive encima tenga buen contraste. La animación sigue, solo baja su presencia.
 */
export function useSceneDim(ref: React.RefObject<HTMLElement | null>, amount = 0.85) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const key = {};
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      end: "bottom 25%",
      onToggle: (self) => {
        if (self.isActive) live.dimSources.set(key, amount);
        else live.dimSources.delete(key);
        recompute();
      },
    });
    return () => {
      st.kill();
      live.dimSources.delete(key);
      recompute();
    };
  }, [ref, amount]);
}
