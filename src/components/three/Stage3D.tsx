"use client";

import { useEffect, useRef } from "react";
import { live, store, type FormationKey } from "@/lib/store";

type Props = {
  formation: FormationKey;
  className?: string;
  /** false: la formación ocupa toda la escena sin seguir un elemento. */
  anchored?: boolean;
  label?: string;
};

/**
 * Ancla del DOM para la escena 3D persistente. La formación de vóxeles se coloca
 * sobre este elemento y lo sigue al hacer scroll, como si viviera dentro de la página.
 */
export function Stage3D({ formation, className, anchored = true, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    live.anchor = anchored ? el : null;
    store.set({ formation });
    return () => {
      if (live.anchor === el) live.anchor = null;
    };
  }, [formation, anchored]);

  return <div ref={ref} className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} />;
}
