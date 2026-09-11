import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CursorGlow = () => {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Smooth spring physics for a fluid, natural follower effect
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
  const glowX = useSpring(mouseX, springConfig)
  const glowY = useSpring(mouseY, springConfig)

  // Subtle trailing dot
  const trailX = useSpring(mouseX, { damping: 22, stiffness: 280, mass: 0.4 })
  const trailY = useSpring(mouseY, { damping: 22, stiffness: 280, mass: 0.4 })

  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Only enable on devices that have a real mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      // Slight expansion when hovering over interactive elements
      const target = e.target
      const interactive = target.closest('a, button, input, textarea, [role="button"], .group')
      setIsHovered(!!interactive)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible, mouseX, mouseY])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Soft purple radial ambient glow - subtle and non-distracting */}
      <motion.div
        className="absolute rounded-full bg-accent/12 blur-[65px]"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 260 : 180,
          height: isHovered ? 260 : 180,
          transition: 'width 0.3s ease, height 0.3s ease',
        }}
      />

      {/* Gentle trailing purple ring around the cursor */}
      <motion.div
        className="absolute rounded-full border border-accent/40 bg-accent/10 shadow-[0_0_12px_rgba(124,58,237,0.35)] backdrop-blur-[0.5px]"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 28 : 18,
          height: isHovered ? 28 : 18,
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
    </div>
  )
}

export default CursorGlow

