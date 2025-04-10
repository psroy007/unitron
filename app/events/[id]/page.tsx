"use client"
import { jsPDF } from "jspdf"
import React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Trophy, Share2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import GlitchEffect from "@/components/glitch-effect"
import WebEffect from "@/components/web-effect"

const generatePDF = (event: any) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text(event.title, 10, 20);

  doc.setFontSize(12);
  doc.text(`Category: ${event.category}`, 10, 30);
  doc.text(`Date: ${event.date}`, 10, 40);
  doc.text(`Time: ${event.time}`, 10, 50);
  doc.text(`Venue: ${event.venue}`, 10, 60);
  doc.text(`Team: ${event.team}`, 10, 70);
  doc.text(`Prizes: ${event.prizes}`, 10, 80);

  doc.setFont('font-comic', 'bold');
  doc.text("Description:", 10, 95);
  doc.setFont('font-comic', 'normal');
  doc.text(doc.splitTextToSize(event.description, 180), 10, 105);

  doc.setFont('font-comic', 'bold');
  doc.text("Long Description:", 10, 125);
  doc.setFont('font-comic', 'normal');
  doc.text(doc.splitTextToSize(event.longDescription, 180), 10, 135);

  doc.setFont('font-comic', 'bold');
  doc.text("Rules:", 10, 165);
  doc.setFont('font-comic', 'normal');
  event.rules.forEach((rule: string, index: number) => {
    doc.text(`• ${rule}`, 10, 175 + index * 7);
  });

  const coordStartY = 175 + event.rules.length * 7 + 10;
  doc.setFont('font-comic', 'bold');
  doc.text("Coordinators:", 10, coordStartY);

  doc.setFont('font-comic', 'normal');
  event.coordinators.forEach((coordinator: any, index: number) => {
    doc.text(
      `${coordinator.name} - ${coordinator.contact}`,
      10,
      coordStartY + 10 + index * 7
    );
  });

  doc.save(`${event.title.replace(/\s+/g, '_')}_Rulebook.pdf`);
};

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Events data - in a real app, this would come from an API
  const events = [
    {
      id: 1,
      title: "Robo Combat (Weapon)",
      category: "Robotics",
      description:
        "Battle it out in an epic robo showdown—only the strongest bot wins!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "The Spider-Verse has seen its fair share of battles, but this time, it's mechanized! Design and control a combat robot to fight against other contenders in an intense arena battle.",
      date: "March 17",
      time: "11:00 AM - 7:00 PM",
      venue: "Immersive Experience Lab",
      team: "2-3 members",
      prizes: "₹18,000 + VR Equipment",
      featured: false,
      rules: [
        "Teams must have 2-3 members.",
        "Participants can choose to develop for AR, VR, or MR platforms.",
        "Development kits and testing devices will be provided.",
        "Teams must create a working prototype during the event.",
        "Pre-built assets are allowed, but the core experience must be created during the event.",
        "Projects will be judged on innovation, user experience, and technical implementation.",
      ],
      coordinators: [
        { name: "Debayan Saha", contact: "+91 86172 62208" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 2,
      title: "Robo Kick",
      category: "Robotics",
      description:
        "A high-tech soccer match where robots score like Spidey swings!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Design a robot capable of powerful kicks and precision passes in this high-energy robotic soccer challenge. Only the best-engineered bot will claim victory!",
      date: "March 15-16",
      time: "9:00 AM - 6:00 PM",
      venue: "Hardware Innovation Lab",
      team: "3-4 members",
      prizes: "₹22,000 + Development Kits",
      featured: false,
      rules: [
        "Teams must have 3-4 members.",
        "Hardware components will be provided, but teams can bring their own as well.",
        "Projects must address one of the challenge areas: smart homes, healthcare, agriculture, or urban infrastructure.",
        "Teams must build a working prototype during the event.",
        "Solutions will be judged on innovation, functionality, scalability, and potential impact.",
        "All prototypes must be demonstrated to the judges at the end of the hackathon.",
      ],
      coordinators: [
        { name: "Soumojit Hazra", contact: "+91 86974 64829" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 3,
      title: "Death Race",
      category: "Robotics",
      description:
        "Build the fastest bot and race to victory through dangerous twists and turns!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Speed through an intense track filled with obstacles and challenges. Only the fastest and most maneuverable robots will survive this high-stakes race through the Spider-Verse!",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Snehasish Das", contact: "+91 62900 87607" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 4,
      title: "Sky Rocket",
      category: "Robotics",
      description:
        "Build a rocket and launch it high—just like Spidey's web swings!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Compete in an exhilarating rocket-launching contest where height, accuracy, and design ingenuity matter. Will your rocket soar across dimensions?",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Dibyajyoti Jana", contact: "+91 81673 76966" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 5,
      title: "Robo Maze, Robo Carrom",
      category: "Robotics",
      description:
        "Navigate, strategize, and let your robots solve puzzles like Spidey himself!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Test your bot's AI and engineering as it navigates through intricate mazes and carrom-style challenges. It's a true test of robotics and problem-solving skills!",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Felicia Hardy", contact: "+91 98765 43220" },
        { name: "Eddie Brock", contact: "+91 98765 43221" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 6,
      title: "Web Slingers",
      category: "Coding",
      description:
        "Showcase your web development skills by creating innovative and responsive websites. Spin your web of code and design to capture the judges' attention.",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Dive into the multiverse of web development! In this challenge, participants will create a fully responsive website based on a theme revealed at the start of the competition. You'll have 24 hours to design, code, and deploy your creation. Judges will evaluate your work based on design aesthetics, code quality, responsiveness, and creative implementation of the theme. Bring your HTML, CSS, and JavaScript skills to swing through this challenge!",
      date: "March 16",
      time: "10:00 AM - 10:00 AM (next day)",
      venue: "Tech Lab Alpha",
      team: "2-3 members",
      prizes: "₹20,000 + Internship Opportunities",
      featured: true,
      rules: [
        "All team members must be registered participants of Unitron 2025.",
        "The theme will be revealed at the start of the competition.",
        "Participants must create a website from scratch during the event.",
        "Pre-built templates or frameworks are allowed, but all customization must be done during the event.",
        "The website must be responsive and work on multiple devices.",
        "Submission includes source code and a deployed version of the website.",
      ],
      coordinators: [
        { name: "Purab Singha Roy", contact: "+91 80170 30145" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 7,
      title: "Code Dimension",
      category: "Coding",
      description:
        "Navigate through multiple dimensions of coding challenges. Solve complex problems with efficient algorithms and prove your coding prowess.",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Enter a dimension where algorithms reign supreme! Code Dimension is an intense competitive coding contest where participants will face increasingly difficult programming challenges across multiple rounds. Each round represents a different dimension with unique problem-solving requirements. From time complexity optimization to space-efficient solutions, you'll need to adapt quickly to survive each dimension. Only the most versatile coders will make it to the final round!",
      date: "March 15",
      time: "2:00 PM - 6:00 PM",
      venue: "Quantum Computing Center",
      team: "Individual",
      prizes: "₹15,000 + Premium Subscriptions",
      featured: true,
      rules: [
        "This is an individual competition.",
        "The contest will have three rounds of increasing difficulty.",
        "Each round will have a time limit for solving the problems.",
        "Participants will be judged based on correctness, efficiency, and time taken.",
        "Any form of plagiarism will result in immediate disqualification.",
        "Programming languages allowed: C, C++, Java, Python.",
      ],
      coordinators: [
        { name: "Purab Singha Roy", contact: "+91 80170 30145" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 8,
      title: "CTF-Verse",
      category: "Coding",
      description:
        "Hackers from the Spider-Verse are breaching realities! Use your cyber skills to crack codes, decrypt messages, and outsmart villains in this ultimate Capture the Flag challenge. Only the smartest web-heads can restore balance!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "The multiverse is under attack! A sinister cyber-villain is tampering with digital dimensions, leaving cryptic clues across cyberspace. As a cyber-Spidey, your mission is to track down vulnerabilities, decrypt codes, and recover lost data before chaos consumes the Spider-Verse. Do you have what it takes to web your way to victory?",
      date: "March 16-17",
      time: "9:00 AM - 5:00 PM",
      venue: "AI Research Wing",
      team: "Individual",
      prizes: "₹25,000 + Cloud Credits",
      featured: true,
      rules: [
        "Teams must have 2-4 members.",
        "Problem statements and datasets will be provided at the start of the event.",
        "Participants can use any programming language or framework for their solution.",
        "Pre-trained models are allowed, but all fine-tuning must be done during the event.",
        "Teams must present their solution to the judges at the end of the hackathon.",
        "Solutions will be judged on accuracy, innovation, and adaptability.",
      ],
      coordinators: [
        { name: "Rupal Debnath", contact: "+91 90071 80468" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 9,
      title: "BGMI",
      category: "Gaming",
      description:
        "Gear up, squad up, and drop into the battleground as you fight to save—or conquer—the multiverse!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "In an alternate dimension, chaos reigns, and only the strongest Spideys will survive! Join the ultimate battle royale where precision, teamwork, and strategy determine who swings to victory. Will you emerge as the last Spidey standing, or will you be lost in the collapsing multiverse?",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Sayan Maity", contact: "+91 85838 17241" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 10,
      title: "Free Fire",
      category: "Gaming",
      description:
        "Quick reflexes and web-slinging tactics will decide the fate of the battle—are you ready?",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "The Spider-Verse is under siege, and only the fastest, smartest, and most agile warriors can defend it! In this high-speed survival showdown, dodge enemy fire, swing into action, and prove your supremacy in an epic Free Fire tournament.",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Chandrima Ganguly", contact: "+91 62916 46552" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 11,
      title: "Call of Duty",
      category: "Gaming",
      description:
        "Suit up, grab your gear, and take down the threats lurking in the Spider-Verse!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "When villains from multiple dimensions join forces, it's up to you to stop them! Enter an intense Call of Duty showdown where strategy, precision, and web-enhanced reflexes are key. Whether in deathmatch, search and destroy, or battle royale, every shot counts in this war for the multiverse.",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Chandrima Ganguly", contact: "+91 62916 46552" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 12,
      title: "FIFA Mobile",
      category: "Gaming",
      description:
        "A multiversal football tournament where Spidey skills meet insane goals!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Football isn't just a game—it's a battle across dimensions! Lace up and take control of your team as you dribble past defenders, curve the ball like a web-line, and strike powerful goals in a FIFA Mobile tournament where champions are made.",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Sayan Maity", contact: "+91 85838 17241" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 13,
      title: "PES",
      category: "Gaming",
      description:
        "Master the perfect web-assisted passes and outplay your rivals!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "In this dimension, football has a Spider-Man twist! Experience precision gameplay and show off your dribbling skills as you face off against the best PES players. Will your team weave the perfect web of passes to victory?",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Sayan Maity", contact: "+91 85838 17241" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 14,
      title: "Valorant",
      category: "Gaming",
      description:
        "Stealth, precision, and Spidey senses—only the best agents survive.",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "The villains of the Spider-Verse are infiltrating every reality! As elite agents, you and your team must take them down using strategy, precise shots, and lightning-fast reflexes. Every round is a battle for survival—make every ability count!",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Chandrima Ganguly", contact: "+91 62916 46552" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 15,
      title: "Asphalt 8",
      category: "Gaming",
      description:
        "Nitro boost your way through the multiverse—because Spidey swings fast, but you drive faster!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "When different dimensions collide, only the fastest racers can navigate the chaos! Blaze through impossible tracks, pull off gravity-defying stunts, and cross the finish line in an adrenaline-fueled race through the Spider-Verse.",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Sayan Maity", contact: "+91 85838 17241" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 16,
      title: "Uno",
      category: "Gaming",
      description:
        "A simple card game? Think again—across the Spider-Verse, anything can happen!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "When Spidey's friends and foes gather around a table, expect chaos! Skip turns, reverse fates, and unleash the dreaded '+4' as you battle to be the ultimate Uno champion. Every move might just open a new dimension!",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Chandrima Ganguly", contact: "+91 62916 46552" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 17,
      title: "8 Ball Pool",
      category: "Gaming",
      description:
        "Aim, shoot, and pocket balls with Spidey precision!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Spider-Man's agility isn't just for swinging—it's for pool too! Test your angles, master trick shots, and outplay your rivals in a thrilling 8 Ball Pool tournament where the best cue artists reign supreme.",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Sayan Maity", contact: "+91 85838 17241" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 18,
      title: "Subway Surfers",
      category: "Gaming",
      description:
        "Dodge, jump, and slide through an endless chase in the multiverse!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "In a world where reality keeps shifting, the only way to survive is to keep running! Dash across iconic Subway Surfers maps with Spidey speed, avoiding obstacles and collecting power-ups to stay ahead of the chase.",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Sayan Maity", contact: "+91 85838 17241" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 19,
      title: "Spidey-Fiesta",
      category: "Non-Tech",
      description:
        "A multiversal carnival packed with fun, games, and web-slinging surprises!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Step into a world where the Spider-Verse comes to life! From thrilling games to themed attractions, experience a carnival filled with Spidey-themed adventures, food, and entertainment. Get ready for an unforgettable fiesta!",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Felicia Hardy", contact: "+91 98765 43220" },
        { name: "Eddie Brock", contact: "+91 98765 43221" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 20,
      title: "Web of Hints",
      category: "Non-Tech",
      description:
        "Solve cryptic clues, swing past obstacles, and find the hidden treasure!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Villains have stolen a priceless artifact, and only the sharpest minds can recover it! Follow a web of clues, crack riddles, and navigate through obstacles as you uncover the lost secrets of the Spider-Verse.",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Felicia Hardy", contact: "+91 98765 43220" },
        { name: "Eddie Brock", contact: "+91 98765 43221" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 21,
      title: "Leap of Faith",
      category: "Non-Tech",
      description:
        "Push your limits and overcome every obstacle in this ultimate Spidey challenge!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Just like Miles Morales had to take a leap of faith, you must conquer a series of hurdles to prove your skills! Run, jump, and swing past obstacles in this exciting physical challenge that tests your agility and endurance.",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Felicia Hardy", contact: "+91 98765 43220" },
        { name: "Eddie Brock", contact: "+91 98765 43221" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 22,
      title: "Spidey's Lens",
      category: "Non-Tech",
      description:
        "Capture the multiverse through the eyes of a true Spidey-photographer!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Channel your inner Peter Parker and snap breathtaking shots that tell a story! Whether it's action-packed moments or deep emotions, showcase your skills in a photography contest that celebrates creativity and vision.",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Felicia Hardy", contact: "+91 98765 43220" },
        { name: "Eddie Brock", contact: "+91 98765 43221" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 23,
      title: "Webbed Masterpiece",
      category: "Non-Tech",
      description:
        "Paint, sketch, and bring the Spider-Verse to life with your creativity!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "The multiverse is full of colors, styles, and unique Spider-heroes. Use your artistic talent to create a masterpiece that captures the essence of the Spider-Verse in this vibrant art event!",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Felicia Hardy", contact: "+91 98765 43220" },
        { name: "Eddie Brock", contact: "+91 98765 43221" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 24,
      title: "Sticky Webs",
      category: "Non-Tech",
      description:
        "Engineer a web-strong bridge that can withstand any challenge!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Peter Parker built web bridges to escape danger—now it's your turn! Design and construct a bridge using limited materials, ensuring stability and strength in this thrilling engineering challenge.",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Felicia Hardy", contact: "+91 98765 43220" },
        { name: "Eddie Brock", contact: "+91 98765 43221" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 25,
      title: "Web of Wits",
      category: "Non-Tech",
      description:
        "Only the smartest Spideys can crack this web of tech questions!",
      image: "/placeholder.svg?height=400&width=600",
      longDescription:
        "Think you have the intellect of Peter Parker? Test your knowledge of technology, science, and the Spider-Verse in this electrifying quiz where only the wittiest web-heads prevail!",
      date: "March 17",
      time: "10:00 AM - 8:00 PM",
      venue: "Secure Operations Center",
      team: "1-3 members",
      prizes: "₹20,000 + Security Certifications",
      featured: false,
      rules: [
        "Participants can compete individually or in teams of up to 3 members.",
        "The CTF will include challenges in cryptography, web exploitation, reverse engineering, and network security.",
        "Points will be awarded based on the difficulty of the challenges solved.",
        "Hints will be available, but using them will reduce the points earned for that challenge.",
        "Any attempt to attack the CTF infrastructure or other teams will result in disqualification.",
        "The team with the most points at the end of the competition wins.",
      ],
      coordinators: [
        { name: "Felicia Hardy", contact: "+91 98765 43220" },
        { name: "Eddie Brock", contact: "+91 98765 43221" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
  ]

  useEffect(() => {
    if (params.id) {
      // Find the event with the matching ID
      const eventId = Number.parseInt(params.id as string)
      const foundEvent = events.find((e) => e.id === eventId)

      if (foundEvent) {
        setEvent(foundEvent)
      } else {
        // Redirect to events page if event not found
        router.push("/events")
      }

      setLoading(false)
    }
  }, [params.id, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-spider-dark">
        <div className="w-16 h-16 border-4 border-spider-red rounded-full border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-spider-dark">
        <h1 className="text-2xl text-white">Event not found</h1>
        <Link href="/events" className="mt-4 text-spider-red hover:underline">
          Back to Events
        </Link>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-spider-dark">
      <WebEffect />

      {/* Header with back button */}
      <div className="fixed top-0 left-0 right-0 z-40 py-4 bg-spider-dark/90 backdrop-blur-md">
        <div className="container flex items-center px-4 mx-auto">
          <Link href="/events" className="flex items-center text-white hover:text-spider-red transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Events</span>
          </Link>
        </div>
      </div>

      <div className="container px-4 mx-auto pt-24 pb-20 font-comic">
        <div className="max-w-6xl mx-auto">
          {/* Event header */}
          <motion.div
            className="relative mb-8 overflow-hidden rounded-lg comic-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[21/9]">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-spider-dark via-spider-dark/70 to-transparent"></div>

              <div className="absolute top-4 left-4 px-3 py-1 text-sm font-bold text-white bg-spider-red rounded-md">
                {event.category}
              </div>

              {event.featured && (
                <div className="absolute top-4 right-4 px-3 py-1 text-sm font-bold text-white bg-spider-blue rounded-md">
                  Featured Event
                </div>
              )}

              <div className="absolute bottom-0 left-0 w-full p-6">
                <GlitchEffect intensity="medium">
                  <h1 className="text-3xl md:text-5xl font-bold text-white font-comic">{event.title}</h1>
                </GlitchEffect>
                <p className="mt-2 text-lg text-gray-300 max-w-3xl">{event.description}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Main content */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              
              <div className="p-6 mb-8 bg-spider-dark-blue/20 rounded-lg comic-panel">
                {/* <img
                  src="/spider_bg.png" // Replace with actual image path
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover md:object-fill"
                /> */}
                <div className="relative z-10">
                  <h2 className="mb-4 text-2xl font-bold text-spider-red font-comic">ABOUT THE EVENT</h2>
                  <p className="text-white">{event.longDescription}</p>
                </div>
              </div>

              <div className="p-6 mb-8 bg-spider-dark-blue/20 rounded-lg comic-panel">
                {/* <img
                  src="/spider_bg.png" // Replace with actual image path
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover md:object-fill"
                /> */}
                <div className="relative z-10">
                  <h2 className="mb-4 text-2xl font-bold text-spider-red font-comic">RULES & GUIDELINES</h2>
                  <ul className="space-y-2 text-white">
                    {event.rules.map((rule: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 mt-2 mr-2 bg-spider-red rounded-full"></span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 mb-8 bg-spider-dark-blue/20 rounded-lg comic-panel">
                {/* <img
                  src="/spider_bg.png" // Replace with actual image path
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover md:object-fill"
                /> */}
                <div className="relative z-10">
                  <h2 className="mb-4 text-2xl font-bold text-spider-red font-comic">GALLERY</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {event.gallery.map((image: string, index: number) => (
                      <div key={index} className="relative overflow-hidden rounded-lg aspect-square">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${event.title} - Image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-spider-dark-blue/20 rounded-lg comic-panel">
                {/* <img
                  src="/spider_bg.png" // Replace with actual image path
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover md:object-fill"
                /> */}
                <div className="relative z-10">
                  <h2 className="mb-4 text-2xl font-bold text-spider-red font-comic">EVENT COORDINATORS</h2>
                  <div className="space-y-4">
                    {event.coordinators.map((coordinator: any, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-10 h-10 mr-4 bg-spider-red rounded-full flex items-center justify-center text-white font-bold">
                          {coordinator.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white">{coordinator.name}</h3>
                          <p className="text-sm text-white">{coordinator.contact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="sticky top-24">
                <div className="p-6 mb-6 bg-spider-dark-blue/20 rounded-lg comic-panel">
                  {/* <img
                    src="/spider_bg_event.png" // Replace with actual image path
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover md:object-fill"
                  /> */}
                  <div className="relative z-10">
                    <h2 className="mb-4 text-xl font-bold text-spider-red font-comic">EVENT DETAILS</h2>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Calendar className="w-5 h-5 mt-1 mr-3 text-spider-red" />
                        <div>
                          <h3 className="text-sm font-medium text-white">Date</h3>
                          <p className="text-white">{event.date}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="w-5 h-5 mt-1 mr-3 text-spider-red" />
                        <div>
                          <h3 className="text-sm font-medium text-white">Time</h3>
                          <p className="text-white">{event.time}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 mt-1 mr-3 text-spider-red" />
                        <div>
                          <h3 className="text-sm font-medium text-white">Venue</h3>
                          <p className="text-white">{event.venue}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Users className="w-5 h-5 mt-1 mr-3 text-spider-red" />
                        <div>
                          <h3 className="text-sm font-medium text-white">Team Size</h3>
                          <p className="text-white">{event.team}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Trophy className="w-5 h-5 mt-1 mr-3 text-spider-red" />
                        <div>
                          <h3 className="text-sm font-medium text-white">Prizes</h3>
                          <p className="text-white">{event.prizes}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 mb-6 text-center bg-spider-red border-2 border-white rounded-lg">
                  <h3 className="mb-2 text-xl font-bold text-white font-comic">Download Rule Book</h3>
                  <button className="w-full px-4 py-2 font-bold text-spider-red bg-white rounded-md hover:bg-gray-100 transition-colors" onClick={() => generatePDF(event)}>
                    Download
                  </button>
                </div>

                <div className="p-6 bg-spider-dark-blue/20 rounded-lg comic-panel">
                  {/* <img
                    src="/spider_bg_event.png" // Replace with actual image path
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover md:object-fill"
                  /> */}
                  <div className="relative z-10">
                    <h3 className="mb-4 text-xl font-bold text-spider-red font-comic">SHARE</h3>
                    <div className="flex justify-center mt-12 space-x-6">
                      <a
                        href="https://www.facebook.com/unitron.fit"
                        target="_blank"
                        className="flex items-center justify-center w-12 h-12 transition-transform bg-spider-red rounded-full hover:scale-110"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center w-12 h-12 transition-transform bg-spider-blue rounded-full hover:scale-110"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      </a>
                      <a
                        href="https://www.instagram.com/unitron.fit/"
                        target="_blank"
                        className="flex items-center justify-center w-12 h-12 transition-transform bg-spider-red rounded-full hover:scale-110"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related events */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="grid gap-6 md:grid-cols-3">
              {events
                .filter((e) => e.id !== event.id && e.category === event.category)
                .slice(0, 3)
                .map((relatedEvent) => (
                  <Link href={`/events/${relatedEvent.id}`} key={relatedEvent.id}>
                    <div className="relative overflow-hidden transition-all duration-300 bg-spider-dark-blue/20 rounded-lg comic-panel h-full">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={relatedEvent.image || "/placeholder.svg"}
                          alt={relatedEvent.title}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-spider-dark to-transparent"></div>
                        <div className="absolute top-0 left-0 px-3 py-1 text-xs font-bold text-white bg-spider-red">
                          {relatedEvent.category}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="mb-2 text-xl font-bold text-white font-comic">{relatedEvent.title}</h3>
                        <p className="text-sm text-gray-300 line-clamp-2">{relatedEvent.description}</p>

                        <div className="flex items-center justify-between mt-4">
                          <span className="text-sm font-medium text-spider-blue">View Details</span>
                          <span className="px-3 py-1 text-xs font-medium text-white bg-spider-dark rounded-full">
                            {relatedEvent.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

