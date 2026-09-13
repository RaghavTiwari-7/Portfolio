import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaJava, FaJs, FaDatabase, FaNode, FaServer, FaHtml5, FaCss3Alt, 
  FaReact, FaBootstrap, FaGitAlt, FaGithub, FaAws, FaCloud, 
  FaNetworkWired, FaCode, FaProjectDiagram, FaCogs, FaLayerGroup,
  FaTerminal, FaRocket, FaBolt, FaComments, FaUsers, FaSync, FaBrain,
  FaEye, FaEnvelope, FaVial, FaGlobe
} from 'react-icons/fa'
import { SiPostgresql, SiMongodb, SiSpringboot, SiTailwindcss, SiVercel, SiPostman } from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

const iconMap = {
  java: FaJava,
  javascript: FaJs,
  database: FaDatabase,
  code: FaCode,
  nodejs: FaNode,
  server: FaServer,
  api: FaNetworkWired,
  spring: SiSpringboot,
  html5: FaHtml5,
  css3: FaCss3Alt,
  react: FaReact,
  tailwind: SiTailwindcss,
  bootstrap: FaBootstrap,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  git: FaGitAlt,
  github: FaGithub,
  vscode: VscVscode,
  postman: SiPostman,
  aws: FaAws,
  cloud: FaCloud,
  vercel: SiVercel,
  structure: FaProjectDiagram,
  algorithm: FaTerminal,
  design: FaLayerGroup,
  oop: FaCogs,
  os: FaCogs,
  dbms: FaDatabase,
  network: FaNetworkWired,
  websocket: FaBolt,
  socket: FaRocket,
  communication: FaComments,
  team: FaUsers,
  adapt: FaSync,
  learn: FaBrain,
  detail: FaEye,
}

const SkillBadge = ({ name, icon, index = 0 }) => {
  const Icon = iconMap[icon] || FaCode

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
      }}
      className="group flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-dark-card border border-dark-border rounded-lg cursor-default transition-colors duration-300 hover:border-accent/50"
    >
      <Icon className="text-slate-400 group-hover:text-accent transition-colors duration-300 text-xs sm:text-sm" />
      <span className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
        {name}
      </span>
    </motion.div>
  )
}

export default SkillBadge
