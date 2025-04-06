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
          </>
        )}
      </AnimatePresence>
    </main>
  )
}

