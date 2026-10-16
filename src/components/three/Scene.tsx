"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { PointLight } from "three";
import { useUI } from "@/lib/store";
import { HERO_BG } from "@/lib/site";
import { Voxels } from "./Voxels";
import { Tunnel } from "./Tunnel";
import { PixelField } from "./PixelField";

export function Scene() {
  const route = useUI((s) => s.route);
  const light = useRef<PointLight>(null);

  // Una luz que sigue al puntero: los vóxeles cambian de sombreado al mover el mouse.
  useFrame((state, dt) => {
    const l = light.current;
    if (!l) return;
    const k = 1 - Math.exp(-dt * 6);
    l.position.x += (state.pointer.x * 7 - l.position.x) * k;
    l.position.y += (state.pointer.y * 4.5 - l.position.y) * k;
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 10]} intensity={1.7} />
      <directionalLight position={[-8, -3, 6]} intensity={0.45} color="#c8d0ff" />
      <pointLight ref={light} position={[0, 0, 6]} intensity={28} distance={18} decay={2} color="#ffffff" />
      {HERO_BG === "field" && route === "inicio" && <PixelField />}
      <Voxels />
      {route === "proyectos" && <Tunnel />}
    </>
  );
}
