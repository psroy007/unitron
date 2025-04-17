"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Spider-Verse comic panel background */}
      {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div> */}

      <div ref={ref} className="container relative z-10 px-4 mx-auto">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="mb-12 text-center" variants={itemVariants}>
          <h2 className="text-white text-4xl inline-block md:text-5xl font-comic font-bold">ABOUT UN</h2>
          <span className="text-white text-4xl inline-block md:text-5xl font-comic">i</span>
          <h2 className="text-white text-4xl inline-block md:text-5xl font-comic font-bold">TRON</h2>
            <div className="w-24 h-1 mx-auto mt-4 bg-spider-blue"></div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div className="relative overflow-hidden rounded-lg comic-border" variants={itemVariants}>
              <div className="absolute inset-0 bg-gradient-to-r from-spider-red to-spider-blue opacity-20"></div>
              {/* Spider-Verse themed event image */}
              <video
                  src="/videos/about2.mp4"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                  // controls
                  autoPlay
                  loop
                  muted
                />

              {/* Comic book style overlay */}
              {/* <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-30 mix-blend-overlay"></div> */}
            </motion.div>

            <motion.div className="flex flex-col justify-center space-y-6" variants={itemVariants}>
              <div className="p-6 bg-spider-dark-blue/20 rounded-lg comic-panel">
              <h3 className="mb-4 text-2xl font-bold text-white font-comic underline decoration-red-500 underline-offset-4">ENTER THE TECH-VERSE</h3>
                <p className="text-gray-300 font-comic">
                  UNiTRON is Future Institute of Technology's flagship technical festival, bringing together the
                  brightest minds from across the multiverse of technology. This year, we're diving into the
                  Spider-Verse theme to create an immersive experience that blends cutting-edge tech with the excitement
                  of parallel dimensions.
                </p>
              </div>

              <div className="p-6 bg-spider-dark-blue/20 rounded-lg comic-panel">
              <h3 className="mb-4 text-2xl font-bold text-white font-comic underline decoration-red-500 underline-offset-4">WHY PARTICIPATE?</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-white rounded-full"></span>
                    <span className="font-comic">Showcase your technical prowess across multiple dimensions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-white rounded-full"></span>
                    <span className="font-comic">Network with industry experts and fellow tech enthusiasts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-white rounded-full"></span>
                    <span className="font-comic">Win exciting prizes and recognition for your innovations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-white rounded-full"></span>
                    <span className="font-comic">Experience workshops and talks from tech industry leaders</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-12"
            variants={itemVariants}
          >
            {[
              { count: '3+', color: 'text-spider-red', label: 'Days of Events' },
              { count: '20+', color: 'text-spider-blue', label: 'Technical Events' },
              { count: '50+', color: 'text-spider-red', label: 'Colleges' },
              { count: '5000+', color: 'text-spider-blue', label: 'Participants' },
            ].map(({ count, color, label }, index) => (
              <div
                key={index}
                className="w-40 h-40 sm:w-48 sm:h-48 flex flex-col justify-center items-center p-4 bg-spider-dark-blue/20 rounded-lg comic-panel text-center"
              >
                <h4 className={`text-4xl font-bold ${color} font-comic`}>{count}</h4>
                <p className="mt-2 text-gray-300 font-comic">{label}</p>
              </div>
            ))}
          </motion.div>

{/*           <motion.div className="grid grid-cols-2 gap-4 mt-12 sm:grid-cols-4" variants={itemVariants}>
            <div className="p-6 text-center bg-spider-dark-blue/20 rounded-lg comic-panel">
              <h4 className="text-4xl font-bold text-spider-red font-comic">3+</h4>
              <p className="mt-2 text-gray-300 font-comic">Days of Events</p>
            </div>
            <div className="p-6 text-center bg-spider-dark-blue/20 rounded-lg comic-panel">
              <h4 className="text-4xl font-bold text-spider-blue font-comic">20+</h4>
              <p className="mt-2 text-gray-300 font-comic">Technical Events</p>
            </div>
            <div className="p-6 text-center bg-spider-dark-blue/20 rounded-lg comic-panel">
              <h4 className="text-4xl font-bold text-spider-red font-comic">50+</h4>
              <p className="mt-2 text-gray-300 font-comic">Colleges</p>
            </div>
            <div className="p-6 text-center bg-spider-dark-blue/20 rounded-lg comic-panel">
              <h4 className="text-4xl font-bold text-spider-blue font-comic">5000+</h4>
              <p className="mt-2 text-gray-300 font-comic">Participants</p>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  )
}


