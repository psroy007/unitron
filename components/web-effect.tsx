"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function WebEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Web properties
    const webLines: {
      x1: number
      y1: number
      x2: number
      y2: number
      width: number
      alpha: number
      speed: number
      color: string
      swingFactor: number
      swingOffset: number
    }[] = []

    // Create initial web lines
    const createWebLines = () => {
      webLines.length = 0
      const numLines = Math.floor(window.innerWidth / 80)

      for (let i = 0; i < numLines; i++) {
        const x1 = Math.random() * canvas.width
        const y1 = Math.random() * canvas.height
        const angle = Math.random() * Math.PI * 2
        const length = 50 + Math.random() * 200
        const x2 = x1 + Math.cos(angle) * length
        const y2 = y1 + Math.sin(angle) * length

        // Randomly choose between red and blue for Spider-Verse effect
        const color = Math.random() > 0.6 ? "#00A8E1" : "#E62429"

        webLines.push({
          x1,
          y1,
          x2,
          y2,
          width: 0.5 + Math.random() * 2,
          alpha: 0.1 + Math.random() * 0.3,
          speed: 0.2 + Math.random() * 1,
          color,
          swingFactor: 0.5 + Math.random() * 1.5,
          swingOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    createWebLines()
    window.addEventListener("resize", createWebLines)

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMouseMoving(true)

      // Reset the "moving" state after a delay
      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => setIsMouseMoving(false), 100)
    }

    let mouseTimeout: NodeJS.Timeout
    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    let animationFrameId: number
    let time = 0

    const render = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw web lines
      webLines.forEach((line, index) => {
        // Calculate distance from mouse
        const midX = (line.x1 + line.x2) / 2
        const midY = (line.y1 + line.y2) / 2
        const dx = mousePosition.x - midX
        const dy = mousePosition.y - midY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        // Apply mouse influence if mouse is moving
        let offsetX = 0
        let offsetY = 0

        if (isMouseMoving && distance < maxDistance) {
          const influence = (1 - distance / maxDistance) * 20
          offsetX = (-dx / distance) * influence
          offsetY = (-dy / distance) * influence
        }

        // Apply swinging effect
        const swingX = Math.sin(time + line.swingOffset) * line.swingFactor
        const swingY = Math.cos(time + line.swingOffset) * line.swingFactor

        // Draw the web line with all effects applied
        ctx.beginPath()
        ctx.moveTo(line.x1 + offsetX + swingX, line.y1 + offsetY + swingY)
        ctx.lineTo(line.x2 + offsetX + swingX, line.y2 + offsetY + swingY)
        ctx.lineWidth = line.width
        ctx.strokeStyle = `${line.color}${Math.floor(line.alpha * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.stroke()

        // Add a subtle glow effect
        ctx.beginPath()
        ctx.moveTo(line.x1 + offsetX + swingX, line.y1 + offsetY + swingY)
        ctx.lineTo(line.x2 + offsetX + swingX, line.y2 + offsetY + swingY)
        ctx.lineWidth = line.width + 1
        ctx.strokeStyle = `${line.color}20` // 20 is hex for low alpha
        ctx.stroke()

        // Move web lines
        line.y1 += line.speed
        line.y2 += line.speed

        // Reset if out of view
        if (line.y1 > canvas.height && line.y2 > canvas.height) {
          line.y1 = -10 - Math.random() * 50
          line.y2 = line.y1 + (line.y2 - line.y1)
          line.x1 = Math.random() * canvas.width
          line.x2 = line.x1 + (line.x2 - line.x1)
        }
      })

      // Create web node connections when lines are close
      if (Math.random() > 0.97) {
        for (let i = 0; i < webLines.length; i++) {
          for (let j = i + 1; j < webLines.length; j++) {
            const line1 = webLines[i]
            const line2 = webLines[j]

            // Check distance between line endpoints
            const dx = line1.x2 - line2.x1
            const dy = line1.y2 - line2.y1
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 80) {
              ctx.beginPath()
              ctx.moveTo(line1.x2, line1.y2)
              ctx.lineTo(line2.x1, line2.y1)
              ctx.lineWidth = 0.5
              ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`
              ctx.stroke()
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", createWebLines)
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(mouseTimeout)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition, isMouseMoving])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

