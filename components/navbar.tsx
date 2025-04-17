"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Check which section is currently in view
      const sections = document.querySelectorAll("section[id]")
      let currentSection = null

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop < window.innerHeight / 3) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Team", href: "/teams" },
    { name: "Gallery", href: "/gallery" },
    { name: "FAQs", href: "#faqs" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Contact", href: "#contact" },
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only apply smooth scrolling for hash links
    if (href.startsWith("#")) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for navbar height
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-transparent py-100" : "bg-transparent py-100"
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container flex items-center justify-between px-4 mx-auto font-comic mt-6">
        <motion.div className="text-2xl font-bold text-spider-red font-comic" variants={itemVariants}>
          {/* <Link href="/" className="flex items-center gap-2" onClick={() => window.location.reload()}>
            <span className="relative backdrop-blur-md">
              <img
                src="/spider_logo_nav.png" // Replace with actual image path
                alt="UNiTRON"
                className="relative"
              />
            </span>
          </Link> */}
        </motion.div>

        <div className="hidden md:inline-flex items-center bg-white/10 backdrop-blur-md px-0 py-4 border-2">
          <motion.ul className="flex items-center space-x-3" variants={navVariants}>
            {navItems.map((item) => (
              <motion.li key={item.name} variants={itemVariants} className="relative">
                <Link
                  href={item.href}
                  className={`relative text-white hover:text-white items-center hover:bg-spider-red hover: px-3 py-4 transition-colors group font-medium ${
                    activeSection === item.href.replace("#", "") ? "text-spider-red" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                  {/* <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-spider-red transition-all duration-300 ${
                      activeSection === item.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span> */}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.button
          variants={itemVariants}
          className="block md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-spider-dark"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <ul className="flex flex-col items-center space-y-6">
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`text-xl font-bold transition-colors ${
                      activeSection === item.href.replace("#", "")
                        ? "text-spider-red"
                        : "text-white hover:text-spider-red"
                    }`}
                    onClick={(e) => {
                      handleNavClick(e, item.href)
                      setIsOpen(false)
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}


