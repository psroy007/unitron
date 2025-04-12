"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import GlitchEffect from "./glitch-effect"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      const elements = containerRef.current.querySelectorAll(".parallax")
      elements.forEach((el) => {
        const speed = Number.parseFloat(el.getAttribute("data-speed") || "0")
        const xOffset = x * speed
        const yOffset = y * speed
        ;(el as HTMLElement).style.transform = `translate(${xOffset * 30}px, ${yOffset * 30}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden">
  {/* Video as the parent */}
  <div className="absolute inset-0 z-0 h-full w-full">
    <video
      className="w-full h-full object-cover"
      src="/hero_section/lv_0_20250405133207.mp4"
      autoPlay
      loop
      muted
    />
  </div>

  {/* Content inside the video */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <div className="relative inline-block mb-20">
        <GlitchEffect intensity="high">
          <img
            src="/spider_logo.png"
            alt="UNiTRON"
            className="relative mt-12 mb-28 md:mt-16 md:mb-32"
          />
        </GlitchEffect>
      </div>

      <motion.div
  className="text-black text-2xl md:text-3xl font-bangers mt-80 md:mt-16" // Added mt-80 for mobile view
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, duration: 0.8 }}
>
  Enter the Tech-Verse: Where Innovation Meets the Multiverse
</motion.div>

<motion.div
  className="text-white parallax md:mt-1" // Added mt-80 for mobile view
  data-speed="2"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2 }}
>
  <div className="flex flex-col items-center font-comic mt-10 md:mt-0">
    <p className="max-w-2xl text-2xl text-black md:text-1xl font-bangers">
      May 2nd, 3rd and 4th, 2025
    </p>
    <p className="text-xl text-black md:text-1xl font-bangers">
      Future Institute of Technology
    </p>
  </div>
</motion.div>
    </motion.div>
  </div>
</section>
  )
}

