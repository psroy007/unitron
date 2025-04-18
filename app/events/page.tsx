"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, Search, Filter } from "lucide-react"
import Link from "next/link"
import GlitchEffect from "@/components/glitch-effect"
import WebEffect from "@/components/web-effect"

export default function EventsPage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Events data
  const events = [
    {
      id: 1,
      title: "Robo Combat (Weapon)",
      category: "Robotics",
      description:
        "Battle it out in an epic robo showdown—only the strongest bot wins!",
      image: "/images/robo_combat.jpg?height=400&width=600",
      longDescription:
        "The Spider-Verse has seen its fair share of battles, but this time, it's mechanized! Design and control a combat robot to fight against other contenders in an intense arena battle.",
      date: "May 3-4",
      time: "10:00 AM - 7:00 PM",
      venue: "College Campus",
      team: "2-4 members",
      registration: "₹700",
      prizes: "1st: ₹12,000, 2nd: ₹8,000",
      featured: true,
    },
    {
      id: 2,
      title: "Robo Kick",
      category: "Robotics",
      description:
        "A high-tech soccer match where robots score like Spidey swings!",
      image: "/images/robo_kick.jpg?height=400&width=600",
      longDescription:
        "Design a robot capable of powerful kicks and precision passes in this high-energy robotic soccer challenge. Only the best-engineered bot will claim victory!",
      date: "May 2-4",
      time: "10:00 AM - 7:00 PM",
      venue: "College Campus",
      team: "2-4 members",
      registration: "₹400 (re-entry: ₹250), TTT MEMBERS: ₹350 (re-entry: ₹150)",
      prizes: "1st: ₹6000, 2nd: ₹4000",
      featured: true,
    },
    {
      id: 3,
      title: "Death Race",
      category: "Robotics",
      description:
        "Build the fastest bot and race to victory through dangerous twists and turns!",
      image: "/images/deathrace.jpg?height=400&width=600",
      longDescription:
        "Speed through an intense track filled with obstacles and challenges. Only the fastest and most maneuverable robots will survive this high-stakes race through the Spider-Verse!",
      date: "May 2-4",
      time: "10:00 AM - 7:00 PM",
      venue: "College Campus",
      team: "2-4 members",
      registration: "₹400 (re-entry: ₹250), TTT MEMBERS: ₹300 (re-entry: ₹150)",
      prizes: "1st: ₹5000, 2nd: ₹3000, 3rd: ₹2000",
      featured: true,
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
      registration: "₹150 (re-entry: ₹80)",
      prizes: "1st: ₹1500, 2nd: ₹1000, 3rd: ₹500",
      featured: false,
    },
    {
      id: 6,
      title: "Web Slingers",
      category: "Coding",
      description:
        "Showcase your web development skills by creating innovative and responsive websites. Spin your web of code and design to capture the judges' attention.",
      image: "/images/web_slingers.jpg?height=400&width=600",
      longDescription:
        "Dive into the multiverse of web development! In this challenge, participants will create a fully responsive website based on a theme revealed at the start of the competition. You'll have 24 hours to design, code, and deploy your creation. Judges will evaluate your work based on design aesthetics, code quality, responsiveness, and creative implementation of the theme. Bring your HTML, CSS, and JavaScript skills to swing through this challenge!",
      date: "May 3",
      time: "10:00 AM - 10:00 AM (next day)",
      venue: "College Campus",
      team: "2-3 members",
      registration: "₹120",
      prizes: "1st: ₹600, 2nd: ₹400",
      featured: true,
    },
    {
      id: 7,
      title: "Code Dimension",
      category: "Coding",
      description:
        "Navigate through multiple dimensions of coding challenges. Solve complex problems with efficient algorithms and prove your coding prowess.",
      image: "/images/code_dimension.jpg?height=400&width=600",
      longDescription:
        "Enter a dimension where algorithms reign supreme! Code Dimension is an intense competitive coding contest where participants will face increasingly difficult programming challenges across multiple rounds. Each round represents a different dimension with unique problem-solving requirements. From time complexity optimization to space-efficient solutions, you'll need to adapt quickly to survive each dimension. Only the most versatile coders will make it to the final round!",
      date: "May 2",
      time: "2:00 PM - 6:00 PM",
      venue: "College Campus",
      team: "Individual",
      registration: "₹80",
      prizes: "1st: ₹500, 2nd: ₹300",
      featured: true,
    },
    {
      id: 8,
      title: "CTF-Verse",
      category: "Coding",
      description:
        "Hackers from the Spider-Verse are breaching realities! Use your cyber skills to crack codes, decrypt messages, and outsmart villains in this ultimate Capture the Flag challenge. Only the smartest web-heads can restore balance!",
      image: "/images/ctf.jpg?height=400&width=600",
      longDescription:
        "The multiverse is under attack! A sinister cyber-villain is tampering with digital dimensions, leaving cryptic clues across cyberspace. As a cyber-Spidey, your mission is to track down vulnerabilities, decrypt codes, and recover lost data before chaos consumes the Spider-Verse. Do you have what it takes to web your way to victory?",
      date: "May 4",
      time: "10:00 AM - 01:00 PM",
      venue: "College Campus",
      team: "1-2 Members",
      registration: "₹80",
      prizes: "1st: ₹500, 2nd: ₹300",
      featured: true,
    },
    {
      id: 9,
      title: "BGMI",
      category: "Gaming",
      description:
        "Gear up, squad up, and drop into the battleground as you fight to save—or conquer—the multiverse!",
        image: "/events/bgmi.jpg",
      longDescription:
        "In an alternate dimension, chaos reigns, and only the strongest Spideys will survive! Join the ultimate battle royale where precision, teamwork, and strategy determine who swings to victory. Will you emerge as the last Spidey standing, or will you be lost in the collapsing multiverse?",
      date: "May 2",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "BR: ₹200 (TTT - ₹160) | TDM: Game Card",
      prizes: "BR: ₹6000 | TDM: Game Card",
      featured: false,
    },
    {
      id: 10,
      title: "Free Fire",
      category: "Gaming",
      description:
        "Quick reflexes and web-slinging tactics will decide the fate of the battle—are you ready?",
      image: "/events/freefire.jpg",
      longDescription:
        "The Spider-Verse is under siege, and only the fastest, smartest, and most agile warriors can defend it! In this high-speed survival showdown, dodge enemy fire, swing into action, and prove your supremacy in an epic Free Fire tournament.",
      date: "May 3",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "BR: ₹200 (TTT - ₹160) | TDM: Game Card",
      prizes: "BR: ₹4000 | TDM: Game Card",
      featured: false,
    },
    {
      id: 11,
      title: "Call of Duty",
      category: "Gaming",
      description:
        "Suit up, grab your gear, and take down the threats lurking in the Spider-Verse!",
      image: "/events/callofduty.jpg",
      longDescription:
        "When villains from multiple dimensions join forces, it's up to you to stop them! Enter an intense Call of Duty showdown where strategy, precision, and web-enhanced reflexes are key. Whether in deathmatch, search and destroy, or battle royale, every shot counts in this war for the multiverse.",
      date: "May 4",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "Game Card",
      prizes: "Game Card",
      featured: false,
    },
    {
      id: 12,
      title: "FIFA Mobile",
      category: "Gaming",
      description:
        "A multiversal football tournament where Spidey skills meet insane goals!",
      image: "/events/fifa.jpg",
      longDescription:
        "Football isn't just a game—it's a battle across dimensions! Lace up and take control of your team as you dribble past defenders, curve the ball like a web-line, and strike powerful goals in a FIFA Mobile tournament where champions are made.",
      date: "May 2",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "1v1: Game Card | Tournament: ₹50",
      prizes: "1v1: Game Card | Tournament: ₹1000",
      featured: false,
    },
    {
      id: 13,
      title: "PES",
      category: "Gaming",
      description:
        "Master the perfect web-assisted passes and outplay your rivals!",
      image: "/events/pes.jpg",
      longDescription:
        "In this dimension, football has a Spider-Man twist! Experience precision gameplay and show off your dribbling skills as you face off against the best PES players. Will your team weave the perfect web of passes to victory?",
      date: "May 3",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "₹200 (TTT - ₹160)",
      prizes: "₹6000",
      featured: false,
    },
    {
      id: 14,
      title: "Valorant",
      category: "Gaming",
      description:
        "Stealth, precision, and Spidey senses—only the best agents survive.",
      image: "/events/valorant.jpg",
      longDescription:
        "The villains of the Spider-Verse are infiltrating every reality! As elite agents, you and your team must take them down using strategy, precise shots, and lightning-fast reflexes. Every round is a battle for survival—make every ability count!",
      date: "May 4",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "₹200 (TTT - ₹160)",
      prizes: "₹6000",
      featured: false,
    },
    {
      id: 15,
      title: "Asphalt 8",
      category: "Gaming",
      description:
        "Nitro boost your way through the multiverse—because Spidey swings fast, but you drive faster!",
      image: "/events/asphalt8.jpg",
      longDescription:
        "When different dimensions collide, only the fastest racers can navigate the chaos! Blaze through impossible tracks, pull off gravity-defying stunts, and cross the finish line in an adrenaline-fueled race through the Spider-Verse.",
      date: "May 2",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "Game Card",
      prizes: "Game Card",
      featured: false,
    },
    {
      id: 16,
      title: "Uno",
      category: "Gaming",
      description:
        "A simple card game? Think again—across the Spider-Verse, anything can happen!",
      image: "/events/uno.png",
      longDescription:
        "When Spidey's friends and foes gather around a table, expect chaos! Skip turns, reverse fates, and unleash the dreaded '+4' as you battle to be the ultimate Uno champion. Every move might just open a new dimension!",
      date: "May 3",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "Game Card",
      prizes: "Game Card",
      featured: false,
    },
    {
      id: 17,
      title: "8 Ball Pool",
      category: "Gaming",
      description:
        "Aim, shoot, and pocket balls with Spidey precision!",
      image: "/events/8-ball-pool.avif",
      longDescription:
        "Spider-Man's agility isn't just for swinging—it's for pool too! Test your angles, master trick shots, and outplay your rivals in a thrilling 8 Ball Pool tournament where the best cue artists reign supreme.",
      date: "May 4",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "Game Card",
      prizes: "Game Card",
      featured: false,
    },
    {
      id: 18,
      title: "Subway Surfers",
      category: "Gaming",
      description:
        "Dodge, jump, and slide through an endless chase in the multiverse!",
      image: "/events/subway.png",
      longDescription:
        "In a world where reality keeps shifting, the only way to survive is to keep running! Dash across iconic Subway Surfers maps with Spidey speed, avoiding obstacles and collecting power-ups to stay ahead of the chase.",
      date: "May 2",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "Game Card",
      prizes: "Game Card",
      featured: false,
    },
    {
      id: 19,
      title: "Spidey-Fiesta",
      category: "Non-Tech",
      description:
        "A multiversal carnival packed with fun, games, and web-slinging surprises!",
      image: "/events/carnival2.avif",
      longDescription:
        "Step into a world where the Spider-Verse comes to life! From thrilling games to themed attractions, experience a carnival filled with Spidey-themed adventures, food, and entertainment. Get ready for an unforgettable fiesta!",
      date: "May 2-3",
      time: "11:00 AM - 5:00 PM",
      venue: "College Campus",
      team: "On Spot",
      registration: "On spot",
      prizes: "On spot",
      featured: false,
    },
    {
      id: 20,
      title: "Web of Hints",
      category: "Non-Tech",
      description:
        "Solve cryptic clues, swing past obstacles, and find the hidden treasure!",
      image: "/events/web-of-hints.jpg",
      longDescription:
        "Villains have stolen a priceless artifact, and only the sharpest minds can recover it! Follow a web of clues, crack riddles, and navigate through obstacles as you uncover the lost secrets of the Spider-Verse.",
      date: "May 2, May 4",
      time: ["Prelims: 02:30 PM - 4:00 PM", " Finals: 11:00 AM - 01:00 PM"],
      venue: "College Campus",
      team: "1-3 members",
      registration: "₹200 (TTT - ₹150)",
      prizes: "₹3000",
      featured: false,
    },
    {
      id: 21,
      title: "Leap of Faith",
      category: "Non-Tech",
      description:
        "Push your limits and overcome every obstacle in this ultimate Spidey challenge!",
      image: "/events/leapoffaith.jpg",
      longDescription:
        "Just like Miles Morales had to take a leap of faith, you must conquer a series of hurdles to prove your skills! Run, jump, and swing past obstacles in this exciting physical challenge that tests your agility and endurance.",
      date: "May 3-4",
      time: ["Prelims: 12:00 PM - 2:00 PM", " Finals: 03:00 PM - 04:30 PM"],
      venue: "College Campus",
      team: "1-3 members",
      registration: "₹150",
      prizes: "₹1000",
      featured: false,
    },
    {
      id: 22,
      title: "Spidey's Lens",
      category: "Non-Tech",
      description:
        "Capture the multiverse through the eyes of a true Spidey-photographer!",
      image: "/events/spidey's-lens.jpg",
      longDescription:
        "Channel your inner Peter Parker and snap breathtaking shots that tell a story! Whether it's action-packed moments or deep emotions, showcase your skills in a photography contest that celebrates creativity and vision.",
      date: "May 2-4",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "₹30",
      prizes: "Trophy",
      featured: false,
    },
    {
      id: 23,
      title: "Webbed Masterpiece",
      category: "Non-Tech",
      description:
        "Paint, sketch, and bring the Spider-Verse to life with your creativity!",
      image: "/images/canvas.jpg?height=400&width=600",
      longDescription:
        "The multiverse is full of colors, styles, and unique Spider-heroes. Use your artistic talent to create a masterpiece that captures the essence of the Spider-Verse in this vibrant art event!",
      date: "May 2-4",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "No Fees",
      prizes: "Trophy",
      featured: false,
    },
    {
      id: 24,
      title: "Sticky Webs",
      category: "Non-Tech",
      description:
        "Engineer a web-strong bridge that can withstand any challenge!",
      image: "/events/stickyweb.jpg",
      longDescription:
        "Peter Parker built web bridges to escape danger—now it's your turn! Design and construct a bridge using limited materials, ensuring stability and strength in this thrilling engineering challenge.",
      date: "May 2-4",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "Game Card",
      prizes: "Game Card",
      featured: false,
    },
    {
      id: 25,
      title: "Quantum Web Quiz",
      category: "Non-Tech",
      description:
        "Only the smartest Spideys can crack this web of tech questions!",
      image: "/images/quantum.jpg?height=400&width=600",
      longDescription:
        "Think you have the intellect of Peter Parker? Test your knowledge of technology, science, and the Spider-Verse in this electrifying quiz where only the wittiest web-heads prevail!",
      date: "May 2-3",
      time: ["Prelims: 12:30 PM - 02:00 PM", "Finals: 10:00 AM - 11:30 AM"],
      venue: "College Campus",
      team: "1-3 members",
      registration: "₹160 (TTT - ₹100)",
      prizes: "Trophy",
      featured: false,
    },
  ]

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "Robotics", name: "Robotics" },
    { id: "Coding", name: "Coding" },
    { id: "Gaming", name: "Gaming" },
    { id: "Non-Tech", name: "Non-Tech" },
  ]

  // Filter events based on search query and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || event.category === activeCategory

    return matchesSearch && matchesCategory
  })

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
              <h1 className="text-4xl font-bold text-white md:text-5xl font-comic">
                MULTIVERSE EVENTS
              </h1>
            </GlitchEffect>
            <div className="w-24 h-1 mx-auto mt-4 bg-spider-blue"></div>
            <p className="max-w-2xl mx-auto mt-6 text-gray-300 font-comic">
              Explore our complete lineup of technical events spanning across the multiverse of technology. Find the
              perfect challenge to showcase your skills and creativity.
            </p>
          </motion.div>

          {/* Search and filter */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-auto flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full p-3 pl-10 text-white bg-spider-dark-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spider-red"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                className="flex items-center px-4 py-3 text-white bg-spider-dark-blue/30 rounded-lg hover:bg-spider-dark-blue/50 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-5 h-5 mr-2" />
                <span>Filter Events</span>
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="mt-4 p-4 bg-spider-dark-blue/20 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-3 text-lg font-medium text-white">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`px-3 py-1 text-sm font-medium transition-all ${
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Featured events */}
          {activeCategory === "all" && searchQuery === "" && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="mb-6 text-2xl font-bold text-white font-comic">FEATURED EVENTS</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {events
                  .filter((event) => event.featured)
                  .map((event) => (
                    <Link href={`/events/${event.id}`} key={event.id}>
                      <motion.div
                        className="relative overflow-hidden transition-all duration-300 bg-spider-dark-blue/20 rounded-lg comic-panel h-full"
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 25px -5px rgba(255, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 255, 0.3)",
                        }}
                      >
                        <div className="relative h-48 overflow-hidden">
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
                          <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white bg-spider-blue">
                            Featured
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="mb-2 text-xl font-bold text-white font-comic">{event.title}</h3>
                          <p className="text-sm text-gray-300 font-comic">{event.description}</p>

                          <div className="flex items-center justify-between mt-4">
                            <span className="text-sm font-medium text-spider-blue font-comic">View Details</span>
                            <span className="px-3 py-1 text-xs font-comic text-white bg-spider-dark rounded-full">
                              {event.date}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
              </div>
            </motion.div>
          )}

          {/* All events */}
          <motion.div variants={containerVariants}>
            <h2 className="mb-6 text-2xl font-bold text-white font-comic">
              {activeCategory === "all" ? "ALL EVENTS" : activeCategory.toUpperCase()}
            </h2>

            {filteredEvents.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event) => (
                  <Link href={`/events/${event.id}`} key={event.id}>
                    <motion.div
                      className="relative overflow-hidden transition-all duration-300 bg-spider-dark-blue/20 rounded-lg comic-panel h-full"
                      variants={itemVariants}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 25px -5px rgba(255, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 255, 0.3)",
                      }}
                    >
                      <div className="relative h-48 overflow-hidden">
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
                      </div>

                      <div className="p-6">
                        <h3 className="mb-2 text-xl font-bold text-white font-comic">{event.title}</h3>
                        <p className="text-sm text-gray-300 font-comic">{event.description}</p>

                        <div className="flex items-center justify-between mt-4">
                          <span className="text-sm font-medium text-spider-blue font-comic">View Details</span>
                          <span className="px-3 py-1 text-xs font-comic text-white bg-spider-dark rounded-full">
                            {event.date}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : (
              <motion.div className="py-16 text-center" variants={itemVariants}>
                <p className="text-xl text-gray-400">No events found matching your search criteria.</p>
                <button
                  className="px-4 py-2 mt-4 text-white bg-spider-red rounded-md"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
