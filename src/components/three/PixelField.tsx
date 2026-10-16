"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { live, useUI } from "@/lib/store";

const COLS = 58;
const ROWS = 26;
const GAP = 0.42;
const COUNT = COLS * ROWS;
const BRAND = ["#ef685f", "#f6bd4e", "#62c453"].map((c) => new THREE.Color(c));
const REDUCED = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fondo interactivo del hero: un piso de píxeles en perspectiva.
 * - El puntero levanta los píxeles cercanos y los pinta con los colores de la marca.
 * - Cada clic lanza una onda que recorre el piso (live.ripples).
 * - La velocidad del scroll agita el campo; se desvanece al salir del hero (live.heroVis).
 */
export function PixelField() {
  const theme = useUI((s) => s.theme);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

  const geometry = useMemo(() => {
    const g = new THREE.BoxGeometry(GAP * 0.78, GAP * 0.78, 1);
    g.translate(0, 0, 0.5); // crece hacia arriba desde el piso
    return g;
  }, []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.55, metalness: 0.05, transparent: true, opacity: 0 }), []);

  const sim = useMemo(
    () => ({
      lift: new Float32Array(COUNT),
      tint: new Float32Array(COUNT),
      hue: new Uint8Array(COUNT).map((_, i) => (i * 7 + ((i / COLS) | 0) * 3) % 3),
      base: new THREE.Color(),
      far: new THREE.Color(),
      ripples: [] as { x: number; y: number; t: number }[],
      seen: 0,
      vis: 0,
    }),
    [],
  );
  const tmp = useMemo(() => ({ o: new THREE.Object3D(), c: new THREE.Color(), plane: new THREE.Plane(), hit: new THREE.Vector3(), n: new THREE.Vector3(), p: new THREE.Vector3(), nd: new THREE.Vector2() }), []);

  useEffect(() => {
    const dark = theme !== "light";
    sim.base.set(dark ? "#2a2a2f" : "#cfcfc8");
    sim.far.set(dark ? "#0b0b0c" : "#f4f4f0");
  }, [theme, sim]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
      live.ripples.length = 0;
    },
    [geometry, material],
  );

  useFrame((state, delta) => {
    const m = mesh.current;
    const g = group.current;
    if (!m || !g) return;
    const dt = Math.min(delta, 1 / 20);
    const t = state.clock.elapsedTime;
    const reduced = REDUCED;

    sim.vis += (live.heroVis - sim.vis) * (1 - Math.exp(-dt * 5));
    material.opacity = sim.vis;
    g.visible = sim.vis > 0.01;
    if (!g.visible) return;

    const mobile = size.width < 760;
    g.position.set(0, mobile ? -3.4 : -3.1, -5.5);
    g.rotation.set(-1.12, 0, 0);
    g.updateMatrixWorld();

    // Puntero → coordenadas locales del piso
    tmp.n.set(0, 0, 1).applyQuaternion(g.quaternion);
    tmp.plane.setFromNormalAndCoplanarPoint(tmp.n, g.position);
    const toLocal = (ndx: number, ndy: number) => {
      tmp.nd.set(ndx, ndy);
      state.raycaster.setFromCamera(tmp.nd, camera);
      if (!state.raycaster.ray.intersectPlane(tmp.plane, tmp.hit)) return null;
      tmp.p.copy(tmp.hit);
      g.worldToLocal(tmp.p);
      return { x: tmp.p.x, y: tmp.p.y };
    };
    const pointer = toLocal(state.pointer.x, state.pointer.y);

    // Nuevas ondas desde el DOM (clics en el hero)
    while (sim.seen < live.ripples.length) {
      const r = live.ripples[sim.seen++];
      const at = toLocal(r.x, r.y);
      if (at) sim.ripples.push({ x: at.x, y: at.y, t });
    }
    if (live.ripples.length > 40) {
      live.ripples.length = 0;
      sim.seen = 0;
    }
    sim.ripples = sim.ripples.filter((r) => t - r.t < 3.2);

    const agitation = Math.min(1.2, Math.abs(live.velocity) * 0.01);
    const R = 2.6;
    const W = COLS * GAP;
    const H = ROWS * GAP;

    for (let row = 0; row < ROWS; row++) {
      const y = row * GAP - H * 0.15;
      const depth = row / (ROWS - 1);
      for (let col = 0; col < COLS; col++) {
        const i = row * COLS + col;
        const x = col * GAP - W / 2 + GAP / 2;

        // Ola de reposo
        let h = reduced ? 0.06 : 0.06 + (Math.sin(x * 0.42 + t * 0.9) * Math.cos(y * 0.5 - t * 0.7) * 0.5 + 0.5) * (0.12 + agitation * 0.6);

        // Puntero
        let target = 0;
        if (pointer) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < R) target = (1 - d / R) ** 2;
        }
        // Ondas
        let wave = 0;
        for (let k = 0; k < sim.ripples.length; k++) {
          const r = sim.ripples[k];
          const age = t - r.t;
          const dx = x - r.x;
          const dy = y - r.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const front = age * 6.5;
          const band = 1 - Math.min(1, Math.abs(d - front) / 0.9);
          if (band > 0) wave = Math.max(wave, band * (1 - age / 3.2));
        }

        const goal = Math.max(target, wave);
        sim.lift[i] += (goal - sim.lift[i]) * (goal > sim.lift[i] ? 0.25 : 0.06);
        sim.tint[i] += (goal - sim.tint[i]) * 0.08;
        const lift = sim.lift[i];
        h += lift * 2.4;

        tmp.o.position.set(x, y, 0);
        tmp.o.scale.set(1, 1, Math.max(0.02, h));
        tmp.o.updateMatrix();
        m.setMatrixAt(i, tmp.o.matrix);

        tmp.c.copy(sim.base).lerp(BRAND[sim.hue[i]], Math.min(1, sim.tint[i] * 1.5));
        tmp.c.lerp(sim.far, Math.min(0.92, depth * 0.85 + Math.abs(x) / W * 0.6));
        m.setColorAt(i, tmp.c);
      }
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[geometry, material, COUNT]} frustumCulled={false} />
    </group>
  );
}
