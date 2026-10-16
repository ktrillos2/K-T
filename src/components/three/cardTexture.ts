import * as THREE from "three";
import type { ProjectView } from "@/lib/projects";
import type { Theme } from "@/lib/store";

export const CARD_W = 768;
export const CARD_H = 480;

const BRAND: Record<ProjectView["color"], string> = { red: "#ef685f", yellow: "#f6bd4e", green: "#62c453" };

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Carga la imagen real del proyecto (captura o portada). Si no existe, se resuelve en null. */
export function loadShot(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    // Las portadas vienen de cdn.sanity.io (con CORS): sin esto el canvas quedaría "contaminado"
    // y three.js no podría subirlo como textura.
    if (/^https?:/.test(src)) img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Dibuja la tarjeta de un proyecto (ventana macOS) en un canvas. Usa la captura real
 * del sitio cuando existe; si no, una portada generativa con las iniciales.
 */
export function drawProjectCard(p: ProjectView, theme: Theme, fonts: { display: string; mono: string }, shot: HTMLImageElement | null = null) {
  const c = document.createElement("canvas");
  c.width = CARD_W;
  c.height = CARD_H;
  const ctx = c.getContext("2d")!;
  const dark = theme === "dark";
  const surface = dark ? "#141416" : "#ffffff";
  const surface2 = dark ? "#1c1c1f" : "#ecece7";
  const fg = dark ? "#f2f2ee" : "#0b0b0c";
  const muted = dark ? "#8b8b92" : "#5f5f66";
  const line = dark ? "rgba(242,242,238,0.14)" : "rgba(11,11,12,0.14)";
  const accent = BRAND[p.color];

  // Marco
  rr(ctx, 2, 2, CARD_W - 4, CARD_H - 4, 26);
  ctx.fillStyle = surface;
  ctx.fill();
  ctx.save();
  ctx.clip();

  // Barra de título
  ctx.fillStyle = surface2;
  ctx.fillRect(0, 0, CARD_W, 52);
  ["#ef685f", "#f6bd4e", "#62c453"].forEach((col, i) => {
    ctx.beginPath();
    ctx.arc(30 + i * 24, 26, 7, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.fill();
  });
  ctx.fillStyle = muted;
  ctx.font = `400 17px ${fonts.mono}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(p.domain ?? p.slug, CARD_W / 2, 27);

  // Portada generativa
  const top = 52;
  const ch = 300;
  ctx.fillStyle = surface2;
  ctx.fillRect(0, top, CARD_W, ch);
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, top, CARD_W, ch);
  ctx.clip();
  ctx.strokeStyle = line;
  ctx.fillStyle = line;
  ctx.lineWidth = 1.5;
  if (shot) {
    // Captura real: ajuste "cover" anclado arriba (la parte visible del sitio al abrirlo).
    const ratio = Math.max(CARD_W / shot.naturalWidth, ch / shot.naturalHeight);
    const w = shot.naturalWidth * ratio;
    const h = shot.naturalHeight * ratio;
    ctx.drawImage(shot, (CARD_W - w) / 2, top, w, h);
  } else if (p.pattern === "stripes") {
    for (let x = -ch; x < CARD_W; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, top + ch);
      ctx.lineTo(x + ch, top);
      ctx.stroke();
    }
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(CARD_W * 0.82, top + ch * 0.95, 150, 0, Math.PI * 2);
    ctx.fill();
  } else if (p.pattern === "dots") {
    for (let y = top + 12; y < top + ch; y += 20) for (let x = 12; x < CARD_W; x += 20) ctx.fillRect(x, y, 3, 3);
    ctx.fillStyle = accent;
    ctx.save();
    ctx.translate(CARD_W * 0.2, top + ch * 0.45);
    ctx.rotate(0.2);
    rr(ctx, -80, -80, 160, 160, 26);
    ctx.fill();
    ctx.restore();
  } else if (p.pattern === "rings") {
    for (let r = 26; r < 700; r += 28) {
      ctx.beginPath();
      ctx.arc(CARD_W * 0.7, top + ch * 0.6, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(CARD_W * 0.7, top + ch * 0.6, 58, 0, Math.PI * 2);
    ctx.fill();
  } else {
    for (let x = 0; x < CARD_W; x += 40) ctx.fillRect(x, top, 1.5, ch);
    for (let y = top; y < top + ch; y += 40) ctx.fillRect(0, y, CARD_W, 1.5);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(0, top);
    ctx.lineTo(CARD_W * 0.55, top + ch);
    ctx.lineTo(0, top + ch);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Iniciales pixel (solo sin captura)
  if (!shot) {
    ctx.fillStyle = fg;
    ctx.font = `700 176px ${fonts.display}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(p.initials, CARD_W / 2, top + ch / 2 + 6);
  }

  // Pie: nombre y meta
  ctx.fillStyle = surface;
  ctx.fillRect(0, top + ch, CARD_W, CARD_H - top - ch);
  ctx.fillStyle = line;
  ctx.fillRect(0, top + ch, CARD_W, 1.5);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = fg;
  ctx.font = `700 44px ${fonts.display}`;
  ctx.fillText(p.name, 28, top + ch + 62, CARD_W - 220);
  ctx.fillStyle = muted;
  ctx.font = `400 18px ${fonts.mono}`;
  ctx.fillText(p.sector + (p.location ? ` · ${p.location}` : ""), 28, top + ch + 100, CARD_W - 60);
  ctx.textAlign = "right";
  ctx.fillText(p.dateLabel, CARD_W - 28, top + ch + 62);
  ctx.fillStyle = accent;
  ctx.fillRect(CARD_W - 28 - 12, top + ch + 88, 12, 12);
  ctx.restore();

  // Borde
  rr(ctx, 2, 2, CARD_W - 4, CARD_H - 4, 26);
  ctx.strokeStyle = line;
  ctx.lineWidth = 3;
  ctx.stroke();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}
