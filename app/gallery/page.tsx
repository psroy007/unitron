"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, X, ZoomIn } from "lucide-react"
import Link from "next/link"
import GlitchEffect from "@/components/glitch-effect"
import WebEffect from "@/components/web-effect"

export default function GalleryPage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  // Gallery images from previous events
  const galleryImages = [
    {
      id: 1,
      src: "/gallary/Inaguration.jpg?height=600&width=800",
      alt: "UNiTRON 2024 Opening Ceremony",
      category: "events",
      year: "2024",
      description:
        "The grand opening ceremony of UNiTRON 2024 featuring a spectacular light show and holographic displays.",
    },
    {
      id: 2,
      src: "/gallary/unitron_2024_launch.JPG",
      alt: "UNiTRON 2024 Launch Event",
      category: "events",
      year: "2024",
      description: "The launch event of UNiTRON 2024 with a keynote speech by our secretary and a live demonstration of projects.",
    },
    // {
    //   id: 2,
    //   src: "/placeholder.svg?height=600&width=800",
    //   alt: "Web Development Workshop",
    //   category: "workshops",
    //   year: "2024",
    //   description: "Students learning advanced web development techniques during our intensive 2-day workshop.",
    // },
    // {
    //   id: 3,
    //   src: "/placeholder.svg?height=600&width=800",
    //   alt: "Hackathon Winners",
    //   category: "competitions",
    //   year: "2024",
    //   description: "The winning team of our 36-hour hackathon showcasing their innovative smart city solution.",
    // },
    // {
    //   id: 4,
    //   src: "/placeholder.svg?height=600&width=800",
    //   alt: "AR/VR Exhibition",
    //   category: "exhibitions",
    //   year: "2024",
    //   description: "Visitors experiencing cutting-edge augmented and virtual reality projects developed by students.",
    // },

    {
      id: 3,
      src: "/gallary/IMG-20240422-WA0267.jpg?height=600&width=800",
      alt: "Carrom Pool",
      category: "competitions",
      year: "2024",
      description: "Participants competing in an intense game of Carrom Pool during the UNiTRON 2024 competitions.",
    },
    {
      id: 4,
      src: "/gallary/human_ludo.JPG?height=600&width=800",
      alt: "Human Ludo",
      category: "competition",
      year: "2024",
      description: "Players playing human ludo.",
    },
    {
      id: 5,
      src: "/gallary/robo_comp.JPG?height=600&width=800",
      alt: "Robotics Competition",
      category: "competitions",
      year: "2024",
      description: "Robots navigating through a complex maze during our annual robotics challenge.",
    },
    {
      id: 6,
      src: "/gallary/robo-soccer2.jpg?height=600&width=800",
      alt: "Robo-Soccer",
      category: "competition",
      year: "2024",
      description: "Students playing soccer using hand-made robots.",
    },
    {
      id: 7,
      src: "/gallary/Bottle_flip.JPG",
      alt: "Bottle Flip",
      category: "competitions",
      year: "2024",
      description: "Students are trying their best to win the flip challenge.",
    },
    {
      id: 8,
      src: "/gallary/misc.JPG",
      alt: "CANVAS",
      category: "exhibitions",
      year: "2024",
      description: "Our wall is decorated with our students' art and paintings.",
    },
    {
      id: 9,
      src: "/gallary/Competitive_Programming.JPG",
      alt: "Coding Competition",
      category: "competitions",
      year: "2024",
      description: "Intense coding competition where participants solved complex algorithmic challenges.",
    },
    {
      id: 10,
      src: "/gallary/gaming.jpg",
      alt: "Gaming",
      category: "exhibitions",
      year: "2024",
      description: "An intense war can be seen in our gaming event, get ready to be the champion.",
    },
    {
      id: 11,
      src: "/gallary/uno.jpg",
      alt: "UNO",
      category: "competitions",
      year: "2024",
      description: "Showcase your trump card for the ultimate move in the verse of UNO.",
    },
    {
      id: 12,
      src: "/gallary/stalls.JPG",
      alt: "2024 Sponsors",
      category: "events",
      year: "2024",
      description: "Here are the sponsors who play a very crucial role for the success of UNiTRON.",
    },
    {
      id: 13,
      src: "/gallary/unitron_wall.jpg",
      alt: "Hands Behind UNiTRON",
      category: "events",
      year: "2024",
      description: "The hardwork, the passion, the determination of each and everyone behind the success of UNiTRON.",
    },
    {
      id: 14,
      src: "/gallary/core_mem.jpg",
      alt: "Core Team",
      category: "events",
      year: "2024",
      description: "Full team with each and every coordinators and volunteers celebrating the success of UNiTRON 2024.",
    },
    {
      id: 15,
      src: "/gallary/event_registration.JPG",
      alt: "Event Registration",
      category: "events",
      year: "2024",
      description: "Participants are highly excited to enroll for new events and our volunteers are trying their best.",
    },
  ]

  const categories = [
    { id: "all", name: "All" },
    { id: "events", name: "Events" },
    { id: "workshops", name: "Workshops" },
    { id: "competitions", name: "Competitions" },
    { id: "exhibitions", name: "Exhibitions" },
    { id: "talks", name: "Talks" },
  ]

  const years = ["2024", "2023", "2022"]

  const filteredImages = galleryImages.filter((img) => activeCategory === "all" || img.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-spider-dark">
      <WebEffect />

      {/* Header with back button */}
      <div className="fixed top-0 left-0 right-0 z-40 py-4 bg-spider-dark/90 backdrop-blur-md">
        <div className="container flex items-center px-4 mx-auto">
          <Link href="/" className="flex items-center text-white hover:text-spider-red transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="container px-4 mx-auto pt-24 pb-20">
        <div ref={ref} className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlitchEffect>
              <div className="flex">
                <h1 className="text-4xl font-bold text-white md:text-5xl font-comic">
                  UN </h1>
                  <span className="text-4xl font-comic text-white md:text-5xl"> i</span>
                  <h1 className="text-4xl font-bold text-white md:text-5xl font-comic">TRON GALLERY</h1>
              </div>
            </GlitchEffect>
            <div className="w-24 h-1 mx-auto mt-4 bg-spider-blue"></div>
            <p className="max-w-2xl mx-auto mt-6 text-gray-300 font-comic">
              Explore moments from previous UNiTRON events across the multiverse of technology. Witness the evolution of
              innovation and creativity through the years.
            </p>
          </motion.div>

          {/* Filter controls */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-spider-red text-white"
                      : "bg-spider-dark-blue/30 text-gray-300 hover:bg-spider-dark-blue/50"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-gray-400">Year:</span>
              {years.map((year) => (
                <div key={year} className="flex items-center">
                  <span className="px-3 py-1 text-sm font-medium text-white bg-spider-dark-blue/30">
                    {year}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Gallery grid */}
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                className="relative overflow-hidden bg-spider-dark-blue/20 rounded-lg comic-panel gallery-image"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(255, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 255, 0.3)",
                }}
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-spider-dark to-transparent opacity-60"></div>

                  <div className="absolute top-0 left-0 px-3 py-1 text-xs font-bold text-white bg-spider-red">
                    {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                  </div>

                  <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white bg-spider-blue">
                    {image.year}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 text-white bg-black/50 rounded-full backdrop-blur-sm">
                      <ZoomIn size={24} />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-white font-comic">{image.alt}</h3>
                  <p className="mt-1 text-sm text-gray-300 font-comic">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty state */}
          {filteredImages.length === 0 && (
            <motion.div
              className="py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl text-gray-400">No images found for this category.</p>
              <button
                className="px-4 py-2 mt-4 text-white bg-spider-red rounded-md"
                onClick={() => setActiveCategory("all")}
              >
                View All Images
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Image lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 rounded-full backdrop-blur-sm"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>

              {galleryImages
                .filter((img) => img.id === selectedImage)
                .map((image) => (
                  <div key={image.id} className="text-center">
                    <div className="relative overflow-hidden rounded-lg comic-border">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        width={800}
                        height={400}
                        className="object-contain max-h-[80vh]"
                      />
                    </div>

                    <div className="mt-4 p-4 bg-spider-dark-blue/50 backdrop-blur-sm rounded-lg">
                      <h3 className="text-xl font-bold text-white font-comic">{image.alt}</h3>
                      <p className="mt-2 text-gray-300">{image.description}</p>
                      <div className="flex items-center justify-center mt-2 space-x-4">
                        <span className="px-3 py-1 text-sm font-medium text-white bg-spider-red rounded-full">
                          {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                        </span>
                        <span className="px-3 py-1 text-sm font-medium text-white bg-spider-blue rounded-full">
                          {image.year}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

