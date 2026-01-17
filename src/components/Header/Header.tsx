import { useTheme } from '../../hooks/useTheme'

const Header = () => {
  const { theme, toggleTheme } = useTheme()

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
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <a className="logo" href="/">
          Utsav Malla
        </a>
        <nav className="site-nav" role="navigation" aria-label="Primary">
          <ul>
            <li>
              <a href="#hero" onClick={handleNavClick}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={handleNavClick}>
                About
              </a>
            </li>
            <li>
              <a href="#skills" onClick={handleNavClick}>
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" onClick={handleNavClick}>
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" onClick={handleNavClick}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-pressed={theme === 'light'}
            aria-label="Toggle dark mode"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggleTheme()
              }
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
