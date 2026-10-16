"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import styles from "./PixelPhoto.module.css";

type Props = { src: string; alt: string; width: number; height: number; className?: string };

/**
 * Foto que se "compila": entra pixelada y se resuelve al llegar a pantalla.
 * Después, el cursor lleva una lupa de píxeles. La <img> real queda en el HTML
 * para buscadores y lectores de pantalla; el canvas es solo decoración.
 */
export function PixelPhoto({ src, alt, width, height, className }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const b = box.current;
    const c = canvas.current;
    const im = img.current;
    if (!b || !c || !im) return;
    const ctx = c.getContext("2d")!;
    const small = document.createElement("canvas");
    const sctx = small.getContext("2d")!;
    const state = { px: prefersReducedMotion() ? 1 : 48, lens: 0, lx: -999, ly: -999 };
    let ready = false;
    let raf = 0;

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.round(b.clientWidth * dpr);
      c.height = Math.round(b.clientHeight * dpr);
    };

    const pixelated = (px: number) => {
      const w = Math.max(1, Math.round(c.width / px));
      const h = Math.max(1, Math.round(c.height / px));
      small.width = w;
      small.height = h;
      sctx.imageSmoothingEnabled = true;
      sctx.drawImage(im, 0, 0, w, h);
      return small;
    };

    const draw = () => {
      raf = 0;
      if (!ready) return;
      ctx.imageSmoothingEnabled = state.px <= 1.01;
      if (state.px <= 1.01) ctx.drawImage(im, 0, 0, c.width, c.height);
      else ctx.drawImage(pixelated(state.px), 0, 0, c.width, c.height);
      if (state.lens > 0.01 && state.px <= 1.01) {
        const r = (c.width * 0.22) * state.lens;
        ctx.save();
        ctx.beginPath();
        ctx.arc(state.lx, state.ly, r, 0, Math.PI * 2);
        ctx.clip();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(pixelated(c.width / 34), 0, 0, c.width, c.height);
        ctx.restore();
        ctx.strokeStyle = "rgba(255,255,255,0.85)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(state.lx, state.ly, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onLoad = () => {
      ready = true;
      size();
      request();
    };
    if (im.complete && im.naturalWidth) onLoad();
    else im.addEventListener("load", onLoad);

    const st = ScrollTrigger.create({
      trigger: b,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(state, { px: 1, duration: 1.6, ease: "steps(12)", onUpdate: request });
      },
    });
    const ro = new ResizeObserver(() => {
      size();
      request();
    });
    ro.observe(b);

    const move = (e: PointerEvent) => {
      const r = b.getBoundingClientRect();
      const dpr = c.width / r.width;
      state.lx = (e.clientX - r.left) * dpr;
      state.ly = (e.clientY - r.top) * dpr;
      request();
    };
    const enter = () => gsap.to(state, { lens: 1, duration: 0.4, ease: "back.out(2)", onUpdate: request });
    const leave = () => gsap.to(state, { lens: 0, duration: 0.3, onUpdate: request });
    if (!prefersReducedMotion()) {
      b.addEventListener("pointermove", move);
      b.addEventListener("pointerenter", enter);
      b.addEventListener("pointerleave", leave);
    }

    return () => {
      im.removeEventListener("load", onLoad);
      st.kill();
      ro.disconnect();
      cancelAnimationFrame(raf);
      gsap.killTweensOf(state);
      b.removeEventListener("pointermove", move);
      b.removeEventListener("pointerenter", enter);
      b.removeEventListener("pointerleave", leave);
    };
  }, [src]);

  return (
    <div ref={box} className={`${styles.box} ${className ?? ""}`} style={{ aspectRatio: `${width} / ${height}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={img} className={styles.img} src={src} alt={alt} width={width} height={height} decoding="async" />
      <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
    </div>
  );
}
