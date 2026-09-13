import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaFire, FaCalendarCheck, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import SectionHeading from './SectionHeading'
import { socialLinks } from '../data/portfolioData'

const CodingActivity = () => {
  const leetcodeUrl = socialLinks.leetcode || 'https://leetcode.com/u/Raghavt07/'
  const leetcodeUser = 'Raghavt07'
  const githubUser = 'RaghavTiwari-7'

  // Platform tab: 'leetcode' | 'github'
  const [platform, setPlatform] = useState('leetcode')

  // LeetCode state with Raghav's verified base stats for instant 0ms load
  const [leetcodeData, setLeetcodeData] = useState({
    totalSolved: 345,
    easySolved: 109,
    mediumSolved: 199,
    hardSolved: 37,
    ranking: 406363,
    totalSubmissions: 640,
    submissionCalendar: {},
  })

  // GitHub state
  const [githubData, setGithubData] = useState(null)
  const [hoveredDay, setHoveredDay] = useState(null)
  const [loadingLeetcode, setLoadingLeetcode] = useState(false)
  const [loadingGithub, setLoadingGithub] = useState(false)

  // 1. Fetch live LeetCode data for Raghavt07
  useEffect(() => {
    let isMounted = true
    setLoadingLeetcode(true)

    fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${leetcodeUser}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch LeetCode data')
        return res.json()
      })
      .then((data) => {
        if (isMounted && data) {
          setLeetcodeData((prev) => ({
            ...prev,
            totalSolved: data.totalSolved || prev.totalSolved,
            easySolved: data.easySolved || prev.easySolved,
            mediumSolved: data.mediumSolved || prev.mediumSolved,
            hardSolved: data.hardSolved || prev.hardSolved,
            ranking: data.ranking || prev.ranking,
            totalSubmissions: data.totalSubmissions?.[0]?.submissions || prev.totalSubmissions,
            submissionCalendar: data.submissionCalendar || {},
          }))
          setLoadingLeetcode(false)
        }
      })
      .catch((err) => {
        console.warn('LeetCode live API fallback used:', err)
        if (isMounted) setLoadingLeetcode(false)
      })

    return () => {
      isMounted = false
    }
  }, [leetcodeUser])

  // 2. Fetch live GitHub data for RaghavTiwari-7
  useEffect(() => {
    let isMounted = true
    setLoadingGithub(true)

    fetch(`https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch GitHub data')
        return res.json()
      })
      .then((data) => {
        if (isMounted) {
          setGithubData(data)
          setLoadingGithub(false)
        }
      })
      .catch((err) => {
        console.warn('GitHub live API fallback used:', err)
        if (isMounted) setLoadingGithub(false)
      })

    return () => {
      isMounted = false
    }
  }, [githubUser])

  // Build 52-week heatmap grid for LeetCode
  const leetcodeHeatmap = useMemo(() => {
    const calendar = leetcodeData.submissionCalendar || {}
    const dateMap = {}
    Object.entries(calendar).forEach(([ts, count]) => {
      const d = new Date(parseInt(ts) * 1000).toISOString().slice(0, 10)
      dateMap[d] = count
    })

    const weeks = []
    const now = new Date()
    const startDate = new Date(now)
    startDate.setDate(now.getDate() - 52 * 7)

    let currentWeek = []
    let totalSubmissionsInYear = 0
    let activeDaysCount = 0

    for (let i = 0; i < 52 * 7; i++) {
      const d = new Date(startDate)
      d.setDate(startDate.getDate() + i)
      const dateStr = d.toISOString().slice(0, 10)
      const count = dateMap[dateStr] || 0

      if (count > 0) {
        totalSubmissionsInYear += count
        activeDaysCount++
      }

      const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4
      currentWeek.push({
        date: dateStr,
        count,
        level,
      })

      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    if (currentWeek.length > 0) weeks.push(currentWeek)

    return {
      weeks,
      totalCount: totalSubmissionsInYear > 0 ? totalSubmissionsInYear : leetcodeData.totalSolved,
      activeDays: activeDaysCount,
    }
  }, [leetcodeData])

  // Build 52-week heatmap grid for GitHub
  const githubHeatmap = useMemo(() => {
    if (githubData?.contributions && githubData.contributions.length > 0) {
      const raw = githubData.contributions
      const total = githubData.total?.lastYear || 39
      let active = 0

      raw.forEach((d) => {
        if (d.count > 0) active++
      })

      const weeks = []
      let currentWeek = []
      raw.forEach((day) => {
        currentWeek.push(day)
        if (currentWeek.length === 7) {
          weeks.push(currentWeek)
          currentWeek = []
        }
      })
      if (currentWeek.length > 0) weeks.push(currentWeek)

      return {
        weeks,
        totalCount: total,
        activeDays: active,
      }
    }

    return {
      weeks: [],
      totalCount: 39,
      activeDays: 14,
    }
  }, [githubData])

  // Current active heatmap based on selected platform
  const currentHeatmap = platform === 'leetcode' ? leetcodeHeatmap : githubHeatmap

  const getHeatmapColor = (level) => {
    if (platform === 'leetcode') {
      // LeetCode iconic warm amber/orange accent
      const colors = {
        0: 'bg-[#161622] hover:bg-[#222234]',
        1: 'bg-amber-500/25 hover:bg-amber-500/40',
        2: 'bg-amber-500/50 hover:bg-amber-500/65',
        3: 'bg-amber-500/80 hover:bg-amber-500/90',
        4: 'bg-amber-400 hover:bg-amber-300',
      }
      return colors[level] || colors[0]
    }

    // GitHub purple theme
    const colors = {
      0: 'bg-[#161622] hover:bg-[#222234]',
      1: 'bg-accent/25 hover:bg-accent/40',
      2: 'bg-accent/50 hover:bg-accent/65',
      3: 'bg-accent/80 hover:bg-accent/90',
      4: 'bg-accent-light hover:bg-white',
    }
    return colors[level] || colors[0]
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  return (
    <section id="coding-activity" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Days I Code" subtitle="Algorithmic & Development Activity" />

        {/* Platform Switcher Buttons */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-dark-card border border-dark-border/80 shadow-lg">
            <button
              onClick={() => setPlatform('leetcode')}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                platform === 'leetcode'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SiLeetcode className="text-base text-amber-500" />
              <span>LeetCode (@{leetcodeUser})</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-[10px] text-amber-300">
                {leetcodeData.totalSolved} Solved
              </span>
            </button>

            <button
              onClick={() => setPlatform('github')}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                platform === 'github'
                  ? 'bg-accent/20 text-accent-light border border-accent/40 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FaGithub className="text-base text-accent" />
              <span>GitHub (@{githubUser})</span>
              <span className="px-2 py-0.5 rounded-md bg-accent/20 text-[10px] text-accent-light">
                {githubHeatmap.totalCount} Commits
              </span>
            </button>
          </div>
        </div>

        {/* LeetCode Highlights Banner */}
        {platform === 'leetcode' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            {/* Total Solved Card */}
            <div className="p-4 rounded-xl bg-dark-card border border-dark-border hover:border-amber-500/30 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
                  <SiLeetcode className="text-amber-500" />
                  Total Solved
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  Active
                </span>
              </div>
              <p className="text-3xl font-bold font-mono text-white mt-1">
                {leetcodeData.totalSolved}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 pt-2 border-t border-dark-border/40 text-[11px] font-mono">
                <span className="text-emerald-400">{leetcodeData.easySolved} Easy</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-400">{leetcodeData.mediumSolved} Med</span>
                <span className="text-slate-600">•</span>
                <span className="text-rose-400">{leetcodeData.hardSolved} Hard</span>
              </div>
            </div>

            {/* Global Ranking */}
            <div className="p-4 rounded-xl bg-dark-card border border-dark-border hover:border-amber-500/30 transition-colors">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1 font-mono">
                <FaFire className="text-amber-500" />
                <span>Global Rank</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                Top ~{Math.round(leetcodeData.ranking / 1000)}k
              </p>
              <span className="text-[11px] text-slate-500 mt-2 block">
                Rank #{leetcodeData.ranking.toLocaleString()} worldwide
              </span>
            </div>

            {/* Total Submissions */}
            <div className="p-4 rounded-xl bg-dark-card border border-dark-border hover:border-amber-500/30 transition-colors">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1 font-mono">
                <FaCalendarCheck className="text-cyan-400" />
                <span>Submissions</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                {leetcodeData.totalSubmissions}+
              </p>
              <span className="text-[11px] text-slate-500 mt-2 block">
                Code evaluations submitted
              </span>
            </div>

            {/* LeetCode Profile Direct Link */}
            <div className="p-4 rounded-xl bg-dark-card border border-dark-border hover:border-amber-500/40 transition-colors flex flex-col justify-between">
              <div>
                <span className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
                  <SiLeetcode className="text-amber-500" />
                  Verified LeetCode ID
                </span>
                <p className="text-xl font-bold font-mono text-white mt-1">
                  @{leetcodeUser}
                </p>
              </div>
              <a
                href={leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-400 text-xs font-mono font-medium transition-colors"
              >
                <span>View Raghav's LeetCode</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>
          </div>
        )}

        {/* GitHub Highlights Banner */}
        {platform === 'github' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div className="p-4 rounded-xl bg-dark-card border border-dark-border">
              <span className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
                <FaGithub className="text-accent" />
                Total Commits
              </span>
              <p className="text-3xl font-bold font-mono text-white mt-1">
                {githubHeatmap.totalCount}
              </p>
              <span className="text-[11px] text-slate-500 mt-2 block">in the past 365 days</span>
            </div>

            <div className="p-4 rounded-xl bg-dark-card border border-dark-border">
              <span className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
                <FaCalendarCheck className="text-emerald-400" />
                Active Days
              </span>
              <p className="text-3xl font-bold font-mono text-white mt-1">
                {githubHeatmap.activeDays}
              </p>
              <span className="text-[11px] text-slate-500 mt-2 block">days with GitHub activity</span>
            </div>

            <div className="p-4 rounded-xl bg-dark-card border border-dark-border">
              <span className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
                <FaFire className="text-amber-400" />
                Coding Streak
              </span>
              <p className="text-3xl font-bold font-mono text-white mt-1">Active</p>
              <span className="text-[11px] text-slate-500 mt-2 block">regular developer workflow</span>
            </div>

            <div className="p-4 rounded-xl bg-dark-card border border-dark-border flex flex-col justify-between">
              <div>
                <span className="text-slate-400 text-xs font-mono flex items-center gap-1.5">
                  <FaCodeBranch className="text-cyan-400" />
                  GitHub Handle
                </span>
                <p className="text-xl font-bold font-mono text-white mt-1">@{githubUser}</p>
              </div>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent/15 hover:bg-accent/25 border border-accent/40 text-accent-light text-xs font-mono font-medium transition-colors"
              >
                <span>View GitHub Profile</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>
          </div>
        )}

        {/* Heatmap Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-dark-card border border-dark-border rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden w-full max-w-full min-w-0"
        >
          {/* Card Header Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-dark-border/60">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  platform === 'leetcode' ? 'bg-amber-400' : 'bg-accent'
                }`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  platform === 'leetcode' ? 'bg-amber-500' : 'bg-accent'
                }`} />
              </span>
              <span className="text-xs font-mono text-slate-300">
                {platform === 'leetcode'
                  ? `Live LeetCode Activity (@${leetcodeUser})`
                  : `Live GitHub Contributions (@${githubUser})`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={platform === 'leetcode' ? leetcodeUrl : socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono px-3 py-1 rounded-lg border border-dark-border hover:border-accent/40 bg-dark-bg/60 text-slate-400 hover:text-white transition-all flex items-center gap-1.5"
              >
                <span className="truncate max-w-[150px] sm:max-w-none">{platform === 'leetcode' ? 'leetcode.com/u/Raghavt07' : `github.com/${githubUser}`}</span>
                <FaExternalLinkAlt className="text-[9px]" />
              </a>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="block md:hidden text-[11px] font-mono text-slate-500 mb-3 flex items-center justify-between">
            <span>← Swipe horizontally to see calendar →</span>
            {hoveredDay && (
              <span className="text-amber-400 font-medium">
                {hoveredDay.count} on {hoveredDay.date}
              </span>
            )}
          </div>

          {/* Heatmap Grid Wrapper */}
          <div className="overflow-x-auto pb-2 w-full max-w-full touch-pan-x">
            <div className="min-w-[760px]">
              {/* Month labels */}
              <div className="flex ml-9 mb-2.5">
                {months.map((month, i) => (
                  <div key={month} className="flex-1 text-xs text-slate-500 font-mono">
                    {i % 2 === 0 ? month : ''}
                  </div>
                ))}
              </div>

              <div className="flex">
                {/* Day labels */}
                <div className="flex flex-col gap-[3px] mr-2.5">
                  {days.map((day, i) => (
                    <div key={i} className="h-[11px] text-[10px] text-slate-500 font-mono leading-[11px]">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Heatmap grid */}
                <div className="flex gap-[3px]">
                  {currentHeatmap.weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                      {week.map((dayObj, dayIndex) => (
                        <div
                          key={dayIndex}
                          onMouseEnter={() => setHoveredDay(dayObj)}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-[11px] h-[11px] rounded-[2px] ${getHeatmapColor(
                            dayObj.level || 0
                          )} transition-all duration-150 cursor-pointer`}
                          title={`${dayObj.count || 0} ${platform === 'leetcode' ? 'problems' : 'commits'} on ${dayObj.date}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend & Hover Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-dark-border/40">
                <div className="text-xs font-mono text-slate-400">
                  {hoveredDay ? (
                    <span>
                      <strong className={platform === 'leetcode' ? 'text-amber-400' : 'text-accent'}>
                        {hoveredDay.count} {platform === 'leetcode' ? 'submissions' : 'contributions'}
                      </strong>{' '}
                      on {hoveredDay.date}
                    </span>
                  ) : (
                    <span className="text-slate-500">
                      Hover over any day square to see problem submissions
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div key={level} className={`w-[11px] h-[11px] rounded-[2px] ${getHeatmapColor(level)}`} />
                  ))}
                  <span className="text-xs text-slate-500 font-mono">More</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CodingActivity
