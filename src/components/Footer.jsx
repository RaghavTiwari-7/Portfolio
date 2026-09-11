import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'
import { socialLinks, personalInfo } from '../data/portfolioData'

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-white font-medium mb-1">
              Designed & Developed by {personalInfo.name}
            </p>
            <p className="text-slate-500 text-sm">
              &copy; 2026 {personalInfo.name}. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-card border border-dark-border text-slate-400 hover:text-accent hover:border-accent/50 transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-card border border-dark-border text-slate-400 hover:text-accent hover:border-accent/50 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={socialLinks.email}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-card border border-dark-border text-slate-400 hover:text-accent hover:border-accent/50 transition-all duration-300"
              aria-label="Email"
            >
              <FaEnvelope size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
