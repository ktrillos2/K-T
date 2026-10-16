"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis";
import type { ProjectView } from "@/lib/projects";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./LiveModal.module.css";

export type Device = "desktop" | "tablet" | "mobile";
export const DEVICE_WIDTH: Record<Device, number> = { desktop: 1440, tablet: 820, mobile: 390 };
const DEVICE_HEIGHT: Record<Device, number> = { desktop: 900, tablet: 1180, mobile: 844 };

type Props = { project: ProjectView; device: Device; onDevice: (d: Device) => void; onClose: () => void };

/**
 * El sitio real en vivo, en una ventana enfocada: el resto de la página queda quieto
 * (se detiene el scroll suave y se bloquea el fondo), así navegar el proyecto es cómodo.
 */
export function LiveModal({ project, device, onDevice, onClose }: Props) {
  const { t } = useI18n();
  const f = t.home.featured;
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [scale, setScale] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Bloquea el scroll de la página mientras está abierto.
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    lenisRef.current?.stop();
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      html.style.overflow = prev;
      lenisRef.current?.start();
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Entrada
  useEffect(() => {
    const r = root.current;
    if (!r || prefersReducedMotion()) return;
    gsap.fromTo(r, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
    gsap.fromTo(r.querySelector("[data-frame]"), { y: 40, scale: 0.94, rotateX: 8 }, { y: 0, scale: 1, rotateX: 0, duration: 0.7, ease: "expo.out" });
  }, [mounted]);

  // Escala el iframe para que el dispositivo quepa completo en la ventana.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth - 24;
      const h = el.clientHeight - 24;
      setScale(Math.min(1, w / DEVICE_WIDTH[device], device === "desktop" ? 10 : h / DEVICE_HEIGHT[device]));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [device, mounted]);

  useEffect(() => setLoaded(false), [device, project.slug]);

  const close = () => {
    const r = root.current;
    if (!r || prefersReducedMotion()) return onClose();
    gsap.to(r, { autoAlpha: 0, duration: 0.25, onComplete: onClose });
  };

  if (!mounted || !project.site) return null;

  const w = DEVICE_WIDTH[device];
  const deviceH = device === "desktop" ? null : DEVICE_HEIGHT[device];

  return createPortal(
    <div ref={root} className={styles.root} role="dialog" aria-modal="true" aria-label={f.frameTitle(project.name)} data-lenis-prevent onPointerDown={(e) => e.target === root.current && close()}>
      <div className={styles.frame} data-frame>
        <div className={styles.bar}>
          <span className="dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className={styles.url}>
            <i className={styles.rec} aria-hidden="true" /> {project.domain}
          </span>
          <div className={styles.devices} role="group" aria-label={f.devices.desktop}>
            {(Object.keys(DEVICE_WIDTH) as Device[]).map((d) => (
              <button key={d} type="button" aria-pressed={device === d} onClick={() => onDevice(d)} className={styles.device} title={f.devices[d]}>
                <span className={styles[`ico_${d}`]} aria-hidden="true" />
                <span className={styles.devLabel}>{f.devices[d]}</span>
              </button>
            ))}
          </div>
          <a className={styles.ext} href={project.site} target="_blank" rel="noopener noreferrer" title={f.newTab}>
            ↗<span className="sr-only">{f.newTab}</span>
          </a>
          <button ref={closeBtn} type="button" className={styles.close} onClick={close}>
            ✕ <span className={styles.closeLabel}>{f.close}</span>
          </button>
        </div>
        <div ref={stage} className={styles.stage} data-device={device}>
          <div
            className={styles.device_frame}
            style={{ width: w * scale, height: deviceH ? deviceH * scale : "100%" }}
          >
            {!loaded && <p className={styles.loading}>{t.common.loading}</p>}
            <iframe
              key={`${project.slug}-${device}`}
              src={project.site}
              title={f.frameTitle(project.name)}
              className={styles.iframe}
              style={{ width: w, height: deviceH ?? `${100 / scale}%`, transform: `scale(${scale})` }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded(true)}
            />
          </div>
        </div>
        <p className={styles.note}>
          {f.liveHint} {f.liveNote}
        </p>
      </div>
    </div>,
    document.body,
  );
}
