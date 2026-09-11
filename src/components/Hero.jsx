import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown, FaTerminal, FaCode, FaBolt, FaRocket, FaCopy, FaCheck } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { personalInfo, socialLinks } from '../data/portfolioData'

const ParticleCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = []
    const particleCount = 40

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124, 58, 237, ${p.opacity})`
        ctx.fill()

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x
          const dy = particles[j].y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.1 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

const TerminalWindow = ({ scrollTo }) => {
  const [activeTab, setActiveTab] = useState('terminal') // 'terminal' | 'code' | 'status'
  const [inputVal, setInputVal] = useState('')
  const [copied, setCopied] = useState(false)
  const terminalScrollRef = useRef(null)

  const [history, setHistory] = useState([
    {
      command: 'whoami',
      output: (
        <div className="space-y-1 text-slate-300 text-xs">
          <p className="font-semibold text-white">
            Raghav Tiwari <span className="text-accent text-[11px] font-mono ml-1.5 px-2 py-0.5 rounded bg-accent/15 border border-accent/30">Software Engineer</span>
          </p>
          <p className="text-slate-400">Specializing in Java, MERN Stack, Scalable Backend Services & REST APIs.</p>
        </div>
      )
    },
    {
      command: 'skills --core',
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-semibold text-[11px]">⚡ Core Tech Stack:</p>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {['Core Java', 'Spring Boot', 'Node.js', 'Express.js', 'React.js', 'PostgreSQL', 'MongoDB', 'DSA'].map((s) => (
              <span key={s} className="px-2 py-0.5 text-[11px] font-mono rounded bg-accent/15 border border-accent/30 text-accent-light">
                {s}
              </span>
            ))}
          </div>
        </div>
      )
    }
  ])

  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight
    }
  }, [history, activeTab])

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    let output = null
    if (trimmed === 'clear' || trimmed === 'cls') {
      setHistory([])
      setInputVal('')
      return
    } else if (trimmed === 'whoami' || trimmed === 'about') {
      output = (
        <div className="space-y-1 text-slate-300 text-xs">
          <p className="font-semibold text-white">
            Raghav Tiwari <span className="text-accent text-[11px] font-mono ml-1.5 px-2 py-0.5 rounded bg-accent/15 border border-accent/30">Software Engineer</span>
          </p>
          <p className="text-slate-400">Full-stack & backend developer building scalable web applications, robust RESTful APIs, and AI-enabled tools.</p>
        </div>
      )
    } else if (trimmed === 'skills') {
      output = (
        <div className="space-y-1.5 text-xs">
          <p className="text-emerald-400 font-semibold">⚡ Technical Skills:</p>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {['Java', 'JavaScript', 'Spring Boot', 'Node.js', 'Express', 'React', 'Tailwind', 'PostgreSQL', 'MongoDB', 'REST APIs', 'DSA'].map((s) => (
              <span key={s} className="px-2 py-0.5 font-mono rounded bg-white/5 border border-white/10 text-slate-200">
                {s}
              </span>
            ))}
          </div>
        </div>
      )
    } else if (trimmed === 'projects') {
      output = (
        <div className="space-y-1.5 text-xs">
          <p className="text-cyan-400 font-semibold">🚀 Selected Projects:</p>
          <ul className="space-y-1 text-slate-300">
            <li><span className="text-accent font-medium">• AI Code Review:</span> AI GitHub PR bug & security analyzer</li>
            <li><span className="text-accent font-medium">• TIFFIN HUB:</span> Meal subscription marketplace (PostgreSQL + JWT)</li>
            <li><span className="text-accent font-medium">• FlowForge:</span> Zapier-style workflow automation engine</li>
            <li><span className="text-accent font-medium">• MoneyOS:</span> Unified financial management dashboard</li>
          </ul>
        </div>
      )
    } else if (trimmed === 'contact') {
      output = (
        <div className="space-y-1 text-xs">
          <p className="text-purple-400 font-semibold">📬 Get In Touch:</p>
          <p className="text-slate-300">Email: <a href="mailto:raghavtiwari0077@gmail.com" className="text-accent underline">raghavtiwari0077@gmail.com</a></p>
          <p className="text-slate-300">Phone: <span className="text-slate-200">+91-8529846231</span></p>
          <p className="text-slate-400">GitHub: github.com/raghav-tiwari</p>
        </div>
      )
    } else if (trimmed === 'coffee' || trimmed === 'tea') {
      output = (
        <p className="text-amber-400 text-xs">☕ Hot cup of coffee brewed! Ready to write another 1,000 lines of clean code.</p>
      )
    } else if (trimmed === 'help') {
      output = (
        <div className="text-xs text-slate-400 space-y-1">
          <p className="text-slate-300 font-semibold">Available commands:</p>
          <p><span className="text-accent font-mono font-medium">whoami</span> - Developer profile summary</p>
          <p><span className="text-accent font-mono font-medium">skills</span> - Core technologies & frameworks</p>
          <p><span className="text-accent font-mono font-medium">projects</span> - Featured engineering projects</p>
          <p><span className="text-accent font-mono font-medium">contact</span> - Email & phone info</p>
          <p><span className="text-accent font-mono font-medium">clear</span> - Clear terminal window</p>
        </div>
      )
    } else {
      output = (
        <p className="text-rose-400 text-xs">
          Command not found: <span className="text-white font-mono">{trimmed}</span>. Type <span className="text-accent font-mono">help</span> for commands.
        </p>
      )
    }

    setHistory(prev => [...prev, { command: cmd, output }])
    setInputVal('')
  }

  const handleCopyCode = () => {
    const codeSnippet = `const developer = {
  name: "Raghav Tiwari",
  title: "Software Engineer",
  roles: ["Full-Stack Developer", "Backend Developer", "Java Developer"],
  coreStack: {
    languages: ["Java", "JavaScript", "SQL", "C/C++"],
    backend: ["Node.js", "Express.js", "Spring Boot", "REST APIs"],
    frontend: ["React.js", "Tailwind CSS"],
    databases: ["PostgreSQL", "MongoDB"]
  },
  internships: ["Tech Jose (MERN)", "Celebal Tech (Node.js)"],
  openToWork: true
};`
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative w-full max-w-lg lg:max-w-xl mx-auto"
    >
     

      {/* Floating Badge 2 - Bottom Left */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -left-2 sm:-left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-card/90 border border-emerald-500/40 shadow-[0_4px_20px_rgba(16,185,129,0.2)] backdrop-blur-md text-xs font-medium text-slate-200"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <FaBolt className="text-amber-400 text-xs" />
        <span className="font-mono text-[11px]">Open to Roles</span>
      </motion.div>

      {/* Main Glass Card */}
      <div className="relative rounded-2xl bg-[#090910]/95 border border-dark-border/80 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-xl overflow-hidden group hover:border-accent/40 transition-all duration-500">
        
        {/* Terminal Header */}
        <div className="bg-[#11111d] px-4 py-3 border-b border-dark-border/60 flex items-center justify-between">
          {/* Window Control Buttons */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:opacity-80 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:opacity-80 transition-opacity" />
          </div>

          {/* Center Tabs */}
          <div className="flex items-center gap-1 bg-dark-bg/60 p-1 rounded-lg border border-dark-border/40">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                activeTab === 'terminal'
                  ? 'bg-accent/20 text-accent-light border border-accent/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FaTerminal className="text-[10px]" />
              <span>terminal</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-accent/20 text-accent-light border border-accent/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FaCode className="text-[11px]" />
              <span>raghav.ts</span>
            </button>

            <button
              onClick={() => setActiveTab('status')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                activeTab === 'status'
                  ? 'bg-accent/20 text-accent-light border border-accent/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FaBolt className="text-[10px]" />
              <span>status</span>
            </button>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2">
            {activeTab === 'code' ? (
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                title="Copy code"
              >
                {copied ? <FaCheck className="text-emerald-400 text-xs" /> : <FaCopy className="text-xs" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                zsh
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 min-h-[300px]">
          
          {/* TAB 1: INTERACTIVE TERMINAL */}
          {activeTab === 'terminal' && (
            <div className="flex flex-col h-[280px]">
              {/* History list */}
              <div ref={terminalScrollRef} className="flex-1 overflow-y-auto pr-1 space-y-3 font-mono">
                <div className="text-[11px] text-slate-500 border-b border-dark-border/40 pb-2">
                  ⚡ <span className="text-slate-400">Raghav Developer Shell [v2.4.0]</span> — Type or click quick commands below
                </div>

                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-emerald-400 font-bold">➜</span>
                      <span className="text-cyan-400">~/raghav</span>
                      <span className="text-accent font-semibold">git:(main)</span>
                      <span className="text-white font-medium">{item.command}</span>
                    </div>
                    <div className="pl-4 pb-1 border-l border-accent/20 ml-1.5">
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleCommand(inputVal)
                }}
                className="flex items-center gap-2 pt-2 border-t border-dark-border/40 font-mono text-xs mt-2"
              >
                <span className="text-emerald-400 font-bold">➜</span>
                <span className="text-cyan-400 hidden sm:inline">~/raghav</span>
                <span className="text-accent font-semibold hidden sm:inline">git:(main)</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type 'help', 'skills', 'projects'..."
                  className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 caret-accent font-mono text-xs"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 text-[11px] font-mono rounded bg-accent/20 text-accent-light hover:bg-accent hover:text-white transition-colors"
                >
                  Run
                </button>
              </form>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2.5 mt-1 border-t border-dark-border/30">
                <span className="text-[10px] uppercase font-mono text-slate-500 mr-1">Quick:</span>
                {[
                  { label: '⚡ whoami', cmd: 'whoami' },
                  { label: '🛠️ skills', cmd: 'skills' },
                  { label: '🚀 projects', cmd: 'projects' },
                  { label: '📬 contact', cmd: 'contact' },
                  { label: '☕ coffee', cmd: 'coffee' },
                  { label: '🧹 clear', cmd: 'clear' },
                ].map((btn) => (
                  <button
                    key={btn.cmd}
                    onClick={() => handleCommand(btn.cmd)}
                    className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono rounded-md bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/40 text-slate-300 hover:text-white transition-all duration-200"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: TYPESCRIPT CODE PREVIEW */}
          {activeTab === 'code' && (
            <div className="font-mono text-xs leading-relaxed space-y-1 text-slate-300 select-text overflow-x-auto h-[280px] pr-1">
              <div><span className="text-slate-600 mr-3 select-none">01</span><span className="text-purple-400">import</span> &#123; SoftwareEngineer &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">'@engineers/profile'</span>;</div>
              <div><span className="text-slate-600 mr-3 select-none">02</span></div>
              <div><span className="text-slate-600 mr-3 select-none">03</span><span className="text-purple-400">export const</span> <span className="text-yellow-300">developer</span>: <span className="text-cyan-400">SoftwareEngineer</span> = &#123;</div>
              <div><span className="text-slate-600 mr-3 select-none">04</span>  <span className="text-sky-300">name</span>: <span className="text-emerald-400">"Raghav Tiwari"</span>,</div>
              <div><span className="text-slate-600 mr-3 select-none">05</span>  <span className="text-sky-300">role</span>: <span className="text-emerald-400">"Software Engineer"</span>,</div>
              <div><span className="text-slate-600 mr-3 select-none">06</span>  <span className="text-sky-300">openToWork</span>: <span className="text-amber-400">true</span>,</div>
              <div><span className="text-slate-600 mr-3 select-none">07</span>  <span className="text-sky-300">internships</span>: [</div>
              <div><span className="text-slate-600 mr-3 select-none">08</span>    <span className="text-emerald-400">"Tech Jose (MERN Stack Intern)"</span>,</div>
              <div><span className="text-slate-600 mr-3 select-none">09</span>    <span className="text-emerald-400">"Celebal Technologies (Node.js Intern)"</span></div>
              <div><span className="text-slate-600 mr-3 select-none">10</span>  ],</div>
              <div><span className="text-slate-600 mr-3 select-none">11</span>  <span className="text-sky-300">specialties</span>: &#123;</div>
              <div><span className="text-slate-600 mr-3 select-none">12</span>    <span className="text-sky-300">languages</span>: [<span className="text-emerald-400">"Java"</span>, <span className="text-emerald-400">"JavaScript"</span>, <span className="text-emerald-400">"SQL"</span>, <span className="text-emerald-400">"C++"</span>],</div>
              <div><span className="text-slate-600 mr-3 select-none">13</span>    <span className="text-sky-300">backend</span>: [<span className="text-emerald-400">"Node.js"</span>, <span className="text-emerald-400">"Express"</span>, <span className="text-emerald-400">"Spring Boot"</span>],</div>
              <div><span className="text-slate-600 mr-3 select-none">14</span>    <span className="text-sky-300">frontend</span>: [<span className="text-emerald-400">"React.js"</span>, <span className="text-emerald-400">"Tailwind CSS"</span>],</div>
              <div><span className="text-slate-600 mr-3 select-none">15</span>    <span className="text-sky-300">databases</span>: [<span className="text-emerald-400">"PostgreSQL"</span>, <span className="text-emerald-400">"MongoDB"</span>]</div>
              <div><span className="text-slate-600 mr-3 select-none">16</span>  &#125;,</div>
              <div><span className="text-slate-600 mr-3 select-none">17</span>  <span className="text-sky-300">focus</span>: <span className="text-emerald-400">"Scalable backend architecture & AI web products"</span></div>
              <div><span className="text-slate-600 mr-3 select-none">18</span>&#125;;</div>
            </div>
          )}

          {/* TAB 3: LIVE STATUS & METRICS */}
          {activeTab === 'status' && (
            <div className="space-y-4 h-[280px] flex flex-col justify-between">
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-white">Available for Full-Time Roles</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Immediate</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[11px] mb-1">DSA Solved</span>
                  <span className="text-white font-bold text-base font-mono">300+</span>
                  <span className="text-[10px] text-accent block">LeetCode & GfG</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[11px] mb-1">Internships</span>
                  <span className="text-white font-bold text-base font-mono">2 Completed</span>
                  <span className="text-[10px] text-accent block">MERN & Node.js</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[11px] mb-1">Primary Stack</span>
                  <span className="text-white font-bold text-sm font-mono">Java & JS</span>
                  <span className="text-[10px] text-slate-400 block">Backend & Web</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[11px] mb-1">Location</span>
                  <span className="text-white font-bold text-sm font-mono">India</span>
                  <span className="text-[10px] text-slate-400 block">Remote / On-site</span>
                </div>
              </div>

              <button
                onClick={() => scrollTo && scrollTo('contact')}
                className="w-full py-2.5 rounded-xl bg-accent hover:bg-accent-light text-white text-xs font-medium transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2"
              >
                <span>Initiate Conversation / Contact</span>
                <FaChevronDown className="-rotate-90 text-[10px]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  )
}

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % personalInfo.roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleCanvas />

      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-accent text-sm font-mono font-medium tracking-wider">
                Hi, I'm
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-2 mb-4"
            >
              {personalInfo.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-8 mb-6"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl md:text-2xl font-medium text-accent-light inline-block"
                >
                  {personalInfo.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-400 text-lg leading-relaxed max-w-xl mb-8"
            >
              {personalInfo.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <motion.button
                onClick={() => scrollTo('projects')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-light transition-colors duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              >
                View My Work
              </motion.button>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-dark-card border border-dark-border text-slate-300 font-medium rounded-lg hover:border-accent/50 hover:text-white transition-all duration-300"
              >
                Download Resume
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors duration-300" title="GitHub">
                <FaGithub size={22} />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors duration-300" title="LinkedIn">
                <FaLinkedin size={22} />
              </a>
              <a href={socialLinks.leetcode} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors duration-300" title="LeetCode">
                <SiLeetcode size={20} />
              </a>
              <a href={socialLinks.email} className="text-slate-400 hover:text-accent transition-colors duration-300" title="Email">
                <FaEnvelope size={22} />
              </a>
              <span className="text-slate-600">|</span>
              <span className="text-slate-500 text-sm font-mono">{personalInfo.email}</span>
            </motion.div>
          </div>

          {/* Right Content - Terminal */}
          <div className="flex justify-center lg:justify-end">
            <TerminalWindow scrollTo={scrollTo} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollTo('about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-slate-500 hover:text-accent transition-colors"
        >
          <FaChevronDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero
