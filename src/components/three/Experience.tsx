"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "@/lib/gsap";
import { live, store } from "@/lib/store";
import { Scene } from "./Scene";
import styles from "./Experience.module.css";

/**
 * Canvas WebGL único y persistente (vive en el layout). No se destruye al cambiar de ruta:
 * la escena cambia de formación, como si la cámara viajara por un mismo mundo.
 *
 * Cuando una sección pide lectura (live.dim) el lienzo solo baja su opacidad. Antes también
 * se desenfocaba con `filter: blur()`, pero eso obliga al navegador a desenfocar la pantalla
 * completa en cada frame y era la causa principal de los tirones al hacer scroll.
 * El velo (`.veil`) es un degradado estático que se compone gratis en la GPU.
 */
export default function Experience() {
  const stage = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    const v = veil.current;
    if (!el || !v) return;
    let cur = 0;
    let lastOpacity = "";
    let lastVeil = "";
    const tick = (_t: number, dt: number) => {
      const target = live.dim;
      cur += (target - cur) * Math.min(1, dt / 220);
      if (Math.abs(target - cur) < 0.002) cur = target;
      const o = (1 - cur * 0.8).toFixed(3);
      if (o !== lastOpacity) {
        el.style.opacity = o;
        lastOpacity = o;
      }
      const vo = (cur * 0.9).toFixed(3);
      if (vo !== lastVeil) {
        v.style.opacity = vo;
        lastVeil = vo;
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <>
      <div ref={stage} className={styles.stage} aria-hidden="true">
        <Canvas
          eventSource={document.body}
          eventPrefix="client"
          flat
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 12], fov: 35, near: 0.1, far: 140 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false }}
          onCreated={() => {
            // El loader espera a que la escena exista para terminar.
            requestAnimationFrame(() => store.set({ sceneReady: true }));
          }}
        >
          <Scene />
        </Canvas>
      </div>
      <div ref={veil} className={styles.veil} aria-hidden="true" />
    </>
  );
}
