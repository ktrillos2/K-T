"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SmoothScroll = dynamic(() => import("@/components/motion/SmoothScroll").then((m) => m.SmoothScroll), { ssr: false });
const Cursor = dynamic(() => import("@/components/motion/Cursor").then((m) => m.Cursor), { ssr: false });

/** Los efectos opcionales se cargan en tiempo ocioso o al empezar a interactuar. */
export function DeferredEffects() {
  const [ready, setReady] = useState(false);
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCursor = () => setCursor(pointer.matches && !motion.matches);
    const activate = () => setReady(true);
    updateCursor();
    motion.addEventListener("change", updateCursor);
    pointer.addEventListener("change", updateCursor);

    let idle = 0;
    let frame = 0;
    if ("requestIdleCallback" in window) {
      idle = window.requestIdleCallback(activate);
    } else {
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(activate);
      });
    }
    window.addEventListener("wheel", activate, { once: true, passive: true });
    window.addEventListener("touchstart", activate, { once: true, passive: true });
    window.addEventListener("keydown", activate, { once: true });

    return () => {
      if (idle) window.cancelIdleCallback(idle);
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", updateCursor);
      pointer.removeEventListener("change", updateCursor);
      window.removeEventListener("wheel", activate);
      window.removeEventListener("touchstart", activate);
      window.removeEventListener("keydown", activate);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <SmoothScroll />
      {cursor && <Cursor />}
    </>
  );
}
