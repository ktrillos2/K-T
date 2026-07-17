"use client"

import { useEffect, useState } from "react"

// ─── Colores ──────────────────────────────────────────────────────────────────
const CHAR_COLOR  = "#8BC34A"
const EYE_COLOR   = "#0a0a0a"
const OBS_COLOR   = "rgba(255,255,255,0.75)"
const CLOUD_COLOR = "rgba(255,255,255,0.10)"

// ─── Dino pixel-art SVG (dos frames de carrera) ───────────────────────────────
function AlienSVG({ frame }: { frame: number }) {
  return (
    <svg
      viewBox="0 0 44 52"
      width="44"
      height="52"
      aria-hidden="true"
      style={{ shapeRendering: "crispEdges" }}
    >
       {/* Pixelated Alien */}
       {/* Head */}
       <rect x="12" y="4" width="20" height="12" fill={CHAR_COLOR} />
       {/* Body */}
       <rect x="10" y="16" width="24" height="20" fill={CHAR_COLOR} />
       {/* Antenna left */}
       <rect x="16" y="2" width="4" height="4" fill={CHAR_COLOR} />
       {/* Antenna right */}
       <rect x="24" y="2" width="4" height="4" fill={CHAR_COLOR} />
       {/* Eyes */}
       <rect x="18" y="8" width="2" height="2" fill={EYE_COLOR} />
       <rect x="24" y="8" width="2" height="2" fill={EYE_COLOR} />
    </svg>
  );
}

// ─── Cactus SVG ───────────────────────────────────────────────────────────────
function AsteroidSVG({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={Math.round(24 * scale)}
      height={Math.round(24 * scale)}
      aria-hidden="true"
      style={{ shapeRendering: "crispEdges" }}
    >
      <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.6)" />
    </svg>
  );
}

// ─── Cloud SVG ────────────────────────────────────────────────────────────────
function CloudSVG() {
  return (
    <svg
      viewBox="0 0 68 22"
      width="68"
      height="22"
      aria-hidden="true"
      style={{ shapeRendering: "crispEdges" }}
    >
      <g fill={CLOUD_COLOR}>
        <rect x="12" y="12" width="44" height="10" />
        <rect x="6"  y="6"  width="54" height="10" />
        <rect x="18" y="2"  width="30" height="6"  />
        <rect x="0"  y="14" width="16" height="6"  />
        <rect x="52" y="10" width="16" height="8"  />
      </g>
    </svg>
  )
}

// ─── CSS keyframes (inyectados una sola vez en el DOM) ────────────────────────
const STYLES = `
  @keyframes kt-obs-1 {
    from { transform: translateX(calc(100vw + 200px)); }
    to   { transform: translateX(-200px); }
  }
  @keyframes kt-obs-2 {
    from { transform: translateX(calc(100vw + 200px)); }
    to   { transform: translateX(-200px); }
  }
  @keyframes kt-obs-3 {
    from { transform: translateX(calc(100vw + 200px)); }
    to   { transform: translateX(-200px); }
  }
  @keyframes kt-cld-1 {
    from { transform: translateX(calc(100vw + 200px)); }
    to   { transform: translateX(-200px); }
  }
  @keyframes kt-cld-2 {
    from { transform: translateX(calc(100vw + 200px)); }
    to   { transform: translateX(-200px); }
  }
  @keyframes kt-ground-dots {
    from { background-position-x: 0px; }
    to   { background-position-x: -40px; }
  }
  .kt-obs-1 { animation: kt-obs-1 3.6s linear infinite; }
  .kt-obs-2 { animation: kt-obs-2 3.6s linear 1.8s infinite; }
  .kt-obs-3 { animation: kt-obs-3 4.8s linear 3.1s infinite; }
  .kt-cld-1 { animation: kt-cld-1 9s  linear infinite; }
  .kt-cld-2 { animation: kt-cld-2 13s linear 5s infinite; }
`

// ─── Componente principal ─────────────────────────────────────────────────────
export default function AlienRunner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame(f => 1 - f), 155);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{STYLES}</style>

      {/* Container */}
      <div
        role="img"
        aria-label="Animación de alien quedando obstáculos"
        className="relative w-full overflow-hidden rounded-xl border border-white/10"
        style={{ height: 140, background: "rgba(0,0,0,0.18)" }}
      >
        {/* Stars background */}
        <div className="absolute inset-0 bg-black" />
        {/* Asteroids */}
        <div className="kt-obs-1 absolute left-0 pointer-events-none" style={{ bottom: 39 }}>
          <AsteroidSVG />
        </div>
        <div className="kt-obs-2 absolute left-0 pointer-events-none" style={{ bottom: 39 }}>
          <AsteroidSVG scale={0.82} />
        </div>
        <div className="kt-obs-3 absolute left-0 pointer-events-none" style={{ bottom: 39 }}>
          <AsteroidSVG scale={1.18} />
        </div>
        {/* Alien */}
        <div className="absolute pointer-events-none" style={{ bottom: 39, left: 64 }}>
          <AlienSVG frame={frame} />
        </div>
      </div>
    </>
  );
}
