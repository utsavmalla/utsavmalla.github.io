import { useScrollReveal } from '../../hooks/useScrollReveal'
import { skills } from '../../data/skills'

const Skills = () => {
  const skillsRef = useScrollReveal()

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading" ref={skillsRef}>
      <div className="container">
        <h2 id="skills-heading">Skills</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
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
