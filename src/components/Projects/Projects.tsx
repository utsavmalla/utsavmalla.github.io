import { useScrollReveal } from '../../hooks/useScrollReveal'
import { projects } from '../../data/projects'

const Projects = () => {
  const projectsRef = useScrollReveal()

  return (
    <section
      id="projects"
      className="projects"
      aria-labelledby="projects-heading"
      ref={projectsRef}
    >
      <div className="container">
        <h2 id="projects-heading">Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card" tabIndex={0}>
              <img
                src={project.image}
                alt={project.imageAlt}
                loading="lazy"
                width="800"
                height="450"
              />
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a
                  className="card-link"
                  href={project.link}
                  target={project.link !== '#' ? '_blank' : undefined}
                  rel={project.link !== '#' ? 'noopener noreferrer' : undefined}
                >
                  View Case
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
