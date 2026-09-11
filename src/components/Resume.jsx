import React from 'react'
import { motion } from 'framer-motion'
import { FaFileAlt, FaDownload } from 'react-icons/fa'
import { resumeInfo } from '../data/portfolioData'

const Resume = () => {
  return (
    <section id="resume" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative bg-dark-card border border-dark-border rounded-2xl p-10 md:p-16 text-center overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-6 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center"
            >
              <FaFileAlt className="text-2xl text-accent" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to know more?
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
              Explore my complete experience, skills, projects and achievements.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href={resumeInfo.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-light transition-colors duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              >
                <FaFileAlt />
                View Resume
              </motion.a>
              <motion.a
                href={resumeInfo.fileUrl}
                download={resumeInfo.fileName}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-dark-hover border border-dark-border text-slate-300 font-medium rounded-lg hover:border-accent/50 hover:text-white transition-all duration-300"
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
