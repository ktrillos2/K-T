"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { Play, RotateCcw, Trophy, Award, Sparkles, Zap, Shield, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"

// ─── Canvas Constants ──────────────────────────────────────────────────────────
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 180
const GROUND_Y = 145
const GRAVITY = 0.68
const JUMP_FORCE = -11.5

// ─── Pixel Art Bitmaps ────────────────────────────────────────────────────────
// 1 = Player Dino
const DINO_RUN_1 = [
  "          ████████  ",
  "         ███▒██████ ",
  "         ██████████ ",
  "         ██████     ",
  "         █████████  ",
  " ██     ██████      ",
  " ███   ██████████   ",
  " ████████████  █    ",
  "  ███████████       ",
  "   ██████████       ",
  "    ████████        ",
  "     ██████         ",
  "      ██  ██        ",
  "      ██   █        ",
  "      ██            ",
  "      █             ",
]

const DINO_RUN_2 = [
  "          ████████  ",
  "         ███▒██████ ",
  "         ██████████ ",
  "         ██████     ",
  "         █████████  ",
  " ██     ██████      ",
  " ███   ██████████   ",
  " ████████████  █    ",
  "  ███████████       ",
  "   ██████████       ",
  "    ████████        ",
  "     ██████         ",
  "      ██  ██        ",
  "       █  ██        ",
  "          ██        ",
  "           █        ",
]

const DINO_JUMP = [
  "          ████████  ",
  "         ███▒██████ ",
  "         ██████████ ",
  "         ██████     ",
  "         █████████  ",
  " ██     ██████      ",
  " ███   ██████████   ",
  " ████████████  █    ",
  "  ███████████       ",
  "   ██████████       ",
  "    ████████        ",
  "     ██████         ",
  "      ██  ██        ",
  "      ██  ██        ",
]

const DINO_DEAD = [
  "          ████████  ",
  "         ███X██████ ",
  "         ██████████ ",
  "         ██████     ",
  "         █████████  ",
  " ██     ██████      ",
  " ███   ██████████   ",
  " ████████████  █    ",
  "  ███████████       ",
  "   ██████████       ",
  "    ████████        ",
  "     ██████         ",
  "      ██  ██        ",
  "      █    █        ",
]

// ─── Obstacles: Plants & Animals ──────────────────────────────────────────────
// Cactus Small
const CACTUS_SMALL = [
  "   ██   ",
  "   ██   ",
  " █ ██   ",
  " █ ██ █ ",
  " █ ██ █ ",
  " ██████ ",
  "   ██   ",
  "   ██   ",
  "   ██   ",
  "   ██   ",
]

// Cactus Triple
const CACTUS_TRIPLE = [
  "  █   ██   █ ",
  "  █   ██   █ ",
  " ███  ██  ███",
  " █ █  ██  █ █",
  " █ █ ████ █ █",
  " ████████████",
  "   █  ██   █ ",
  "   █  ██   █ ",
  "   █  ██   █ ",
]

// Animal 1: Desert Scorpion (Animated 2 frames)
const SCORPION_1 = [
  "  █       █  ",
  "  ██     ██  ",
  " █ ██   ██ █ ",
  "  █████████  ",
  "   ██▒███ █  ",
  "  ████████ █ ",
  " █ █ █ █ █ █ ",
  " █ █ █ █     ",
]

const SCORPION_2 = [
  "   █     █   ",
  "  ██     ██  ",
  "  ███   ███  ",
  "  █████████  ",
  "   ██▒███  █ ",
  "  ████████  █",
  "  █ █ █ █  █ ",
  "  █ █ █ █    ",
]

// Animal 2: Desert Snake (Animated 2 frames)
const SNAKE_1 = [
  "        ████ ",
  "       ██▒███",
  "   █████████ ",
  "  ██████     ",
  " ████        ",
  "███          ",
]

const SNAKE_2 = [
  "        ████ ",
  "       ██▒███",
  "  ██████████ ",
  " █████   ███ ",
  "███          ",
]

// Animal 3: Pterodactyl Bird (Flying - 2 frames)
const BIRD_1 = [
  "        ████ ",
  "     ███████ ",
  " ███████████ ",
  "  ██████████ ",
  "     ██      ",
  "    ██       ",
]

const BIRD_2 = [
  "    ██       ",
  "     ██      ",
  "  ██████████ ",
  " ███████████ ",
  "     ███████ ",
  "        ████ ",
]

// Animal 4: Cyber Bat (Flying fast)
const BAT_1 = [
  "█   ██   █",
  "██ ████ ██",
  "████▒▒████",
  " ████████ ",
  "   ████   ",
]

const BAT_2 = [
  "  ██  ██  ",
  "██████████",
  "████▒▒████",
  " █  ██  █ ",
]

const CLOUD_BITMAP = [
  "      ██████      ",
  "   ████████████   ",
  " ████████████████ ",
  "██████████████████",
]

export interface GameAchievement {
  id: string
  titleEs: string
  titleEn: string
  descEs: string
  descEn: string
  badge: string
  scoreReq: number
  tier: "bronze" | "silver" | "gold" | "diamond" | "master"
}

const ACHIEVEMENTS: GameAchievement[] = [
  {
    id: "novice_jump",
    titleEs: "Primer Despegue",
    titleEn: "First Takeoff",
    descEs: "Alcanza 50 pts",
    descEn: "Reach 50 pts",
    badge: "🌱",
    scoreReq: 50,
    tier: "bronze",
  },
  {
    id: "scorpion_dodger",
    titleEs: "Cazador de Bugs",
    titleEn: "Bug Hunter",
    descEs: "Esquiva escorpiones (150 pts)",
    descEn: "Dodge scorpions (150 pts)",
    badge: "🦂",
    scoreReq: 150,
    tier: "silver",
  },
  {
    id: "snake_charmer",
    titleEs: "Maestro del Desierto",
    titleEn: "Desert Master",
    descEs: "Supera serpientes (300 pts)",
    descEn: "Outrun desert snakes (300 pts)",
    badge: "🐍",
    scoreReq: 300,
    tier: "gold",
  },
  {
    id: "sky_conqueror",
    titleEs: "Rey de las Alturas",
    titleEn: "Sky Conqueror",
    descEs: "Vence pterodáctilos (500 pts)",
    descEn: "Beat pterodactyls (500 pts)",
    badge: "🦅",
    scoreReq: 500,
    tier: "diamond",
  },
  {
    id: "lighthouse_god",
    titleEs: "Lighthouse 100",
    titleEn: "Lighthouse 100",
    descEs: "Velocidad extrema (1000 pts)",
    descEn: "Extreme speed (1000 pts)",
    badge: "⚡",
    scoreReq: 1000,
    tier: "diamond",
  },
  {
    id: "kt_legend",
    titleEs: "Leyenda K&T",
    titleEn: "K&T Legend",
    descEs: "Dominio total (2000 pts)",
    descEn: "Total mastery (2000 pts)",
    badge: "👑",
    scoreReq: 2000,
    tier: "master",
  },
]

type ObstacleType = "cactus_s" | "cactus_t" | "scorpion" | "snake" | "bird_low" | "bird_high" | "bat"

interface Obstacle {
  x: number
  y: number
  width: number
  height: number
  type: ObstacleType
  passed: boolean
}

interface Cloud {
  x: number
  y: number
  speed: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

interface Star {
  x: number
  y: number
  brightness: number
  twinkleSpeed: number
}

export default function AlienRunner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { language } = useLanguage()
  const isEn = language === "en"
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "GAME_OVER">("IDLE")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])
  const [activeUnlockBanner, setActiveUnlockBanner] = useState<GameAchievement | null>(null)

  // Internal game mutable state (runs at 60 FPS without triggering React re-renders)
  const gameRef = useRef({
    state: "IDLE" as "IDLE" | "PLAYING" | "GAME_OVER",
    dinoY: GROUND_Y - 32,
    dinoVy: 0,
    isGrounded: true,
    runFrame: 0,
    frameTimer: 0,
    speed: 6,
    score: 0,
    highScore: 0,
    obstacles: [] as Obstacle[],
    clouds: [
      { x: 180, y: 30, speed: 0.7 },
      { x: 450, y: 22, speed: 0.5 },
      { x: 720, y: 40, speed: 0.8 },
    ] as Cloud[],
    stars: [
      { x: 80, y: 20, brightness: 0.6, twinkleSpeed: 0.03 },
      { x: 230, y: 35, brightness: 0.8, twinkleSpeed: 0.05 },
      { x: 380, y: 15, brightness: 0.5, twinkleSpeed: 0.02 },
      { x: 540, y: 28, brightness: 0.9, twinkleSpeed: 0.04 },
      { x: 690, y: 18, brightness: 0.7, twinkleSpeed: 0.03 },
    ] as Star[],
    groundOffset: 0,
    particles: [] as Particle[],
    lastObstacleSpawn: 0,
    unlockedIds: new Set<string>(),
  })

  // Load HighScore and Achievements from localStorage
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem("kt_dino_high_score")
      if (savedScore) {
        const val = parseInt(savedScore, 10)
        if (!isNaN(val)) {
          setHighScore(val)
          gameRef.current.highScore = val
        }
      }

      const savedAch = localStorage.getItem("kt_dino_achievements")
      if (savedAch) {
        const parsed = JSON.parse(savedAch)
        if (Array.isArray(parsed)) {
          setUnlockedAchievements(parsed)
          parsed.forEach((id: string) => gameRef.current.unlockedIds.add(id))
        }
      }
    } catch {
      // Storage access gracefully handled
    }
  }, [])

  // Check achievements unlock
  const checkAchievements = useCallback((currentScore: number) => {
    ACHIEVEMENTS.forEach((ach) => {
      if (currentScore >= ach.scoreReq && !gameRef.current.unlockedIds.has(ach.id)) {
        gameRef.current.unlockedIds.add(ach.id)
        const updated = Array.from(gameRef.current.unlockedIds)
        setUnlockedAchievements(updated)
        setActiveUnlockBanner(ach)

        // Spawn confetti celebration particles
        const g = gameRef.current
        for (let i = 0; i < 24; i++) {
          g.particles.push({
            x: 80 + Math.random() * 200,
            y: 30 + Math.random() * 30,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 4,
            life: 35,
            maxLife: 35,
            color: ["#10b981", "#38bdf8", "#fbbf24", "#ec4899", "#a855f7"][Math.floor(Math.random() * 5)],
            size: 3.5,
          })
        }

        try {
          localStorage.setItem("kt_dino_achievements", JSON.stringify(updated))
        } catch {
          // Ignore
        }

        // Auto dismiss banner after 3.5 seconds
        setTimeout(() => {
          setActiveUnlockBanner((prev) => (prev?.id === ach.id ? null : prev))
        }, 3500)
      }
    })
  }, [])

  // Spawns varied obstacles based on current score & difficulty
  const spawnObstacle = useCallback((speed: number, currentScore: number) => {
    const minDistance = Math.max(240, 360 - speed * 8)
    const availableTypes: ObstacleType[] = ["cactus_s"]

    if (currentScore >= 60) availableTypes.push("cactus_t")
    if (currentScore >= 120) availableTypes.push("scorpion")
    if (currentScore >= 220) availableTypes.push("snake")
    if (currentScore >= 320) availableTypes.push("bird_low")
    if (currentScore >= 450) availableTypes.push("bird_high")
    if (currentScore >= 600) availableTypes.push("bat")

    const pickedType = availableTypes[Math.floor(Math.random() * availableTypes.length)]

    let y = GROUND_Y - 24
    let width = 18
    let height = 24

    if (pickedType === "cactus_s") {
      width = 18
      height = 24
      y = GROUND_Y - height
    } else if (pickedType === "cactus_t") {
      width = 28
      height = 22
      y = GROUND_Y - height
    } else if (pickedType === "scorpion") {
      width = 24
      height = 18
      y = GROUND_Y - height
    } else if (pickedType === "snake") {
      width = 26
      height = 14
      y = GROUND_Y - height
    } else if (pickedType === "bird_low") {
      width = 26
      height = 16
      y = GROUND_Y - 26
    } else if (pickedType === "bird_high") {
      width = 26
      height = 16
      y = GROUND_Y - 50
    } else if (pickedType === "bat") {
      width = 22
      height = 14
      y = GROUND_Y - 38
    }

    gameRef.current.obstacles.push({
      x: CANVAS_WIDTH + 20,
      y,
      width,
      height,
      type: pickedType,
      passed: false,
    })
  }, [])

  const jump = useCallback(() => {
    const g = gameRef.current
    if (g.state === "IDLE" || g.state === "GAME_OVER") {
      g.state = "PLAYING"
      g.score = 0
      g.speed = 6
      g.obstacles = []
      g.dinoY = GROUND_Y - 32
      g.dinoVy = JUMP_FORCE
      g.isGrounded = false
      setGameState("PLAYING")
      return
    }

    if (g.isGrounded) {
      g.dinoVy = JUMP_FORCE
      g.isGrounded = false
      // Add dust particles
      for (let i = 0; i < 4; i++) {
        g.particles.push({
          x: 55 + Math.random() * 10,
          y: GROUND_Y,
          vx: (Math.random() - 0.7) * 2,
          vy: -Math.random() * 2,
          life: 15,
          maxLife: 15,
          color: "rgba(255,255,255,0.4)",
          size: 2,
        })
      }
    }
  }, [])

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        const canvas = canvasRef.current
        if (canvas) {
          const rect = canvas.getBoundingClientRect()
          const inViewport = rect.top >= -250 && rect.bottom <= window.innerHeight + 250
          if (inViewport) {
            e.preventDefault()
            jump()
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [jump])

  // 60 FPS Game Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let lastTime = performance.now()
    let scoreAccumulator = 0

    const drawBitmap = (
      bitmap: string[],
      x: number,
      y: number,
      scale: number,
      primaryColor: string,
      secondaryColor = "#000",
      accentColor = "#fff"
    ) => {
      for (let row = 0; row < bitmap.length; row++) {
        const line = bitmap[row]
        for (let col = 0; col < line.length; col++) {
          const char = line[col]
          if (char === "█") {
            ctx.fillStyle = primaryColor
            ctx.fillRect(Math.floor(x + col * scale), Math.floor(y + row * scale), scale, scale)
          } else if (char === "▒" || char === "X") {
            ctx.fillStyle = secondaryColor
            ctx.fillRect(Math.floor(x + col * scale), Math.floor(y + row * scale), scale, scale)
          } else if (char === "•") {
            ctx.fillStyle = accentColor
            ctx.fillRect(Math.floor(x + col * scale), Math.floor(y + row * scale), scale, scale)
          }
        }
      }
    }

    const loop = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 16.666, 2.5)
      lastTime = currentTime

      const g = gameRef.current

      // 1. UPDATE STATE
      if (g.state === "PLAYING") {
        // Score & Speed Scaling
        scoreAccumulator += delta * 0.15
        if (scoreAccumulator >= 1) {
          g.score += Math.floor(scoreAccumulator)
          scoreAccumulator %= 1
          setScore(g.score)
          checkAchievements(g.score)

          // Gradually scale speed up to 13 max
          if (g.speed < 13) {
            g.speed = 6 + Math.min(7, Math.floor(g.score / 120) * 0.45)
          }
        }

        // Physics
        g.dinoVy += GRAVITY * delta
        g.dinoY += g.dinoVy * delta

        if (g.dinoY >= GROUND_Y - 32) {
          g.dinoY = GROUND_Y - 32
          g.dinoVy = 0
          g.isGrounded = true
        }

        // Animation frame
        g.frameTimer += delta
        if (g.frameTimer >= 6) {
          g.runFrame = g.runFrame === 0 ? 1 : 0
          g.frameTimer = 0
        }

        // Scroll ground
        g.groundOffset = (g.groundOffset + g.speed * delta) % 40

        // Move clouds & stars
        g.clouds.forEach((cloud) => {
          cloud.x -= cloud.speed * delta
          if (cloud.x < -60) {
            cloud.x = CANVAS_WIDTH + Math.random() * 80
            cloud.y = 15 + Math.random() * 35
          }
        })

        // Spawn obstacles
        const timeSinceLast = currentTime - g.lastObstacleSpawn
        const spawnInterval = Math.max(1100, 2200 - g.speed * 80)
        if (timeSinceLast > spawnInterval && Math.random() < 0.35) {
          spawnObstacle(g.speed, g.score)
          g.lastObstacleSpawn = currentTime
        }

        // Move & Filter obstacles
        for (let i = g.obstacles.length - 1; i >= 0; i--) {
          const obs = g.obstacles[i]
          obs.x -= g.speed * delta

          // Dino Hitbox (padded for fair & smooth gameplay)
          const dinoBox = {
            left: 54,
            right: 76,
            top: g.dinoY + 4,
            bottom: g.dinoY + 30,
          }

          const obsBox = {
            left: obs.x + 3,
            right: obs.x + obs.width - 3,
            top: obs.y + 2,
            bottom: obs.y + obs.height - 2,
          }

          // AABB Collision Check
          const collides =
            dinoBox.right > obsBox.left &&
            dinoBox.left < obsBox.right &&
            dinoBox.bottom > obsBox.top &&
            dinoBox.top < obsBox.bottom

          if (collides) {
            g.state = "GAME_OVER"
            setGameState("GAME_OVER")

            // Update High Score
            if (g.score > g.highScore) {
              g.highScore = g.score
              setHighScore(g.score)
              try {
                localStorage.setItem("kt_dino_high_score", g.score.toString())
              } catch {
                // Ignore
              }
            }

            // Explosion death particles
            for (let p = 0; p < 18; p++) {
              g.particles.push({
                x: 65,
                y: g.dinoY + 16,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.7) * 4,
                life: 25,
                maxLife: 25,
                color: ["#ef4444", "#f97316", "#ffffff", "#4ade80"][Math.floor(Math.random() * 4)],
                size: 2.5,
              })
            }
            break
          }

          if (obs.x < -50) {
            g.obstacles.splice(i, 1)
          }
        }
      }

      // Update Particles
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const pt = g.particles[i]
        pt.x += pt.vx * delta
        pt.y += pt.vy * delta
        pt.life -= delta
        if (pt.life <= 0) {
          g.particles.splice(i, 1)
        }
      }

      // 2. RENDER CANVAS
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Background Sky Gradient (Dynamic Night/Cyber Dusk transition)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT)
      const isNight = g.score > 200
      if (isNight) {
        skyGrad.addColorStop(0, "#030712")
        skyGrad.addColorStop(1, "#0f172a")
      } else {
        skyGrad.addColorStop(0, "#000000")
        skyGrad.addColorStop(1, "#0a0a0a")
      }
      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Draw Twinkling Stars
      g.stars.forEach((star) => {
        const twinkle = Math.sin(currentTime * star.twinkleSpeed) * 0.3 + star.brightness
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.2, Math.min(1, twinkle))})`
        ctx.fillRect(star.x, star.y, 2, 2)
      })

      // Draw Floating Clouds
      g.clouds.forEach((cloud) => {
        drawBitmap(CLOUD_BITMAP, cloud.x, cloud.y, 1.6, "rgba(255, 255, 255, 0.15)")
      })

      // Draw Ground
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(0, GROUND_Y)
      ctx.lineTo(CANVAS_WIDTH, GROUND_Y)
      ctx.stroke()

      // Rolling Ground Terrain Details
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
      for (let x = -g.groundOffset; x < CANVAS_WIDTH; x += 32) {
        ctx.fillRect(x, GROUND_Y + 4, 12, 1.5)
        ctx.fillRect(x + 18, GROUND_Y + 8, 5, 1.5)
      }

      // Draw Varied Obstacles & Animals
      const animFrame = Math.floor(currentTime / 140) % 2

      g.obstacles.forEach((obs) => {
        if (obs.type === "cactus_s") {
          drawBitmap(CACTUS_SMALL, obs.x, obs.y, 2.2, "#10b981")
        } else if (obs.type === "cactus_t") {
          drawBitmap(CACTUS_TRIPLE, obs.x, obs.y, 2.2, "#059669")
        } else if (obs.type === "scorpion") {
          const scorpFrame = animFrame === 0 ? SCORPION_1 : SCORPION_2
          drawBitmap(scorpFrame, obs.x, obs.y, 2.2, "#f43f5e", "#000")
        } else if (obs.type === "snake") {
          const snakeFrame = animFrame === 0 ? SNAKE_1 : SNAKE_2
          drawBitmap(snakeFrame, obs.x, obs.y, 2.2, "#a855f7", "#000")
        } else if (obs.type === "bird_low" || obs.type === "bird_high") {
          const birdFrame = animFrame === 0 ? BIRD_1 : BIRD_2
          drawBitmap(birdFrame, obs.x, obs.y, 2.2, "#f59e0b", "#000")
        } else if (obs.type === "bat") {
          const batFrame = animFrame === 0 ? BAT_1 : BAT_2
          drawBitmap(batFrame, obs.x, obs.y, 2.2, "#38bdf8", "#000")
        }
      })

      // Draw Player Dino
      const dinoColor = "#4ade80"
      if (g.state === "GAME_OVER") {
        drawBitmap(DINO_DEAD, 48, g.dinoY, 2, dinoColor, "#ef4444")
      } else if (!g.isGrounded) {
        drawBitmap(DINO_JUMP, 48, g.dinoY, 2, dinoColor, "#000")
      } else {
        const frame = g.runFrame === 0 ? DINO_RUN_1 : DINO_RUN_2
        drawBitmap(frame, 48, g.dinoY, 2, dinoColor, "#000")
      }

      // Draw Particles
      g.particles.forEach((pt) => {
        ctx.fillStyle = pt.color
        const alpha = Math.max(0, pt.life / pt.maxLife)
        ctx.globalAlpha = alpha
        ctx.fillRect(Math.floor(pt.x), Math.floor(pt.y), pt.size, pt.size)
        ctx.globalAlpha = 1
      })

      // CRT Scanline Overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)"
      for (let y = 0; y < CANVAS_HEIGHT; y += 4) {
        ctx.fillRect(0, y, CANVAS_WIDTH, 1.5)
      }

      animationId = requestAnimationFrame(loop)
    }

    animationId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animationId)
  }, [spawnObstacle, checkAchievements])

  // Next achievement goal calculation
  const nextAchievement = ACHIEVEMENTS.find((ach) => !unlockedAchievements.includes(ach.id)) || ACHIEVEMENTS[ACHIEVEMENTS.length - 1]
  const progressToNext = nextAchievement
    ? Math.min(100, Math.round((score / nextAchievement.scoreReq) * 100))
    : 100

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* Arcade Shell Frame */}
      <div className="relative rounded-2xl border border-white/15 bg-neutral-950 p-3 sm:p-5 shadow-2xl shadow-emerald-950/20 overflow-hidden">
        {/* Header HUD Bar */}
        <div className="flex items-center justify-between px-1 sm:px-2 pb-3 mb-2 border-b border-white/10 font-mono text-[11px] sm:text-xs text-white/70">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate mr-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-bold text-white tracking-wider truncate">// K&T CODE • DESERT RUNNER</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs shrink-0">
            {highScore > 0 && (
              <div className="flex items-center gap-1 text-neutral-400">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>HI {highScore.toString().padStart(5, "0")}</span>
              </div>
            )}
            <div className="font-bold tracking-widest text-white">
              {score.toString().padStart(5, "0")} <span className="text-[9px] sm:text-[10px] text-emerald-400">PTS</span>
            </div>
          </div>
        </div>

        {/* Live Unlock Banner (Real-time achievement pop-up) */}
        {activeUnlockBanner && (
          <div className="mb-2 p-2 sm:p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/60 backdrop-blur-md flex items-center justify-between text-xs font-mono animate-bounce">
            <div className="flex items-center gap-2 text-emerald-300 truncate mr-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
              <span className="truncate">
                {isEn ? "Achievement Unlocked: " : "¡Logro Desbloqueado: "}
                <strong className="text-white">
                  {activeUnlockBanner.badge} {isEn ? activeUnlockBanner.titleEn : activeUnlockBanner.titleEs}
                </strong>{" "}
                ({activeUnlockBanner.scoreReq} pts)!
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider shrink-0">
              {isEn ? "Saved" : "Guardado"}
            </span>
          </div>
        )}

        {/* Canvas Screen Container */}
        <div
          onClick={jump}
          onTouchStart={() => {
            jump()
          }}
          role="button"
          tabIndex={0}
          aria-label={isEn ? "K&T Code Desert Runner Game. Press space or tap to jump." : "Juego Desert Runner de K&T Code. Presiona espacio o toca para saltar."}
          className="relative w-full aspect-[800/200] sm:aspect-[800/180] min-h-[140px] sm:min-h-[150px] rounded-xl overflow-hidden cursor-pointer border border-white/10 bg-black group select-none touch-manipulation focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="w-full h-full block"
            style={{ imageRendering: "pixelated" }}
          />

          {/* Idle / Welcome Overlay */}
          {gameState === "IDLE" && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-3 sm:p-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-emerald-400 ml-0.5" />
              </div>
              <p className="font-title text-sm sm:text-lg font-bold text-white mb-1 px-2 leading-snug">
                {isEn ? "Take a quick challenge before quoting your project?" : "¿Un reto antes de cotizar tu proyecto?"}
              </p>
              <p className="font-mono text-[11px] sm:text-xs text-emerald-400 font-bold tracking-wide">
                {isEn ? "[ PRESS SPACE ] or [ TAP HERE ] TO JUMP" : "[ PRESIONA ESPACIO ] o [ TOCA AQUÍ ] PARA SALTAR"}
              </p>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameState === "GAME_OVER" && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-[3px] flex flex-col items-center justify-center text-center p-4">
              <span className="font-title text-2xl sm:text-3xl font-black text-rose-400 tracking-widest mb-1">
                G A M E  O V E R
              </span>
              <p className="font-mono text-xs text-neutral-400 mb-4">
                {isEn ? "Final score: " : "Puntaje alcanzado: "}
                <strong className="text-white">{score}</strong> pts
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  jump()
                }}
                className="px-5 py-2.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:scale-105"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {isEn ? "PLAY AGAIN" : "JUGAR DE NUEVO"}
              </button>
            </div>
          )}
        </div>

        {/* Section: Logros y Avances (Badges & Progress Tracker) */}
        <div className="mt-4 pt-3 border-t border-white/10 space-y-3 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-white">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-bold tracking-wide uppercase text-[11px] sm:text-xs">
                {isEn ? "// Achievements & Progress" : "// Logros & Avances"}
              </span>
              <span className="text-[10px] text-neutral-400">
                ({unlockedAchievements.length}/{ACHIEVEMENTS.length} {isEn ? "Unlocked" : "Desbloqueados"})
              </span>
            </div>

            {/* Next Milestone Progress Bar */}
            {nextAchievement && (
              <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                <span className="truncate">
                  {isEn ? "Next: " : "Próximo: "}
                  <strong className="text-emerald-400">
                    {nextAchievement.badge} {isEn ? nextAchievement.titleEn : nextAchievement.titleEs}
                  </strong>
                </span>
                <div className="w-16 sm:w-28 h-2 bg-neutral-800 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
                <span className="text-[10px] text-white font-bold shrink-0">{progressToNext}%</span>
              </div>
            )}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {ACHIEVEMENTS.map((ach) => {
              const isUnlocked = unlockedAchievements.includes(ach.id)
              return (
                <div
                  key={ach.id}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isUnlocked
                      ? "border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                      : "border-white/5 bg-white/[0.01] opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg">{ach.badge}</span>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="text-[9px] text-neutral-500 font-bold">{ach.scoreReq}p</span>
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-white leading-tight truncate">
                    {isEn ? ach.titleEn : ach.titleEs}
                  </p>
                  <p className="text-[9px] text-neutral-400 leading-tight mt-0.5 line-clamp-2">
                    {isEn ? ach.descEn : ach.descEs}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-2 text-[10px] text-neutral-400 border-t border-white/5 font-mono">
            <span className="flex items-center gap-1.5">
              <span>🎮</span>
              <span>{isEn ? "Controls: Spacebar / Up Arrow / Tap screen" : "Controles: Barra espaciadora / Flecha Arriba / Tocar pantalla"}</span>
            </span>
            <span className="flex items-center gap-1.5 text-neutral-500">
              <span>⚡</span>
              <span>{isEn ? "Dodge: Cacti, Scorpions 🦂, Snakes 🐍, Pterodactyls 🦅 & Bats 🦇" : "Esquiva: Cactus, Escorpiones 🦂, Serpientes 🐍, Pterodáctilos 🦅 y Murciélagos 🦇"}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
