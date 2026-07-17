"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Generate helix geometry
  const { positions, colors } = useMemo(() => {
    const pos: number[] = []
    const col: number[] = []
    const turns = 4
    const pointsPerTurn = 30
    const totalPoints = turns * pointsPerTurn

    for (let i = 0; i < totalPoints; i++) {
      const t = i / totalPoints
      const angle = t * turns * Math.PI * 2
      const y = (t - 0.5) * 6
      const radius = 1.2

      // First strand
      pos.push(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
      // Second strand (offset by PI)
      pos.push(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius)

      // Colors - gradient from cyan to purple
      const color1 = new THREE.Color().setHSL(0.5 + t * 0.2, 0.8, 0.6)
      const color2 = new THREE.Color().setHSL(0.7 + t * 0.2, 0.8, 0.6)
      col.push(color1.r, color1.g, color1.b)
      col.push(color2.r, color2.g, color2.b)
    }

    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
    }
  }, [])

  // Generate connecting bars
  const bars = useMemo(() => {
    const barData: { start: THREE.Vector3; end: THREE.Vector3; color: THREE.Color }[] = []
    const turns = 4
    const barsPerTurn = 8
    const totalBars = turns * barsPerTurn

    for (let i = 0; i < totalBars; i++) {
      const t = i / totalBars
      const angle = t * turns * Math.PI * 2
      const y = (t - 0.5) * 6
      const radius = 1.2

      barData.push({
        start: new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius),
        end: new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius),
        color: new THREE.Color().setHSL(0.5 + t * 0.3, 0.7, 0.5),
      })
    }
    return barData
  }, [])

  // Floating particles
  const floatingParticles = useMemo(() => {
    const count = 100
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return pos
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group>
      <group ref={groupRef}>
        {/* Main helix points */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
            <bufferAttribute attach="attributes-color" array={colors} count={colors.length / 3} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.12} vertexColors transparent opacity={0.9} sizeAttenuation />
        </points>

        {/* Connecting bars */}
        {bars.map((bar, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array([...bar.start.toArray(), ...bar.end.toArray()])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={bar.color} transparent opacity={0.4} />
          </line>
        ))}
      </group>

      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={floatingParticles}
            count={floatingParticles.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#8b5cf6" size={0.04} transparent opacity={0.5} sizeAttenuation />
      </points>
    </group>
  )
}

export default function Globe3D() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <DNAHelix />
    </Canvas>
  )
}
