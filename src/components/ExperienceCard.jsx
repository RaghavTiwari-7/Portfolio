import React from 'react'
import { motion } from 'framer-motion'

const ExperienceCard = ({ exp, index, isLeft }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative pl-8 md:pl-0 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} mb-8 md:mb-0 w-full min-w-0`}
    >
      {/* Desktop Timeline dot */}
      <div className="hidden md:block absolute top-0 w-4 h-4 rounded-full bg-accent border-4 border-dark-bg shadow-[0_0_10px_rgba(124,58,237,0.5)] z-10"
        style={{ [isLeft ? 'right' : 'left']: '-8px' }}
      />

      {/* Mobile Timeline dot */}
      <div className="md:hidden absolute top-6 left-4 w-3.5 h-3.5 rounded-full bg-accent border-2 border-dark-bg shadow-[0_0_8px_rgba(124,58,237,0.5)] z-10 -translate-x-1/2" />

      <div className="bg-dark-card border border-dark-border rounded-xl p-5 sm:p-6 hover:border-accent/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.1)]">
        <span className="text-accent text-xs font-mono font-medium tracking-wider">
          {exp.duration}
        </span>
        <h3 className="text-xl font-bold text-white mt-1 mb-1">
          {exp.role}
        </h3>
        <p className="text-slate-400 text-sm font-medium mb-4">
          {exp.company}
        </p>

        <ul className="space-y-2">
          {exp.responsibilities.map((resp, i) => (
            <li key={i} className="text-slate-400 text-sm leading-relaxed flex items-start gap-2">
              <span className="text-accent mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
              {resp}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-4">
          {exp.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs font-mono text-accent/80 bg-accent/5 border border-accent/10 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ExperienceCard
