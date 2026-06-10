"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { m as motion, AnimatePresence } from "framer-motion"
import { Play, Check, Monitor, Code2, Terminal } from "lucide-react"

const codeLines = [
  { text: "import { useState } from 'react';", indent: 0 },
  { text: "", indent: 0 },
  { text: "function Counter() {", indent: 0 },
  { text: "const [count, setCount] = useState(0);", indent: 1 },
  { text: "", indent: 0 },
  { text: "const increment = () => {", indent: 1 },
  { text: "setCount(prev => prev + 1);", indent: 2 },
  { text: "};", indent: 1 },
  { text: "", indent: 0 },
  { text: "return (", indent: 1 },
  { text: "<div className='app'>", indent: 2 },
  { text: "<h1>Counter</h1>", indent: 3 },
  { text: "<span>{count}</span>", indent: 3 },
  { text: "<button onClick={increment}>", indent: 3 },
  { text: "+1", indent: 4 },
  { text: "</button>", indent: 3 },
  { text: "</div>", indent: 2 },
  { text: ");", indent: 1 },
  { text: "}", indent: 0 },
]

const MouseCursor = memo(
  ({ x, y, clicking, visible }: { x: number; y: number; clicking: boolean; visible: boolean }) => (
    <motion.div
      className="absolute z-[100] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{
        x,
        y,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
        y: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
        opacity: { duration: 0.2 },
      }}
    >
      {/* Trail particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/40"
          style={{
            top: -2 + i * 4,
            left: -2 + i * 2,
          }}
          animate={{
            opacity: clicking ? 0.6 : 0.2 - i * 0.05,
            scale: clicking ? 1.5 : 1 - i * 0.2,
          }}
          transition={{ duration: 0.15, delay: i * 0.02 }}
        />
      ))}

      {/* Main cursor SVG */}
      <motion.svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        animate={{
          scale: clicking ? 0.75 : 1,
          rotate: clicking ? -8 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}
      >
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L5.94 2.91a.5.5 0 0 0-.44.3z"
          fill="white"
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* Click ripple effects */}
      <AnimatePresence>
        {clicking && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-2 left-1 rounded-full border-2 border-white"
                initial={{ width: 8, height: 8, opacity: 1 }}
                animate={{ width: 60, height: 60, opacity: 0, x: -26, y: -26 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              />
            ))}
            <motion.div
              className="absolute top-2 left-1 w-4 h-4 rounded-full bg-white"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  ),
)
MouseCursor.displayName = "MouseCursor"

const TypedLine = memo(
  ({ text, lineNumber, isActive, indent }: { text: string; lineNumber: number; isActive: boolean; indent: number }) => {
    const [displayedText, setDisplayedText] = useState("")
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
      if (!text) {
        setDisplayedText("")
        setIsComplete(true)
        return
      }

      let currentIndex = 0
      setIsComplete(false)
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, 20)

      return () => clearInterval(interval)
    }, [text])

    const highlightSyntax = (code: string) => {
      return code
        .replace(
          /(import|from|export|default|function|const|return|useState|prev)/g,
          '<span class="text-fuchsia-400 font-semibold">$1</span>',
        )
        .replace(/('.*?'|".*?")/g, '<span class="text-emerald-400">$1</span>')
        .replace(/(=&gt;|=>)/g, '<span class="text-amber-400">$1</span>')
        .replace(/(count|setCount|increment|onClick|className)/g, '<span class="text-sky-400">$1</span>')
        .replace(/(&lt;\/?[a-zA-Z0-9]+|<\/?[a-zA-Z0-9]+)/g, '<span class="text-rose-400">$1</span>')
        .replace(/(\{|\}|$$|$$|\[|\])/g, '<span class="text-amber-300">$1</span>')
    }

    const indentSpaces = "  ".repeat(indent)

    return (
      <motion.div
        className="flex font-mono leading-relaxed"
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.15 }}
      >
        <span className="text-white/25 w-8 text-right mr-4 select-none text-xs tabular-nums">{lineNumber}</span>
        <span className="text-white/30 select-none">{indentSpaces}</span>
        <span
          className="text-white/90 text-xs whitespace-pre"
          dangerouslySetInnerHTML={{ __html: highlightSyntax(displayedText) }}
        />
        {isActive && !isComplete && (
          <motion.span
            className="inline-block w-[2px] h-[14px] bg-white ml-[1px] translate-y-[1px]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          />
        )}
      </motion.div>
    )
  },
)
TypedLine.displayName = "TypedLine"

const CounterPreview = memo(() => {
  const [count, setCount] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 60, y: 40 })
  const [isClicking, setIsClicking] = useState(false)
  const [showMouse, setShowMouse] = useState(false)

  useEffect(() => {
    const runSequence = async () => {
      await new Promise((r) => setTimeout(r, 500))
      setShowMouse(true)

      // Move to button area
      await new Promise((r) => setTimeout(r, 300))
      setMousePos({ x: 90, y: 120 })

      // Click sequence
      for (let i = 0; i < 7; i++) {
        await new Promise((r) => setTimeout(r, 400))
        // Slight random movement before click
        setMousePos({ x: 88 + Math.random() * 8, y: 118 + Math.random() * 6 })
        await new Promise((r) => setTimeout(r, 100))
        setIsClicking(true)
        await new Promise((r) => setTimeout(r, 100))
        setCount((prev) => prev + 1)
        await new Promise((r) => setTimeout(r, 100))
        setIsClicking(false)
      }
    }
    runSequence()
  }, [])

  return (
    <div className="w-full max-w-[280px] bg-white rounded-xl shadow-2xl overflow-hidden relative">
      {/* Browser bar */}
      <div className="bg-neutral-800 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex-1 mx-2 bg-white/10 rounded-md px-3 py-1">
          <span className="text-white/50 text-[10px] font-mono">localhost:3000</span>
        </div>
      </div>

      {/* App content */}
      <div className="p-8 text-center bg-gradient-to-b from-neutral-50 to-white relative h-[160px]">
        <motion.h3
          className="text-lg font-bold text-neutral-900 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Counter
        </motion.h3>

        {/* Counter display */}
        <motion.div
          className="text-5xl font-bold text-neutral-800 mb-5 font-mono"
          key={count}
          animate={{
            scale: [1, 1.3, 1],
            color: ["#262626", "#3b82f6", "#262626"],
          }}
          transition={{ duration: 0.25 }}
        >
          {count}
        </motion.div>

        {/* Button */}
        <motion.button
          className="px-6 py-2.5 bg-black text-white rounded-lg text-sm font-semibold relative overflow-hidden"
          animate={{
            scale: isClicking ? 0.92 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          +1
          <AnimatePresence>
            {isClicking && (
              <motion.div
                className="absolute inset-0 bg-white/40"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        {/* Preview mouse cursor */}
        {showMouse && (
          <motion.div
            className="absolute pointer-events-none z-20"
            animate={{ left: mousePos.x, top: mousePos.y }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
          >
            <motion.svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              animate={{ scale: isClicking ? 0.8 : 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
            >
              <path
                d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L5.94 2.91a.5.5 0 0 0-.44.3z"
                fill="black"
                stroke="white"
                strokeWidth="1.5"
              />
            </motion.svg>
            {isClicking && (
              <motion.div
                className="absolute top-1 left-0 w-3 h-3 rounded-full bg-black/50"
                initial={{ scale: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
})
CounterPreview.displayName = "CounterPreview"

export default function CodeAnimation() {
  const [phase, setPhase] = useState<"typing" | "moving" | "clicking" | "compiling" | "preview">("typing")
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [mousePos, setMousePos] = useState({ x: 50, y: 60 })
  const [isClicking, setIsClicking] = useState(false)
  const [compileProgress, setCompileProgress] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  const resetAnimation = useCallback(() => {
    setPhase("typing")
    setVisibleLines(0)
    setMousePos({ x: 50, y: 60 })
    setIsClicking(false)
    setCompileProgress(0)
    setShowCursor(true)
  }, [])

  // Typing phase: faster speed
  useEffect(() => {
    if (phase === "typing") {
      const interval = setInterval(() => {
        setVisibleLines((prev) => {
          const newVal = prev + 1
          // Mouse follows the typing position smoothly
          setMousePos({
            x: 100 + (codeLines[Math.min(newVal - 1, codeLines.length - 1)]?.text?.length || 0) * 8.5, // Adjusted char width
            y: 55 + newVal * 20, // Adjusted line height matches rendering
          })

          if (newVal >= codeLines.length) {
            clearInterval(interval)
            setTimeout(() => setPhase("moving"), 200) // Lower delay before moving
            return prev
          }
          return newVal
        })
      }, 40) // Much faster typing (was 180)
      return () => clearInterval(interval)
    }
  }, [phase])

  // Mouse movement: Bezier curve for natural feel
  useEffect(() => {
    if (phase === "moving") {
      const animateMouse = async () => {
        const start = { x: mousePos.x, y: mousePos.y }
        const end = { x: 335, y: 35 } // Target: Run button
        const control = { x: 150, y: 150 } // Control point for curve

        const duration = 1000 // 1 second movement
        const startTime = performance.now()

        const move = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const t = Math.min(elapsed / duration, 1)

          // Quadratic Bezier: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
          const x = Math.pow(1 - t, 2) * start.x + 2 * (1 - t) * t * control.x + Math.pow(t, 2) * end.x
          const y = Math.pow(1 - t, 2) * start.y + 2 * (1 - t) * t * control.y + Math.pow(t, 2) * end.y

          setMousePos({ x, y })

          if (t < 1) {
            requestAnimationFrame(move)
          } else {
            setPhase("clicking")
          }
        }

        requestAnimationFrame(move)
      }
      animateMouse()
    }
  }, [phase])

  useEffect(() => {
    if (phase === "clicking") {
      const clickSequence = async () => {
        setIsClicking(true)
        await new Promise((r) => setTimeout(r, 150))
        setIsClicking(false)
        await new Promise((r) => setTimeout(r, 100))
        setPhase("compiling")
      }
      clickSequence()
    }
  }, [phase])

  useEffect(() => {
    if (phase === "compiling") {
      setShowCursor(false)
      const interval = setInterval(() => {
        setCompileProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setPhase("preview"), 200)
            return 100
          }
          return prev + 8 // Faster compile
        })
      }, 20)
      return () => clearInterval(interval)
    }
  }, [phase])

  useEffect(() => {
    if (phase === "preview") {
      setTimeout(resetAnimation, 3000) // Shorter preview time
    }
  }, [phase, resetAnimation])

  return (
    <div className="relative w-full h-full bg-neutral-950 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* IDE Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="ml-2 text-white/50 font-mono text-xs">Counter.tsx</span>
        </div>

        {/* Run button */}
        <motion.button
          className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${phase === "compiling"
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
              : phase === "preview"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
            }`}
          animate={{
            scale: isClicking ? 0.88 : 1,
            boxShadow: isClicking
              ? "0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(255,255,255,0.3)"
              : "0 0 0px rgba(255,255,255,0)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {phase === "compiling" ? (
            <>
              <motion.div
                className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <span>Building...</span>
            </>
          ) : phase === "preview" ? (
            <>
              <Check className="w-3 h-3" />
              <span>Done!</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3" fill="currentColor" />
              <span>Run</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-neutral-900/50">
        <div
          className={`flex items-center gap-2 px-4 py-2 border-r border-white/10 ${phase !== "preview" ? "bg-neutral-950" : ""}`}
        >
          <Code2 className="w-3 h-3 text-sky-400" />
          <span className="text-white/80 font-mono text-xs">Code</span>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 ${phase === "preview" ? "bg-neutral-950" : ""}`}>
          <Monitor className="w-3 h-3 text-white/40" />
          <span className="text-white/40 font-mono text-xs">Preview</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2">
          <Terminal className="w-3 h-3 text-white/40" />
          <span className="text-white/40 font-mono text-xs">Console</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-[calc(100%-80px)] overflow-hidden">
        <AnimatePresence mode="wait">
          {phase !== "preview" ? (
            <motion.div
              key="code"
              className="p-4 space-y-0.5"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              {codeLines.slice(0, visibleLines).map((line, index) => (
                <TypedLine
                  key={index}
                  text={line.text}
                  lineNumber={index + 1}
                  isActive={index === visibleLines - 1}
                  indent={line.indent}
                />
              ))}

              {/* Compile progress */}
              {phase === "compiling" && (
                <motion.div
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <span className="text-amber-400 text-xs font-mono">Compiling... {compileProgress}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${compileProgress}%` }}
                      transition={{ ease: "linear" }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              className="w-full h-full flex items-center justify-center p-6"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <CounterPreview />

              {/* Success badge */}
              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-mono text-xs font-medium">Build successful!</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main mouse cursor */}
        <MouseCursor x={mousePos.x} y={mousePos.y} clicking={isClicking} visible={showCursor && phase !== "preview"} />
      </div>
    </div>
  )
}
