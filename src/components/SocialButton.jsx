import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa'

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  phone: FaPhone,
}

const SocialButton = ({ platform, href, label, size = 'md', variant = 'default' }) => {
  const Icon = iconMap[platform] || FaGithub

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  }

  const variantClasses = {
    default: 'bg-dark-card border border-dark-border text-slate-400 hover:text-accent hover:border-accent hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]',
    ghost: 'text-slate-400 hover:text-accent',
    filled: 'bg-accent text-white hover:bg-accent-light',
  }

  return (
    <motion.a
      href={href}
      target={platform !== 'email' && platform !== 'phone' ? '_blank' : undefined}
      rel={platform !== 'email' && platform !== 'phone' ? 'noopener noreferrer' : undefined}
      aria-label={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center rounded-lg transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      <Icon />
    </motion.a>
  )
}

export default SocialButton
