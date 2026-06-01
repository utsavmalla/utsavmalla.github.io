import { useEffect, useState } from 'react'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { projects } from '../../data/projects'
import type { Project } from '../../data/projects'
import { fetchProjects } from '../../api/client'

const getProjectLinkLabel = (link: string) => {
  if (link === '#') {
    return 'View Project'
  }

  return link.includes('github.com') ? 'See on GitHub' : 'Live Demo'
}

const getProjectLinkType = (link: string) => {
  if (link === '#') {
    return 'Project Preview'
  }

  return link.includes('github.com') ? 'GitHub Repository' : 'Live Website'
}

const ProjectLinkIcon = ({ link }: { link: string }) =>
  link.includes('github.com') ? (
    <FaGithub aria-hidden="true" focusable="false" />
  ) : (
    <FaExternalLinkAlt aria-hidden="true" focusable="false" />
  )

const Projects = () => {
  const projectsRef = useScrollReveal()
  const [data, setData] = useState<Project[]>(projects)

  useEffect(() => {
    fetchProjects()
      .then((remote) => {
        setData(remote)
      })
      .catch(() => {
        // On failure, keep using fallbackProjects
      })
  }, [])

  return (
    <section
      id="projects"
      className="projects"
      aria-labelledby="projects-heading"
      ref={projectsRef}
    >
      <div className="container">
        <div className="projects-heading">
          <span className="section-kicker">Projects</span>
          <h2 id="projects-heading">Featured Projects</h2>
          <p>
            Here are some of the projects that showcase my passion for building useful,
            responsive web experiences.
          </p>
        </div>

        <div className="projects-list">
          {data.map((project) => (
            <article key={project.id} className="project-card" tabIndex={0}>
              <div className="project-media">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  width="800"
                  height="450"
                />
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-meta" aria-label={`${project.title} project information`}>
                  <h4>Project Info</h4>
                  <dl>
                    <div>
                      <dt>Project</dt>
                      <dd>{project.id}</dd>
                    </div>
                    <div>
                      <dt>Link Type</dt>
                      <dd>{getProjectLinkType(project.link)}</dd>
                    </div>
                  </dl>
                </div>
                <a
                  className="card-link"
                  href={project.link}
                  target={project.link !== '#' ? '_blank' : undefined}
                  rel={project.link !== '#' ? 'noopener noreferrer' : undefined}
                >
                  {getProjectLinkLabel(project.link)}
                  <ProjectLinkIcon link={project.link} />
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
