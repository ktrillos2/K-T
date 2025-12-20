"use client"

import { useEffect, useRef, useCallback } from "react"
import { useCursor } from "@/context/cursor-context"

export default function CustomCursor() {
  const { cursorVariant } = useCursor()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId = useRef<number>()

  const animate = useCallback(() => {
    const dotSpeed = 0.35
    const ringSpeed = 0.15

    dotPos.current.x += (mousePos.current.x - dotPos.current.x) * dotSpeed
    dotPos.current.y += (mousePos.current.y - dotPos.current.y) * dotSpeed
    ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ringSpeed
    ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ringSpeed

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
    }

    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [animate])

  const isHover = cursorVariant === "hover"

  return (
    <>
      {/* Main dot cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference will-change-transform"
        style={{
          width: isHover ? 60 : 8,
          height: isHover ? 60 : 8,
          backgroundColor: isHover ? "transparent" : "#fff",
          border: isHover ? "2px solid #fff" : "none",
          transition: "width 0.2s, height 0.2s, background-color 0.2s, border 0.2s",
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/40 mix-blend-difference will-change-transform"
        style={{
          width: 32,
          height: 32,
          opacity: isHover ? 0 : 0.6,
          transition: "opacity 0.2s",
        }}
      />
    </>
  )
}
