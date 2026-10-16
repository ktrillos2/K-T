"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { store } from "@/lib/store";
import { lerp } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./Cursor.module.css";

/**
 * Cursor líquido:
 * - el anillo sigue al puntero con inercia y se estira en la dirección del movimiento
 *   (squash & stretch según la velocidad);
 * - sobre [data-stick] se pega al elemento y toma su forma;
 * - sobre [data-cursor="Texto"] o un objeto 3D muestra una etiqueta.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const { t } = useI18n();
  const viewRef = useRef(t.cursor.view);
  viewRef.current = t.cursor.view;

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = ring.current;
    const d = dot.current;
    const lb = label.current;
    if (!fine || !r || !d || !lb) return;
    document.documentElement.classList.add("has-cursor");

    const BASE = 36;
    let mx = -100;
    let my = -100;
    let x = -100;
    let y = -100;
    let px = x;
    let py = y;
    let sx = 1;
    let sy = 1;
    let ang = 0;
    let w = BASE;
    let h = BASE;
    let radius = BASE / 2;
    let visible = false;
    let stick: HTMLElement | null = null;
    let mode: "none" | "link" | "label" | "text" | "hidden" = "none";
    let labelText = "";
    let labelW = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        x = px = mx;
        y = py = my;
        r.dataset.visible = "true";
        d.dataset.visible = "true";
      }
    };
    const onLeave = () => {
      visible = false;
      r.dataset.visible = "false";
      d.dataset.visible = "false";
    };
    const onDown = () => r.classList.add(styles.down);
    const onUp = () => r.classList.remove(styles.down);

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest) return;
      if (t.closest("[data-cursor-hide]")) {
        stick = null;
        mode = "hidden";
        return;
      }
      const stickEl = t.closest<HTMLElement>("[data-stick]");
      const lab = t.closest<HTMLElement>("[data-cursor]");
      const link = t.closest("a, button, [role='button'], label, summary");
      const text = t.closest("input, textarea, [contenteditable='true']");
      stick = stickEl;
      if (lab) {
        mode = "label";
        labelText = lab.dataset.cursor || viewRef.current;
      } else if (text) mode = "text";
      else if (link) mode = "link";
      else mode = "none";
    };

    const unsub = store.subscribe(() => {
      const l = store.get().cursorLabel;
      if (l) {
        mode = "label";
        labelText = l;
      } else if (mode === "label" && !document.querySelector("[data-cursor]:hover")) {
        mode = "none";
      }
    });

    // Radio de cada botón "pegajoso" (getComputedStyle en cada frame forzaba un recálculo de estilos).
    const radii = new WeakMap<HTMLElement, number>();
    // Últimos valores escritos: solo se toca el DOM cuando algo cambia.
    const last = { w: "", h: "", br: "", rt: "", dt: "", mode: "", hidden: "", hide: "", lt: "" };
    const put = (k: keyof typeof last, v: string, apply: (v: string) => void) => {
      if (last[k] !== v) {
        last[k] = v;
        apply(v);
      }
    };

    const tick = () => {
      if (!visible) return;
      const s3d = store.get().cursorLabel;
      const off = document.documentElement.classList.contains("cursor-off");
      const m = off ? "hidden" : s3d ? "label" : mode;
      const txt = s3d ?? labelText;

      let tx = mx;
      let ty = my;
      let tw = BASE;
      let th = BASE;
      let tr = BASE / 2;

      if (stick && m !== "label") {
        const b = stick.getBoundingClientRect();
        let rad = radii.get(stick);
        if (rad === undefined) {
          rad = parseFloat(getComputedStyle(stick).borderTopLeftRadius) || 10;
          radii.set(stick, rad);
        }
        // El anillo se pega al botón pero se deja arrastrar un poco hacia el puntero.
        tx = b.left + b.width / 2 + (mx - (b.left + b.width / 2)) * 0.12;
        ty = b.top + b.height / 2 + (my - (b.top + b.height / 2)) * 0.12;
        tw = b.width + 12;
        th = b.height + 12;
        tr = rad + 6;
      } else if (m === "label") {
        // Píldora horizontal que se ajusta al texto para que siempre se lea completo.
        if (lb.textContent !== txt) {
          lb.textContent = txt;
          labelW = lb.scrollWidth || 0;
        }
        const short = labelW < 56;
        tw = short ? 76 : labelW + 40;
        th = short ? 76 : 46;
        tr = th / 2;
      } else if (m === "link") {
        tw = th = 60;
        tr = 30;
      } else if (m === "text") {
        tw = 4;
        th = 30;
        tr = 2;
      }

      const k = reduced ? 1 : 0.2;
      x = lerp(x, tx, stick ? 0.25 : k);
      y = lerp(y, ty, stick ? 0.25 : k);
      w = lerp(w, tw, 0.22);
      h = lerp(h, th, 0.22);
      radius = lerp(radius, tr, 0.22);

      // Deformación por velocidad
      const vx = x - px;
      const vy = y - py;
      px = x;
      py = y;
      const speed = Math.min(Math.hypot(vx, vy), 80);
      // Con etiqueta o pegado a un botón el anillo no se estira ni gira (el texto debe leerse recto).
      const calm = !!stick || reduced || m === "label";
      const stretch = calm ? 0 : Math.min(speed / 45, 0.75);
      if (speed > 0.6 && !calm) ang = Math.atan2(vy, vx);
      sx = lerp(sx, 1 + stretch, calm ? 0.5 : 0.25);
      sy = lerp(sy, 1 - stretch * 0.45, calm ? 0.5 : 0.25);
      const rot = calm ? 0 : ang;

      put("w", `${w.toFixed(1)}px`, (v) => (r.style.width = v));
      put("h", `${h.toFixed(1)}px`, (v) => (r.style.height = v));
      put("br", `${radius.toFixed(1)}px`, (v) => (r.style.borderRadius = v));
      put("rt", `translate3d(${(x - w / 2).toFixed(2)}px, ${(y - h / 2).toFixed(2)}px, 0) rotate(${rot.toFixed(3)}rad) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`, (v) => (r.style.transform = v));
      put("dt", `translate3d(${mx - 3}px, ${my - 3}px, 0)`, (v) => (d.style.transform = v));
      put("mode", m, (v) => (r.dataset.mode = v));
      put("hidden", String(m === "hidden"), (v) => (r.dataset.hidden = v));
      put("hide", String(m === "label" || m === "text" || m === "hidden" || !!stick), (v) => (d.dataset.hide = v));
      put("lt", `rotate(${(-rot).toFixed(3)}rad) scale(${(1 / sx).toFixed(3)}, ${(1 / sy).toFixed(3)})`, (v) => (lb.style.transform = v));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    gsap.ticker.add(tick);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      gsap.ticker.remove(tick);
      unsub();
    };
  }, []);

  return (
    <>
      <div ref={ring} className={styles.ring} data-visible="false" aria-hidden="true">
        <span ref={label} className={styles.label} />
      </div>
      <div ref={dot} className={styles.dot} data-visible="false" aria-hidden="true" />
    </>
  );
}
