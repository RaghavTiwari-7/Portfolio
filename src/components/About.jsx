import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { personalInfo } from '../data/portfolioData'

const InfoLabel = ({ label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="border-l-2 border-accent/30 pl-4 min-w-0"
  >
    <span className="text-xs font-mono text-accent uppercase tracking-wider">{label}</span>
    <p className="text-white font-medium mt-1 break-words">{value}</p>
  </motion.div>
)

const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Me" subtitle="Who I Am" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start w-full min-w-0">
          {/* Left - Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                {personalInfo.about}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {['Core Java', 'OOP', 'SQL', 'JavaScript', 'React.js', 'REST APIs', 'Data Structures', 'DBMS', 'Software Engineering'].map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(124,58,237,0.2)' }}
                  className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-sm text-slate-300 hover:border-accent/40 transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right - Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full min-w-0"
          >
            <div className="bg-dark-card border border-dark-border rounded-2xl p-5 sm:p-8 hover:border-accent/20 transition-all duration-500 w-full min-w-0">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rotate-45 transform origin-top-right" />
              </div>

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Developer Profile
              </h3>

              <div className="space-y-6">
                <InfoLabel label="Role" value="Software Engineer" delay={0.1} />
                <InfoLabel label="Focus" value="Backend / Full Stack" delay={0.2} />
                <InfoLabel label="Education" value={personalInfo.education.degree} delay={0.3} />
                <InfoLabel label="Location" value={personalInfo.location} delay={0.4} />
                <InfoLabel label="Email" value={personalInfo.email} delay={0.5} />
                <InfoLabel label="Phone" value={personalInfo.phone} delay={0.6} />
              </div>

              {/* Status indicator */}
              <div className="mt-8 pt-6 border-t border-dark-border">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <span className="text-sm text-slate-400">Available for opportunities</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
