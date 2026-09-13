import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import ExperienceCard from './ExperienceCard'
import { experience } from '../data/portfolioData'

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Experience" subtitle="Where I've Worked" />

        <div className="relative max-w-4xl mx-auto w-full min-w-0">
          {/* Timeline line - desktop */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent -translate-x-1/2"
          />

          {/* Mobile timeline line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent"
          />

          <div className="space-y-8 md:space-y-0">
            {experience.map((exp, index) => (
              <div key={exp.id} className={`md:grid md:grid-cols-2 md:gap-8 ${index > 0 ? 'md:mt-8' : ''}`}>
                {index % 2 === 0 ? (
                  <>
                    <ExperienceCard exp={exp} index={index} isLeft={true} />
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    <ExperienceCard exp={exp} index={index} isLeft={false} />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
