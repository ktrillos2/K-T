"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectView } from "@/lib/projects";
import { cx, vars } from "@/lib/utils";
import { ProjectCover } from "./ProjectCover";
import styles from "./SiteShot.module.css";

type Props = {
  project: ProjectView;
  device?: "desktop" | "mobile";
  className?: string;
  /** Al pasar el cursor, la captura de página completa se desplaza como si alguien navegara. */
  scrollOnHover?: boolean;
  /** Fuerza el desplazamiento (p. ej. cuando el contenedor padre está activo). */
  active?: boolean;
  priority?: boolean;
  sizes?: string;
  /**
   * "natural" (por defecto): la tarjeta toma la proporción de la imagen, sin recortarla.
   * "frame": la imagen vive en un marco de tamaño fijo (navegador, celular): se muestra completa
   * y centrada dentro de él.
   */
  fit?: "natural" | "frame";
};

/**
 * Imagen real del proyecto:
 * 1. captura de página completa (public/shots, `npm run screenshots`): se recorre al pasar el cursor;
 * 2. si no hay captura, la portada del portafolio anterior (lib/covers.ts), completa y sin recortes:
 *    la tarjeta toma la proporción de la imagen (o se centra si el marco es fijo);
 * 3. si tampoco hay, la portada generativa con las iniciales.
 */
export function SiteShot({ project, device = "desktop", className, scrollOnHover = true, active, priority, sizes, fit: frame = "natural" }: Props) {
  const src = device === "mobile" ? project.imageMobile : project.image;
  const fit = project.hasShot ? "scroll" : frame === "frame" ? "contain" : "natural";
  // Proporción conocida de antemano (sin saltos de diseño) o medida al cargar la imagen.
  const [ratio, setRatio] = useState<number | undefined>(project.coverRatio);
  const [failed, setFailed] = useState(!src);
  const [travel, setTravel] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  const measure = () => {
    const b = box.current;
    const i = img.current;
    if (!b || !i || !i.naturalWidth) return;
    if (fit !== "scroll") {
      const r = i.naturalWidth / i.naturalHeight;
      setRatio((cur) => (cur && Math.abs(cur - r) < 0.01 ? cur : r));
      return;
    }
    const h = (i.naturalHeight / i.naturalWidth) * b.clientWidth;
    setTravel(Math.max(0, h - b.clientHeight));
  };

  useEffect(() => {
    setFailed(!src);
    setRatio(project.coverRatio);
  }, [src, project.coverRatio]);

  useEffect(() => {
    const b = box.current;
    if (!b) return;
    const ro = new ResizeObserver(measure);
    ro.observe(b);
    const i = img.current;
    // Si la imagen falló antes de hidratar, onError no se dispara: se revisa aquí.
    if (i?.complete) {
      if (i.naturalWidth === 0) setFailed(true);
      else measure();
    }
    return () => ro.disconnect();
  }, [src]);

  if (failed) return <ProjectCover project={project} className={cx(styles.box, className)} />;

  return (
    <div
      ref={box}
      className={cx(styles.box, scrollOnHover && styles.hoverable, active && styles.active, className)}
      data-fit={fit}
      style={vars({ "--travel": `${-travel}px`, "--dur": `${Math.max(2.5, travel / 260)}s`, ...(fit === "natural" && ratio ? { "--ratio": ratio.toFixed(4) } : {}) })}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        className={styles.img}
        data-fit={fit}
        src={src}
        crossOrigin={src && /^https?:/.test(src) ? "anonymous" : undefined}
        alt={`${project.name}: ${project.summary}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        onLoad={measure}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
