import React from 'react'
import { motion } from 'framer-motion'
import { FaFileAlt, FaDownload } from 'react-icons/fa'
import { resumeInfo } from '../data/portfolioData'

const Resume = () => {
  return (
    <section id="resume" className="relative py-24 md:py-32 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-10 md:p-16 text-center overflow-hidden w-full min-w-0"
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-6 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center"
            >
              <FaFileAlt className="text-xl sm:text-2xl text-accent" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 break-words">
              Want to know more?
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-8 break-words">
              Explore my complete experience, skills, projects and achievements.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              <motion.a
                href={resumeInfo.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-light transition-colors duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)] w-full sm:w-auto"
              >
                <FaFileAlt />
                View Resume
              </motion.a>
              <motion.a
                href={resumeInfo.fileUrl}
                download={resumeInfo.fileName}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-dark-hover border border-dark-border text-slate-300 font-medium rounded-lg hover:border-accent/50 hover:text-white transition-all duration-300 w-full sm:w-auto"
              >
                <FaDownload />
                Download Resume
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Resume
