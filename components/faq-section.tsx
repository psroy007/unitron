"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import GlitchEffect from "./glitch-effect"

export default function FaqSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is UNiTRON?",
      answer:
        "UNiTRON is Future Institute of Technology's flagship technical festival. It brings together students, tech enthusiasts, and industry professionals for a three-day celebration of innovation, creativity, and technology.",
    },
    {
      question: "When and where will UNiTRON 2025 be held?",
      answer:
        "UNiTRON 2025 will be held from May 2nd-4th, 2025, at the Future Institute of Technology campus. The event will feature both indoor and outdoor venues across the campus.",
    },
    {
      question: "Who can participate in UNiTRON?",
      answer:
        "UNiTRON is open to students from all colleges and universities. Some events may have specific eligibility criteria, which will be mentioned in the respective event guidelines.",
    },
    {
      question: "How do I register for UNiTRON?",
      answer:
        "Registration for UNiTRON can be done through our official website. You can register as an individual or as a team, depending on the event requirements.",
    },
    {
      question: "Are there any accommodation facilities available?",
      answer:
        "No, there is no facility of any kind ofaccomodation here.",
    },
    {
      question: "What are the prizes for the events?",
      answer:
        "UNiTRON offers exciting prizes including cash rewards, MAR points, certificates, and more. The total prize pool is over ₹1.7 lakh. Specific prize details for each event are available on the respective event pages.",
    },
    {
      question: "Can I participate in multiple events?",
      answer:
        "Yes, you can participate in multiple events as long as there are no schedule conflicts. We recommend checking the event schedule before registering for multiple events.",
    },
    {
      question: "Is there a dress code for the event?",
      answer:
        "There is no specific dress code for the general event.",
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

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faqs" className="relative py-20 overflow-hidden">
      {/* Spider-Verse themed background */}
      {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div> */}

      {/* Dimensional rifts */}
      <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-spider-red to-spider-blue blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-spider-blue to-spider-red blur-3xl opacity-10"></div>

      <div ref={ref} className="container relative z-10 px-4 mx-auto">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <GlitchEffect>
              <h2 className="inline-block text-4xl font-bold text-white md:text-5xl font-comic">
                <span className="text-white">FAQs</span>
              </h2>
            </GlitchEffect>
            <div className="w-24 h-1 mx-auto mt-4 bg-spider-blue"></div>
            <p className="max-w-2xl mx-auto mt-6 text-gray-300 font-comic">
              Got questions? We've got answers! Check out our frequently asked questions below.
            </p>
          </motion.div>

          <motion.div className="space-y-4" variants={containerVariants}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="overflow-hidden bg-spider-dark-blue/20 rounded-lg comic-panel"
                variants={itemVariants}
              >
                <button
                  className="flex items-center justify-between w-full p-6 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-comic text-white">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-spider-red transition-transform duration-300 ${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-gray-300 text-lg font-comic">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

         
        </motion.div>
      </div>
    </section>
  )
}

