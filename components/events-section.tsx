"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronRight, X, Gamepad2 } from "lucide-react"
import GlitchEffect from "./glitch-effect"
import Link from "next/link"

export default function EventsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeEvent, setActiveEvent] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [draggedEvent, setDraggedEvent] = useState<number | null>(null)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })

  const events = [
    {
      id: 1,
      title: "Robo Combat (Weapon)",
      category: "Robotics",
      description:
        "Design a monster, not a machine — and let it feast on metal in the pit.",
      image: "../images/robo_combat.jpg?height=800&width=1000",
      longDescription:
        "The Spider-Verse has seen its fair share of battles, but this time, it's mechanized! Design and control a combat robot to fight against other contenders in an intense arena battle.",
      date: "May 3-4",
      time: "10:00 AM - 7:00 PM",
      venue: "College Campus",
      team: "2-4 members",
    },
    {
      id: 2,
      title: "Robo Kick",
      category: "Robotics",
      description:
        "A high-tech soccer match where robots score like Spidey swings!",
      image: "../images/robo_kick.jpg?height=400&width=600",
      longDescription:
        "Design a robot capable of powerful kicks and precision passes in this high-energy robotic soccer challenge. Only the best-engineered bot will claim victory!",
      date: "May 2-4",
      time: "10:00 AM - 7:00 PM",
      venue: "College Campus",
      team: "2-4 members",
    },
    {
      id: 3,
      title: "Death Race",
      category: "Robotics",
      description:
        "Build the fastest bot and race to victory through dangerous twists and turns!",
      image: "../images/deathrace.jpg?height=400&width=600",
      longDescription:
        "Speed through an intense track filled with obstacles and challenges. Only the fastest and most maneuverable robots will survive this high-stakes race through the Spider-Verse!",
      date: "May 2-4",
      time: "10:00 AM - 7:00 PM",
      venue: "College Campus",
      team: "2-4 members",
    },
    {
      id: 4,
      title: "Sky Rocket",
      category: "Robotics",
      description:
        "Build a rocket and launch it high—just like Spidey's web swings!",
      image: "/images/skyrocket.jpg?height=400&width=600",
      longDescription:
        "Compete in an exhilarating rocket-launching contest where height, accuracy, and design ingenuity matter. Will your rocket soar across dimensions?",
      date: "May 2-3",
      time: "10:00 AM - 5:00 PM",
      venue: "College Campus",
      team: "Maximum 4 members",
    },
    // {
    //   id: 5,
    //   title: "Robo Surprise Event",
    //   category: "Robotics",
    //   description:
    //     "Surprise event, waiting to be revealed",
    //   image: "/placeholder.svg?height=400&width=600",
    //   longDescription:
    //     "Surprise event, waiting to be revealed",
    //   date: "May 2-4",
    //   time: "10:00 AM - 7:00 PM",
    //   venue: "College Campus",
    //   team: "Surprise",
    // },
    {
      id: 6,
      title: "Web Slingers",
      category: "Coding",
      description:
        "Showcase your web development skills by creating innovative and responsive websites. Spin your web of code and design to capture the judges' attention.",
      image: "../images/web_slingers.jpg?height=400&width=600",
      longDescription:
        "Dive into the multiverse of web development! In this challenge, participants will create a fully responsive website based on a theme revealed at the start of the competition. You'll have 24 hours to design, code, and deploy your creation. Judges will evaluate your work based on design aesthetics, code quality, responsiveness, and creative implementation of the theme. Bring your HTML, CSS, and JavaScript skills to swing through this challenge!",
      date: "May 2",
      time: "10:00 AM - 10:00 AM (next day)",
      venue: "College Campus",
      team: "2-3 members",
    },
  ]

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

  const openEventDetails = (id: number) => {
    setSelectedEvent(id)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setTimeout(() => setSelectedEvent(null), 300)
  }

  const handleDragStart = (id: number, e: React.MouseEvent) => {
    setDraggedEvent(id)
    setDragPosition({ x: e.clientX, y: e.clientY })
  }

  const handleDragEnd = () => {
    if (draggedEvent !== null) {
      openEventDetails(draggedEvent)
      setDraggedEvent(null)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedEvent !== null) {
      setDragPosition({ x: e.clientX, y: e.clientY })
    }
  }

  return (
    <section
      id="events"
      className="relative py-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {/* Spider-Verse themed background */}
      {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div> */}

      {/* Dimensional rifts */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-spider-red to-spider-blue blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-spider-blue to-spider-red blur-3xl opacity-10"></div>

      {/* Game-like instructions */}
      <motion.div
        className="absolute top-4 right-4 bg-spider-dark-blue/50 backdrop-blur-sm p-3 rounded-lg z-10 flex items-center space-x-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Gamepad2 className="text-spider-red" size={20} />
        <p className="text-xs text-white">Drag & Drop cards to explore events!</p>
      </motion.div>

      <div ref={ref} className="container relative z-10 px-4 mx-auto">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <GlitchEffect>
              <h2 className="inline-block text-4xl font-bold text-white md:text-5xl font-comic">
                MULTIVERSE EVENTS
              </h2>
            </GlitchEffect>
            <div className="w-24 h-1 mx-auto mt-4 bg-spider-blue"></div>
            <p className="max-w-2xl mx-auto mt-6 text-gray-300 font-comic">
              Explore our diverse range of technical events spanning across the multiverse of technology. Each event is
              designed to challenge your skills and creativity.
            </p>
          </motion.div>

          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants}>
            {events.map((event) => (
              <motion.div
                key={event.id}
                className="relative overflow-hidden transition-all duration-500 bg-spider-dark-blue/20 rounded-lg comic-panel cursor-grab active:cursor-grabbing"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(255, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 255, 0.3)",
                }}
                onMouseDown={(e) => handleDragStart(event.id, e)}
                onHoverStart={() => setActiveEvent(event.id)}
                onHoverEnd={() => setActiveEvent(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  {/* Spider-Verse themed event images */}
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-spider-dark to-transparent"></div>
                  <div className="absolute top-0 left-0 px-3 py-1 text-xs font-bold text-white bg-spider-red">
                    {event.category}
                  </div>

                  {/* Interactive overlay that appears on hover */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.button
                      className="px-8 py-3 font-bangers text-white hover:text-black transition-transform hover:bg-white"
                      whileHover={{ scale: 1.05, borderImage: "linear-gradient(135deg, yellow, cyan) 1 font-bangers",
                        borderWidth: "2px",
                        borderStyle: "solid" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      VIEW DETAILS
                    </motion.button>
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bangers text-white ">{event.title}</h3>
                  <p className="text-sm text-gray-300 font-comic">{event.description}</p>

                  <div className="flex items-center justify-between mt-4">
                    <Link
                      href={`/events/${event.id}`}
                      className="flex items-center text-sm font-comic text-spider-blue hover:text-spider-red"
                    >
                      Learn More <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>

                    <div className="px-3 py-1 text-xs font-comic text-white bg-spider-dark rounded-full">
                      {event.date}
                    </div>
                  </div>
                </div>

                {/* Comic-style decorative elements */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 transform rotate-45 translate-x-16 -translate-y-8 bg-spider-red/80"></div>
                  <div className="absolute top-2 right-2 text-xs font-bold text-white transform rotate-45">NEW</div>
                </div>

                {/* Animated web corner on hover */}
                <div className="absolute bottom-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-spider-red/30">
                    <path d="M0,100 L100,0" stroke="currentColor" strokeWidth="1" />
                    <path d="M0,80 L80,0" stroke="currentColor" strokeWidth="1" />
                    <path d="M0,60 L60,0" stroke="currentColor" strokeWidth="1" />
                    <path d="M0,40 L40,0" stroke="currentColor" strokeWidth="1" />
                    <path d="M0,20 L20,0" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="flex justify-center mt-12" variants={itemVariants}>
            <Link href="/events">
            <div className="px-1 py--1 border-2 border-white">
              <motion.button
                className="px-8 py-3 font-comic text-white hover:text-black transition-transform hover:bg-white"
                whileHover={{ scale: 1.05, borderImage: "linear-gradient(135deg, yellow, cyan) 1",
                  borderWidth: "2px",
                  borderStyle: "solid" }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW ALL EVENTS
              </motion.button>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Dragged event preview */}
      {draggedEvent !== null && (
        <motion.div
          className="fixed z-50 w-64 pointer-events-none"
          style={{
            left: dragPosition.x - 128,
            top: dragPosition.y - 50,
            rotate: Math.random() * 10 - 5,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {events
            .filter((e) => e.id === draggedEvent)
            .map((event) => (
              <div
                key={event.id}
                className="bg-spider-dark-blue/90 backdrop-blur-md p-4 rounded-lg border-2 border-spider-red"
              >
                <h3 className="text-lg font-bold text-white font-comic">{event.title}</h3>
                <p className="text-xs text-gray-300 mt-1">Release to view details</p>
              </div>
            ))}
        </motion.div>
      )}

      {/* Event Details Modal */}
      <AnimatePresence>
        {showModal && selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-4xl p-1 bg-gradient-to-r from-spider-red via-spider-blue to-spider-red rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 bg-spider-dark rounded-lg">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={closeModal}>
                  <X size={24} />
                </button>

                {events
                  .filter((e) => e.id === selectedEvent)
                  .map((event) => (
                    <div key={event.id} className="grid gap-6 md:grid-cols-2">
                      <div className="relative overflow-hidden rounded-lg comic-border">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-0 left-0 px-3 py-1 text-xs font-bold text-white bg-spider-red">
                          {event.category}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <GlitchEffect intensity="low">
                          <h3 className="text-2xl font-bold text-white font-comic">{event.title}</h3>
                        </GlitchEffect>

                        <div className="mt-4 space-y-4">
                          <p className="text-gray-300 font-comic">{event.longDescription}</p>

                          <div className="p-4 bg-spider-dark-blue/30 rounded-lg">
                            <h4 className="mb-2 text-lg font-bold text-spider-blue">Event Details</h4>
                            <ul className="space-y-2 text-gray-300">
                              <li className="flex items-start">
                                <span className="inline-block w-2 h-2 mt-2 mr-2 bg-spider-red rounded-full"></span>
                                <span className="font-comic">
                                  <strong>Date :</strong> {event.date}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="inline-block w-2 h-2 mt-2 mr-2 bg-spider-red rounded-full"></span>
                                <span className="font-comic">
                                  <strong>Time :</strong> {event.time}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="inline-block w-2 h-2 mt-2 mr-2 bg-spider-red rounded-full"></span>
                                <span className="font-comic">
                                  <strong>Venue :</strong> {event.venue}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="inline-block w-2 h-2 mt-2 mr-2 bg-spider-red rounded-full"></span>
                                <span className="font-comic">
                                  <strong>Team Size :</strong> {event.team}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex justify-end mt-auto">
                          <Link href={`/events/${event.id}`}>
                          <motion.button
                              className="px-8 py-3 font-comic text-white border-2 hover:text-black transition-transform hover:bg-white"
                              whileHover={{ scale: 1.05, borderImage: "linear-gradient(135deg, yellow, cyan) 1",
                                borderWidth: "2px",
                                borderStyle: "solid" }}
                              whileTap={{ scale: 0.95 }}
                            >
                              FULL DETAILS
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>


//     <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//   <h2 className="text-4xl font-bold mb-4">Events Coming Soon</h2>
//   <p className="text-lg text-gray-400 text-center max-w-2xl">
//     Stay tuned for an exciting lineup of events that will challenge your skills and creativity. 
//     The multiverse of technology awaits you!
//   </p>
// </section>  

  )
}
