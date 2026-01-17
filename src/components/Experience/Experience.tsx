import { useScrollReveal } from '../../hooks/useScrollReveal'
import { experience } from '../../data/experience'

const Experience = () => {
  const experienceRef = useScrollReveal()

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
          {experience.map((exp, index) => (
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
