"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Twitter } from "lucide-react"
import GlitchEffect from "./glitch-effect"

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const facultyMentor = {
    id: 1,
    name: "Prof. Amit Kumar Majumdar",
    role: "Faculty Mentor",
    image: "/mentor/amit.jpg",
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  }

  const mentors = [
    {
      id: 1,
      name: "Souvik Sarkar",
      image: "/mentor/souvik.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 2,
      name: "Sreeja Kar Choudhary",
      image: "/mentor/sreeja.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 3,
      name: "Prateek Kumar Singh",
      image: "/mentor/prateek.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 4,
      name: "Pratham Biswas",
      image: "/mentor/pratham.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 5,
      name: "Soumadeep Chakraborty",
      image: "/mentor/soumadeep.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 6,
      name: "Debasmita Mitra",
      image: "/mentor/debasmita.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 7,
      name: "Sayan Ghosh",
      image: "/mentor/sayan.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
  ]

  const team = [
    {
      id: 1,
      name: "Bishal Maity",
      role: "President",
      image: "/images/Bishal.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 2,
      name: "Arpita Singh",
      role: "Secretary",
      image: "/images/Arpita2.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 3,
      name: "Sudipta Sanyal",
      role: "Treasurer",
      image: "/images/Sudipta.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 4,
      name: "Diganta Debsharma",
      role: "Administrator",
      image: "/images/Diganta.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 5,
      name: "Snehasish Das",
      role: "Tech Head",
      image: "images/Snehasish.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 6,
      name: "Soumojit Hazra",
      role: "Tech Head",
      image: "images/Soumojit.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 7,
      name: "Dibyajyoti Jana",
      role: "Tech Head",
      image: "images/Dibyojyoti.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 8,
      name: "Ayantika Das",
      role: "Tech Head",
      image: "/images/Ayantika.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 9,
      name: "Debayan Saha",
      role: "Tech Head",
      image: "/images/debayan.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 10,
      name: "Purab Singha Roy",
      role: "Coding Head",
      image: "images/Purab.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 11,
      name: "Rupal Debnath",
      role: "Coding Head",
      image: "images/Rupal.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 12,
      name: "Chandrima Ganguly",
      role: "Gaming Head",
      image: "images/Chandrima.jpeg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 13,
      name: "Sayan Maity",
      role: "Gaming Head",
      image: "images/Sayan.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 14,
      name: "Rajat Dey",
      role: "Non-Tech Head",
      image: "images/Rajat.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 15,
      name: "Qurratul Ann Irshad",
      role: "Non-Tech Head",
      image: "images/Qurrat.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 16,
      name: "Arghya Saha",
      role: "Non-Tech Head",
      image: "images/Arghya.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 17,
      name: "Rajanna Das",
      role: "Design Head",
      image: "images/Rajanna.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 18,
      name: "Debjit Bhar",
      role: "Design Head",
      image: "images/Debjit.png",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 19,
      name: "Shanta Das",
      role: "Design Head",
      image: "images/shanta.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 20,
      name: "Aryan Rauth",
      role: "Sponsor Head",
      image: "images/Arya.jpeg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 21,
      name: "Tuneer Mukherjee",
      role: "PR Head",
      image: "images/Tuneer.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 22,
      name: "Suprakash Saha",
      role: "PR Head",
      image: "images/Suprokash.jpg",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
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
}
