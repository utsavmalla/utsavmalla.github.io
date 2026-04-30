import { useEffect, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navMenuId = 'primary-navigation'

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')
    if (href && href.startsWith('#')) {
      e.preventDefault()
      setIsMobileMenuOpen(false)
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
        <div className="header-top-row">
          <a className="logo" href="/">
            Utsav Malla
          </a>

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

            <button
              className="mobile-menu-toggle"
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls={navMenuId}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <nav
          id={navMenuId}
          className={`site-nav${isMobileMenuOpen ? ' is-open' : ''}`}
          role="navigation"
          aria-label="Primary"
        >
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
      </div>
    </header>
  )
}

export default Header
