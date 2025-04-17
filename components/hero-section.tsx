"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import GlitchEffect from "./glitch-effect"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const targetDate = new Date("May 2, 2025 10:00:00")
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

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
          src="/videos/homepage.mp4"
          autoPlay
          loop
          muted
        />
      </div>

      {/* Desktop Countdown - Top Left Corner */}
      <div className="hidden md:block absolute top-4 left-4 z-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black bg-opacity-70 p-4 rounded-lg"
        >
          <h3 className="text-white font-bangers text-xl mb-2">Countdown to Event</h3>
          <div className="flex gap-2">
            <div className="text-center">
              <div className="text-white font-bangers text-2xl">{timeLeft.days}</div>
              <div className="text-gray-300 text-xs">DAYS</div>
            </div>
            <div className="text-white font-bangers text-2xl">:</div>
            <div className="text-center">
              <div className="text-white font-bangers text-2xl">{timeLeft.hours}</div>
              <div className="text-gray-300 text-xs">HOURS</div>
            </div>
            <div className="text-white font-bangers text-2xl">:</div>
            <div className="text-center">
              <div className="text-white font-bangers text-2xl">{timeLeft.minutes}</div>
              <div className="text-gray-300 text-xs">MIN</div>
            </div>
            <div className="text-white font-bangers text-2xl">:</div>
            <div className="text-center">
              <div className="text-white font-bangers text-2xl">{timeLeft.seconds}</div>
              <div className="text-gray-300 text-xs">SEC</div>
            </div>
          </div>
        </motion.div>
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

        {/* Mobile Countdown - Below the main content */}
        <div className="md:hidden mt-8 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-black bg-opacity-70 p-4 rounded-lg"
          >
            <h3 className="text-white font-bangers text-lg mb-2">Countdown to Event</h3>
            <div className="flex gap-2 justify-center">
              <div className="text-center">
                <div className="text-white font-bangers text-xl">{timeLeft.days}</div>
                <div className="text-gray-300 text-xs">DAYS</div>
              </div>
              <div className="text-white font-bangers text-xl">:</div>
              <div className="text-center">
                <div className="text-white font-bangers text-xl">{timeLeft.hours}</div>
                <div className="text-gray-300 text-xs">HOURS</div>
              </div>
              <div className="text-white font-bangers text-xl">:</div>
              <div className="text-center">
                <div className="text-white font-bangers text-xl">{timeLeft.minutes}</div>
                <div className="text-gray-300 text-xs">MIN</div>
              </div>
              <div className="text-white font-bangers text-xl">:</div>
              <div className="text-center">
                <div className="text-white font-bangers text-xl">{timeLeft.seconds}</div>
                <div className="text-gray-300 text-xs">SEC</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
