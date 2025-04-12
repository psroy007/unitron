"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import HeroSection from "@/components/hero-section"
import EventsSection from "@/components/events-section"
import AboutSection from "@/components/about-section"
import SponsorsSection from "@/components/sponsors-section"
import TeamSection from "@/components/team-section"
import FaqSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import WebEffect from "@/components/web-effect"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-spider-black">
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <>
            <WebEffect />
            <Navbar />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <HeroSection />
              <AboutSection />
              <EventsSection />
              <TeamSection />
              <FaqSection />
              <SponsorsSection />
              <ContactSection />
              <Footer />
            </motion.div>
            <div className="text-center text-white mt-8 px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold">Enter the Tech-Verse: Where Innovation Meets the Multiverse</h2>
              <p className="text-lg mt-2">May 2nd, 3rd and 4th, 2025</p>
              <p className="text-lg">Future Institute of Technology</p>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
