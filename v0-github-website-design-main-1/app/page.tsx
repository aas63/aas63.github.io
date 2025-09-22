"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

// 3D Cube Component
const FloatingCube = ({
  delay = 0,
  size = "md",
  position,
}: {
  delay?: number
  size?: "sm" | "md" | "lg"
  position: { x: number; y: number }
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div
      className={`absolute ${sizeClasses[size]} animate-float-3d`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${delay}s`,
        transform: "translateZ(0)",
      }}
    >
      <div className="w-full h-full bg-gradient-to-br from-rose-300 to-rose-400 rounded-lg shadow-lg transform-gpu hover:scale-110 transition-transform duration-300 cube-3d">
        <div className="w-full h-full bg-gradient-to-t from-rose-400/80 to-rose-300/80 rounded-lg"></div>
      </div>
    </div>
  )
}

// Time Component
const LocalTime = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Denver", // Mountain Time (UTC-6/7)
    })
  }

  return (
    <div className="space-y-1">
      <div className="text-xs text-gray-400 font-mono tracking-wider">LOCAL TIME (UTC-6:00)</div>
      <div className="text-6xl font-bold text-white font-mono tracking-tight">{formatTime(time)}</div>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>am</span>
      </div>
    </div>
  )
}

// Social Links Component
const SocialLinks = () => {
  const links = [
    { icon: Github, label: "Github", href: "https://github.com/aas63" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/abdulsine" },
    { icon: Twitter, label: "Twitter / X", href: "https://x.com/fx_81808" },
    { icon: Mail, label: "Email", href: "mailto:abdul.sine@gmail.com" },
  ]

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 space-y-6">
      {links.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm font-mono tracking-wider"
        >
          {label}
        </a>
      ))}
    </div>
  )
}

export default function HomePage() {
  // Generate random positions for cubes
  const cubePositions = [
    { x: 65, y: 15 },
    { x: 75, y: 25 },
    { x: 85, y: 20 },
    { x: 70, y: 35 },
    { x: 80, y: 45 },
    { x: 90, y: 40 },
    { x: 60, y: 55 },
    { x: 75, y: 65 },
    { x: 85, y: 60 },
    { x: 65, y: 75 },
    { x: 80, y: 85 },
    { x: 70, y: 95 },
    { x: 55, y: 25 },
    { x: 95, y: 75 },
    { x: 50, y: 45 },
  ]

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated 3D Cubes */}
      <div className="absolute inset-0 pointer-events-none">
        {cubePositions.map((position, index) => (
          <FloatingCube
            key={index}
            delay={index * 0.2}
            size={index % 3 === 0 ? "lg" : index % 2 === 0 ? "md" : "sm"}
            position={position}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-8">
          <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter">asine</h1>
        </header>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Left Column - Time */}
          <div className="space-y-8">
            <LocalTime />
          </div>

          {/* Right Column - Description */}
          <div className="space-y-6 max-w-lg">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light text-white leading-tight">
                building / crafting / creating
              </h2>

              <div className="text-sm text-gray-400 font-mono space-y-1">
                <div>1219 x 0687</div>
                <div>+0.45 FPS</div>
              </div>
            </div>

            {/* Location */}
            <div className="text-sm text-gray-400 font-mono tracking-wider space-y-1">
              <div>LOS ANGELES, CA → US OF A</div>
              <div>APPLIED ENGINEER</div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <SocialLinks />
      </div>
    </main>
  )
}
