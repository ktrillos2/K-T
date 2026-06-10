"use client"

import { useEffect, useRef, useState } from "react"
import { m as motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Monitor, Cpu, Globe, Server, Code2, Terminal, Database, Cloud, Braces, Hash, Command } from "lucide-react"

const symbols = [
    { icon: Code2, x: 20, y: 20, scale: 1.2, delay: 0 },
    { icon: Terminal, x: 80, y: 15, scale: 0.9, delay: 1 },
    { icon: Database, x: 15, y: 80, scale: 1.1, delay: 2 },
    { icon: Cloud, x: 85, y: 75, scale: 1.0, delay: 3 },
    { icon: Monitor, x: 50, y: 10, scale: 0.8, delay: 1.5 },
    { icon: Server, x: 10, y: 50, scale: 0.9, delay: 2.5 },
    { icon: Cpu, x: 90, y: 50, scale: 1.1, delay: 0.5 },
    { icon: Braces, x: 30, y: 85, scale: 0.8, delay: 1.2 },
    { icon: Hash, x: 70, y: 85, scale: 1.0, delay: 2.2 },
    { icon: Command, x: 92, y: 30, scale: 0.9, delay: 1.8 },
]

const matrixChars = "010101<>[]{}/\\|@#$_-+=*&%"

export default function ProgrammingAnimation() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Mouse interaction for 3D tilt
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 30, stiffness: 200 })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 30, stiffness: 200 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        mouseX.set(x)
        mouseY.set(y)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    // Matrix Rain Drops
    const [drops, setDrops] = useState<Array<{ x: number, delay: number, speed: number }>>([])

    useEffect(() => {
        setDrops(Array.from({ length: 15 }).map(() => ({
            x: Math.random() * 100,
            delay: Math.random() * 5,
            speed: Math.random() * 10 + 10
        })))
    }, [])

    return (
        <div
            className="relative w-full h-full perspective-[1000px] group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                ref={containerRef}
                className="relative w-full h-full overflow-hidden bg-zinc-950 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
                {/* Deep Space Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black z-0" />

                {/* Animated Grid Floor */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"
                    style={{ transform: "perspective(500px) rotateX(60deg) translateY(100px) scale(2)", opacity: 0.3 }}
                />

                {/* Matrix Rain Effect */}
                {drops.map((drop, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-0 text-[10px] font-mono leading-none text-cyan-500/30 writing-vertical"
                        style={{ left: `${drop.x}%` }}
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: ["0%", "1000%"], opacity: [0, 1, 0] }}
                        transition={{
                            duration: drop.speed,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: drop.delay,
                            ease: "linear"
                        }}
                    >
                        {matrixChars.split("").sort(() => 0.5 - Math.random()).join("")}
                    </motion.div>
                ))}

                {/* Complex Reactor Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" style={{ transform: "translateZ(50px)" }}>
                    <motion.div
                        className="relative w-32 h-32 flex items-center justify-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                        {/* Multiple Rotating Rings */}
                        <div className="absolute inset-0 border-2 border-dashed border-cyan-500/40 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute inset-2 border border-dotted border-purple-500/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />

                        {/* Inner Core Energy */}
                        <div className="absolute inset-8 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
                        <div className="absolute inset-10 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <Globe className="w-8 h-8 text-white relative z-10 animate-[pulse_3s_ease-in-out_infinite]" strokeWidth={1.5} />
                        </div>

                        {/* Scanning Radar */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-cyan-500/10 to-transparent opacity-30 animate-spin transition-transform duration-[3s]" />
                    </motion.div>
                </div>

                {/* Floating 3D Symbols */}
                {symbols.map((item, i) => {
                    const Icon = item.icon
                    return (
                        <motion.div
                            key={i}
                            className="absolute p-3 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md shadow-lg z-30 group-hover:border-cyan-500/30 transition-colors duration-500"
                            style={{
                                left: `${item.x}%`,
                                top: `${item.y}%`,
                                transform: "translateZ(30px)",
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: 1,
                                scale: item.scale,
                                y: [0, -15, 0],
                            }}
                            transition={{
                                scale: { duration: 0.5, delay: item.delay },
                                opacity: { duration: 0.5, delay: item.delay },
                                y: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: Math.random() * 2 }
                            }}
                            whileHover={{
                                scale: 1.2,
                                zIndex: 50,
                                backgroundColor: "rgba(34, 211, 238, 0.1)",
                                boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)"
                            }}
                        >
                            <Icon className="w-5 h-5 text-white/80 group-hover:text-cyan-400 transition-colors" strokeWidth={1.5} />
                        </motion.div>
                    )
                })}

                {/* Data Streams / Lasers */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                    {symbols.map((item, i) => (
                        <motion.line
                            key={i}
                            x1="50%"
                            y1="50%"
                            x2={`${item.x}%`}
                            y2={`${item.y}%`}
                            stroke="url(#data-gradient)"
                            strokeWidth="1"
                            strokeDasharray="5 5"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 0.4, 0],
                                strokeDashoffset: [0, -50]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: item.delay,
                                ease: "linear",
                                repeatDelay: Math.random() * 3
                            }}
                        />
                    ))}
                    <defs>
                        <linearGradient id="data-gradient" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Particle Overlay */}
                <div className="absolute inset-0 pointer-events-none z-40">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={`p-${i}`}
                            className="absolute w-1 h-1 bg-cyan-400/50 rounded-full"
                            initial={{
                                x: Math.random() * 400 - 200,
                                y: Math.random() * 400 - 200,
                                opacity: 0,
                                scale: 0
                            }}
                            animate={{
                                x: Math.random() * 400 - 200 + "px",
                                y: Math.random() * 400 - 200 + "px",
                                opacity: [0, 0.8, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: Math.random() * 2,
                                ease: "linear"
                            }}
                            style={{
                                left: "50%",
                                top: "50%"
                            }}
                        />
                    ))}
                </div>

                {/* Ambient Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)] z-20 pointer-events-none" />
            </motion.div>
        </div>
    )
}
