"use client"

import { useEffect, useState, useRef } from "react"
import { useInView, useReducedMotion } from "framer-motion"

// ─── Colors ─────────────────────────────────────────────────────────────────────
const CHAR_COLOR = "#8BC34A"
const EYE_COLOR = "#0a0a0a"
const OBS_COLOR = "rgba(255,255,255,0.75)"
const CLOUD_COLOR = "rgba(255,255,255,0.10)"

// ─── Alien pixel-art SVG (two frames) ────────────────────────────────────────────────
function AlienSVG({ frame }: { frame: number }) {
  return (
    <svg viewBox="0 0 44 52" width="44" height="52" aria-hidden="true" style={{ shapeRendering: "crispEdges" }}>
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
      {/* Legs */}
      <rect x="12" y="36" width="4" height="6" fill={CHAR_COLOR} />
      <rect x="28" y="36" width="4" height="6" fill={CHAR_COLOR} />
    </svg>
  )
}

// ─── Asteroid SVG (obstacle) ────────────────────────────────────────────────────
function AsteroidSVG({ scale = 1 }: { scale?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={Math.round(24 * scale)} height={Math.round(24 * scale)} aria-hidden="true" style={{ shapeRendering: "crispEdges" }}>
      <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.6)" />
    </svg>
  )
}

// ─── Cloud SVG ───────────────────────────────────────────────────────────────────
function CloudSVG() {
  return (
    <svg viewBox="0 0 68 22" width="68" height="22" aria-hidden="true" style={{ shapeRendering: "crispEdges" }}>
      <g fill={CLOUD_COLOR}>
        <rect x="12" y="12" width="44" height="10" />
        <rect x="6" y="6" width="54" height="10" />
        <rect x="18" y="2" width="30" height="6" />
        <rect x="0" y="14" width="16" height="6" />
        <rect x="52" y="10" width="16" height="8" />
      </g>
    </svg>
  )
}

export default function AlienRunner() {
  const [frame, setFrame] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "200px" })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }, [isInView, prefersReducedMotion])

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => setFrame(f => 1 - f), 155)
    return () => clearInterval(id)
  }, [isPlaying])

  const STYLES = `
    @keyframes kt-obs-slide { 
      from { transform: translateX(50px); } 
      to   { transform: translateX(calc(-100vw - 200px)); } 
    }
    @keyframes kt-alien-run {
      0%, 100% { transform: translateY(0); }
      25%, 75% { transform: translateY(-120px); }
      50% { transform: translateY(0); }
    }
    .kt-alien-1, .kt-alien-2, .kt-alien-3 { animation: kt-alien-run 4s linear infinite; animation-play-state: ${isPlaying ? 'running' : 'paused'}; }
    .kt-alien-1 { animation-delay: 0s; }
    .kt-alien-2 { animation-delay: 1.8s; }
    .kt-alien-3 { animation-delay: 3.1s; }
    .kt-obs-1 { left: 100%; animation: kt-obs-slide 5s linear infinite; animation-play-state: ${isPlaying ? 'running' : 'paused'}; }
    .kt-obs-2 { left: 100%; animation: kt-obs-slide 5s linear 1.8s infinite; animation-play-state: ${isPlaying ? 'running' : 'paused'}; }
    .kt-obs-3 { left: 100%; animation: kt-obs-slide 6s linear 3.1s infinite; animation-play-state: ${isPlaying ? 'running' : 'paused'}; }
  `

  return (
    <>
      <style>{STYLES}</style>
      {/* Main animation container (full width) */}
      <div ref={containerRef} role="img" aria-label="Animación de alien esquivando obstáculos" className="relative w-full overflow-hidden rounded-xl border border-white/10" style={{ height: 140, background: "rgba(0,0,0,0.18)" }}>
        <div className="absolute inset-0 bg-black" />
        {/* Obstacles */}
        <div className="kt-obs-1 absolute left-0 pointer-events-none" style={{ bottom: 39, zIndex: 0 }}>
          <AsteroidSVG />
        </div>
        {/* Alien (three instances for synchronized jumps) */}
        <div className="kt-alien-1 absolute pointer-events-none" style={{ bottom: 39, left: 64, zIndex: 10 }}>
          <AlienSVG frame={frame} />
        </div>
        <div className="kt-alien-2 absolute pointer-events-none" style={{ bottom: 39, left: 64, zIndex: 10 }}>
          <AlienSVG frame={frame} />
        </div>
        <div className="kt-alien-3 absolute pointer-events-none" style={{ bottom: 39, left: 64, zIndex: 10 }}>
          <AlienSVG frame={frame} />
        </div>
        <div className="kt-obs-2 absolute left-0 pointer-events-none" style={{ bottom: 39 }}>
          <AsteroidSVG scale={0.82} />
        </div>
        <div className="kt-obs-3 absolute left-0 pointer-events-none" style={{ bottom: 39 }}>
          <AsteroidSVG scale={1.18} />
        </div>

      </div>
    </>
  )
}
