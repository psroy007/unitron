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
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden" ref={containerRef}>
      {/* Spider-Verse background with dimensional portals */}
      {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div> */}

      {/* Overlay gradient */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-spider-dark/0 via-spider-dark/50 to-spider-dark"></div> */}

      {/* Dimensional portal effect */}
      {/* <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-0 pointer-events-none">
        <div className="relative w-[150%] h-[150%] animate-slow-spin">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-spider-red via-spider-blue to-spider-red opacity-30 blur-3xl"></div>
        </div>
      </div> */}

      <div className="container relative z-10 flex flex-col items-start justify-center h-screen px-4 mx-auto pl-10">
      <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-center"
>
  <div className="relative inline-block">
    <GlitchEffect intensity="high">
      <img
        src="/spider_logo.png"
        alt="UNiTRON"
        className="relative mt-12 mb-28 md:mt-16 md:mb-32"
      />
    </GlitchEffect>
  </div>

  <motion.div
  className="text-black text-2xl md:text-4xl font-bangers mt-80"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, duration: 0.8 }}
>
  Enter the Tech-Verse: Where Innovation Meets the Multiverse
</motion.div>

<motion.div
  className="text-white parallax mt-10 md:mt-12"
  data-speed="2"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2 }}
>
  <div className="flex flex-col items-center space-y-4 font-comic md:items-start">
    <p className="max-w-2xl text-2xl text-black md:text-3xl font-bangers parallax">
      May 2nd, 3rd and 4th, 2025
    </p>
    <p className="text-xl text-black md:text-2xl font-bangers">
      Future Institute of Technology
    </p>
  </div>
</motion.div>
</motion.div>
      </div>

      {/* Web decoration */}
      <div className="absolute inset-0 z-0" data-speed="4">
        <video
          className="w-full h-full object-cover"
          src="/hero_section/lv_0_20250405133207.mp4"
          autoPlay
          loop
          muted
        />
      </div>
    </section>
  )
}

