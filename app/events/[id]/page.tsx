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

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    if (!event?.rulebook) {
      console.error("No rulebook available for this event");
      return;
    }
    
    const link = document.createElement('a');
    link.href = event.rulebook;
    link.download = `${event.title.replace(/\s+/g, '_')}_Rulebook.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

 

  // Events data - in a real app, this would come from an API
  const events = [
    {
      id: 1,
      title: "Robo Combat (Weapon)",
      category: "Robotics",
      description:
        "Design a monster, not a machine — and let it feast on metal in the pit.",
      image: "../images/robo_combat.jpg?height=800&width=1000",
      rulebook: "/rulebooks/robo_combat.pdf",
      longDescription:
        "The Spider-Verse has seen its fair share of battles, but this time, it's mechanized! Design and control a combat robot to fight against other contenders in an intense arena battle.",
      date: "May 3-4",
      time: "10:00 AM - 7:00 PM",
      venue: "College Campus",
      team: "2-4 members",
      registration: "₹700",
      prizes: "1st: ₹12,000, 2nd: ₹8,000",
      featured: false,
      rules: [
        "Both active and passive weapons are permitted.",
        "A team can have a minimum of 2 and a maximum of 4 members.",
        "Total 3 mins of gameplay to score points.",
        "Weight of the Bot shall be 8 kg(wireless)",
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
      image: "../images/robo_kick.jpg?height=400&width=600",
      rulebook: "/rulebooks/robo_kick.pdf",
      longDescription:
        "Design a robot capable of powerful kicks and precision passes in this high-energy robotic soccer challenge. Only the best-engineered bot will claim victory!",
      date: "May 2-4",
      time: "10:00 AM - 7:00 PM",
      venue: "College Campus",
      team: "2-4 members",
      registration: "₹400 (re-entry: ₹250), TTT MEMBERS: ₹350 (re-entry: ₹150)",
      prizes: "1st: ₹6000, 2nd: ₹4000",
      featured: false,
      rules: [
        "A team can have 2 to 4 members.",
        "A team may comprise members from different colleges. No person shall be a member of multiple	teams.",
        "Robots are not allowed which are constructed using LEGO kits or its spare parts or any other readymade mechanism.",
        "Intentional Damage to the arena may lead to disqualification of the bot.",
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
      image: "../images/deathrace.jpg?height=400&width=600",
      rulebook: "/rulebooks/death_race.pdf",
      longDescription:
        "Speed through an intense track filled with obstacles and challenges. Only the fastest and most maneuverable robots will survive this high-stakes race through the Spider-Verse!",
      date: "May 2-4",
      time: "10:00 AM - 7:00 PM",
      venue: "College Campus",
      team: "2-4 members",
      registration: "₹400 (re-entry: ₹250), TTT MEMBERS: ₹300 (re-entry: ₹150)",
      prizes: "1st: ₹5000, 2nd: ₹3000, 3rd: ₹2000",
      featured: false,
      rules: [
        "The team should consist of 2 to 4 members.",
        "Weight should not exceed 3.0 kg.",
        "Voltage: Maximum 18 volts, 10 Amps. Above 18 Volts and 10 Amps will not be allowed.",
        "Unethical behaviour could lead to disqualification.",
        "Faculty coordinators have all the rights to take final decisions for any matter during the event .",
        "If the Robot moves or falls off track, then the Robot would be placed back on the previous position.",
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
      image: "/images/skyrocket.jpg?height=400&width=600",
      rulebook: "/rulebooks/sky_rocket.pdf",
      longDescription:
        "Compete in an exhilarating rocket-launching contest where height, accuracy, and design ingenuity matter. Will your rocket soar across dimensions?",
      date: "May 2-3",
      time: "10:00 AM - 5:00 PM",
      venue: "College Campus",
      team: "Maximum 4 members",
      registration: "₹150 (re-entry: ₹80)",
      prizes: "1st: ₹1500, 2nd: ₹1000, 3rd: ₹500",
      featured: false,
      rules: [
        "In this event, participants have to make a ROCKET using plastic soft drink bottles.",
        "The rocket’s weight should not exceed 2 kg (with water).",
        "Any metal or wood attachments should not be used while making the rocket.",
        "In order to build pressure inside the rocket, a hand pump is to be used. No other mechanical pump will be allowed.",
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
    //   prizes: "Surprise",
    //   featured: false,
    //   rules: [
    //     "Surprise event, waiting to be revealed",
    //   ],
    //   coordinators: [
    //     { name: "Dibyajyoti Jana", contact: "+91 81673 76966" },
    //   ],
    //   gallery: [
    //     "/placeholder.svg?height=400&width=600",
    //     "/placeholder.svg?height=400&width=600",
    //     "/placeholder.svg?height=400&width=600",
    //   ],
    // },
    {
      id: 6,
      title: "Web Slingers",
      category: "Coding",
      description:
        "Showcase your web development skills by creating innovative and responsive websites. Spin your web of code and design to capture the judges' attention.",
      image: "../images/web_slingers.jpg?height=400&width=600",
      rulebook: "/rulebooks/web-slingers.pdf",
      longDescription:
        "Dive into the multiverse of web development! In this challenge, participants will create a fully responsive website based on a theme revealed at the start of the competition. You'll have 24 hours to design, code, and deploy your creation. Judges will evaluate your work based on design aesthetics, code quality, responsiveness, and creative implementation of the theme. Bring your HTML, CSS, and JavaScript skills to swing through this challenge!",
      date: "May 2",
      time: "10:00 AM - 2:30 PM",
      venue: "College Campus",
      team: "2-3 members",
      registration: "₹120",
      prizes: "1st: ₹600, 2nd: ₹400",
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
      image: "../images/code_dimension.jpg?height=400&width=600",
      rulebook: "/rulebooks/code-dimension.pdf",
      longDescription:
        "Enter a dimension where algorithms reign supreme! Code Dimension is an intense competitive coding contest where participants will face increasingly difficult programming challenges across multiple rounds. Each round represents a different dimension with unique problem-solving requirements. From time complexity optimization to space-efficient solutions, you'll need to adapt quickly to survive each dimension. Only the most versatile coders will make it to the final round!",
      date: "May 2-3",
      time: "12:00 PM - 2:00 PM",
      venue: "College Campus",
      team: "Individual",
      registration: "₹80",
      prizes: "1st: ₹500, 2nd: ₹300",
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
      image: "/images/ctf.jpg?height=400&width=600",
      rulebook: "/rulebooks/ctf-verse.pdf",
      longDescription:
        "The multiverse is under attack! A sinister cyber-villain is tampering with digital dimensions, leaving cryptic clues across cyberspace. As a cyber-Spidey, your mission is to track down vulnerabilities, decrypt codes, and recover lost data before chaos consumes the Spider-Verse. Do you have what it takes to web your way to victory?",
      date: "May 4",
      time: "10:00 AM - 01:00 PM",
      venue: "College Campus",
      team: "1-2 Members",
      registration: "₹80",
      prizes: "1st: ₹500, 2nd: ₹300",
      featured: true,
      rules: [
        "Jeopardy style Capture The Flag event",
        "Attacking the server or the infrastructure is strictly prohibited and will result in disqualification.",
        "Injecting malware in provided infrastructure will result in disqualification and permanent ban from tech events.",
        "Players are allowed to use internet to find their solutions.",
        "Use of heavily automated tools are prohibited.",
        "Stealing flags from other’s team will result in disqualification.",
        "Looking and copying from other’s team will result in disqualification.",
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
      image: "/events/bgmi.jpg",
      rulebook: "/rulebooks/bgmi.pdf",
      longDescription:
        "In an alternate dimension, chaos reigns, and only the strongest Spideys will survive! Join the ultimate battle royale where precision, teamwork, and strategy determine who swings to victory. Will you emerge as the last Spidey standing, or will you be lost in the collapsing multiverse?",
      date: "May 2",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "BR: ₹200 (TTT - ₹160) | TDM: Game Card",
      prizes: "BR: ₹6000 | TDM: Game Card",
      featured: false,
      rules: [
        "BGMI BR:",
        "The complete event will be in online mode.",
        "Prelims will be hosted on the first day of the event i.e. 2TH MAY 2025. Finals will be hosted on 3RD MAY 2025.",
        "All the teams will be divided into two groups, both groups will play two matches each in the Prelims.",
        "After the end of two matches for both the groups, the points of each team will be calculated on the basis of global BGMI tournament rules.",
        "BGMI TDM:",
        "The matches will be played offline/online during UNITRON ’25 i.e., on 2ND ,3RD and 4TH MAY 2025.",
        "It will be played as Team vs. Team, Team Death Match.",
        "The winning team will be awarded with the prize money.",
        "The first team who reaches the score of 40 wins the match.",
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
      image: "/events/freefire.jpg",
      rulebook: "/rulebooks/free_fire.pdf",
      longDescription:
        "The Spider-Verse is under siege, and only the fastest, smartest, and most agile warriors can defend it! In this high-speed survival showdown, dodge enemy fire, swing into action, and prove your supremacy in an epic Free Fire tournament.",
      date: "May 3",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "BR: ₹200 (TTT - ₹160) | TDM: Game Card",
      prizes: "BR: ₹4000 | TDM: Game Card",
      featured: false,
      rules: [
        "Free Fire BR:",
        "The complete event will be in online mode.",
        "Prelims will be hosted on the first day of the event i.e. 2ND MAY 2025. Finals will be hosted on 3RD MAY 2025.",
        "After the end of two matches for both the groups, the points of each team will be calculated on the basis of global FREE-FIRE tournament rules.",
        "The Finals will be played among top 16 teams (8+8) taken from both groups and it will consist of three matches.",
        "Free Fire TDM:",
        "After that both teams start to fight using the weapons they bought or acquired by killing the players from the other team.",
        "When all four players of a team are dead, the other team wins that round.",
        " If a player dies then he loses his weapons and items but if he stays alive, he gets to keep his items in the next round.",
        "Use of gun skins and character skills are not allowed.",
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
      image: "/events/callofduty.jpg",
      rulebook: "/rulebooks/codm.pdf",
      longDescription:
        "When villains from multiple dimensions join forces, it's up to you to stop them! Enter an intense Call of Duty showdown where strategy, precision, and web-enhanced reflexes are key. Whether in deathmatch, search and destroy, or battle royale, every shot counts in this war for the multiverse.",
      date: "May 4",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "Game Card",
      prizes: "Game Card",
      featured: false,
      rules: [
        "The matches will be played offline during UNiTRON ’25 i.e., on 2ND ,3RD and 4TH MAY 2025.",
        "It will be played as Team vs. Team, Team Death Match.",
        "The first team who reaches the score of 50 wins the match.",
        "No limitations in use of any type of weapon during the match.",
        "Use of external equipment like triggers are prohibited.",
        "In case of any dispute, the organizers decision is termed as final.",
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
      image: "/events/fifa.jpg",
      rulebook: "/rulebooks/fifa.pdf",
      longDescription:
        "Football isn't just a game—it's a battle across dimensions! Lace up and take control of your team as you dribble past defenders, curve the ball like a web-line, and strike powerful goals in a FIFA Mobile tournament where champions are made.",
      date: "May 2",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "1v1: Game Card | Tournament: ₹50",
      prizes: "1v1: Game Card | Tournament: ₹1000",
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
      image: "/events/pes.jpg",
      rulebook: "/rulebooks/pes.pdf",
      longDescription:
        "In this dimension, football has a Spider-Man twist! Experience precision gameplay and show off your dribbling skills as you face off against the best PES players. Will your team weave the perfect web of passes to victory?",
      date: "May 3",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "₹200 (TTT - ₹160)",
      prizes: "₹6000",
      featured: false,
      rules: [
        "The matches will be using in-game online features where one player can play against another (Friend Match).",
        "All the matches will be in Knock out format.",
        "Each winner will play another in the next round, until the final match-up, whose winner becomes the tournament champion and the loser of each match-up is immediately eliminated from the tournament.",
        "If any match ends up in a draw, further match will be decided in penalty shootout.",
        "The duration of the match will be 10 minutes.",
        "The player account should not have any kind of online match ban.",
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
      image: "/events/valorant.jpg",
      rulebook: "/rulebooks/valorant.pdf",
      longDescription:
        "The villains of the Spider-Verse are infiltrating every reality! As elite agents, you and your team must take them down using strategy, precise shots, and lightning-fast reflexes. Every round is a battle for survival—make every ability count!",
      date: "May 4",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "₹200 (TTT - ₹160)",
      prizes: "₹6000",
      featured: false,
      rules: [
        "All the matches will be played on the Technical Fest dates i.e. 19th and 20th April 2024.",
        "Prelims will be played on 2ND in online mode.",
        "Semis and finals will be hosted on 3RD in LAN mode.",
        "The captain of each team must check in for their match 15 minutes before their scheduled match time. Failure to do so could result in losing “in-game pause time” or disqualification.",
        "Any team that checks in on time but fails to join the lobby more than 10 minutes after the scheduled start time, will be disqualified.",
        "Tournament Mode: On Overtime: On Server Region: Mumbai",
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
      image: "/events/asphalt8.jpg",
      rulebook: "/rulebooks/asphalt8.pdf",
      longDescription:
        "When different dimensions collide, only the fastest racers can navigate the chaos! Blaze through impossible tracks, pull off gravity-defying stunts, and cross the finish line in an adrenaline-fueled race through the Spider-Verse.",
      date: "May 2",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "Game Card",
      prizes: "Game Card",
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
      image: "/events/uno.png",
      rulebook: "/rulebooks/uno.pdf",
      longDescription:
        "When Spidey's friends and foes gather around a table, expect chaos! Skip turns, reverse fates, and unleash the dreaded '+4' as you battle to be the ultimate Uno champion. Every move might just open a new dimension!",
      date: "May 3",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "Game Card",
      prizes: "Game Card",
      featured: false,
      rules: [
        "The game will consist of four players having 5 or 7 cards.",
        "A player will have to match the number or the colour of the card.",
        "The one who gets rid of all the cards wins the game.",
        "Stacking +2 over +2, +4 over +4 and +4 over +2 will be allowed but not +2 over +4.",
        "Skip, reverse, wild card rules remains unchanged.",
        "In case of any dispute, the organizers decision will be final.",
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
      image: "/events/8-ball-pool.avif",
      rulebook: "/rulebooks/pool.pdf",
      longDescription:
        "Spider-Man's agility isn't just for swinging—it's for pool too! Test your angles, master trick shots, and outplay your rivals in a thrilling 8 Ball Pool tournament where the best cue artists reign supreme.",
      date: "May 4",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "Game Card",
      prizes: "Game Card",
      featured: false,
      rules: [
        "The matches will be using in-game online features where one player can play against another (Friend Match).",
        "Eight Ball is a call shot game played with a cue ball and fifteen object balls,numbered 1 through 15. One player must pocket balls of the group numbered 1 through 7 (solid colors), while the other player has 9 thru 15 (stripes).",
        "The player pocketing his group first and then legally pocketing the 8-ball wins the game.",
        "If the ongoing match disconnects, the match will be replayed but the player with the upper hand in the last match will get an advantage.",
        "If any kind of disputes occur with the coordinator, we take the final decision.",
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
      image: "/events/subway.png",
      rulebook: "/rulebooks/subway.pdf",
      longDescription:
        "In a world where reality keeps shifting, the only way to survive is to keep running! Dash across iconic Subway Surfers maps with Spidey speed, avoiding obstacles and collecting power-ups to stay ahead of the chase.",
      date: "May 2",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "Game Card",
      prizes: "Game Card",
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
      image: "/events/carnival2.avif",
      rulebook: "/rulebooks/fiesta.pdf",
      longDescription:
        "Step into a world where the Spider-Verse comes to life! From thrilling games to themed attractions, experience a carnival filled with Spidey-themed adventures, food, and entertainment. Get ready for an unforgettable fiesta!",
      date: "May 2-3",
      time: "11:00 AM - 5:00 PM",
      venue: "College Campus",
      team: "On Spot",
      registration: "On spot",
      prizes: "On spot",
      featured: false,
      rules: [
        "On spot",
      ],
      coordinators: [
        { name: "Qurratul Ann Irshad", contact: "+91 98755 92500" },
        { name: "Arghya Saha", contact: "+91 82406 50524" },
        { name: "Rajat Dey", contact: "+91 98748 55852" },
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
        "Secrets hide in plain sight—can you trace the unseen thread before it coils around you?",
      image: "/images/web-of-hints.jpg",
      rulebook: "/rulebooks/web_of_hints.pdf",
      longDescription:
        "Villains have stolen a priceless artifact, and only the sharpest minds can recover it! Follow a web of clues, crack riddles, and navigate through obstacles as you uncover the lost secrets of the Spider-Verse.",
      date: "May 2, May 4",
      time: ["Prelims: 02:30 PM - 4:00 PM", " Finals: 11:00 AM - 01:00 PM"],
      venue: "College Campus",
      team: "1-3 members",
      registration: "₹200 (TTT - ₹150)",
      prizes: "₹3000",
      featured: false,
      rules: [
        "Every team must have 4 members. Teams with fewer members will not be allowed to register.",
        "Registration is open in both online and offline modes.",
        "School students can participate with valid ID cards.",
        "Progress of the Prelims and Finals will be announced on-spot.",
        "Destruction of college property will result in immediate disqualification and penalty.",
        "Disruption of other events is not allowed.",
        "A list of items to be hunted will be provided.",
        "Items may be hidden anywhere on the college campus.",
      ],
      coordinators: [
        { name: "Qurratul Ann Irshad", contact: "+91 98755 92500" },
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
        "One path. Countless obstacles. Only those who leap with heart will land in victory.",
      image: "/events/leapoffaith.jpg",
      rulebook: "/rulebooks/leap_of_faith.pdf",
      longDescription:
        "Just like Miles Morales had to take a leap of faith, you must conquer a series of hurdles to prove your skills! Run, jump, and swing past obstacles in this exciting physical challenge that tests your agility and endurance.",
      date: "May 3-4",
      time: ["Prelims: 12:00 PM - 2:00 PM", " Finals: 03:00 PM - 04:30 PM"],
      venue: "College Campus",
      team: "1-3 members",
      registration: "₹150",
      prizes: "₹1000",
      featured: false,
      rules: [
        "Each team must consist of 3 members.",
        "Registration is open in both online and offline modes.",
        "The race includes theme-based quiz checkpoints inspired by Unitron 25.",
        "Team’s total time is the sum of all 3 members' individual times.",
        "In case of a tie, a sudden death buzzer quiz will be used.",
        "Event coordinators’ decisions are final.",
      ],
      coordinators: [
        { name: "Arghya Saha", contact: "+91 82406 50524" },
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
        "Freeze moments that even Spidey would stop swinging to admire—shoot your shot, web-head.",
      image: "/events/spidey's-lens.jpg",
      rulebook: "/rulebooks/spidey's_lens.pdf",
      longDescription:
        "Channel your inner Peter Parker and snap breathtaking shots that tell a story! Whether it's action-packed moments or deep emotions, showcase your skills in a photography contest that celebrates creativity and vision.",
      date: "May 2-4",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "₹30",
      prizes: "Trophy",
      featured: false,
      rules: [
        "Participants can submit photographs on any theme.",
        "Submissions must be original. Plagiarism will lead to disqualification.",
        "File size must be between 500KB and 10MB.",
        "Both colored and monochrome photos are accepted.",
        "Coordinators' decision is final.",
        "Cheating or misbehaviour will lead to disqualification.",
      ],
      coordinators: [
        { name: "Arghya Saha", contact: "+91 82406 50524" },
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
        "Weave color into chaos—where your brush becomes the web, and the canvas, your city.",
      image: "/images/canvas.jpg?height=400&width=600",
      rulebook: "/rulebooks/webbed_masterpiece.pdf",
      longDescription:
        "The multiverse is full of colors, styles, and unique Spider-heroes. Use your artistic talent to create a masterpiece that captures the essence of the Spider-Verse in this vibrant art event!",
      date: "May 2-4",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "No Fees",
      prizes: "Trophy",
      featured: false,
      rules: [
        "Participants must register online.",
        "Artwork must be signed by hand on the sheet/canvas.",
        "Only basic edits to scanned versions allowed.",
        "File size must be between 500KB and 10MB.",
        "Minimum artwork size is A4 or larger.",
        "Cheating or misbehaviour will result in disqualification.",
      ],
      coordinators: [
        { name: "Qurratul Ann Irshad", contact: "+91 98755 92500" },
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
        "When gravity challenges you, can your design stand tall—or will it snap like a loose thread?",
      image: "/events/stickyweb.jpg",
      rulebook: "/rulebooks/sticky_web.pdf",
      longDescription:
        "Peter Parker built web bridges to escape danger—now it's your turn! Design and construct a bridge using limited materials, ensuring stability and strength in this thrilling engineering challenge.",
      date: "May 2-4",
      time: "10:00 AM - 8:00 PM",
      venue: "College Campus",
      team: "1-3 members",
      registration: "Game Card",
      prizes: "Game Card",
      featured: false,
      rules: [
        "Participants can register both online and offline.",
        "No external materials or tools allowed.",
        "Fixed number of sticks and a time limit of 1 hour.",
        "Bridges are tested for load-bearing capacity and structural stability.",
        "Incomplete bridges (not spanning the gap) will be disqualified.",
        "Tampering with others’ structures or misbehaviour leads to disqualification.",
      ],
      coordinators: [
        { name: "Rajat Dey", contact: "+91 98748 55852" },
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 25,
      title: "Quantum Web Quiz",
      category: "Non-Tech",
      description:
        "The web tests minds, not muscles—enter if your brain’s wired for war.",
      image: "/images/quantum.jpg?height=400&width=600",
      rulebook: "/rulebooks/quantum.pdf",
      longDescription:
        "Think you have the intellect of Peter Parker? Test your knowledge of technology, science, and the Spider-Verse in this electrifying quiz where only the wittiest web-heads prevail!",
      date: "May 2-3",
      time: ["Prelims: 12:30 PM - 02:00 PM", "Finals: 10:00 AM - 11:30 AM"],
      venue: "College Campus",
      team: "1-3 members",
      registration: "₹160 (TTT - ₹100)",
      prizes: "Trophy",
      featured: false,
      rules: [
        "Every team must have 4 members. Teams with fewer members will not be allowed to register.",
        "School students are allowed with valid ID cards.",
        "Progress of the event will be explained by the quizmaster on the event day.",
        "Each participant must carry their college ID card.",
        "The decision of event coordinators is final.",
        "Cheating or misbehaving will result in disqualification.",
      ],
      coordinators: [
        { name: "Qurratul Ann Irshad", contact: "+91 98755 92500" },
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
            <div className="relative aspect-[23/11]">
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
                <div className="relative z-10">
                  <h2 className="mb-4 text-2xl font-bold text-spider-red font-comic">ABOUT THE EVENT</h2>
                  <p className="text-white">{event.longDescription}</p>
                </div>
              </div>

              <div className="p-6 mb-8 bg-spider-dark-blue/20 rounded-lg comic-panel">
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

              {/* <div className="p-6 mb-8 bg-spider-dark-blue/20 rounded-lg comic-panel"> */}
                {/* <div className="relative z-10"> */}
                  {/* <h2 className="mb-4 text-2xl font-bold text-spider-red font-comic">GALLERY</h2> */}
                  {/* <div className="grid grid-cols-3 gap-4"> */}
                    {/* {event.gallery.map((image: string, index: number) => (
                      <div key={index} className="relative overflow-hidden rounded-lg aspect-square">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${event.title} - Image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    ))} */}
                  {/* </div> */}
                {/* </div> */}
              {/* </div> */}

              <div className="p-6 bg-spider-dark-blue/20 rounded-lg comic-panel">
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
                          <h3 className="text-sm font-medium text-white">Registration Fees</h3>
                          <p className="text-white">{event.registration}</p>
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
                  <button 
                    className="w-full px-4 py-2 font-bold text-spider-red bg-white rounded-md hover:bg-gray-100 transition-colors" 
                    onClick={handleDownloadPDF}
                  >
                    Download
                  </button>
                </div>

                <div className="p-6 bg-spider-dark-blue/20 rounded-lg comic-panel">
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
          > Related Events
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




