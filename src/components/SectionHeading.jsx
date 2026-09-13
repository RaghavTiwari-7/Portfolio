import React from 'react'
import { motion } from 'framer-motion'

const SectionHeading = ({ title, subtitle, align = 'center' }) => {
  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${alignClass}`}
    >
      <span className="text-accent text-sm font-mono font-medium tracking-wider uppercase mb-2 block">
        {subtitle}
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight break-words">
        {title}
      </h2>
      <div className={`mt-4 h-1 w-16 bg-accent rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  )
}

export default SectionHeading
