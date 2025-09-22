"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

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
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  }

  return (
    <div
      className={`floating-cube ${sizeClasses[size]} animate-float-3d cube-glow`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${delay}s`,
        background: "linear-gradient(135deg, #f472b6, #ec4899)",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(244, 114, 182, 0.4)",
        transformStyle: "preserve-3d",
        backfaceVisibility: "visible",
      }}
    >
      <div
        className="w-full h-full cube-3d"
        style={{
          background: "linear-gradient(45deg, #f472b6, #ec4899, #f472b6)",
          borderRadius: "8px",
          transformStyle: "preserve-3d",
        }}
      />
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
    <main
      className="min-h-screen github-pages-fix overflow-hidden relative"
      style={{ backgroundColor: "#000000", color: "#ffffff" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {cubePositions.map((position, index) => (
          <FloatingCube
            key={index}
            delay={index * 0.3}
            size={index % 3 === 0 ? "lg" : index % 2 === 0 ? "md" : "sm"}
            position={position}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-8">
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter" style={{ color: "#ffffff" }}>
            asine
          </h1>
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
              <h2 className="text-2xl md:text-3xl font-light leading-tight" style={{ color: "#ffffff" }}>
                building / crafting / creating
              </h2>

              <div className="text-sm font-mono space-y-1" style={{ color: "#9ca3af" }}>
                <div>1219 x 0687</div>
                <div>+0.45 FPS</div>
              </div>
            </div>

            {/* Location */}
            <div className="text-sm font-mono tracking-wider space-y-1" style={{ color: "#9ca3af" }}>
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
