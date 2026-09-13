import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import SkillBadge from './SkillBadge'
import { skills } from '../data/portfolioData'

const SkillCategory = ({ title, items, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.5, delay }}
    className="mb-10"
  >
    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      {title}
    </h3>
    <div className="flex flex-wrap gap-3">
      {items.map((skill, i) => (
        <SkillBadge key={skill.name} name={skill.name} icon={skill.icon} index={i} />
      ))}
    </div>
  </motion.div>
)

const Skills = () => {
  const categories = [
    { title: 'Languages', items: skills.languages },
    { title: 'Backend', items: skills.backend },
    { title: 'Frontend', items: skills.frontend },
    { title: 'Database', items: skills.database },
    { title: 'Tools', items: skills.tools },
    { title: 'Cloud', items: skills.cloud },
    { title: 'Core CS', items: skills.coreCS },
    { title: 'Real-Time', items: skills.realTime },
    { title: 'Soft Skills', items: skills.softSkills },
  ]

  return (
    <section id="skills" className="relative py-24 md:py-32 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Skills" subtitle="Tech Stack" />

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 w-full min-w-0">
          {categories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              items={category.items}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
