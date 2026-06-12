import type { MouseEvent } from 'react'

const NAV_ITEMS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '/admin', label: 'Admin' },
  { href: '#contact', label: 'Contact' },
]

type HeaderNavProps = {
  id: string
  isOpen: boolean
  activeSectionId?: string
  onNavClick: (event: MouseEvent<HTMLAnchorElement>) => void
}

const HeaderNav = ({ id, isOpen, activeSectionId, onNavClick }: HeaderNavProps) => (
  <nav
    id={id}
    className={`site-nav${isOpen ? ' is-open' : ''}`}
    role="navigation"
    aria-label="Primary"
  >
    <ul>
      {NAV_ITEMS.map((item) => {
        const isHashLink = item.href.startsWith('#')
        const isActive = isHashLink && item.href === `#${activeSectionId}`

        return (
          <li key={item.href}>
            <a
              href={item.href}
              className={isActive ? 'is-active' : undefined}
              aria-current={isActive ? 'page' : undefined}
              onClick={onNavClick}
            >
              {item.label}
            </a>
          </li>
        )
      })}
    </ul>
  </nav>
)

export default HeaderNav
