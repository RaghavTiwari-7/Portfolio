import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] w-full min-w-0">
        {/* Project Number */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-4xl sm:text-6xl font-bold text-white/5 font-mono select-none">
          {project.number}
        </div>

        <div className="p-5 sm:p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-accent text-xs font-mono font-medium tracking-wider uppercase mb-2 block">
                Project {project.number}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-accent-light transition-colors duration-300 break-words">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-8">
            {project.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 text-slate-400 text-sm"
              >
                <span className="text-accent mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 sm:px-3 py-1 text-xs font-mono font-medium text-accent bg-accent/10 border border-accent/20 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            {project.comingSoon ? (
              <span className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-dark-hover border border-dark-border rounded-lg text-sm font-medium text-slate-400 italic w-full sm:w-auto">
                Coming Soon
              </span>
            ) : (
              <>
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-dark-hover border border-dark-border rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:border-accent/50 transition-all duration-300 w-full sm:w-auto"
                >
                  <FaGithub />
                  GitHub
                </motion.a>
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent border border-accent rounded-lg text-sm font-medium text-white hover:bg-accent-light transition-all duration-300 w-full sm:w-auto"
                >
                  <FaExternalLinkAlt />
                  Live Demo
                </motion.a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
