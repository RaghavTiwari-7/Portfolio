import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import FreelanceProjects from './components/FreelanceProjects'
import Achievements from './components/Achievements'
import CodingActivity from './components/CodingActivity'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import LikeButton from './components/LikeButton'

function App() {
  return (
    <div className="bg-[#04040a] min-h-screen w-full max-w-full overflow-x-hidden text-slate-200 font-sans selection:bg-accent/30 selection:text-accent-light relative">
      <CursorGlow />
      <LikeButton />
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      <Navbar />
      <main className="relative z-10 w-full max-w-full overflow-x-hidden">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <FreelanceProjects />
        <Achievements />
        <CodingActivity />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
