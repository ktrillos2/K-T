"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { VOXELS, chaos, getFormation, type Formation } from "@/lib/formations";
import { live, store } from "@/lib/store";

const DOT_COLORS = ["#ef685f", "#f6bd4e", "#62c453"];
const BRAND = DOT_COLORS.map((c) => new THREE.Color(c));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Vóxeles instanciados (una sola draw call) que forman el logo pixel, "</>", "$" o "404"
 * según la página. Entre rutas se desarman y vuelven a ensamblarse en arco.
 * Reaccionan al puntero (empuje + color de la marca), al scroll y a la velocidad.
 */
export function Voxels() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const dots = useRef<THREE.Mesh[]>([]);
  const { camera, size } = useThree();

  const geometry = useMemo(() => new THREE.BoxGeometry(0.9, 0.9, 0.9), []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.34, metalness: 0.12 }), []);
  const sphere = useMemo(() => new THREE.SphereGeometry(0.62, 40, 40), []);
  const dotMats = useMemo(
    () => DOT_COLORS.map((c) => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.12 })),
    [],
  );

  // Estado por vóxel (sin re-renders)
  const sim = useMemo(() => {
    const start = chaos();
    return {
      cur: start.slice(),
      from: start.slice(),
      to: start.slice(),
      sFrom: new Float32Array(VOXELS),
      sTo: new Float32Array(VOXELS),
      sCur: new Float32Array(VOXELS),
      delay: new Float32Array(VOXELS),
      arc: new Float32Array(VOXELS),
      push: new Float32Array(VOXELS),
      hue: new Float32Array(VOXELS),
      dotFrom: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()],
      dotTo: [new THREE.Vector3(0, 30, -20), new THREE.Vector3(0, 30, -20), new THREE.Vector3(0, 30, -20)],
      dotCur: [new THREE.Vector3(0, 30, -20), new THREE.Vector3(0, 30, -20), new THREE.Vector3(0, 30, -20)],
      formation: null as Formation | null,
      t0: -1,
      dur: 1.6,
      base: new THREE.Color("#f2f2ee"),
      /** Color del fondo: el polvo se mezcla con él para no competir con los títulos. */
      bg: new THREE.Color("#0b0b0c"),
    };
  }, []);

  const tmp = useMemo(
    () => ({
      o: new THREE.Object3D(),
      c: new THREE.Color(),
      v: new THREE.Vector3(),
      plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
      hit: new THREE.Vector3(),
      target: new THREE.Vector3(),
      clock: { now: 0 },
    }),
    [],
  );

  // Arranca el ensamblado con la entrada de cada página.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const morph = () => {
      const f = getFormation(store.get().formation);
      sim.formation = f;
      sim.from.set(sim.cur);
      sim.to.set(f.pos);
      sim.sFrom.set(sim.sCur);
      sim.sTo.set(f.scale);
      for (let i = 0; i < VOXELS; i++) {
        const x = f.pos[i * 3];
        sim.delay[i] = reduced ? 0 : Math.random() * 0.45 + (x + 12) * 0.018;
        sim.arc[i] = reduced ? 0 : 2 + Math.random() * 6;
      }
      // En la formación libre los tres puntos van arriba a la derecha (en pantallas anchas)
      // para no quedar encima del título del hero, que siempre está alineado a la izquierda.
      const aspect = window.innerWidth / Math.max(1, window.innerHeight);
      for (let k = 0; k < 3; k++) {
        sim.dotFrom[k].copy(sim.dotCur[k]);
        if (f.free) {
          const halfW = 10.3 * aspect;
          if (aspect > 1.55) sim.dotTo[k].set(halfW * 0.6 + k * 2.4, 6.4, -6);
          else sim.dotTo[k].set(-2.4 + k * 2.4, 8, -6);
        } else {
          sim.dotTo[k].set(f.dots[k][0], f.dots[k][1], f.dots[k][2]);
        }
      }
      sim.dur = reduced ? 0.01 : 1.5;
      sim.t0 = tmp.clock.now;
    };
    let lastEnter = store.get().enterKey;
    let lastTheme = "";
    const sync = () => {
      const s = store.get();
      if (s.theme !== lastTheme) {
        lastTheme = s.theme;
        sim.base.set(s.theme === "light" ? "#141416" : "#f2f2ee");
        sim.bg.set(s.theme === "light" ? "#f4f4f0" : "#0b0b0c");
      }
      if (s.enterKey !== lastEnter && s.loaded) {
        lastEnter = s.enterKey;
        morph();
      }
    };
    sync();
    if (store.get().loaded) morph();
    return store.subscribe(sync);
  }, [sim, tmp]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
      sphere.dispose();
      dotMats.forEach((m) => m.dispose());
    },
    [geometry, material, sphere, dotMats],
  );

  useFrame((state, delta) => {
    const m = mesh.current;
    const g = group.current;
    if (!m || !g) return;
    const dt = Math.min(delta, 1 / 20);
    tmp.clock.now += dt;
    const now = tmp.clock.now;
    const t = state.clock.elapsedTime;
    const f = sim.formation;
    const reduced = sim.dur < 0.05;

    // ---- Colocar el grupo sobre el ancla del DOM ----
    const persp = camera as THREE.PerspectiveCamera;
    const camZ = persp.position.z;
    const hWorld = 2 * Math.tan(THREE.MathUtils.degToRad(persp.fov / 2)) * camZ;
    const wWorld = hWorld * (size.width / size.height);
    let tx = 0;
    let ty = 0;
    let ts = 0.45;
    const a = live.anchor;
    if (a && f && !f.free) {
      const r = a.getBoundingClientRect();
      tx = ((r.left + r.width / 2) / size.width - 0.5) * wWorld;
      ty = -((r.top + r.height / 2) / size.height - 0.5) * hWorld;
      const sw = (r.width / size.width) * wWorld;
      const sh = (r.height / size.height) * hWorld;
      ts = Math.max(0.05, Math.min(sw / f.w, sh / f.h));
      ty -= ts * 1.2;
    } else if (!f) {
      ts = 0.4;
    }
    const k = 1 - Math.exp(-dt * 7);
    g.position.x += (tx - g.position.x) * k;
    g.position.y += (ty - g.position.y) * k;
    g.scale.setScalar(g.scale.x + (ts - g.scale.x) * k);

    // Rotación: puntero + velocidad del scroll
    const v = live.velocity;
    const ry = state.pointer.x * 0.42 + Math.sin(t * 0.35) * 0.06;
    const rx = -state.pointer.y * 0.26 + THREE.MathUtils.clamp(v * 0.006, -0.35, 0.35);
    g.rotation.y += (ry - g.rotation.y) * k;
    g.rotation.x += (rx - g.rotation.x) * k;

    // ---- Puntero en coordenadas locales del grupo ----
    state.raycaster.setFromCamera(state.pointer, camera);
    tmp.plane.constant = -g.position.z;
    let px = 1e6;
    let py = 1e6;
    if (state.raycaster.ray.intersectPlane(tmp.plane, tmp.hit)) {
      px = (tmp.hit.x - g.position.x) / g.scale.x;
      py = (tmp.hit.y - g.position.y) / g.scale.y;
    }
    const R = 4.2;

    // ---- Vóxeles ----
    for (let i = 0; i < VOXELS; i++) {
      const i3 = i * 3;
      let p = sim.t0 < 0 ? 0 : (now - sim.t0 - sim.delay[i]) / sim.dur;
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      const e = easeInOut(p);
      let x = sim.from[i3] + (sim.to[i3] - sim.from[i3]) * e;
      let y = sim.from[i3 + 1] + (sim.to[i3 + 1] - sim.from[i3 + 1]) * e;
      let z = sim.from[i3 + 2] + (sim.to[i3 + 2] - sim.from[i3 + 2]) * e + Math.sin(p * Math.PI) * sim.arc[i];
      let s = sim.sFrom[i] + (sim.sTo[i] - sim.sFrom[i]) * e;
      if (sim.t0 < 0) s = 0;
      sim.cur[i3] = x;
      sim.cur[i3 + 1] = y;
      sim.cur[i3 + 2] = z;
      sim.sCur[i] = s;

      const solid = f ? f.solid[i] === 1 : false;
      // Ola idle
      if (!reduced) {
        if (solid) z += Math.sin(t * 1.4 + x * 0.45 + y * 0.32) * 0.14;
        else {
          x += Math.sin(t * 0.3 + i) * 0.6;
          y += Math.cos(t * 0.25 + i * 1.3) * 0.6;
        }
      }
      // Empuje del puntero
      const dx = x - px;
      const dy = y - py;
      const d = Math.sqrt(dx * dx + dy * dy);
      const target = solid && d < R ? (1 - d / R) ** 2 : 0;
      sim.push[i] += (target - sim.push[i]) * 0.12;
      const pu = sim.push[i];
      if (pu > 0.001) {
        z += pu * 3.2;
        x += (dx / (d || 1)) * pu * 0.6;
        y += (dy / (d || 1)) * pu * 0.6;
        sim.hue[i] = (Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2);
      }

      tmp.o.position.set(x, y, z);
      tmp.o.rotation.set(pu * 1.4 + (solid ? 0 : t * 0.4 + i), pu * 1.1 + (solid ? 0 : t * 0.3), 0);
      tmp.o.scale.setScalar(s * (1 + pu * 0.25));
      tmp.o.updateMatrix();
      m.setMatrixAt(i, tmp.o.matrix);

      const brand = BRAND[Math.floor(sim.hue[i] * 3) % 3];
      tmp.c.copy(sim.base).lerp(brand, Math.min(1, pu * 1.6));
      if (!solid) {
        tmp.c.lerp(brand, (i % 7 === 0 ? 0.85 : 0) as number);
        // Polvo más tenue: decora sin pelear con el texto que hay encima.
        tmp.c.lerp(sim.bg, 0.45);
      }
      m.setColorAt(i, tmp.c);
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;

    // ---- Puntos de la marca ----
    for (let j = 0; j < 3; j++) {
      const dot = dots.current[j];
      if (!dot) continue;
      let p = sim.t0 < 0 ? 0 : (now - sim.t0 - 0.35 - j * 0.08) / sim.dur;
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      const e = easeInOut(p);
      sim.dotCur[j].lerpVectors(sim.dotFrom[j], sim.dotTo[j], e);
      dot.position.copy(sim.dotCur[j]);
      if (!reduced) dot.position.y += Math.sin(t * 2 + j * 0.9) * 0.18;
      const dx = dot.position.x - px;
      const dy = dot.position.y - py;
      const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 3);
      dot.scale.setScalar(sim.t0 < 0 ? 0 : 1 + near * 0.5);
      dot.position.z += near * 1.5;
    }
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[geometry, material, VOXELS]} frustumCulled={false} />
      {DOT_COLORS.map((_, j) => (
        <mesh
          key={j}
          ref={(el) => {
            if (el) dots.current[j] = el;
          }}
          geometry={sphere}
          material={dotMats[j]}
          scale={0}
        />
      ))}
    </group>
  );
}
