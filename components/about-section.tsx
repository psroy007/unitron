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

          <div className="flex flex-col md:flex-row gap-8">
            {/* LEFT: Video Section */}
            <motion.div
              className="relative overflow-hidden rounded-lg comic-border flex-1 flex items-center"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-spider-red to-spider-blue opacity-20"></div>
          
              <video
                src="/videos/about.mp4"
                width={800}
                height={600}
                className="object-cover w-full h-full"
                autoPlay
                loop
                muted
              />
            </motion.div>
          
            {/* RIGHT: Text Section */}
            <motion.div
              className="flex-1 flex flex-col justify-center space-y-6"
              variants={itemVariants}
            >
              {/* Enter the Tech-Verse */}
              <div className="flex-1 flex flex-col justify-start p-6 bg-spider-dark-blue/20 rounded-lg comic-panel">
                <h3 className="mb-4 text-2xl font-bold text-spider-red font-bangers">
                  ENTER THE TECH-VERSE
                </h3>
                <p className="text-gray-300 font-comic">
                  Unitron is Future Institute of Technology's flagship technical festival, bringing together the
                  brightest minds from across the multiverse of technology. This year, we're diving into the
                  Spider-Verse theme to create an immersive experience that blends cutting-edge tech with the excitement
                  of parallel dimensions.
                </p>
              </div>
          
              {/* Why Participate */}
              <div className="flex-1 flex flex-col justify-start p-6 bg-spider-dark-blue/20 rounded-lg comic-panel">
                <h3 className="mb-4 text-2xl font-bold text-spider-red font-bangers">
                  WHY PARTICIPATE?
                </h3>
                <ul className="space-y-2 text-gray-300">
                  {[
                    'Showcase your technical prowess across multiple dimensions',
                    'Network with industry experts and fellow tech enthusiasts',
                    'Win exciting prizes and recognition for your innovations',
                    'Experience workshops and talks from tech industry leaders'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block w-2 h-2 mt-2 mr-2 bg-white rounded-full"></span>
                      <span className="font-comic">{item}</span>
                    </li>
                  ))}
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
        </motion.div>
      </div>
    </section>
  )
}

