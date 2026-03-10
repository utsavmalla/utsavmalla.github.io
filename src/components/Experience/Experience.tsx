import { useEffect, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { experience } from '../../data/experience'
import type { ExperienceItem } from '../../data/experience'
import { fetchExperience } from '../../api/client'

const Experience = () => {
  const experienceRef = useScrollReveal()
  const [data, setData] = useState<ExperienceItem[]>(experience)

  useEffect(() => {
    fetchExperience()
      .then((remote) => {
        setData(remote)
      })
      .catch(() => {
        // On failure, keep using fallbackExperience
      })
  }, [])

  return (
    <section
      id="experience"
      className="experience"
      aria-labelledby="experience-heading"
      ref={experienceRef}
    >
      <div className="container">
        <h2 id="experience-heading">Experience</h2>
        <div className="experience-list">
          {data.map((exp, index) => (
            <article key={index} className="experience-item" tabIndex={0}>
              <h3>{exp.title}</h3>
              <p className="experience-duration">{exp.duration}</p>
              <ul>
                {exp.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
