import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import HeaderNav from './HeaderNav'

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'contact'] as const

type SectionId = (typeof SECTION_IDS)[number]

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState<SectionId>('hero')
  const clickedNavLinkRef = useRef<HTMLAnchorElement | null>(null)
  const navMenuId = 'primary-navigation'
  const isHomePage = window.location.pathname === '/'

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

  useEffect(() => {
    if (!isHomePage) {
      return
    }

    let animationFrameId = 0

    const updateActiveSection = () => {
      animationFrameId = 0

      const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0
      const activeLine = window.scrollY + headerHeight + 24
      const documentHeight = document.documentElement.scrollHeight
      const isNearPageBottom = window.scrollY + window.innerHeight >= documentHeight - 16

      if (isNearPageBottom && document.getElementById('contact')) {
        setActiveSectionId('contact')
        return
      }

      const currentSection = SECTION_IDS.reduce<SectionId>((current, sectionId) => {
        const section = document.getElementById(sectionId)

        if (!section) {
          return current
        }

        const sectionTop = section.getBoundingClientRect().top + window.scrollY

        return sectionTop <= activeLine ? sectionId : current
      }, 'hero')

      setActiveSectionId(currentSection)
    }

    const requestActiveSectionUpdate = () => {
      const clickedNavLink = clickedNavLinkRef.current

      if (clickedNavLink && clickedNavLink === document.activeElement) {
        clickedNavLink.blur()
        clickedNavLinkRef.current = null
      }

      if (animationFrameId === 0) {
        animationFrameId = window.requestAnimationFrame(updateActiveSection)
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', requestActiveSectionUpdate, { passive: true })
    window.addEventListener('resize', requestActiveSectionUpdate)

    return () => {
      window.removeEventListener('scroll', requestActiveSectionUpdate)
      window.removeEventListener('resize', requestActiveSectionUpdate)

      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isHomePage])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')
    if (href && href.startsWith('#')) {
      e.preventDefault()
      clickedNavLinkRef.current = e.currentTarget
      setIsMobileMenuOpen(false)
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        ;(target as HTMLElement).focus({ preventScroll: true })
      }
      return
    }

    setIsMobileMenuOpen(false)
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

        <HeaderNav
          id={navMenuId}
          isOpen={isMobileMenuOpen}
          activeSectionId={isHomePage ? activeSectionId : undefined}
          onNavClick={handleNavClick}
        />
      </div>
    </header>
  )
}

export default Header
