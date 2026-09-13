import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import useScrollSpy from '../hooks/useScrollSpy'
import { socialLinks } from '../data/portfolioData'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useScrollSpy(navLinks.map(l => l.id), 150)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.button
              onClick={() => scrollTo('home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold font-mono text-white tracking-tight"
            >
              <span className="text-accent">R</span>T<span className="text-accent">.</span>
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                    activeSection === link.id 
                      ? 'text-accent' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-accent/10 rounded-md -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Social + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-card border border-dark-border text-slate-400 hover:text-accent hover:border-accent/50 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub size={16} />
                </motion.a>
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-card border border-dark-border text-slate-400 hover:text-accent hover:border-accent/50 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={16} />
                </motion.a>
                <motion.a
                  href={socialLinks.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-dark-card border border-dark-border text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300"
                  aria-label="LeetCode"
                >
                  <SiLeetcode size={15} />
                </motion.a>
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-dark-card border border-dark-border text-slate-400 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 bg-dark-bg/95 backdrop-blur-xl border-b border-dark-border lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto shadow-2xl"
          >
            <div className="px-4 py-4 sm:py-6 space-y-1 pb-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    activeSection === link.id 
                      ? 'text-accent bg-accent/10' 
                      : 'text-slate-400 hover:text-white hover:bg-dark-card'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="flex items-center gap-4 px-4 pt-4 border-t border-dark-border mt-4">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors" title="GitHub">
                  <FaGithub size={20} />
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors" title="LinkedIn">
                  <FaLinkedin size={20} />
                </a>
                <a href={socialLinks.leetcode} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors" title="LeetCode">
                  <SiLeetcode size={19} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
