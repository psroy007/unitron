"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function SponsorsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const sponsors = [
    { id: 4, name: "GLOBSYN", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUq7w4mH6-2rP8Byes1JnbNduPq0vfztKB-A&s", tier: "Silver" },
    { id: 5, name: "SMART BRAINS", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpOwORMbq43CV0olQKQN2XeqTtNyn-wE0L_w&s", tier: "Silver" },
    { id: 6, name: "CODE CHEF", image: "https://static.startuptalky.com/2021/04/codechef-logo-startuptalky.jpg", tier: "Silver" },
    { id: 7, name: "CloudConnect", image: "/placeholder.svg?height=200&width=200", tier: "Bronze" },
    { id: 8, name: "AIInnovate", image: "/placeholder.svg?height=200&width=200", tier: "Bronze" },
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

  return 
  // (
  //   <section id="sponsors" className="relative py-20 overflow-hidden">
  //     {/* <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div> */}

  //     <div ref={ref} className="container relative z-10 px-4 mx-auto font-comic">
  //       <motion.div
  //         className="max-w-6xl mx-auto"
  //         variants={containerVariants}
  //         initial="hidden"
  //         animate={isInView ? "visible" : "hidden"}
  //       >
  //         <motion.div className="mb-12 text-center" variants={itemVariants}>
  //           <h2 className="inline-block text-4xl font-bold text-white md:text-5xl font-comic">
  //             PREVIOUS SPONSORS
  //           </h2>
  //           <div className="w-24 h-1 mx-auto mt-4 bg-spider-blue"></div>
  //           <p className="max-w-2xl mx-auto mt-6 text-gray-300">
  //             UNiTRON is proudly supported by these amazing organizations from across the multiverse.
  //           </p>
  //         </motion.div>

  //         <motion.div variants={containerVariants}>
  //           <motion.div className="flex flex-wrap justify-center" variants={itemVariants}>
  //             {sponsors
  //               .filter((s) => s.tier === "Silver")
  //               .map((sponsor) => (
  //                 <div
  //                   key={sponsor.id}
  //                   className="p-6 m-4 transition-transform bg-white/10 backdrop-blur-md rounded-xl hover:scale-105 shadow-lg"
  //                 >
  //                   <Image
  //                     src={sponsor.image || "/placeholder.svg"}
  //                     alt={sponsor.name}
  //                     width={250}
  //                     height={250}
  //                     className="object-contain w-36 h-36"
  //                   />
  //                   <p className="mt-4 text-lg font-semibold text-center text-white font-comic">{sponsor.name}</p>
  //                 </div>
  //               ))}
  //           </motion.div>
  //         </motion.div>
  //       </motion.div>
  //     </div>
  //   </section>
  // )
}
