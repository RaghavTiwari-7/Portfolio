import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '../data/portfolioData'

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/3 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Projects" subtitle="What I've Built" />

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
