"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import GlitchEffect from "./glitch-effect"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play()
          } else {
            videoRef.current.pause()
          }
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 overflow-hidden"
      ref={containerRef}
    >
      {/* Video as the parent */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/videos/new_home.mp4"
          autoPlay
          loop
          
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
            className="text-black text-2xl md:text-3xl font-bangers mt-80 md:mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Enter the Tech-Verse: Where Innovation Meets the Multiverse
          </motion.div>

          <motion.div
            className="text-white parallax md:mt-1"
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


