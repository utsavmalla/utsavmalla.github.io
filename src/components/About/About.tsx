import { useScrollReveal } from '../../hooks/useScrollReveal'

const About = () => {
  const aboutRef = useScrollReveal()

  return (
    <section id="about" className="about" aria-labelledby="about-heading" ref={aboutRef}>
      <div className="container">
        <h2 id="about-heading">About Me</h2>
        <p>
          I'm a mid-level JavaScript developer with hands-on experience building
          and maintaining web applications using AngularJS, .NET MVC, and
          Microsoft SQL Server. I have worked on real-world projects involving
          business logic, database-driven systems, and UI enhancements. My core
          strengths include JavaScript, jQuery, SQL optimization, and working in
          structured enterprise environments using tools like SVN, Azure Repos,
          and GitHub. I'm comfortable collaborating with backend teams,
          understanding existing systems, and gradually modernizing legacy
          codebases. To stay aligned with current industry trends, I've started
          actively learning React and Node.js, focusing on component-based
          architecture, REST APIs, and modern JavaScript practices. My goal is
          to transition into a modern frontend or full-stack JavaScript role. I'm
          currently exploring new opportunities where I can contribute, learn,
          and grow—especially in teams that value clean code, scalability, and
          continuous improvement.
        </p>
      </div>
    </section>
  )
}

export default About
