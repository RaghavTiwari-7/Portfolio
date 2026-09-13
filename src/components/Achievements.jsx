import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { achievements } from '../data/portfolioData'

const CountUp = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const numericEnd = parseInt(end.replace(/\D/g, '')) || 0
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * numericEnd))

      if (progress >= 1) clearInterval(timer)
    }, 16)

    return () => clearInterval(timer)
  }, [hasStarted, end, duration])

  const displayValue = end.replace(/\d+/, count.toString())

  return <span ref={ref}>{displayValue}{suffix}</span>
}

const AchievementCard = ({ achievement, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    whileHover={{ y: -5, boxShadow: '0 0 30px rgba(124,58,237,0.15)' }}
    className="relative bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8 text-center hover:border-accent/30 transition-all duration-500 group w-full min-w-0"
  >
    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-3 font-mono">
      {achievement.number.includes('+') || achievement.number.includes('-') ? (
        <CountUp end={achievement.number} />
      ) : (
        achievement.number
      )}
    </div>
    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 break-words">{achievement.label}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{achievement.description}</p>

    {/* Decorative number background */}
    <div className="absolute top-4 right-4 text-5xl sm:text-7xl font-bold text-white/[0.02] font-mono select-none pointer-events-none">
      {achievement.number}
    </div>
  </motion.div>
)

const Achievements = () => {
  return (
    <section id="achievements" className="relative py-24 md:py-32 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Achievements" subtitle="Milestones" />

        <div className="grid md:grid-cols-3 gap-6 w-full min-w-0">
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
