import { useScrollReveal } from '../../hooks/useScrollReveal'

const Hero = () => {
  const heroRef = useScrollReveal()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')
    if (href && href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        ;(target as HTMLElement).focus({ preventScroll: true })
      }
    }
  }

  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading" ref={heroRef}>
      <div className="container hero-inner">
        <div className="hero-content">
          <p className="eyebrow">Hello, I'm</p>
          <h1 id="hero-heading">Utsav Malla</h1>
          <p className="lead">
            JavaScript Developer | AngularJS, .NET MVC, SQL Server | React &
            Node.js (Learning) | Web Applications | Front-end Developer • UI/UX
            Designer — building accessible, performant web experiences.
          </p>

          <div className="hero-ctas">
            <a className="btn primary" href="#projects" onClick={handleNavClick}>
              View Projects
            </a>
            <a className="btn ghost" href="#contact" onClick={handleNavClick}>
              Contact Me
            </a>
          </div>
        </div>

        <aside className="hero-social" aria-label="Social links">
          <a
            href="https://github.com/utsavmalla"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github" aria-hidden="true"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/utsav-m-aa244b130/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-linkedin" aria-hidden="true"></i>
          </a>
        </aside>
      </div>
    </section>
  )
}

export default Hero
