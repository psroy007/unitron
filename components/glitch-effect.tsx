"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchEffectProps {
  children: React.ReactNode
  intensity?: "low" | "medium" | "high"
  duration?: number
  interval?: number
}

export default function GlitchEffect({
  children,
  intensity = "medium",
  duration = 0.2,
  interval = 5,
}: GlitchEffectProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  // Set intensity values
  const glitchIntensity = {
    low: { x: 2, y: 2, skew: 1 },
    medium: { x: 5, y: 5, skew: 2 },
    high: { x: 10, y: 10, skew: 5 },
  }

  const { x, y, skew } = glitchIntensity[intensity]

  useEffect(() => {
    // Random glitch effect
    const triggerGlitch = () => {
      if (Math.random() > 0.7) {
        setIsGlitching(true)

        setTimeout(() => {
          setIsGlitching(false)
        }, duration * 1000)
      }
    }

    // Set interval for random glitches
    const glitchInterval = setInterval(triggerGlitch, interval * 1000)

    return () => clearInterval(glitchInterval)
  }, [duration, interval])

  // Variants for the glitch animation
  const glitchVariants = {
    normal: { x: 0, y: 0, skewX: 0, filter: "none" },
    glitch: {
      x: [0, -x, x, 0],
      y: [0, y, -y, 0],
      skewX: [0, -skew, skew, 0],
      filter: [
        "none",
        "drop-shadow(2px 0 rgba(255, 0, 0, 0.75)) drop-shadow(-2px 0 rgba(0, 255, 255, 0.75))",
        "drop-shadow(-2px 0 rgba(255, 0, 0, 0.75)) drop-shadow(2px 0 rgba(0, 255, 255, 0.75))",
        "none",
      ],
      transition: {
        duration: duration,
        times: [0, 0.3, 0.6, 1],
      },
    },
  }

  return (
    <div className="relative inline-block">
      {/* Main content */}
      <motion.div variants={glitchVariants} animate={isGlitching ? "glitch" : "normal"} className="relative z-10">
        {children}
      </motion.div>

      {/* Red channel */}
      {isGlitching && (
        <motion.div
          className="absolute inset-0 z-0 text-red-500 opacity-70"
          initial={{ x: 0 }}
          animate={{
            x: [0, -x * 1.5, x * 1.5, 0],
            transition: { duration: duration, times: [0, 0.33, 0.66, 1] },
          }}
        >
          {children}
        </motion.div>
      )}

      {/* Blue channel */}
      {isGlitching && (
        <motion.div
          className="absolute inset-0 z-0 text-blue-500 opacity-70"
          initial={{ x: 0 }}
          animate={{
            x: [0, x * 1.5, -x * 1.5, 0],
            transition: { duration: duration, times: [0, 0.33, 0.66, 1] },
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

