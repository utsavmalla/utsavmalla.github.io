import { useEffect, useState } from 'react'
import type { IconType } from 'react-icons'
import { FaDatabase } from 'react-icons/fa'
import {
  SiAngular,
  SiDotnet,
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiJquery,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import skills from '../../data/skills'
import type { Skill } from '../../data/skills'
import { fetchSkills } from '../../api/client'

type SkillIcon = {
  Icon: IconType
  color: string
}

const skillIcons: Record<string, SkillIcon> = {
  '.net mvc': { Icon: SiDotnet, color: '#512bd4' },
  angularjs: { Icon: SiAngular, color: '#dd0031' },
  'asp.net mvc': { Icon: SiDotnet, color: '#512bd4' },
  express: { Icon: SiExpress, color: 'var(--text)' },
  git: { Icon: SiGit, color: '#f05032' },
  github: { Icon: SiGithub, color: 'var(--text)' },
  javascript: { Icon: SiJavascript, color: '#f7df1e' },
  jquery: { Icon: SiJquery, color: '#0769ad' },
  'microsoft sql server': { Icon: FaDatabase, color: '#cc2927' },
  mongodb: { Icon: SiMongodb, color: '#47a248' },
  'node.js': { Icon: SiNodedotjs, color: '#5fa04e' },
  react: { Icon: SiReact, color: '#61dafb' },
  sqlite: { Icon: SiSqlite, color: '#003b57' },
  'tailwind css': { Icon: SiTailwindcss, color: '#06b6d4' },
  typescript: { Icon: SiTypescript, color: '#3178c6' },
  vite: { Icon: SiVite, color: '#646cff' },
}

const normalizeSkillName = (name: string) => name.trim().toLowerCase()

const getUniqueSkills = (currentSkills: Skill[]) => {
  const seen = new Set<string>()

  return currentSkills.filter((skill) => {
    const normalizedName = normalizeSkillName(skill.name)

    if (seen.has(normalizedName)) {
      return false
    }

    seen.add(normalizedName)
    return true
  })
}

const Skills = () => {
  const skillsRef = useScrollReveal()
  const [data, setData] = useState<Skill[]>(skills)

  useEffect(() => {
    fetchSkills()
      .then((remote) => {
        setData(remote)
      })
      .catch(() => {
        // On failure, keep using fallbackSkills
      })
  }, [])

  const uniqueSkills = getUniqueSkills(data)

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading" ref={skillsRef}>
      <div className="container">
        <div className="section-heading skills-heading">
          <p className="section-kicker">Skills</p>
          <h2 id="skills-heading">Technologies I work with</h2>
          <p>
            Technologies I work with across frontend, backend, databases, and tooling.
          </p>
        </div>
        <div className="skills-grid">
          {uniqueSkills.map((skill) => {
            const icon = skillIcons[normalizeSkillName(skill.name)] ?? {
              Icon: FaDatabase,
              color: 'var(--accent)',
            }
            const { Icon } = icon

            return (
              <article key={skill.name} className="skill" tabIndex={0}>
                <Icon className="skill-icon" style={{ color: icon.color }} aria-hidden="true" />
                <h3>{skill.name}</h3>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
