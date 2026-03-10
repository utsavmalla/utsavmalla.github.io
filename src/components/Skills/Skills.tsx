import { useEffect, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import skills from '../../data/skills'
import type { Skill } from '../../data/skills'
import { fetchSkills } from '../../api/client'

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

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading" ref={skillsRef}>
      <div className="container">
        <h2 id="skills-heading">Skills</h2>
        <div className="skills-grid">
          {data.map((skill) => (
            <article key={skill.name} className="skill" tabIndex={0}>
              <h3>{skill.name}</h3>
              <progress value={skill.proficiency} max={100}>
                {skill.proficiency}%
              </progress>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
