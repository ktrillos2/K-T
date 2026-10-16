"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { PROJECTS } from "@/lib/projects";
import { live, store, useUI } from "@/lib/store";
import { ari, fira } from "@/app/fonts";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsFor } from "@/i18n";
import { useNavigate } from "@/components/transition/TransitionProvider";
import { drawProjectCard, loadShot } from "./cardTexture";

const GAP = 7.5;
const N = PROJECTS.length;
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Túnel de proyectos: las 22 tarjetas viven en profundidad (eje Z) y el scroll
 * las trae hacia la cámara en espiral. La niebla oculta las lejanas.
 */
export function Tunnel() {
  const theme = useUI((s) => s.theme);
  // El Canvas de R3F reenvía los contextos de React, así que el idioma y la navegación llegan aquí.
  const { lang, t, href } = useI18n();
  const navigate = useNavigate();
  const items = useMemo(() => projectsFor(lang), [lang]);
  const { scene, size } = useThree();
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.Mesh[]>([]);
  const hovered = useRef(-1);
  const scales = useRef<number[]>(PROJECTS.map(() => 1));
  const [textures, setTextures] = useState<THREE.CanvasTexture[] | null>(null);
  const texRef = useRef<THREE.CanvasTexture[] | null>(null);

  const geometry = useMemo(() => new THREE.PlaneGeometry(4.8, 3), []);
  const materials = useMemo(
    () => PROJECTS.map(() => new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, toneMapped: false, side: THREE.DoubleSide })),
    [],
  );

  // Texturas: se dibujan con las fuentes reales cuando están cargadas, y se rehacen al cambiar de tema.
  useEffect(() => {
    let alive = true;
    const display = ari.style.fontFamily;
    const mono = fira.style.fontFamily;
    const fonts = Promise.all([document.fonts.load(`700 44px ${display}`), document.fonts.load(`400 18px ${mono}`)]).catch(() => []);
    const shots = Promise.all(items.map((p) => (p.image ? loadShot(p.image) : Promise.resolve(null))));
    Promise.all([fonts, shots])
      .then(([, imgs]) => {
        if (!alive) return;
        const tx = items.map((p, i) => drawProjectCard(p, theme, { display, mono }, imgs[i]));
        texRef.current?.forEach((t) => t.dispose());
        texRef.current = tx;
        setTextures(tx);
      });
    return () => {
      alive = false;
    };
  }, [theme, items]);

  useEffect(() => {
    if (!textures) return;
    materials.forEach((m, i) => {
      m.map = textures[i];
      m.needsUpdate = true;
    });
  }, [textures, materials]);

  // Niebla del color del fondo
  useEffect(() => {
    const prev = scene.fog;
    const color = theme === "light" ? "#f4f4f0" : "#0b0b0c";
    scene.fog = new THREE.Fog(color, 16, 52);
    return () => {
      scene.fog = prev;
    };
  }, [scene, theme]);

  useEffect(
    () => () => {
      store.set({ cursorLabel: null });
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      texRef.current?.forEach((t) => t.dispose());
      texRef.current = null;
    },
    [geometry, materials],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const vis = live.tunnelVis;
    g.visible = vis > 0.01;
    if (!g.visible) return;
    const mobile = size.width < 760;
    const R = mobile ? 1.6 : 3.7;
    const base = mobile ? 0.6 : 1;
    const offset = live.tunnel * (N - 1) * GAP;
    const k = 1 - Math.exp(-Math.min(delta, 0.05) * 8);
    const wobble = THREE.MathUtils.clamp(live.velocity * 0.004, -0.25, 0.25);
    live.tunnelIndex = Math.round(live.tunnel * (N - 1));

    for (let i = 0; i < N; i++) {
      const m = meshes.current[i];
      if (!m) continue;
      const z = -i * GAP + offset + 3;
      const near = smooth(-34, 3, z);
      const ang = i * 2.399963;
      const sx = Math.cos(ang) * R * 1.25;
      const sy = Math.sin(ang) * R * 0.72;
      const cx = mobile ? 0 : 1.1;
      const x = sx * (1 - near * 0.82) + cx * near;
      const y = sy * (1 - near * 0.82) - 0.15 * near;
      m.position.set(x, y, z);

      const fade = 1 - smooth(5.2, 9.6, z);
      const mat = materials[i];
      mat.opacity = textures ? vis * fade : 0;
      m.visible = mat.opacity > 0.02;

      const hov = hovered.current === i;
      const tRotY = -x * 0.06 + wobble + (hov ? state.pointer.x * 0.28 : 0);
      const tRotX = y * 0.05 - (hov ? state.pointer.y * 0.22 : 0);
      m.rotation.y += (tRotY - m.rotation.y) * k;
      m.rotation.x += (tRotX - m.rotation.x) * k;
      m.rotation.z += (-wobble * 0.4 - m.rotation.z) * k;
      scales.current[i] += ((hov ? 1.06 : 1) - scales.current[i]) * k;
      m.scale.setScalar(base * scales.current[i]);
    }
  });

  const over = (i: number) => (e: ThreeEvent<PointerEvent>) => {
    if (materials[i].opacity < 0.4) return;
    e.stopPropagation();
    hovered.current = i;
    store.set({ cursorLabel: t.cursor.open });
  };
  const out = (i: number) => () => {
    if (hovered.current === i) {
      hovered.current = -1;
      store.set({ cursorLabel: null });
    }
  };
  const click = (i: number) => (e: ThreeEvent<MouseEvent>) => {
    if (materials[i].opacity < 0.4 || live.tunnelVis < 0.5) return;
    e.stopPropagation();
    store.set({ cursorLabel: null });
    navigate(href(items[i].href));
  };

  return (
    <group ref={group}>
      {PROJECTS.map((p, i) => (
        <mesh
          key={p.slug}
          ref={(el) => {
            if (el) meshes.current[i] = el;
          }}
          geometry={geometry}
          material={materials[i]}
          onPointerOver={over(i)}
          onPointerOut={out(i)}
          onClick={click(i)}
        />
      ))}
    </group>
  );
}
