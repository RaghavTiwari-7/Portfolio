import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaPaperPlane } from 'react-icons/fa'
import SectionHeading from './SectionHeading'
import { personalInfo, socialLinks } from '../data/portfolioData'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          ...formData
        }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 4000)
      } else {
        console.error("Error from Web3Forms:", result)
        // Fallback to mailto if API fails
        const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`)
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
        window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
      }
    } catch (error) {
      console.warn('Form submission error, opening mailto fallback:', error)
      const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`)
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Let's build something together." subtitle="Get In Touch" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 w-full min-w-0">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="w-full min-w-0"
          >
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 break-words">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>

            <div className="space-y-4 sm:space-y-6">
              <motion.a
                href={socialLinks.email}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-dark-card border border-dark-border rounded-xl hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
                  <FaEnvelope className="text-accent text-base sm:text-lg" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">Email</span>
                  <p className="text-white font-medium text-sm sm:text-base break-all">{personalInfo.email}</p>
                </div>
              </motion.a>

              <motion.a
                href={socialLinks.phone}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-dark-card border border-dark-border rounded-xl hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
                  <FaPhone className="text-accent text-base sm:text-lg" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">Phone</span>
                  <p className="text-white font-medium text-sm sm:text-base break-words">{personalInfo.phone}</p>
                </div>
              </motion.a>

              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-dark-card border border-dark-border rounded-xl text-slate-400 hover:text-white hover:border-accent/50 transition-all duration-300 text-sm font-medium flex-1 sm:flex-initial"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </motion.a>
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-dark-card border border-dark-border rounded-xl text-slate-400 hover:text-white hover:border-accent/50 transition-all duration-300 text-sm font-medium flex-1 sm:flex-initial"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full min-w-0"
          >
            <form onSubmit={handleSubmit} className="bg-dark-card border border-dark-border rounded-2xl p-5 sm:p-8 w-full min-w-0">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white font-medium rounded-lg transition-colors duration-300 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-accent-light'}`}
                >
                  <FaPaperPlane className={isSubmitting ? 'animate-pulse' : ''} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center"
                  >
                    <p className="text-sm text-green-400 font-medium">
                      ✨ Message sent successfully! I'll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
