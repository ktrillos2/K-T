"use client"

import { useEffect, useRef, useState } from "react"
import { useCursor } from "@/context/cursor-context"

type GameMessage = {
  type?: string
  height?: number
  detail?: {
    code?: string
    claimToken?: string
    discount?: number
    bosses?: number
  }
}

export default function NeonEscapeGame() {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [height, setHeight] = useState(920)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "700px 0px" },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMessage = (event: MessageEvent<GameMessage>) => {
      if (event.origin !== window.location.origin) return
      if (event.source !== iframeRef.current?.contentWindow) return

      const payload = event.data
      if (!payload || typeof payload !== "object") return

      if (payload.type === "kyt:game-height" && typeof payload.height === "number") {
        setHeight(Math.min(1280, Math.max(720, Math.ceil(payload.height))))
        return
      }

      const analyticsWindow = window as typeof window & {
        gtag?: (...args: unknown[]) => void
      }

      if (payload.type === "kyt:game-contact-click") {
        analyticsWindow.gtag?.("event", "game_contact_click", { game_name: "neon_escape" })
        window.dispatchEvent(new CustomEvent("kyt:game-contact-click"))
        return
      }

      if (payload.type === "kyt:discount-earned") {
        analyticsWindow.gtag?.("event", "game_discount_earned", {
          game_name: "neon_escape",
          discount: payload.detail?.discount ?? 10,
          bosses: payload.detail?.bosses ?? 3,
        })
        window.dispatchEvent(
          new CustomEvent("kyt:discount-earned", {
            detail: payload.detail ?? {},
          }),
        )
        return
      }

      if (payload.type === "kyt:game-start" || payload.type === "kyt:game-complete") {
        analyticsWindow.gtag?.("event", payload.type === "kyt:game-start" ? "play_game" : "complete_game", {
          game_name: "neon_escape",
          ...(payload.detail ?? {}),
        })
        window.dispatchEvent(new CustomEvent(payload.type, { detail: payload.detail ?? {} }))
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const { setCursorVariant } = useCursor()

  return (
    <section
      ref={containerRef}
      aria-labelledby="neon-escape-title"
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl"
      onMouseEnter={() => setCursorVariant("hidden")}
      onMouseLeave={() => setCursorVariant("default")}
    >
      <div className="sr-only">
        <h3 id="neon-escape-title">Neon Escape: minijuego accesible para computador y celular</h3>
        <p>
          Recoge estrellas, desbloquea poderes, supera tres jefes y consigue un código de descuento verificable.
        </p>
      </div>

      {shouldLoad ? (
        <iframe
          ref={iframeRef}
          title="Neon Escape, minijuego de K&T Code"
          src="/games/neon-escape.html"
          loading="lazy"
          className="block w-full border-0 bg-black transition-[height] duration-300"
          style={{ height }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
          allow="clipboard-write"
        />
      ) : (
        <div
          className="grid min-h-[720px] place-items-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_45%)] px-6 text-center"
          aria-busy="true"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/50">Preparando el juego</p>
            <p className="mt-3 font-title text-2xl text-white">Neon Escape</p>
          </div>
        </div>
      )}
    </section>
  )
}
